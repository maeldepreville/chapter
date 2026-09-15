"use client";

import { useState } from "react";

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
