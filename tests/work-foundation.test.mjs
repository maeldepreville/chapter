import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fileURLToPath } from "node:url";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("the public work gives every reader three explicit spaces", () => {
  const load = createSourceLoader();
  const { PublicWork } = load(source("p1-public.tsx"));
  const { publicWorks } = load(source("p1-public-fixtures.ts"));
  const markup = renderToStaticMarkup(React.createElement(PublicWork, {
    work: publicWorks[0], works: publicWorks, onBack() {}, onOpenWork() {}, onActivate() {}, onSaveMarker() {},
  }));
  assert.ok(markup.indexOf("L’œuvre") < markup.indexOf("Ma lecture"));
  assert.ok(markup.indexOf("Ma lecture") < markup.indexOf("Autour de l’œuvre"));
  assert.match(markup, /work-personal/);
  assert.match(markup, /visibles uniquement par vous/);
  assert.match(markup, /Les critiques sont des publications distinctes/);
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
    assert.match(textOf(render()), /Lectures précédentes · privées/);
    assert.match(textOf(render()), /La pensée de ma première lecture/);
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
