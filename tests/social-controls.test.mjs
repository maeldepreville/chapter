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

test("keeps conversation controls separated and moderation actions discreet on mobile", () => {
  assert.match(component, /<header className="review-header">[\s\S]*?renderModerationMenu\(`review-/);
  assert.match(component, /renderModerationMenu[\s\S]*?Signaler[\s\S]*?Bloquer/);
  assert.match(component, /<header>[\s\S]*?<small>\{reply\.date\}<\/small>[\s\S]*?renderModerationMenu\(`reply-/);
  assert.match(component, /\{isExpanded && <div className="reply-list">[\s\S]*?renderModerationMenu\(`reply-/);
  assert.match(component, /\{isExpanded && <div className="conversation-actions">\{replyAction\}<\/div>\}/);
  assert.match(stylesheet, /\.conversation-actions\s*\{[^}]*display: flex;[^}]*flex-wrap: wrap;[^}]*gap: 0\.5rem 1\.25rem;/);
  assert.match(stylesheet, /\.conversation-actions > \.text-action\s*\{\s*margin: 0;/);
  assert.match(stylesheet, /@media \(max-width: 560px\)[\s\S]*?\.conversation-actions,[^{]*\{\s*margin-left: 0;/);
  assert.match(stylesheet, /\.social-review \.review-header\s*\{[^}]*grid-template-columns: auto minmax\(0, 1fr\) auto auto;/);
  assert.match(stylesheet, /\.review-more-trigger\s*\{[^}]*color: var\(--brick\);[^}]*background: transparent;[^}]*border: 0;/);
  assert.match(stylesheet, /\.review-more-trigger:hover\s*\{\s*color: color-mix\(in srgb, var\(--brick\) 72%, var\(--ink\)\);\s*\}/);
  assert.match(stylesheet, /button\.review-more-trigger:active\s*\{[^}]*transform: scale\(0\.86\);/);
  assert.doesNotMatch(stylesheet, /\.review-more-trigger:hover\s*\{[^}]*background:|\.review-more-trigger\[aria-expanded="true"\]\s*\{[^}]*background:/);
  assert.match(stylesheet, /\.review-more-menu\s*\{[^}]*position: absolute;[^}]*background: var\(--surface\);/);
  assert.match(stylesheet, /\.reply header \.review-more-actions\s*\{\s*margin-left: auto;/);
});
