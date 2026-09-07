import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const tokens = await readFile(new URL("../app/foundation/tokens.css", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const trust = await readFile(new URL("../app/p5-trust.css", import.meta.url), "utf8");
const phase10 = await readFile(new URL("../app/phase10.css", import.meta.url), "utf8");
const firstMarker = await readFile(new URL("../app/p2-first-marker.css", import.meta.url), "utf8");
const social = await readFile(new URL("../app/p4-social.css", import.meta.url), "utf8");

test("Chapter uses one warm, thin scrollbar treatment with a stable viewport gutter", () => {
  assert.match(tokens, /--color-scroll-thumb: #[0-9a-f]{6};/i);
  assert.match(tokens, /--color-scroll-thumb-hover: #[0-9a-f]{6};/i);
  assert.match(globals, /scrollbar-color: var\(--color-scroll-thumb\) transparent;/);
  assert.match(globals, /\*::\-webkit-scrollbar-thumb \{[\s\S]*?background-clip: padding-box;[\s\S]*?border-radius: var\(--radius-pill\);/);
  assert.match(globals, /html \{[^}]*scrollbar-gutter: stable;/);
});

test("the desktop account popover no longer removes the page scrollbar", () => {
  assert.match(page, /accountOpen && window\.matchMedia\("\(max-width: 899px\)"\)\.matches/);
  assert.doesNotMatch(page, /if \(accountOpen\) return lockBodyScroll/);
});

test("every vertically scrollable rounded overlay contains overscroll and keeps its track away from corners", () => {
  for (const css of [globals, trust, phase10, firstMarker, social]) {
    assert.match(css, /overflow: hidden auto;/);
    assert.match(css, /overscroll-behavior: contain;/);
    assert.match(css, /scrollbar-gutter: stable;/);
    assert.match(css, /::\-webkit-scrollbar-track \{ margin-block:/);
  }
});
