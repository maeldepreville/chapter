import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader } from "./helpers/load-tsx.mjs";

const source = fileURLToPath(new URL("../app/toast-stack.tsx", import.meta.url));
const { ToastStack } = createSourceLoader()(source);

test("notifications keep the oldest above and the newest below", () => {
  const markup = renderToStaticMarkup(React.createElement(ToastStack, {
    toasts: [
      { id: 1, label: "Ancienne action", detail: "Premier retour" },
      { id: 2, label: "Action récente", detail: "Dernier retour", actionLabel: "Annuler", onAction() {} },
    ],
    onDismiss() {},
  }));
  assert.ok(markup.indexOf("Ancienne action") < markup.indexOf("Action récente"));
  assert.match(markup, /aria-label="Notifications"/);
  assert.match(markup, /Annuler/);
});

test("the stack animates reordering while respecting reduced motion", async () => {
  const component = await readFile(source, "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(component, /previousTop - nextTop/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.toast-stack[\s\S]*flex-direction: column/);
  assert.match(css, /pointer-events: none/);
});

test("each notification owns its remaining lifetime and exits through the reversed entrance", async () => {
  const component = await readFile(source, "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(component, /const remainingMs = useRef\(5000\)/);
  assert.match(component, /remainingMs\.current - \(Date\.now\(\) - startedAt\)/);
  assert.match(component, /dismissRef\.current = onDismiss/);
  assert.doesNotMatch(component, /\[onDismiss, paused, toast\.id\]/);
  assert.match(component, /onAnimationEnd=/);
  assert.match(css, /\.temporary-feedback\.is-exiting \{[^}]*animation: chapter-toast-in var\(--motion-surface\) var\(--ease-surface\) reverse both;/s);
});
