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
  const readerNames = [];
  let props = {
    work: publicWorks[0], works: publicWorks, activated: false,
    onBack() {}, onOpenWork() {},
    onActivate(status) { activations.push(status); },
    onCreateAccount(readerName) { readerNames.push(readerName); },
    onSaveMarker(marker) { markers.push(marker); },
  };
  const render = () => harness.render(PublicWork, props);

  let tree = render();
  nodes(tree, (node) => node.type === "button" && textOf(node).includes("Ajouter au journal"))[0].props.onClick();
  tree = render();
  nodes(tree, (node) => node.type === "button" && textOf(node) === "En cours")[0].props.onClick();
  tree = render();
  let account = nodes(tree, (node) => node.type?.name === "AccountCreationDialog")[0];
  assert.equal(account.props.title, "Gardons ce premier repère.");
  assert.match(textOf(account.props.description), /Atlas|Cartographies/);

  account.props.onClose();
  tree = render();
  assert.match(textOf(tree), /Geste conservéEn cours/);
  nodes(tree, (node) => node.type === "button" && textOf(node) === "Reprendre l’inscription")[0].props.onClick();
  tree = render();
  account = nodes(tree, (node) => node.type?.name === "AccountCreationDialog")[0];
  account.props.onComplete({ readerName: "Lectora", email: "lecteur@example.fr" });
  assert.deepEqual(activations, ["En cours"]);
  assert.deepEqual(readerNames, ["Lectora"]);

  props = { ...props, activated: true, record: { status: "En cours", marker: "" } };
  tree = render();
  assert.match(textOf(tree), /Une trace à retrouver plus tard/);
  const textarea = nodes(tree, (node) => node.type?.name === "Textarea")[0];
  textarea.props.onChange({ target: { value: "Retrouver l’image des cartes mouvantes." } });
  tree = render();
  nodes(tree, (node) => node.type?.name === "Button" && textOf(node) === "Enregistrer le repère")[0].props.onClick();
  assert.deepEqual(markers, ["Retrouver l’image des cartes mouvantes."]);

  props = { ...props, onOpenJournal() {}, record: { status: "En cours", marker: "Retrouver l’image des cartes mouvantes." } };
  tree = render();
  assert.match(textOf(tree), /Votre première trace est enregistrée dans votre Journal/);
  assert.match(textOf(tree), /Continuer à explorer/);
  assert.match(textOf(tree), /Voir mon Journal/);
});

test("P2 styling keeps the first marker responsive and shares the reading-status sheet", async () => {
  const css = await readFile(source("p2-first-marker.css"), "utf8");
  const sharedCss = await readFile(source("globals.css"), "utf8");
  assert.match(css, /position: sticky; top: 7\.5rem/);
  assert.match(sharedCss, /@media \(max-width: 899px\)[\s\S]*\.status-popover \{\s*position: fixed/);
  assert.match(sharedCss, /\.status-backdrop \{ z-index: 60;/);
  assert.match(sharedCss, /safe-area-inset-bottom/);
  assert.doesNotMatch(css, /\.p2-status-menu|\.p2-status-control/);
  assert.match(css, /dialog\.p2-auth-dialog \{ place-items: end stretch; padding: 0; overflow: hidden; \}/);
  assert.match(css, /max-width: 100vw; max-height: 100vh; max-height: 100dvh/);
  assert.doesNotMatch(css, /width: calc\(100% \+ 2\.5rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("a first En cours or Lu gesture offers the shared optional date after signup and keeps it in the Journal", () => {
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/recette/oeuvre" }, history: { pushState(_state, _title, path) { globalThis.window.location.pathname = path; }, replaceState() {} }, scrollTo() {} };
  try {
    for (const [status, dateLabel] of [["En cours", "date de début"], ["Lu", "date de fin"], ["À lire", null]]) {
      const homeHarness = hookHarness();
      const guestHarness = hookHarness();
      const Home = createSourceLoader({ react: homeHarness.react })(source("page.tsx")).default;
      const { PublicWork } = createSourceLoader({ react: guestHarness.react })(source("p1-public.tsx"));
      const home = () => homeHarness.render(Home, { initialPublicWorkId: "cartographies" });
      const guestProps = () => nodes(home(), (node) => node.type?.name === "PublicWork")[0].props;
      const guest = () => guestHarness.render(PublicWork, guestProps());

      nodes(guest(), (node) => node.type === "button" && textOf(node) === "Ajouter au journal")[0].props.onClick();
      nodes(guest(), (node) => node.type === "button" && textOf(node) === status)[0].props.onClick();
      const account = nodes(guest(), (node) => node.type?.name === "AccountCreationDialog")[0];
      account.props.onComplete({ readerName: "Lectora", email: "lecteur@example.fr" });

      const invitation = guestProps().dateInvitation;
      if (!dateLabel) { assert.equal(invitation, null); continue; }
      assert.match(textOf(invitation), new RegExp(`Ajouter une ${dateLabel}`));
      assert.equal(nodes(guest(), (node) => node.type?.name === "Textarea")[0].props.autoFocus, false);

      if (status === "Lu") {
        nodes(invitation, (node) => node.type === "button" && textOf(node) === "Plus tard")[0].props.onClick();
        assert.equal(guestProps().dateInvitation, null);
        assert.doesNotMatch(textOf(guest()), /Date enregistrée/);
        continue;
      }

      nodes(invitation, (node) => node.type === "button" && textOf(node) === "Choisir")[0].props.onClick();
      nodes(guestProps().dateInvitation, (node) => node.type?.name === "ChapterDatePicker")[0].props.onChange("2026-08-12");
      nodes(guestProps().dateInvitation, (node) => node.type === "button" && textOf(node) === "Enregistrer la date")[0].props.onClick();
      assert.match(textOf(guest()), /Date enregistrée · 12 août 2026/);
      guestProps().onOpenJournal();
      assert.match(textOf(home()), /Depuis le 12 août 2026/);
    }
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
