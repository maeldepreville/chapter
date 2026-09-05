import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

const read = (path) => readFileSync(resolve(root, path), "utf8");

test("automatic and startup context stay within their token budgets", () => {
  const agents = read("AGENTS.md");
  const current = read("docs/AGENT_CONTEXT.md");

  assert.ok(Buffer.byteLength(agents) <= 4_000, "AGENTS.md must stay below 4 KB");
  assert.ok(Buffer.byteLength(current) <= 7_000, "AGENT_CONTEXT.md must stay below 7 KB");
  assert.doesNotMatch(agents, /Avant de proposer[^\n]+lire `docs\/CHAPTER_DECISIONS\.md`/i);
  assert.match(agents, /Ne pas lire intégralement `docs\/CHAPTER_DECISIONS\.md`/);
});

test("context routing references real, specialized files", () => {
  const required = [
    "docs/AGENT_CONTEXT.md",
    "docs/AGENT_WORKFLOW.md",
    "docs/CODEMAP.md",
    "docs/AI_AGENT_CONTEXT_STRATEGY.md",
    "docs/REFONTE_PRE_LOT_2.md",
    "docs/P0_FONDATIONS_PROTOTYPE.md",
    "docs/ASSET_SYSTEM.md",
    "docs/PHASE_11_BILAN_ET_CLOTURE.md",
    "docs/PHASE_11_IMPLEMENTATION_CHECKLIST.md",
  ];

  for (const path of required) {
    assert.ok(statSync(resolve(root, path)).isFile(), `${path} must exist`);
  }

  assert.equal(JSON.parse(read("package.json")).scripts.context, "bash scripts/agent-context.sh summary");
});

test("the context helper returns compact state and supports targeted retrieval", () => {
  const summary = execFileSync("bash", ["scripts/agent-context.sh", "summary"], {
    cwd: root,
    encoding: "utf8",
  });
  const targeted = execFileSync("bash", ["scripts/agent-context.sh", "find", "P11-F32"], {
    cwd: root,
    encoding: "utf8",
  });

  assert.match(summary, /Phase active.*refonte visible pré-lot 2/i);
  assert.match(summary, /refonte-pre-lot-2/);
  assert.match(summary, /État Git dynamique/);
  assert.ok(Buffer.byteLength(summary) < 10_000, "startup summary must remain compact");
  assert.match(targeted, /P11-F32/);
});
