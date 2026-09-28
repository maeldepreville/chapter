"use client";

import { useState } from "react";
import Home, { type InitialData, type PersonalEntry } from "../../page";
import { coreWorks } from "../../foundation/fixtures";
import type { JournalTrace } from "../../journal-model";
import type { ReadingExperience } from "../../foundation/contracts";

type WorkSituation = "visitor" | "to-read" | "reading" | "interrupted" | "finished" | "rereading" | "imported" | "many-rereadings";

const situations: readonly { id: WorkSituation; label: string; question: string }[] = [
  { id: "visitor", label: "Sans compte", question: "L’œuvre et les critiques sont publiques ; le futur espace personnel est-il compréhensible ?" },
  { id: "to-read", label: "À lire", question: "Une intention privée est-elle distinguée d’une lecture commencée ?" },
  { id: "reading", label: "En cours", question: "Le statut, le marque-page et la note restent-ils clairement chez soi ?" },
  { id: "interrupted", label: "Interrompue", question: "Peut-on arrêter sans perdre la pensée déjà écrite ni se sentir en échec ?" },
  { id: "finished", label: "Lu", question: "Peut-on conserver sa lecture et reconnaître une critique comme publication distincte ?" },
  { id: "rereading", label: "Relecture", question: "La lecture précédente reste-t-elle visible sans être remplacée ?" },
  { id: "imported", label: "Lectures importées", question: "Plusieurs expériences anciennes, parfois sans date, restent-elles distinctes et intelligibles ?" },
  { id: "many-rereadings", label: "Relectures nombreuses", question: "Seules trois notes sont visibles d’abord ; peut-on retrouver les suivantes sans encombrer la page ?" },
];

const baseEntry: PersonalEntry = { readingStatus: null, readingDate: "", note: "", review: "", reviewPublished: false, rating: 0, completedReadings: 0, readingIntent: false, experiences: [] };
const reading = (sequence: number, state: ReadingExperience["state"], values: Partial<ReadingExperience> = {}): ReadingExperience => ({
  id: `reading-cartographies-${sequence}`,
  sequence,
  state,
  startedAt: "",
  endedAt: "",
  note: "",
  ...values,
});

function situationData(situation: Exclude<WorkSituation, "visitor">): InitialData {
  const entries: Record<WorkSituation, PersonalEntry> = {
    visitor: baseEntry,
    "to-read": { ...baseEntry, readingStatus: "À lire", readingIntent: true },
    reading: { ...baseEntry, readingStatus: "En cours", readingDate: "3 septembre 2026", note: "Les cartes d’Ana changent moins les lieux que la façon dont elle se souvient d’eux.", progress: { kind: "bookmark", page: 146, updatedAt: "2026-09-05T18:00:00.000Z" }, experiences: [reading(1, "active", { startedAt: "3 septembre 2026", note: "Les cartes d’Ana changent moins les lieux que la façon dont elle se souvient d’eux.", progress: { kind: "bookmark", page: 146, updatedAt: "2026-09-05T18:00:00.000Z" } })] },
    interrupted: { ...baseEntry, readingStatus: "À lire", readingIntent: true, experiences: [reading(1, "interrupted", { note: "Une voix que je veux retrouver lorsque le bon moment reviendra." })] },
    finished: { ...baseEntry, readingStatus: "Lu", readingDate: "12 septembre 2026", note: "Je voudrais retrouver cette douceur quand je reviendrai sur le roman.", completedReadings: 1, experiences: [reading(1, "completed", { startedAt: "3 septembre 2026", endedAt: "12 septembre 2026", note: "Je voudrais retrouver cette douceur quand je reviendrai sur le roman." })], review: "Une histoire où les lieux ne sont jamais tout à fait ceux qu’on avait quittés.", reviewPublished: true, rating: 4 },
    rereading: { ...baseEntry, readingStatus: "En cours", readingDate: "15 septembre 2026", completedReadings: 1, experiences: [reading(1, "completed", { startedAt: "3 septembre 2026", endedAt: "12 septembre 2026", note: "Je voudrais retrouver cette douceur quand je reviendrai sur le roman." }), reading(2, "active", { startedAt: "15 septembre 2026" })] },
    imported: { ...baseEntry, readingStatus: "Lu", completedReadings: 2, experiences: [reading(1, "completed", { endedAt: "14 juin 2004", note: "Un souvenir ancien revenu avec l’archive.", imported: true }), reading(2, "completed", { note: "Cette lecture était conservée sans date.", imported: true })] },
    "many-rereadings": { ...baseEntry, readingStatus: "En cours", completedReadings: 12, experiences: [...Array.from({ length: 12 }, (_, index) => reading(index + 1, "completed", { note: index % 2 === 0 ? "Un détail du paysage s’éclaire à chaque retour dans ces pages." : "Je garde une autre voix de cette histoire, moins certaine qu’au premier passage." })), reading(13, "active")] },
  };
  const traces: JournalTrace[] = situation === "rereading" ? [
    { id: "recipe-reread", workId: "cartographies", experienceId: "reading-cartographies-2", date: "Aujourd’hui", kind: "Relecture commencée" },
    { id: "recipe-past-note", workId: "cartographies", experienceId: "reading-cartographies-1", date: "12 septembre 2026", kind: "Note privée", text: entries.rereading.experiences![0].note },
    { id: "recipe-finished", workId: "cartographies", experienceId: "reading-cartographies-1", date: "12 septembre 2026", kind: "Lecture terminée" },
  ] : [];
  return { view: "work", works: coreWorks, entries: { cartographies: entries[situation] }, traces };
}

export function WorkRecipeLab() {
  const [situation, setSituation] = useState<WorkSituation>("visitor");
  const selected = situations.find((item) => item.id === situation)!;

  return <div className="work-recipe">
    <aside className="work-recipe-toolbar" aria-label="Situations de recette de la page œuvre">
      <div><strong>Recette · Page œuvre</strong><span>Ces contrôles n’apparaissent pas dans Chapter.</span></div>
      <nav aria-label="Choisir une situation">
        {situations.map((item) => <button key={item.id} type="button" aria-pressed={situation === item.id} onClick={() => setSituation(item.id)}>{item.label}</button>)}
      </nav>
      <p>{selected.question}</p>
    </aside>
    {situation === "visitor" ? <Home key={situation} refined initialPublicWorkId="cartographies" /> : <Home key={situation} refined initialData={situationData(situation)} />}
  </div>;
}
