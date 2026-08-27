import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = await readFile(new URL("../app/modal-behavior.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const behavior = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const { lockBodyScroll, canFocus, focusModal, mountModal, containModalTab } = behavior;

// Minimal doubles exercise our lifecycle/keyboard logic, not browser-native
// inertness, layout, or assistive technology behavior. Those require manual QA.
function fixture() {
  const targets = new Map();
  const document = { body: { style: { overflow: "auto" } }, activeElement: null,
    defaultView: { getComputedStyle: (element) => ({ visibility: element.visibility ?? "visible" }) },
    querySelector: (selector) => targets.get(selector) ?? null };
  function element({ tabIndex = 0, visible = true, disabled = false, hidden = false } = {}) {
    const attributes = new Map();
    return { ownerDocument: document, isConnected: true, tabIndex, visible, disabled, hidden, focuses: 0,
      closest() { return this.hidden ? {} : null; }, matches() { return this.disabled; },
      getClientRects() { return this.visible ? [{}] : []; },
      hasAttribute(key) { return attributes.has(key); }, setAttribute(key, value) { attributes.set(key, value); }, removeAttribute(key) { attributes.delete(key); },
      addEventListener() {}, focus(options) { this.focuses++; this.focusOptions = options; document.activeElement = this; } };
  }
  const trigger = element();
  document.activeElement = trigger;
  function modal(children = []) {
    const dialog = element({ tabIndex: -1 });
    return Object.assign(dialog, { children, open: false, showCount: 0, closeCount: 0,
      showModal() { this.open = true; this.showCount++; }, close() { this.open = false; this.closeCount++; },
      querySelectorAll() { return this.children; }, querySelector(selector) { return targets.get(selector) ?? null; } });
  }
  return { document, element, modal, trigger, targets };
}
function key(key, shiftKey = false) { return { key, shiftKey, prevented: false, preventDefault() { this.prevented = true; } }; }

test("body scroll locks compose and restore the previous style only after the last release", () => {
  const { document } = fixture();
  const first = lockBodyScroll(document);
  const second = lockBodyScroll(document);
  first(); first();
  assert.equal(document.body.style.overflow, "hidden");
  second();
  assert.equal(document.body.style.overflow, "auto");
});

test("modal lifecycle uses showModal, cleans up, and restores its trigger without scrolling", async () => {
  const { document, modal, trigger } = fixture();
  const dialog = modal();
  const dispose = mountModal(dialog, "fallback");
  assert.equal(dialog.showCount, 1);
  assert.equal(document.body.style.overflow, "hidden");
  dispose(); dispose();
  await Promise.resolve();
  assert.equal(dialog.closeCount, 1);
  assert.equal(document.body.style.overflow, "auto");
  assert.equal(document.activeElement, trigger);
  assert.deepEqual(trigger.focusOptions, { preventScroll: true });
});

test("removed photo triggers fall back after the render instead of focusing a detached button", async () => {
  const { document, element, modal, trigger, targets } = fixture();
  const addPhoto = element();
  targets.set("[data-photo-edit]", addPhoto);
  const dispose = mountModal(modal(), "[data-photo-edit]");
  dispose();
  trigger.isConnected = false;
  await Promise.resolve();
  assert.equal(document.activeElement, addPhoto);
  assert.equal(trigger.focuses, 0);
});

test("navigation without a surviving trigger restores focus to the new page heading", async () => {
  const { document, element, modal, trigger, targets } = fixture();
  const heading = element({ tabIndex: -1 });
  targets.set("main h1, main", heading);
  const dispose = mountModal(modal(), "missing");
  trigger.visible = false;
  dispose(); await Promise.resolve();
  assert.equal(document.activeElement, heading);
  assert.equal(heading.hasAttribute("tabindex"), true);
});

test("rapid modal handoffs do not restore background focus or release another surface's scroll lock", async () => {
  const { document, modal, trigger } = fixture();
  const first = mountModal(modal(), "fallback");
  first();
  const nextDialog = modal();
  const second = mountModal(nextDialog, "fallback");
  nextDialog.focus();
  await Promise.resolve();
  assert.equal(document.activeElement, nextDialog);
  assert.equal(trigger.focuses, 0);
  assert.equal(document.body.style.overflow, "hidden");
  second(); await Promise.resolve();
  assert.equal(document.body.style.overflow, "auto");
});

test("Tab and Shift+Tab wrap only at modal boundaries and exclude hidden/disabled controls", () => {
  const { document, modal, element } = fixture();
  const first = element(), last = element();
  const dialog = modal([element({ tabIndex: -1 }), element({ visible: false }), first, last, element({ disabled: true }), element({ hidden: true })]);
  first.focus();
  const forward = key("Tab"); containModalTab(dialog, forward);
  assert.equal(forward.prevented, false);
  const backward = key("Tab", true); containModalTab(dialog, backward);
  assert.equal(backward.prevented, true); assert.equal(document.activeElement, last);
  const wrap = key("Tab"); containModalTab(dialog, wrap);
  assert.equal(wrap.prevented, true); assert.equal(document.activeElement, first);
});

test("an empty modal or focus outside its controls cannot leak Tab into the background", () => {
  const { document, modal, element } = fixture();
  const empty = modal(); const event = key("Tab");
  containModalTab(empty, event);
  assert.equal(event.prevented, true); assert.equal(document.activeElement, empty);
  const first = element(); const dialog = modal([first]);
  containModalTab(dialog, key("Tab"));
  assert.equal(document.activeElement, first);
});

test("focus can move from the editor to the safe action and back without remounting the modal", () => {
  const { document, modal, element, targets } = fixture();
  const editor = element(), safe = element();
  targets.set("textarea", editor); targets.set("[data-safe-return]", safe);
  const dialog = modal();
  focusModal(dialog, "textarea"); assert.equal(document.activeElement, editor);
  focusModal(dialog, "[data-safe-return]"); assert.equal(document.activeElement, safe);
  focusModal(dialog, "textarea"); assert.equal(document.activeElement, editor);
  assert.equal(dialog.showCount, 0);
  safe.visibility = "hidden"; assert.equal(canFocus(safe), false);
});

const modalSource = await readFile(new URL("../app/modal.tsx", import.meta.url), "utf8");
const modalCompiled = ts.transpileModule(modalSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function modalProps(onRequestClose) {
  const compiledModule = { exports: {} };
  new Function("require", "module", "exports", modalCompiled)((id) => id === "react" ? { useRef: () => ({ current: null }), useLayoutEffect() {} } : id === "./modal-behavior" ? behavior : require(id), compiledModule, compiledModule.exports);
  return compiledModule.exports.Modal({ labelledBy: "title", initialFocus: "textarea", children: null, onRequestClose }).props;
}

test("Escape requests one safe transition, prevents native cancellation and does not bubble", () => {
  let stage = "dirty";
  const props = modalProps(() => { stage = stage === "dirty" ? "protected" : "dirty"; });
  const escape = () => ({ key: "Escape", defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, stopPropagation() { this.stopped = true; } });
  const event = escape(); props.onKeyDown(event);
  assert.equal(stage, "protected"); assert.equal(event.defaultPrevented, true); assert.equal(event.stopped, true);
  props.onKeyDown(escape()); assert.equal(stage, "dirty");
  const handled = escape(); handled.defaultPrevented = true; props.onKeyDown(handled);
  assert.equal(stage, "dirty");
  const cancel = escape(); props.onCancel(cancel);
  assert.equal(stage, "protected"); assert.equal(cancel.defaultPrevented, true);
});

test("all five blocking surfaces use the shared modal and NSV2 keeps one alert surface", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const profile = await readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8");
  assert.equal((page.match(/<Modal\b/g) ?? []).length, 3);
  assert.equal((profile.match(/<Modal\b/g) ?? []).length, 2);
  for (const kind of ["note", "review"]) {
    assert.ok(page.includes(`initialFocus={${kind}CloseConfirm ? "[data-safe-return]" : "textarea"}`));
    assert.ok(page.includes(`onRequestClose={() => ${kind}CloseConfirm ? set${kind[0].toUpperCase() + kind.slice(1)}CloseConfirm(false) : request${kind[0].toUpperCase() + kind.slice(1)}Close()}`));
  }
  assert.doesNotMatch(page, /className="editor-confirmation" role="alertdialog"/);
  assert.match(page, /event\.defaultPrevented \|\| document\.querySelector\("dialog\[open\]"\)/);
  assert.match(profile, /initialFocus="\[data-keep-photo\]" returnFocusSelector="\[data-photo-edit\]" onRequestClose=\{\(\) => setRemovePhotoConfirm\(false\)\}/);
  assert.doesNotMatch(page, /autoFocus/);
});

test("native dialog reset preserves the existing overlay panels and does not restyle assets", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /dialog\.chapter-modal:not\(\[open\]\) \{ display: none; \}/);
  assert.match(css, /dialog\.chapter-modal::backdrop \{ background: transparent; \}/);
  assert.match(css, /dialog\.chapter-modal \{[^}]*max-width: none;[^}]*margin: 0;[^}]*border: 0;/);
});
