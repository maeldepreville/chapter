import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("loading and error surfaces expose quiet, recoverable states", () => {
  const harness = hookHarness();
  const { LoadingSurface, ErrorSurface } = createSourceLoader({ react: harness.react })(source("p6-states.tsx"));
  const loading = harness.render(LoadingSurface, {});
  assert.equal(nodes(loading, (node) => node.props?.["aria-busy"] === "true").length, 1);
  assert.equal(nodes(loading, (node) => node.props?.role === "status").map(textOf)[0], "Chargement de Chapter…");

  let retried = 0;
  const error = harness.render(ErrorSurface, { onRetry() { retried += 1; } });
  assert.match(textOf(error), /Votre espace reste intact/);
  const retry = nodes(error, (node) => node.type === "button" && textOf(node) === "Réessayer")[0];
  retry.props.onClick();
  assert.equal(retried, 1);
});

test("P6 recipe exposes every cross-cutting scenario without changing normal navigation", () => {
  const harness = hookHarness();
  const { P6StateLab } = createSourceLoader({ react: harness.react })(source("recette/p6/p6-state-lab.tsx"));
  const render = () => harness.render(P6StateLab, {});
  assert.match(textOf(render()), /Recette P6 · États transversaux/);
  assert.deepEqual(nodes(render(), (node) => node.type === "button" && typeof node.props?.["aria-pressed"] === "boolean").map(textOf), ["Normal", "Vide", "Chargement", "Erreur", "Contenus extrêmes"]);

  const extreme = nodes(render(), (node) => node.type === "button" && textOf(node) === "Contenus extrêmes")[0];
  extreme.props.onClick();
  assert.equal(nodes(render(), (node) => node.props?.className === "p6-extreme-surface").length, 1);
  const { p6RecipeData } = createSourceLoader({ react: harness.react })(source("p6-fixtures.ts"));
  assert.match(p6RecipeData.extreme.works[0].title, /La Bibliothèque des chemins que nous pensions avoir oubliés/);
});

test("unknown public entities use the real not-found boundary", () => {
  for (const route of ["oeuvres/[workId]/page.tsx", "lecteurs/[actorId]/page.tsx", "listes/[listId]/page.tsx"]) {
    const content = readFileSync(source(route), "utf8");
    assert.match(content, /from "next\/navigation"/);
    assert.match(content, /notFound\(\)/);
  }
  assert.match(readFileSync(source("not-found.tsx"), "utf8"), /NotFoundSurface/);
});

test("keyboard bypass, current navigation and reduced motion remain explicit", () => {
  const layout = readFileSync(source("layout.tsx"), "utf8");
  const page = readFileSync(source("page.tsx"), "utf8");
  const css = readFileSync(source("p6-states.css"), "utf8");
  assert.match(layout, /className="skip-link" href="#main-content"/);
  assert.match(page, /<main id="main-content" tabIndex=\{-1\}>/);
  assert.match(page, /aria-current=\{currentView === "search" \? "page" : undefined\}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?animation: none/);
  assert.match(css, /\.p6-extreme-surface[\s\S]*?overflow-wrap: anywhere/);
});
