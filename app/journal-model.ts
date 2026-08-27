export type JournalTrace = {
  id: string;
  workId: string;
  date: string;
  kind: "Note privée" | "Critique publique" | "Lecture commencée" | "Lecture terminée";
  text?: string;
  action?: "note" | "review";
};

// Editing a current note/review replaces only that work's corresponding trace.
// Library removal never calls this helper: history and writing survive it.
export function saveWrittenTrace(traces: readonly JournalTrace[], workId: string, action: "note" | "review", text: string, date: string): JournalTrace[] {
  const previous = traces.find((trace) => trace.workId === workId && trace.action === action);
  const rest = traces.filter((trace) => trace.workId !== workId || trace.action !== action);
  if (!text.trim()) return rest;
  return [{ id: previous?.id ?? `trace-${action}-${workId}`, workId, date,
    kind: action === "note" ? "Note privée" : "Critique publique", action, text: text.trim() }, ...rest];
}

export function saveReadingTrace(traces: readonly JournalTrace[], workId: string, status: "En cours" | "Lu", date: string): JournalTrace[] {
  const kind = status === "En cours" ? "Lecture commencée" : "Lecture terminée";
  const id = `trace-${status === "En cours" ? "start" : "finished"}-${workId}`;
  return [{ id, workId, date, kind }, ...traces.filter((trace) => trace.id !== id)];
}
