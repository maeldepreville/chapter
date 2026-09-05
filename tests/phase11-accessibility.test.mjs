import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const globals = readFileSync(source("globals.css"), "utf8");
const tokens = readFileSync(source("foundation/tokens.css"), "utf8");
const phase10 = readFileSync(source("phase10.css"), "utf8");
const phase10Component = readFileSync(source("phase10.tsx"), "utf8");

const luminance = (hex) => hex.match(/[0-9a-f]{2}/gi)
  .map((part) => Number.parseInt(part, 16) / 255)
  .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
const contrast = (foreground, background) => (Math.max(luminance(foreground), luminance(background)) + 0.05) / (Math.min(luminance(foreground), luminance(background)) + 0.05);

test("control boundaries and focus indicators retain non-text contrast", () => {
  const controlLine = tokens.match(/--color-border-strong:\s*(#[0-9a-f]{6})/i)?.[1];
  assert.ok(controlLine);
  assert.ok(contrast(controlLine, "#fffdf9") >= 3);
  assert.ok(contrast(controlLine, "#f7f3ec") >= 3);
  assert.match(tokens, /--focus-ring:\s*3px solid var\(--color-accent\);/);
  assert.match(globals, /:focus-visible[\s\S]*?outline: var\(--focus-ring\);/);
  assert.match(globals, /\.header-search input\s*\{[^}]*border: 1px solid var\(--control-line\);/s);
  assert.match(globals, /\.library-search input, \.library-sort-trigger\s*\{[^}]*border: 1px solid var\(--control-line\);/s);
  assert.match(phase10, /\.discover-search input\s*\{[^}]*border: 1px solid var\(--control-line\);/s);
});

test("small screens keep text and form controls reflowable", () => {
  assert.match(globals, /body\s*\{[^}]*font-size: 100%;/s);
  assert.match(globals, /\.text-action\s*\{[^}]*max-width: 100%;[^}]*white-space: normal;/s);
  assert.match(globals, /\.date-invitation-actions\s*\{[^}]*flex-wrap: wrap;/s);
  assert.match(globals, /\.date-invitation \.date-field\s*\{[^}]*min-width: min\(17rem, 100%\);/s);
  assert.match(phase10, /@media \(max-width: 560px\)[\s\S]*?\.destination-heading h1,[\s\S]*?font-size: clamp\(3rem, 16vw, 4rem\);[^}]*overflow-wrap: anywhere;/);
  assert.match(phase10, /\.file-action:has\(input:focus-visible\)\s*\{[^}]*outline: 3px solid var\(--brick\);/s);
});

test("navigation identifies the current destination and every review identity opens a profile", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const Home = load(source("page.tsx")).default;
  const renderHome = () => harness.render(Home, { initialData: { view: "journal", entries: {}, traces: [] } });
  const current = nodes(renderHome(), (node) => node.props?.["aria-current"] === "page");
  assert.equal(current.length, 2);
  assert.ok(current.every((node) => textOf(node).endsWith("Journal")));

  const socialHarness = hookHarness();
  const { SocialReviews } = createSourceLoader({ react: socialHarness.react })(source("phase10.tsx"));
  const opened = [];
  const renderReviews = () => socialHarness.render(SocialReviews, { workId: "cartographies", personalReview: "", personalRating: 0, onOpenProfile(actorId) { opened.push(actorId); }, onWriteReview() {} });
  const reviewAuthors = nodes(renderReviews(), (node) => node.props?.className === "review-author-button");
  assert.deepEqual(reviewAuthors.map(textOf), ["Lina Morel18 août 2026", "Théo Renaud12 août 2026", "Inès Naël3 août 2026"]);
  reviewAuthors.forEach((button) => button.props.onClick());
  assert.deepEqual(opened, ["lina", "theo", "ines"]);
  assert.match(phase10Component, /role="region" aria-label=\{`Détails de \$\{badge\.title\}`\}/);
  assert.doesNotMatch(phase10Component, /honor-detail honor-detail-\$\{placement\}`\} role="status"/);
});

test("star rating uses one tab stop and moves selection with keyboard focus", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const render = () => harness.render(Home, { initialData: { view: "work" } });
  const open = nodes(render(), (node) => node.type === "button" && node.props.className === "quiet-action" && textOf(node) === "Écrire une critique")[0];
  assert.ok(open);
  open.props.onClick();

  const radios = () => nodes(render(), (node) => node.props?.role === "radio");
  assert.deepEqual(radios().map((radio) => radio.props.tabIndex), [0, -1, -1, -1, -1]);
  let focused = 0;
  radios().forEach((radio, index) => radio.props.ref({ focus() { focused = index + 1; } }));
  let prevented = false;
  radios()[0].props.onKeyDown({ key: "ArrowRight", preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(focused, 2);
  assert.deepEqual(radios().map((radio) => radio.props.tabIndex), [-1, 0, -1, -1, -1]);
  assert.equal(radios()[1].props["aria-checked"], true);

  radios()[4].props.onClick();
  radios().forEach((radio, index) => radio.props.ref({ focus() { focused = index + 1; } }));
  radios()[4].props.onKeyDown({ key: "ArrowDown", preventDefault() {} });
  assert.equal(focused, 1);
  assert.equal(radios()[0].props["aria-checked"], true);
});
