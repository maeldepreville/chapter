export function availableWorks<T extends { id: string }>(works: readonly T[], ids: readonly string[]): T[] {
  return [...new Set(ids)].flatMap((id) => {
    const work = works.find((candidate) => candidate.id === id);
    return work ? [work] : [];
  });
}

export const publicListWorkIds = {
  places: ["miroirs", "rivage", "cartographies", "lucioles", "atlas", "sel"],
  lights: ["atlas", "lucioles", "miroirs", "sel"],
} as const;

export function availableWorkCount(count: number, total: number): string {
  const label = `${count} œuvre${count > 1 ? "s" : ""}`;
  return count === total ? label : `${label} disponible${count > 1 ? "s" : ""} sur ${total}`;
}
