"use client";

import { useState } from "react";
import type { ReadingExperience } from "./foundation/contracts";

export type PastWorkNote = { reading: number; text: string };

const INITIAL_VISIBLE = 3;
const REVEAL_STEP = 5;

export function WorkPastNotes({ notes }: { notes: readonly PastWorkNote[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  if (notes.length === 0) return null;
  const ordered = [...notes].reverse();
  const remaining = Math.max(0, ordered.length - visibleCount);

  return <div className="work-past-notes" aria-label="Notes des lectures précédentes">
    <p className="row-label">Notes de lectures précédentes · privées</p>
    {ordered.slice(0, visibleCount).map((past, index) => <div className="work-past-note" key={`${past.reading}-${index}`}>
      <strong>{index === 0 ? "Note précédente" : "Note plus ancienne"}</strong>
      <p>{past.text}</p>
    </div>)}
    {remaining > 0 && <button className="text-action work-past-notes-more" type="button" onClick={() => setVisibleCount((count) => count + REVEAL_STEP)}>Voir les notes plus anciennes · {Math.min(REVEAL_STEP, remaining)} de plus</button>}
  </div>;
}

const experienceTitle = (experience: ReadingExperience) => experience.state === "interrupted" ? "Lecture interrompue" : "Lecture terminée";
const experienceDate = (experience: ReadingExperience) => {
  if (experience.startedAt && experience.endedAt) return `${experience.startedAt} — ${experience.endedAt}`;
  if (experience.endedAt) return experience.endedAt;
  if (experience.startedAt) return `Commencée le ${experience.startedAt}`;
  return "Dates non renseignées";
};

export function WorkReadingHistory({ experiences, currentExperienceId }: { experiences: readonly ReadingExperience[]; currentExperienceId?: string }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const history = [...experiences]
    .filter((experience) => experience.id !== currentExperienceId && experience.state !== "active")
    .sort((left, right) => right.sequence - left.sequence);
  if (history.length === 0) return null;
  const remaining = Math.max(0, history.length - visibleCount);

  return <section className="work-reading-history" aria-labelledby="work-reading-history-title">
    <div className="work-reading-history-heading">
      <div><p className="row-label">Lectures précédentes · privées</p><h3 id="work-reading-history-title">Votre histoire avec cette œuvre</h3></div>
      <span>{history.length} expérience{history.length > 1 ? "s" : ""}</span>
    </div>
    <div className="work-reading-history-list">
      {history.slice(0, visibleCount).map((experience) => <article className="work-reading-experience" key={experience.id}>
        <div><strong>{experienceTitle(experience)}</strong><span>{experienceDate(experience)}</span></div>
        {experience.note ? <p>{experience.note}</p> : <p className="work-reading-experience-empty">Aucune pensée consignée pour cette lecture.</p>}
        {experience.imported && <small>Expérience importée</small>}
      </article>)}
    </div>
    {remaining > 0 && <button className="text-action work-past-notes-more" type="button" onClick={() => setVisibleCount((count) => count + REVEAL_STEP)}>Voir les lectures plus anciennes · {Math.min(REVEAL_STEP, remaining)} de plus</button>}
  </section>;
}
