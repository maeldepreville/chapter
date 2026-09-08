import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createSourceLoader } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("versioned recurring assets receive immutable browser caching", async () => {
  const { recurringStaticAssets, staticAsset } = createSourceLoader()(source("static-assets.ts"));
  assert.ok(recurringStaticAssets.length >= 12);
  assert.equal(new Set(recurringStaticAssets).size, recurringStaticAssets.length);
  for (const path of recurringStaticAssets) assert.match(staticAsset(path), /^\/.+\?v=p5-/);

  const worker = await readFile(new URL("../worker/index.ts", import.meta.url), "utf8");
  assert.match(worker, /max-age=31536000, immutable/);
  assert.match(worker, /max-age=3600, stale-while-revalidate=604800/);
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
