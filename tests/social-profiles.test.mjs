import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader, hookHarness, nodes, textOf } from "./helpers/load-tsx.mjs";
import { profileProps } from "./fixtures/phase11.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));

test("profile traces and work pages derive from the same public reviews", () => {
  const load = createSourceLoader();
  const { ProfileView, SocialReviews } = load(source("phase10.tsx"));
  const { defaultWorks } = load(source("page.tsx"));
  const linaProfile = renderToStaticMarkup(React.createElement(ProfileView, { ...profileProps, owner: "lina", works: defaultWorks }));
  const rivageReviews = renderToStaticMarkup(React.createElement(SocialReviews, { workId: "rivage", personalReview: "", personalRating: 0, onOpenProfile() {}, onWriteReview() {} }));
  const cartographiesReviews = renderToStaticMarkup(React.createElement(SocialReviews, { workId: "cartographies", personalReview: "", personalRating: 0, onOpenProfile() {}, onWriteReview() {} }));

  assert.match(linaProfile, /Le rivage devient ici une mesure du temps/);
  assert.match(linaProfile, /Un roman qui avance comme une carte/);
  assert.match(rivageReviews, /Le rivage devient ici une mesure du temps/);
  assert.match(cartographiesReviews, /Un roman qui avance comme une carte/);
});

test("review and reply identities all expose their actor to profile navigation", () => {
  const harness = hookHarness();
  const { SocialReviews } = createSourceLoader({ react: harness.react })(source("phase10.tsx"));
  const opened = [];
  const render = () => harness.render(SocialReviews, { workId: "cartographies", personalReview: "", personalRating: 0, onOpenProfile(actorId) { opened.push(actorId); }, onWriteReview() {} });

  const authorButtons = nodes(render(), (node) => node.props?.className === "review-author-button");
  authorButtons.forEach((button) => button.props.onClick());
  const replyAuthors = nodes(render(), (node) => node.props?.className === "reply-author-button");
  replyAuthors.forEach((button) => button.props.onClick());

  assert.deepEqual(authorButtons.map(textOf), ["Lina Morel18 août 2026", "Théo Renaud12 août 2026", "Inès Naël3 août 2026"]);
  assert.deepEqual(new Set(opened), new Set(["lina", "theo", "ines"]));
});

test("the root opens a real public profile for every social actor", () => {
  const harness = hookHarness();
  const Home = createSourceLoader({ react: harness.react })(source("page.tsx")).default;
  const render = () => harness.render(Home, { initialData: { view: "work" } });
  const component = (name) => nodes(render(), (node) => typeof node.type === "function" && node.type.name === name)[0];
  const previousWindow = globalThis.window;
  globalThis.window = { location: { pathname: "/" }, history: { replaceState() {} }, scrollTo() {} };
  try {
    component("SocialReviews").props.onOpenProfile("theo");
    assert.equal(component("ProfileView").props.owner, "theo");
    const { profilePresentations } = createSourceLoader()(source("prototype-data.ts"));
    assert.equal(profilePresentations[component("ProfileView").props.owner].actorId, "theo");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});
