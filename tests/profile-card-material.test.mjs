import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const load = createSourceLoader();
const { ProfileView } = load(source("phase10.tsx"));
const { publicWorks } = load(source("p1-public-fixtures.ts"));
const profileProps = {
  owner: "self", works: publicWorks, following: false, onToggleFollow() {}, onOpenWork() {}, onOpenHonors() {}, onOpenList() {},
  photo: null, onEditPhoto() {}, onRemovePhoto() {}, equippedTitle: "Esprit nomade", showcase: [], displayName: "Maël Depréville",
};

test("the material recipes style both real card faces while normal profiles keep their existing surface", () => {
  const canson = renderToStaticMarkup(React.createElement(ProfileView, { ...profileProps, cardMaterial: "canson" }));
  assert.equal((canson.match(/profile-identity-card--canson/g) ?? []).length, 2);
  const regular = renderToStaticMarkup(React.createElement(ProfileView, profileProps));
  assert.doesNotMatch(regular, /profile-identity-card--(?:smooth|canson|embossed)/);
});

test("the profile-card recipe switches its real Home preview among all three paper treatments", async () => {
  const harness = hookHarness();
  const Component = createSourceLoader({ react: harness.react })(source("profile-card-recipe.tsx")).ProfileCardRecipe;
  let tree = harness.render(Component);
  const buttons = nodes(tree, (node) => node.type === "button" && ["Carton lisse", "Grain Canson", "Relief embossé"].includes(node.props.children));
  assert.equal(buttons.length, 3);
  assert.equal(buttons[2].props["aria-pressed"], true);
  const home = () => nodes(tree, (node) => node.type?.name === "Home")[0];
  assert.equal(home().props.profileCardMaterial, "embossed");
  buttons[0].props.onClick();
  tree = harness.render(Component);
  assert.equal(home().props.profileCardMaterial, "smooth");
  assert.equal(nodes(tree, (node) => node.type === "button" && node.props["aria-pressed"] === true).length, 1);
  buttons[2].props.onClick();
  tree = harness.render(Component);
  assert.equal(home().props.profileCardMaterial, "embossed");
  const css = await readFile(source("phase10.css"), "utf8");
  assert.match(css, /profile-identity-card--smooth/);
  assert.match(css, /profile-identity-card--canson/);
  assert.match(css, /profile-identity-card--embossed/);
  assert.match(css, /profile-identity-card--embossed :is\([\s\S]*mix-blend-mode: multiply;[\s\S]*text-shadow:/);
  assert.match(css, /profile-identity-card--embossed \.profile-card-seal \{[\s\S]*mix-blend-mode: multiply;[\s\S]*filter: sepia/);
  for (const name of ["profile-card-smooth-paper.webp", "profile-card-canson-paper.webp", "profile-card-emboss-paper.webp"]) {
    const asset = await stat(new URL(`../public/textures/${name}`, import.meta.url));
    assert.ok(asset.size > 10_000 && asset.size < 250_000, `${name} should be an optimized standalone texture asset`);
    assert.match(css, new RegExp(name));
  }
  const recipeCss = await readFile(source("profile-card-recipe.css"), "utf8");
  assert.match(recipeCss, /\.profile-card-recipe \.profile-library-portrait,[\s\S]*\.profile-card-recipe \.profile-wide-content \{ display: none !important; \}/);
});
