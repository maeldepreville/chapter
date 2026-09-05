"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import Image from "next/image";
import { CoverFrame } from "../cover-frame";
import { Modal } from "../modal";
import type { Work } from "./contracts";

const join = (...names: Array<string | undefined | false>) => names.filter(Boolean).join(" ");

export function Button({ variant = "primary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "quiet" | "danger" }) {
  return <button {...props} type={props.type ?? "button"} className={join("chapter-button", `chapter-button--${variant}`, className)} />;
}

export function ActionLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={join("chapter-action-link", className)} />;
}

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return <label className={join("chapter-field", className)}><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={join("chapter-input", className)} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={join("chapter-textarea", className)} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={join("chapter-select", className)} />;
}

export function Menu({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return <div className={join("chapter-menu", className)} role="menu" aria-label={label}>{children}</div>;
}

export function MenuItem({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type={props.type ?? "button"} role="menuitem" className={join("chapter-menu-item", className)} />;
}

export function Dialog({ titleId, descriptionId, initialFocus = "button, a, input, textarea, select", onRequestClose, className, children }: { titleId: string; descriptionId?: string; initialFocus?: string; onRequestClose: () => void; className?: string; children: ReactNode }) {
  return <Modal labelledBy={titleId} describedBy={descriptionId} initialFocus={initialFocus} onRequestClose={onRequestClose} className={className}>{children}</Modal>;
}

export function Toast({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={join("chapter-toast", className)} role="status" aria-live="polite">{children}</div>;
}

export function EditorialSurface({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <article {...props} className={join("chapter-editorial-surface", className)} />;
}

export function Cover({ work, className = "chapter-cover", sizes = "160px", priority = false }: { work: Work; className?: string; sizes?: string; priority?: boolean }) {
  return <CoverFrame work={work} className={className} sizes={sizes} priority={priority}><span aria-hidden="true">{work.title.slice(0, 1)}</span></CoverFrame>;
}

export function Avatar({ name, src, className }: { name: string; src?: string; className?: string }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("fr");
  return <span className={join("chapter-avatar", className)} aria-label={name}>{src ? <Image src={src} alt="" width={44} height={44} unoptimized /> : initials}</span>;
}

export function EmptyState({ title, description, action, className }: { title: string; description?: string; action?: ReactNode; className?: string }) {
  return <section className={join("chapter-empty-state", className)}><h2>{title}</h2>{description && <p>{description}</p>}{action}</section>;
}
