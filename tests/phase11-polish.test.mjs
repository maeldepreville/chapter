import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const [component, stylesheet] = await Promise.all([
  readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/phase10.css", import.meta.url), "utf8"),
]);
const globals = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("mobile card back owns one centered body between masthead and URL", () => {
  assert.match(component, /profile-card-back-masthead[\s\S]*profile-card-back-body[\s\S]*profile-card-qr-field[\s\S]*profile-card-back-copy[\s\S]*profile-card-public-url/);
  assert.match(stylesheet, /\.profile-identity-card\.profile-card-back\s*\{[^}]*grid-template-columns:\s*1fr;[^}]*grid-template-rows:\s*auto minmax\(0, 1fr\) auto;/s);
  assert.match(stylesheet, /\.profile-card-back-body\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);[^}]*align-content:\s*center;[^}]*justify-items:\s*center;[^}]*width:\s*100%;/s);
  assert.doesNotMatch(stylesheet, /@media \(max-width: (?:899|560)px\)[\s\S]*?\.profile-identity-card(?::not\([^)]*\))?\s*\{\s*grid-template-columns:/);
});

test("the owner profile opens with a quiet reading-room welcome without changing the public portrait", () => {
  assert.match(component, /isOwnProfile \? "profile-home" : "profile-public"/);
  assert.match(component, /isOwnProfile && \([\s\S]*profile-homecoming[\s\S]*p5-profile-reading-room\.webp/);
  assert.match(component, /Bienvenue chez vous, \{profile\.firstName\}/);
  assert.match(stylesheet, /\.profile-homecoming\s*\{[^}]*grid-template-columns:/s);
  assert.match(stylesheet, /\.profile-homecoming-art\s*\{[^}]*opacity:\s*0\.72;[^}]*mask-image:/s);
  assert.match(stylesheet, /\.profile-home \.profile-wide-content > \.profile-section\s*\{[^}]*grid-template-columns:/s);
});

test("all Lina follow entry points share the profile state, colors and wording", () => {
  assert.equal((component.match(/className="primary-action profile-follow-action"/g) ?? []).length, 3);
  assert.ok((component.match(/\? "Suivi" : "Suivre"/g) ?? []).length >= 3);
  assert.doesNotMatch(component, /Suivie/);
  assert.match(stylesheet, /\.profile-follow-action\[aria-pressed="true"\]\s*\{[^}]*color:\s*var\(--brick\);[^}]*background:\s*#e9e6e2;/s);
});

test("Discover replaces the native search cross with a Chapter text action", () => {
  const harness = hookHarness();
  const { DiscoverView } = createSourceLoader({ react: harness.react })(source("phase10.tsx"));
  const props = {
    works: [], statuses: {}, followingLina: false,
    onOpenWork() {}, onAddToRead() {}, onOpenProfile() {}, onOpenList() {}, onToggleFollow() {},
  };
  const render = () => harness.render(DiscoverView, props);
  const input = nodes(render(), (node) => node.type === "input" && node.props.id === "discover-query")[0];
  input.props.onChange({ target: { value: "Atlas" } });
  const clear = nodes(render(), (node) => node.type === "button" && textOf(node) === "Effacer")[0];
  assert.ok(clear);
  clear.props.onClick();
  assert.equal(nodes(render(), (node) => node.type === "input" && node.props.id === "discover-query")[0].props.value, "");
  assert.match(stylesheet, /\.discover-search input\[type="search"\]::\-webkit-search-cancel-button\s*\{[^}]*display:\s*none;/s);
  assert.match(stylesheet, /\.discover-search-clear\s*\{[^}]*position:\s*absolute;[^}]*font-size:\s*0\.72rem;/s);
});

test("Library hides the browser-native search clear control", () => {
  assert.match(globals, /\.library-search input\[type="search"\]::\-webkit-search-cancel-button,[\s\S]*?display:\s*none;[^}]*appearance:\s*none;/s);
  assert.match(globals, /\.library-search input\[type="search"\]::\-ms-clear,[\s\S]*?display:\s*none;[^}]*width:\s*0;[^}]*height:\s*0;/s);
});
