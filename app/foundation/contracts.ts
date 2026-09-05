export type EntityId = string;
export type ReadingStatus = "À lire" | "En cours" | "Lu";
export type ShellMode = "public" | "connected";
export type JourneyId = "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7";

export type Work = {
  id: EntityId;
  authorId: EntityId;
  editionId: EntityId;
  title: string;
  author: string;
  meta: string;
  year: string;
  genre: string;
  language: string;
  rating: string;
  ratingCount: string;
  lede: string;
  synopsis: readonly string[];
  cover: boolean;
  coverTone: string;
  coverSrc?: string;
};

export type Author = { id: EntityId; name: string };
export type Edition = { id: EntityId; workId: EntityId; language: string; publicationYear: number };
export type Reader = { id: EntityId; publicName: string; initials: string };
export type PublicProfile = { id: EntityId; readerId: EntityId; bio: string; avatarSrc?: string };
export type Follow = { id: EntityId; followerId: EntityId; followedId: EntityId };

export type OptionalProgress = {
  kind: "bookmark";
  page: number;
  totalPages?: number;
  updatedAt: string;
};

export type PrivateReadingRecord = {
  id: EntityId;
  readerId: EntityId;
  workId: EntityId;
  readingStatus: ReadingStatus | null;
  readingDate: string;
  privateNote: string;
  rating: number;
  progress?: OptionalProgress;
};

export type PublicReview = {
  id: EntityId;
  authorId: EntityId;
  workId: EntityId;
  text: string;
  rating: number;
  publishedAt: string;
  removedAt?: string;
};

export type PublicReply = {
  id: EntityId;
  reviewId: EntityId;
  authorId: EntityId;
  text: string;
  publishedAt: string;
};

export type PublicList = {
  id: EntityId;
  ownerId: EntityId;
  title: string;
  description: string;
  workIds: readonly EntityId[];
};

export type PrototypeSession = {
  id: EntityId;
  readerId: EntityId | null;
  privateRecords: PrivateReadingRecord[];
  reviews: PublicReview[];
  replies: PublicReply[];
  follows: Follow[];
};

export const CHAPTER_BREAKPOINTS = { compact: 900 } as const;

export const chapterNavigation = {
  public: [
    { id: "discover", label: "Découvrir", result: "open-discover" },
    { id: "search", label: "Recherche", result: "open-search" },
  ],
  connected: [
    { id: "journal", label: "Journal", result: "open-journal" },
    { id: "library", label: "Bibliothèque", result: "open-library" },
    { id: "discover", label: "Découvrir", result: "open-discover" },
    { id: "search", label: "Recherche", result: "open-search" },
  ],
} as const;

export const journeyContracts = {
  P1: { surface: "public-home-and-work", primaryAction: "open-public-work", observableResult: "public-work-visible", requiresAccount: false },
  P2: { surface: "first-reading-mark", primaryAction: "save-reading-status", observableResult: "private-reading-mark-visible", requiresAccount: true },
  P3: { surface: "search", primaryAction: "submit-search", observableResult: "search-results-visible", requiresAccount: false },
  P4: { surface: "journal-and-library", primaryAction: "filter-private-library", observableResult: "filtered-library-visible", requiresAccount: true },
  P5: { surface: "discover", primaryAction: "open-editorial-path", observableResult: "editorial-path-visible", requiresAccount: false },
  P6: { surface: "public-profile-and-lists", primaryAction: "publish-visible-trace", observableResult: "public-trace-visible", requiresAccount: true },
  P7: { surface: "settings-and-migration", primaryAction: "reset-prototype-session", observableResult: "selected-session-restored", requiresAccount: true },
} as const satisfies Record<JourneyId, { surface: string; primaryAction: string; observableResult: string; requiresAccount: boolean }>;

export function shellAttributes(mode: ShellMode) {
  return {
    className: `site-shell chapter-shell chapter-shell--${mode}`,
    "data-shell": mode,
  } as const;
}
