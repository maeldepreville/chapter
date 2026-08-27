type HonorItem = { id: string; locked?: boolean };

const families = [
  { id: "reading", title: "Lecture" },
  { id: "exploration", title: "Exploration" },
  { id: "expression", title: "Expression" },
  { id: "relation", title: "Relation" },
] as const;

// One family group is a desktop column and a mobile acquired/next pair.
export function getHonorsLayout<T extends HonorItem>(items: readonly T[], showProgress: boolean) {
  const visibleItems = items.filter((item) => showProgress || !item.locked);
  const honors = visibleItems.filter((item) => item.id.startsWith("honor") && !item.locked);
  return {
    honors,
    honorRows: Array.from({ length: Math.ceil(honors.length / 2) }, (_, index) => honors.slice(index * 2, index * 2 + 2)),
    families: families.map((family) => ({
      ...family,
      items: visibleItems
        .filter((item) => item.id.startsWith(family.id))
        .sort((left, right) => Number(Boolean(left.locked)) - Number(Boolean(right.locked))),
    })).filter((family) => family.items.length > 0),
  };
}
