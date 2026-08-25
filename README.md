# Chapter

Chapter is a social reading platform where every book becomes part of your story — track what you read, share what you think, and connect with readers who inspire your next chapter.

The current version is the integrated phase 10 frontend milestone, extending the personal reading experience with discovery, reader profiles, honors and lightweight social conversations.

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

- [`AGENTS.md`](./AGENTS.md) — mandatory continuity and documentation rules for every project conversation;
- [`CHAPTER_DECISIONS.md`](./docs/CHAPTER_DECISIONS.md) — project-wide source of truth;
- [`PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md`](./docs/PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md) — detailed record of the active design phase;
- [`PHASE_10_IMPLEMENTATION_CHECKLIST.md`](./docs/PHASE_10_IMPLEMENTATION_CHECKLIST.md) — exhaustive evaluation checklist for the integrated milestone;
- [`PHASE_08_IMPLEMENTATION.md`](./docs/PHASE_08_IMPLEMENTATION.md) — validated implementation milestone;
- [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./docs/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md) — product-growth principles and safeguards.

Every chat working on this repository must read the transversal log and the active phase document, then update both after each validated, refined or revised decision. Conversation history is supplementary context, never the sole project memory.

## Roadmap status

Phases 1 through 9 are complete. The phase 10 integrated frontend milestone is implemented and awaiting user evaluation.
