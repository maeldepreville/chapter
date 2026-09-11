"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type StackToast = {
  id: number;
  label: string;
  detail?: string;
  actionLabel?: string;
  onAction?: () => void;
};

function ToastItem({ toast, onDismiss, register }: { toast: StackToast; onDismiss: (id: number) => void; register: (id: number, node: HTMLDivElement | null) => void }) {
  const [paused, setPaused] = useState(false);
  const [exiting, setExiting] = useState(false);
  const dismissRef = useRef(onDismiss);
  const remainingMs = useRef(5000);

  useEffect(() => { dismissRef.current = onDismiss; }, [onDismiss]);

  useEffect(() => {
    if (paused || exiting) return;
    const startedAt = Date.now();
    const timer = window.setTimeout(() => setExiting(true), remainingMs.current);
    return () => {
      window.clearTimeout(timer);
      remainingMs.current = Math.max(0, remainingMs.current - (Date.now() - startedAt));
    };
  }, [exiting, paused, toast.id]);

  useEffect(() => {
    if (!exiting) return;
    const fallback = window.setTimeout(() => dismissRef.current(toast.id), 350);
    return () => window.clearTimeout(fallback);
  }, [exiting, toast.id]);

  const finishExit = () => { if (exiting) dismissRef.current(toast.id); };

  return (
    <div
      ref={(node) => register(toast.id, node)}
      className={`temporary-feedback${exiting ? " is-exiting" : ""}`}
      role="status"
      tabIndex={0}
      onAnimationEnd={(event) => { if (event.currentTarget === event.target) finishExit(); }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span><strong>{toast.label}</strong>{toast.detail && <small>{toast.detail}</small>}</span>
      {toast.onAction && <><span className="feedback-separator" aria-hidden="true" /><button className="feedback-undo" type="button" disabled={exiting} onClick={() => { toast.onAction?.(); setExiting(true); }}>{toast.actionLabel ?? "Annuler"}</button></>}
      <button className="feedback-close" type="button" disabled={exiting} aria-label={`Fermer : ${toast.label}`} onClick={() => setExiting(true)}>×</button>
    </div>
  );
}

export function ToastStack({ toasts, onDismiss }: { toasts: readonly StackToast[]; onDismiss: (id: number) => void }) {
  const nodes = useRef(new Map<number, HTMLDivElement>());
  const previousTops = useRef(new Map<number, number>());
  const register = (id: number, node: HTMLDivElement | null) => {
    if (node) nodes.current.set(id, node);
    else nodes.current.delete(id);
  };

  useLayoutEffect(() => {
    const nextTops = new Map<number, number>();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    toasts.forEach((toast) => {
      const node = nodes.current.get(toast.id);
      if (!node) return;
      const nextTop = node.getBoundingClientRect().top;
      nextTops.set(toast.id, nextTop);
      const previousTop = previousTops.current.get(toast.id);
      if (!reduceMotion && previousTop !== undefined && Math.abs(previousTop - nextTop) > 0.5) {
        node.animate([{ transform: `translateY(${previousTop - nextTop}px)` }, { transform: "translateY(0)" }], { duration: 320, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      }
    });
    previousTops.current = nextTops;
  }, [toasts]);

  if (!toasts.length) return null;
  return <aside className="toast-stack" aria-label="Notifications">{toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} register={register} />)}</aside>;
}
