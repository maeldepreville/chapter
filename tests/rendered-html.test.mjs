import assert from "node:assert/strict";
import test from "node:test";

test("renders Chapter metadata and primary content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Chapter — Every book becomes part of your story<\/title>/i);
  assert.match(html, /Les Cartographies du vent/i);
  assert.match(html, /Ici, on commence par une œuvre/i);
  assert.match(html, /p1-reading-trace\.webp/i);
  assert.match(html, /data-shell="public"/);
  assert.doesNotMatch(html, /Mon journal/i);
  assert.doesNotMatch(html, /Ajouter au journal|Écrire une critique/i);
});

test("renders Maël's public profile route without owner-only controls", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("public-profile-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/profil/mael-depreville", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Maël Depréville/i);
  assert.match(html, /Portrait public/i);
  assert.match(html, /class="primary-action profile-follow-action"[^>]*aria-pressed="false"/);
  assert.doesNotMatch(html, /Ajouter une photo/i);
  assert.doesNotMatch(html, /Retourner la carte/i);
});
