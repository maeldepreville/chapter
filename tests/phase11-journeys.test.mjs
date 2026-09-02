import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

function journey(initialData) {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const Home = load(source("page.tsx")).default;
  const render = () => harness.render(Home, { initialData });
  const component = (name) => {
    const matches = nodes(render(), (node) => typeof node.type === "function" && node.type.name === name);
    assert.equal(matches.length, 1, `Unique component: ${name}`);
    return matches[0];
  };
  const button = (label) => {
    const match = nodes(render(), (node) => node.type === "button" && textOf(node) === label)[0];
    assert.ok(match, `Button exists: ${label}`);
    return match;
  };
  return { render, component, button };
}

function withWindow(run) {
  const previous = globalThis.window;
  globalThis.window = {
    location: { pathname: "/" },
    history: { replaceState() {} },
    scrollTo() {},
  };
  try { run(); } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
}

test("Discover, Lina's profile, public list and honors preserve origin and relationship state", () => {
  const ui = journey({ view: "discover" });
  withWindow(() => {
  const discover = ui.component("DiscoverView");
  discover.props.onToggleFollow();
  discover.props.onOpenProfile("lina");

  let profile = ui.component("ProfileView");
  assert.equal(profile.props.owner, "lina");
  assert.equal(profile.props.following, true);
  profile.props.onOpenList("lights");

  let list = ui.component("PublicListView");
  assert.equal(list.props.listId, "lights");
  assert.equal(list.props.owner, "lina");
  assert.equal(list.props.backLabel, "Retour au profil de Lina");
  assert.equal(list.props.following, true);
  list.props.onBack();

  profile = ui.component("ProfileView");
  assert.equal(profile.props.owner, "lina");
  assert.equal(profile.props.following, true);
  profile.props.onOpenHonors();

  const honors = ui.component("HonorsView");
  assert.equal(honors.props.owner, "lina");
  honors.props.onBack();
  assert.equal(ui.component("ProfileView").props.owner, "lina");

  ui.button("Découvrir").props.onClick();
  ui.component("DiscoverView").props.onOpenList("places");
  list = ui.component("PublicListView");
  assert.equal(list.props.owner, "lina");
  assert.equal(list.props.backLabel, "Retour à Découvrir");
  list.props.onBack();
    assert.equal(ui.component("DiscoverView").props.followingLina, true);
  });
});

test("a list opened from Maël's profile preserves its owner and return context", () => {
  const ui = journey({ view: "profile" });
  withWindow(() => {
    let profile = ui.component("ProfileView");
    assert.equal(profile.props.owner, "self");
    profile.props.onOpenList("places");

    const list = ui.component("PublicListView");
    assert.equal(list.props.owner, "self");
    assert.equal(list.props.backLabel, "Retour à mon profil");
    list.props.onOpenProfile();

    profile = ui.component("ProfileView");
    assert.equal(profile.props.owner, "self");
    profile.props.onOpenList("lights");
    ui.component("PublicListView").props.onBack();
    assert.equal(ui.component("ProfileView").props.owner, "self");
  });
});

test("reading status, optional date and Journal traces remain continuous", () => {
  const ui = journey({ view: "work", entries: {}, traces: [] });
  withWindow(() => {
  ui.button("Ajouter au journal").props.onClick();
  ui.button("En cours").props.onClick();
  assert.match(textOf(ui.render()), /Ajouter une date de début/);
  ui.button("Plus tard").props.onClick();
  assert.doesNotMatch(textOf(ui.render()), /Ajouter une date de début/);

  ui.button("Journal").props.onClick();
  assert.match(textOf(ui.render()), /Lecture commencée/);
  ui.button("Les Cartographies du ventCamille Maret").props.onClick();

  ui.button("En cours").props.onClick();
  ui.button("Lu").props.onClick();
  assert.match(textOf(ui.render()), /Ajouter une date de fin/);
  ui.button("Choisir").props.onClick();
  const date = nodes(ui.render(), (node) => node.type === "input" && node.props.type === "date")[0];
  assert.ok(date);
  date.props.onChange({ target: { value: "2026-09-01" } });
  ui.button("Enregistrer la date").props.onClick();
  assert.match(textOf(ui.render()), /Date enregistrée · 1 septembre 2026/);

    ui.button("Journal").props.onClick();
    assert.match(textOf(ui.render()), /Lecture terminée/);
  });
});

test("undoing a discovery save restores the previous empty Library", () => {
  const ui = journey({ view: "discover", entries: {}, traces: [] });
  withWindow(() => {
  ui.component("DiscoverView").props.onAddToRead("cartographies");
  assert.match(textOf(ui.render()), /Ajouté à « À lire »/);

  ui.button("Bibliothèque").props.onClick();
  assert.match(textOf(ui.render()), /Les Cartographies du vent/);
  ui.button("Annuler").props.onClick();
    assert.match(textOf(ui.render()), /Votre bibliothèque attend sa première œuvre/);
    assert.doesNotMatch(textOf(ui.render()), /Ajouté à « À lire »/);
  });
});
