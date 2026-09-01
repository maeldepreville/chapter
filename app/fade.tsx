"use client";

import { createContext, ReactNode, useContext, useLayoutEffect, useRef, useState } from "react";
import { createFadeController, FadeKind } from "./fade-behavior";

const SurfaceActive = createContext(true);
export const useSurfaceActive = () => useContext(SurfaceActive);

export function Fade({ show, kind = "menu", children, changeKey, keepMounted = false, inline = false }: { show: boolean; kind?: FadeKind; children: ReactNode; changeKey?: unknown; keepMounted?: boolean; inline?: boolean }) {
  const [retained, setRetained] = useState(children);
  const [present, setPresent] = useState(show);
  const [previousShow, setPreviousShow] = useState(show);
  // Retain the last live React tree only for the visual exit. It is inert and
  // aria-hidden as soon as show becomes false, without waiting for opacity.
  if (show && children !== retained) setRetained(children);
  if (show !== previousShow) {
    setPreviousShow(show);
    if (show) setPresent(true);
  }
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<typeof createFadeController> | null>(null);
  const previousKey = useRef(changeKey);
  useLayoutEffect(() => {
    const element = host.current?.firstElementChild as HTMLElement | null;
    if (!element) return;
    controller.current = createFadeController(element, () => setPresent(false));
    return () => { controller.current?.dispose(); controller.current = null; };
  }, [present]);
  useLayoutEffect(() => {
    controller.current?.update(show, kind, changeKey !== previousKey.current);
    previousKey.current = changeKey;
  }, [show, kind, changeKey, present]);

  if (!present) return keepMounted ? children : null;
  const Host = inline ? "span" : "div";
  return <SurfaceActive value={show}><Host ref={host} className="fade-host" data-exiting={!show || undefined} inert={!show || undefined} aria-hidden={!show || undefined}>{show ? children : retained}</Host></SurfaceActive>;
}
