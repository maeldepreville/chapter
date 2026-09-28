import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createSourceLoader } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const model = createSourceLoader()(source("reading-experience-model.ts"));
const journal = createSourceLoader()(source("journal-model.ts"));
const empty = { readingStatus: null, readingDate: "", note: "", completedReadings: 0, pastNotes: [] };

test("À lire remains an intention and does not fabricate a reading experience", () => {
  const patch = model.keepToRead(empty, "cartographies");
  assert.equal(patch.readingStatus, "À lire");
  assert.equal(patch.readingIntent, true);
  assert.deepEqual(patch.experiences, []);
});

test("finishing then rereading preserves the first stable experience", () => {
  const started = model.startReading(empty, "cartographies", "2026-09-01");
  const written = model.updateExperienceNote({ ...empty, ...started.patch }, "cartographies", "Une première pensée.");
  const finished = model.completeReading({ ...empty, ...written.patch }, "cartographies", "2026-09-12");
  const firstSnapshot = structuredClone(finished.experience);
  const rereading = model.startReading({ ...empty, ...finished.patch }, "cartographies", "2026-09-23");

  assert.equal(rereading.patch.readingStatus, "En cours");
  assert.equal(rereading.rereading, true);
  assert.equal(rereading.experience.sequence, 2);
  assert.deepEqual(rereading.patch.experiences[0], firstSnapshot);
  assert.equal(rereading.patch.experiences[0].note, "Une première pensée.");
  assert.equal(rereading.patch.note, "");
});

test("stopping for now closes only the active experience and keeps the work to resume", () => {
  const started = model.startReading(empty, "rivage", "");
  const withProgress = model.updateExperienceProgress({ ...empty, ...started.patch }, "rivage", { kind: "bookmark", page: 74, updatedAt: "2026-09-23T10:00:00.000Z" });
  const written = model.updateExperienceNote({ ...empty, ...withProgress }, "rivage", "Une voix que je reprendrai.");
  const stopped = model.interruptReading({ ...empty, ...written.patch }, "rivage", "2026-09-23");

  assert.equal(stopped.patch.readingStatus, "À lire");
  assert.equal(stopped.patch.readingIntent, true);
  assert.equal(stopped.experience.state, "interrupted");
  assert.equal(stopped.experience.note, "Une voix que je reprendrai.");
  assert.equal(stopped.experience.progress.page, 74);
  assert.equal(stopped.patch.note, "");
  assert.equal(model.hasInterruptedReading({ ...empty, ...stopped.patch }, "rivage"), true);
});

test("an imported conflict keeps distinct experiences but projects only one active reading", () => {
  const hydrated = model.hydrateReadingMemory({
    ...empty,
    experiences: [
      { id: "local-active", sequence: 1, state: "active", startedAt: "1 septembre 2026", endedAt: "", note: "Locale" },
      { id: "imported-active", sequence: 2, state: "active", startedAt: "2 septembre 2026", endedAt: "", note: "Importée", imported: true },
    ],
  }, "work");

  assert.deepEqual(hydrated.experiences.map(({ id, state }) => ({ id, state })), [
    { id: "local-active", state: "interrupted" },
    { id: "imported-active", state: "active" },
  ]);
  assert.equal(hydrated.experiences.filter((experience) => experience.state === "active").length, 1);
});

test("dates, notes and Journal events stay attached to their experience id", () => {
  const first = model.startReading(empty, "atlas", "");
  const dated = model.updateExperienceDate({ ...empty, ...first.patch }, "atlas", first.experience.id, "startedAt", "2026-09-02");
  const finished = model.completeReading({ ...empty, ...dated }, "atlas", "2026-09-10");
  const second = model.startReading({ ...empty, ...finished.patch }, "atlas", "2026-09-23");
  let traces = journal.saveWrittenTrace([], "atlas", "note", "Première lecture", "10 septembre 2026", finished.experience.id);
  traces = journal.saveWrittenTrace(traces, "atlas", "note", "Relecture", "Aujourd’hui", second.experience.id);

  assert.equal(finished.patch.experiences[0].startedAt, "2026-09-02");
  assert.equal(traces.length, 2);
  assert.deepEqual(new Set(traces.map((trace) => trace.experienceId)), new Set([finished.experience.id, second.experience.id]));
});
