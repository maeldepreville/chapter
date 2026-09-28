export type JournalTrace = {
  id: string;
  workId: string;
  experienceId?: string;
  date: string;
  kind: "Note privée" | "Critique publique" | "Critique importée · privée" | "Lecture commencée" | "Lecture terminée" | "Lecture interrompue" | "Relecture commencée" | "Relecture terminée";
  text?: string;
  action?: "note" | "review";
};

// Editing a current note/review replaces only that work's corresponding trace.
// Library removal never calls this helper: history and writing survive it.
export function saveWrittenTrace(traces: readonly JournalTrace[], workId: string, action: "note" | "review", text: string, date: string, experienceId?: string): JournalTrace[] {
  const belongsToTarget = (trace: JournalTrace) => trace.workId === workId && trace.action === action && (action === "review" || trace.experienceId === experienceId || (!trace.experienceId && Boolean(experienceId)));
  const previous = traces.find(belongsToTarget);
  const rest = traces.filter((trace) => !belongsToTarget(trace));
  if (!text.trim()) return rest;
  return [{ id: previous?.id ?? `trace-${action}-${experienceId ?? workId}`, workId, ...(experienceId ? { experienceId } : {}), date,
    kind: action === "note" ? "Note privée" : "Critique publique", action, text: text.trim() }, ...rest];
}

export function saveReadingTrace(traces: readonly JournalTrace[], workId: string, status: "En cours" | "Lu", date: string, rereading = false, experienceId?: string): JournalTrace[] {
  const kind = rereading
    ? status === "En cours" ? "Relecture commencée" : "Relecture terminée"
    : status === "En cours" ? "Lecture commencée" : "Lecture terminée";
  const id = `trace-${status === "En cours" ? "start" : "finished"}-${experienceId ?? workId}`;
  return [{ id, workId, ...(experienceId ? { experienceId } : {}), date, kind }, ...traces.filter((trace) => trace.id !== id)];
}

export function saveInterruptedTrace(traces: readonly JournalTrace[], workId: string, experienceId: string, date: string): JournalTrace[] {
  const id = `trace-interrupted-${experienceId}`;
  return [{ id, workId, experienceId, date, kind: "Lecture interrompue" }, ...traces.filter((trace) => trace.id !== id)];
}
