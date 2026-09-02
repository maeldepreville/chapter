import { prototypeActors } from "./prototype-data";

const reader = prototypeActors.self;

// A synchronous lock covers both native share and its optional copy fallback.
// Invalidating a surface suppresses late feedback without unlocking a native job.
export function createProfileShareController(onBusy: (busy: boolean) => void, onNotice: (notice: string) => void) {
  let busy = false;
  let active = true;
  let generation = 0;
  return {
    activate() { active = true; },
    invalidate() { generation += 1; onNotice(""); },
    dispose() { active = false; generation += 1; },
    async run(kind: "copy" | "share", url: string) {
      if (busy || !active) return;
      busy = true;
      const job = ++generation;
      const current = () => active && job === generation;
      const focused = typeof document === "undefined" ? null : document.activeElement;
      let usedFallback = false;
      onBusy(true);
      onNotice("");
      try {
        let notice = "Lien du profil copié";
        if (kind === "share") {
          if (navigator.share) {
            try {
              await navigator.share({ title: `Profil de ${reader.name} sur Chapter`, text: "Découvrez mon portrait de lecteur sur Chapter.", url });
              if (current()) onNotice("Profil partagé");
              return;
            } catch (error) {
              if (typeof error === "object" && error !== null && "name" in error && error.name === "AbortError") return;
            }
          }
          if (!current()) return;
          notice = "Partage indisponible — lien copié";
        }
        const copied = await copyProfileUrl(url, current, () => { usedFallback = true; });
        if (current()) onNotice(copied ? notice : "Copie impossible. Utilisez le lien affiché sur la carte.");
      } finally {
        busy = false;
        if (active) onBusy(false);
        // The original control was disabled during copying. Wait for React to
        // re-enable it; never steal focus after navigation or a new interaction.
        if (usedFallback && current() && typeof window !== "undefined") window.requestAnimationFrame(() => {
          if (current() && !busy && document.activeElement === document.body && focused instanceof HTMLElement && focused.isConnected) focused.focus({ preventScroll: true });
        });
      }
    },
  };
}

export async function copyProfileUrl(url: string, current: () => boolean = () => true, onFallback: () => void = () => {}) {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    if (!current()) return false;
    onFallback();
    let field: HTMLTextAreaElement | undefined;
    const focused = document.activeElement;
    try {
      field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      field?.remove();
      try {
        if (focused instanceof HTMLElement && focused.isConnected) focused.focus({ preventScroll: true });
      } catch { /* A detached or disabled trigger must not turn copying into a rejected promise. */ }
    }
  }
}
