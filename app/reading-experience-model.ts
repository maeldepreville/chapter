import type { OptionalProgress, ReadingExperience, ReadingStatus } from "./foundation/contracts";

export type LegacyPastNote = { reading: number; text: string };

export type ReadingMemoryEntry = {
  readingStatus: ReadingStatus | null;
  readingDate: string;
  note: string;
  progress?: OptionalProgress;
  completedReadings?: number;
  pastNotes?: readonly LegacyPastNote[];
  readingIntent?: boolean;
  experiences?: readonly ReadingExperience[];
};

export type ReadingMemoryPatch = Pick<ReadingMemoryEntry,
  "readingStatus" | "readingDate" | "note" | "progress" | "completedReadings" | "pastNotes" | "readingIntent" | "experiences"
>;

const bySequence = (left: ReadingExperience, right: ReadingExperience) => left.sequence - right.sequence;
const cleanText = (value: unknown) => typeof value === "string" ? value.trim() : "";

function validExperiences(value: unknown): ReadingExperience[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((candidate) => {
    if (!candidate || typeof candidate !== "object") return [];
    const item = candidate as Partial<ReadingExperience>;
    if (typeof item.id !== "string" || !item.id || !Number.isInteger(item.sequence) || (item.sequence ?? 0) < 1) return [];
    if (item.state !== "active" && item.state !== "completed" && item.state !== "interrupted") return [];
    return [{
      id: item.id,
      sequence: item.sequence!,
      state: item.state,
      startedAt: cleanText(item.startedAt),
      endedAt: cleanText(item.endedAt),
      note: cleanText(item.note),
      ...(item.progress ? { progress: item.progress } : {}),
      ...(item.imported ? { imported: true } : {}),
    }];
  }).sort(bySequence);
}

function legacyExperiences(entry: ReadingMemoryEntry, workId: string): ReadingExperience[] {
  const pastNotes = [...(entry.pastNotes ?? [])]
    .filter((item) => Number.isInteger(item.reading) && item.reading > 0 && item.text.trim())
    .sort((left, right) => left.reading - right.reading);
  const completedCount = Math.max(entry.readingStatus === "Lu" ? 1 : 0, Math.floor(entry.completedReadings ?? 0), pastNotes.length);
  const experiences: ReadingExperience[] = [];

  for (let sequence = 1; sequence <= completedCount; sequence += 1) {
    const past = pastNotes.find((item) => item.reading === sequence);
    const isLatestCompleted = entry.readingStatus === "Lu" && sequence === completedCount;
    experiences.push({
      id: `reading-${workId}-${sequence}`,
      sequence,
      state: "completed",
      startedAt: "",
      endedAt: isLatestCompleted ? entry.readingDate : "",
      note: isLatestCompleted ? entry.note.trim() : past?.text.trim() ?? "",
    });
  }

  if (entry.readingStatus === "En cours") {
    const sequence = completedCount + 1;
    experiences.push({
      id: `reading-${workId}-${sequence}`,
      sequence,
      state: "active",
      startedAt: entry.readingDate,
      endedAt: "",
      note: entry.note.trim(),
      ...(entry.progress ? { progress: entry.progress } : {}),
    });
  } else if (!experiences.length && entry.note.trim()) {
    experiences.push({
      id: `reading-${workId}-1`,
      sequence: 1,
      state: "interrupted",
      startedAt: "",
      endedAt: entry.readingDate,
      note: entry.note.trim(),
    });
  }
  return experiences;
}

export function readingExperiences(entry: ReadingMemoryEntry, workId: string): readonly ReadingExperience[] {
  const stored = validExperiences(entry.experiences);
  return stored.length ? stored : legacyExperiences(entry, workId);
}

export function activeReadingExperience(entry: ReadingMemoryEntry, workId: string) {
  return [...readingExperiences(entry, workId)].reverse().find((experience) => experience.state === "active");
}

export function latestReadingExperience(entry: ReadingMemoryEntry, workId: string) {
  return [...readingExperiences(entry, workId)].sort(bySequence).at(-1);
}

export function readingMemoryPatch(entry: ReadingMemoryEntry, workId: string, experiencesInput?: readonly ReadingExperience[], intentInput?: boolean): ReadingMemoryPatch {
  const sorted = [...(experiencesInput ?? readingExperiences(entry, workId))].sort(bySequence);
  const activeId = [...sorted].reverse().find((experience) => experience.state === "active")?.id;
  const experiences = sorted.map((experience) => experience.state === "active" && experience.id !== activeId
    ? { ...experience, state: "interrupted" as const }
    : experience);
  const active = [...experiences].reverse().find((experience) => experience.state === "active");
  const latestCompleted = [...experiences].reverse().find((experience) => experience.state === "completed");
  const latest = experiences.at(-1);
  const readingIntent = intentInput ?? entry.readingIntent ?? entry.readingStatus === "À lire";
  const editable = active ?? (!readingIntent && (latest?.state === "completed" || latest?.state === "interrupted") && !latest.imported ? latest : undefined);
  const readingStatus: ReadingStatus | null = active ? "En cours" : readingIntent ? "À lire" : latestCompleted ? "Lu" : null;
  const archived = experiences.filter((experience) => experience.id !== editable?.id && experience.note.trim());

  return {
    readingStatus,
    readingDate: active?.startedAt ?? latestCompleted?.endedAt ?? "",
    note: editable?.note ?? "",
    progress: active?.progress,
    completedReadings: experiences.filter((experience) => experience.state === "completed").length,
    pastNotes: archived.map((experience) => ({ reading: experience.sequence, text: experience.note })),
    readingIntent,
    experiences,
  };
}

export function hydrateReadingMemory<T extends ReadingMemoryEntry>(entry: T, workId: string): T & ReadingMemoryPatch {
  return { ...entry, ...readingMemoryPatch(entry, workId) };
}

function nextExperience(entry: ReadingMemoryEntry, workId: string, state: ReadingExperience["state"], date: string): ReadingExperience {
  const experiences = readingExperiences(entry, workId);
  const sequence = Math.max(0, ...experiences.map((experience) => experience.sequence)) + 1;
  const baseId = `reading-${workId}-${sequence}`;
  const usedIds = new Set(experiences.map((experience) => experience.id));
  let id = baseId;
  let suffix = 2;
  while (usedIds.has(id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }
  return {
    id,
    sequence,
    state,
    startedAt: state === "active" ? date : "",
    endedAt: state === "active" ? "" : date,
    note: "",
  };
}

export function keepToRead(entry: ReadingMemoryEntry, workId: string): ReadingMemoryPatch {
  return readingMemoryPatch(entry, workId, readingExperiences(entry, workId), true);
}

export function startReading(entry: ReadingMemoryEntry, workId: string, date = ""): { patch: ReadingMemoryPatch; experience: ReadingExperience; rereading: boolean } {
  const experiences = [...readingExperiences(entry, workId)];
  const existing = [...experiences].reverse().find((experience) => experience.state === "active");
  if (existing) return { patch: readingMemoryPatch(entry, workId, experiences, false), experience: existing, rereading: existing.sequence > 1 };
  const experience = nextExperience(entry, workId, "active", date);
  return { patch: readingMemoryPatch(entry, workId, [...experiences, experience], false), experience, rereading: experiences.length > 0 };
}

export function completeReading(entry: ReadingMemoryEntry, workId: string, date = ""): { patch: ReadingMemoryPatch; experience: ReadingExperience; rereading: boolean } {
  const experiences = [...readingExperiences(entry, workId)];
  const activeIndex = experiences.findIndex((experience) => experience.state === "active");
  const base = activeIndex >= 0 ? experiences[activeIndex] : nextExperience(entry, workId, "completed", date);
  const experience: ReadingExperience = {
    id: base.id,
    sequence: base.sequence,
    state: "completed",
    startedAt: base.startedAt,
    endedAt: date,
    note: base.note,
    ...(base.progress ? { progress: base.progress } : {}),
    ...(base.imported ? { imported: true } : {}),
  };
  if (activeIndex >= 0) experiences[activeIndex] = experience;
  else experiences.push(experience);
  return { patch: readingMemoryPatch(entry, workId, experiences, false), experience, rereading: experience.sequence > 1 };
}

export function interruptReading(entry: ReadingMemoryEntry, workId: string, date = ""): { patch: ReadingMemoryPatch; experience?: ReadingExperience } {
  const experiences = [...readingExperiences(entry, workId)];
  const activeIndex = experiences.findIndex((experience) => experience.state === "active");
  if (activeIndex < 0) return { patch: readingMemoryPatch(entry, workId, experiences, true) };
  const experience = { ...experiences[activeIndex], state: "interrupted" as const, endedAt: date };
  experiences[activeIndex] = experience;
  return { patch: readingMemoryPatch(entry, workId, experiences, true), experience };
}

export function updateExperienceDate(entry: ReadingMemoryEntry, workId: string, experienceId: string, field: "startedAt" | "endedAt", date: string): ReadingMemoryPatch {
  const experiences = readingExperiences(entry, workId).map((experience) => experience.id === experienceId ? { ...experience, [field]: date } : experience);
  return readingMemoryPatch(entry, workId, experiences);
}

export function updateExperienceNote(entry: ReadingMemoryEntry, workId: string, text: string): { patch: ReadingMemoryPatch; experience?: ReadingExperience } {
  const experiences = [...readingExperiences(entry, workId)];
  const activeIndex = experiences.findIndex((experience) => experience.state === "active");
  const latestIndex = experiences.length - 1;
  const editableIndex = activeIndex >= 0 ? activeIndex : entry.readingIntent || (experiences[latestIndex]?.state !== "completed" && experiences[latestIndex]?.state !== "interrupted") || experiences[latestIndex]?.imported ? -1 : latestIndex;
  if (editableIndex < 0) return { patch: readingMemoryPatch(entry, workId, experiences) };
  experiences[editableIndex] = { ...experiences[editableIndex], note: text.trim() };
  return { patch: readingMemoryPatch(entry, workId, experiences), experience: experiences[editableIndex] };
}

export function updateExperienceProgress(entry: ReadingMemoryEntry, workId: string, progress: OptionalProgress): ReadingMemoryPatch {
  const experiences = readingExperiences(entry, workId).map((experience) => experience.state === "active" ? { ...experience, progress } : experience);
  return readingMemoryPatch(entry, workId, experiences);
}

export function hasInterruptedReading(entry: ReadingMemoryEntry, workId: string) {
  return latestReadingExperience(entry, workId)?.state === "interrupted";
}
