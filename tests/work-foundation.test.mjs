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
  assert.match(chapters, /href="#about"[\s\S]*href="#journal"[\s\S]*href="#reviews"/);
  for (const id of ["about", "journal", "reviews"]) assert.match(markup, new RegExp(`id="${id}" class="section-heading"`));
  assert.match(markup, /visibles uniquement par vous/);
  assert.match(markup, /Les critiques publiées sont distinctes/);
  assert.match(markup, /book-opening|about-layout/);
  assert.doesNotMatch(markup, /Traces publiques|Chemins voisins/);
  assert.doesNotMatch(markup, /Ma note de cette lecture|Ma critique/);
});

test("guest and personal work sections share their navigation and status-menu layers", () => {
  const load = createSourceLoader();
  const { WorkSectionNav, isWorkSectionLocation } = load(source("work-section-nav.tsx"));
  const markup = renderToStaticMarkup(React.createElement(WorkSectionNav, { activeSection: "journal" }));
  assert.match(markup, /href="#journal"[^>]*class="active"|class="active"[^>]*href="#journal"/);
  assert.equal(isWorkSectionLocation("/recette/oeuvre", "#reviews", "cartographies", "/recette/oeuvre"), true);
  assert.equal(isWorkSectionLocation("/oeuvres/cartographies", "#about", "cartographies", null), true);
  assert.equal(isWorkSectionLocation("/decouvrir", "#about", "cartographies", "/recette/oeuvre"), false);
  const publicSource = readFileSync(source("p1-public.tsx"), "utf8");
  const personalSource = readFileSync(source("page.tsx"), "utf8");
  assert.match(publicSource, /<WorkSectionNav activeSection=\{activeSection\}/);
  assert.match(personalSource, /<WorkSectionNav activeSection=\{activeSection\}/);
  assert.match(personalSource, /path === initialPublicWorkPath\.current/);
  assert.match(publicSource, /className="status-control"[\s\S]*className="status-popover"/);
  const css = readFileSync(source("globals.css"), "utf8");
  const publicCss = readFileSync(source("p1-public.css"), "utf8");
  assert.match(css, /\.status-control \{ position: relative; \}/);
  assert.match(css, /\.section-nav \{[\s\S]*?z-index: 30;/);
  assert.match(css, /\.status-popover \{[\s\S]*?z-index: 50;/);
  assert.match(publicCss, /\.work-public-reviews > \.work-review-action \{ margin-left: 0; \}/);
  assert.doesNotMatch(publicCss, /\.work-chapter \{[^}]*scroll-margin-top/);
  assert.doesNotMatch(publicSource, /p2-status-control|p2-status-menu/);
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
    const archived = nodes(render(), (node) => node.type?.name === "WorkReadingHistory")[0];
    assert.equal(archived.props.experiences[0].note, "La pensée de ma première lecture.");
    assert.equal(archived.props.experiences[0].state, "completed");
    assert.equal(archived.props.currentExperienceId, "reading-cartographies-2");
    assert.match(textOf(render()), /Aucune pensée consignée/);
    const settings = nodes(render(), (node) => node.type?.name === "TrustSettings")[0];
    const snapshot = settings.props.createExport();
    assert.equal(snapshot.privateRecords[0].experiences[0].note, "La pensée de ma première lecture.");
    assert.equal(snapshot.privateRecords[0].experiences[1].state, "active");
    assert.ok(snapshot.journalTraces.some((trace) => trace.text === "La pensée de ma première lecture."));
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("a long rereading history shows three experiences first and reveals five at a time without ordinal labels", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const { WorkReadingHistory } = load(source("work-past-notes.tsx"));
  const experiences = Array.from({ length: 12 }, (_, index) => ({ id: `reading-${index + 1}`, sequence: index + 1, state: index === 4 ? "interrupted" : "completed", startedAt: "", endedAt: "", note: `Pensée ${index + 1}` }));
  const render = () => harness.render(WorkReadingHistory, { experiences });
  assert.equal(nodes(render(), (node) => node.props?.className === "work-reading-experience").length, 3);
  assert.doesNotMatch(textOf(render()), /\d+e lecture/);
  assert.match(textOf(render()), /Lecture terminée/);
  nodes(render(), (node) => node.type === "button" && textOf(node).includes("Voir les lectures plus anciennes"))[0].props.onClick();
  assert.equal(nodes(render(), (node) => node.props?.className === "work-reading-experience").length, 8);
  nodes(render(), (node) => node.type === "button" && textOf(node).includes("Voir les lectures plus anciennes"))[0].props.onClick();
  assert.equal(nodes(render(), (node) => node.props?.className === "work-reading-experience").length, 12);
  assert.equal(nodes(render(), (node) => node.type === "button" && textOf(node).includes("Voir les lectures plus anciennes")).length, 0);
});

test("stopping for now preserves the active experience and makes it resumable without calling it completed", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const Home = load(source("page.tsx")).default;
  const { coreWorks } = load(source("foundation/fixtures.ts"));
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/oeuvres/cartographies" }, history: { pushState() {}, replaceState() {} }, scrollTo() {} };
  try {
    const render = () => harness.render(Home, { initialSettingsOpen: true, initialData: { view: "work", works: coreWorks, entries: { cartographies: { readingStatus: "En cours", readingDate: "", note: "Une pensée inachevée.", review: "", rating: 0 } }, traces: [] } });
    nodes(render(), (node) => node.type === "button" && textOf(node) === "Gérer cette lecture")[0].props.onClick();
    nodes(render(), (node) => node.type === "button" && textOf(node) === "Arrêter pour l’instant")[0].props.onClick();

    assert.match(textOf(render()), /À lireLecture interrompue · à reprendre/);
    assert.doesNotMatch(textOf(render()), /Écrire un bilan/);
    const history = nodes(render(), (node) => node.type?.name === "WorkReadingHistory")[0];
    assert.equal(history.props.experiences[0].state, "interrupted");
    assert.equal(history.props.experiences[0].note, "Une pensée inachevée.");
    const settings = nodes(render(), (node) => node.type?.name === "TrustSettings")[0];
    assert.equal(settings.props.createExport().privateRecords[0].experiences[0].state, "interrupted");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("removing a work from the Library keeps its reading experiences in the private archive", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const Home = load(source("page.tsx")).default;
  const { coreWorks } = load(source("foundation/fixtures.ts"));
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/oeuvres/cartographies" }, history: { pushState() {}, replaceState() {} }, scrollTo() {} };
  try {
    const render = () => harness.render(Home, { initialSettingsOpen: true, initialData: { view: "work", works: coreWorks, entries: { cartographies: { readingStatus: "Lu", readingDate: "12 septembre 2026", note: "Une mémoire conservée.", review: "", rating: 0, completedReadings: 1 } }, traces: [] } });
    nodes(render(), (node) => node.type === "button" && textOf(node) === "Gérer cette lecture")[0].props.onClick();
    nodes(render(), (node) => node.type === "button" && textOf(node) === "Retirer de la bibliothèque")[0].props.onClick();
    nodes(render(), (node) => node.type === "button" && textOf(node) === "Retirer de la bibliothèque")[0].props.onClick();

    const settings = nodes(render(), (node) => node.type?.name === "TrustSettings")[0];
    const record = settings.props.createExport().privateRecords.find((item) => item.workId === "cartographies");
    assert.equal(record.libraryHidden, true);
    assert.equal(record.readingStatus, "Lu");
    assert.equal(record.experiences[0].note, "Une mémoire conservée.");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("the Library keeps a changing work beside its optional date until the step closes", () => {
  const cases = [
    { initialStatus: "À lire", filter: "À lire", action: "Commencer la lecture", nextStatus: "En cours" },
    { initialStatus: "En cours", filter: "En cours", action: "Terminer la lecture", nextStatus: "Lu" },
    { initialStatus: "Lu", filter: "Lu", action: "Relire", nextStatus: "En cours" },
  ];

  for (const scenario of cases) {
    const harness = hookHarness();
    const load = createSourceLoader({ react: harness.react });
    const Home = load(source("page.tsx")).default;
    const { coreWorks } = load(source("foundation/fixtures.ts"));
    const render = () => harness.render(Home, { initialSettingsOpen: true, initialData: { view: "library", works: coreWorks, entries: { cartographies: { readingStatus: scenario.initialStatus, readingDate: "", note: "", review: "", rating: 0, completedReadings: scenario.initialStatus === "Lu" ? 1 : 0 } }, traces: [] } });

    const filter = nodes(render(), (node) => node.type === "button" && Array.isArray(node.props.children) && node.props.children[0] === scenario.filter)[0];
    filter.props.onClick();
    nodes(render(), (node) => node.props?.className === "library-status-trigger")[0].props.onClick();
    nodes(render(), (node) => node.type === "button" && textOf(node) === scenario.action)[0].props.onClick();

    let card = nodes(render(), (node) => node.type === "article" && node.props?.className === "library-work")[0];
    assert.ok(card, `${scenario.action}: work remains in its original filter during date selection`);
    assert.match(textOf(card), new RegExp(`${scenario.nextStatus}.*Ajouter une date de`));
    assert.equal(nodes(render(), (node) => node.props?.className === "library-date-relay").length, 0);

    nodes(card, (node) => node.type === "button" && textOf(node) === "Plus tard")[0].props.onClick();
    card = nodes(render(), (node) => node.type === "article" && node.props?.className === "library-work")[0];
    assert.equal(card, undefined, `${scenario.action}: work moves to its new filter after the date step closes`);
  }
});
