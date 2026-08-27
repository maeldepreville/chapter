import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";
import { emptyEntry, retainedTrace, socialHandlers, profileProps } from "./fixtures/phase11.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const load = createSourceLoader();
const { default: Home, defaultWorks: works } = load(source("page.tsx"));
const { DiscoverView, ProfileView, PublicListView } = load(source("phase10.tsx"));
const { availableWorks, availableWorkCount } = load(source("catalogue.ts"));
const { saveWrittenTrace, saveReadingTrace } = load(source("journal-model.ts"));
const html = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
const home = (initialData) => html(Home, { initialData });
const journal = (entries = {}, traces = [], catalogue = works) => home({ view: "journal", entries, traces, works: catalogue });
const discover = (extra = {}) => html(DiscoverView, { ...socialHandlers, works, statuses: {}, followingLina: false, ...extra });
const publicList = (catalogue, listId = "places") => html(PublicListView, { ...socialHandlers, works: catalogue, listId, following: false, backLabel: "Retour à Découvrir" });

test("all principal views render an empty catalogue without substituting a work", () => {
  for (const view of ["work", "journal", "library", "discover", "profile", "list"]) {
    const rendered = home({ works: [], entries: {}, traces: [], view });
    assert.match(rendered, /<h1/);
    assert.doesNotMatch(rendered, /class="(?:book-cover|favorite-cover|discovery-cover|public-list-cover)/);
  }
  assert.match(discover({ works: [] }), /Aucune œuvre disponible/);
  assert.match(html(ProfileView, { ...profileProps, works: [] }), /Œuvre indisponible/);
  assert.match(publicList([]), /Aucune œuvre de cette liste/);
});

test("partial lists show each available work once, keep order, and report correct counts", () => {
  const one = publicList([works[0]]);
  assert.equal((one.match(/<article/g) ?? []).length, 1);
  assert.match(one, /1 œuvre disponible sur 6/);
  assert.doesNotMatch(one, /Le Rivage des heures/);
  assert.equal((publicList(works).match(/<article/g) ?? []).length, 6);
  assert.equal((publicList(works, "lights").match(/<article/g) ?? []).length, 4);
  assert.deepEqual(availableWorks(works, ["absent", "sel", "sel", "atlas"]).map((work) => work.id), ["sel", "atlas"]);
  assert.equal(availableWorkCount(6, 6), "6 œuvres");
});

test("missing discovery primary retains its real echoes but does not promote a false replacement", () => {
  const rendered = discover({ works: [works[4]] });
  assert.match(rendered, /Cette proposition n’est pas disponible/);
  assert.match(rendered, /La Maison des miroirs lents/);
  assert.doesNotMatch(rendered, /class="discovery-feature"/);
  assert.doesNotMatch(rendered, /Le Rivage des heures/);
});

test("profile partial favorites and public reviews retain their real identities", () => {
  const rendered = html(ProfileView, { ...profileProps, works: [works[0]] });
  assert.equal((rendered.match(/class="favorite-cover/g) ?? []).length, 1);
  assert.match(rendered, /1 œuvre disponible sur 6/);
  assert.match(rendered, /Œuvre indisponible/);
  assert.match(rendered, /Le livre avance par signes minuscules/);
  assert.doesNotMatch(rendered, /Atlas des nuits calmes/);
});

test("EH1 is editorial without history or with only a reading wish", () => {
  for (const statuses of [{}, { cartographies: "À lire" }, { atlas: "Lu" }]) {
    const rendered = discover({ statuses });
    assert.match(rendered, /Un choix de Chapter pour commencer/);
    assert.doesNotMatch(rendered, /Dans la continuité des Cartographies/);
    assert.match(rendered, /Aujourd’hui, j’aimerais/);
    assert.match(rendered, /Les propositions évolueront/);
  }
  assert.match(discover({ statuses: { cartographies: "En cours" } }), /Dans la continuité des Cartographies/);
  assert.match(discover({ historyWorkIds: ["cartographies"] }), /Dans la continuité des Cartographies/);
  assert.match(discover({ works: works.slice(1), historyWorkIds: ["cartographies"] }), /Un choix de Chapter pour commencer/);
});

test("Journal with no readings and no traces has one merged invitation and no empty rail", () => {
  const rendered = journal();
  assert.match(rendered, /Votre journal commence avec une œuvre/);
  assert.match(rendered, /Rechercher une œuvre/);
  assert.doesNotMatch(rendered, /current-reading-rail|journal-timeline|À retenir/);
});

test("Journal with traces but no readings chooses its action from the available To Read list", () => {
  const without = journal({}, [retainedTrace]);
  assert.match(without, /Aucune lecture en cours/);
  assert.match(without, /Rechercher une œuvre/);
  assert.doesNotMatch(without, /Voir mes livres à lire|current-reading-rail|journal-timeline/);
  const withToRead = journal({ sel: { ...emptyEntry, readingStatus: "À lire" } }, [retainedTrace]);
  assert.match(withToRead, /Voir mes livres à lire/);
  assert.doesNotMatch(withToRead, /Votre journal commence/);
});

test("Journal with readings but no traces retains reading actions without a second CTA", () => {
  const rendered = journal({ cartographies: { ...emptyEntry, readingStatus: "En cours" } });
  assert.match(rendered, /Votre prochaine note ou étape de lecture apparaîtra ici/);
  assert.match(rendered, /Ajouter une note/);
  assert.doesNotMatch(rendered, /journal-timeline|Votre journal commence|Rechercher une œuvre<\/button>/);
});

test("missing work metadata never hides private writing or links it to an unrelated work", () => {
  const rendered = journal({}, [retainedTrace], [works[1]]);
  assert.match(rendered, /Œuvre indisponible/);
  assert.match(rendered, /Une pensée personnelle à conserver/);
  assert.match(rendered, /visible uniquement par vous/);
  assert.doesNotMatch(rendered, /trace-work-link|>Modifier<|Le Rivage des heures/);
});

test("written and reading traces can start an empty journal without deleting unrelated history", () => {
  const first = saveWrittenTrace([], "atlas", "note", " Ma première note ", "Aujourd’hui");
  assert.equal(first[0].text, "Ma première note");
  assert.equal(first[0].kind, "Note privée");
  const updated = saveWrittenTrace([retainedTrace, ...first], "atlas", "note", "Modifiée", "Aujourd’hui");
  assert.equal(updated.length, 2);
  assert.equal(updated[0].id, first[0].id);
  assert.deepEqual(saveWrittenTrace(updated, "atlas", "note", "", "Aujourd’hui"), [retainedTrace]);
  const reading = saveReadingTrace(first, "atlas", "En cours", "Aujourd’hui");
  assert.equal(reading[0].kind, "Lecture commencée");
  assert.equal(saveReadingTrace(reading, "atlas", "En cours", "Aujourd’hui").length, 2);
});

function interactiveHome(initialData) {
  const harness = hookHarness();
  const localLoad = createSourceLoader({ react: harness.react });
  const Component = localLoad(source("page.tsx")).default;
  const render = () => harness.render(Component, { initialData });
  const button = (label) => {
    const matches = nodes(render(), (node) => node.type === "button" && textOf(node) === label);
    assert.equal(matches.length, 1, `Unique button: ${label}`);
    return matches[0];
  };
  return { render, button };
}

test("saving a first note updates the real Home journal; clearing it returns to the trace-empty state", () => {
  const ui = interactiveHome({ view: "journal", entries: { cartographies: { ...emptyEntry, readingStatus: "En cours" } }, traces: [] });
  ui.button("Ajouter une note").props.onClick();
  nodes(ui.render(), (node) => node.type === "textarea")[0].props.onChange({ target: { value: "Ma première trace" } });
  ui.button("Enregistrer").props.onClick();
  assert.match(textOf(ui.render()), /Ma première trace/);
  assert.doesNotMatch(textOf(ui.render()), /Votre prochaine note/);
  ui.button("Modifier ma note").props.onClick();
  nodes(ui.render(), (node) => node.type === "textarea")[0].props.onChange({ target: { value: "" } });
  ui.button("Enregistrer").props.onClick();
  assert.match(textOf(ui.render()), /Votre prochaine note/);
});

test("shared cover behavior uses neutral loading, a real image on success, and same-work typography on failure", () => {
  const harness = hookHarness();
  const { CoverFrame } = createSourceLoader({ react: harness.react })(source("cover-frame.tsx"));
  const props = { work: works[0], className: "book-cover", sizes: "320px", children: React.createElement("strong", null, works[0].title) };
  const element = CoverFrame(props);
  const render = () => harness.render(element.type, element.props);
  assert.match(render().props.className, /cover-image/);
  assert.equal(render().props.children.props.style.opacity, 0);
  assert.doesNotMatch(textOf(render()), /Cartographies/);
  render().props.children.props.onLoad();
  assert.equal(render().props.children.props.style.opacity, 1);
  render().props.children.props.onError();
  assert.match(render().props.className, /typographic-cover slate/);
  assert.match(textOf(render()), /Les Cartographies du vent/);
  assert.notEqual(CoverFrame({ ...props, work: { ...works[0], coverSrc: "/replacement.png" } }).key, element.key);
  const absent = CoverFrame({ ...props, work: works[1] });
  assert.match(harness.render(absent.type, absent.props).props.className, /typographic-cover brick/);
});

function withWindow(run) {
  const previous = globalThis.window;
  globalThis.window = { location: { pathname: "/" }, scrollTo() {} };
  try { run(); } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
}
const clickFirst = (ui, label) => {
  const match = nodes(ui.render(), (node) => node.type === "button" && textOf(node) === label)[0];
  assert.ok(match, `Button exists: ${label}`);
  match.props.onClick();
};

test("starting a reading creates a first trace and removing the book preserves it", () => withWindow(() => {
  const ui = interactiveHome({ view: "work", entries: {}, traces: [] });
  clickFirst(ui, "Ajouter au journal");
  ui.button("En cours").props.onClick();
  clickFirst(ui, "Journal");
  assert.match(textOf(ui.render()), /Lecture commencée/);
  clickFirst(ui, "Bibliothèque");
  nodes(ui.render(), (node) => node.props?.className === "library-status-trigger")[0].props.onClick();
  ui.button("Retirer de la bibliothèque").props.onClick();
  clickFirst(ui, "Journal");
  assert.match(textOf(ui.render()), /Aucune lecture en cours/);
  assert.match(textOf(ui.render()), /Lecture commencée/);
  assert.doesNotMatch(textOf(ui.render()), /Votre journal commence/);
}));

test("removing a book with writing and undoing removal never erases the private trace", () => withWindow(() => {
  const ui = interactiveHome({ view: "library", entries: { cartographies: { ...emptyEntry, readingStatus: "En cours", note: retainedTrace.text } }, traces: [retainedTrace] });
  nodes(ui.render(), (node) => node.props?.className === "library-status-trigger")[0].props.onClick();
  ui.button("Retirer de la bibliothèque").props.onClick();
  assert.match(textOf(ui.render()), /Retirer cette œuvre/);
  ui.button("Retirer de la bibliothèque").props.onClick();
  clickFirst(ui, "Journal");
  assert.match(textOf(ui.render()), /Une pensée personnelle à conserver/);
  ui.button("Annuler").props.onClick();
  assert.match(textOf(ui.render()), /Une pensée personnelle à conserver/);
  assert.doesNotMatch(textOf(ui.render()), /Aucune lecture en cours/);
}));

test("undoing a first review removes only its new trace and keeps the draft", () => withWindow(() => {
  const ui = interactiveHome({ view: "work", entries: {}, traces: [retainedTrace] });
  clickFirst(ui, "Écrire une critique");
  nodes(ui.render(), (node) => node.type === "textarea")[0].props.onChange({ target: { value: "Une critique nouvelle" } });
  ui.button("Publier la critique").props.onClick();
  clickFirst(ui, "Journal");
  assert.match(textOf(ui.render()), /Une critique nouvelle/);
  ui.button("Annuler").props.onClick();
  const traces = nodes(ui.render(), (node) => node.type === "article" && node.props.className?.includes("personal-trace"));
  assert.equal(traces.length, 1);
  assert.match(textOf(traces), /Une pensée personnelle à conserver/);
  assert.equal(nodes(ui.render(), (node) => node.type === "textarea")[0].props.value, "Une critique nouvelle");
}));

test("Library empty filters and searches keep their independent recovery actions", () => {
  const ui = interactiveHome({ view: "library", entries: { cartographies: { ...emptyEntry, readingStatus: "En cours" } }, traces: [] });
  nodes(ui.render(), (node) => node.type === "button" && Array.isArray(node.props.children) && node.props.children[0] === "Lu")[0].props.onClick();
  assert.match(textOf(ui.render()), /Aucune œuvre dans « Lu »/);
  ui.button("Voir toutes les œuvres").props.onClick();
  const search = nodes(ui.render(), (node) => node.type === "input" && node.props.placeholder === "Rechercher dans ma bibliothèque")[0];
  search.props.onChange({ target: { value: "introuvable" } });
  assert.match(textOf(ui.render()), /Aucun résultat pour « introuvable »/);
  ui.button("Effacer la recherche").props.onClick();
  assert.match(textOf(ui.render()), /Les Cartographies du vent/);
});
