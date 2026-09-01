export type FadeKind = "menu" | "modal" | "feedback";
export const fadeTiming = { menu: [140, 100], modal: [180, 120], feedback: [120, 120] } as const;
export const fadeEasing = "cubic-bezier(0.23, 1, 0.32, 1)";

// Only the visual lifetime is deferred. Actions, focus and inertness belong to
// the caller and change immediately. No stale completion can close a new view.
export function createFadeController(element: HTMLElement, onExit: () => void) {
  const view = element.ownerDocument.defaultView;
  const preference = view?.matchMedia("(prefers-reduced-motion: reduce)");
  let animation: Animation | undefined;
  let generation = 0;
  let started = false;
  let shown = true;
  const finish = () => {
    animation?.cancel();
    animation = undefined;
    element.style.opacity = shown ? "1" : "0";
    if (!shown) onExit();
  };
  const preferenceChanged = () => {
    if (preference?.matches) { generation++; finish(); }
  };
  preference?.addEventListener("change", preferenceChanged);
  return {
    update(next: boolean, kind: FadeKind, freshContent = false) {
      const current = animation ? Number(view?.getComputedStyle(element).opacity ?? 1) : freshContent && next ? 0 : started ? Number(element.style.opacity || 1) : next ? 0 : 1;
      const job = ++generation;
      shown = next;
      started = true;
      animation?.cancel();
      animation = undefined;
      element.style.opacity = next ? "1" : "0";
      if (preference?.matches || !element.animate || !element.getClientRects().length) { finish(); return; }
      try {
        animation = element.animate([{ opacity: current }, { opacity: next ? 1 : 0 }], { duration: fadeTiming[kind][next ? 0 : 1], easing: fadeEasing, fill: "both" });
        animation.finished.then(() => { if (job === generation) finish(); }, () => { if (job === generation) finish(); });
      } catch { finish(); }
    },
    dispose() {
      generation++;
      animation?.cancel();
      preference?.removeEventListener("change", preferenceChanged);
      element.style.removeProperty("opacity");
    },
  };
}
