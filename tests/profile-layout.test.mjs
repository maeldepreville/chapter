import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the PDR1B profile opening separate from full-width public content", async () => {
  const [component, stylesheet] = await Promise.all([
    readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/phase10.css", import.meta.url), "utf8"),
  ]);

  assert.match(component, /className="profile-opening"/);
  assert.match(component, /className="profile-section favorites-section profile-opening-favorites"/);
  assert.match(component, /className="profile-wide-content"/);
  assert.match(stylesheet, /\.profile-section\.profile-opening-favorites\s*\{[^}]*align-self:\s*center;/s);
  assert.match(stylesheet, /@media \(max-width: 899px\)[\s\S]*\.profile-opening\s*\{[^}]*grid-template-columns:\s*1fr;/s);
});
