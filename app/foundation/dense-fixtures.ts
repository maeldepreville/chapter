import type { PrivateReadingRecord, PrototypeSession, Work } from "./contracts";
import { prototypeFollows, prototypeReplies, prototypeReviews } from "./fixtures";

const denseTones = ["brick", "ochre", "sage", "petrol", "plum", "slate"] as const;

export const denseWorks: readonly Work[] = Array.from({ length: 500 }, (_, index) => {
  const number = index + 1;
  const year = 1980 + (index % 46);
  return {
    id: `dense-work-${String(number).padStart(3, "0")}`,
    authorId: `dense-author-${String((index % 80) + 1).padStart(3, "0")}`,
    editionId: `dense-edition-${String(number).padStart(3, "0")}`,
    title: `Livre de densité ${String(number).padStart(3, "0")}`,
    author: `Auteur ${String((index % 80) + 1).padStart(3, "0")}`,
    meta: `Roman · ${year}`,
    year: String(year),
    genre: index % 3 ? "Roman" : "Récit",
    language: "Français",
    rating: "4,0",
    ratingCount: `${40 + index} évaluations`,
    lede: "Une œuvre de fixture destinée à vérifier la densité, la recherche, le tri et les filtres.",
    synopsis: ["Cette notice est volontairement stable et déterministe."],
    cover: index % 7 !== 0,
    coverTone: denseTones[index % denseTones.length],
  };
});

const densePrivateRecords: PrivateReadingRecord[] = denseWorks.map((work, index) => ({
  id: `record-dense-${String(index + 1).padStart(3, "0")}`,
  readerId: "reader-habitual",
  workId: work.id,
  readingStatus: index % 3 === 0 ? "À lire" : index % 3 === 1 ? "En cours" : "Lu",
  readingDate: index % 3 === 0 ? "" : `2026-08-${String((index % 28) + 1).padStart(2, "0")}`,
  privateNote: index % 11 === 0 ? "Une note privée assez longue pour vérifier les rythmes éditoriaux. ".repeat(8).trim() : "",
  rating: index % 3 === 2 ? (index % 5) + 1 : 0,
  ...(index === 1 ? { progress: { kind: "bookmark" as const, page: 86, totalPages: 312, updatedAt: "2026-09-05T09:00:00.000Z" } } : {}),
}));

export const habitualPrototypeSession: PrototypeSession = {
  id: "session-habitual",
  readerId: "reader-habitual",
  privateRecords: densePrivateRecords,
  reviews: [...prototypeReviews],
  replies: [...prototypeReplies],
  follows: [...prototypeFollows],
};
