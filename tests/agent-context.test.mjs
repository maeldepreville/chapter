import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

const read = (path) => readFileSync(resolve(root, path), "utf8");

const markdownFiles = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const path = resolve(directory, name);
    if (statSync(path).isDirectory()) {
      return markdownFiles(path);
    }
    return path.endsWith(".md") ? [path] : [];
  });

test("automatic and startup context stay within their token budgets", () => {
  const agents = read("AGENTS.md");
  const current = read("docs/agents/AGENT_CONTEXT.md");

  assert.ok(Buffer.byteLength(agents) <= 4_000, "AGENTS.md must stay below 4 KB");
  assert.ok(Buffer.byteLength(current) <= 7_000, "AGENT_CONTEXT.md must stay below 7 KB");
  assert.doesNotMatch(agents, /Avant de proposer[^\n]+lire `docs\/product\/CHAPTER_DECISIONS\.md`/i);
  assert.match(agents, /Ne pas lire intégralement `docs\/product\/CHAPTER_DECISIONS\.md`/);
});

test("context routing references real, specialized files", () => {
  const required = [
    "docs/agents/AGENT_CONTEXT.md",
    "docs/agents/AGENT_WORKFLOW.md",
    "docs/engineering/CODEMAP.md",
    "docs/agents/AI_AGENT_CONTEXT_STRATEGY.md",
    "docs/product/REFONTE_PRE_LOT_2.md",
    "docs/milestones/P0_FONDATIONS_PROTOTYPE.md",
    "docs/design/ASSET_SYSTEM.md",
    "docs/milestones/PHASE_11_BILAN_ET_CLOTURE.md",
    "docs/milestones/PHASE_11_IMPLEMENTATION_CHECKLIST.md",
  ];

  for (const path of required) {
    assert.ok(statSync(resolve(root, path)).isFile(), `${path} must exist`);
  }

  assert.equal(JSON.parse(read("package.json")).scripts.context, "bash scripts/agent-context.sh summary");
});

test("documentation structure and local Markdown links stay valid", () => {
  const categories = ["agents", "product", "design", "engineering", "milestones", "operations"];
  for (const category of categories) {
    assert.ok(statSync(resolve(root, "docs", category)).isDirectory(), `docs/${category} must exist`);
  }

  const rootDocuments = readdirSync(resolve(root, "docs"), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
  assert.deepEqual(rootDocuments, ["README.md"]);

  const files = [
    resolve(root, "AGENTS.md"),
    resolve(root, "README.md"),
    resolve(root, "assets/badges-master/README.md"),
    ...markdownFiles(resolve(root, "docs")),
  ];

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const link = match[1].split(/\s+["']/)[0];
      if (/^(?:https?:|mailto:|#)/.test(link)) continue;
      const target = resolve(dirname(file), link.split("#")[0]);
      assert.ok(
        existsSync(target),
        `${relative(root, file)} references missing local target ${link}`,
      );
    }
  }
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
