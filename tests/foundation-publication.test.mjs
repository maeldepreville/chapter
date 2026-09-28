import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";
import { profileProps } from "./fixtures/phase11.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const { hydratePublication, composePublication } = createSourceLoader()(source("publication-model.ts"));

test("a public object has its own stable identity and leaves the private draft untouched", () => {
  const privateEntry = { review: "Mon brouillon privé", reviewPublished: false, rating: 3 };
  assert.equal(hydratePublication(privateEntry, "atlas"), privateEntry);
  const published = composePublication(undefined, "atlas", " Une formulation publique ", 4, true, "reading-atlas-1");
  assert.equal(published.text, "Une formulation publique");
  assert.equal(published.spoiler, true);
  assert.equal(published.sourceExperienceId, "reading-atlas-1");
  assert.equal(privateEntry.review, "Mon brouillon privé");
  const revised = composePublication(published, "atlas", "Nouvelle critique", 5, false);
  assert.equal(revised.id, published.id);
  assert.notEqual(composePublication(undefined, "atlas", "Autre publication", 0, false).id, published.id, "republishing after withdrawal creates a new object");
  assert.equal(revised.sourceExperienceId, published.sourceExperienceId);
  assert.equal(privateEntry.review, "Mon brouillon privé");
  const legacy = hydratePublication({ review: "Ancienne critique", reviewPublished: true, rating: 4 }, "atlas");
  assert.equal(legacy.review, "");
  assert.equal(legacy.publicReview.text, "Ancienne critique");
});

test("the review waits for a matching preview and confirmation; cancellation keeps private writing", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/oeuvres/cartographies" }, history: { pushState() {}, replaceState() {} }, scrollTo() {}, requestAnimationFrame(callback) { callback(); return 1; } };
  try {
    const render = () => harness.render(Home, { initialSettingsOpen: true, initialData: { view: "work", entries: { cartographies: { readingStatus: "Lu", readingDate: "", note: "Une mémoire intime", review: "Un brouillon distinct", reviewPublished: false, rating: 3 } }, traces: [] } });
    const button = (label) => {
      const matches = nodes(render(), (node) => node.type === "button" && textOf(node) === label);
      assert.equal(matches.length, 1, label);
      return matches[0];
    };
    button("Reprendre mon brouillon").props.onClick();
    const editor = nodes(render(), (node) => node.type === "textarea")[0];
    assert.equal(editor.props.value, "Un brouillon distinct");
    editor.props.onChange({ target: { value: "Une version publique exacte" } });
    nodes(render(), (node) => node.type === "button" && node.props?.["aria-label"] === "4 étoiles")[0].props.onClick();
    button("Voir avant de publier").props.onClick();
    const preview = nodes(render(), (node) => node.props?.className === "publication-preview")[0];
    assert.match(textOf(preview), /Les Cartographies du vent/);
    assert.match(textOf(preview), /Une version publique exacte/);
    assert.match(textOf(preview), /répondre à cette critique/);
    assert.match(textOf(render()), /Une mémoire intime/);
    button("Modifier le texte").props.onClick();
    assert.equal(nodes(render(), (node) => node.props?.className === "publication-preview").length, 0);
    button("Voir avant de publier").props.onClick();
    button("Confirmer la publication").props.onClick();
    const social = nodes(render(), (node) => node.type?.name === "SocialReviews")[0];
    assert.equal(social.props.personalReview, "Une version publique exacte");
    assert.equal(social.props.personalRating, 4);
    assert.match(textOf(render()), /Une mémoire intime/);
    const exported = nodes(render(), (node) => node.type?.name === "TrustSettings")[0].props.createExport();
    assert.equal(exported.privateRecords.find((record) => record.workId === "cartographies").rating, 3);
    assert.equal(exported.privateRecords.find((record) => record.workId === "cartographies").review, "Un brouillon distinct");
    assert.equal(exported.publications.find((review) => review.workId === "cartographies").rating, 4);
    const toast = nodes(render(), (node) => node.type?.name === "ToastStack")[0].props.toasts.at(-1);
    toast.onAction();
    assert.match(textOf(render()), /Une mémoire intime/);
    assert.equal(nodes(render(), (node) => node.type === "textarea")[0].props.value, "Une version publique exacte");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("a first private reading opens an account without asking for a public name", () => {
  const harness = hookHarness();
  const PublicWork = createSourceLoader({ react: harness.react })(source("p1-public.tsx")).PublicWork;
  const { coreWorks } = createSourceLoader()(source("foundation/fixtures.ts"));
  let savedStatus;
  const render = () => harness.render(PublicWork, { work: coreWorks[0], onBack() {}, onActivate(status) { savedStatus = status; }, onSaveMarker() {} });
  const add = nodes(render(), (node) => node.type === "button" && textOf(node) === "Ajouter au journal")[0];
  add.props.onClick();
  const status = nodes(render(), (node) => node.type === "button" && textOf(node) === "À lire")[0];
  status.props.onClick();
  const account = nodes(render(), (node) => node.type?.name === "AccountCreationDialog")[0];
  assert.equal(account.props.open, true);
  assert.equal(account.props.requireReaderName, false);
  account.props.onComplete({ readerName: "", email: "lecteur@example.fr" });
  assert.equal(savedStatus, "À lire");
});

test("a reader with a private space chooses a signature only on the first public action", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/oeuvres/cartographies" }, history: { pushState() {}, replaceState() {} }, scrollTo() {}, requestAnimationFrame(callback) { callback(); return 1; } };
  try {
    const render = () => harness.render(Home, { initialPublicWorkId: "cartographies" });
    let tree = render();
    nodes(tree, (node) => node.type?.name === "PublicWork")[0].props.onActivate("À lire");
    tree = render();
    assert.equal(nodes(tree, (node) => node.type?.name === "PublicNameDialog")[0].props.open, false);
    const publicWork = nodes(tree, (node) => node.type?.name === "PublicWork")[0];
    const social = publicWork ? nodes(publicWork.props.social, (node) => node.type?.name === "SocialReviews")[0] : nodes(tree, (node) => node.type?.name === "SocialReviews")[0];
    social.props.onWriteReview();
    tree = render();
    assert.equal(nodes(tree, (node) => node.type?.name === "PublicNameDialog")[0].props.open, true);
    assert.equal(nodes(tree, (node) => node.type?.name === "AccountCreationDialog")[0].props.open, false);
    nodes(tree, (node) => node.type?.name === "PublicNameDialog")[0].props.onComplete("Lectora");
    assert.match(textOf(render()), /Visible par tous après publication/);
    nodes(render(), (node) => node.type === "textarea")[0].props.onChange({ target: { value: "Un avis choisi" } });
    nodes(render(), (node) => node.type === "button" && textOf(node) === "Voir avant de publier")[0].props.onClick();
    assert.match(textOf(render()), /Lectora/);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("a spoiler stays hidden on the work and in the profile until a reader reveals it", () => {
  const { SocialReviews, ProfileView } = createSourceLoader()(source("phase10.tsx"));
  const { coreWorks } = createSourceLoader()(source("foundation/fixtures.ts"));
  const props = { workId: "cartographies", personalReview: "La fin révèle le secret", personalRating: 4, personalSpoiler: true, onOpenProfile() {}, onWriteReview() {} };
  const rendered = renderToStaticMarkup(React.createElement(SocialReviews, props));
  assert.match(rendered, /Afficher la critique/);
  assert.doesNotMatch(rendered, /La fin révèle le secret/);
  const profile = renderToStaticMarkup(React.createElement(ProfileView, { ...profileProps, works: coreWorks, personalReviews: [{ authorId: "self", workId: "cartographies", text: "La fin révèle le secret", rating: 4, spoiler: true, date: "Aujourd’hui" }] }));
  assert.match(profile, /ouvrir l’œuvre pour lire/);
  assert.doesNotMatch(profile, /La fin révèle le secret/);
});
