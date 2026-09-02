import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import postcss from "postcss";
import { createSourceLoader } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const { createFadeController, fadeTiming, fadeEasing } = createSourceLoader()(source("fade-behavior.ts"));

// Explicit animation doubles test our controller, not rendered browser timing.
function fixture({ reduced = false, visible = true, animate = true } = {}) {
  const animations = [], listeners = new Set(); let exits = 0, opacity = "0.42";
  const preference = { matches: reduced, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  const element = {
    ownerDocument: { defaultView: { matchMedia: () => preference, getComputedStyle: () => ({ opacity }) } },
    style: { opacity: "", removeProperty(name) { delete this[name]; } },
    getClientRects: () => visible ? [{}] : [],
    animate: animate ? (frames, options) => {
      let resolve, reject;
      const animation = { frames, options, cancelled: false, finished: new Promise((yes, no) => { resolve = yes; reject = no; }),
        cancel() { this.cancelled = true; }, resolve: () => resolve(), reject: () => reject(new Error("cancelled")) };
      animations.push(animation); return animation;
    } : undefined,
  };
  const controller = createFadeController(element, () => exits++);
  return { element, controller, animations, listeners, exits: () => exits,
    reduce() { preference.matches = true; listeners.forEach((fn) => fn()); },
    opacity(value) { opacity = value; } };
}

test("AM1 uses only opacity with the approved timings and curve", async () => {
  for (const kind of ["menu", "modal", "feedback"]) {
    const f = fixture(); f.controller.update(true, kind);
    assert.deepEqual(f.animations[0].frames, [{ opacity: 0 }, { opacity: 1 }]);
    assert.deepEqual(f.animations[0].options, { duration: fadeTiming[kind][0], easing: fadeEasing, fill: "both" });
    f.animations[0].resolve(); await Promise.resolve();
    f.controller.update(false, kind);
    assert.deepEqual(f.animations[1].frames, [{ opacity: 1 }, { opacity: 0 }]);
    assert.equal(f.animations[1].options.duration, fadeTiming[kind][1]);
    assert.equal(f.exits(), 0);
    f.animations[1].resolve(); await Promise.resolve();
    assert.equal(f.exits(), 1); f.controller.dispose();
  }
});

test("close during entrance and reopen during exit continue from current opacity", async () => {
  const f = fixture(); f.controller.update(true, "modal");
  f.controller.update(false, "modal");
  assert.equal(f.animations[0].cancelled, true);
  assert.equal(f.animations[1].frames[0].opacity, 0.42);
  f.opacity("0.25"); f.controller.update(true, "modal");
  assert.equal(f.animations[2].frames[0].opacity, 0.25);
  f.animations[0].resolve(); f.animations[1].reject(); await Promise.resolve();
  assert.equal(f.exits(), 0); assert.equal(f.animations[2].cancelled, false);
  f.animations[2].resolve(); await Promise.resolve();
  assert.equal(f.element.style.opacity, "1"); assert.equal(f.exits(), 0);
});

test("reduced motion, hidden variants and absent animation API settle immediately", () => {
  for (const options of [{ reduced: true }, { visible: false }, { animate: false }]) {
    const f = fixture(options); f.controller.update(true, "menu");
    assert.equal(f.element.style.opacity, "1");
    f.controller.update(false, "menu");
    assert.equal(f.animations.length, 0); assert.equal(f.exits(), 1);
    f.controller.dispose(); assert.equal(f.listeners.size, 0);
  }
});

test("changing reduced motion during an exit settles once and ignores late completion", async () => {
  const f = fixture(); f.controller.update(false, "modal"); f.reduce();
  assert.equal(f.exits(), 1); assert.equal(f.animations[0].cancelled, true);
  f.animations[0].resolve(); await Promise.resolve(); assert.equal(f.exits(), 1);
  f.controller.update(true, "modal"); assert.equal(f.element.style.opacity, "1");
  assert.equal(f.animations.length, 1);
});

test("unmount cancels animation and preference listener without a stale exit", async () => {
  const f = fixture(); f.controller.update(false, "feedback"); f.controller.dispose();
  f.animations[0].reject(); await Promise.resolve();
  assert.equal(f.exits(), 0); assert.equal(f.listeners.size, 0);
  assert.equal(f.element.style.opacity, undefined);
});

test("new feedback fades after settlement but an interrupted feedback keeps its current opacity", async () => {
  const f = fixture(); f.controller.update(true, "feedback"); f.animations[0].resolve(); await Promise.resolve();
  f.controller.update(true, "feedback", true);
  assert.equal(f.animations[1].frames[0].opacity, 0);
  f.controller.update(true, "feedback", true);
  assert.equal(f.animations[2].frames[0].opacity, 0.42);
});

test("animation setup failures cannot retain an exiting surface", () => {
  const f = fixture(); f.element.animate = () => { throw new Error("unavailable"); };
  f.controller.update(false, "menu"); assert.equal(f.exits(), 1);
});

test("hover stays on fine hover devices, while active/focus styles and QRM1b remain independent", () => {
  for (const name of ["globals.css", "phase10.css"]) {
    const sheet = postcss.parse(readFileSync(source(name), "utf8"));
    sheet.walkRules((rule) => {
      if (!rule.selector.includes(":hover")) return;
      let parent = rule.parent;
      while (parent && !(parent.type === "atrule" && parent.name === "media" && parent.params.includes("(hover: hover)") && parent.params.includes("(pointer: fine)"))) parent = parent.parent;
      assert.ok(parent, rule.selector);
      assert.doesNotMatch(rule.selector, /:focus-visible|:active|\.active/);
    });
  }
  const css = readFileSync(source("globals.css"), "utf8");
  assert.match(css, /button:active, a:active, button:focus-visible, a:focus-visible \{ transition-duration: 0ms; \}/);
  assert.match(css, /\[aria-busy="true"\]::after \{ animation: none !important; \}/);
  assert.match(readFileSync(source("phase10.css"), "utf8"), /transition: transform 440ms cubic-bezier\(0.4, 0, 0.2, 1\)/);
  const page = readFileSync(source("page.tsx"), "utf8");
  assert.equal((page.match(/scrollTo\(\{ top: 0, behavior: "instant" \}\)/g) ?? []).length, 3);
  assert.doesNotMatch(page, /behavior: "smooth"/);
});

test("retained exit content is inert immediately and modals release their lifecycle on deactivation", () => {
  const fade = readFileSync(source("fade.tsx"), "utf8");
  assert.match(fade, /inert=\{!show \|\| undefined\}/);
  assert.match(fade, /aria-hidden=\{!show \|\| undefined\}/);
  assert.match(fade, /SurfaceActive value=\{show\}/);
  let active = true, mounts = 0, releases = 0, focuses = 0;
  const effects = [];
  const { Modal } = createSourceLoader({
    react: { useRef: () => ({ current: {} }), useLayoutEffect: (fn, deps) => effects.push({ fn, deps }) },
    "./fade": { useSurfaceActive: () => active },
    "./modal-behavior": { mountModal: () => { mounts++; return () => releases++; }, focusModal: () => focuses++, containModalTab() {} },
  })(source("modal.tsx"));
  const props = { children: null, labelledBy: "title", initialFocus: "textarea", onRequestClose() {} };
  Modal(props); const initial = effects.splice(0); const cleanup = initial[0].fn(); initial[1].fn();
  assert.equal(mounts, 1); assert.equal(focuses, 1);
  active = false; Modal(props); const exiting = effects.splice(0);
  assert.notDeepEqual(initial[0].deps, exiting[0].deps);
  cleanup(); exiting.forEach(({ fn }) => fn());
  assert.equal(releases, 1); assert.equal(mounts, 1); assert.equal(focuses, 1);
});
