import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(new URL("../app/phase10.tsx", import.meta.url), "utf8");
const stylesheet = await readFile(new URL("../app/phase10.css", import.meta.url), "utf8");

test("ties the profile's followed colors to its accessible toggle state", () => {
  assert.equal((component.match(/className="primary-action profile-follow-action"/g) ?? []).length, 3);
  assert.ok((component.match(/\? "Suivi" : "Suivre"/g) ?? []).length >= 3);
  assert.doesNotMatch(component, /Suivie/);
  assert.match(stylesheet, /\.profile-follow-action\[aria-pressed="true"\]\s*\{[^}]*color: var\(--brick\);[^}]*background: #e9e6e2;/);
  assert.match(stylesheet, /\.profile-follow-action\[aria-pressed="true"\]:hover\s*\{[^}]*color: var\(--brick-dark\);[^}]*background: #dfdbd6;/);
  assert.match(stylesheet, /\.profile-follow-action\[aria-pressed="true"\]:active\s*\{[^}]*background: #d5d0ca;/);
});

test("keeps conversation controls separated when mobile removes the review indent", () => {
  assert.match(component, /<div className="conversation-actions">\s*\{reviewReplies\.length > 0[\s\S]*?\{!isExpanded && replyAction\}\s*<\/div>/);
  assert.match(component, /\{isExpanded && <div className="conversation-actions">\{replyAction\}<\/div>\}/);
  assert.match(stylesheet, /\.conversation-actions\s*\{[^}]*display: flex;[^}]*flex-wrap: wrap;[^}]*gap: 0\.5rem 1\.25rem;/);
  assert.match(stylesheet, /\.conversation-actions > \.text-action\s*\{\s*margin: 0;/);
  assert.match(stylesheet, /@media \(max-width: 560px\)[\s\S]*?\.conversation-actions,[^{]*\{\s*margin-left: 0;/);
});
