import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";
import { profileProps } from "./fixtures/phase11.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("the personal profile exposes editing while public portraits remain read-only", () => {
  const load = createSourceLoader();
  const { ProfileView } = load(source("phase10.tsx"));
  const { defaultWorks } = load(source("page.tsx"));
  const editable = renderToStaticMarkup(React.createElement(ProfileView, {
    ...profileProps,
    works: defaultWorks,
    onSaveFavorites() {},
    onSaveLists() {},
  }));
  const publicPortrait = renderToStaticMarkup(React.createElement(ProfileView, {
    ...profileProps,
    owner: "lina",
    works: defaultWorks,
    onSaveFavorites() {},
    onSaveLists() {},
  }));

  assert.match(editable, />Modifier</);
  assert.match(editable, />Gérer mes listes</);
  assert.doesNotMatch(publicPortrait, />Modifier</);
  assert.doesNotMatch(publicPortrait, />Gérer mes listes</);
});

test("profile curation opens dedicated favorites and lists editors", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const { ProfileView } = load(source("phase10.tsx"));
  const { defaultWorks } = load(source("page.tsx"));
  const props = {
    ...profileProps,
    works: defaultWorks,
    favoriteWorkIds: ["cartographies", "atlas", "miroirs"],
    personalLists: [],
    onSaveFavorites() {},
    onSaveLists() {},
  };
  const render = () => harness.render(ProfileView, props);

  nodes(render(), (node) => node.type === "button" && textOf(node) === "Modifier")[0].props.onClick();
  assert.equal(nodes(render(), (node) => node.type?.name === "FavoritesEditor").length, 1);

  nodes(render(), (node) => node.type?.name === "FavoritesEditor")[0].props.onClose();
  nodes(render(), (node) => node.type === "button" && textOf(node) === "Gérer mes listes")[0].props.onClick();
  assert.equal(nodes(render(), (node) => node.type?.name === "ListsEditor").length, 1);
});

test("editors explain the three-work limit and support list creation, updates and deletion", () => {
  const load = createSourceLoader();
  const { defaultWorks } = load(source("page.tsx"));
  const { FavoritesEditor, ListsEditor } = load(source("profile-curation.tsx"));
  const favorites = renderToStaticMarkup(React.createElement(FavoritesEditor, {
    works: defaultWorks,
    selected: ["cartographies"],
    onSave() {},
    onClose() {},
  }));
  const lists = renderToStaticMarkup(React.createElement(ListsEditor, {
    works: defaultWorks,
    lists: [{ id: "places", title: "Lieux qui nous changent", description: "Des paysages qui déplacent.", profileSummary: "Des paysages qui déplacent.", workIds: ["rivage"] }],
    onSave() {},
    onClose() {},
  }));

  assert.match(favorites, /Jusqu’à trois livres/);
  assert.match(favorites, /Enregistrer la sélection/);
  assert.match(lists, /Créer une liste/);
  assert.match(lists, />Modifier</);
  assert.match(lists, />Supprimer</);
  assert.match(lists, /Publique/);
});

test("list changes are committed together and cancellation remains non-destructive", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const { defaultWorks } = load(source("page.tsx"));
  const { ListsEditor } = load(source("profile-curation.tsx"));
  const saved = [];
  let closed = 0;
  const props = {
    works: defaultWorks,
    lists: [{ id: "places", title: "Lieux", description: "Des paysages.", profileSummary: "Des paysages.", workIds: ["rivage"] }],
    onSave(lists) { saved.push(lists); },
    onClose() { closed += 1; },
  };
  const render = () => harness.render(ListsEditor, props);

  nodes(render(), (node) => node.type === "button" && textOf(node) === "Créer une liste")[0].props.onClick();
  let tree = render();
  nodes(tree, (node) => node.props?.id === "profile-list-title")[0].props.onChange({ target: { value: "Traversées" } });
  nodes(tree, (node) => node.props?.id === "profile-list-description")[0].props.onChange({ target: { value: "Des livres pour changer d’horizon." } });
  tree = render();
  nodes(tree, (node) => node.type === "button" && textOf(node) === "Créer la liste")[0].props.onClick();
  tree = render();
  assert.match(textOf(tree), /Traversées/);
  nodes(tree, (node) => node.type === "button" && textOf(node) === "Enregistrer")[0].props.onClick();

  assert.equal(closed, 1);
  assert.equal(saved.length, 1);
  assert.deepEqual(saved[0].map((list) => list.title), ["Lieux", "Traversées"]);
});
