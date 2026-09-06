import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

function withWindow(run) {
  const previous = globalThis.window;
  globalThis.window = {
    location: { pathname: "/journal" },
    history: { pushState(_state, _title, path) { globalThis.window.location.pathname = path; }, replaceState() {} },
    scrollTo() {},
  };
  try { run(); } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
}

function setup(initialData) {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const Home = load(source("page.tsx")).default;
  const render = () => harness.render(Home, { initialData });
  const button = (label) => nodes(render(), (node) => node.type === "button" && textOf(node) === label)[0];
  return { render, button };
}

test("P3 exposes a 500-work private library without mounting every card at once", () => {
  const ui = setup({ view: "library" });
  const tree = ui.render();
  assert.match(textOf(tree), /Toutes 500/);
  assert.equal(nodes(tree, (node) => node.props?.className === "library-work").length, 36);
  assert.match(textOf(tree), /36 sur 500 œuvres affichées/);
  ui.button("Afficher 36 œuvres supplémentaires").props.onClick();
  assert.equal(nodes(ui.render(), (node) => node.props?.className === "library-work").length, 72);
});

test("P3 saves a manual private bookmark for a current reading", () => {
  const load = createSourceLoader();
  const { coreWorks } = load(source("foundation/fixtures.ts"));
  const ui = setup({ view: "work", works: coreWorks, entries: { cartographies: { readingStatus: "En cours", readingDate: "", note: "", review: "", rating: 0, completedReadings: 0 } }, traces: [] });
  withWindow(() => {
    ui.button("Poser un marque-page").props.onClick();
    let fields = nodes(ui.render(), (node) => node.type === "input" && node.props.type === "number");
    fields[0].props.onChange({ target: { value: "86" } });
    fields[1].props.onChange({ target: { value: "312" } });
    ui.button("Enregistrer").props.onClick();
    assert.match(textOf(ui.render()), /Marque-page · p. 86 sur 312/);
    assert.match(textOf(ui.render()), /Ce repère reste facultatif et privé/);
  });
});

test("P3 starts a rereading on the same work and records it in the Journal", () => {
  const load = createSourceLoader();
  const { coreWorks } = load(source("foundation/fixtures.ts"));
  const ui = setup({ view: "work", works: coreWorks, entries: { cartographies: { readingStatus: "Lu", readingDate: "2 août 2026", note: "", review: "", rating: 0, completedReadings: 1 } }, traces: [] });
  withWindow(() => {
    ui.button("Relire cette œuvre").props.onClick();
    ui.button("Journal").props.onClick();
    const rendered = textOf(ui.render());
    assert.match(rendered, /Relecture commencée/);
    assert.match(rendered, /2e lecture/);
    assert.equal(nodes(ui.render(), (node) => node.props?.className === "current-reading").length, 1);
  });
});

test("P3 Journal and Library routes render directly", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("p3-routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };
  for (const [path, expected] of [["/journal", /Lectures en cours/], ["/bibliotheque", /Toutes<!-- --> <span>500<\/span>/]]) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env, context);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});
