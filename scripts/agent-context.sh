#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mode="${1:-summary}"

cd "$repo_root"

case "$mode" in
  summary)
    sed -n '1,240p' docs/agents/AGENT_CONTEXT.md
    echo
    echo "## État Git dynamique"
    git status --short --branch
    git log -3 --oneline
    ;;
  find)
    shift
    if [[ "$#" -eq 0 ]]; then
      echo "Usage: bash scripts/agent-context.sh find 'motif'" >&2
      exit 2
    fi
    rg -n -C 3 --glob '*.md' "$1" docs AGENTS.md README.md
    ;;
  map)
    sed -n '1,240p' docs/engineering/CODEMAP.md
    ;;
  budget)
    wc -l -w -c AGENTS.md docs/agents/AGENT_CONTEXT.md docs/agents/AGENT_WORKFLOW.md docs/engineering/CODEMAP.md docs/agents/AI_AGENT_CONTEXT_STRATEGY.md
    ;;
  *)
    echo "Usage: bash scripts/agent-context.sh {summary|find MOTIF|map|budget}" >&2
    exit 2
    ;;
esac
