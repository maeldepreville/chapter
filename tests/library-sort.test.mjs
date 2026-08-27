import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = await readFile(new URL("../app/library-sort.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function loadControl(react = require("react")) {
  const compiledModule = { exports: {} };
  new Function("require", "module", "exports", compiled)((id) => id === "react" ? react : require(id), compiledModule, compiledModule.exports);
  return compiledModule.exports;
}

// Exercise the control's own handlers without a browser or a DOM simulation.
function harness() {
  const slots = [];
  let cursor = 0;
  let value = "activity";
  let tree;
  const changes = [];
  const react = {
    ...require("react"),
    useId: () => "sort-test",
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = initial;
      return [slots[index], (next) => { slots[index] = typeof next === "function" ? next(slots[index]) : next; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
    useEffect() {},
  };
  const { LibrarySortControl } = loadControl(react);
  const render = () => {
    cursor = 0;
    tree = LibrarySortControl({ value, onChange(next) { value = next; changes.push(next); } });
  };
  const descendants = (node) => !node || typeof node !== "object" ? [] : Array.isArray(node) ? node.flatMap(descendants) : [node, ...descendants(node.props?.children)];
  const get = (role) => descendants(tree).filter((node) => node.props?.role === role);
  render();
  return {
    changes,
    trigger: () => get("combobox")[0].props,
    options: () => get("option").map((node) => node.props),
    clickTrigger() { get("combobox")[0].props.onClick(); render(); },
    clickOption(index) { get("option")[index].props.onClick(); render(); },
    key(key) {
      const event = { key, preventDefault() { this.prevented = true; }, stopPropagation() {} };
      get("combobox")[0].props.onKeyDown(event);
      render();
      return event;
    },
    blur() { tree.props.onBlur({ currentTarget: { contains: () => false }, relatedTarget: null }); render(); },
  };
}

test("library sorting renders all three original choices with a labeled collapsed combobox", () => {
  const { LibrarySortControl, librarySortOptions } = loadControl();
  assert.deepEqual(librarySortOptions.map((option) => option.value), ["activity", "title", "author"]);
  for (const option of librarySortOptions) {
    const html = renderToStaticMarkup(createElement(LibrarySortControl, { value: option.value, onChange() {} }));
    assert.match(html, /role="combobox"[^>]*aria-expanded="false"[^>]*aria-controls=/);
    assert.match(html, /role="listbox"[^>]*hidden=""/);
    assert.equal((html.match(/aria-selected="true"/g) ?? []).length, 1);
    assert.ok(html.includes(option.label));
    assert.doesNotMatch(html, /<select/);
  }
});

test("library sort click selection updates the value and closes without a second toggle", () => {
  const control = harness();
  control.clickTrigger();
  assert.equal(control.trigger()["aria-expanded"], true);
  control.clickOption(2);
  assert.deepEqual(control.changes, ["author"]);
  assert.equal(control.trigger()["aria-expanded"], false);
  control.clickTrigger();
  assert.equal(control.trigger()["aria-activedescendant"], "sort-test-option-2");
  control.clickTrigger();
  assert.equal(control.trigger()["aria-expanded"], false);
});

test("library sort keyboard moves independently of selection, confirms, and cancels", () => {
  const control = harness();
  assert.equal(control.key(" ").prevented, true);
  control.key("ArrowDown");
  assert.deepEqual(control.changes, []);
  assert.equal(control.trigger()["aria-activedescendant"], "sort-test-option-1");
  control.key("Enter");
  assert.deepEqual(control.changes, ["title"]);
  control.key("End");
  control.key("Escape");
  assert.deepEqual(control.changes, ["title"]);
  assert.equal(control.trigger()["aria-expanded"], false);
  control.key("Home");
  control.key("ArrowUp");
  assert.equal(control.trigger()["aria-activedescendant"], "sort-test-option-0");
  assert.equal(control.key("Tab").prevented, undefined);
  assert.deepEqual(control.changes, ["title", "activity"]);
});

test("library sort supports typing and closes on lost focus without applying a pending choice", () => {
  const control = harness();
  control.key("t");
  assert.equal(control.trigger()["aria-activedescendant"], "sort-test-option-1");
  control.blur();
  assert.equal(control.trigger()["aria-expanded"], false);
  assert.deepEqual(control.changes, []);
  assert.match(source, /document\.addEventListener\("pointerdown", closeOutside\)/);
  assert.match(source, /document\.removeEventListener\("pointerdown", closeOutside\)/);
  assert.match(source, /!rootRef\.current\?\.contains\(event\.target\)/);
});

test("library sort keeps a reserved chevron column and Chapter's hover palette", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(css, /\.library-sort-trigger\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\) 1rem;[^}]*gap: 0\.85rem;[^}]*padding: 0\.6rem 0\.85rem;/);
  assert.match(css, /\.library-sort-options \.is-active\s*\{[^}]*color: var\(--brick-dark\);[^}]*background: var\(--soft-brick\);/);
  assert.match(css, /\.library-sort-options\[hidden\]\s*\{\s*display: none;/);
  assert.match(page, /<LibrarySortControl value=\{librarySort\} onChange=\{setLibrarySort\} \/>/);
  assert.match(page, /librarySort === "title"/);
  assert.match(page, /librarySort === "author"/);
  assert.match(page, /return activityOrder\[b.id\] - activityOrder\[a.id\]/);
});
