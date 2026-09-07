import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const load = createSourceLoader();
const { TrustSettings } = load(source("p5-trust.tsx"));
const { SocialReviews, ProfileView, PublicListView } = load(source("phase10.tsx"));
const { publicWorks } = load(source("p1-public-fixtures.ts"));

const trustProps = {
  publicName: "Maël Depréville",
  privateRecordCount: 18,
  privateNoteCount: 4,
  publicationCount: 2,
  blockedActorIds: ["theo"],
  onClose() {}, onSavePublicName() {}, onEditPhoto() {}, onToggleBlock() {},
  createExport() { return { format: "chapter-export", version: 1, exportedAt: "2026-09-07T00:00:00.000Z", account: { publicName: "Maël Depréville" }, privacy: { journal: "private", library: "private", notes: "private" }, privateRecords: [], journalTraces: [], publications: [], followingActorIds: [], blockedActorIds: [] }; },
  onImport() { return { records: 0, traces: 0 }; }, onDeleteAccount() {},
};

test("P5 exposes identity, immutable private spaces, blocking and data portability", () => {
  const markup = renderToStaticMarkup(React.createElement(TrustSettings, trustProps));
  assert.match(markup, /Vos lectures vous appartiennent/);
  assert.match(markup, /Journal[\s\S]*Privé, toujours/);
  assert.match(markup, /Bibliothèque[\s\S]*Privée, toujours/);
  assert.match(markup, /Importer en privé/);
  assert.match(markup, /Théo Renaud/);
  assert.match(markup, /Demander la suppression/);
});

test("P5 global blocking removes an actor from conversations and masks profile and list content", () => {
  const reviewMarkup = renderToStaticMarkup(React.createElement(SocialReviews, { workId: "cartographies", personalReview: "", personalRating: 0, blockedActorIds: ["theo"], onOpenProfile() {}, onWriteReview() {}, onBlockActor() {} }));
  assert.doesNotMatch(reviewMarkup, /Théo Renaud/);
  assert.match(reviewMarkup, /Lina Morel/);

  const profileMarkup = renderToStaticMarkup(React.createElement(ProfileView, { owner: "theo", works: publicWorks, following: false, blocked: true, onToggleFollow() {}, onToggleBlock() {}, onOpenWork() {}, onOpenHonors() {}, onOpenList() {}, photo: null, onEditPhoto() {}, onRemovePhoto() {}, equippedTitle: "Esprit nomade", showcase: [] }));
  assert.match(profileMarkup, /Ses publications sont masquées/);
  assert.doesNotMatch(profileMarkup, /Quelques traces publiques/);

  const listMarkup = renderToStaticMarkup(React.createElement(PublicListView, { owner: "lina", listId: "places", works: publicWorks, following: false, blocked: true, onToggleFollow() {}, onOpenProfile() {}, onOpenWork() {}, onBack() {}, backLabel: "Retour" }));
  assert.match(listMarkup, /liste est masquée/);
});

test("P5 settings open over the connected view and account deletion returns to public discovery", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/reglages" }, history: { pushState() {}, replaceState() {} }, scrollTo() {}, requestAnimationFrame(callback) { callback(); return 1; }, addEventListener() {}, removeEventListener() {} };
  try {
    const render = () => harness.render(Home, { refined: true, initialData: { view: "journal" }, initialSettingsOpen: true });
    let tree = render();
    const settings = nodes(tree, (node) => node.type?.name === "TrustSettings")[0];
    assert.ok(settings);
    const exported = settings.props.createExport();
    assert.equal(exported.format, "chapter-export");
    assert.equal(exported.privacy.notes, "private");
    settings.props.onDeleteAccount();
    tree = render();
    assert.equal(tree.props["data-shell"], "public");
    assert.equal(nodes(tree, (node) => node.type?.name === "PublicDiscover").length, 1);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("P5 has a direct modal route and dedicated responsive styling", async () => {
  const [route, css, globals] = await Promise.all([readFile(new URL("../app/reglages/page.tsx", import.meta.url), "utf8"), readFile(new URL("../app/p5-trust.css", import.meta.url), "utf8"), readFile(new URL("../app/globals.css", import.meta.url), "utf8")]);
  assert.match(route, /view: "journal"/);
  assert.match(route, /initialSettingsOpen/);
  assert.match(css, /\.trust-overlay \{ position: fixed/);
  assert.match(css, /\.trust-card \{[^}]*max-height:/);
  assert.match(css, /@media \(max-width: 899px\)/);
  assert.match(globals, /p5-trust\.css/);
});

test("connected desktop navigation keeps the public sizing and animated brick marker", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.desktop-header nav \{[^}]*align-self: stretch[^}]*font-size: 1rem/);
  assert.match(css, /\.desktop-header nav button::after \{[^}]*background: var\(--brick\)[^}]*transition: opacity/);
  assert.match(css, /\.desktop-header nav button\.active::after \{ opacity: 1; \}/);
});
