import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("P2 keeps a selected status through signup and exposes a private first marker", () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const { publicWorks } = load(source("p1-public-fixtures.ts"));
  const { PublicWork } = load(source("p1-public.tsx"));
  const activations = [];
  const markers = [];
  let props = {
    work: publicWorks[0], works: publicWorks, activated: false,
    onBack() {}, onOpenWork() {},
    onActivate(status) { activations.push(status); },
    onSaveMarker(marker) { markers.push(marker); },
  };
  const render = () => harness.render(PublicWork, props);

  let tree = render();
  nodes(tree, (node) => node.type?.name === "Button" && textOf(node).includes("Ajouter au journal"))[0].props.onClick();
  tree = render();
  nodes(tree, (node) => node.type === "button" && textOf(node) === "En cours")[0].props.onClick();
  tree = render();
  assert.match(textOf(tree), /Gardons ce premier repère/);
  assert.match(textOf(tree), /Atlas|Cartographies/);

  nodes(tree, (node) => node.type === "button" && textOf(node) === "Pas maintenant")[0].props.onClick();
  tree = render();
  assert.match(textOf(tree), /Geste conservéEn cours/);
  nodes(tree, (node) => node.type === "button" && textOf(node) === "Reprendre l’inscription")[0].props.onClick();
  tree = render();

  const email = nodes(tree, (node) => node.type?.name === "Input" && node.props.type === "email")[0];
  const password = nodes(tree, (node) => node.type?.name === "Input" && node.props.type === "password")[0];
  email.props.onChange({ target: { value: "lecteur@example.fr" } });
  password.props.onChange({ target: { value: "chapitre8" } });
  tree = render();
  nodes(tree, (node) => node.type === "form")[0].props.onSubmit({ preventDefault() {} });
  assert.deepEqual(activations, ["En cours"]);

  props = { ...props, activated: true, record: { status: "En cours", marker: "" } };
  tree = render();
  assert.match(textOf(tree), /Une trace à retrouver plus tard/);
  const textarea = nodes(tree, (node) => node.type?.name === "Textarea")[0];
  textarea.props.onChange({ target: { value: "Retrouver l’image des cartes mouvantes." } });
  tree = render();
  nodes(tree, (node) => node.type?.name === "Button" && textOf(node) === "Enregistrer le repère")[0].props.onClick();
  assert.deepEqual(markers, ["Retrouver l’image des cartes mouvantes."]);
});

test("P2 styling provides desktop anchoring, a mobile bottom sheet and reduced motion", async () => {
  const css = await readFile(source("p2-first-marker.css"), "utf8");
  assert.match(css, /position: sticky; top: 7\.5rem/);
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.p2-status-menu \{ position: fixed/);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
