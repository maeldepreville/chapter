import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";
import { profileProps } from "./fixtures/phase11.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const load = createSourceLoader();
const { createProfileShareController, copyProfileUrl } = load(source("profile-share.ts"));
const { startPhotoImport, validCropPreview, cropPreview } = load(source("photo-processing.ts"));
// Load next/image before installing any window doubles.
load(source("phase10.tsx"));
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
const originalGlobals = new WeakMap();
function globals(t, values) {
  if (!originalGlobals.has(t)) {
    const originals = new Map(); originalGlobals.set(t, originals);
    t.after(() => { for (const [key, before] of originals) { if (before) Object.defineProperty(globalThis, key, before); else delete globalThis[key]; } });
  }
  for (const [key, value] of Object.entries(values)) {
    const originals = originalGlobals.get(t);
    if (!originals.has(key)) originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
}
function clipboard(t, writeText = async () => { throw new Error("denied"); }, exec = () => false) {
  let fields = 0, focus = 0;
  class Element { isConnected = true; focus() { focus++; } }
  globals(t, { HTMLElement: Element, navigator: { clipboard: { writeText } }, document: {
    activeElement: new Element(), body: { appendChild() { fields++; } }, execCommand: exec,
    createElement() { return { style: {}, setAttribute() {}, select() {}, remove() { fields--; } }; },
  } });
  return { fields: () => fields, focus: () => focus };
}
test("clipboard native success never inserts a fallback field", async (t) => {
  const dom = clipboard(t, async () => {});
  assert.equal(await copyProfileUrl("https://example.test"), true);
  assert.equal(dom.fields(), 0);
  assert.equal(dom.focus(), 0);
});
test("clipboard fallback cleans up and restores focus even if execCommand throws", async (t) => {
  const dom = clipboard(t, undefined, () => { throw new Error("blocked"); });
  assert.equal(await copyProfileUrl("https://example.test"), false);
  assert.equal(dom.fields(), 0);
  assert.equal(dom.focus(), 1);
});
test("clipboard fallback reports only actual success", async (t) => {
  const dom = clipboard(t, undefined, () => true);
  assert.equal(await copyProfileUrl("https://example.test"), true);
  assert.equal(dom.fields(), 0);
});
test("share controller serializes share and copy before React can render", async (t) => {
  const pending = deferred(); let shares = 0, copies = 0;
  globals(t, { navigator: { share() { shares++; return pending.promise; }, clipboard: { async writeText() { copies++; } } } });
  const busy = [], notices = [];
  const controller = createProfileShareController((v) => busy.push(v), (v) => notices.push(v));
  const first = controller.run("share", "url");
  await controller.run("share", "url"); await controller.run("copy", "url");
  assert.equal(shares, 1); assert.equal(copies, 0); assert.deepEqual(busy, [true]);
  pending.resolve(); await first;
  assert.equal(notices.at(-1), "Profil partagé"); assert.deepEqual(busy, [true, false]);
});
test("share cancellation stays silent and never copies", async (t) => {
  let copies = 0;
  globals(t, { navigator: { async share() { throw { name: "AbortError" }; }, clipboard: { async writeText() { copies++; } } } });
  const notices = [];
  await createProfileShareController(() => {}, (v) => notices.push(v)).run("share", "url");
  assert.equal(copies, 0); assert.deepEqual(notices, [""]);
});
test("a share error may copy, but a total failure gives a manual-link notice", async (t) => {
  clipboard(t);
  navigator.share = async () => { throw new Error("unsupported"); };
  const notices = [];
  const controller = createProfileShareController(() => {}, (v) => notices.push(v));
  await controller.run("share", "url");
  assert.match(notices.at(-1), /Copie impossible.*lien affiché/);
  navigator.clipboard.writeText = async () => {};
  await controller.run("share", "url");
  assert.equal(notices.at(-1), "Partage indisponible — lien copié");
});
test("flipping or unmounting suppresses old feedback and any late fallback", async (t) => {
  for (const action of ["invalidate", "dispose"]) {
    const pending = deferred(); let copies = 0;
    globals(t, { navigator: { share: () => pending.promise, clipboard: { async writeText() { copies++; } } } });
    const notices = [], busy = [];
    const controller = createProfileShareController((v) => busy.push(v), (v) => notices.push(v));
    const running = controller.run("share", "url");
    controller[action]();
    await controller.run("copy", "url");
    pending.reject(new Error("too late")); await running;
    assert.equal(copies, 0); assert.equal(notices.filter(Boolean).length, 0);
    assert.deepEqual(busy, action === "dispose" ? [true] : [true, false]);
  }
});
test("an invalidated clipboard rejection cannot create a fallback field", async (t) => {
  const pending = deferred(); const dom = clipboard(t, () => pending.promise);
  const controller = createProfileShareController(() => {}, () => {});
  const running = controller.run("copy", "url"); controller.invalidate();
  pending.reject(new Error("late")); await running;
  assert.equal(dom.fields(), 0); assert.equal(dom.focus(), 0);
});
test("fallback restores the initiating control after it is re-enabled", async (t) => {
  const dom = clipboard(t); const target = document.activeElement; const frames = [];
  globals(t, { window: { requestAnimationFrame: (fn) => frames.push(fn) } });
  const controller = createProfileShareController((busy) => { if (busy) document.activeElement = document.body; }, () => {});
  await controller.run("copy", "url");
  assert.equal(dom.focus(), 0); frames.shift()(); assert.equal(dom.focus(), 1);
  document.activeElement = target;
  await controller.run("copy", "url"); controller.invalidate();
  frames.shift()(); assert.equal(dom.focus(), 1);
});

function imageEnvironment(t) {
  const readers = [], images = [];
  class Reader {
    readyState = 0;
    constructor() { readers.push(this); }
    readAsDataURL(file) { this.file = file; this.readyState = 1; }
    finish(value) { this.result = value; this.readyState = 2; this.onload?.(); }
    abort() { this.readyState = 2; }
  }
  class Image { naturalWidth = 800; naturalHeight = 600; constructor() { images.push(this); } }
  globals(t, { FileReader: Reader, window: { Image, cancelAnimationFrame() {}, requestAnimationFrame() { return 1; } } });
  return { readers, images };
}
const file = { type: "image/png", size: 1024 };
const photo = { source: "old", preview: "previous", dimensions: { width: 800, height: 600 }, crop: { x: 10, y: 0, zoom: 1.2 } };
function cropUI(extra = {}) {
  const harness = hookHarness(); const effects = [];
  const { PhotoCropper } = createSourceLoader({ react: { ...harness.react, useEffect: (effect) => effects.push(effect) } })(source("phase10.tsx"));
  const saved = []; let closed = 0;
  const props = { currentPhoto: photo, onClose: () => closed++, onSave: (value) => saved.push(value), ...extra };
  const render = () => harness.render(PhotoCropper, props);
  render();
  const cleanups = effects.splice(0).map((effect) => effect()).filter(Boolean);
  const button = (label) => nodes(render(), (n) => n.type === "button" && textOf(n) === label)[0];
  const choose = (value = file) => {
    const input = { files: [value], value: "same-file" };
    nodes(render(), (n) => n.type === "input" && n.props.type === "file")[0].props.onChange({ currentTarget: input });
    assert.equal(input.value, "");
  };
  const displayed = (success = true) => {
    const element = nodes(render(), (n) => n.type === "img" && n.props.alt === "Image à recadrer")[0];
    const image = { complete: true, naturalWidth: success ? 800 : 0, style: {}, getAttribute: () => element.props.src };
    element.props.ref.current = image;
    element.props[success ? "onLoad" : "onError"]({ currentTarget: image });
    return image;
  };
  return { render, choose, displayed, button, saved, closed: () => closed, unmount: () => cleanups.forEach((fn) => fn()) };
}
test("newest photo wins despite reversed reader and decode completion", (t) => {
  const { readers, images } = imageEnvironment(t); const ui = cropUI(); ui.displayed();
  ui.choose(); readers[0].finish("A"); const lateDecode = images[0].onload;
  ui.choose(); readers[1].finish("B"); images[1].onload(); lateDecode();
  assert.equal(nodes(ui.render(), (n) => n.type === "img")[0].props.src, "B");
  assert.equal(ui.button("Enregistrer").props.disabled, true);
  ui.displayed(); assert.equal(ui.button("Enregistrer").props.disabled, false);
  assert.doesNotMatch(textOf(ui.render()), /Préparation/);
});
test("photo close and unmount ignore late reads and decodes", (t) => {
  for (const action of ["close", "unmount"]) {
    const { readers, images } = imageEnvironment(t); const ui = cropUI();
    ui.choose(); readers[0].finish("late"); const late = images[0].onload;
    if (action === "close") ui.button("Annuler").props.onClick(); else ui.unmount();
    late(); assert.equal(nodes(ui.render(), (n) => n.type === "img")[0].props.src, "old");
    assert.equal(ui.saved.length, 0);
  }
});
test("invalid imports preserve the last photo and allow retry of the same file", (t) => {
  const { readers, images } = imageEnvironment(t); const ui = cropUI(); ui.displayed();
  for (const invalid of [{ ...file, type: "image/gif" }, { ...file, size: 8 * 1024 * 1024 + 1 }]) {
    ui.choose(invalid); assert.equal(ui.button("Enregistrer").props.disabled, false);
    assert.equal(nodes(ui.render(), (n) => n.type === "img")[0].props.src, "old");
  }
  ui.choose(); readers[0].finish("small"); images[0].naturalHeight = 511; images[0].onload();
  assert.match(textOf(ui.render()), /512 px/);
  ui.choose(); readers[1].onerror(); assert.match(textOf(ui.render()), /ne peut pas être lue/);
  ui.choose(); readers[2].finish("broken"); images[1].onerror();
  assert.equal(nodes(ui.render(), (n) => n.type === "img")[0].props.src, "old");
});
test("failed display restores the prior crop and no preparation allows saving early", (t) => {
  const { readers, images } = imageEnvironment(t); const ui = cropUI(); ui.displayed();
  ui.choose(); ui.button("Enregistrer").props.onClick(); assert.equal(ui.saved.length, 0);
  readers[0].finish("new"); images[0].onload();
  ui.displayed(false);
  assert.equal(nodes(ui.render(), (n) => n.type === "img")[0].props.src, "old");
  assert.match(textOf(ui.render()), /ne peut pas être affichée/);
  assert.equal(nodes(ui.render(), (n) => n.type === "input" && n.props.type === "range")[0].props.value, photo.crop.zoom);
  assert.equal(ui.closed(), 0);
});
test("photo cancellation prevents reader completion before decoding", (t) => {
  const { readers, images } = imageEnvironment(t); let ready = 0;
  const cancel = startPhotoImport(file, () => ready++, () => {}); cancel(); readers[0].finish("late");
  assert.equal(images.length, 0); assert.equal(ready, 0);
});
test("retrying the same source remounts its image and zoom never mutates the saved crop", (t) => {
  const { readers, images } = imageEnvironment(t); const ui = cropUI(); ui.displayed();
  const before = nodes(ui.render(), (n) => n.type === "img")[0].key;
  nodes(ui.render(), (n) => n.type === "input" && n.props.type === "range")[0].props.onChange({ target: { value: "2" } });
  assert.equal(photo.crop.zoom, 1.2);
  ui.choose(); readers[0].finish("old"); images[0].onload();
  assert.notEqual(nodes(ui.render(), (n) => n.type === "img")[0].key, before);
  assert.equal(ui.button("Enregistrer").props.disabled, true);
  ui.displayed(); assert.equal(ui.button("Enregistrer").props.disabled, false);
});
const validPng = "data:image/png;base64," + Buffer.from("\x89PNG\r\n\x1a\nfixture", "latin1").toString("base64");
test("canvas output rejects empty or malformed data and accepts a PNG fallback", () => {
  for (const value of ["", "data:,", "data:image/webp;base64,", "data:image/webp;base64,bm90LWFuLWltYWdl", "https://example.test/image"]) assert.equal(validCropPreview(value), false);
  assert.equal(validCropPreview(validPng), true);
});
test("draw and export failures stay local and retry saves only valid output", (t) => {
  imageEnvironment(t); const ui = cropUI(); ui.displayed();
  let failure = "draw";
  globals(t, { document: { createElement: () => ({ getContext: () => ({ drawImage() { if (failure === "draw") throw new Error("draw"); } }), toDataURL() { if (failure === "export") throw new Error("export"); return failure === "empty" ? "data:," : validPng; } }) } });
  for (failure of ["draw", "export", "empty"]) {
    ui.button("Enregistrer").props.onClick(); assert.equal(ui.saved.length, 0); assert.equal(ui.closed(), 0);
    assert.match(textOf(ui.render()), /vous pouvez réessayer/);
  }
  failure = ""; ui.button("Enregistrer").props.onClick();
  assert.equal(ui.saved.length, 1); assert.equal(ui.closed(), 1);
  assert.equal(ui.saved[0].preview, validPng); assert.deepEqual(ui.saved[0].crop, photo.crop);
  assert.equal(photo.preview, "previous");
});
test("export refuses an undecoded image or a missing canvas context", (t) => {
  assert.throws(() => cropPreview({ complete: false }, photo.dimensions, photo.crop));
  globals(t, { document: { createElement: () => ({ getContext: () => null }) } });
  assert.throws(() => cropPreview({ complete: true, naturalWidth: 800 }, photo.dimensions, photo.crop));
});
test("long review expansion preserves paragraphs and stays separate from conversations", () => {
  const harness = hookHarness();
  const { SocialReviews } = createSourceLoader({ react: harness.react })(source("phase10.tsx"));
  const text = "Premier paragraphe.\n\n" + "Unmottrèslong".repeat(30) + "\nDernière ligne.";
  const props = { workId: "atlas", personalReview: text, personalRating: 4, onOpenProfile() {}, onWriteReview() {} };
  const render = () => harness.render(SocialReviews, props);
  const reviewText = () => nodes(render(), (n) => n.props.id === "review-copy-atlas-self")[0];
  const toggle = () => nodes(render(), (n) => n.props.className === "text-action review-text-toggle")[0];
  assert.notEqual(textOf(reviewText()), text); assert.match(textOf(reviewText()), /\n\n/);
  toggle().props.onClick(); assert.equal(textOf(reviewText()), text);
  nodes(render(), (n) => n.type === "button" && textOf(n).startsWith("Voir la conversation"))[0].props.onClick();
  assert.equal(textOf(reviewText()), text);
  toggle().props.onClick(); assert.notEqual(textOf(reviewText()), text);
  assert.equal(nodes(render(), (n) => n.props.className === "reply-list").length, 1);
});
test("profile disables both share controls until native work settles", async (t) => {
  const pending = deferred(); globals(t, { navigator: { share: () => pending.promise } });
  const harness = hookHarness(); const { ProfileView } = createSourceLoader({ react: harness.react })(source("phase10.tsx"));
  const render = () => harness.render(ProfileView, { ...profileProps, works: [] });
  const buttons = () => nodes(render(), (n) => n.type === "button" && ["Partager", "Copier le lien"].includes(textOf(n)));
  buttons()[1].props.onClick(); assert.ok(buttons().every((n) => n.props.disabled));
  pending.resolve(); await pending.promise; await Promise.resolve();
  assert.ok(buttons().every((n) => !n.props.disabled));
});
test("prose wrapping is scoped and leaves N1b name protection intact (source check)", () => {
  const css = readFileSync(source("globals.css"), "utf8") + readFileSync(source("phase10.css"), "utf8");
  assert.match(css, /\.trace-copy, \.row-value, \.review-copy \{ white-space: pre-wrap; overflow-wrap: anywhere;/);
  assert.match(css, /\.reply p, \.reply-preview p, \.reply-context blockquote, \.profile-review p \{ white-space: pre-wrap; overflow-wrap: anywhere;/);
  for (const name of ["profile-card-name", "profile-card-back-name"]) assert.match(css, new RegExp(`\\.${name} \\{[^}]*overflow-wrap: normal;[^}]*word-break: normal;`));
});
