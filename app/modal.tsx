"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { containModalTab, focusModal, mountModal } from "./modal-behavior";
import { useSurfaceActive } from "./fade";

type ModalProps = {
  children: ReactNode;
  className?: string;
  labelledBy: string;
  describedBy?: string;
  alert?: boolean;
  initialFocus: string;
  returnFocusSelector?: string;
  onRequestClose: () => void;
};

export function Modal({ children, className = "", labelledBy, describedBy, alert = false, initialFocus, returnFocusSelector = "main h1, main", onRequestClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = useSurfaceActive();
  useLayoutEffect(() => {
    if (!active || !dialogRef.current) return;
    return mountModal(dialogRef.current, returnFocusSelector);
  }, [returnFocusSelector, active]);
  useLayoutEffect(() => {
    if (active && dialogRef.current) focusModal(dialogRef.current, initialFocus);
  }, [initialFocus, active]);

  return (
    <dialog ref={dialogRef} className={`overlay chapter-modal ${className}`} role={alert ? "alertdialog" : "dialog"} aria-modal="true" aria-labelledby={labelledBy} aria-describedby={describedBy}
      onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onRequestClose(); }}
      onKeyDown={(event) => {
        if (event.defaultPrevented) return;
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onRequestClose();
        } else containModalTab(event.currentTarget, event);
      }}>
      {children}
    </dialog>
  );
}
