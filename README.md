# Chapter

Chapter is a social reading platform where every book becomes part of your story — track what you read, share what you think, and connect with readers who inspire your next chapter.

The current visible candidate is the grouped phase 11 milestone for completing lot 1. It consolidates the personal and social reading experience across edge cases, responsive layouts, accessibility, motion and recovery states. It remains under user evaluation and is not yet the accepted GitHub milestone.

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
- [`AGENT_CONTEXT.md`](./docs/AGENT_CONTEXT.md) — compact current state, invariants and next action;
- [`CODEMAP.md`](./docs/CODEMAP.md) — feature-to-source-and-test map;
- [`PHASE_11_BILAN_ET_CLOTURE.md`](./docs/PHASE_11_BILAN_ET_CLOTURE.md) — current milestone status and decisive evaluation order;
- [`CHAPTER_DECISIONS.md`](./docs/CHAPTER_DECISIONS.md) — searchable project-wide decision archive;
- [`AI_AGENT_CONTEXT_STRATEGY.md`](./docs/AI_AGENT_CONTEXT_STRATEGY.md) — researched strategy for minimizing agent context and token use;
- [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./docs/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md) — product-growth principles and safeguards.

Fresh agent sessions start with `npm run context`, then retrieve only the relevant decision sections and source symbols. Conversation history is supplementary context, never the sole project memory.

## Roadmap status

Phases 1 through 10 are complete. Phase 11 is deployed as Sites version 28 for evaluation; lot 1 remains open until explicit acceptance and verified GitHub synchronization.
