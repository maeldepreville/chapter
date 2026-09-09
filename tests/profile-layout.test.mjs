import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the profile portrait coherent without an unnecessary local index", async () => {
  const [component, stylesheet] = await Promise.all([
    readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/phase10.css", import.meta.url), "utf8"),
  ]);

  assert.match(component, /className="profile-opening"/);
  assert.match(component, /className="profile-library-portrait"/);
  assert.match(component, /className="profile-section favorites-section profile-opening-favorites"/);
  assert.match(component, /className="profile-wide-content"/);
  assert.match(component, /profile-honors profile-honors-band/);
  assert.doesNotMatch(component, /profile-card-index|Sommaire du portrait/);
  assert.doesNotMatch(component, /profile-public-chapter|Des chemins et des voix/);
  assert.match(stylesheet, /\.profile-library-portrait\s*\{[^}]*grid-template-columns:/s);
  assert.match(stylesheet, /\.profile-library-portrait \.profile-honors-band\s*\{[^}]*border-left:/s);
  assert.match(stylesheet, /\.profile-library-portrait \.profile-honors-band \.profile-badge-row\s*\{[^}]*grid-template-columns:\s*1fr;[^}]*grid-template-rows:\s*repeat\(3,/s);
  assert.match(stylesheet, /\.profile-library-portrait \.profile-honors-band \.profile-badge-row img\s*\{[^}]*width:\s*6\.5rem;/s);
  assert.match(stylesheet, /\.destination-card\s*\{[^}]*overflow:\s*hidden auto;[^}]*scrollbar-gutter:\s*stable;/s);
  assert.match(stylesheet, /@media \(max-width: 899px\)[\s\S]*\.overlay\.destination-overlay\s*\{[^}]*place-items:\s*center;[^}]*safe-area-inset-top[^}]*safe-area-inset-bottom/s);
  assert.match(stylesheet, /@media \(max-width: 899px\)[\s\S]*\.destination-card\s*\{[^}]*height:\s*100%;[^}]*max-height:\s*100%;[^}]*border:\s*1px solid var\(--line\);[^}]*border-radius:\s*0\.55rem;/s);
  assert.doesNotMatch(stylesheet, /@media \(max-width: 899px\)[\s\S]*\.destination-card\s*\{[^}]*height:\s*100dvh;/s);
  assert.match(stylesheet, /@media \(max-width: 899px\)[\s\S]*\.profile-library-portrait \.profile-honors-band\s*\{[^}]*order:\s*-1;/s);
  assert.match(stylesheet, /@media \(max-width: 899px\)[\s\S]*\.profile-opening\s*\{[^}]*grid-template-columns:\s*1fr;/s);
});
