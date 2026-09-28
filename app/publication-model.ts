import type { PublicReview } from "./foundation/contracts";

export type Publication = PublicReview & {
  spoiler: boolean;
  sourceExperienceId?: string;
};

export type PublicationEntry = {
  review: string;
  reviewPublished?: boolean;
  publicReview?: Publication;
  rating: number;
};

const newPublicationId = (workId: string) => `review-${workId}-${globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`;

// Old prototype fixtures used one text field for drafts and public reviews.
// Convert them once at the session boundary; new writes keep the two objects apart.
export function hydratePublication<T extends PublicationEntry>(entry: T, workId: string): T {
  if (entry.publicReview || !entry.reviewPublished || !entry.review.trim()) return entry;
  return {
    ...entry,
    review: "",
    reviewPublished: false,
    publicReview: {
      id: `review-${workId}-self`, authorId: "self", workId,
      text: entry.review, rating: entry.rating, spoiler: false,
      publishedAt: "", // The legacy fixture contains no publication timestamp.
    },
  };
}

export function composePublication(previous: Publication | undefined, workId: string, text: string, rating: number, spoiler: boolean, sourceExperienceId?: string): Publication {
  return {
    id: previous?.id ?? newPublicationId(workId),
    authorId: "self", workId, text: text.trim(), rating, spoiler,
    publishedAt: previous?.publishedAt ?? new Date().toISOString(),
    ...(sourceExperienceId ? { sourceExperienceId } : previous?.sourceExperienceId ? { sourceExperienceId: previous.sourceExperienceId } : {}),
  };
}
