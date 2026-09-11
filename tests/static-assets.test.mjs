import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";
import { createSourceLoader } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("versioned recurring assets receive immutable browser caching", async () => {
  const { recurringStaticAssets, staticAsset } = createSourceLoader()(source("static-assets.ts"));
  assert.ok(recurringStaticAssets.length >= 12);
  assert.equal(new Set(recurringStaticAssets).size, recurringStaticAssets.length);
  for (const path of recurringStaticAssets) assert.match(staticAsset(path), /^\/.+\?v=p6-/);

  const worker = await readFile(new URL("../worker/index.ts", import.meta.url), "utf8");
  assert.match(worker, /max-age=31536000, immutable/);
  assert.match(worker, /max-age=3600, stale-while-revalidate=604800/);
});

test("the P6 empty-state family ships transparent web assets and preserved masters", async () => {
  const names = ["journal", "library", "discover", "search", "profile", "list", "trace"];
  for (const name of names) {
    const [web, master] = await Promise.all([
      stat(new URL(`../public/editorial/p6-empty-${name}.webp`, import.meta.url)),
      stat(new URL(`../assets/editorial/p6-empty-${name}-master.png`, import.meta.url)),
    ]);
    assert.ok(web.size > 20_000 && web.size < 220_000, `${name} has a web-sized derivative`);
    assert.ok(master.size > web.size, `${name} keeps its source master`);
  }
});

test("the shared painted cover ships in a compact web format", async () => {
  const [png, webp] = await Promise.all([
    stat(new URL("../public/chapter-cover-art.png", import.meta.url)),
    stat(new URL("../public/chapter-cover-art.webp", import.meta.url)),
  ]);
  assert.ok(webp.size < png.size / 8);
  const cover = await readFile(new URL("../app/cover-frame.tsx", import.meta.url), "utf8");
  assert.match(cover, /chapter-cover-art\.webp/);
});

test("the bedside-works empty state keeps a real alpha channel", async () => {
  const asset = fileURLToPath(new URL("../public/editorial/p7-empty-favorites-v3.webp", import.meta.url));
  const metadata = await sharp(asset).metadata();
  assert.equal(metadata.hasAlpha, true);
  assert.equal(metadata.width, 1189);
  assert.equal(metadata.height, 800);
});
