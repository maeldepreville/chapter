import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const expectedBadges = [
  "exploration-01-adepte-de-l-inattendu",
  "exploration-02-esprit-nomade",
  "exploration-03-boussole-des-marges",
  "exploration-04-horizon-vivant",
  "expression-01-echo-des-pages",
  "expression-02-interprete-des-oeuvres",
  "expression-03-voix-singuliere",
  "expression-04-conscience-des-textes",
  "honor-01-premiere-lumiere",
  "honor-02-atlas-partage",
  "honor-03-voix-qui-relie",
  "honor-04-lien-fidele",
  "honor-05-chapitre-vivant",
  "reading-01-adepte-des-pages",
  "reading-02-complice-des-livres",
  "reading-03-bibliophile-au-long-cours",
  "reading-04-bibliotheque-vivante",
  "relation-01-presence-complice",
  "relation-02-trait-d-union",
  "relation-03-point-de-rencontre",
  "relation-04-cercle-vivant",
].sort();

test("ships the complete optimized badge family", async () => {
  const names = (await readdir(new URL("../public/badges/", import.meta.url)))
    .filter((name) => name.endsWith(".webp"))
    .map((name) => name.replace(/\.webp$/, ""))
    .sort();

  assert.deepEqual(names, expectedBadges);

  for (const name of expectedBadges) {
    const bytes = await readFile(new URL(`../public/badges/${name}.webp`, import.meta.url));
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
    assert.ok(bytes.byteLength > 10_000, `${name} should contain a real optimized image`);
  }
});

test("preserves every validated PNG as a source master", async () => {
  const names = (await readdir(new URL("../assets/badges-master/", import.meta.url)))
    .filter((name) => name.endsWith(".png") && name !== "chapter-badges-audit-sheet.png")
    .map((name) => name.replace(/\.png$/, ""))
    .sort();

  assert.deepEqual(names, expectedBadges);
});

test("ships the approved Chapter profile seal", async () => {
  const bytes = await readFile(new URL("../public/branding/chapter-profile-seal.webp", import.meta.url));
  assert.equal(bytes.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(bytes.subarray(8, 12).toString("ascii"), "WEBP");
  assert.ok(bytes.byteLength > 30_000, "the profile seal should contain the approved detailed asset");
});
