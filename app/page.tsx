"use client";

import { useEffect, useRef, useState } from "react";
import { CoverFrame } from "./cover-frame";
import { JournalTrace, saveReadingTrace, saveWrittenTrace } from "./journal-model";
import { LibrarySort, LibrarySortControl } from "./library-sort";
import { Modal } from "./modal";
import { Fade } from "./fade";
import { lockBodyScroll } from "./modal-behavior";
import { BadgeId, DiscoverView, HonorsView, PhotoCropper, ProfilePhoto, ProfileView, PublicListView, SocialReviews } from "./phase10";
import type { PublicListId } from "./catalogue";
import { actorIdForProfile, CURRENT_READER_ID, profileOwnerForActor, prototypeActors, type ProfileOwner, type PrototypeActorId } from "./prototype-data";
import type { PrototypePublicReview } from "./social-data";
import { PUBLIC_PROFILE_PATH } from "./site-config";
import { shellAttributes, type ReadingStatus, type Work as FoundationWork } from "./foundation/contracts";
import { coreActivityOrder, coreEntries, coreJournalTraces, coreWorks, emptyPersonalEntry } from "./foundation/fixtures";
import { PublicDiscover, PublicSearch, PublicWork } from "./p1-public";
import { publicWorks } from "./p1-public-fixtures";

type DatePrompt = "start" | "finish" | null;
type View = "work" | "journal" | "library" | "discover" | "search" | "profile" | "honors" | "list";
type LibraryFilter = "Toutes" | ReadingStatus;
type StatusOrigin = "opening" | "journal" | "library";
type PublicListOrigin = "discover" | "profile";
type Feedback = {
  kind: "publication" | "removal" | "saved";
  label: string;
  detail: string;
};

type PersonalEntry = {
  readingStatus: ReadingStatus | null;
  readingDate: string;
  note: string;
  review: string;
  rating: number;
};

const emptyEntry: PersonalEntry = { ...emptyPersonalEntry };
const UNDO_DURATION_MS = 5000;
const currentReader = prototypeActors[CURRENT_READER_ID];

export const defaultWorks = coreWorks;
type WorkId = string;
type Work = FoundationWork;

const coverTitleTier = (title: string) => {
  if (title.length <= 18) return "cover-title-short";
  if (title.length <= 31) return "cover-title-medium";
  return "cover-title-long";
};

function WorkCover({ work, variant }: { work: Work; variant: "book" | "library" | "journal" | "mini" }) {
  const className = variant === "book" ? "book-cover" : `${variant}-cover`;
  const sizes = variant === "book" ? "(max-width: 899px) 160px, 320px" : variant === "library" ? "(max-width: 899px) 45vw, 240px" : "96px";

  return (
    <CoverFrame work={work} className={className} priority={variant === "book"} sizes={sizes}>
      {variant === "mini" ? (
        <strong aria-hidden="true">{work.title.slice(0, 1)}</strong>
      ) : (
        <span className="cover-copy" aria-hidden="true">
          {variant !== "library" && <span className="cover-mark">CHAPTER</span>}
          <strong className={coverTitleTier(work.title)}>{work.title}</strong>
          <small>{work.author}</small>
        </span>
      )}
    </CoverFrame>
  );
}

const defaultJournalTraces: readonly JournalTrace[] = coreJournalTraces;
const activityOrder = coreActivityOrder as Record<string, number>;
const defaultEntries: Record<string, PersonalEntry> = coreEntries;

// Internal fixture injection only; no public switch, URL parameter or storage.
type InitialData = { works?: readonly Work[]; entries?: Record<string, PersonalEntry>; traces?: readonly JournalTrace[]; view?: View };
type HomeProps = {
  initialProfileOwner?: "public-self" | null;
  initialData?: InitialData;
  initialPublicView?: "discover" | "search";
  initialPublicWorkId?: string | null;
};

export default function Home({ initialProfileOwner = null, initialData, initialPublicView, initialPublicWorkId = null }: HomeProps) {
  const p1Public = !initialProfileOwner && !initialData;
  const works = initialData?.works ?? (p1Public ? publicWorks : defaultWorks);
  const [currentView, setCurrentView] = useState<View>(initialProfileOwner ? "profile" : initialPublicWorkId ? "work" : p1Public ? initialPublicView ?? "discover" : initialData?.view ?? "work");
  const [selectedWorkId, setSelectedWorkId] = useState<WorkId>(initialPublicWorkId ?? works[0]?.id ?? "cartographies");
  const [entries, setEntries] = useState<Record<string, PersonalEntry>>(initialData?.entries ?? defaultEntries);
  const [journalTraces, setJournalTraces] = useState<readonly JournalTrace[]>(initialData?.traces ?? defaultJournalTraces);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [statusOrigin, setStatusOrigin] = useState<StatusOrigin>("opening");
  const [statusWorkId, setStatusWorkId] = useState<WorkId>(works[0]?.id ?? "cartographies");
  const [datePrompt, setDatePrompt] = useState<DatePrompt>(null);
  const [customDateOpen, setCustomDateOpen] = useState(false);
  const [removeConfirmWorkId, setRemoveConfirmWorkId] = useState<WorkId | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteCloseConfirm, setNoteCloseConfirm] = useState(false);
  const [reviewDraft, setReviewDraft] = useState("");
  const [ratingDraft, setRatingDraft] = useState(0);
  const [ratingPreview, setRatingPreview] = useState<number | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewCloseConfirm, setReviewCloseConfirm] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [feedbackPaused, setFeedbackPaused] = useState(false);
  const [activeSection, setActiveSection] = useState("journal");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [expandedJournalTraces, setExpandedJournalTraces] = useState<string[]>([]);
  const [olderJournalVisible, setOlderJournalVisible] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState<LibraryFilter>("Toutes");
  const [librarySort, setLibrarySort] = useState<LibrarySort>("activity");
  const [libraryQuery, setLibraryQuery] = useState("");
  const [profileOwner, setProfileOwner] = useState<ProfileOwner>(initialProfileOwner ?? "self");
  const [followingActors, setFollowingActors] = useState<Record<PrototypeActorId, boolean>>({ self: false, lina: false, theo: false, ines: false });
  const [equippedTitle, setEquippedTitle] = useState("Esprit nomade");
  const [showcaseBadges, setShowcaseBadges] = useState<BadgeId[]>(["reading2", "exploration2", "expression2"]);
  const [profilePhoto, setProfilePhoto] = useState<ProfilePhoto | null>(null);
  const [photoCropOpen, setPhotoCropOpen] = useState(false);
  const [discoverInitialQuery, setDiscoverInitialQuery] = useState("");
  const [publicSearchQuery, setPublicSearchQuery] = useState("");
  const [publicWorkOrigin, setPublicWorkOrigin] = useState<"discover" | "search">("discover");
  const [publicListId, setPublicListId] = useState<PublicListId>("places");
  const [publicListOrigin, setPublicListOrigin] = useState<PublicListOrigin>("discover");
  const [publicListOwner, setPublicListOwner] = useState<ProfileOwner>("lina");
  const accountControlRef = useRef<HTMLDivElement>(null);
  const mobileAccountRef = useRef<HTMLElement>(null);
  const ratingRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const previousPublication = useRef({ workId: selectedWorkId, review: "", rating: 0 });
  const latestPublication = useRef({ workId: selectedWorkId, review: "", rating: 0 });
  const previousReviewTrace = useRef<{ trace: JournalTrace | undefined; index: number }>({ trace: undefined, index: -1 });
  const removedEntry = useRef<{ workId: WorkId; entry: PersonalEntry } | null>(null);
  const discoverySavedEntry = useRef<{ workId: WorkId; entry: PersonalEntry } | null>(null);
  const selectedWork = works.find((work) => work.id === selectedWorkId);
  const entry = entries[selectedWorkId] ?? emptyEntry;
  const filteredWorks = works.filter((work) => `${work.title} ${work.author}`.toLocaleLowerCase("fr").includes(searchQuery.trim().toLocaleLowerCase("fr")));
  const libraryWorks = works
    .filter((work) => entries[work.id]?.readingStatus)
    .filter((work) => libraryFilter === "Toutes" || entries[work.id]?.readingStatus === libraryFilter)
    .filter((work) => `${work.title} ${work.author}`.toLocaleLowerCase("fr").includes(libraryQuery.trim().toLocaleLowerCase("fr")))
    .sort((a, b) => {
      if (librarySort === "title") return a.title.localeCompare(b.title, "fr");
      if (librarySort === "author") return a.author.localeCompare(b.author, "fr");
      return activityOrder[b.id] - activityOrder[a.id];
    });
  const libraryCounts = {
    Toutes: works.filter((work) => entries[work.id]?.readingStatus).length,
    "À lire": works.filter((work) => entries[work.id]?.readingStatus === "À lire").length,
    "En cours": works.filter((work) => entries[work.id]?.readingStatus === "En cours").length,
    Lu: works.filter((work) => entries[work.id]?.readingStatus === "Lu").length,
  } satisfies Record<LibraryFilter, number>;
  const currentReadings = works
    .filter((work) => entries[work.id]?.readingStatus === "En cours")
    .sort((a, b) => activityOrder[b.id] - activityOrder[a.id])
    .slice(0, 3);
  const visibleTimelineTraces = olderJournalVisible ? journalTraces.slice(1) : journalTraces.slice(1, 4);

  const updateEntryFor = (workId: WorkId, changes: Partial<PersonalEntry>) => {
    setEntries((current) => ({
      ...current,
      [workId]: { ...(current[workId] ?? emptyEntry), ...changes },
    }));
  };
  const updateEntry = (changes: Partial<PersonalEntry>) => updateEntryFor(selectedWorkId, changes);

  const openView = (view: View) => {
    if (view !== "profile" && window.location.pathname === PUBLIC_PROFILE_PATH) window.history.replaceState(null, "", "/");
    setCurrentView(view);
    setAccountOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openProfile = (owner: ProfileOwner) => {
    if (window.location.pathname === PUBLIC_PROFILE_PATH) window.history.replaceState(null, "", "/");
    setProfileOwner(owner);
    openView("profile");
  };

  const openActorProfile = (actorId: PrototypeActorId) => openProfile(profileOwnerForActor(actorId));
  const toggleFollow = (actorId: PrototypeActorId) => setFollowingActors((current) => ({ ...current, [actorId]: !current[actorId] }));

  const openPublicList = (listId: PublicListId, origin: PublicListOrigin, owner: ProfileOwner) => {
    setPublicListId(listId);
    setPublicListOrigin(origin);
    setPublicListOwner(owner);
    openView("list");
  };

  const personalPublicReviews: readonly PrototypePublicReview[] = works.flatMap((work) => {
    const personalEntry = entries[work.id];
    return personalEntry?.review ? [{ authorId: CURRENT_READER_ID, workId: work.id, rating: personalEntry.rating, date: "Aujourd’hui", text: personalEntry.review }] : [];
  });

  const openDiscoverWithQuery = (query: string) => {
    setDiscoverInitialQuery(query.trim());
    setSearchOpen(false);
    setCurrentView("discover");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openPublicView = (view: "discover" | "search", path = view === "search" ? "/recherche" : "/decouvrir") => {
    setCurrentView(view);
    setSearchOpen(false);
    if (window.location.pathname !== path) window.history.pushState(null, "", path);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openPublicWork = (id: string, origin: "discover" | "search" = "discover") => {
    const work = works.find((candidate) => candidate.id === id);
    if (!work) return;
    setPublicWorkOrigin(origin);
    setSelectedWorkId(work.id);
    setCurrentView("work");
    setSearchOpen(false);
    const path = `/oeuvres/${work.id}`;
    if (window.location.pathname !== path) window.history.pushState(null, "", path);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const addDiscoveryToRead = (id: string) => {
    const workId = id as WorkId;
    discoverySavedEntry.current = { workId, entry: entries[workId] ?? emptyEntry };
    updateEntryFor(workId, { readingStatus: "À lire", readingDate: "" });
    setFeedback({ kind: "saved", label: "Ajouté à « À lire »", detail: "Aucune activité publique n’a été créée." });
  };

  const toggleShowcase = (id: BadgeId) => {
    setShowcaseBadges((current) => current.includes(id) ? current.filter((badgeId) => badgeId !== id) : current.length < 3 ? [...current, id] : current);
  };

  const selectWork = (id: WorkId) => {
    setSelectedWorkId(id);
    setCurrentView("work");
    setSearchOpen(false);
    setSearchQuery("");
    setStatusMenuOpen(false);
    setDatePrompt(null);
    setRemoveConfirmWorkId(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    if (!p1Public) return;
    const syncPublicLocation = () => {
      const path = window.location.pathname;
      if (path === "/recherche") return setCurrentView("search");
      const workId = path.match(/^\/oeuvres\/([^/]+)\/?$/)?.[1];
      if (workId && works.some((work) => work.id === workId)) {
        setSelectedWorkId(workId as WorkId);
        return setCurrentView("work");
      }
      setCurrentView("discover");
    };
    window.addEventListener("popstate", syncPublicLocation);
    return () => window.removeEventListener("popstate", syncPublicLocation);
  }, [p1Public, works]);

  useEffect(() => {
    const sections = ["journal", "about", "reviews"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length || currentView !== "work") return;

    let animationFrame = 0;
    const updateActiveSection = () => {
      const readingLine = Math.min(window.innerHeight * 0.3, 220);
      let nextSection = sections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) nextSection = section.id;
      });

      setActiveSection((current) => current === nextSection ? current : nextSection);
    };
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [currentView, selectedWorkId]);

  useEffect(() => {
    if (accountOpen) return lockBodyScroll(document);
  }, [accountOpen]);

  useEffect(() => {
    const closeAccountOutside = (event: PointerEvent) => {
      if (!accountOpen || document.querySelector("dialog[open]") || accountControlRef.current?.contains(event.target as Node) || mobileAccountRef.current?.contains(event.target as Node)) return;
      setAccountOpen(false);
    };
    document.addEventListener("pointerdown", closeAccountOutside);
    return () => document.removeEventListener("pointerdown", closeAccountOutside);
  }, [accountOpen]);

  useEffect(() => {
    if (!feedback || feedbackPaused) return;
    const timer = window.setTimeout(() => setFeedback(null), UNDO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [feedback, feedbackPaused]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || document.querySelector("dialog[open]")) return;
      if (accountOpen) return setAccountOpen(false);
      if (statusMenuOpen || datePrompt) {
        setStatusMenuOpen(false);
        setDatePrompt(null);
        setRemoveConfirmWorkId(null);
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  });

  const chooseStatus = (status: ReadingStatus) => {
    if (status !== "À lire" && entries[statusWorkId]?.readingStatus !== status) {
      setJournalTraces((traces) => saveReadingTrace(traces, statusWorkId, status, "Aujourd’hui"));
    }
    updateEntryFor(statusWorkId, { readingStatus: status, ...(status === "À lire" ? { readingDate: "" } : {}) });
    setStatusMenuOpen(false);
    setRemoveConfirmWorkId(null);
    setCustomDateOpen(false);
    setDatePrompt(status === "En cours" ? "start" : status === "Lu" ? "finish" : null);
  };

  const setToday = () => {
    updateEntryFor(statusWorkId, { readingDate: new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date()) });
    setDatePrompt(null);
  };

  const requestRemoval = (workId: WorkId) => {
    const targetEntry = entries[workId] ?? emptyEntry;
    if (targetEntry.note || targetEntry.review) {
      setRemoveConfirmWorkId(workId);
      return;
    }
    removeFromLibrary(workId);
  };

  const removeFromLibrary = (workId: WorkId) => {
    const targetEntry = entries[workId] ?? emptyEntry;
    removedEntry.current = { workId, entry: targetEntry };
    updateEntryFor(workId, { readingStatus: null, readingDate: "" });
    setStatusMenuOpen(false);
    setDatePrompt(null);
    setRemoveConfirmWorkId(null);
    setFeedback({ kind: "removal", label: "Œuvre retirée de la bibliothèque", detail: "Vos écrits et votre évaluation sont conservés." });
  };

  const openNote = () => {
    setNoteDraft(entry.note);
    setNoteOpen(true);
  };
  const openNoteForWork = (id: WorkId) => {
    const targetEntry = entries[id] ?? emptyEntry;
    setSelectedWorkId(id);
    setNoteDraft(targetEntry.note);
    setNoteOpen(true);
  };
  const requestNoteClose = () => {
    if (noteDraft !== entry.note) setNoteCloseConfirm(true);
    else setNoteOpen(false);
  };
  const saveNote = () => {
    updateEntry({ note: noteDraft.trim() });
    if (noteDraft.trim() !== entry.note) setJournalTraces((traces) => saveWrittenTrace(traces, selectedWorkId, "note", noteDraft, "Aujourd’hui"));
    setNoteOpen(false);
  };

  const openReview = () => {
    setReviewDraft(entry.review);
    setRatingDraft(entry.rating);
    setRatingPreview(null);
    setReviewOpen(true);
  };
  const openReviewForWork = (id: WorkId) => {
    const targetEntry = entries[id] ?? emptyEntry;
    setSelectedWorkId(id);
    setReviewDraft(targetEntry.review);
    setRatingDraft(targetEntry.rating);
    setRatingPreview(null);
    setReviewOpen(true);
  };
  const requestReviewClose = () => {
    if (reviewDraft !== entry.review || ratingDraft !== entry.rating) setReviewCloseConfirm(true);
    else setReviewOpen(false);
  };
  const publishReview = () => {
    const cleanReview = reviewDraft.trim();
    if (!cleanReview) return;
    previousPublication.current = { workId: selectedWorkId, review: entry.review, rating: entry.rating };
    latestPublication.current = { workId: selectedWorkId, review: cleanReview, rating: ratingDraft };
    const previousTraceIndex = journalTraces.findIndex((trace) => trace.workId === selectedWorkId && trace.action === "review");
    previousReviewTrace.current = { trace: journalTraces[previousTraceIndex], index: previousTraceIndex };
    const publicationLabel = entry.review ? "Critique mise à jour" : "Critique publiée";
    updateEntry({ review: cleanReview, rating: ratingDraft });
    setJournalTraces((traces) => saveWrittenTrace(traces, selectedWorkId, "review", cleanReview, "Aujourd’hui"));
    setReviewOpen(false);
    setReviewCloseConfirm(false);
    setFeedback({ kind: "publication", label: publicationLabel, detail: "Elle est maintenant visible publiquement." });
  };
  const undoFeedback = () => {
    if (feedback?.kind === "publication") {
      const previous = previousPublication.current;
      setSelectedWorkId(previous.workId);
      updateEntryFor(previous.workId, { review: previous.review, rating: previous.rating });
      const { trace: restoredTrace, index } = previousReviewTrace.current;
      setJournalTraces((traces) => {
        const rest = traces.filter((trace) => trace.workId !== previous.workId || trace.action !== "review");
        if (restoredTrace) rest.splice(Math.min(index, rest.length), 0, restoredTrace);
        return rest;
      });
      setReviewDraft(latestPublication.current.review);
      setRatingDraft(latestPublication.current.rating);
      setReviewOpen(true);
    } else if (feedback?.kind === "removal" && removedEntry.current) {
      updateEntryFor(removedEntry.current.workId, removedEntry.current.entry);
    } else if (feedback?.kind === "saved" && discoverySavedEntry.current) {
      updateEntryFor(discoverySavedEntry.current.workId, discoverySavedEntry.current.entry);
    }
    setFeedback(null);
  };

  const dateLabel = datePrompt === "start" ? "date de début" : "date de fin";
  const displayReadingDate = entry.readingDate && /^\d{4}-\d{2}-\d{2}$/.test(entry.readingDate)
    ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${entry.readingDate}T12:00:00`))
    : entry.readingDate;

  const openStatusMenu = (origin: StatusOrigin, workId: WorkId) => {
    setStatusOrigin(origin);
    setStatusWorkId(workId);
    setDatePrompt(null);
    setCustomDateOpen(false);
    setRemoveConfirmWorkId(null);
    setStatusMenuOpen((open) => !(open && statusOrigin === origin && statusWorkId === workId));
  };

  const renderStatusPopover = (origin: StatusOrigin, workId: WorkId) => {
    const visible = statusMenuOpen && statusOrigin === origin && statusWorkId === workId;
    const targetEntry = entries[workId] ?? emptyEntry;

    return (
      <Fade show={visible}>{visible && <div className="status-popover" id={`status-popover-${origin}-${workId}`} role="dialog" aria-label="Choisir un statut de lecture">
        {removeConfirmWorkId === workId ? (
          <div className="remove-confirmation" role="alertdialog" aria-labelledby={`remove-${workId}`}>
            <strong id={`remove-${workId}`}>Retirer cette œuvre ?</strong>
            <p>La note, la critique et l’évaluation resteront dans votre Journal.</p>
            <button className="primary-action" type="button" onClick={() => setRemoveConfirmWorkId(null)}>Conserver l’œuvre</button>
            <button className="destructive-action" type="button" onClick={() => removeFromLibrary(workId)}>Retirer de la bibliothèque</button>
          </div>
        ) : (
          <>
            <div className="popover-heading">
              <strong>Où en êtes-vous ?</strong>
              <button type="button" aria-label="Fermer" onClick={() => setStatusMenuOpen(false)}>×</button>
            </div>
            {(["À lire", "En cours", "Lu"] as ReadingStatus[]).map((status) => (
              <button className={status === targetEntry.readingStatus ? "selected" : ""} type="button" key={status} onClick={() => chooseStatus(status)}>{status}</button>
            ))}
            {targetEntry.readingStatus && (
              <div className="popover-danger-zone">
                <button className="destructive-action" type="button" onClick={() => requestRemoval(workId)}>Retirer de la bibliothèque</button>
              </div>
            )}
          </>
        )}
      </div>}</Fade>
    );
  };

  const renderDateInvitation = (origin: StatusOrigin, workId: WorkId) => {
    if (!datePrompt || statusOrigin !== origin || statusWorkId !== workId) return null;

    return (
      <div className="date-invitation" role="region" aria-label={`Ajouter une ${dateLabel}`}>
        <div>
          <strong>Ajouter une {dateLabel} ?</strong>
          <span>Cette étape restera modifiable.</span>
        </div>
        {!customDateOpen ? (
          <div className="date-invitation-actions">
            <button className="text-action" type="button" onClick={setToday}>Aujourd’hui</button>
            <button className="text-action" type="button" onClick={() => setCustomDateOpen(true)}>Choisir</button>
            <button className="text-action muted-action" type="button" onClick={() => setDatePrompt(null)}>Plus tard</button>
          </div>
        ) : (
          <label className="date-field">
            <span>{datePrompt === "start" ? "Début de lecture" : "Fin de lecture"}</span>
            <input type="date" onChange={(event) => updateEntryFor(workId, { readingDate: event.target.value })} />
            <button type="button" onClick={() => setDatePrompt(null)}>Enregistrer la date</button>
          </label>
        )}
      </div>
    );
  };

  const renderJournalTrace = (trace: JournalTrace, featured = false) => {
    const work = works.find((candidate) => candidate.id === trace.workId);
    const expanded = expandedJournalTraces.includes(trace.id);
    const expandable = Boolean(trace.text && trace.text.length > 145);
    const visibleText = trace.text && !expanded && expandable ? `${trace.text.slice(0, 145).trim()}…` : trace.text;

    return (
      <article className={`personal-trace ${featured ? "featured-trace" : ""}`} key={trace.id}>
        <time>{trace.date}</time>
        <div className="personal-trace-body">
          {work ? <button className="trace-work-link" type="button" onClick={() => selectWork(work.id)}>
            <WorkCover work={work} variant="mini" />
            <span><strong>{work.title}</strong><small>{work.author}</small></span>
          </button> : <p className="trace-work-unavailable"><strong>Œuvre indisponible</strong><small>Votre trace est conservée.</small></p>}
          <p className="trace-kind">{trace.kind}{trace.kind === "Note privée" ? " · visible uniquement par vous" : ""}</p>
          {visibleText && <p className="trace-copy">{visibleText}</p>}
          <div className="trace-actions">
            {expandable && (
              <button
                className="text-action"
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpandedJournalTraces((ids) => ids.includes(trace.id) ? ids.filter((id) => id !== trace.id) : [...ids, trace.id])}
              >
                {expanded ? "Réduire" : "Lire la suite"}
              </button>
            )}
            {trace.action && work && (
              <button className="text-action" type="button" onClick={() => trace.action === "note" ? openNoteForWork(work.id) : openReviewForWork(work.id)}>
                Modifier
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  const rootShell = shellAttributes(p1Public || initialProfileOwner ? "public" : "connected");

  return (
    <div {...rootShell} className={`${rootShell.className}${p1Public ? " p1-shell" : ""}`}>
      {p1Public ? (
        <header className="p1-public-header">
          <button className="wordmark wordmark-button" type="button" aria-label="Chapter, ouvrir Découvrir" onClick={() => openPublicView("discover", "/")}>Chapter<span>.</span></button>
          <nav aria-label="Navigation principale">
            <button className={currentView === "discover" || (currentView === "work" && publicWorkOrigin === "discover") ? "active" : ""} type="button" aria-current={currentView === "discover" ? "page" : undefined} onClick={() => openPublicView("discover")}>Découvrir</button>
            <button className={currentView === "search" || (currentView === "work" && publicWorkOrigin === "search") ? "active" : ""} type="button" aria-current={currentView === "search" ? "page" : undefined} onClick={() => openPublicView("search")}>Recherche</button>
          </nav>
          <span className="p1-public-note">Lire d’abord · créer un compte plus tard</span>
        </header>
      ) : <><header className="desktop-header">
        <button className="wordmark wordmark-button" type="button" aria-label={initialProfileOwner ? "Chapter, ouvrir Découvrir" : "Chapter, ouvrir le journal"} onClick={() => openView(initialProfileOwner ? "discover" : "journal")}>Chapter<span>.</span></button>
        <nav aria-label="Navigation principale">
          {!initialProfileOwner && <button className={currentView === "journal" ? "active" : ""} type="button" aria-current={currentView === "journal" ? "page" : undefined} onClick={() => openView("journal")}>Journal</button>}
          {!initialProfileOwner && <button className={currentView === "library" ? "active" : ""} type="button" aria-current={currentView === "library" ? "page" : undefined} onClick={() => openView("library")}>Bibliothèque</button>}
          <button className={currentView === "discover" ? "active" : ""} type="button" aria-current={currentView === "discover" ? "page" : undefined} onClick={() => { setDiscoverInitialQuery(""); openView("discover"); }}>Découvrir</button>
          {initialProfileOwner && <button type="button" aria-expanded={searchOpen} onClick={() => setSearchOpen(true)}>Recherche</button>}
        </nav>
        {!initialProfileOwner && <label className="header-search">
          <span className="sr-only">Rechercher un livre ou un auteur</span>
          <input
            type="search"
            placeholder="Rechercher un livre ou un auteur"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); openDiscoverWithQuery(searchQuery); } }}
          />
        </label>}
        {!initialProfileOwner && <div className="account-control" ref={accountControlRef}>
          <button className="account-button" type="button" aria-label={`Ouvrir le compte de ${currentReader.firstName}`} aria-expanded={accountOpen} aria-controls="desktop-account-menu" onClick={() => setAccountOpen((open) => !open)}>{currentReader.initials}</button>
          <Fade show={accountOpen}>{accountOpen && (
            <div className="account-menu" id="desktop-account-menu">
              <p><strong>{currentReader.name}</strong><span>{equippedTitle}</span></p>
              <button type="button" onClick={() => openProfile("self")}>Voir mon profil</button>
              <button type="button">Se déconnecter</button>
            </div>
          )}</Fade>
        </div>}
      </header>

      <header className="mobile-header">
        <button className="wordmark wordmark-button" type="button" onClick={() => openView(initialProfileOwner ? "discover" : "journal")}>Chapter<span>.</span></button>
        {initialProfileOwner ? <button className="quiet-action" type="button" aria-expanded={searchOpen} onClick={() => setSearchOpen(true)}>Recherche</button> : <button className="account-button" type="button" aria-label={`Ouvrir le compte de ${currentReader.firstName}`} aria-expanded={accountOpen} aria-controls="mobile-account-sheet" onClick={() => setAccountOpen((open) => !open)}>{currentReader.initials}</button>}
      </header></>}

      <main id="top">
        {p1Public ? (
          currentView === "search" ? (
            <PublicSearch works={works} query={publicSearchQuery} onQueryChange={setPublicSearchQuery} onOpenWork={(id) => openPublicWork(id, "search")} />
          ) : currentView === "work" && selectedWork ? (
            <PublicWork work={selectedWork} works={works} backLabel={publicWorkOrigin === "search" ? "Retour à Recherche" : "Retour à Découvrir"} onBack={() => openPublicView(publicWorkOrigin)} onOpenWork={(id) => openPublicWork(id, publicWorkOrigin)} />
          ) : (
            <PublicDiscover works={works} onOpenWork={(id) => openPublicWork(id, "discover")} onOpenSearch={() => openPublicView("search")} />
          )
        ) : currentView === "discover" ? (
          <DiscoverView
            key={discoverInitialQuery}
            works={works}
            statuses={Object.fromEntries(works.map((work) => [work.id, entries[work.id]?.readingStatus]))}
            historyWorkIds={[...journalTraces.map((trace) => trace.workId), ...Object.keys(entries).filter((id) => entries[id].readingStatus === "En cours" || entries[id].readingStatus === "Lu" || entries[id].note.trim() || entries[id].review.trim() || entries[id].rating > 0)]}
            onBackToJournal={() => openView("journal")}
            onOpenWork={(id) => selectWork(id as WorkId)}
            onAddToRead={addDiscoveryToRead}
            onOpenProfile={(owner) => openProfile(owner)}
            onOpenList={(listId) => openPublicList(listId, "discover", "lina")}
            followingLina={followingActors.lina}
            onToggleFollow={() => toggleFollow("lina")}
            initialQuery={discoverInitialQuery}
          />
        ) : currentView === "profile" ? (
          <ProfileView
            owner={profileOwner}
            works={works}
            following={followingActors[actorIdForProfile(profileOwner)]}
            onToggleFollow={() => toggleFollow(actorIdForProfile(profileOwner))}
            onOpenWork={(id) => selectWork(id as WorkId)}
            onOpenHonors={() => openView("honors")}
            onOpenList={(listId) => openPublicList(listId, "profile", profileOwner)}
            photo={profilePhoto}
            onEditPhoto={() => setPhotoCropOpen(true)}
            onRemovePhoto={() => setProfilePhoto(null)}
            equippedTitle={equippedTitle}
            showcase={showcaseBadges}
            personalReviews={personalPublicReviews}
          />
        ) : currentView === "honors" ? (
          <HonorsView owner={profileOwner} equippedTitle={equippedTitle} onEquip={setEquippedTitle} showcase={showcaseBadges} onToggleShowcase={toggleShowcase} onBack={() => openView("profile")} />
        ) : currentView === "list" ? (
          <PublicListView owner={publicListOwner} listId={publicListId} works={works} following={followingActors[actorIdForProfile(publicListOwner)]} onToggleFollow={() => toggleFollow(actorIdForProfile(publicListOwner))} onOpenProfile={() => openProfile(publicListOwner)} onOpenWork={(id) => selectWork(id as WorkId)} onBack={() => publicListOrigin === "profile" ? openProfile(publicListOwner) : openView("discover")} backLabel={publicListOrigin === "discover" ? "Retour à Découvrir" : publicListOwner === "self" ? "Retour à mon profil" : `Retour au profil de ${prototypeActors[actorIdForProfile(publicListOwner)].firstName}`} />
        ) : currentView === "journal" ? (
          <section className="destination-page journal-page" aria-labelledby="personal-journal-title">
            <header className="destination-heading journal-heading">
              <p className="eyebrow">Votre espace personnel</p>
              <h1 id="personal-journal-title">Journal</h1>
              <p>Vos lectures du moment et les pensées qui construisent votre parcours.</p>
            </header>

            {currentReadings.length === 0 && journalTraces.length === 0 ? (
              <div className="journal-empty journal-empty-whole"><h2>Votre journal commence avec une œuvre</h2><button className="primary-action" type="button" onClick={() => setSearchOpen(true)}>Rechercher une œuvre</button></div>
            ) : <div className="journal-opening-grid">
              <section className="current-readings" aria-labelledby="current-readings-title">
                <div className="personal-section-heading">
                  <div>
                    <p className="eyebrow">En ce moment</p>
                    <h2 id="current-readings-title">Lectures en cours</h2>
                  </div>
                  {libraryCounts["En cours"] > 3 && <button className="text-action" type="button" onClick={() => { setLibraryFilter("En cours"); openView("library"); }}>Voir les {libraryCounts["En cours"]}</button>}
                </div>
                <div className={currentReadings.length ? "current-reading-rail" : undefined}>
                  {currentReadings.length > 0 ? currentReadings.map((work) => (
                    <article className="current-reading" key={work.id}>
                      <button className="current-reading-main" type="button" onClick={() => selectWork(work.id)}>
                        <WorkCover work={work} variant="journal" />
                        <span className="current-reading-copy">
                          <strong>{work.title}</strong>
                          <small>{work.author}</small>
                          <span>{entries[work.id]?.readingDate ? `Depuis le ${entries[work.id]?.readingDate}` : "Lecture en cours"}</span>
                        </span>
                      </button>
                      <button className="text-action current-note-action" type="button" onClick={() => openNoteForWork(work.id)}>
                        {entries[work.id]?.note ? "Modifier ma note" : "Ajouter une note"}
                      </button>
                    </article>
                  )) : (
                    <div className="journal-empty">
                      <p>Aucune lecture en cours pour le moment.</p>
                      <button className="text-action" type="button" onClick={() => { if (libraryCounts["À lire"]) { setLibraryFilter("À lire"); openView("library"); } else setSearchOpen(true); }}>{libraryCounts["À lire"] ? "Voir mes livres à lire" : "Rechercher une œuvre"}</button>
                    </div>
                  )}
                </div>
              </section>

              <section className="latest-trace" aria-labelledby="latest-trace-title">
                <div className="personal-section-heading">
                  <div>
                    <p className="eyebrow">Dernière trace</p>
                    <h2 id="latest-trace-title">À retenir</h2>
                  </div>
                </div>
                {journalTraces[0] ? renderJournalTrace(journalTraces[0], true) : <div className="journal-empty"><p>Votre prochaine note ou étape de lecture apparaîtra ici.</p></div>}
              </section>
            </div>}

            {visibleTimelineTraces.length > 0 && <section className="journal-timeline" aria-labelledby="journal-timeline-title">
              <div className="personal-section-heading timeline-heading">
                <div>
                  <p className="eyebrow">Chronologie personnelle</p>
                  <h2 id="journal-timeline-title">La suite du journal</h2>
                </div>
              </div>
              <div className="timeline-list">{visibleTimelineTraces.map((trace) => renderJournalTrace(trace))}</div>
              {!olderJournalVisible && journalTraces.length > 4 && (
                <button className="quiet-action older-traces-action" type="button" onClick={() => setOlderJournalVisible(true)}>Afficher les entrées précédentes</button>
              )}
            </section>}
          </section>
        ) : currentView === "library" ? (
          <section className="destination-page library-page" aria-labelledby="library-title">
            <header className="destination-heading">
              <p className="eyebrow">Votre collection</p>
              <h1 id="library-title">Bibliothèque</h1>
              <p>Toutes les œuvres que vous avez ajoutées, réunies dans une collection personnelle.</p>
            </header>

            {libraryCounts.Toutes > 0 ? (
              <>
                <div className="library-toolbar">
                  <div className="library-filters" aria-label="Filtrer la bibliothèque">
                    {(["Toutes", "À lire", "En cours", "Lu"] as LibraryFilter[]).map((filter) => (
                      <button className={libraryFilter === filter ? "active" : ""} type="button" key={filter} aria-pressed={libraryFilter === filter} onClick={() => setLibraryFilter(filter)}>
                        {filter} <span>{libraryCounts[filter]}</span>
                      </button>
                    ))}
                  </div>
                  <div className="library-tools">
                    <label className="library-search">
                      <span className="sr-only">Rechercher dans ma bibliothèque</span>
                      <input type="search" placeholder="Rechercher dans ma bibliothèque" value={libraryQuery} onChange={(event) => setLibraryQuery(event.target.value)} />
                    </label>
                    <LibrarySortControl value={librarySort} onChange={setLibrarySort} />
                  </div>
                </div>

                {statusOrigin === "library" && datePrompt && !libraryWorks.some((work) => work.id === statusWorkId) && (
                  <div className="library-date-relay">{renderDateInvitation("library", statusWorkId)}</div>
                )}

                {libraryWorks.length > 0 ? (
              <div className="library-grid" aria-live="polite">
              {libraryWorks.map((work) => (
                <article className="library-work" key={work.id}>
                  <button className="library-work-main" type="button" onClick={() => selectWork(work.id)}>
                    <WorkCover work={work} variant="library" />
                    <span className="library-work-copy"><strong>{work.title}</strong><small>{work.author}</small></span>
                  </button>
                  <div className="library-status-control">
                    <button className="library-status-trigger" type="button" aria-expanded={statusOrigin === "library" && statusWorkId === work.id && statusMenuOpen} aria-controls={`status-popover-library-${work.id}`} onClick={() => openStatusMenu("library", work.id)}>
                      <span>{entries[work.id]?.readingStatus}</span><span aria-hidden="true">⌄</span>
                    </button>
                    {renderStatusPopover("library", work.id)}
                  </div>
                  {renderDateInvitation("library", work.id)}
                </article>
              ))}
              </div>
                ) : (
                  <div className="library-empty" aria-live="polite">
                    <h2>{libraryQuery.trim() && libraryFilter !== "Toutes" ? `Aucun résultat pour « ${libraryQuery.trim()} » parmi les œuvres ${libraryFilter.toLocaleLowerCase("fr")}.` : libraryQuery.trim() ? `Aucun résultat pour « ${libraryQuery.trim()} ».` : `Aucune œuvre dans « ${libraryFilter} ».`}</h2>
                    <p>{libraryQuery.trim() && libraryFilter !== "Toutes" ? "La recherche et le filtre sont tous deux actifs." : libraryQuery.trim() ? "Essayez un autre titre ou auteur." : "Vos autres catégories restent inchangées."}</p>
                    <button className="text-action" type="button" onClick={() => libraryQuery.trim() ? setLibraryQuery("") : setLibraryFilter("Toutes")}>{libraryQuery.trim() ? "Effacer la recherche" : "Voir toutes les œuvres"}</button>
                  </div>
                )}
              </>
            ) : (
              <div className="library-empty library-empty-whole">
                <h2>Votre bibliothèque attend sa première œuvre</h2>
                <p>Ajoutez une œuvre pour commencer à organiser vos lectures.</p>
                <button className="primary-action" type="button" onClick={() => setSearchOpen(true)}>Rechercher une œuvre</button>
              </div>
            )}
          </section>
        ) : !selectedWork ? (
          <section className="destination-page"><h1>Œuvre indisponible</h1><p>Cette œuvre n’est pas disponible dans le catalogue.</p><button className="text-action" type="button" onClick={() => openView("journal")}>Revenir au Journal</button></section>
        ) : (
          <>
        <section className="book-opening" aria-labelledby="book-title">
          <div className="cover-stage">
            <WorkCover work={selectedWork} variant="book" />
          </div>

          <div className="book-identity">
            <p className="eyebrow">{selectedWork.meta}</p>
            <h1 id="book-title">{selectedWork.title}</h1>
            <p className="author">de {selectedWork.author}</p>
            <p className="book-lede">{selectedWork.lede}</p>
            <div className="opening-actions">
              <div className="status-control">
                <button className="primary-action" type="button" aria-expanded={statusOrigin === "opening" && statusMenuOpen} aria-controls={`status-popover-opening-${selectedWork.id}`} onClick={() => openStatusMenu("opening", selectedWork.id)}>
                  {entry.readingStatus ?? "Ajouter au journal"}
                </button>
                {renderStatusPopover("opening", selectedWork.id)}
              </div>
              <button className="quiet-action" type="button" onClick={openReview}>{entry.review ? "Modifier ma critique" : "Écrire une critique"}</button>
            </div>
            {renderDateInvitation("opening", selectedWork.id)}
            <div className="community-rating" aria-label={`Note moyenne de ${selectedWork.rating} sur 5`}>
              <span aria-hidden="true">★★★★☆</span>
              <strong>{selectedWork.rating}</strong>
              <span>{selectedWork.ratingCount}</span>
            </div>
          </div>
        </section>

        <nav className="section-nav" aria-label="Sections de l’œuvre">
          <a className={activeSection === "journal" ? "active" : ""} href="#journal">Mon journal</a>
          <a className={activeSection === "about" ? "active" : ""} href="#about">À propos</a>
          <a className={activeSection === "reviews" ? "active" : ""} href="#reviews">Critiques</a>
        </nav>

        <div className="content-column">
          <section id="journal" className="page-section journal-section" aria-labelledby="journal-title">
            <div className="section-heading">
              <p className="section-number">01</p>
              <div>
                <h2 id="journal-title">Mon journal</h2>
                <p>Votre relation avec cette œuvre, au même endroit.</p>
              </div>
            </div>

            <div className="journal-row">
              <div>
                <p className="row-label">Ma lecture</p>
                <p className="row-value">{entry.readingStatus ?? "Pas encore ajoutée"}</p>
                {displayReadingDate && <p className="privacy-note">Date enregistrée · {displayReadingDate}</p>}
              </div>
              <div className="status-control journal-status-control">
                <button className="text-action" type="button" aria-expanded={statusOrigin === "journal" && statusMenuOpen} aria-controls={`status-popover-journal-${selectedWork.id}`} onClick={() => openStatusMenu("journal", selectedWork.id)}>{entry.readingStatus ? "Modifier" : "Ajouter au journal"}</button>
                {renderStatusPopover("journal", selectedWork.id)}
              </div>
            </div>
            {renderDateInvitation("journal", selectedWork.id)}
            <div className="journal-row">
              <div>
                <p className="row-label">Ma note</p>
                <p className="row-value">{entry.note || "Aucune pensée consignée"}</p>
                <p className="privacy-note">Privée · visible uniquement par vous</p>
              </div>
              <button className="text-action" type="button" onClick={openNote}>{entry.note ? "Modifier" : "Ajouter une note"}</button>
            </div>
            <div className="journal-row">
              <div>
                <p className="row-label">Ma critique</p>
                <p className="row-value">{entry.review || "Vous n’avez pas encore publié de critique."}</p>
                {entry.review && entry.rating > 0 && <p className="privacy-note" aria-label={`${entry.rating} étoiles sur 5`}>{"★".repeat(entry.rating)}{"☆".repeat(5 - entry.rating)}</p>}
              </div>
              <button className="text-action" type="button" onClick={openReview}>{entry.review ? "Modifier" : "Écrire une critique"}</button>
            </div>
          </section>

          <section id="about" className="page-section" aria-labelledby="about-title">
            <div className="section-heading">
              <p className="section-number">02</p>
              <div>
                <h2 id="about-title">À propos</h2>
                <p>Le récit et quelques repères essentiels.</p>
              </div>
            </div>
            <div className="about-layout">
              <div className="synopsis prose">{selectedWork.synopsis.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <dl className="work-facts">
                <div><dt>Première publication</dt><dd>{selectedWork.year}</dd></div>
                <div><dt>Genre</dt><dd>{selectedWork.genre}</dd></div>
                <div><dt>Langue originale</dt><dd>{selectedWork.language}</dd></div>
              </dl>
            </div>
          </section>

          <section id="reviews" className="page-section reviews-section" aria-labelledby="reviews-title">
            <div className="section-heading">
              <p className="section-number">03</p>
              <div>
                <h2 id="reviews-title">Critiques</h2>
                <p>Ce que les lecteurs retiennent de cette œuvre.</p>
              </div>
            </div>
            <div className="reviews-list"><SocialReviews workId={selectedWork.id} personalReview={entry.review} personalRating={entry.rating} followedActorIds={(Object.keys(followingActors) as PrototypeActorId[]).filter((actorId) => followingActors[actorId])} onOpenProfile={openActorProfile} onWriteReview={openReview} /></div>
          </section>
        </div>
          </>
        )}
      </main>

      {(statusMenuOpen || datePrompt) && (
        <button className="status-backdrop" type="button" aria-label="Fermer le choix de statut" onClick={() => { setStatusMenuOpen(false); setDatePrompt(null); setRemoveConfirmWorkId(null); }} />
      )}

      {p1Public ? (
        <nav className="p1-public-mobile-nav" aria-label="Navigation principale mobile">
          <button className={currentView === "discover" || (currentView === "work" && publicWorkOrigin === "discover") ? "active" : ""} type="button" aria-current={currentView === "discover" ? "page" : undefined} onClick={() => openPublicView("discover")}>Découvrir</button>
          <button className={currentView === "search" || (currentView === "work" && publicWorkOrigin === "search") ? "active" : ""} type="button" aria-current={currentView === "search" ? "page" : undefined} onClick={() => openPublicView("search")}>Recherche</button>
        </nav>
      ) : <nav className="mobile-nav" aria-label="Navigation principale mobile">
        {!initialProfileOwner && <button className={currentView === "journal" ? "active" : ""} type="button" aria-current={currentView === "journal" ? "page" : undefined} onClick={() => openView("journal")}><span aria-hidden="true">◫</span>Journal</button>}
        {!initialProfileOwner && <button className={currentView === "library" ? "active" : ""} type="button" aria-current={currentView === "library" ? "page" : undefined} onClick={() => openView("library")}><span aria-hidden="true">▥</span>Bibliothèque</button>}
        <button className={currentView === "discover" ? "active" : ""} type="button" aria-current={currentView === "discover" ? "page" : undefined} onClick={() => { setDiscoverInitialQuery(""); openView("discover"); }}><span aria-hidden="true">⌕</span>Découvrir</button>
        <button type="button" aria-expanded={searchOpen} onClick={() => setSearchOpen(true)}><span aria-hidden="true">⌕</span>Recherche</button>
      </nav>}

      {!initialProfileOwner && <Fade show={accountOpen} kind="modal">{accountOpen && (
        <div className="mobile-account-overlay">
          <button className="overlay-backdrop" type="button" aria-label="Fermer le menu du compte" onClick={() => setAccountOpen(false)} />
          <section ref={mobileAccountRef} className="mobile-account-sheet" id="mobile-account-sheet" aria-label={`Compte de ${currentReader.firstName}`}>
            <div className="modal-heading">
              <div><p className="eyebrow">Compte</p><h2>{currentReader.name}</h2><span className="account-title">{equippedTitle}</span></div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={() => setAccountOpen(false)}>×</button>
            </div>
            <button type="button" onClick={() => openProfile("self")}>Voir mon profil</button>
            <button type="button">Se déconnecter</button>
          </section>
        </div>
      )}</Fade>}

      {!p1Public && <Fade show={searchOpen} kind="modal">{searchOpen && (
        <Modal className="search-overlay" labelledBy="search-title" initialFocus='input[type="search"]' onRequestClose={() => setSearchOpen(false)}>
          <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer la recherche" onClick={() => setSearchOpen(false)} />
          <section className="search-panel">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Recherche</p>
                <h2 id="search-title">Trouver une œuvre</h2>
              </div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={() => setSearchOpen(false)}>×</button>
            </div>
            <label>
              <span className="sr-only">Titre ou auteur</span>
              <input type="search" placeholder="Titre ou auteur" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            </label>
            <div className="search-results">
              {filteredWorks.map((work) => (
                <button type="button" key={work.id} onClick={() => selectWork(work.id)}><strong>{work.title}</strong><span>{work.author}</span></button>
              ))}
              {filteredWorks.length === 0 && <p className="search-empty">Aucune œuvre ne correspond à cette recherche.</p>}
            </div>
            <button className="primary-action search-discover-action" type="button" onClick={() => openDiscoverWithQuery(searchQuery)}>{searchQuery.trim() ? "Voir les résultats dans Découvrir" : "Ouvrir Découvrir"}</button>
          </section>
        </Modal>
      )}</Fade>}

      <Fade show={noteOpen} kind="modal">{noteOpen && (
        <Modal labelledBy={noteCloseConfirm ? "note-confirm-title" : "note-title"} describedBy={noteCloseConfirm ? "note-confirm-description" : undefined} alert={noteCloseConfirm} initialFocus={noteCloseConfirm ? "[data-safe-return]" : "textarea"} onRequestClose={() => noteCloseConfirm ? setNoteCloseConfirm(false) : requestNoteClose()}>
          <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer la note" onClick={() => noteCloseConfirm ? setNoteCloseConfirm(false) : requestNoteClose()} />
          <section className={`editor-modal private-editor ${noteCloseConfirm ? "editor-protected" : ""}`}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Privée · visible uniquement par vous</p>
                <h2 id="note-title">Ma note</h2>
              </div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={() => noteCloseConfirm ? setNoteCloseConfirm(false) : requestNoteClose()}>×</button>
            </div>
            <label className="editor-field">
              <span>Ce que vous souhaitez retenir</span>
              <textarea readOnly={noteCloseConfirm} rows={5} value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Une pensée, une image, une phrase à garder…" />
            </label>
            {noteCloseConfirm ? (
              <div className="editor-confirmation">
                <div><strong id="note-confirm-title">Quitter sans enregistrer ?</strong><p id="note-confirm-description">Les modifications apportées à votre note seront perdues.</p></div>
                <div className="protection-actions">
                  <button data-safe-return className="primary-action" type="button" onClick={() => setNoteCloseConfirm(false)}>Revenir à la note</button>
                  <button className="destructive-action" type="button" onClick={() => { setNoteCloseConfirm(false); setNoteOpen(false); setNoteDraft(entry.note); }}>Ignorer les modifications</button>
                </div>
              </div>
            ) : (
              <div className="modal-actions">
                <button className="quiet-action" type="button" onClick={requestNoteClose}>Annuler</button>
                <button className="primary-action" type="button" onClick={saveNote}>Enregistrer</button>
              </div>
            )}
          </section>
        </Modal>
      )}</Fade>

      <Fade show={reviewOpen} kind="modal">{reviewOpen && (
        <Modal labelledBy={reviewCloseConfirm ? "review-confirm-title" : "review-title"} describedBy={reviewCloseConfirm ? "review-confirm-description" : undefined} alert={reviewCloseConfirm} initialFocus={reviewCloseConfirm ? "[data-safe-return]" : "textarea"} onRequestClose={() => reviewCloseConfirm ? setReviewCloseConfirm(false) : requestReviewClose()}>
          <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer la critique" onClick={() => reviewCloseConfirm ? setReviewCloseConfirm(false) : requestReviewClose()} />
          <section className={`editor-modal review-editor ${reviewCloseConfirm ? "editor-protected" : ""}`}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Publique</p>
                <h2 id="review-title">{entry.review ? "Modifier ma critique" : "Écrire une critique"}</h2>
              </div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={() => reviewCloseConfirm ? setReviewCloseConfirm(false) : requestReviewClose()}>×</button>
            </div>
            <label className="editor-field">
              <span>Votre critique</span>
              <textarea readOnly={reviewCloseConfirm} rows={10} maxLength={3000} value={reviewDraft} onChange={(event) => setReviewDraft(event.target.value)} placeholder="Partagez ce que cette œuvre vous a laissé…" />
              <small>{reviewDraft.length.toLocaleString("fr-FR")} / 3 000 caractères</small>
            </label>
            <fieldset className="rating-field">
              <legend>Votre évaluation <span>— facultative</span></legend>
              <div className="star-row" role="radiogroup" aria-label="Évaluation sur cinq étoiles" onMouseLeave={() => setRatingPreview(null)}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    role="radio"
                    ref={(element) => { ratingRefs.current[value - 1] = element; }}
                    tabIndex={ratingDraft === value || (!ratingDraft && value === 1) ? 0 : -1}
                    aria-checked={ratingDraft === value}
                    aria-label={`${value} étoile${value > 1 ? "s" : ""}`}
                    key={value}
                    disabled={reviewCloseConfirm}
                    onMouseEnter={() => setRatingPreview(value)}
                    onFocus={() => setRatingPreview(value)}
                    onBlur={() => setRatingPreview(null)}
                    onClick={() => setRatingDraft(value)}
                    onKeyDown={(event) => {
                      if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"].includes(event.key)) event.preventDefault();
                      let next = value;
                      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = value === 1 ? 5 : value - 1;
                      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = value === 5 ? 1 : value + 1;
                      if (event.key === "Home") next = 1;
                      if (event.key === "End") next = 5;
                      if (next !== value) {
                        setRatingDraft(next);
                        ratingRefs.current[next - 1]?.focus();
                      }
                    }}
                  >
                    {value <= (ratingPreview ?? ratingDraft) ? "★" : "☆"}
                  </button>
                ))}
                <span>{ratingPreview ? `${ratingPreview} sur 5` : ratingDraft ? `${ratingDraft} sur 5` : "Aucune évaluation"}</span>
                {ratingDraft > 0 && !reviewCloseConfirm && <button className="rating-remove" type="button" onClick={() => { setRatingDraft(0); setRatingPreview(null); }}>Retirer</button>}
              </div>
            </fieldset>
            {reviewCloseConfirm ? (
              <div className="editor-confirmation">
                <div><strong id="review-confirm-title">Quitter sans enregistrer ?</strong><p id="review-confirm-description">Les modifications apportées à votre critique seront perdues.</p></div>
                <div className="protection-actions">
                  <button data-safe-return className="primary-action" type="button" onClick={() => setReviewCloseConfirm(false)}>Revenir à la critique</button>
                  <button className="destructive-action" type="button" onClick={() => { setReviewCloseConfirm(false); setReviewOpen(false); setReviewDraft(entry.review); setRatingDraft(entry.rating); }}>Ignorer les modifications</button>
                </div>
              </div>
            ) : (
              <div className="modal-actions">
                <button className="quiet-action" type="button" onClick={requestReviewClose}>Annuler</button>
                <button className="primary-action" type="button" disabled={!reviewDraft.trim()} onClick={publishReview}>{entry.review ? "Enregistrer les modifications" : "Publier la critique"}</button>
              </div>
            )}
          </section>
        </Modal>
      )}</Fade>

      <Fade show={photoCropOpen} kind="modal">{photoCropOpen && <PhotoCropper currentPhoto={profilePhoto} onClose={() => setPhotoCropOpen(false)} onSave={setProfilePhoto} />}</Fade>

      <Fade show={Boolean(feedback)} kind="feedback" changeKey={feedback}>{feedback && (
        <div className="temporary-feedback" role="status" tabIndex={0} onMouseEnter={() => setFeedbackPaused(true)} onMouseLeave={() => setFeedbackPaused(false)} onFocus={() => setFeedbackPaused(true)} onBlur={() => setFeedbackPaused(false)}>
          <span><strong>{feedback.label}</strong><small>{feedback.detail}</small></span>
          <span className="feedback-separator" aria-hidden="true" />
          <button type="button" onClick={undoFeedback}>Annuler</button>
          <button type="button" aria-label="Fermer" onClick={() => setFeedback(null)}>×</button>
        </div>
      )}</Fade>
    </div>
  );
}
