import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps QR1 on the owner's card with a fixed external control rail", async () => {
  const [component, stylesheet, route, sharing] = await Promise.all([
    readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/phase10.css", import.meta.url), "utf8"),
    readFile(new URL("../app/profil/mael-depreville/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/profile-share.ts", import.meta.url), "utf8"),
  ]);

  assert.match(component, /src="\/branding\/chapter-profile-qr\.svg"/);
  assert.match(component, /Scannez pour ouvrir mon profil/);
  assert.match(component, /cardFlipped \? "Voir le recto" : "Retourner la carte"/);
  assert.match(component, /Copier le lien/);
  assert.match(component, /shareController\.run\("share", publicProfileUrl\)/);
  assert.match(sharing, /navigator\.share/);
  assert.match(stylesheet, /transition:\s*transform 440ms/);
  assert.match(stylesheet, /\.profile-card-front,\s*\.profile-card-back\s*\{[^}]*-webkit-backface-visibility:\s*hidden;[^}]*backface-visibility:\s*hidden;/s);
  assert.match(stylesheet, /\.profile-card-front\s*\{[^}]*rotateY\(0deg\)[^}]*opacity:\s*1;/s);
  assert.match(stylesheet, /\.profile-identity-card\.profile-card-back\s*\{[^}]*grid-template-columns:\s*1fr;[^}]*rotateY\(180deg\)[^}]*opacity:\s*0;/s);
  assert.match(stylesheet, /\.profile-card-flip-shell\.is-flipped \.profile-card-front\s*\{[^}]*opacity:\s*0;/s);
  assert.match(stylesheet, /\.profile-card-flip-shell\.is-flipped \.profile-card-back\s*\{[^}]*opacity:\s*1;/s);
  assert.doesNotMatch(stylesheet, /@media \(max-width: (?:899|560)px\)[\s\S]*?\.profile-identity-card\s*\{\s*grid-template-columns:/);
  assert.match(stylesheet, /@media \(max-width: 560px\)[\s\S]*?\.profile-identity-card\.profile-card-back\s*\{\s*grid-template-columns:\s*1fr;/);
  assert.match(stylesheet, /\.profile-card-turn-row\s*\{/);
  assert.match(stylesheet, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.profile-card-flip\s*\{\s*transition:\s*none;/);
  assert.match(route, /initialProfileOwner="public-self"/);
});

test("keeps the public profile distinct from owner-only controls", async () => {
  const component = await readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8");

  assert.match(component, /const isOwnProfile = owner === "self"/);
  assert.match(component, /\{isOwnProfile && \(/);
  assert.match(component, /isOwnProfile && <div className="profile-photo-actions"/);
  assert.match(component, /isOwnProfile && removePhotoConfirm/);
});
