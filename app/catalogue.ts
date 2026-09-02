export function availableWorks<T extends { id: string }>(works: readonly T[], ids: readonly string[]): T[] {
  return [...new Set(ids)].flatMap((id) => {
    const work = works.find((candidate) => candidate.id === id);
    return work ? [work] : [];
  });
}

export const publicListCatalog = {
  places: {
    title: "Habiter les lieux qui nous quittent",
    description: "Des récits où les maisons, les villes et les rivages ne sont jamais de simples décors : ils conservent ce que les personnages n’arrivent plus à porter seuls.",
    profileSummary: "Une sélection sur les paysages qui deviennent mémoire.",
    discoverySummary: "Des romans où une maison, une ville ou un rivage deviennent une manière de retrouver ce que l’on croyait perdu.",
    workIds: ["miroirs", "rivage", "cartographies", "lucioles", "atlas", "sel"],
  },
  lights: {
    title: "Veilles, fenêtres et lumières tardives",
    description: "Des récits de présences entrevues lorsque la ville se tait, entre fenêtres éclairées, attentes nocturnes et rencontres qui ne pouvaient avoir lieu en plein jour.",
    profileSummary: "Des présences aperçues lorsque la ville se tait.",
    discoverySummary: "Des présences nocturnes, des attentes et des rencontres qui déplacent le regard.",
    workIds: ["atlas", "lucioles", "miroirs", "sel"],
  },
} as const;

export type PublicListId = keyof typeof publicListCatalog;
export const publicListIds: readonly PublicListId[] = ["places", "lights"];
export const FEATURED_DISCOVERY_LIST_ID: PublicListId = "places";

export const publicListWorkIds = {
  places: publicListCatalog.places.workIds,
  lights: publicListCatalog.lights.workIds,
} as const;

export function availableWorkCount(count: number, total: number): string {
  const label = `${count} œuvre${count > 1 ? "s" : ""}`;
  return count === total ? label : `${label} disponible${count > 1 ? "s" : ""} sur ${total}`;
}
