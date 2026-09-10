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

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => onDismiss(toast.id), 5000);
    return () => window.clearTimeout(timer);
  }, [onDismiss, paused, toast.id]);

  return (
    <div
      ref={(node) => register(toast.id, node)}
      className="temporary-feedback"
      role="status"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span><strong>{toast.label}</strong>{toast.detail && <small>{toast.detail}</small>}</span>
      {toast.onAction && <><span className="feedback-separator" aria-hidden="true" /><button className="feedback-undo" type="button" onClick={() => { toast.onAction?.(); onDismiss(toast.id); }}>{toast.actionLabel ?? "Annuler"}</button></>}
      <button className="feedback-close" type="button" aria-label={`Fermer : ${toast.label}`} onClick={() => onDismiss(toast.id)}>×</button>
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
