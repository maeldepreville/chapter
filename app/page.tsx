"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ReadingStatus = "À lire" | "En cours" | "Lu";
type DatePrompt = "start" | "finish" | null;
type View = "work" | "journal" | "library";

type PersonalEntry = {
  readingStatus: ReadingStatus | null;
  readingDate: string;
  note: string;
  review: string;
  rating: number;
};

const emptyEntry: PersonalEntry = { readingStatus: null, readingDate: "", note: "", review: "", rating: 0 };

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
    coverTone: "indigo",
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
    coverTone: "clay",
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
    coverTone: "night",
  },
] as const;

const communityReviews = [
  {
    initials: "LM",
    name: "Lina Morel",
    rating: 5,
    date: "18 août 2026",
    text: "Un roman qui avance comme une carte que l’on dessine en marchant. J’ai aimé la précision des images, la façon dont le vent devient presque un personnage, et surtout cette sensation persistante que nos souvenirs ne sont jamais aussi fixes qu’on le croit.",
  },
  {
    initials: "TR",
    name: "Théo Renaud",
    rating: 4,
    date: "12 août 2026",
    text: "Une écriture ample, parfois exigeante, mais toujours habitée. Le dernier tiers donne une profondeur inattendue à tout ce qui précédait.",
  },
  {
    initials: "IN",
    name: "Inès Naël",
    rating: 4,
    date: "3 août 2026",
    text: "J’y suis entré lentement, puis je n’ai plus voulu quitter cet univers. Une très belle réflexion sur les lieux que l’on emporte avec soi.",
  },
];

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("work");
  const [selectedWorkId, setSelectedWorkId] = useState<(typeof works)[number]["id"]>(works[0].id);
  const [entries, setEntries] = useState<Record<string, PersonalEntry>>({
    rivage: { ...emptyEntry, readingStatus: "En cours", readingDate: "16 août 2026" },
    atlas: { ...emptyEntry, readingStatus: "À lire" },
  });
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [statusOrigin, setStatusOrigin] = useState<"opening" | "journal">("opening");
  const [datePrompt, setDatePrompt] = useState<DatePrompt>(null);
  const [customDateOpen, setCustomDateOpen] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteCloseConfirm, setNoteCloseConfirm] = useState(false);
  const [reviewDraft, setReviewDraft] = useState("");
  const [ratingDraft, setRatingDraft] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewCloseConfirm, setReviewCloseConfirm] = useState(false);
  const [publicationUndo, setPublicationUndo] = useState(false);
  const [publicationLabel, setPublicationLabel] = useState("Critique publiée");
  const [activeSection, setActiveSection] = useState("journal");
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const previousPublication = useRef({ review: "", rating: 0 });
  const latestPublication = useRef({ review: "", rating: 0 });
  const selectedWork = works.find((work) => work.id === selectedWorkId) ?? works[0];
  const entry = entries[selectedWork.id] ?? emptyEntry;
  const filteredWorks = works.filter((work) => `${work.title} ${work.author}`.toLocaleLowerCase("fr").includes(searchQuery.trim().toLocaleLowerCase("fr")));

  const updateEntry = (changes: Partial<PersonalEntry>) => {
    setEntries((current) => ({
      ...current,
      [selectedWork.id]: { ...(current[selectedWork.id] ?? emptyEntry), ...changes },
    }));
  };

  const openView = (view: View) => {
    setCurrentView(view);
    setAccountOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectWork = (id: (typeof works)[number]["id"]) => {
    setSelectedWorkId(id);
    setCurrentView("work");
    setSearchOpen(false);
    setSearchQuery("");
    setStatusMenuOpen(false);
    setDatePrompt(null);
    setExpandedReviews([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const sections = ["journal", "about", "reviews"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [currentView, selectedWorkId]);

  useEffect(() => {
    const hasOverlay = noteOpen || reviewOpen || searchOpen || accountOpen || noteCloseConfirm || reviewCloseConfirm;
    document.body.style.overflow = hasOverlay ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [noteOpen, reviewOpen, searchOpen, accountOpen, noteCloseConfirm, reviewCloseConfirm]);

  useEffect(() => {
    if (!publicationUndo) return;
    const timer = window.setTimeout(() => setPublicationUndo(false), 8000);
    return () => window.clearTimeout(timer);
  }, [publicationUndo]);

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
      if (accountOpen) return setAccountOpen(false);
      if (statusMenuOpen || datePrompt) {
        setStatusMenuOpen(false);
        setDatePrompt(null);
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  });

  const chooseStatus = (status: ReadingStatus) => {
    updateEntry({ readingStatus: status });
    setStatusMenuOpen(false);
    setCustomDateOpen(false);
    setDatePrompt(status === "En cours" ? "start" : status === "Lu" ? "finish" : null);
  };

  const setToday = () => {
    updateEntry({ readingDate: new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date()) });
    setDatePrompt(null);
  };

  const openNote = () => {
    setNoteDraft(entry.note);
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
    setReviewOpen(true);
  };
  const requestReviewClose = () => {
    if (reviewDraft !== entry.review || ratingDraft !== entry.rating) setReviewCloseConfirm(true);
    else setReviewOpen(false);
  };
  const publishReview = () => {
    const cleanReview = reviewDraft.trim();
    if (!cleanReview) return;
    previousPublication.current = { review: entry.review, rating: entry.rating };
    latestPublication.current = { review: cleanReview, rating: ratingDraft };
    setPublicationLabel(entry.review ? "Critique mise à jour" : "Critique publiée");
    updateEntry({ review: cleanReview, rating: ratingDraft });
    setReviewOpen(false);
    setPublicationUndo(true);
  };
  const undoPublication = () => {
    updateEntry({ review: previousPublication.current.review, rating: previousPublication.current.rating });
    setReviewDraft(latestPublication.current.review);
    setRatingDraft(latestPublication.current.rating);
    setPublicationUndo(false);
    setReviewOpen(true);
  };

  const dateLabel = datePrompt === "start" ? "date de début" : "date de fin";
  const displayReadingDate = entry.readingDate && /^\d{4}-\d{2}-\d{2}$/.test(entry.readingDate)
    ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${entry.readingDate}T12:00:00`))
    : entry.readingDate;

  return (
    <div className="site-shell">
      <header className="desktop-header">
        <button className="wordmark wordmark-button" type="button" aria-label="Chapter, ouvrir le journal" onClick={() => openView("journal")}>Chapter<span>.</span></button>
        <nav aria-label="Navigation principale">
          <button className={currentView === "journal" ? "active" : ""} type="button" onClick={() => openView("journal")}>Journal</button>
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
          />
        </label>
        <div className="account-control">
          <button className="account-button" type="button" aria-label="Ouvrir le compte de Maël" aria-expanded={accountOpen} onClick={() => setAccountOpen((open) => !open)}>MD</button>
          {accountOpen && (
            <div className="account-menu">
              <p><strong>Maël Depréville</strong><span>Lecteur</span></p>
              <button type="button">Voir mon profil</button>
              <button type="button">Paramètres</button>
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
        {currentView === "journal" ? (
          <section className="destination-page" aria-labelledby="personal-journal-title">
            <header className="destination-heading">
              <p className="eyebrow">Votre espace personnel</p>
              <h1 id="personal-journal-title">Journal</h1>
              <p>Retrouvez vos lectures récentes et reprenez là où vous vous étiez arrêté.</p>
            </header>
            <div className="destination-list">
              {works.filter((work) => entries[work.id]?.readingStatus).map((work) => (
                <button className="destination-row" type="button" key={work.id} onClick={() => selectWork(work.id)}>
                  <span className={`mini-cover ${work.coverTone}`} aria-hidden="true">{work.title.slice(0, 1)}</span>
                  <span><strong>{work.title}</strong><small>{work.author}</small></span>
                  <span className="status-label">{entries[work.id]?.readingStatus}</span>
                </button>
              ))}
            </div>
          </section>
        ) : currentView === "library" ? (
          <section className="destination-page" aria-labelledby="library-title">
            <header className="destination-heading">
              <p className="eyebrow">Votre collection</p>
              <h1 id="library-title">Bibliothèque</h1>
              <p>Toutes les œuvres que vous avez ajoutées, regroupées par état de lecture.</p>
            </header>
            <div className="library-filters" aria-label="Filtrer la bibliothèque">
              <button className="active" type="button">Toutes</button>
              <button type="button">À lire</button>
              <button type="button">En cours</button>
              <button type="button">Lu</button>
            </div>
            <div className="library-grid">
              {works.filter((work) => entries[work.id]?.readingStatus).map((work) => (
                <button className="library-work" type="button" key={work.id} onClick={() => selectWork(work.id)}>
                  <span className={`library-cover ${work.coverTone}`} aria-hidden="true"><strong>{work.title}</strong><small>{work.author}</small></span>
                  <span><strong>{work.title}</strong><small>{work.author} · {entries[work.id]?.readingStatus}</small></span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <>
        <section className="book-opening" aria-labelledby="book-title">
          <div className="cover-stage" aria-label={`Couverture de ${selectedWork.title}`}>
            <div className={`book-cover ${selectedWork.cover ? "" : `typographic-cover ${selectedWork.coverTone}`}`}>
              {selectedWork.cover && <Image src="/chapter-cover-art.png" alt="" fill priority sizes="(max-width: 899px) 160px, 320px" />}
              <div className="book-cover-copy">
                <span className="cover-mark">CHAPTER</span>
                <strong>{selectedWork.title}</strong>
                <span>{selectedWork.author}</span>
              </div>
            </div>
          </div>

          <div className="book-identity">
            <p className="eyebrow">{selectedWork.meta}</p>
            <h1 id="book-title">{selectedWork.title}</h1>
            <p className="author">de {selectedWork.author}</p>
            <p className="book-lede">{selectedWork.lede}</p>
            <div className="opening-actions">
              <div className="status-control">
                <button className="primary-action" type="button" aria-expanded={statusMenuOpen || Boolean(datePrompt)} onClick={() => { setStatusOrigin("opening"); setDatePrompt(null); setStatusMenuOpen((open) => !open); }}>
                  {entry.readingStatus ?? "Ajouter au journal"}
                </button>
                {statusOrigin === "opening" && statusMenuOpen && (
                  <div className="status-popover" role="dialog" aria-label="Choisir un statut de lecture">
                    <div className="popover-heading">
                      <strong>Où en êtes-vous ?</strong>
                      <button type="button" aria-label="Fermer" onClick={() => setStatusMenuOpen(false)}>×</button>
                    </div>
                    {(["À lire", "En cours", "Lu"] as ReadingStatus[]).map((status) => (
                      <button className={status === entry.readingStatus ? "selected" : ""} type="button" key={status} onClick={() => chooseStatus(status)}>{status}</button>
                    ))}
                  </div>
                )}
                {statusOrigin === "opening" && datePrompt && (
                  <div className="status-popover date-popover" role="dialog" aria-label={`Ajouter une ${dateLabel}`}>
                    <div className="popover-heading">
                      <strong>Ajouter une {dateLabel} ?</strong>
                      <button type="button" aria-label="Fermer" onClick={() => setDatePrompt(null)}>×</button>
                    </div>
                    {!customDateOpen ? (
                      <>
                        <button type="button" onClick={setToday}>Aujourd’hui</button>
                        <button type="button" onClick={() => setCustomDateOpen(true)}>Choisir une date</button>
                        <button type="button" onClick={() => setDatePrompt(null)}>Plus tard</button>
                      </>
                    ) : (
                      <label className="date-field">
                        <span>{datePrompt === "start" ? "Début de lecture" : "Fin de lecture"}</span>
                        <input type="date" onChange={(event) => updateEntry({ readingDate: event.target.value })} />
                        <button type="button" onClick={() => setDatePrompt(null)}>Enregistrer la date</button>
                      </label>
                    )}
                  </div>
                )}
              </div>
              <button className="quiet-action" type="button" onClick={openReview}>{entry.review ? "Modifier ma critique" : "Écrire une critique"}</button>
            </div>
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
                <button className="text-action" type="button" onClick={() => { setStatusOrigin("journal"); setDatePrompt(null); setStatusMenuOpen(true); }}>{entry.readingStatus ? "Modifier" : "Ajouter au journal"}</button>
                {statusOrigin === "journal" && statusMenuOpen && (
                  <div className="status-popover" role="dialog" aria-label="Choisir un statut de lecture">
                    <div className="popover-heading">
                      <strong>Où en êtes-vous ?</strong>
                      <button type="button" aria-label="Fermer" onClick={() => setStatusMenuOpen(false)}>×</button>
                    </div>
                    {(["À lire", "En cours", "Lu"] as ReadingStatus[]).map((status) => (
                      <button className={status === entry.readingStatus ? "selected" : ""} type="button" key={status} onClick={() => chooseStatus(status)}>{status}</button>
                    ))}
                  </div>
                )}
                {statusOrigin === "journal" && datePrompt && (
                  <div className="status-popover date-popover" role="dialog" aria-label={`Ajouter une ${dateLabel}`}>
                    <div className="popover-heading">
                      <strong>Ajouter une {dateLabel} ?</strong>
                      <button type="button" aria-label="Fermer" onClick={() => setDatePrompt(null)}>×</button>
                    </div>
                    {!customDateOpen ? (
                      <>
                        <button type="button" onClick={setToday}>Aujourd’hui</button>
                        <button type="button" onClick={() => setCustomDateOpen(true)}>Choisir une date</button>
                        <button type="button" onClick={() => setDatePrompt(null)}>Plus tard</button>
                      </>
                    ) : (
                      <label className="date-field">
                        <span>{datePrompt === "start" ? "Début de lecture" : "Fin de lecture"}</span>
                        <input type="date" onChange={(event) => updateEntry({ readingDate: event.target.value })} />
                        <button type="button" onClick={() => setDatePrompt(null)}>Enregistrer la date</button>
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>
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
            <div className="reviews-list">
              {communityReviews.map((review) => (
                <article className="review" key={review.name}>
                  <header className="review-header">
                    <span className="avatar" aria-hidden="true">{review.initials}</span>
                    <div>
                      <h3>{review.name}</h3>
                      <p>{review.date}</p>
                    </div>
                    <span className="review-stars" aria-label={`${review.rating} étoiles sur 5`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                  </header>
                  <p className="review-copy">
                    {expandedReviews.includes(review.name) || review.text.length < 185 ? review.text : `${review.text.slice(0, 185)}…`}
                  </p>
                  {review.text.length >= 185 && (
                    <button className="text-action review-expand" type="button" aria-expanded={expandedReviews.includes(review.name)} onClick={() => setExpandedReviews((names) => names.includes(review.name) ? names.filter((name) => name !== review.name) : [...names, review.name])}>
                      {expandedReviews.includes(review.name) ? "Réduire" : "Lire la suite"}
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
          </>
        )}
      </main>

      {(statusMenuOpen || datePrompt) && (
        <button className="status-backdrop" type="button" aria-label="Fermer le choix de statut" onClick={() => { setStatusMenuOpen(false); setDatePrompt(null); }} />
      )}

      <nav className="mobile-nav" aria-label="Navigation principale mobile">
        <button className={currentView === "journal" ? "active" : ""} type="button" onClick={() => openView("journal")}><span aria-hidden="true">◫</span>Journal</button>
        <button type="button" onClick={() => setSearchOpen(true)}><span aria-hidden="true">⌕</span>Recherche</button>
        <button className={currentView === "library" ? "active" : ""} type="button" onClick={() => openView("library")}><span aria-hidden="true">▥</span>Bibliothèque</button>
      </nav>

      {accountOpen && (
        <div className="mobile-account-overlay">
          <button className="overlay-backdrop" type="button" aria-label="Fermer le menu du compte" onClick={() => setAccountOpen(false)} />
          <section className="mobile-account-sheet" aria-label="Compte de Maël">
            <div className="modal-heading">
              <div><p className="eyebrow">Compte</p><h2>Maël Depréville</h2></div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={() => setAccountOpen(false)}>×</button>
            </div>
            <button type="button">Voir mon profil</button>
            <button type="button">Paramètres</button>
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
          </section>
        </div>
      )}

      {noteOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="note-title">
          <button className="overlay-backdrop" type="button" aria-label="Fermer la note" onClick={requestNoteClose} />
          <section className="editor-modal private-editor">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Privée · visible uniquement par vous</p>
                <h2 id="note-title">Ma note</h2>
              </div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={requestNoteClose}>×</button>
            </div>
            <label className="editor-field">
              <span>Ce que vous souhaitez retenir</span>
              <textarea autoFocus rows={8} value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Une pensée, une image, une phrase à garder…" />
            </label>
            <div className="modal-actions">
              <button className="quiet-action" type="button" onClick={requestNoteClose}>Annuler</button>
              <button className="primary-action" type="button" onClick={saveNote}>Enregistrer</button>
            </div>
          </section>
        </div>
      )}

      {reviewOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="review-title">
          <button className="overlay-backdrop" type="button" aria-label="Fermer la critique" onClick={requestReviewClose} />
          <section className="editor-modal review-editor">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">Publique</p>
                <h2 id="review-title">{entry.review ? "Modifier ma critique" : "Écrire une critique"}</h2>
              </div>
              <button className="close-button" type="button" aria-label="Fermer" onClick={requestReviewClose}>×</button>
            </div>
            <label className="editor-field">
              <span>Votre critique</span>
              <textarea autoFocus rows={9} maxLength={3000} value={reviewDraft} onChange={(event) => setReviewDraft(event.target.value)} placeholder="Partagez ce que cette œuvre vous a laissé…" />
              <small>{reviewDraft.length.toLocaleString("fr-FR")} / 3 000 caractères</small>
            </label>
            <fieldset className="rating-field">
              <legend>Votre évaluation <span>— facultative</span></legend>
              <div className="star-row" role="radiogroup" aria-label="Évaluation sur cinq étoiles">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button type="button" role="radio" aria-checked={ratingDraft === value} aria-label={`${value} étoile${value > 1 ? "s" : ""}`} key={value} onClick={() => setRatingDraft(ratingDraft === value ? 0 : value)}>
                    {value <= ratingDraft ? "★" : "☆"}
                  </button>
                ))}
                <span>{ratingDraft ? `${ratingDraft} sur 5` : "Aucune évaluation"}</span>
              </div>
            </fieldset>
            <div className="modal-actions">
              <button className="quiet-action" type="button" onClick={requestReviewClose}>Annuler</button>
              <button className="primary-action" type="button" disabled={!reviewDraft.trim()} onClick={publishReview}>{entry.review ? "Enregistrer les modifications" : "Publier la critique"}</button>
            </div>
          </section>
        </div>
      )}

      {noteCloseConfirm && (
        <div className="overlay confirmation-overlay" role="alertdialog" aria-modal="true" aria-labelledby="note-confirm-title">
          <div className="confirmation-dialog">
            <h2 id="note-confirm-title">Quitter sans enregistrer ?</h2>
            <p>Les modifications apportées à votre note seront perdues.</p>
            <div className="modal-actions">
              <button className="primary-action" type="button" onClick={() => setNoteCloseConfirm(false)}>Revenir à la note</button>
              <button className="quiet-action" type="button" onClick={() => { setNoteCloseConfirm(false); setNoteOpen(false); setNoteDraft(entry.note); }}>Ignorer les modifications</button>
            </div>
          </div>
        </div>
      )}

      {reviewCloseConfirm && (
        <div className="overlay confirmation-overlay" role="alertdialog" aria-modal="true" aria-labelledby="review-confirm-title">
          <div className="confirmation-dialog">
            <h2 id="review-confirm-title">Quitter sans enregistrer ?</h2>
            <p>Les modifications apportées à votre critique seront perdues.</p>
            <div className="modal-actions">
              <button className="primary-action" type="button" onClick={() => setReviewCloseConfirm(false)}>Revenir à la critique</button>
              <button className="quiet-action" type="button" onClick={() => { setReviewCloseConfirm(false); setReviewOpen(false); setReviewDraft(entry.review); setRatingDraft(entry.rating); }}>Ignorer les modifications</button>
            </div>
          </div>
        </div>
      )}

      {publicationUndo && (
        <div className="publication-toast" role="status">
          <span><strong>{publicationLabel}</strong><small>Elle est maintenant visible publiquement.</small></span>
          <button type="button" onClick={undoPublication}>Annuler</button>
          <button type="button" aria-label="Fermer" onClick={() => setPublicationUndo(false)}>×</button>
        </div>
      )}
    </div>
  );
}
