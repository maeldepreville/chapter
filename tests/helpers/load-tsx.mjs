import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import ts from "typescript";
import React from "react";

const require = createRequire(import.meta.url);

// Executes real source components for server rendering, or explicit hook doubles
// for handler tests. It is not a DOM/browser or an accessibility test.
export function createSourceLoader(overrides = {}) {
  const cache = new Map();
  function load(path) {
    const full = resolve(path);
    if (cache.has(full)) return cache.get(full).exports;
    const compiledModule = { exports: {} };
    cache.set(full, compiledModule);
    const code = ts.transpileModule(readFileSync(full, "utf8"), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    } }).outputText;
    const localRequire = (id) => {
      if (Object.hasOwn(overrides, id)) return overrides[id];
      if (!id.startsWith(".")) return require(id);
      const base = resolve(dirname(full), id);
      const target = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`].find(existsSync);
      if (!target) throw new Error(`Missing source: ${base}`);
      return load(target);
    };
    new Function("require", "module", "exports", code)(localRequire, compiledModule, compiledModule.exports);
    return compiledModule.exports;
  }
  return load;
}

export function hookHarness() {
  const slots = [];
  let cursor = 0;
  return {
    react: { ...React, useEffect() {}, useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === "function" ? initial() : initial;
      return [slots[index], (next) => { slots[index] = typeof next === "function" ? next(slots[index]) : next; }];
    }, useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    } },
    render(component, props) { cursor = 0; return component(props); },
  };
}

export function nodes(element, predicate) {
  if (Array.isArray(element)) return element.flatMap((child) => nodes(child, predicate));
  if (!element || typeof element !== "object") return [];
  return [...(predicate(element) ? [element] : []), ...nodes(element.props?.children, predicate)];
}
export function textOf(element) {
  if (Array.isArray(element)) return element.map(textOf).join("");
  if (element === null || element === undefined || typeof element === "boolean") return "";
  if (typeof element !== "object") return String(element);
  return textOf(element.props?.children);
}
