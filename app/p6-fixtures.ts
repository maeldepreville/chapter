import type { InitialData, PersonalEntry } from "./page";
import type { Work } from "./foundation/contracts";
import type { JournalTrace } from "./journal-model";
import { coreWorks, emptyPersonalEntry } from "./foundation/fixtures";

const longTitle = "La Bibliothèque des chemins que nous pensions avoir oubliés avant même de les avoir parcourus";
const longAuthor = "Alexandre-Jean-Baptiste de Villeneuve-des-Rives-et-des-Archipels";
const longParagraph = "Un fragment volontairement long vérifie que la pensée reste lisible, que les lignes se reforment sans masquer les actions et que l’interface ne confond jamais densité et précipitation. ";

export const p6ExtremeWorks: readonly Work[] = [
  { ...coreWorks[0], title: longTitle, author: longAuthor, cover: false, coverTone: "slate", meta: "Roman choral, récit de voyage et correspondance · 2026", ratingCount: "12 345 678 évaluations" },
  { ...coreWorks[1], title: "A", author: "Li", lede: "Une forme très courte doit conserver le même rythme que les titres plus amples." },
  { ...coreWorks[2], title: "Antidisestablishmentarianisme-et-autres-mots-sans-espace-pour-éprouver-la-césure", author: "Noémie Très-Long-Nom-Composé", cover: false },
];

const extremeEntries: Record<string, PersonalEntry> = {
  cartographies: { ...emptyPersonalEntry, readingStatus: "En cours", readingDate: "9 septembre 2026", note: longParagraph.repeat(11).trim(), review: "", reviewPublished: false, rating: 0, progress: { kind: "bookmark", page: 9999, updatedAt: "2026-09-09T06:00:00.000Z" }, completedReadings: 12 },
  rivage: { ...emptyPersonalEntry, readingStatus: "À lire", reviewPublished: false, completedReadings: 0 },
  atlas: { ...emptyPersonalEntry, readingStatus: "Lu", readingDate: "9 septembre 2026", review: longParagraph.repeat(17).trim(), reviewPublished: true, rating: 5, completedReadings: 1 },
};

const extremeTraces: readonly JournalTrace[] = [
  { id: "p6-long-note", workId: "cartographies", date: "9 septembre 2026", kind: "Note privée", action: "note", text: extremeEntries.cartographies.note },
  { id: "p6-long-review", workId: "atlas", date: "8 septembre 2026", kind: "Critique publique", action: "review", text: extremeEntries.atlas.review },
  { id: "p6-short-start", workId: "rivage", date: "7 septembre 2026", kind: "Lecture commencée" },
];

export const p6RecipeData = {
  normal: { view: "journal" },
  empty: { view: "journal", works: [], entries: {}, traces: [] },
  extreme: { view: "journal", works: p6ExtremeWorks, entries: extremeEntries, traces: extremeTraces },
} as const satisfies Record<"normal" | "empty" | "extreme", InitialData>;
