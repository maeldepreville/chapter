import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("work chapter headings reserve space for accents above editorial titles", () => {
  const css = readFileSync(source("globals.css"), "utf8");
  assert.match(css, /\.section-heading \.work-chapter-kicker \{ margin: 0 0 0\.85rem;/);
});

test("the public work gives every reader three explicit spaces", () => {
  const load = createSourceLoader();
  const { PublicWork } = load(source("p1-public.tsx"));
  const { publicWorks } = load(source("p1-public-fixtures.ts"));
  const markup = renderToStaticMarkup(React.createElement(PublicWork, {
    work: publicWorks[0], works: publicWorks, onBack() {}, onOpenWork() {}, onActivate() {}, onSaveMarker() {},
  }));
  const chapters = markup.slice(markup.indexOf('aria-label="Sections de l’œuvre"'), markup.indexOf("</nav>"));
  assert.ok(chapters.indexOf("L’œuvre") < chapters.indexOf("Ma lecture"));
  assert.ok(chapters.indexOf("Ma lecture") < chapters.indexOf("Autour de l’œuvre"));
  assert.match(markup, /work-personal/);
  assert.match(markup, /visibles uniquement par vous/);
  assert.match(markup, /Les critiques publiées sont distinctes/);
  assert.match(markup, /book-opening|about-layout/);
  assert.doesNotMatch(markup, /Traces publiques|Chemins voisins/);
  assert.doesNotMatch(markup, /Ma note de cette lecture|Ma critique/);
});

test("a rereading keeps its previous private note instead of rewriting it", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const Home = load(source("page.tsx")).default;
  const { coreWorks } = load(source("foundation/fixtures.ts"));
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/oeuvres/cartographies" }, history: { pushState() {}, replaceState() {} }, scrollTo() {} };
  try {
    const render = () => harness.render(Home, { initialSettingsOpen: true, initialData: { view: "work", works: coreWorks, entries: { cartographies: { readingStatus: "Lu", readingDate: "12 septembre 2026", note: "La pensée de ma première lecture.", review: "", rating: 0, completedReadings: 1 } }, traces: [{ id: "trace-note-cartographies", workId: "cartographies", date: "12 septembre 2026", kind: "Note privée", action: "note", text: "La pensée de ma première lecture." }] } });
    nodes(render(), (node) => node.type === "button" && textOf(node) === "Relire cette œuvre")[0].props.onClick();
    const archived = nodes(render(), (node) => node.type?.name === "WorkPastNotes")[0];
    assert.deepEqual(archived.props.notes, [{ reading: 1, text: "La pensée de ma première lecture." }]);
    assert.match(textOf(render()), /Aucune pensée consignée/);
    const settings = nodes(render(), (node) => node.type?.name === "TrustSettings")[0];
    const snapshot = settings.props.createExport();
    assert.deepEqual(snapshot.privateRecords[0].pastNotes, [{ reading: 1, text: "La pensée de ma première lecture." }]);
    assert.ok(snapshot.journalTraces.some((trace) => trace.text === "La pensée de ma première lecture."));
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("a long rereading history shows three notes first and reveals five at a time without ordinal labels", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const { WorkPastNotes } = load(source("work-past-notes.tsx"));
  const notes = Array.from({ length: 12 }, (_, index) => ({ reading: index + 1, text: `Pensée ${index + 1}` }));
  const render = () => harness.render(WorkPastNotes, { notes });
  assert.equal(nodes(render(), (node) => node.props?.className === "work-past-note").length, 3);
  assert.doesNotMatch(textOf(render()), /\d+e lecture/);
  nodes(render(), (node) => node.type === "button" && textOf(node).includes("Voir les notes plus anciennes"))[0].props.onClick();
  assert.equal(nodes(render(), (node) => node.props?.className === "work-past-note").length, 8);
  nodes(render(), (node) => node.type === "button" && textOf(node).includes("Voir les notes plus anciennes"))[0].props.onClick();
  assert.equal(nodes(render(), (node) => node.props?.className === "work-past-note").length, 12);
  assert.equal(nodes(render(), (node) => node.type === "button" && textOf(node).includes("Voir les notes plus anciennes")).length, 0);
});
