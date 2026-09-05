import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const load = createSourceLoader();
const { publicWorks } = load(source("p1-public-fixtures.ts"));
const { PublicDiscover, PublicSearch, PublicWork } = load(source("p1-public.tsx"));

test("P1 exposes a useful public catalogue with stable work relations", () => {
  assert.equal(publicWorks.length, 24);
  assert.equal(new Set(publicWorks.map((work) => work.id)).size, publicWorks.length);
  for (const work of publicWorks) {
    assert.ok(work.authorId && work.editionId);
    assert.ok(work.lede && work.synopsis.length > 0);
  }
});

test("public discovery explains Chapter and every exposed action has a destination", () => {
  const opened = [];
  const markup = renderToStaticMarkup(React.createElement(PublicDiscover, {
    works: publicWorks,
    onOpenWork(id) { opened.push(id); },
    onOpenSearch() {},
  }));
  assert.match(markup, /Chaque lecture laisse une trace/);
  assert.match(markup, /Rechercher un titre ou un auteur/);
  assert.match(markup, /Ouvrir l’œuvre/);
  assert.doesNotMatch(markup, /Ajouter au journal|Écrire une critique|Suivre/);

  const tree = PublicDiscover({ works: publicWorks, onOpenWork(id) { opened.push(id); }, onOpenSearch() {} });
  const openButtons = nodes(tree, (node) => node.type === "button" && textOf(node) === "Ouvrir l’œuvre");
  assert.equal(openButtons.length, 1);
  openButtons[0].props.onClick();
  assert.deepEqual(opened, ["cartographies"]);
});

test("public search is immediate and work pages remain account-free", () => {
  const searchMarkup = renderToStaticMarkup(React.createElement(PublicSearch, { works: publicWorks, onOpenWork() {} }));
  assert.match(searchMarkup, /24 œuvres disponibles/);
  assert.match(searchMarkup, /Titre ou auteur/);

  const workMarkup = renderToStaticMarkup(React.createElement(PublicWork, {
    work: publicWorks[0], works: publicWorks, onBack() {}, onOpenWork() {},
  }));
  assert.match(workMarkup, /À propos/);
  assert.match(workMarkup, /Chemins voisins/);
  assert.doesNotMatch(workMarkup, /Ajouter au journal|Ma note|Ma critique|Créer un compte/);
});

test("the root visitor journey opens search and a work while keeping public navigation", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  const paths = [];
  globalThis.window = {
    location: { pathname: "/" },
    history: { pushState(_state, _title, path) { paths.push(path); globalThis.window.location.pathname = path; }, replaceState() {} },
    scrollTo() {},
  };
  try {
    const render = () => harness.render(Home, {});
    let root = render();
    assert.equal(root.props["data-shell"], "public");
    let discovery = nodes(root, (node) => typeof node.type === "function" && node.type.name === "PublicDiscover")[0];
    assert.ok(discovery);
    discovery.props.onOpenSearch();
    assert.ok(nodes(render(), (node) => typeof node.type === "function" && node.type.name === "PublicSearch").length);
    assert.equal(paths.at(-1), "/recherche");

    root = render();
    const search = nodes(root, (node) => typeof node.type === "function" && node.type.name === "PublicSearch")[0];
    search.props.onQueryChange("Atlas");
    search.props.onOpenWork("atlas");
    const work = nodes(render(), (node) => typeof node.type === "function" && node.type.name === "PublicWork")[0];
    assert.equal(work.props.work.id, "atlas");
    assert.equal(work.props.backLabel, "Retour à Recherche");
    assert.equal(paths.at(-1), "/oeuvres/atlas");
    work.props.onBack();
    const restoredSearch = nodes(render(), (node) => typeof node.type === "function" && node.type.name === "PublicSearch")[0];
    assert.equal(restoredSearch.props.query, "Atlas");
    assert.equal(paths.at(-1), "/recherche");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("P1 styles preserve responsive reflow and reduced motion", async () => {
  const css = await readFile(source("p1-public.css"), "utf8");
  assert.match(css, /@media \(max-width: 899px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /grid-template-columns: 82vw 82vw 82vw/);
  assert.doesNotMatch(css, /animation:/);
});

test("public discovery, search and work URLs render directly", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("p1-routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };

  for (const [path, expected] of [["/decouvrir", /Chaque lecture laisse une trace/], ["/recherche", /Trouver une œuvre/], ["/oeuvres/atlas", /Atlas des nuits calmes/]]) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env, context);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});
