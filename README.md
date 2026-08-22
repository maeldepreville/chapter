# Chapter

Chapter is a social reading platform where every book becomes part of your story — track what you read, share what you think, and connect with readers who inspire your next chapter.

The current version is the validated frontend vertical slice completed at the end of phase 8. It focuses on the personal reading journal before the later introduction of richer discovery and social interactions.

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

The interface currently uses simulated data and session-local state. Authentication, remote persistence, advanced personal-space components and social interactions are intentionally outside this milestone.

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

- [`CHAPTER_DECISIONS.md`](./docs/CHAPTER_DECISIONS.md) — project-wide source of truth;
- [`PHASE_08_IMPLEMENTATION.md`](./docs/PHASE_08_IMPLEMENTATION.md) — validated implementation milestone;
- [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./docs/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md) — product-growth principles and safeguards.

## Roadmap status

Phases 1 through 8 are complete. Phase 9 will consolidate the component system and develop the personal space before the later social phase.
