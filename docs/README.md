# Chapter — Product and UI documentation

This directory preserves the decisions made during the progressive design of Chapter.

## Source of truth

[`AGENT_CONTEXT.md`](./AGENT_CONTEXT.md) is the compact current-state entry point. [`CHAPTER_DECISIONS.md`](./CHAPTER_DECISIONS.md) remains the transversal decision archive for the validated roadmap, constraints, decisions and justifications; agents search it on demand instead of loading it in full.

## Conversation continuity

The concise repository rules in [`../AGENTS.md`](../AGENTS.md) apply to every project chat. Run `bash scripts/agent-context.sh summary`, follow the routing table, then retrieve only the relevant sections. [`AGENT_WORKFLOW.md`](./AGENT_WORKFLOW.md) contains conditional procedures, [`CODEMAP.md`](./CODEMAP.md) routes features to source and tests, and [`AI_AGENT_CONTEXT_STRATEGY.md`](./AI_AGENT_CONTEXT_STRATEGY.md) records the research and token-budget rationale. Chat history complements these files but never replaces them.

## Detailed deliverables

- [`AGENT_CONTEXT.md`](./AGENT_CONTEXT.md) — Compact active state, invariants, routing and next action.
- [`AGENT_WORKFLOW.md`](./AGENT_WORKFLOW.md) — Conditional procedures for implementation, documentation, validation, GitHub and Sites.
- [`CODEMAP.md`](./CODEMAP.md) — Compact mapping from product areas to source modules and tests.
- [`AI_AGENT_CONTEXT_STRATEGY.md`](./AI_AGENT_CONTEXT_STRATEGY.md) — Evidence-backed context and token strategy, measurements and rejected approaches.
- [`PHASE_02_CARTE_ECRANS.md`](./PHASE_02_CARTE_ECRANS.md)
- [`PHASE_03_NAVIGATION.md`](./PHASE_03_NAVIGATION.md)
- [`PHASE_04_DIRECTION_VISUELLE.md`](./PHASE_04_DIRECTION_VISUELLE.md)
- [`PHASE_05_PAGE_OEUVRE.md`](./PHASE_05_PAGE_OEUVRE.md)
- [`PHASE_06_MOBILE.md`](./PHASE_06_MOBILE.md)
- [`PHASE_07_PARCOURS_PERSONNELS.md`](./PHASE_07_PARCOURS_PERSONNELS.md)
- [`PHASE_08_IMPLEMENTATION.md`](./PHASE_08_IMPLEMENTATION.md)
- [`PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md`](./PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md)
- [`PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md`](./PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md)
- [`PHASE_10_IMPLEMENTATION_CHECKLIST.md`](./PHASE_10_IMPLEMENTATION_CHECKLIST.md)
- [`PHASE_10_BILAN_ET_PASSATION.md`](./PHASE_10_BILAN_ET_PASSATION.md) — Phase 10 accepted and closed on 27 August 2026; historical handoff to Phase 11.
- [`PHASE_11_CONSOLIDATION_TRANSVERSALE.md`](./PHASE_11_CONSOLIDATION_TRANSVERSALE.md) — Three correction sets plus AM1 implemented; CT1 rejected. Sites version 28 includes the mobile card back, coherent follow controls, Discover clearing and reachable honor-detail actions. Browser re-evaluation and GitHub synchronization remain pending.
- [`PHASE_11_IMPLEMENTATION_CHECKLIST.md`](./PHASE_11_IMPLEMENTATION_CHECKLIST.md) — Exhaustive manual acceptance checklist for the grouped phase 11 milestone; not a completed test record.
- [`PHASE_11_BILAN_ET_CLOTURE.md`](./PHASE_11_BILAN_ET_CLOTURE.md) — Technical balance, evidence limits, decisive acceptance order and conditions for closing phase 11 and lot 1. The milestone remains a candidate awaiting user validation.
- [`PROMPT_PRODUCTION_BADGES_CHAPTER.md`](./PROMPT_PRODUCTION_BADGES_CHAPTER.md)
- [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md)

When a later decision revises an earlier one, update the transversal log explicitly rather than silently contradicting it in another file.
