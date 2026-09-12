# Chapter

Chapter is a social reading platform where every book becomes part of your story — track what you read, share what you think, and connect with readers who inspire your next chapter.

The current accepted baseline is Sites version 84. It completes the P0–P7 user-visible redesign and precedes the separately scoped backend lot 2.

## Live version

[Open Chapter](https://chapter-reading.smrdsh.chatgpt.site)

## Implemented experience

- responsive desktop and mobile navigation;
- search and selection across several works;
- work pages with editorial presentation, synopsis and public reviews;
- reading statuses: `À lire`, `En cours` and `Lu`;
- optional reading dates;
- private notes with explicit saving and discard protection;
- public reviews limited to 3,000 characters;
- optional one-to-five-star ratings;
- immediate publication with a temporary undo action;
- lightweight Journal and Library views.
- an editorial Discover space with intent-based recommendations and approximate search;
- public reader profiles, following and standalone public lists;
- a private/public honors gallery using 21 production badge assets;
- optional profile-photo cropping with mouse, touch, wheel and pinch controls;
- followed-reader prioritization and flat, reversible review conversations.

The interface currently uses simulated data and session-local state. Authentication, remote persistence, production recommendation services and complete moderation remain outside this milestone.

## Stack

- React 19
- TypeScript
- Next.js / Vinext
- Tailwind CSS 4
- Cloudflare-compatible worker build

## Run locally

Requirements: Node.js `>=22.13.0` and a Linux environment with GNU `timeout`.

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
```

## Project documentation

Product, UX and visual decisions are versioned in [`docs/`](./docs/). Start with:

- [`AGENTS.md`](./AGENTS.md) — short mandatory rules and context-routing entry point;
- [`AGENT_CONTEXT.md`](./docs/agents/AGENT_CONTEXT.md) — compact current state, invariants and next action;
- [`REFONTE_PRE_LOT_2.md`](./docs/product/REFONTE_PRE_LOT_2.md) — validated product doctrine, visual principles and P0–P7 roadmap;
- [`P7_RECETTE_COMPLETE.md`](./docs/milestones/P7_RECETTE_COMPLETE.md) — accepted redesign scope, final evidence and handoff to backend lot 2;
- [`ASSET_SYSTEM.md`](./docs/design/ASSET_SYSTEM.md) — asset direction, scale, hierarchy and review checklist;
- [`CODEMAP.md`](./docs/engineering/CODEMAP.md) — feature-to-source-and-test map;
- [`PHASE_11_BILAN_ET_CLOTURE.md`](./docs/milestones/PHASE_11_BILAN_ET_CLOTURE.md) — current milestone status and decisive evaluation order;
- [`CHAPTER_DECISIONS.md`](./docs/product/CHAPTER_DECISIONS.md) — searchable project-wide decision archive;
- [`AI_AGENT_CONTEXT_STRATEGY.md`](./docs/agents/AI_AGENT_CONTEXT_STRATEGY.md) — researched strategy for minimizing agent context and token use;
- [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./docs/product/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md) — product-growth principles and safeguards.

Fresh agent sessions start with `npm run context`, then retrieve only the relevant decision sections and source symbols. Conversation history is supplementary context, never the sole project memory.

## Roadmap status

Phases 1 through 11, lot 1 and the P0–P7 pre-lot-2 redesign are complete. Sites version 84 is the accepted live baseline; its GitHub `main` merge awaits explicit publication authorization. Backend lot 2 remains to be framed before implementation.
