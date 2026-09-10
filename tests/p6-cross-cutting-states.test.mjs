import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const luminance = (rgb) => rgb.map((channel) => channel / 255).map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
const contrast = (foreground, background) => (Math.max(luminance(foreground), luminance(background)) + 0.05) / (Math.min(luminance(foreground), luminance(background)) + 0.05);

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

test("typographic covers reserve separate title and author rows", () => {
  const page = readFileSync(source("page.tsx"), "utf8");
  const globals = readFileSync(source("globals.css"), "utf8");
  const publicCss = readFileSync(source("p1-public.css"), "utf8");
  const socialCss = readFileSync(source("phase10.css"), "utf8");
  assert.match(page, /variant === "library" \? " cover-copy--without-mark"/);
  assert.match(globals, /\.cover-copy--without-mark\s*\{\s*grid-template-rows:\s*minmax\(0, 1fr\) auto/);
  assert.match(globals, /\.journal-cover \.cover-copy > small/);
  assert.match(globals, /\.library-cover \.cover-copy > small/);
  for (const css of [globals, publicCss, socialCss]) {
    assert.match(css, /grid-template-rows:\s*(?:auto\s+)?minmax\(0, 1fr\)\s+auto/);
    assert.match(css, /overflow-wrap:\s*anywhere/);
    assert.match(css, /border-top:\s*1px solid rgb\(255 255 255 \/ 0\.58\)/);
  }
  assert.match(globals, /\.typographic-cover\s*\{[^}]*color:\s*#fffaf5;[^}]*linear-gradient\(rgb\(24 20 18 \/ 0\.2\)/);
});

test("every typographic cover tone keeps readable text contrast", () => {
  const globals = readFileSync(source("globals.css"), "utf8");
  const tones = [...globals.matchAll(/\.typographic-cover\.\w+\s*\{\s*background-color:\s*#([0-9a-f]{6})/gi)].map((match) => match[1]);
  assert.equal(tones.length, 6);
  const foreground = [255, 250, 245];
  for (const tone of tones) {
    const background = [0, 2, 4].map((index) => Math.round(Number.parseInt(tone.slice(index, index + 2), 16) * 0.8));
    assert.ok(contrast(foreground, background) >= 4.5, `${tone} must retain AA text contrast after its overlay`);
  }
});

test("profile public traces stay concise and delegate expansion to the work page", () => {
  const component = readFileSync(source("phase10.tsx"), "utf8");
  assert.match(component, /characters\.slice\(0, 280\)/);
  assert.doesNotMatch(component, /expandedProfileReviews|profile-review-text-toggle/);
  assert.match(component, /onClick=\{\(\) => onOpenWork\(review\.workId\)\}/);
});

test("empty catalogue states stay editorial without offering dead-end actions", () => {
  const page = readFileSync(source("page.tsx"), "utf8");
  const publicViews = readFileSync(source("p1-public.tsx"), "utf8");
  const socialViews = readFileSync(source("phase10.tsx"), "utf8");
  const globals = readFileSync(source("globals.css"), "utf8");
  assert.match(page, /action=\{works\.length > 0 \? <button className="primary-action"/);
  assert.match(publicViews, /if \(works\.length === 0\)/);
  assert.match(publicViews, /Les chemins restent à tracer/);
  assert.match(publicViews, /La recherche attend ses premières œuvres/);
  assert.match(socialViews, /p6-empty-profile\.webp/);
  assert.match(socialViews, /p6-empty-list\.webp/);
  assert.match(socialViews, /p6-empty-trace\.webp/);
  assert.match(globals, /\.editorial-empty\s*\{/);
  assert.match(page, /section="journal" asset="\/editorial\/p6-empty-journal\.webp"/);
  assert.match(page, /section="library" asset="\/editorial\/p6-empty-library\.webp"/);
  assert.match(globals, /\.destination-empty\s*\{/);
});
