"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ReadingStatus = "À lire" | "En cours" | "Lu";
type DatePrompt = "start" | "finish" | null;

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
  const [readingStatus, setReadingStatus] = useState<ReadingStatus | null>(null);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [statusOrigin, setStatusOrigin] = useState<"opening" | "journal">("opening");
  const [datePrompt, setDatePrompt] = useState<DatePrompt>(null);
  const [customDateOpen, setCustomDateOpen] = useState(false);
  const [readingDate, setReadingDate] = useState("");
  const [note, setNote] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteCloseConfirm, setNoteCloseConfirm] = useState(false);
  const [review, setReview] = useState("");
  const [reviewDraft, setReviewDraft] = useState("");
  const [rating, setRating] = useState(0);
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
  }, []);

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
        if (noteDraft !== note) setNoteCloseConfirm(true);
        else setNoteOpen(false);
        return;
      }
      if (reviewOpen) {
        if (reviewDraft !== review || ratingDraft !== rating) setReviewCloseConfirm(true);
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
    setReadingStatus(status);
    setStatusMenuOpen(false);
    setCustomDateOpen(false);
    setDatePrompt(status === "En cours" ? "start" : status === "Lu" ? "finish" : null);
  };

  const setToday = () => {
    setReadingDate(new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date()));
    setDatePrompt(null);
  };

  const openNote = () => {
    setNoteDraft(note);
    setNoteOpen(true);
  };
  const requestNoteClose = () => {
    if (noteDraft !== note) setNoteCloseConfirm(true);
    else setNoteOpen(false);
  };
  const saveNote = () => {
    setNote(noteDraft.trim());
    setNoteOpen(false);
  };

  const openReview = () => {
    setReviewDraft(review);
    setRatingDraft(rating);
    setReviewOpen(true);
  };
  const requestReviewClose = () => {
    if (reviewDraft !== review || ratingDraft !== rating) setReviewCloseConfirm(true);
    else setReviewOpen(false);
  };
  const publishReview = () => {
    const cleanReview = reviewDraft.trim();
    if (!cleanReview) return;
    previousPublication.current = { review, rating };
    latestPublication.current = { review: cleanReview, rating: ratingDraft };
    setPublicationLabel(review ? "Critique mise à jour" : "Critique publiée");
    setReview(cleanReview);
    setRating(ratingDraft);
    setReviewOpen(false);
    setPublicationUndo(true);
  };
  const undoPublication = () => {
    setReview(previousPublication.current.review);
    setRating(previousPublication.current.rating);
    setReviewDraft(latestPublication.current.review);
    setRatingDraft(latestPublication.current.rating);
    setPublicationUndo(false);
    setReviewOpen(true);
  };

  const dateLabel = datePrompt === "start" ? "date de début" : "date de fin";
  const displayReadingDate = readingDate && /^\d{4}-\d{2}-\d{2}$/.test(readingDate)
    ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${readingDate}T12:00:00`))
    : readingDate;

  return (
    <div className="site-shell">
      <header className="desktop-header">
        <a className="wordmark" href="#top" aria-label="Chapter, retour en haut">Chapter<span>.</span></a>
        <nav aria-label="Navigation principale">
          <a href="#journal">Journal</a>
          <a href="#about">Bibliothèque</a>
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
        <a className="wordmark" href="#top">Chapter<span>.</span></a>
        <button className="account-button" type="button" aria-label="Ouvrir le compte de Maël" aria-expanded={accountOpen} onClick={() => setAccountOpen((open) => !open)}>MD</button>
      </header>

      <main id="top">
        <section className="book-opening" aria-labelledby="book-title">
          <div className="cover-stage" aria-label="Couverture de Les Cartographies du vent">
            <div className="book-cover">
              <Image src="/chapter-cover-art.png" alt="" fill priority sizes="(max-width: 899px) 160px, 320px" />
              <div className="book-cover-copy">
                <span className="cover-mark">CHAPTER</span>
                <strong>Les Cartographies du vent</strong>
                <span>Camille Maret</span>
              </div>
            </div>
          </div>

          <div className="book-identity">
            <p className="eyebrow">Roman · 2021</p>
            <h1 id="book-title">Les Cartographies du vent</h1>
            <p className="author">de Camille Maret</p>
            <p className="book-lede">Une cartographe revient dans l’archipel de son enfance et découvre que les lieux oubliés continuent de déplacer ceux qui les ont quittés.</p>
            <div className="opening-actions">
              <div className="status-control">
                <button className="primary-action" type="button" aria-expanded={statusMenuOpen || Boolean(datePrompt)} onClick={() => { setStatusOrigin("opening"); setDatePrompt(null); setStatusMenuOpen((open) => !open); }}>
                  {readingStatus ?? "Ajouter au journal"}
                </button>
                {statusOrigin === "opening" && statusMenuOpen && (
                  <div className="status-popover" role="dialog" aria-label="Choisir un statut de lecture">
                    <div className="popover-heading">
                      <strong>Où en êtes-vous ?</strong>
                      <button type="button" aria-label="Fermer" onClick={() => setStatusMenuOpen(false)}>×</button>
                    </div>
                    {(["À lire", "En cours", "Lu"] as ReadingStatus[]).map((status) => (
                      <button className={status === readingStatus ? "selected" : ""} type="button" key={status} onClick={() => chooseStatus(status)}>{status}</button>
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
                        <input type="date" onChange={(event) => setReadingDate(event.target.value)} />
                        <button type="button" onClick={() => setDatePrompt(null)}>Enregistrer la date</button>
                      </label>
                    )}
                  </div>
                )}
              </div>
              <button className="quiet-action" type="button" onClick={openReview}>{review ? "Modifier ma critique" : "Écrire une critique"}</button>
            </div>
            <div className="community-rating" aria-label="Note moyenne de 4,3 sur 5">
              <span aria-hidden="true">★★★★☆</span>
              <strong>4,3</strong>
              <span>1 248 évaluations</span>
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
                <p className="row-value">{readingStatus ?? "Pas encore ajoutée"}</p>
                {displayReadingDate && <p className="privacy-note">Date enregistrée · {displayReadingDate}</p>}
              </div>
              <div className="status-control journal-status-control">
                <button className="text-action" type="button" onClick={() => { setStatusOrigin("journal"); setDatePrompt(null); setStatusMenuOpen(true); }}>{readingStatus ? "Modifier" : "Ajouter au journal"}</button>
                {statusOrigin === "journal" && statusMenuOpen && (
                  <div className="status-popover" role="dialog" aria-label="Choisir un statut de lecture">
                    <div className="popover-heading">
                      <strong>Où en êtes-vous ?</strong>
                      <button type="button" aria-label="Fermer" onClick={() => setStatusMenuOpen(false)}>×</button>
                    </div>
                    {(["À lire", "En cours", "Lu"] as ReadingStatus[]).map((status) => (
                      <button className={status === readingStatus ? "selected" : ""} type="button" key={status} onClick={() => chooseStatus(status)}>{status}</button>
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
                        <input type="date" onChange={(event) => setReadingDate(event.target.value)} />
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
                <p className="row-value">{note || "Aucune pensée consignée"}</p>
                <p className="privacy-note">Privée · visible uniquement par vous</p>
              </div>
              <button className="text-action" type="button" onClick={openNote}>{note ? "Modifier" : "Ajouter une note"}</button>
            </div>
            <div className="journal-row">
              <div>
                <p className="row-label">Ma critique</p>
                <p className="row-value">{review || "Vous n’avez pas encore publié de critique."}</p>
                {review && rating > 0 && <p className="privacy-note" aria-label={`${rating} étoiles sur 5`}>{"★".repeat(rating)}{"☆".repeat(5 - rating)}</p>}
              </div>
              <button className="text-action" type="button" onClick={openReview}>{review ? "Modifier" : "Écrire une critique"}</button>
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
              <div className="synopsis prose">
                <p>Après douze années loin de Néréis, Ana Vales retourne dans l’archipel pour vider la maison de sa mère. Les cartes qu’elle y retrouve ne représentent aucun territoire connu : elles semblent plutôt suivre les déplacements de la mémoire, les silences d’une famille et les routes que le vent efface chaque nuit.</p>
                <p>À mesure qu’elle reprend son ancien métier, Ana comprend que cartographier un lieu consiste parfois moins à en fixer les contours qu’à accepter ce qui nous échappe.</p>
              </div>
              <dl className="work-facts">
                <div><dt>Première publication</dt><dd>2021</dd></div>
                <div><dt>Genre</dt><dd>Roman contemporain</dd></div>
                <div><dt>Langue originale</dt><dd>Français</dd></div>
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
      </main>

      {(statusMenuOpen || datePrompt) && (
        <button className="status-backdrop" type="button" aria-label="Fermer le choix de statut" onClick={() => { setStatusMenuOpen(false); setDatePrompt(null); }} />
      )}

      <nav className="mobile-nav" aria-label="Navigation principale mobile">
        <a className="active" href="#journal"><span aria-hidden="true">◫</span>Journal</a>
        <button type="button" onClick={() => setSearchOpen(true)}><span aria-hidden="true">⌕</span>Recherche</button>
        <a href="#about"><span aria-hidden="true">▥</span>Bibliothèque</a>
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
              <button type="button" onClick={() => setSearchOpen(false)}><strong>Les Cartographies du vent</strong><span>Camille Maret</span></button>
              <button type="button"><strong>Le Rivage des heures</strong><span>Nora Sorel</span></button>
              <button type="button"><strong>Atlas des nuits calmes</strong><span>Yanis Delcourt</span></button>
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
                <h2 id="review-title">{review ? "Modifier ma critique" : "Écrire une critique"}</h2>
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
              <button className="primary-action" type="button" disabled={!reviewDraft.trim()} onClick={publishReview}>{review ? "Enregistrer les modifications" : "Publier la critique"}</button>
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
              <button className="quiet-action" type="button" onClick={() => { setNoteCloseConfirm(false); setNoteOpen(false); setNoteDraft(note); }}>Ignorer les modifications</button>
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
              <button className="quiet-action" type="button" onClick={() => { setReviewCloseConfirm(false); setReviewOpen(false); setReviewDraft(review); setRatingDraft(rating); }}>Ignorer les modifications</button>
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
