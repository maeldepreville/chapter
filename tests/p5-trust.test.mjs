import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

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

test("successful export and import use the same visible feedback surface as public actions", async () => {
  const harness = hookHarness();
  const HarnessedTrustSettings = createSourceLoader({ react: harness.react })(source("p5-trust.tsx")).TrustSettings;
  const previousDocument = globalThis.document;
  const previousCreateObjectURL = URL.createObjectURL;
  const previousRevokeObjectURL = URL.revokeObjectURL;
  globalThis.document = { createElement() { return { click() {} }; } };
  URL.createObjectURL = () => "blob:chapter-export";
  URL.revokeObjectURL = () => {};
  try {
    const render = () => harness.render(HarnessedTrustSettings, trustProps);
    let tree = render();
    const exportButton = nodes(tree, (node) => node.type === "button" && textOf(node) === "Télécharger mon archive")[0];
    exportButton.props.onClick();
    tree = render();
    let feedback = nodes(tree, (node) => node.props?.className === "temporary-feedback")[0];
    assert.match(textOf(feedback), /Téléchargement lancé/);
    assert.equal(feedback.props.role, "status");

    const importInput = nodes(tree, (node) => node.type === "input" && node.props?.type === "file")[0];
    await importInput.props.onChange({ target: { files: [{ text: async () => JSON.stringify(trustProps.createExport()) }], value: "archive.json" } });
    tree = render();
    feedback = nodes(tree, (node) => node.props?.className === "temporary-feedback")[0];
    assert.match(textOf(feedback), /Import privé terminé/);
    assert.doesNotMatch(textOf(feedback), /Annuler/);
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
    URL.createObjectURL = previousCreateObjectURL;
    URL.revokeObjectURL = previousRevokeObjectURL;
  }
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

test("the saved public identity is projected into reviews, replies, lists and the profile card", async () => {
  const personalActor = { name: "Lectora des Brumes", initials: "LD" };
  const reviewMarkup = renderToStaticMarkup(React.createElement(SocialReviews, { workId: "cartographies", personalReview: "Une trace personnelle.", personalRating: 4, personalActor, onOpenProfile() {}, onWriteReview() {} }));
  assert.match(reviewMarkup, /Lectora des Brumes/);
  assert.match(reviewMarkup, />LD</);

  const profileMarkup = renderToStaticMarkup(React.createElement(ProfileView, { owner: "self", displayName: personalActor.name, works: publicWorks, following: false, onToggleFollow() {}, onOpenWork() {}, onOpenHonors() {}, onOpenList() {}, photo: null, onEditPhoto() {}, onRemovePhoto() {}, equippedTitle: "Esprit nomade", showcase: [] }));
  assert.match(profileMarkup, /Lectora des Brumes/);
  assert.match(profileMarkup, />LD</);

  const listMarkup = renderToStaticMarkup(React.createElement(PublicListView, { owner: "self", displayName: personalActor.name, listId: "places", works: publicWorks, following: false, onToggleFollow() {}, onOpenProfile() {}, onOpenWork() {}, onBack() {}, backLabel: "Retour" }));
  assert.match(listMarkup, /Lectora des Brumes/);
  assert.match(listMarkup, />LD</);

  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /const publicActor = \{ name: publicProfileName, initials: initialsFor\(publicProfileName\) \}/);
  assert.equal((page.match(/personalActor=\{publicActor\}/g) ?? []).length, 2);
  assert.doesNotMatch(page, /personalActor=\{publicName/);
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

test("P5 import keeps imported reviews private and merges journal traces without erasing local history", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/reglages" }, history: { pushState() {}, replaceState() {} }, scrollTo() {}, requestAnimationFrame(callback) { callback(); return 1; }, addEventListener() {}, removeEventListener() {} };
  const works = publicWorks.slice(0, 2);
  const [firstWork, secondWork] = works;
  const initialData = {
    works,
    view: "journal",
    entries: {
      [firstWork.id]: { readingStatus: "Lu", readingDate: "1 septembre 2026", note: "Note locale", review: "Critique déjà publique", reviewPublished: true, rating: 5, completedReadings: 1 },
      [secondWork.id]: { readingStatus: null, readingDate: "", note: "", review: "", reviewPublished: false, rating: 0, completedReadings: 0 },
    },
    traces: [{ id: "trace-local", workId: firstWork.id, date: "Aujourd’hui", kind: "Note privée", text: "Trace locale", action: "note" }],
  };
  try {
    const render = () => harness.render(Home, { refined: true, initialData, initialSettingsOpen: true });
    let tree = render();
    let settings = nodes(tree, (node) => node.type?.name === "TrustSettings")[0];
    const result = settings.props.onImport({
      format: "chapter-export",
      version: 1,
      exportedAt: "2026-09-08T08:00:00.000Z",
      account: { publicName: "Autre nom" },
      privacy: { journal: "private", library: "private", notes: "private" },
      privateRecords: [
        { workId: firstWork.id, readingStatus: "Lu", note: "Note restaurée", review: "Ne doit pas remplacer la publication", rating: 1, completedReadings: 2 },
        { workId: secondWork.id, readingStatus: "À lire", review: "Critique importée", rating: 4, completedReadings: 0 },
      ],
      journalTraces: [{ id: "trace-imported-review", workId: secondWork.id, date: "Hier", kind: "Critique publique", text: "Critique importée", action: "review" }],
      publications: [{ authorId: "self", workId: secondWork.id, rating: 4, date: "Hier", text: "Critique importée" }],
      followingActorIds: ["lina"],
      blockedActorIds: ["theo"],
    });
    assert.deepEqual(result, { records: 2, traces: 1 });

    tree = render();
    settings = nodes(tree, (node) => node.type?.name === "TrustSettings")[0];
    const exported = settings.props.createExport();
    const firstRecord = exported.privateRecords.find((record) => record.workId === firstWork.id);
    const secondRecord = exported.privateRecords.find((record) => record.workId === secondWork.id);
    assert.equal(firstRecord.note, "Note restaurée");
    assert.equal(firstRecord.review, "Critique déjà publique");
    assert.equal(firstRecord.rating, 5);
    assert.equal(secondRecord.review, "Critique importée");
    assert.equal(secondRecord.reviewPublished, false);
    assert.deepEqual(exported.publications.map((publication) => publication.text), ["Critique déjà publique"]);
    assert.deepEqual(exported.journalTraces.map((trace) => trace.id), ["trace-imported-review", "trace-local"]);
    assert.equal(exported.journalTraces[0].kind, "Critique importée · privée");
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
  assert.match(css, /\.trust-card-toolbar \{[^}]*position: sticky;[^}]*justify-content: flex-end/);
  assert.match(css, /\.trust-index a\.active \{ color: var\(--brick\); \}/);
  assert.match(css, /\.trust-card \{[^}]*scroll-behavior: smooth/);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*?\.trust-card \{ scroll-behavior: auto; \}/);
  assert.match(css, /@media \(max-width: 899px\)/);
  assert.match(globals, /p5-trust\.css/);
});

test("settings track their visible chapter and account controls reuse the saved profile photo", async () => {
  const [settings, page, globals] = await Promise.all([
    readFile(new URL("../app/p5-trust.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(settings, /onScroll=\{syncActiveSection\}/);
  assert.match(settings, /card\.scrollTo\(\{ top: Math\.max\(0, top\), behavior: reducedMotion \? "auto" : "smooth" \}\)/);
  assert.equal((settings.match(/aria-current=\{activeSection ===/g) ?? []).length, 5);
  assert.equal((page.match(/<AccountAvatar photo=\{profilePhoto\} publicName=\{publicProfileName\} \/>/g) ?? []).length, 2);
  assert.match(page, /<Image src=\{photo\.preview\} alt="" fill sizes="44px" unoptimized \/>/);
  assert.match(page, /initialsFor\(publicName\)/);
  assert.equal((page.match(/<strong>\{publicProfileName\}<\/strong>|<h2>\{publicProfileName\}<\/h2>/g) ?? []).length, 2);
  assert.match(globals, /\.account-button \{[^}]*position: relative;[^}]*overflow: hidden;/);
  assert.match(globals, /\.account-button img \{ object-fit: cover; \}/);
});

test("connected desktop navigation keeps the public sizing and animated brick marker", async () => {
  const [css, personalCss] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/p3-personal.css", import.meta.url), "utf8"),
  ]);
  assert.match(css, /\.desktop-header nav \{[^}]*align-self: stretch[^}]*font-size: 1rem/);
  assert.match(css, /\.desktop-header nav button::after \{[^}]*background: var\(--brick\)[^}]*transition: opacity/);
  assert.match(css, /\.desktop-header nav button\.active::after \{ opacity: 1; \}/);
  assert.match(personalCss, /\.p3-shell \.desktop-header \{[^}]*grid-template-columns: 1fr auto 1fr;[^}]*min-height: 4\.75rem;[^}]*padding-inline: var\(--space-7\);/);
  assert.match(personalCss, /\.p3-shell \.desktop-header nav \{[^}]*gap: var\(--space-6\);/);
});
