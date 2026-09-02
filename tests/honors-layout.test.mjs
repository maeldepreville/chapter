import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import { fileURLToPath } from "node:url";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = await readFile(new URL("../app/honors-layout.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { getHonorsLayout } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const items = [
  { id: "reading3", locked: true }, { id: "honor1" }, { id: "reading2" },
  { id: "exploration2" }, { id: "exploration3", locked: true },
  { id: "expression2" }, { id: "expression3", locked: true },
  { id: "relation2" }, { id: "relation3", locked: true }, { id: "honor2" },
];

test("HDE1 groups each family acquired first and next second without mutating input", () => {
  const snapshot = structuredClone(items);
  const layout = getHonorsLayout(items, true);
  assert.deepEqual(layout.families.map((family) => family.title), ["Lecture", "Exploration", "Expression", "Relation"]);
  for (const family of layout.families) {
    assert.deepEqual(family.items.map((item) => item.id), [family.id + "2", family.id + "3"]);
    assert.equal(family.items[1].locked, true);
  }
  assert.deepEqual(layout.honors.map((item) => item.id), ["honor1", "honor2"]);
  assert.deepEqual(items, snapshot);
});

test("HDE1 public groups have no next badges or reserved placeholders", () => {
  const layout = getHonorsLayout(items, false);
  assert.equal(layout.families.length, 4);
  for (const family of layout.families) {
    assert.equal(family.items.length, 1);
    assert.equal(family.items[0].id, family.id + "2");
  }
  assert.equal(layout.honors.length, 2);
});

test("HV1 hides all unearned honors even in the owner view", () => {
  for (const own of [true, false]) {
    const layout = getHonorsLayout([{ id: "reading2" }, { id: "honor1", locked: true }], own);
    assert.deepEqual(layout.honors, []);
    assert.deepEqual(layout.honorRows, []);
    assert.equal(layout.families.length, 1);
  }
  assert.deepEqual(getHonorsLayout([], true), { honors: [], honorRows: [], families: [] });
});

test("HMT1 honor rows keep complete pairs and a final single honor intact", () => {
  for (let count = 1; count <= 5; count += 1) {
    const honors = Array.from({ length: count }, (_, index) => ({ id: `honor${index + 1}` }));
    const layout = getHonorsLayout(honors, true);
    assert.deepEqual(layout.honorRows.flat(), honors);
    assert.equal(layout.honorRows.length, Math.ceil(count / 2));
    assert.ok(layout.honorRows.every((row) => row.length > 0 && row.length <= 2));
    assert.deepEqual(layout.families, []);
  }
});

test("HDE1 renders honors before the four-column family grid and keeps mobile details after pairs", async () => {
  const [component, css] = await Promise.all([
    readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/phase10.css", import.meta.url), "utf8"),
  ]);
  assert.match(component, /getHonorsLayout\(items, isOwnProfile\)/);
  assert.match(component, /honors\.length > 0 &&/);
  assert.ok(component.indexOf('className="honors-singular"') < component.indexOf('className="honors-path"'));
  assert.match(component, /\{family\.items\.map\(renderBadge\)\}\s*\{selectedInFamily && renderDetail\(selectedInFamily, "mobile"\)\}/);
  assert.match(component, /\{row\.map\(renderBadge\)\}\s*\{selectedInRow && renderDetail\(selectedInRow, "mobile"\)\}/);
  assert.match(css, /\.honor-wall\s*\{[^}]*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.honor-family\s*\{[^}]*grid-template-rows: auto 1fr 1fr/);
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.honor-family\s*\{[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.honor-detail-mobile\s*\{[^}]*grid-column: 1 \/ -1/);
});

test("HDE1 preserves touch toggling, keyboard opening and a shared outside-click scope", async () => {
  const component = await readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8");
  assert.match(component, /ref=\{wallRef\} className="honors-collection"/);
  assert.match(component, /if \(preciseHover \|\| event\.detail === 0\) setSelection\(\{ id, mode: "persistent" \}\)/);
  assert.match(component, /current\?\.id === id \? null : \{ id, mode: "persistent" \}/);
  assert.match(component, /matches\(":focus-visible"\)/);
  assert.match(component, /!wallRef\.current\.contains\(event\.target as Node\)/);
  assert.match(component, /event\.key === "Escape"/);
});

test("desktop hover detail remains reachable then closes with its badge-detail cell", async () => {
  const harness = hookHarness();
  const path = fileURLToPath(new URL("../app/phase10.tsx", import.meta.url));
  const { HonorsView } = createSourceLoader({ react: harness.react })(path);
  const css = await readFile(new URL("../app/phase10.css", import.meta.url), "utf8");
  const previousWindow = globalThis.window;
  globalThis.window = { matchMedia: () => ({ matches: true }) };
  try {
    const props = { owner: "self", equippedTitle: "Esprit nomade", showcase: [], onEquip() {}, onToggleShowcase() {}, onBack() {} };
    const render = () => harness.render(HonorsView, props);
    const firstBadge = () => nodes(render(), (node) => node.type === "button" && node.props.className === "honor-badge-button")[0];
    const firstCell = () => nodes(render(), (node) => typeof node.props?.className === "string" && node.props.className.startsWith("honor-cell"))[0];
    const details = () => nodes(render(), (node) => typeof node.props?.className === "string" && node.props.className.includes("honor-detail"));

    firstBadge().props.onMouseEnter();
    assert.match(textOf(details()), /Première lumière/);
    assert.equal(firstBadge().props.onMouseLeave, undefined);
    assert.match(textOf(details()), /Afficher ce titre sous mon nom/);
    assert.match(css, /\.honor-detail-desktop::before\s*\{[^}]*height: 0\.55rem/);
    firstCell().props.onMouseLeave();
    assert.equal(details().length, 0);

    firstBadge().props.onMouseEnter();
    firstBadge().props.onClick({ detail: 1 });
    firstCell().props.onMouseLeave();
    assert.match(textOf(details()), /Première lumière/);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
