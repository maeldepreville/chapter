import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader } from "./helpers/load-tsx.mjs";

const source = (name) => fileURLToPath(new URL(`../app/${name}`, import.meta.url));
const load = createSourceLoader();
const { CHAPTER_BREAKPOINTS, chapterNavigation, journeyContracts, shellAttributes } = load(source("foundation/contracts.ts"));
const fixtures = load(source("foundation/fixtures.ts"));
const denseFixtures = load(source("foundation/dense-fixtures.ts"));
const sessions = load(source("foundation/session.ts"));

const unique = (items) => new Set(items).size === items.length;

test("P0 centralizes the visual roles and the 900px responsive contract", async () => {
  const [tokens, primitives, globals] = await Promise.all([
    readFile(source("foundation/tokens.css"), "utf8"),
    readFile(source("foundation/primitives.css"), "utf8"),
    readFile(source("globals.css"), "utf8"),
  ]);
  for (const role of ["--color-paper", "--font-editorial", "--space-4", "--radius-sm", "--border-control", "--shadow-menu", "--density-content", "--motion-card-turn", "--focus-ring"]) assert.match(tokens, new RegExp(role));
  assert.match(tokens, /--motion-card-turn:\s*440ms/);
  assert.match(tokens, /prefers-reduced-motion[\s\S]*--motion-card-turn:\s*0ms/);
  assert.match(primitives, /var\(--motion-feedback\)/);
  assert.match(globals, /@import "\.\/foundation\/tokens\.css"/);
  assert.equal(CHAPTER_BREAKPOINTS.compact, 900);
});

test("public and connected shells expose only live destinations", () => {
  assert.deepEqual(chapterNavigation.connected.map((item) => item.label), ["Journal", "Bibliothèque", "Découvrir", "Recherche"]);
  assert.deepEqual(chapterNavigation.public.map((item) => item.label), ["Découvrir", "Recherche"]);
  for (const destination of [...chapterNavigation.connected, ...chapterNavigation.public]) assert.ok(destination.result.length > 0);
  assert.equal(shellAttributes("public")["data-shell"], "public");
  assert.match(shellAttributes("connected").className, /chapter-shell--connected/);
  assert.deepEqual(Object.keys(journeyContracts), ["P1", "P2", "P3", "P4", "P5", "P6", "P7"]);
  for (const contract of Object.values(journeyContracts)) assert.ok(contract.primaryAction && contract.observableResult);
});

test("canonical entities use unique stable ids and explicit relations", () => {
  assert.ok(unique(fixtures.coreWorks.map((item) => item.id)));
  assert.ok(unique(fixtures.coreAuthors.map((item) => item.id)));
  assert.ok(unique(fixtures.coreEditions.map((item) => item.id)));
  assert.ok(unique(fixtures.prototypeReaders.map((item) => item.id)));
  assert.equal(fixtures.coreWorks.length, fixtures.coreAuthors.length);
  assert.equal(fixtures.coreWorks.length, fixtures.coreEditions.length);
  for (const work of fixtures.coreWorks) {
    assert.ok(fixtures.coreAuthors.some((author) => author.id === work.authorId));
    assert.ok(fixtures.coreEditions.some((edition) => edition.id === work.editionId && edition.workId === work.id));
  }
  for (const profile of fixtures.prototypeProfiles) assert.ok(fixtures.prototypeReaders.some((reader) => reader.id === profile.readerId));
  for (const follow of fixtures.prototypeFollows) {
    assert.ok(fixtures.prototypeReaders.some((reader) => reader.id === follow.followerId));
    assert.ok(fixtures.prototypeReaders.some((reader) => reader.id === follow.followedId));
  }
});

test("fixtures cover density, homonymy, missing media, long text and removed content", () => {
  assert.equal(denseFixtures.denseWorks.length, 500);
  assert.equal(sessions.prototypeSessions.habitual.privateRecords.length, 500);
  assert.equal(fixtures.prototypeReaders.filter((reader) => reader.publicName === "Camille Martin").length, 2);
  assert.ok(fixtures.coreWorks.some((work) => !work.cover));
  assert.ok(fixtures.prototypeProfiles.some((profile) => profile.bio.length > 500));
  assert.ok(fixtures.prototypeReviews.some((review) => review.removedAt));
  assert.ok(sessions.prototypeSessions.habitual.privateRecords.some((record) => record.progress?.kind === "bookmark"));
  assert.doesNotMatch(JSON.stringify({ fixtures: fixtures.p0Fixtures, dense: denseFixtures.habitualPrototypeSession }), /"possession"|"owned"|"ownership"/i);
});

test("private records and public writing remain separate and sessions reset deeply", () => {
  assert.equal(sessions.prototypeSessions.blank.readerId, null);
  assert.equal(sessions.prototypeSessions.activated.privateRecords.length, 1);
  for (const record of sessions.prototypeSessions.habitual.privateRecords) {
    assert.ok(Object.hasOwn(record, "privateNote"));
    assert.equal(Object.hasOwn(record, "text"), false);
  }
  for (const review of fixtures.prototypeReviews) assert.equal(Object.hasOwn(review, "privateNote"), false);

  const first = sessions.createPrototypeSession("activated");
  first.privateRecords[0].readingStatus = "Lu";
  const reset = sessions.resetPrototypeSession("activated", first);
  assert.equal(reset.privateRecords[0].readingStatus, "À lire");
  assert.notEqual(first, reset);
  assert.notEqual(first.privateRecords, reset.privateRecords);
});

test("shared primitives keep native semantics and common class contracts", () => {
  const { Button, ActionLink, Field, Input, Menu, MenuItem, Toast, EditorialSurface, Avatar, EmptyState } = load(source("foundation/primitives.tsx"));
  const markup = renderToStaticMarkup(React.createElement("div", null,
    React.createElement(Button, { variant: "primary" }, "Continuer"),
    React.createElement(ActionLink, { href: "/decouvrir" }, "Découvrir"),
    React.createElement(Field, { label: "Nom public" }, React.createElement(Input, { name: "publicName" })),
    React.createElement(Menu, { label: "Actions" }, React.createElement(MenuItem, null, "Modifier")),
    React.createElement(Toast, null, "Enregistré"),
    React.createElement(EditorialSurface, null, "Une trace"),
    React.createElement(Avatar, { name: "Camille Martin" }),
    React.createElement(EmptyState, { title: "Rien ici", description: "Commencez par une œuvre." }),
  ));
  assert.match(markup, /<button type="button" class="chapter-button chapter-button--primary">/);
  assert.match(markup, /<a href="\/decouvrir" class="chapter-action-link">/);
  assert.match(markup, /<label class="chapter-field"><span>Nom public<\/span><input class="chapter-input" name="publicName"/);
  assert.match(markup, /role="menu" aria-label="Actions"/);
  assert.match(markup, /role="menuitem"/);
  assert.match(markup, /role="status" aria-live="polite"/);
  assert.match(markup, /aria-label="Camille Martin">CM<\/span>/);
});
