"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BadgeId, DiscoverView, HonorsView, PhotoCropper, ProfilePhoto, ProfileView, PublicListId, PublicListView, SocialReviews } from "./phase10";

type ReadingStatus = "À lire" | "En cours" | "Lu";
type DatePrompt = "start" | "finish" | null;
type View = "work" | "journal" | "library" | "discover" | "profile" | "honors" | "list";
type LibraryFilter = "Toutes" | ReadingStatus;
type LibrarySort = "activity" | "title" | "author";
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

const emptyEntry: PersonalEntry = { readingStatus: null, readingDate: "", note: "", review: "", rating: 0 };
const UNDO_DURATION_MS = 5000;

const works = [
  {
    id: "cartographies",
    title: "Les Cartographies du vent",
    author: "Camille Maret",
    meta: "Roman · 2021",
    year: "2021",
    genre: "Roman contemporain",
    language: "Français",
    rating: "4,3",
    ratingCount: "1 248 évaluations",
    lede: "Une cartographe revient dans l’archipel de son enfance et découvre que les lieux oubliés continuent de déplacer ceux qui les ont quittés.",
    synopsis: [
      "Après douze années loin de Néréis, Ana Vales retourne dans l’archipel pour vider la maison de sa mère. Les cartes qu’elle y retrouve ne représentent aucun territoire connu : elles semblent plutôt suivre les déplacements de la mémoire, les silences d’une famille et les routes que le vent efface chaque nuit.",
      "À mesure qu’elle reprend son ancien métier, Ana comprend que cartographier un lieu consiste parfois moins à en fixer les contours qu’à accepter ce qui nous échappe.",
    ],
    cover: true,
    coverTone: "slate",
  },
  {
    id: "rivage",
    title: "Le Rivage des heures",
    author: "Nora Sorel",
    meta: "Roman · 2019",
    year: "2019",
    genre: "Fiction littéraire",
    language: "Français",
    rating: "4,1",
    ratingCount: "862 évaluations",
    lede: "Sur une côte où les marées dérèglent les horloges, une restauratrice tente de reconstituer les derniers jours d’un village disparu.",
    synopsis: [
      "Élise arrive à Keravel pour restaurer les cadrans d’un ancien observatoire. Chaque mécanisme porte pourtant une heure différente, comme si le village avait refusé de vivre selon un temps commun.",
      "Entre archives incomplètes et récits contradictoires, elle découvre une communauté qui a choisi de mesurer le passé autrement que par les dates.",
    ],
    cover: false,
    coverTone: "brick",
  },
  {
    id: "atlas",
    title: "Atlas des nuits calmes",
    author: "Yanis Delcourt",
    meta: "Récit · 2024",
    year: "2024",
    genre: "Récit contemporain",
    language: "Français",
    rating: "4,5",
    ratingCount: "534 évaluations",
    lede: "Un veilleur de nuit inventorie les lumières encore allumées et compose, sans le savoir, le portrait intime de toute une ville.",
    synopsis: [
      "Chaque nuit, Sami parcourt les rues désertes et note les fenêtres éclairées dans un carnet. Il imagine les vies derrière ces halos, jusqu’au soir où l’une de ses descriptions lui revient sous la forme d’une lettre.",
      "Son inventaire devient alors un atlas sensible des solitudes, des attentes et des gestes minuscules qui empêchent la ville de dormir tout à fait.",
    ],
    cover: false,
    coverTone: "petrol",
  },
  {
    id: "lucioles",
    title: "La Saison des lucioles",
    author: "Élise Varenne",
    meta: "Roman · 2018",
    year: "2018",
    genre: "Roman initiatique",
    language: "Français",
    rating: "4,0",
    ratingCount: "719 évaluations",
    lede: "Dans une vallée où les lucioles ont disparu, deux sœurs rouvrent l’observatoire abandonné de leur père.",
    synopsis: [
      "Mila revient à Valcroix au début d’un été trop silencieux. Sa sœur a conservé les carnets de leur père, remplis de relevés sur les lumières qui animaient autrefois les prés.",
      "Leur enquête transforme peu à peu un deuil familial en exploration sensible de ce qui persiste lorsque les signes familiers s’éteignent.",
    ],
    cover: false,
    coverTone: "sage",
  },
  {
    id: "miroirs",
    title: "La Maison des miroirs lents",
    author: "Samuel Ardent",
    meta: "Roman · 2020",
    year: "2020",
    genre: "Fiction littéraire",
    language: "Français",
    rating: "4,2",
    ratingCount: "947 évaluations",
    lede: "Un restaurateur découvre que les miroirs d’une demeure normande ne renvoient jamais tout à fait le présent.",
    synopsis: [
      "Chargé de restaurer une maison promise à la vente, Jonas remarque que certaines pièces semblent conserver les gestes de leurs anciens habitants.",
      "Au fil des reflets, l’architecture devient une mémoire instable où chaque réparation révèle une absence nouvelle.",
    ],
    cover: false,
    coverTone: "plum",
  },
  {
    id: "sel",
    title: "Un Peu de sel dans la brume",
    author: "Diane Kermor",
    meta: "Récit · 2023",
    year: "2023",
    genre: "Récit contemporain",
    language: "Français",
    rating: "3,9",
    ratingCount: "381 évaluations",
    lede: "Une cuisinière embarque sur le dernier ferry d’une ligne condamnée et recueille les recettes de ses passagers.",
    synopsis: [
      "Pendant les trois dernières semaines de la traversée, Maud cuisine avec ce que les voyageurs lui confient : une épice, un souvenir, parfois seulement un nom.",
      "Son carnet compose le portrait d’un passage maritime autant que celui des vies qui l’ont emprunté.",
    ],
    cover: false,
    coverTone: "ochre",
  },
] as const;

type WorkId = (typeof works)[number]["id"];
type Work = (typeof works)[number];

const coverTitleTier = (title: string) => {
  if (title.length <= 18) return "cover-title-short";
  if (title.length <= 31) return "cover-title-medium";
  return "cover-title-long";
};

function WorkCover({ work, variant }: { work: Work; variant: "book" | "library" | "journal" | "mini" }) {
  const className = `${variant === "book" ? "book-cover" : `${variant}-cover`} ${work.cover ? "cover-image" : `typographic-cover ${work.coverTone}`}`;
  const sizes = variant === "book" ? "(max-width: 899px) 160px, 320px" : variant === "library" ? "(max-width: 899px) 45vw, 240px" : "96px";

  return (
    <span className={className} aria-label={`Couverture de ${work.title}, de ${work.author}`}>
      {work.cover ? (
        <Image src="/chapter-cover-art.png" alt="" fill priority={variant === "book"} sizes={sizes} />
      ) : variant === "mini" ? (
        <strong aria-hidden="true">{work.title.slice(0, 1)}</strong>
      ) : (
        <span className="cover-copy" aria-hidden="true">
          {variant !== "library" && <span className="cover-mark">CHAPTER</span>}
          <strong className={coverTitleTier(work.title)}>{work.title}</strong>
          <small>{work.author}</small>
        </span>
      )}
    </span>
  );
}

type JournalTrace = {
  id: string;
  workId: WorkId;
  date: string;
  kind: "Note privée" | "Critique publique" | "Lecture commencée" | "Lecture terminée";
  text?: string;
  action?: "note" | "review";
};

const journalTraces: JournalTrace[] = [
  {
    id: "trace-note-cartographies",
    workId: "cartographies",
    date: "22 août 2026",
    kind: "Note privée",
    text: "La carte semble moins représenter un territoire que la manière dont Ana accepte enfin de ne plus pouvoir le fixer. Cette idée revient dans chaque passage consacré au vent et donne au roman une douceur inattendue.",
    action: "note",
  },
  {
    id: "trace-finished-lucioles",
    workId: "lucioles",
    date: "19 août 2026",
    kind: "Lecture terminée",
  },
  {
    id: "trace-review-miroirs",
    workId: "miroirs",
    date: "17 août 2026",
    kind: "Critique publique",
    text: "Une maison décrite comme un organisme discret, avec des reflets qui ne servent jamais de simple artifice. Le dernier tiers resserre admirablement tout ce que le roman avait laissé en suspens.",
    action: "review",
  },
  {
    id: "trace-start-rivage",
    workId: "rivage",
    date: "12 août 2026",
    kind: "Lecture commencée",
  },
  {
    id: "trace-note-atlas",
    workId: "atlas",
    date: "8 août 2026",
    kind: "Note privée",
    text: "Garder l’image des fenêtres éclairées comme une constellation qui n’existe que depuis la rue.",
    action: "note",
  },
  {
    id: "trace-finished-miroirs",
    workId: "miroirs",
    date: "2 août 2026",
    kind: "Lecture terminée",
  },
];

const activityOrder: Record<WorkId, number> = {
  cartographies: 6,
  rivage: 5,
  atlas: 4,
  lucioles: 3,
  miroirs: 2,
  sel: 1,
};

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("work");
  const [selectedWorkId, setSelectedWorkId] = useState<WorkId>(works[0].id);
  const [entries, setEntries] = useState<Record<string, PersonalEntry>>({
    cartographies: {
      ...emptyEntry,
      readingStatus: "En cours",
      readingDate: "4 août 2026",
      note: "La carte semble moins représenter un territoire que la manière dont Ana accepte enfin de ne plus pouvoir le fixer. Cette idée revient dans chaque passage consacré au vent et donne au roman une douceur inattendue.",
    },
    rivage: { ...emptyEntry, readingStatus: "En cours", readingDate: "12 août 2026", note: "Observer comment les différentes heures deviennent une manière de raconter les désaccords du village." },
    atlas: { ...emptyEntry, readingStatus: "En cours", readingDate: "8 août 2026", note: "Garder l’image des fenêtres éclairées comme une constellation qui n’existe que depuis la rue." },
    lucioles: { ...emptyEntry, readingStatus: "Lu", readingDate: "19 août 2026", rating: 4 },
    miroirs: {
      ...emptyEntry,
      readingStatus: "Lu",
      readingDate: "2 août 2026",
      review: "Une maison décrite comme un organisme discret, avec des reflets qui ne servent jamais de simple artifice. Le dernier tiers resserre admirablement tout ce que le roman avait laissé en suspens.",
      rating: 4,
    },
    sel: { ...emptyEntry, readingStatus: "À lire" },
  });
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [statusOrigin, setStatusOrigin] = useState<StatusOrigin>("opening");
  const [statusWorkId, setStatusWorkId] = useState<WorkId>(works[0].id);
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
  const [profileOwner, setProfileOwner] = useState<"self" | "lina">("self");
  const [followingLina, setFollowingLina] = useState(false);
  const [equippedTitle, setEquippedTitle] = useState("Esprit nomade");
  const [showcaseBadges, setShowcaseBadges] = useState<BadgeId[]>(["reading2", "exploration2", "expression2"]);
  const [profilePhoto, setProfilePhoto] = useState<ProfilePhoto | null>(null);
  const [photoCropOpen, setPhotoCropOpen] = useState(false);
  const [discoverInitialQuery, setDiscoverInitialQuery] = useState("");
  const [publicListId, setPublicListId] = useState<PublicListId>("places");
  const [publicListOrigin, setPublicListOrigin] = useState<PublicListOrigin>("discover");
  const accountControlRef = useRef<HTMLDivElement>(null);
  const mobileAccountRef = useRef<HTMLElement>(null);
  const previousPublication = useRef({ workId: works[0].id as WorkId, review: "", rating: 0 });
  const latestPublication = useRef({ workId: works[0].id as WorkId, review: "", rating: 0 });
  const removedEntry = useRef<{ workId: WorkId; entry: PersonalEntry } | null>(null);
  const discoverySavedEntry = useRef<{ workId: WorkId; entry: PersonalEntry } | null>(null);
  const selectedWork = works.find((work) => work.id === selectedWorkId) ?? works[0];
  const entry = entries[selectedWork.id] ?? emptyEntry;
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
  const updateEntry = (changes: Partial<PersonalEntry>) => updateEntryFor(selectedWork.id, changes);

  const openView = (view: View) => {
    setCurrentView(view);
    setAccountOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProfile = (owner: "self" | "lina") => {
    setProfileOwner(owner);
    openView("profile");
  };

  const openPublicList = (listId: PublicListId, origin: PublicListOrigin) => {
    setPublicListId(listId);
    setPublicListOrigin(origin);
    openView("list");
  };

  const openDiscoverWithQuery = (query: string) => {
    setDiscoverInitialQuery(query.trim());
    setSearchOpen(false);
    setCurrentView("discover");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    const hasOverlay = noteOpen || reviewOpen || searchOpen || photoCropOpen || accountOpen || noteCloseConfirm || reviewCloseConfirm;
    document.body.style.overflow = hasOverlay ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [noteOpen, reviewOpen, searchOpen, photoCropOpen, accountOpen, noteCloseConfirm, reviewCloseConfirm]);

  useEffect(() => {
    const closeAccountOutside = (event: PointerEvent) => {
      if (!accountOpen || accountControlRef.current?.contains(event.target as Node) || mobileAccountRef.current?.contains(event.target as Node)) return;
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
      if (event.key !== "Escape") return;
      if (noteCloseConfirm) return setNoteCloseConfirm(false);
      if (reviewCloseConfirm) return setReviewCloseConfirm(false);
      if (noteOpen) {
        if (noteDraft !== entry.note) setNoteCloseConfirm(true);
        else setNoteOpen(false);
        return;
      }
      if (reviewOpen) {
        if (reviewDraft !== entry.review || ratingDraft !== entry.rating) setReviewCloseConfirm(true);
        else setReviewOpen(false);
        return;
      }
      if (searchOpen) return setSearchOpen(false);
      if (photoCropOpen) return setPhotoCropOpen(false);
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
    previousPublication.current = { workId: selectedWork.id, review: entry.review, rating: entry.rating };
    latestPublication.current = { workId: selectedWork.id, review: cleanReview, rating: ratingDraft };
    const publicationLabel = entry.review ? "Critique mise à jour" : "Critique publiée";
    updateEntry({ review: cleanReview, rating: ratingDraft });
    setReviewOpen(false);
    setReviewCloseConfirm(false);
    setFeedback({ kind: "publication", label: publicationLabel, detail: "Elle est maintenant visible publiquement." });
  };
  const undoFeedback = () => {
    if (feedback?.kind === "publication") {
      const previous = previousPublication.current;
      setSelectedWorkId(previous.workId);
      updateEntryFor(previous.workId, { review: previous.review, rating: previous.rating });
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
    if (!statusMenuOpen || statusOrigin !== origin || statusWorkId !== workId) return null;
    const targetEntry = entries[workId] ?? emptyEntry;

    return (
      <div className="status-popover" role="dialog" aria-label="Choisir un statut de lecture">
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
      </div>
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
    const work = works.find((candidate) => candidate.id === trace.workId) ?? works[0];
    const expanded = expandedJournalTraces.includes(trace.id);
    const expandable = Boolean(trace.text && trace.text.length > 145);
    const visibleText = trace.text && !expanded && expandable ? `${trace.text.slice(0, 145).trim()}…` : trace.text;

    return (
      <article className={`personal-trace ${featured ? "featured-trace" : ""}`} key={trace.id}>
        <time>{trace.date}</time>
        <div className="personal-trace-body">
          <button className="trace-work-link" type="button" onClick={() => selectWork(work.id)}>
            <WorkCover work={work} variant="mini" />
            <span><strong>{work.title}</strong><small>{work.author}</small></span>
          </button>
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
            {trace.action && (
              <button className="text-action" type="button" onClick={() => trace.action === "note" ? openNoteForWork(trace.workId) : openReviewForWork(trace.workId)}>
                Modifier
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="site-shell">
      <header className="desktop-header">
        <button className="wordmark wordmark-button" type="button" aria-label="Chapter, ouvrir le journal" onClick={() => openView("journal")}>Chapter<span>.</span></button>
        <nav aria-label="Navigation principale">
          <button className={currentView === "journal" ? "active" : ""} type="button" onClick={() => openView("journal")}>Journal</button>
          <button className={currentView === "discover" ? "active" : ""} type="button" onClick={() => { setDiscoverInitialQuery(""); openView("discover"); }}>Découvrir</button>
          <button className={currentView === "library" ? "active" : ""} type="button" onClick={() => openView("library")}>Bibliothèque</button>
        </nav>
        <label className="header-search">
          <span className="sr-only">Rechercher un livre ou un auteur</span>
          <input
            type="search"
            placeholder="Rechercher un livre ou un auteur"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); openDiscoverWithQuery(searchQuery); } }}
          />
        </label>
        <div className="account-control" ref={accountControlRef}>
          <button className="account-button" type="button" aria-label="Ouvrir le compte de Maël" aria-expanded={accountOpen} onClick={() => setAccountOpen((open) => !open)}>MD</button>
          {accountOpen && (
            <div className="account-menu">
              <p><strong>Maël Depréville</strong><span>{equippedTitle}</span></p>
              <button type="button" onClick={() => openProfile("self")}>Voir mon profil</button>
              <button type="button">Se déconnecter</button>
            </div>
          )}
        </div>
      </header>

      <header className="mobile-header">
        <button className="wordmark wordmark-button" type="button" onClick={() => openView("journal")}>Chapter<span>.</span></button>
        <button className="account-button" type="button" aria-label="Ouvrir le compte de Maël" aria-expanded={accountOpen} onClick={() => setAccountOpen((open) => !open)}>MD</button>
      </header>

      <main id="top">
        {currentView === "discover" ? (
          <DiscoverView
            key={discoverInitialQuery}
            works={works}
            statuses={Object.fromEntries(works.map((work) => [work.id, entries[work.id]?.readingStatus]))}
            onOpenWork={(id) => selectWork(id as WorkId)}
            onAddToRead={addDiscoveryToRead}
            onOpenProfile={openProfile}
            onOpenList={() => openPublicList("places", "discover")}
            followingLina={followingLina}
            onToggleFollow={() => setFollowingLina((value) => !value)}
            initialQuery={discoverInitialQuery}
          />
        ) : currentView === "profile" ? (
          <ProfileView
            owner={profileOwner}
            works={works}
            following={followingLina}
            onToggleFollow={() => setFollowingLina((value) => !value)}
            onOpenWork={(id) => selectWork(id as WorkId)}
            onOpenHonors={() => openView("honors")}
            onOpenList={(listId) => openPublicList(listId, "profile")}
            photo={profilePhoto}
            onEditPhoto={() => setPhotoCropOpen(true)}
            onRemovePhoto={() => setProfilePhoto(null)}
            equippedTitle={equippedTitle}
            showcase={showcaseBadges}
          />
        ) : currentView === "honors" ? (
          <HonorsView owner={profileOwner} equippedTitle={equippedTitle} onEquip={setEquippedTitle} showcase={showcaseBadges} onToggleShowcase={toggleShowcase} onBack={() => openView("profile")} />
        ) : currentView === "list" ? (
          <PublicListView listId={publicListId} works={works} following={followingLina} onToggleFollow={() => setFollowingLina((value) => !value)} onOpenProfile={() => openProfile("lina")} onOpenWork={(id) => selectWork(id as WorkId)} onBack={() => publicListOrigin === "profile" ? openProfile("lina") : openView("discover")} backLabel={publicListOrigin === "profile" ? "Retour au profil de Lina" : "Retour à Découvrir"} />
        ) : currentView === "journal" ? (
          <section className="destination-page journal-page" aria-labelledby="personal-journal-title">
            <header className="destination-heading journal-heading">
              <p className="eyebrow">Votre espace personnel</p>
              <h1 id="personal-journal-title">Journal</h1>
              <p>Vos lectures du moment et les pensées qui construisent votre parcours.</p>
            </header>

            <div className="journal-opening-grid">
              <section className="current-readings" aria-labelledby="current-readings-title">
                <div className="personal-section-heading">
                  <div>
                    <p className="eyebrow">En ce moment</p>
                    <h2 id="current-readings-title">Lectures en cours</h2>
                  </div>
                  {libraryCounts["En cours"] > 3 && <button className="text-action" type="button" onClick={() => { setLibraryFilter("En cours"); openView("library"); }}>Voir les {libraryCounts["En cours"]}</button>}
                </div>
                <div className="current-reading-rail">
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
                      <button className="text-action" type="button" onClick={() => { setLibraryFilter("À lire"); openView("library"); }}>Choisir ma prochaine lecture</button>
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
                {renderJournalTrace(journalTraces[0], true)}
              </section>
            </div>

            <section className="journal-timeline" aria-labelledby="journal-timeline-title">
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
            </section>
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
                    <label className="library-sort">
                      <span>Trier par</span>
                      <select value={librarySort} onChange={(event) => setLibrarySort(event.target.value as LibrarySort)}>
                        <option value="activity">Activité récente</option>
                        <option value="title">Titre</option>
                        <option value="author">Auteur</option>
                      </select>
                    </label>
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
                    <button className="library-status-trigger" type="button" aria-expanded={statusOrigin === "library" && statusWorkId === work.id && statusMenuOpen} onClick={() => openStatusMenu("library", work.id)}>
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
                <button className="primary-action" type="button" aria-expanded={statusOrigin === "opening" && statusMenuOpen} onClick={() => openStatusMenu("opening", selectedWork.id)}>
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
                <button className="text-action" type="button" aria-expanded={statusOrigin === "journal" && statusMenuOpen} onClick={() => openStatusMenu("journal", selectedWork.id)}>{entry.readingStatus ? "Modifier" : "Ajouter au journal"}</button>
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
            <div className="reviews-list"><SocialReviews workId={selectedWork.id} personalReview={entry.review} personalRating={entry.rating} onOpenProfile={() => openProfile("lina")} onWriteReview={openReview} /></div>
          </section>
        </div>
          </>
        )}
      </main>

      {(statusMenuOpen || datePrompt) && (
        <button className="status-backdrop" type="button" aria-label="Fermer le choix de statut" onClick={() => { setStatusMenuOpen(false); setDatePrompt(null); setRemoveConfirmWorkId(null); }} />
      )}

      <nav className="mobile-nav" aria-label="Navigation principale mobile">
        <button className={currentView === "journal" ? "active" : ""} type="button" onClick={() => openView("journal")}><span aria-hidden="true">◫</span>Journal</button>
        <button className={currentView === "discover" ? "active" : ""} type="button" onClick={() => { setDiscoverInitialQuery(""); openView("discover"); }}><span aria-hidden="true">⌕</span>Découvrir</button>
        <button className={currentView === "library" ? "active" : ""} type="button" onClick={() => openView("library")}><span aria-hidden="true">▥</span>Bibliothèque</button>
      </nav>

      {accountOpen && (
        <div className="mobile-account-overlay">
          <button className="overlay-backdrop" type="button" aria-label="Fermer le menu du compte" onClick={() => setAccountOpen(false)} />
          <section ref={mobileAccountRef} className="mobile-account-sheet" aria-label="Compte de Maël">
            <div className="modal-heading">
              <div><p className="eyebrow">Compte</p><h2>Maël Depréville</h2><span className="account-title">{equippedTitle}</span></div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={() => setAccountOpen(false)}>×</button>
            </div>
            <button type="button" onClick={() => openProfile("self")}>Voir mon profil</button>
            <button type="button">Se déconnecter</button>
          </section>
        </div>
      )}

      {searchOpen && (
        <div className="overlay search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-title">
          <button className="overlay-backdrop" type="button" aria-label="Fermer la recherche" onClick={() => setSearchOpen(false)} />
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
              <input autoFocus type="search" placeholder="Titre ou auteur" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            </label>
            <div className="search-results">
              {filteredWorks.map((work) => (
                <button type="button" key={work.id} onClick={() => selectWork(work.id)}><strong>{work.title}</strong><span>{work.author}</span></button>
              ))}
              {filteredWorks.length === 0 && <p className="search-empty">Aucune œuvre ne correspond à cette recherche.</p>}
            </div>
            <button className="primary-action search-discover-action" type="button" onClick={() => openDiscoverWithQuery(searchQuery)}>{searchQuery.trim() ? "Voir les résultats dans Découvrir" : "Ouvrir Découvrir"}</button>
          </section>
        </div>
      )}

      {noteOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="note-title">
          <button className="overlay-backdrop" type="button" aria-label="Fermer la note" onClick={requestNoteClose} />
          <section className={`editor-modal private-editor ${noteCloseConfirm ? "editor-protected" : ""}`}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Privée · visible uniquement par vous</p>
                <h2 id="note-title">Ma note</h2>
              </div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={requestNoteClose}>×</button>
            </div>
            <label className="editor-field">
              <span>Ce que vous souhaitez retenir</span>
              <textarea autoFocus={!noteCloseConfirm} readOnly={noteCloseConfirm} rows={5} value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Une pensée, une image, une phrase à garder…" />
            </label>
            {noteCloseConfirm ? (
              <div className="editor-confirmation" role="alertdialog" aria-labelledby="note-confirm-title">
                <div><strong id="note-confirm-title">Quitter sans enregistrer ?</strong><p>Les modifications apportées à votre note seront perdues.</p></div>
                <div className="protection-actions">
                  <button className="primary-action" type="button" onClick={() => setNoteCloseConfirm(false)}>Revenir à la note</button>
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
        </div>
      )}

      {reviewOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="review-title">
          <button className="overlay-backdrop" type="button" aria-label="Fermer la critique" onClick={requestReviewClose} />
          <section className={`editor-modal review-editor ${reviewCloseConfirm ? "editor-protected" : ""}`}>
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Publique</p>
                <h2 id="review-title">{entry.review ? "Modifier ma critique" : "Écrire une critique"}</h2>
              </div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={requestReviewClose}>×</button>
            </div>
            <label className="editor-field">
              <span>Votre critique</span>
              <textarea autoFocus={!reviewCloseConfirm} readOnly={reviewCloseConfirm} rows={10} maxLength={3000} value={reviewDraft} onChange={(event) => setReviewDraft(event.target.value)} placeholder="Partagez ce que cette œuvre vous a laissé…" />
              <small>{reviewDraft.length.toLocaleString("fr-FR")} / 3 000 caractères</small>
            </label>
            <fieldset className="rating-field">
              <legend>Votre évaluation <span>— facultative</span></legend>
              <div className="star-row" role="radiogroup" aria-label="Évaluation sur cinq étoiles" onMouseLeave={() => setRatingPreview(null)}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    role="radio"
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
                      if (event.key === "ArrowLeft" || event.key === "ArrowDown") setRatingDraft((rating) => Math.max(1, rating - 1 || 1));
                      if (event.key === "ArrowRight" || event.key === "ArrowUp") setRatingDraft((rating) => Math.min(5, rating + 1));
                      if (event.key === "Home") setRatingDraft(1);
                      if (event.key === "End") setRatingDraft(5);
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
              <div className="editor-confirmation" role="alertdialog" aria-labelledby="review-confirm-title">
                <div><strong id="review-confirm-title">Quitter sans enregistrer ?</strong><p>Les modifications apportées à votre critique seront perdues.</p></div>
                <div className="protection-actions">
                  <button className="primary-action" type="button" onClick={() => setReviewCloseConfirm(false)}>Revenir à la critique</button>
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
        </div>
      )}

      {photoCropOpen && <PhotoCropper currentPhoto={profilePhoto} onClose={() => setPhotoCropOpen(false)} onSave={setProfilePhoto} />}

      {feedback && (
        <div className="temporary-feedback" role="status" tabIndex={0} onMouseEnter={() => setFeedbackPaused(true)} onMouseLeave={() => setFeedbackPaused(false)} onFocus={() => setFeedbackPaused(true)} onBlur={() => setFeedbackPaused(false)}>
          <span><strong>{feedback.label}</strong><small>{feedback.detail}</small></span>
          <span className="feedback-separator" aria-hidden="true" />
          <button type="button" onClick={undoFeedback}>Annuler</button>
          <button type="button" aria-label="Fermer" onClick={() => setFeedback(null)}>×</button>
        </div>
      )}
    </div>
  );
}
