"use client";

import { useState } from "react";
import Home, { type InitialData, type PersonalEntry } from "../../page";
import { coreWorks } from "../../foundation/fixtures";
import type { JournalTrace } from "../../journal-model";

type WorkSituation = "visitor" | "to-read" | "reading" | "finished" | "rereading";

const situations: readonly { id: WorkSituation; label: string; question: string }[] = [
  { id: "visitor", label: "Sans compte", question: "L’œuvre et les critiques sont publiques ; le futur espace personnel est-il compréhensible ?" },
  { id: "to-read", label: "À lire", question: "Une intention privée est-elle distinguée d’une lecture commencée ?" },
  { id: "reading", label: "En cours", question: "Le statut, le marque-page et la note restent-ils clairement chez soi ?" },
  { id: "finished", label: "Lu", question: "Peut-on conserver sa lecture et reconnaître une critique comme publication distincte ?" },
  { id: "rereading", label: "Relecture", question: "La lecture précédente reste-t-elle visible sans être remplacée ?" },
];

const baseEntry: PersonalEntry = { readingStatus: null, readingDate: "", note: "", review: "", reviewPublished: false, rating: 0, completedReadings: 0 };

function situationData(situation: Exclude<WorkSituation, "visitor">): InitialData {
  const entries: Record<WorkSituation, PersonalEntry> = {
    visitor: baseEntry,
    "to-read": { ...baseEntry, readingStatus: "À lire" },
    reading: { ...baseEntry, readingStatus: "En cours", readingDate: "3 septembre 2026", note: "Les cartes d’Ana changent moins les lieux que la façon dont elle se souvient d’eux.", progress: { kind: "bookmark", page: 146, updatedAt: "2026-09-05T18:00:00.000Z" } },
    finished: { ...baseEntry, readingStatus: "Lu", readingDate: "12 septembre 2026", note: "Je voudrais retrouver cette douceur quand je reviendrai sur le roman.", completedReadings: 1, review: "Une histoire où les lieux ne sont jamais tout à fait ceux qu’on avait quittés.", reviewPublished: true, rating: 4 },
    rereading: { ...baseEntry, readingStatus: "En cours", readingDate: "15 septembre 2026", completedReadings: 1, pastNotes: [{ reading: 1, text: "Je voudrais retrouver cette douceur quand je reviendrai sur le roman." }] },
  };
  const traces: JournalTrace[] = situation === "rereading" ? [
    { id: "recipe-reread", workId: "cartographies", date: "Aujourd’hui", kind: "Relecture commencée" },
    { id: "recipe-past-note", workId: "cartographies", date: "12 septembre 2026", kind: "Note privée", text: entries.rereading.pastNotes![0].text },
    { id: "recipe-finished", workId: "cartographies", date: "12 septembre 2026", kind: "Lecture terminée" },
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
