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
const { PublicSearch, PublicWork } = load(source("p1-public.tsx"));
const { SocialReviews } = load(source("phase10.tsx"));

test("P4 search exposes public readers and lists without hiding work results", () => {
  const markup = renderToStaticMarkup(React.createElement(PublicSearch, {
    works: publicWorks,
    query: "Lina",
    onOpenWork() {},
    onOpenProfile() {},
    onOpenList() {},
  }));
  assert.match(markup, /Retrouver une œuvre ou une voix/);
  assert.match(markup, /Lina Morel/);
  assert.match(markup, /Profil public/);

  const listMarkup = renderToStaticMarkup(React.createElement(PublicSearch, {
    works: publicWorks,
    query: "lumières tardives",
    onOpenWork() {},
    onOpenProfile() {},
    onOpenList() {},
  }));
  assert.match(listMarkup, /Veilles, fenêtres et lumières tardives/);
  assert.match(listMarkup, /Liste publique/);
});

test("P4 work page composes public traces before neighboring paths", () => {
  const social = React.createElement("section", null, "Traces publiques");
  const markup = renderToStaticMarkup(React.createElement(PublicWork, {
    work: publicWorks[0], works: publicWorks, social,
    onBack() {}, onOpenWork() {}, onActivate() {}, onSaveMarker() {},
  }));
  assert.ok(markup.indexOf("Traces publiques") > markup.indexOf("À propos"));
  assert.ok(markup.indexOf("Traces publiques") < markup.indexOf("Chemins voisins"));
  assert.match(markup, />03<\/span><h2[^>]*>Chemins voisins/);
});

test("P4 conversations retain the explicit identity gate", () => {
  const markup = renderToStaticMarkup(React.createElement(SocialReviews, {
    workId: "cartographies",
    personalReview: "",
    personalRating: 0,
    onOpenProfile() {},
    onWriteReview() {},
    onBeforeReply() { return false; },
  }));
  assert.match(markup, /Voir la conversation/);
  assert.match(markup, /Répondre/);
});

test("P4 restores a public review after the minimal identity step", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = {
    location: { pathname: "/oeuvres/cartographies" },
    history: { pushState() {}, replaceState() {} },
    scrollTo() {},
    requestAnimationFrame(callback) { callback(); return 1; },
  };
  try {
    const render = () => harness.render(Home, { initialPublicView: "discover", initialPublicWorkId: "cartographies" });
    let tree = render();
    const publicDestinationLabels = () => nodes(tree, (node) => node.type === "button").map(textOf).filter((label) => ["Journal", "Bibliothèque", "Découvrir", "Recherche"].includes(label));
    assert.ok(publicDestinationLabels().includes("Journal"));
    assert.ok(publicDestinationLabels().includes("Bibliothèque"));
    const work = nodes(tree, (node) => node.type?.name === "PublicWork")[0];
    const social = nodes(work.props.social, (node) => node.type?.name === "SocialReviews")[0];
    social.props.onWriteReview();
    tree = render();
    assert.match(textOf(tree), /Choisissez le nom qui signera vos traces/);
    nodes(tree, (node) => node.type === "input" && node.props.id === "p4-public-name")[0].props.onChange({ target: { value: "Lectora" } });
    tree = render();
    nodes(tree, (node) => node.type === "button" && textOf(node) === "Continuer vers la critique")[0].props.onClick();
    tree = render();
    assert.equal(tree.props["data-shell"], "public");
    assert.ok(publicDestinationLabels().includes("Journal"));
    assert.ok(publicDestinationLabels().includes("Bibliothèque"));
    assert.match(textOf(tree), /Visible par tous après publication/);
    assert.match(textOf(tree), /Publier la critique/);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("P4 returns from a public profile to its exact Search source", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = {
    location: { pathname: "/recherche" },
    history: { pushState() {}, replaceState() {} },
    scrollY: 184,
    scrollTo() {},
    requestAnimationFrame(callback) { callback(); return 1; },
    addEventListener() {}, removeEventListener() {},
  };
  try {
    const render = () => harness.render(Home, { initialPublicView: "search" });
    let tree = render();
    nodes(tree, (node) => node.type?.name === "PublicSearch")[0].props.onOpenProfile("lina");
    tree = render();
    const profile = nodes(tree, (node) => node.type?.name === "ProfileView")[0];
    assert.equal(profile.props.backLabel, "Retour à Recherche");
    profile.props.onBack();
    tree = render();
    assert.equal(nodes(tree, (node) => node.type?.name === "PublicSearch").length, 1);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("P4 returns from a Search list to Search instead of Discover", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = {
    location: { pathname: "/recherche" },
    history: { pushState() {}, replaceState() {} },
    scrollY: 96,
    scrollTo() {},
    requestAnimationFrame(callback) { callback(); return 1; },
    addEventListener() {}, removeEventListener() {},
  };
  try {
    const render = () => harness.render(Home, { initialPublicView: "search" });
    let tree = render();
    nodes(tree, (node) => node.type?.name === "PublicSearch")[0].props.onOpenList("lights");
    tree = render();
    const list = nodes(tree, (node) => node.type?.name === "PublicListView")[0];
    assert.equal(list.props.backLabel, "Fermer la liste");
    assert.equal(nodes(tree, (node) => node.type?.name === "PublicSearch").length, 1);
    list.props.onBack();
    tree = render();
    assert.equal(nodes(tree, (node) => node.type?.name === "PublicSearch").length, 1);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("P4 returns from a connected Discover work to Discover", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = {
    location: { pathname: "/" },
    history: { pushState() {}, replaceState() {} },
    scrollY: 240,
    scrollTo() {},
    requestAnimationFrame(callback) { callback(); return 1; },
    addEventListener() {}, removeEventListener() {},
  };
  try {
    const render = () => harness.render(Home, { refined: true, initialData: { view: "discover" } });
    let tree = render();
    nodes(tree, (node) => node.type?.name === "PublicDiscover")[0].props.onOpenWork("cartographies");
    tree = render();
    const back = nodes(tree, (node) => node.type === "button" && node.props.className === "personal-work-back")[0];
    assert.equal(textOf(back).trim(), "← Retour à Découvrir");
    back.props.onClick();
    tree = render();
    assert.equal(nodes(tree, (node) => node.type?.name === "PublicDiscover").length, 1);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("P4 public routes render profiles, lists, reviews and conversations directly", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("p4-routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };
  const routes = [
    ["/oeuvres/cartographies", /Traces publiques/],
    ["/lecteurs/lina", /Lina Morel/],
    ["/listes/places", /Habiter les lieux qui nous quittent/],
  ];
  for (const [path, expected] of routes) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env, context);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, expected, path);
  }
});

test("P4 visual layer covers editorial publication, mobile reflow and reduced motion", async () => {
  const css = await readFile(source("p4-social.css"), "utf8");
  const page = await readFile(source("page.tsx"), "utf8");
  assert.match(css, /\.p4-public-reviews/);
  assert.match(css, /@media \(max-width: 899px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(page, /Visible par tous après publication/);
  assert.match(page, /Nom public/);
  assert.match(page, /Rien n’est publié avant votre confirmation explicite/);
});
