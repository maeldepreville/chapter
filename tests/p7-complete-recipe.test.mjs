import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("P7 exposes the six complete-recipe entry points without entering product navigation", async () => {
  const harness = hookHarness();
  const load = createSourceLoader({ react: harness.react });
  const { P7JourneyLab } = load(source("recette/p7/p7-journey-lab.tsx"));
  const render = () => harness.render(P7JourneyLab);
  const labels = nodes(render(), (node) => node.type === "button").map(textOf);
  assert.deepEqual(labels, ["Visite publique", "Premier repère", "Usage personnel", "Vie sociale", "Confiance", "Robustesse"]);
  assert.match(textOf(render()), /Découvrir, rechercher et ouvrir une œuvre sans compte/);
  assert.match(textOf(render()), /Les 5 états P6/);

  const trust = nodes(render(), (node) => node.type === "button" && textOf(node) === "Confiance")[0];
  trust.props.onClick();
  assert.match(textOf(render()), /Relire l’identité, la confidentialité, le blocage et la portabilité des données/);
});

test("P7 recipe remains isolated and responsive", async () => {
  const [page, styles, layout, contracts] = await Promise.all([
    readFile(source("recette/p7/page.tsx"), "utf8"),
    readFile(source("p7-recipe.css"), "utf8"),
    readFile(source("layout.tsx"), "utf8"),
    readFile(source("foundation/contracts.ts"), "utf8"),
  ]);
  assert.match(page, /robots:\s*\{ index: false, follow: false \}/);
  assert.match(layout, /p7-recipe\.css/);
  assert.match(styles, /@media \(max-width: 899px\)[\s\S]*overflow-x: auto/);
  assert.match(contracts, /P7: \{ surface: "complete-refactor-recipe", primaryAction: "exercise-end-to-end-journeys", observableResult: "merge-decision-ready", requiresAccount: false \}/);
});
