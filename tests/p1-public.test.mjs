import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const load = createSourceLoader();
const { publicWorks } = load(source("p1-public-fixtures.ts"));
const { PublicDiscover, PublicPersonalIntro, PublicSearch, PublicWork } = load(source("p1-public.tsx"));

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
  assert.match(markup, /Ici, on commence par une œuvre/);
  assert.match(markup, /src="\/editorial\/p1-reading-trace\.webp"/);
  assert.doesNotMatch(markup, /_vinext\/image\?url=.*p1-reading-trace/);
  assert.match(markup, /Revue littéraire · journal personnel/);
  assert.doesNotMatch(markup, /Chaque lecture laisse une trace/);
  assert.match(markup, /Rechercher un titre ou un auteur/);
  assert.match(markup, /Ouvrir l’œuvre/);
  assert.doesNotMatch(markup, /Ajouter au journal|Écrire une critique|Suivre/);

  const tree = PublicDiscover({ works: publicWorks, onOpenWork(id) { opened.push(id); }, onOpenSearch() {} });
  const openButtons = nodes(tree, (node) => node.type === "button" && textOf(node) === "Ouvrir l’œuvre");
  assert.equal(openButtons.length, 1);
  openButtons[0].props.onClick();
  assert.deepEqual(opened, ["cartographies"]);
});

test("public search is immediate and work pages introduce only the P2 personal action", () => {
  const searchMarkup = renderToStaticMarkup(React.createElement(PublicSearch, { works: publicWorks, onOpenWork() {} }));
  assert.match(searchMarkup, /24 œuvres disponibles/);
  assert.match(searchMarkup, /Titre, auteur, lecteur ou liste/);
  assert.match(searchMarkup, /src="\/editorial\/p2-search-atlas\.webp"/);
  assert.doesNotMatch(searchMarkup, /_vinext\/image\?url=.*p2-search-atlas/);

  const workMarkup = renderToStaticMarkup(React.createElement(PublicWork, {
    work: publicWorks[0], works: publicWorks, onBack() {}, onOpenWork() {}, onActivate() {}, onSaveMarker() {},
  }));
  assert.match(workMarkup, /À propos/);
  assert.match(workMarkup, /Chemins voisins/);
  assert.match(workMarkup, /Ajouter au journal/);
  assert.doesNotMatch(workMarkup, /Ma critique|Créer mon compte|Nom public|Suivre/);
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

test("the public shell keeps personal destinations stable and gives them real introductory states", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = {
    location: { pathname: "/" },
    history: { pushState(_state, _title, path) { globalThis.window.location.pathname = path; }, replaceState() {} },
    scrollTo() {}, addEventListener() {}, removeEventListener() {},
  };
  try {
    const render = () => harness.render(Home, {});
    let root = render();
    const mainNavigation = nodes(root, (node) => node.type === "nav" && node.props["aria-label"] === "Navigation principale")[0];
    assert.deepEqual(nodes(mainNavigation, (node) => node.type === "button").map(textOf), ["Journal", "Bibliothèque", "Découvrir", "Recherche"]);

    nodes(mainNavigation, (node) => node.type === "button" && textOf(node) === "Journal")[0].props.onClick();
    root = render();
    let intro = nodes(root, (node) => node.type?.name === "PublicPersonalIntro")[0];
    assert.equal(root.props["data-shell"], "public");
    assert.equal(intro.props.kind, "journal");
    let renderedIntro = intro.type(intro.props);
    assert.match(textOf(renderedIntro), /Ce que vous lisez mérite mieux qu’un compteur/);
    assert.match(textOf(renderedIntro), /Votre première action/);
    nodes(renderedIntro, (node) => node.type === "button" && node.props.className === "p1-personal-intro-primary")[0].props.onClick();
    root = render();
    assert.equal(nodes(root, (node) => node.type?.name === "PublicDiscover").length, 1);
    const discoveryNavigation = nodes(root, (node) => node.type === "nav" && node.props["aria-label"] === "Navigation principale")[0];
    nodes(discoveryNavigation, (node) => node.type === "button" && textOf(node) === "Journal")[0].props.onClick();
    root = render();
    assert.equal(nodes(root, (node) => node.type?.name === "PublicPersonalIntro")[0].props.kind, "journal");

    const desktopNavigation = nodes(root, (node) => node.type === "nav" && node.props["aria-label"] === "Navigation principale")[0];
    nodes(desktopNavigation, (node) => node.type === "button" && textOf(node) === "Bibliothèque")[0].props.onClick();
    root = render();
    intro = nodes(root, (node) => node.type?.name === "PublicPersonalIntro")[0];
    assert.equal(intro.props.kind, "library");
    renderedIntro = intro.type(intro.props);
    assert.match(textOf(renderedIntro), /Une bibliothèque pour choisir, pas pour compter/);
    assert.match(textOf(renderedIntro), /Choisir une première œuvre/);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("personal introductions use neutral editorial assets and lead primarily to Discover", async () => {
  for (const kind of ["journal", "library"]) {
    let explored = 0;
    const markup = renderToStaticMarkup(React.createElement(PublicPersonalIntro, { kind, onExplore() { explored += 1; }, onSearch() {} }));
    assert.match(markup, new RegExp(`/editorial/p4-${kind}-threshold\\.webp`));
    assert.doesNotMatch(markup, new RegExp(publicWorks[0].title));
    const tree = PublicPersonalIntro({ kind, onExplore() { explored += 1; }, onSearch() {} });
    nodes(tree, (node) => node.type === "button" && node.props.className === "p1-personal-intro-primary")[0].props.onClick();
    assert.equal(explored, 1);
    const asset = fileURLToPath(new URL(`../public/editorial/p4-${kind}-threshold.webp`, import.meta.url));
    const metadata = await stat(asset);
    assert.ok(metadata.size > 40_000);
    assert.ok(metadata.size < 150_000);
  }
});

test("a first private record fills the same Journal destination without changing its place", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = {
    location: { pathname: "/oeuvres/cartographies" },
    history: { pushState(_state, _title, path) { globalThis.window.location.pathname = path; }, replaceState() {} },
    scrollTo() {}, requestAnimationFrame(callback) { callback(); return 1; }, addEventListener() {}, removeEventListener() {},
  };
  try {
    const render = () => harness.render(Home, { initialPublicWorkId: "cartographies" });
    let root = render();
    nodes(root, (node) => node.type?.name === "PublicWork")[0].props.onActivate("En cours");
    root = render();
    assert.equal(root.props["data-shell"], "connected");
    assert.equal(nodes(root, (node) => node.type === "button" && node.props.className === "account-button").length, 2);
    const mainNavigation = nodes(root, (node) => node.type === "nav" && node.props["aria-label"] === "Navigation principale")[0];
    assert.deepEqual(nodes(mainNavigation, (node) => node.type === "button").map(textOf), ["Journal", "Bibliothèque", "Découvrir", "Recherche"]);
    nodes(mainNavigation, (node) => node.type === "button" && textOf(node) === "Journal")[0].props.onClick();
    root = render();
    assert.equal(root.props["data-shell"], "connected");
    assert.match(textOf(root), /Lectures en cours/);
    assert.match(textOf(root), new RegExp(publicWorks[0].title));
    const connectedNavigation = nodes(root, (node) => node.type === "nav" && node.props["aria-label"] === "Navigation principale")[0];
    assert.deepEqual(nodes(connectedNavigation, (node) => node.type === "button").map(textOf), ["Journal", "Bibliothèque", "Découvrir", "Recherche"]);
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
  assert.match(css, /\.p1-intro h1[^}]+4\.35rem/);
  assert.doesNotMatch(css, /\.p1-intro h1[^}]+6\.2rem/);
  assert.doesNotMatch(css, /animation:/);
});

test("public discovery ships its editorial illustration in a web-sized format", async () => {
  const asset = fileURLToPath(new URL("../public/editorial/p1-reading-trace.webp", import.meta.url));
  const metadata = await stat(asset);
  assert.ok(metadata.size > 100_000);
  assert.ok(metadata.size < 300_000);
});

test("public search ships a distinct transparent editorial accent", async () => {
  const asset = fileURLToPath(new URL("../public/editorial/p2-search-atlas.webp", import.meta.url));
  const metadata = await stat(asset);
  assert.ok(metadata.size > 80_000);
  assert.ok(metadata.size < 300_000);
  const css = await readFile(source("p1-public.css"), "utf8");
  assert.match(css, /\.p1-search-sketch \{ position: absolute/);
  assert.doesNotMatch(css, /\.p1-search-sketch[^}]*border:/);
  assert.match(css, /width: min\(150vw, 38rem\)/);
  assert.doesNotMatch(css, /right: -11rem/);
  assert.match(css, /input\[type="search"\]::\-webkit-search-cancel-button/);
  assert.match(css, /input\[type="search"\]::\-ms-clear/);
});

test("public discovery, search and work URLs render directly", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("p1-routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };

  for (const [path, expected] of [["/decouvrir", /Ici, on commence par une œuvre/], ["/recherche", /Retrouver une œuvre ou une voix/], ["/oeuvres/atlas", /Atlas des nuits calmes/]]) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env, context);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});
