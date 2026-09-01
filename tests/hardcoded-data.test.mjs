import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readApp = (name) => readFile(new URL(`../app/${name}`, import.meta.url), "utf8");

test("identity, list routing and public URL use their canonical sources", async () => {
  const [page, phase10, layout, profileRoute, share, siteConfig, catalogue] = await Promise.all([
    readApp("page.tsx"),
    readApp("phase10.tsx"),
    readApp("layout.tsx"),
    readApp("profil/mael-depreville/page.tsx"),
    readApp("profile-share.ts"),
    readApp("site-config.ts"),
    readApp("catalogue.ts"),
  ]);

  assert.match(page, /onOpenList=\{\(listId\) => openPublicList\(listId, "discover", "lina"\)\}/);
  assert.doesNotMatch(page, /onOpenList=\{\(\) => openPublicList\(/);
  assert.doesNotMatch(phase10, /review\.name ===|reply\.name ===/);
  assert.match(phase10, /reply\.authorId === CURRENT_READER_ID/);
  assert.match(phase10, /publicListCatalog\[listId\]/);

  for (const source of [page, phase10, layout, profileRoute, share]) {
    assert.doesNotMatch(source, /chapter-reading\.smrdsh\.chatgpt\.site/);
    assert.doesNotMatch(source, /"Maël Depréville"|"Lina Morel"|"Théo Renaud"|"Inès Naël"/);
  }
  assert.match(siteConfig, /SITE_ORIGIN = "https:\/\/chapter-reading\.smrdsh\.chatgpt\.site"/);
  assert.match(catalogue, /FEATURED_DISCOVERY_LIST_ID: PublicListId = "places"/);
});
