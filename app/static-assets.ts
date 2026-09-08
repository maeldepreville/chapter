export const STATIC_ASSET_REVISION = "p5-20260908-1";

export function staticAsset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("/_")) return path;
  return `${path}${path.includes("?") ? "&" : "?"}v=${STATIC_ASSET_REVISION}`;
}

export const recurringStaticAssets = [
  "/editorial/p1-reading-trace.webp",
  "/editorial/p2-search-atlas.webp",
  "/editorial/p3-reading-bookmark.webp",
  "/editorial/p4-journal-threshold.webp",
  "/editorial/p4-library-threshold.webp",
  "/editorial/p5-profile-reading-room-wash.webp",
  "/branding/chapter-profile-seal.webp",
  "/branding/chapter-profile-qr.svg",
  "/badges/reading-02-complice-des-livres.webp",
  "/badges/reading-03-bibliophile-au-long-cours.webp",
  "/badges/exploration-02-esprit-nomade.webp",
  "/badges/exploration-03-boussole-des-marges.webp",
  "/badges/expression-02-interprete-des-oeuvres.webp",
  "/badges/expression-03-voix-singuliere.webp",
  "/badges/relation-02-trait-d-union.webp",
  "/badges/relation-03-point-de-rencontre.webp",
  "/badges/honor-01-premiere-lumiere.webp",
  "/badges/honor-02-atlas-partage.webp",
] as const;

export function warmStaticAssets(document: Document): () => void {
  const view = document.defaultView;
  const links: HTMLLinkElement[] = [];
  const warm = () => recurringStaticAssets.forEach((path) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = staticAsset(path);
    document.head.append(link);
    links.push(link);
  });
  const idleWindow = view as (Window & typeof globalThis & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }) | null;
  const idleId = idleWindow?.requestIdleCallback?.(warm, { timeout: 1800 });
  const timeoutId = idleId === undefined ? view?.setTimeout(warm, 700) : undefined;
  return () => {
    if (idleId !== undefined) idleWindow?.cancelIdleCallback?.(idleId);
    if (timeoutId !== undefined) view?.clearTimeout(timeoutId);
    links.forEach((link) => link.remove());
  };
}
