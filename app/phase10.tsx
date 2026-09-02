"use client";

import Image from "next/image";
/* eslint-disable @next/next/no-img-element */
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useLayoutEffect, useRef, useState, WheelEvent } from "react";
import { getHonorsLayout } from "./honors-layout";
import { Modal } from "./modal";
import { CoverFrame } from "./cover-frame";
import { availableWorkCount, availableWorks, FEATURED_DISCOVERY_LIST_ID, publicListCatalog, publicListIds, type PublicListId } from "./catalogue";
import { createProfileShareController } from "./profile-share";
import { cropPreview, startPhotoImport } from "./photo-processing";
import { Fade, useSurfaceActive } from "./fade";
import { actorIdForProfile, CURRENT_READER_ID, profilePresentations, prototypeActors, type ProfileOwner, type PrototypeActorId } from "./prototype-data";
import { prototypeReviewsForActor, prototypeReviewsForWork, type PrototypePublicReview } from "./social-data";
import { PUBLIC_PROFILE_URL } from "./site-config";

export type { PublicListId } from "./catalogue";
export type { ProfileOwner } from "./prototype-data";

export type SocialWork = {
  id: string;
  title: string;
  author: string;
  meta: string;
  genre: string;
  language: string;
  lede: string;
  cover: boolean;
  coverTone: string;
  coverSrc?: string;
};

type DiscoverProps = {
  works: readonly SocialWork[];
  statuses: Record<string, string | null | undefined>;
  onOpenWork: (id: string) => void;
  onAddToRead: (id: string) => void;
  onOpenProfile: (owner: "self" | "lina") => void;
  onOpenList: (listId: PublicListId) => void;
  followingLina: boolean;
  onToggleFollow: () => void;
  initialQuery?: string;
  historyWorkIds?: readonly string[];
  onBackToJournal?: () => void;
};

const linaReader = prototypeActors.lina;

const normalizeText = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("fr")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const searchStopWords = new Set(["avec", "dans", "des", "les", "pour", "une"]);
const searchTokens = (value: string) => normalizeText(value).split(" ").filter((token) => token.length > 2 && !searchStopWords.has(token));

const tokensAreClose = (queryToken: string, candidateToken: string) => {
  const prefixLength = Math.max(3, Math.min(queryToken.length, candidateToken.length) - 2);
  return candidateToken === queryToken
    || candidateToken.startsWith(queryToken)
    || queryToken.startsWith(candidateToken)
    || (queryToken.length >= 4 && candidateToken.startsWith(queryToken.slice(0, prefixLength)))
    || (candidateToken.length >= 4 && queryToken.startsWith(candidateToken.slice(0, prefixLength)));
};

function CompactCover({ work, className = "discovery-cover" }: { work: SocialWork; className?: string }) {
  return (
    <CoverFrame work={work} className={className} sizes="(max-width: 899px) 35vw, 220px" decorative>
        <span className="compact-cover-copy"><strong>{work.title}</strong><small>{work.author}</small></span>
    </CoverFrame>
  );
}

const discoveryTracks = {
  default: {
    reason: "Dans la continuité des Cartographies du vent",
    title: "Quand les lieux déplacent celles et ceux qui les habitent",
    description: "Une œuvre où le paysage ne sert pas de décor : il conserve les absences, les gestes et les choix que les personnages n’arrivent plus à nommer.",
    main: "rivage",
    echoes: [
      { id: "miroirs", note: "Plus intérieur — la mémoire se loge dans une maison." },
      { id: "lucioles", note: "Plus lumineux — une enquête familiale ouverte sur le vivant." },
    ],
  },
  elsewhere: {
    reason: "Pour être transporté ailleurs",
    title: "Quitter ses repères sans perdre le fil",
    description: "Un récit nocturne qui transforme la ville familière en territoire d’observation, de correspondances et de rencontres imprévues.",
    main: "atlas",
    echoes: [
      { id: "sel", note: "Plus maritime — une traversée faite de recettes et de récits." },
      { id: "rivage", note: "Plus étrange — le temps d’un village se dérègle avec les marées." },
    ],
  },
  calm: {
    reason: "Pour une lecture calme",
    title: "Des gestes modestes qui retiennent le monde",
    description: "Une prose attentive aux détails, aux silences et aux liens discrets qui se forment lorsque l’on prend enfin le temps d’observer.",
    main: "sel",
    echoes: [
      { id: "atlas", note: "Plus urbain — des fenêtres éclairées comme autant de présences." },
      { id: "lucioles", note: "Plus solaire — un été de retrouvailles et de signes fragiles." },
    ],
  },
  surprise: {
    reason: "Pour se laisser surprendre",
    title: "Une réalité qui se décale sans bruit",
    description: "Le fantastique reste au bord du cadre : assez présent pour troubler la lecture, jamais assez pour lui retirer son ancrage humain.",
    main: "miroirs",
    echoes: [
      { id: "rivage", note: "Plus ample — tout un village refuse une heure commune." },
      { id: "atlas", note: "Plus tendre — l’imaginaire naît de vies observées à distance." },
    ],
  },
} as const;

type Intent = keyof typeof discoveryTracks;

export function DiscoverView({ works, statuses, onOpenWork, onAddToRead, onOpenProfile, onOpenList, followingLina, onToggleFollow, initialQuery = "", historyWorkIds, onBackToJournal }: DiscoverProps) {
  const [intent, setIntent] = useState<Intent>("default");
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery.trim());
  const searchRef = useRef<HTMLInputElement>(null);
  const workById = (id: string) => works.find((work) => work.id === id);
  const track = discoveryTracks[intent];
  const featuredList = publicListCatalog[FEATURED_DISCOVERY_LIST_ID];
  const knownHistory = historyWorkIds ?? Object.keys(statuses).filter((id) => statuses[id] === "En cours" || statuses[id] === "Lu");
  const hasAnchor = knownHistory.includes("cartographies") && Boolean(workById("cartographies"));
  const editorialDefault = intent === "default" && !hasAnchor;
  const normalizedQuery = normalizeText(submittedQuery);
  const exactResults = submittedQuery
    ? works.filter((work) => normalizeText(work.title) === normalizedQuery || normalizeText(work.author) === normalizedQuery)
    : [];
  const approximateResults = submittedQuery
    ? works.map((work) => {
        const title = normalizeText(work.title);
        const queryTokens = searchTokens(submittedQuery);
        const titleTokens = searchTokens(work.title);
        const authorTokens = searchTokens(work.author);
        const titleMatches = queryTokens.filter((token) => titleTokens.some((candidate) => tokensAreClose(token, candidate)));
        const authorMatches = queryTokens.filter((token) => authorTokens.some((candidate) => tokensAreClose(token, candidate)));
        const exactTokenCount = queryTokens.filter((token) => titleTokens.includes(token) || authorTokens.includes(token)).length;
        const score = titleMatches.length * 3 + authorMatches.length * 2 + exactTokenCount;
        const reason = authorMatches.length > titleMatches.length
          ? "Le nom de l’auteur se rapproche"
          : titleMatches.length > 1
            ? `${titleMatches.length} mots du titre correspondent`
            : title.includes(normalizedQuery) || exactTokenCount > 0
              ? "Un mot du titre correspond"
              : "Un mot du titre semble proche";
        return { work, score, reason };
      })
        .filter(({ work, score }) => score > 0 && !exactResults.some((exact) => exact.id === work.id))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    : [];

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  };

  const renderSaveAction = (work: SocialWork) => {
    const status = statuses[work.id];
    return status ? <span className="discover-status">{status}</span> : <button className="quiet-action discover-save" type="button" onClick={() => onAddToRead(work.id)}>Ajouter à « À lire »</button>;
  };

  const renderEditorialPaths = (compact = false) => {
    const mainWork = workById(track.main);
    return (
      <>
        <section className={`discovery-main-grid ${compact ? "compact-path" : ""}`} aria-labelledby="discovery-track-title">
          {mainWork ? <article className="discovery-feature">
            <div className="discovery-feature-art">
              <button type="button" onClick={() => onOpenWork(mainWork.id)} aria-label={`Ouvrir ${mainWork.title}`}><CompactCover work={mainWork} /></button>
            </div>
            <div className="discovery-feature-copy">
              <p className="eyebrow">{editorialDefault ? "Un choix de Chapter pour commencer" : track.reason}</p>
              <h2 id="discovery-track-title">{track.title}</h2>
              <p>{track.description}</p>
              {editorialDefault && <p className="discovery-history-hint">Les propositions évolueront avec vos lectures enregistrées.</p>}
              <button className="title-link" type="button" onClick={() => onOpenWork(mainWork.id)}>{mainWork.title}</button>
              <span className="discovery-author">{mainWork.author} · {mainWork.meta}</span>
              {renderSaveAction(mainWork)}
            </div>
          </article> : <div className="journal-empty"><h2 id="discovery-track-title">Cette proposition n’est pas disponible pour le moment</h2><p>Les autres chemins disponibles restent à explorer.</p></div>}
          <aside className="discovery-side-paths" aria-label="Ajuster la découverte et explorer autrement">
            {!compact && (
              <div className="intent-panel">
                <p>Aujourd’hui, j’aimerais…</p>
                <div className="intent-actions">
                  {([
                    ["elsewhere", "être transporté ailleurs"],
                    ["calm", "lire quelque chose de calme"],
                    ["surprise", "me laisser surprendre"],
                  ] as [Intent, string][]).map(([value, label]) => (
                    <button className={intent === value ? "active" : ""} aria-pressed={intent === value} type="button" key={value} onClick={() => setIntent(value)}>{label}</button>
                  ))}
                </div>
                {intent !== "default" && <button className="text-action" type="button" onClick={() => setIntent("default")}>Effacer l’envie</button>}
              </div>
            )}
            <div className="echo-list">
              {track.echoes.map((echo) => {
                const work = workById(echo.id);
                if (!work) return null;
                return (
                  <article className="discovery-echo" key={echo.id}>
                    <button type="button" className="echo-work" onClick={() => onOpenWork(work.id)}>
                      <CompactCover work={work} className="echo-cover" />
                      <span><strong>{work.title}</strong><small>{work.author}</small></span>
                    </button>
                    <p>{echo.note}</p>
                    {renderSaveAction(work)}
                  </article>
                );
              })}
            </div>
          </aside>
        </section>
        {!compact && (
          <section className="public-list-path" aria-labelledby="public-list-title">
            <div className="list-introduction">
              <p className="eyebrow">Une sensibilité à découvrir</p>
              <h2 id="public-list-title">{featuredList.title}</h2>
              <p>{featuredList.discoverySummary}</p>
              <div className="list-author-row">
                <button className="identity-link" type="button" onClick={() => onOpenProfile("lina")}><span className="avatar">{linaReader.initials}</span><span><strong>{linaReader.name}</strong><small>Lectrice et autrice de la liste</small></span></button>
                <button className="primary-action profile-follow-action" type="button" aria-pressed={followingLina} onClick={onToggleFollow}>{followingLina ? "Suivi" : "Suivre"}</button>
              </div>
              <button className="primary-action" type="button" onClick={() => onOpenList(FEATURED_DISCOVERY_LIST_ID)}>Ouvrir la liste</button>
            </div>
            <div className="list-cover-row" aria-hidden="true">
              {availableWorks(works, featuredList.workIds.slice(0, 4)).map((work) => <CompactCover key={work.id} work={work} className="list-preview-cover" />)}
            </div>
          </section>
        )}
      </>
    );
  };

  return (
    <section className="destination-page discover-page" aria-labelledby="discover-title">
      <header className="destination-heading discover-heading">
        <p className="eyebrow">Chercher ou explorer</p>
        <h1 id="discover-title">Découvrir</h1>
        <p>Des œuvres mises en relation avec vos lectures, vos envies du moment et les chemins ouverts par d’autres lecteurs.</p>
      </header>
      <form className="discover-search" role="search" onSubmit={submitSearch}>
        <label htmlFor="discover-query">Titre ou auteur</label>
        <div>
          <div className="discover-search-field">
            <input ref={searchRef} id="discover-query" type="search" value={query} onChange={(event) => { setQuery(event.target.value); if (!event.target.value) setSubmittedQuery(""); }} placeholder="Retrouver une œuvre ou un auteur" />
            {query && <button className="text-action discover-search-clear" type="button" onClick={() => { setQuery(""); setSubmittedQuery(""); searchRef.current?.focus(); }}>Effacer</button>}
          </div>
          <button className="primary-action" type="submit">Rechercher</button>
        </div>
      </form>

      {works.length === 0 ? <div className="journal-empty"><h2>Aucune œuvre disponible pour le moment</h2><p>Le catalogue ne contient pas d’œuvre à afficher.</p>{onBackToJournal && <button className="text-action" type="button" onClick={onBackToJournal}>Revenir au Journal</button>}</div> : submittedQuery ? (
        <section className="discover-results" aria-live="polite">
          {exactResults.length > 0 ? (
            <>
              <p className="eyebrow">Résultats exacts</p>
              <h2>{exactResults.length} correspondance{exactResults.length > 1 ? "s" : ""} pour « {submittedQuery} »</h2>
              <div className="exact-result-list">{exactResults.map((work) => <button type="button" key={work.id} onClick={() => onOpenWork(work.id)}><CompactCover work={work} className="result-cover" /><span><strong>{work.title}</strong><small>{work.author}</small></span></button>)}</div>
            </>
          ) : (
            <>
              <p className="eyebrow">Recherche</p>
              <h2>Aucun résultat exact pour « {submittedQuery} »</h2>
              <div className="result-actions"><button className="text-action" type="button" onClick={() => searchRef.current?.focus()}>Modifier la recherche</button><button className="text-action muted-action" type="button" onClick={() => { setQuery(""); setSubmittedQuery(""); }}>Effacer</button></div>
              {approximateResults.length > 0 && <div className="approximate-results"><h3>Vous cherchez peut-être…</h3>{approximateResults.map(({ work, reason }) => <button type="button" key={work.id} onClick={() => onOpenWork(work.id)}><span><strong>{work.title}</strong><small>{work.author}</small></span><em>{reason}</em></button>)}</div>}
            </>
          )}
          <div className="continue-exploring"><span>Continuer à explorer</span></div>
          {renderEditorialPaths(true)}
        </section>
      ) : renderEditorialPaths()}
    </section>
  );
}

export const badgeCatalog = {
  reading2: { id: "reading2", title: "Complice des livres", src: "/badges/reading-02-complice-des-livres.webp", description: "Une pratique de lecture déjà installée et vingt œuvres terminées." },
  reading3: { id: "reading3", title: "Bibliophile au long cours", src: "/badges/reading-03-bibliophile-au-long-cours.webp", description: "Une mémoire de lecture qui se construit sur la durée.", progress: "36/50 œuvres" },
  exploration2: { id: "exploration2", title: "Esprit nomade", src: "/badges/exploration-02-esprit-nomade.webp", description: "Une curiosité déjà ouverte à plusieurs auteurs, formes et langues." },
  exploration3: { id: "exploration3", title: "Boussole des marges", src: "/badges/exploration-03-boussole-des-marges.webp", description: "Élargir encore les territoires de lecture.", progress: "32/40 auteurs · 7/8 genres · 5/7 langues" },
  expression2: { id: "expression2", title: "Interprète des œuvres", src: "/badges/expression-02-interprete-des-oeuvres.webp", description: "Des critiques et listes qui éclairent les œuvres sans chercher l’audience." },
  expression3: { id: "expression3", title: "Voix singulière", src: "/badges/expression-03-voix-singuliere.webp", description: "Une expression éditoriale reconnaissable et durable.", progress: "18/25 critiques · 3/4 listes" },
  relation2: { id: "relation2", title: "Trait d’union", src: "/badges/relation-02-trait-d-union.webp", description: "Des conversations réciproques construites autour de plusieurs œuvres." },
  relation3: { id: "relation3", title: "Point de rencontre", src: "/badges/relation-03-point-de-rencontre.webp", description: "Faire des œuvres un espace commun pour davantage de lecteurs.", progress: "21/30 conversations · 9/12 lecteurs · 11/15 œuvres" },
  honor1: { id: "honor1", title: "Première lumière", src: "/badges/honor-01-premiere-lumiere.webp", caption: "Des œuvres confidentielles mises en lumière.", description: "Cinq œuvres confidentielles terminées, quatre auteurs et trois mises en lumière publiques." },
  honor2: { id: "honor2", title: "Atlas partagé", src: "/badges/honor-02-atlas-partage.webp", caption: "Une liste qui relie les horizons littéraires.", description: "Une liste exceptionnelle reliant douze œuvres lues, six auteurs, quatre formes et trois langues." },
} as const;

export type BadgeId = keyof typeof badgeCatalog;

function BadgeImage({ badgeId, locked = false }: { badgeId: BadgeId; locked?: boolean }) {
  const badge = badgeCatalog[badgeId];
  return <img className={locked ? "locked" : ""} src={badge.src} alt="" width="220" height="220" loading="eager" decoding="async" />;
}

type ProfileProps = {
  owner: ProfileOwner;
  works: readonly SocialWork[];
  following: boolean;
  onToggleFollow: () => void;
  onOpenWork: (id: string) => void;
  onOpenHonors: () => void;
  onOpenList: (listId: PublicListId) => void;
  photo: ProfilePhoto | null;
  onEditPhoto: () => void;
  onRemovePhoto: () => void;
  equippedTitle: string;
  showcase: BadgeId[];
  personalReviews?: readonly PrototypePublicReview[];
};

export function ProfileView({ owner, works, following, onToggleFollow, onOpenWork, onOpenHonors, onOpenList, photo, onEditPhoto, onRemovePhoto, equippedTitle, showcase, personalReviews = [] }: ProfileProps) {
  const isOwnProfile = owner === "self";
  const presentation = profilePresentations[owner];
  const actor = prototypeActors[presentation.actorId];
  const isMael = presentation.actorId === "self";
  const [removePhotoConfirm, setRemovePhotoConfirm] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [shareNotice, setShareNotice] = useState("");
  const [shareBusy, setShareBusy] = useState(false);
  const [shareController] = useState(() => createProfileShareController(setShareBusy, setShareNotice));
  const publicProfileUrl = PUBLIC_PROFILE_URL;
  const profile = { ...actor, ...presentation, title: isMael ? equippedTitle : presentation.defaultTitle };
  const workById = (id: string) => works.find((work) => work.id === id);
  const favorites = availableWorks(works, profile.favorites);
  const publicReviews = (profile.actorId === CURRENT_READER_ID ? personalReviews : prototypeReviewsForActor(profile.actorId))
    .filter((review) => Boolean(workById(review.workId)))
    .slice(0, 2);
  const visibleBadges = isMael ? showcase : (["reading3", "exploration2", "honor1"] as BadgeId[]);
  const nameLength = Array.from(profile.name.trim()).length;
  const nameScale = nameLength > 28 ? "long" : nameLength > 18 ? "medium" : "short";

  useEffect(() => {
    if (!shareNotice) return;
    const timer = window.setTimeout(() => setShareNotice(""), 5000);
    return () => window.clearTimeout(timer);
  }, [shareNotice]);

  useEffect(() => {
    shareController.activate();
    return () => shareController.dispose();
  }, [shareController, owner]);

  return (
    <section className="profile-page" aria-labelledby="profile-name">
      <div className="profile-opening">
        <aside className="profile-identity-column">
          <div className={`profile-card-flip-shell ${cardFlipped ? "is-flipped" : ""}`}>
            <div className="profile-card-flip">
              <div className="profile-identity-card profile-card-front" aria-hidden={cardFlipped} inert={cardFlipped ? true : undefined}>
                <div className="profile-card-masthead"><span>Chapter<span aria-hidden="true">.</span></span><small>{isOwnProfile ? "Carte de lecteur" : "Portrait public"}</small></div>
                <div className="profile-avatar-wrap">
                  <div className="profile-avatar">{isMael && photo ? <Image src={photo.preview} alt={`Photo de profil de ${profile.firstName}`} fill sizes="180px" unoptimized /> : <span>{profile.initials}</span>}</div>
                  {isOwnProfile && <div className="profile-photo-actions"><button data-photo-edit className="text-action" type="button" onClick={onEditPhoto}>{photo ? "Recadrer" : "Ajouter une photo"}</button>{photo && <button className="text-action muted-action" type="button" onClick={() => setRemovePhotoConfirm(true)}>Retirer</button>}</div>}
                </div>
                <div className="profile-heading-copy">
                  <p className="eyebrow">{isOwnProfile ? "Votre portrait" : "Portrait de lecteur"}</p>
                  <p className="equipped-title">{profile.title}</p>
                  {!isOwnProfile && <button className="primary-action profile-follow-action" type="button" aria-pressed={following} onClick={onToggleFollow}>{following ? "Suivi" : "Suivre"}</button>}
                </div>
                <h1 id="profile-name" className={`profile-card-name ${nameScale}`}>{profile.name}</h1>
                <p className="profile-intro">{profile.intro}</p>
                <Image className="profile-card-seal" src="/branding/chapter-profile-seal.webp" alt="" width={512} height={603} sizes="48px" aria-hidden="true" unoptimized />
              </div>
              {isOwnProfile && (
                <div className="profile-identity-card profile-card-back" aria-hidden={!cardFlipped} inert={!cardFlipped ? true : undefined}>
                  <div className="profile-card-masthead profile-card-back-masthead"><span>Chapter<span aria-hidden="true">.</span></span><small>Profil public</small></div>
                  <div className="profile-card-back-body">
                    <div className="profile-card-qr-field">
                      <img src="/branding/chapter-profile-qr.svg" alt={`QR code vers le profil public de ${profile.name}`} width="168" height="168" />
                    </div>
                    <div className="profile-card-back-copy">
                      <p className={`profile-card-back-name ${nameScale}`}>{profile.name}</p>
                      <p>Scannez pour ouvrir mon profil</p>
                    </div>
                  </div>
                  <a className="profile-card-public-url" href={publicProfileUrl}>{publicProfileUrl.replace(/^https?:\/\//, "")}</a>
                </div>
              )}
            </div>
          </div>
          {isOwnProfile && (
            <div className="profile-card-utilities">
              <div className="profile-card-turn-row">
                <span aria-hidden="true" />
                <button className="profile-card-turn-action" type="button" aria-pressed={cardFlipped} onClick={() => { shareController.invalidate(); setCardFlipped((current) => !current); }}><span aria-hidden="true">↻</span>{cardFlipped ? "Voir le recto" : "Retourner la carte"}</button>
              </div>
              <div className={`profile-card-share-row ${cardFlipped ? "is-visible" : ""}`} aria-hidden={!cardFlipped}>
                <p className="profile-card-share-notice" role="status" aria-live="polite"><Fade inline show={Boolean(shareNotice)} kind="feedback" changeKey={shareNotice}>{shareNotice && <span className="feedback-copy">{shareNotice}</span>}</Fade></p>
                <button className="text-action" type="button" disabled={shareBusy} tabIndex={cardFlipped ? 0 : -1} onClick={() => void shareController.run("copy", publicProfileUrl)}>Copier le lien</button>
                <button className="text-action" type="button" disabled={shareBusy} tabIndex={cardFlipped ? 0 : -1} onClick={() => void shareController.run("share", publicProfileUrl)}>Partager</button>
              </div>
            </div>
          )}
          <section className="profile-honors" aria-labelledby="profile-honors-title">
            <button className="profile-section-link" type="button" onClick={onOpenHonors}><span id="profile-honors-title">Chapitres d’honneur</span><span aria-hidden="true">→</span></button>
            <div className="profile-badge-row">{visibleBadges.map((badgeId) => <div key={badgeId}><BadgeImage badgeId={badgeId} /><span>{badgeCatalog[badgeId].title}</span></div>)}</div>
          </section>
        </aside>
        <section className="profile-section favorites-section profile-opening-favorites" aria-labelledby="favorites-title">
          <div className="profile-section-heading"><p className="eyebrow">Œuvres de chevet</p><h2 id="favorites-title">Celles qui restent</h2></div>
          {favorites.length ? <div className="favorite-books">{favorites.map((work) => <button type="button" key={work.id} onClick={() => onOpenWork(work.id)}><CompactCover work={work} className="favorite-cover" /><span><strong>{work.title}</strong><small>{work.author}</small></span></button>)}</div> : <p className="journal-empty">Les œuvres de chevet ne sont pas disponibles pour le moment.</p>}
        </section>
      </div>
      <div className="profile-wide-content">
        <section className="profile-section" aria-labelledby="profile-lists-title">
          <div className="profile-section-heading"><p className="eyebrow">Listes publiques</p><h2 id="profile-lists-title">Composer des chemins</h2></div>
          {publicListIds.map((listId) => { const list = publicListCatalog[listId]; return <button className="profile-list-entry" type="button" key={listId} onClick={() => onOpenList(listId)}><span><strong>{list.title}</strong><small>{availableWorkCount(availableWorks(works, list.workIds).length, list.workIds.length)} · {list.profileSummary}</small></span><span aria-hidden="true">→</span></button>; })}
        </section>
        <section className="profile-section" aria-labelledby="profile-reviews-title">
          <div className="profile-section-heading"><p className="eyebrow">Critiques choisies</p><h2 id="profile-reviews-title">Quelques traces publiques</h2></div>
          {publicReviews.length ? publicReviews.map((review) => { const work = workById(review.workId)!; return <article className="profile-review" key={`${review.authorId}-${review.workId}`}><button type="button" onClick={() => onOpenWork(review.workId)}>{work.title}</button>{review.rating > 0 && <span className="profile-review-rating" aria-label={`${review.rating} étoiles sur 5`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>}<p>{review.text}</p></article>; }) : <p className="journal-empty">Aucune critique publiée pour le moment.</p>}
        </section>
      </div>
      <Fade show={isOwnProfile && removePhotoConfirm} kind="modal">{isOwnProfile && removePhotoConfirm && (
        <Modal className="profile-photo-remove-overlay" alert labelledBy="remove-photo-title" initialFocus="[data-keep-photo]" returnFocusSelector="[data-photo-edit]" onRequestClose={() => setRemovePhotoConfirm(false)}>
          <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Conserver la photo" onClick={() => setRemovePhotoConfirm(false)} />
          <section className="profile-photo-remove-dialog">
            <p className="eyebrow">Photo de profil</p>
            <h2 id="remove-photo-title">Retirer cette photo ?</h2>
            <p>Vos initiales reprendront leur place sur votre carte de lecteur.</p>
            <div className="modal-actions"><button data-keep-photo className="quiet-action" type="button" onClick={() => setRemovePhotoConfirm(false)}>Conserver</button><button className="destructive-action" type="button" onClick={() => { onRemovePhoto(); setRemovePhotoConfirm(false); }}>Retirer la photo</button></div>
          </section>
        </Modal>
      )}</Fade>
    </section>
  );
}

type HonorsProps = {
  owner: ProfileOwner;
  equippedTitle: string;
  onEquip: (title: string) => void;
  showcase: BadgeId[];
  onToggleShowcase: (id: BadgeId) => void;
  onBack: () => void;
};

export function HonorsView({ owner, equippedTitle, onEquip, showcase, onToggleShowcase, onBack }: HonorsProps) {
  const isOwnProfile = owner === "self";
  const isMael = owner !== "lina";
  const items: { id: BadgeId; locked?: boolean }[] = isOwnProfile
    ? [
        { id: "reading2" }, { id: "reading3", locked: true },
        { id: "exploration2" }, { id: "exploration3", locked: true },
        { id: "expression2" }, { id: "expression3", locked: true },
        { id: "relation2" }, { id: "relation3", locked: true },
        { id: "honor1" }, { id: "honor2" },
      ]
    : isMael
      ? [{ id: "reading2" }, { id: "exploration2" }, { id: "expression2" }, { id: "relation2" }, { id: "honor1" }, { id: "honor2" }]
      : [{ id: "reading3" }, { id: "exploration2" }, { id: "expression3" }, { id: "relation2" }, { id: "honor1" }];
  const [selection, setSelection] = useState<{ id: BadgeId; mode: "hover" | "persistent" } | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const { honors, honorRows, families } = getHonorsLayout(items, isOwnProfile);
  const selected = selection?.id ?? null;

  const renderDetail = (id: BadgeId, placement: "desktop" | "mobile") => {
    const badge = badgeCatalog[id];
    const locked = Boolean(items.find((item) => item.id === id)?.locked);
    const highlighted = showcase.includes(id);

    return (
      <div className={`honor-detail honor-detail-${placement}`} id={`honor-detail-${placement}-${id}`} role="region" aria-label={`Détails de ${badge.title}`}>
        <strong>{badge.title}</strong>
        <p>{badge.description}</p>
        {isOwnProfile && locked && "progress" in badge && <span>{badge.progress}</span>}
        {isOwnProfile && !locked && <div className="honor-detail-actions"><button className="text-action" type="button" disabled={equippedTitle === badge.title} onClick={() => onEquip(badge.title)}>{equippedTitle === badge.title ? "Titre affiché sous mon nom" : "Afficher ce titre sous mon nom"}</button><button className="text-action" type="button" disabled={!highlighted && showcase.length >= 3} onClick={() => onToggleShowcase(id)}>{highlighted ? "Retirer ce badge du profil" : showcase.length >= 3 ? "Trois badges déjà affichés" : "Afficher ce badge sur mon profil"}</button></div>}
      </div>
    );
  };

  const renderBadge = ({ id, locked }: { id: BadgeId; locked?: boolean }) => {
    const badge = badgeCatalog[id];
    const open = selected === id;
    return (
      <div
        className={`honor-cell ${locked ? "locked" : ""}`}
        key={id}
        onMouseLeave={() => {
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            setSelection((current) => current?.id === id && current.mode === "hover" ? null : current);
          }
        }}
      >
        <button
          type="button"
          className="honor-badge-button"
          aria-expanded={open}
          aria-controls={`honor-detail-desktop-${id} honor-detail-mobile-${id}`}
          onClick={(event) => {
            const preciseHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            if (preciseHover || event.detail === 0) setSelection({ id, mode: "persistent" });
            else setSelection((current) => current?.id === id ? null : { id, mode: "persistent" });
          }}
          onMouseEnter={() => {
            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setSelection({ id, mode: "hover" });
          }}
          onFocus={(event) => {
            if (event.currentTarget.matches(":focus-visible")) setSelection({ id, mode: "persistent" });
          }}
        >
          <BadgeImage badgeId={id} locked={locked} />
          <span>{badge.title}</span>
          {!("caption" in badge) && <small>{locked ? "Prochain" : "Acquis"}</small>}
        </button>
        {"caption" in badge && <p className="honor-caption">{badge.caption}</p>}
        {open && renderDetail(id, "desktop")}
      </div>
    );
  };

  useEffect(() => {
    const closeOutside = (event: globalThis.PointerEvent) => {
      if (selected && wallRef.current && !wallRef.current.contains(event.target as Node)) setSelection(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [selected]);

  return (
    <section className="destination-page honors-page" aria-labelledby="honors-title">
      <button className="text-action back-action" type="button" onClick={onBack}>← Retour au profil</button>
      <header className="destination-heading honors-heading">
        <p className="eyebrow">{isOwnProfile ? "Votre parcours" : "Distinctions acquises"}</p>
        <h1 id="honors-title">Chapitres d’honneur</h1>
        <p>{isOwnProfile ? "Vos évolutions actuelles, les prochains horizons et les accomplissements qui consacrent votre parcours." : `Les dernières évolutions et les honneurs obtenus par ${isMael ? "Maël" : "Lina"}. Ses objectifs en cours restent privés.`}</p>
      </header>
      <div ref={wallRef} className="honors-collection" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSelection(null); }} onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setSelection(null); }} onKeyDown={(event) => { if (event.key === "Escape") setSelection(null); }}>
        {honors.length > 0 && (
          <section className="honors-singular" aria-labelledby="singular-honors-title">
            <h2 id="singular-honors-title" className="honors-section-title">Distinctions singulières</h2>
            <div className="honor-special-wall">
              {honorRows.map((row) => {
                const selectedInRow = row.find((item) => item.id === selected)?.id;
                return (
                  <div className={`honor-special-row ${row.length === 1 ? "is-single" : ""}`} key={row[0].id}>
                    {row.map(renderBadge)}
                    {selectedInRow && renderDetail(selectedInRow, "mobile")}
                  </div>
                );
              })}
            </div>
          </section>
        )}
        <section className="honors-path" aria-labelledby="honors-path-title">
          <h2 id="honors-path-title" className="honors-section-title">{isOwnProfile ? "Au fil de votre parcours" : "Au fil de son parcours"}</h2>
          <div className={`honor-wall ${isOwnProfile ? "" : "honor-wall-public"}`}>
            {families.map((family) => {
              const selectedInFamily = family.items.find((item) => item.id === selected)?.id;
              return (
                <section className="honor-family" key={family.id} aria-labelledby={`honor-family-${family.id}`}>
                  <h3 className="honor-family-title" id={`honor-family-${family.id}`}>{family.title}</h3>
                  {family.items.map(renderBadge)}
                  {selectedInFamily && renderDetail(selectedInFamily, "mobile")}
                </section>
              );
            })}
          </div>
        </section>
      </div>
      {isOwnProfile && <p className="honors-note">Seuls vos acquis sont visibles par les autres lecteurs. Les badges grisés et leurs progressions restent privés.</p>}
    </section>
  );
}

export function PublicListView({ owner, listId, works, following, onToggleFollow, onOpenProfile, onOpenWork, onBack, backLabel }: { owner: ProfileOwner; listId: PublicListId; works: readonly SocialWork[]; following: boolean; onToggleFollow: () => void; onOpenProfile: () => void; onOpenWork: (id: string) => void; onBack: () => void; backLabel: string }) {
  const list = publicListCatalog[listId];
  const chosen = availableWorks(works, list.workIds);
  const isOwnList = owner === "self";
  const author = prototypeActors[actorIdForProfile(owner)];
  const authorRelationship = isOwnList ? "Votre liste publique" : owner === "lina" ? "Autrice de la liste" : "Auteur de la liste";
  return (
    <section className="destination-page public-list-page" aria-labelledby="list-page-title">
      <button className="text-action back-action" type="button" onClick={onBack}>← {backLabel}</button>
      <header className="public-list-heading">
        <p className="eyebrow">Liste publique</p>
        <h1 id="list-page-title">{list.title}</h1>
        <p>{list.description}</p>
        {chosen.length < list.workIds.length && <p>{availableWorkCount(chosen.length, list.workIds.length)}.</p>}
        <div className="list-author-row"><button className="identity-link" type="button" onClick={onOpenProfile}><span className="avatar">{author.initials}</span><span><strong>{author.name}</strong><small>{authorRelationship}</small></span></button>{!isOwnList && <button className="primary-action profile-follow-action" type="button" aria-pressed={following} onClick={onToggleFollow}>{following ? "Suivi" : "Suivre"}</button>}</div>
      </header>
      {chosen.length ? <div className="public-list-works">{chosen.map((work, index) => <article key={work.id}><span className="list-index">{String(index + 1).padStart(2, "0")}</span><button type="button" className="public-list-work" onClick={() => onOpenWork(work.id)}><CompactCover work={work} className="public-list-cover" /><span><strong>{work.title}</strong><small>{work.author} · {work.meta}</small><p>{list.workIds.findIndex((id) => id === work.id) % 2 === 0 ? "Un lieu qui agit sur la mémoire et oblige à regarder autrement ce qui semblait familier." : "Une géographie intime, traversée par les voix de celles et ceux qui y ont vécu."}</p></span></button></article>)}</div> : <p className="journal-empty">Aucune œuvre de cette liste n’est disponible pour le moment.</p>}
    </section>
  );
}

type Reply = { id: string; authorId: PrototypeActorId; text: string; date: string };
type SocialReview = PrototypePublicReview & { own?: boolean };

export function SocialReviews({ workId, personalReview, personalRating, followedActorIds = [], onOpenProfile, onWriteReview }: { workId: string; personalReview: string; personalRating: number; followedActorIds?: readonly PrototypeActorId[]; onOpenProfile: (actorId: PrototypeActorId) => void; onWriteReview: () => void }) {
  const contextualReviews = prototypeReviewsForWork(workId);
  const reviews: SocialReview[] = personalReview ? [{ authorId: CURRENT_READER_ID, workId, rating: personalRating, date: "Aujourd’hui", text: personalReview, own: true }, ...contextualReviews] : [...contextualReviews];
  const [expanded, setExpanded] = useState<string[]>([]);
  const [expandedTexts, setExpandedTexts] = useState<string[]>([]);
  const [composer, setComposer] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<{ name: string; text: string } | null>(null);
  const [editingReply, setEditingReply] = useState<{ reviewId: string; replyId: string } | null>(null);
  const [blockedActorIds, setBlockedActorIds] = useState<PrototypeActorId[]>([]);
  const [draft, setDraft] = useState("");
  const [closed, setClosed] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [replies, setReplies] = useState<Record<string, Reply[]>>({
    lina: [
      { id: "r1", authorId: "theo", date: "19 août", text: "La carte qui se fabrique en marchant, c’est exactement ce qui m’a retenu aussi." },
      { id: "r2", authorId: "lina", date: "19 août", text: "Oui — et elle accepte de rester incomplète, ce qui change tout à la fin." },
    ],
    theo: [{ id: "r3", authorId: "ines", date: "13 août", text: "Le dernier tiers m’a aussi fait relire les premières pages autrement." }],
  });

  const publishReply = (reviewId: string) => {
    if (!draft.trim()) return;
    setReplies((current) => editingReply ? {
      ...current,
      [reviewId]: (current[reviewId] ?? []).map((reply) => reply.id === editingReply.replyId ? { ...reply, text: draft.trim(), date: "Modifiée à l’instant" } : reply),
    } : ({ ...current, [reviewId]: [...(current[reviewId] ?? []), { id: `${reviewId}-${Date.now()}`, authorId: CURRENT_READER_ID, date: "À l’instant", text: `${replyingTo ? `@${replyingTo.name} ` : ""}${draft.trim()}` }] }));
    setExpanded((current) => current.includes(reviewId) ? current : [...current, reviewId]);
    setComposer(null);
    setReplyingTo(null);
    setEditingReply(null);
    setDraft("");
  };

  const renderReview = (review: SocialReview, compact = false) => {
    const reviewActor = prototypeActors[review.authorId];
    const reviewReplies = (replies[review.authorId] ?? []).filter((reply) => !blockedActorIds.includes(reply.authorId));
    const isExpanded = expanded.includes(review.authorId);
    const textKey = `${workId}-${review.authorId}`;
    const textExpanded = expandedTexts.includes(textKey);
    const longText = Array.from(review.text).length > 280;
    const isClosed = closed.includes(review.authorId);
    const latest = reviewReplies.at(-1);
    const replyAction = isClosed ? <p className="conversation-closed">Conversation fermée · l’historique reste visible.</p> : <button className="text-action reply-action" type="button" onClick={() => { setComposer(review.authorId); setReplyingTo(null); setEditingReply(null); setDraft(""); }}>Répondre</button>;
    return (
      <article className={`review social-review ${compact ? "compact-review" : ""}`} key={review.authorId}>
        <header className="review-header">
          <button className="avatar avatar-button" type="button" aria-label={`Ouvrir le profil de ${reviewActor.name}`} onClick={() => onOpenProfile(review.authorId)}>{reviewActor.initials}</button>
          <button className="review-author-button" type="button" aria-label={`Ouvrir le profil de ${reviewActor.name}`} onClick={() => onOpenProfile(review.authorId)}><strong>{reviewActor.name}</strong><small>{review.date}</small></button>
          {review.rating > 0 && <span className="review-stars" aria-label={`${review.rating} étoiles sur 5`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>}
        </header>
        <p className="review-copy" id={`review-copy-${textKey}`}>{longText && !textExpanded ? `${Array.from(review.text).slice(0, 280).join("")}…` : review.text}</p>
        {longText && <button className="text-action review-text-toggle" type="button" aria-expanded={textExpanded} aria-controls={`review-copy-${textKey}`} onClick={() => setExpandedTexts((current) => textExpanded ? current.filter((id) => id !== textKey) : [...current, textKey])}>{textExpanded ? "Réduire" : "Lire la suite"}</button>}
        {review.own && <button className="text-action conversation-toggle" type="button" onClick={() => setClosed((current) => isClosed ? current.filter((id) => id !== review.authorId) : [...current, review.authorId])}>{isClosed ? "Rouvrir les réponses" : "Fermer les réponses"}</button>}
        {latest && !isExpanded && <div className="reply-preview"><button className="avatar avatar-button" type="button" aria-label={`Ouvrir le profil de ${prototypeActors[latest.authorId].name}`} onClick={() => onOpenProfile(latest.authorId)}>{prototypeActors[latest.authorId].initials}</button><p><button className="reply-author-button" type="button" aria-label={`Ouvrir le profil de ${prototypeActors[latest.authorId].name}`} onClick={() => onOpenProfile(latest.authorId)}>{prototypeActors[latest.authorId].name}</button>{latest.text}</p></div>}
        <div className="conversation-actions">
          {reviewReplies.length > 0 && <button className="text-action conversation-toggle" type="button" aria-expanded={isExpanded} onClick={() => setExpanded((current) => isExpanded ? current.filter((id) => id !== review.authorId) : [...current, review.authorId])}>{isExpanded ? "Réduire" : `Voir la conversation · ${reviewReplies.length}`}</button>}
          {!isExpanded && replyAction}
        </div>
        {isExpanded && <div className="reply-list">{reviewReplies.map((reply) => { const replyActor = prototypeActors[reply.authorId]; return <article key={reply.id} className="reply"><button className="avatar avatar-button" type="button" aria-label={`Ouvrir le profil de ${replyActor.name}`} onClick={() => onOpenProfile(reply.authorId)}>{replyActor.initials}</button><div><header><button className="reply-author-button" type="button" aria-label={`Ouvrir le profil de ${replyActor.name}`} onClick={() => onOpenProfile(reply.authorId)}>{replyActor.name}</button><small>{reply.date}</small></header><p>{reply.text}</p><div>{reply.authorId === CURRENT_READER_ID ? <><button className="text-action" type="button" onClick={() => { setComposer(review.authorId); setReplyingTo(null); setEditingReply({ reviewId: review.authorId, replyId: reply.id }); setDraft(reply.text); }}>Modifier</button><button className="text-action muted-action" type="button" onClick={() => setReplies((current) => ({ ...current, [review.authorId]: (current[review.authorId] ?? []).filter((item) => item.id !== reply.id) }))}>Supprimer</button></> : <><button className="text-action" type="button" onClick={() => { setComposer(review.authorId); setReplyingTo({ name: replyActor.name, text: reply.text }); setEditingReply(null); setDraft(""); }}>Répondre</button><button className="text-action muted-action" type="button" onClick={() => setNotice("Réponse signalée. Elle reste visible pendant son examen.")}>Signaler</button><button className="text-action muted-action" type="button" onClick={() => { setBlockedActorIds((current) => [...current, reply.authorId]); setNotice(`${replyActor.name} est bloqué·e. Ses réponses sont masquées et les interactions directes sont désactivées.`); }}>Bloquer</button></>}</div></div></article>; })}</div>}
        {isExpanded && <div className="conversation-actions">{replyAction}</div>}
        {composer === review.authorId && !isClosed && <div className="inline-composer">{replyingTo && <div className="reply-context"><p>En réponse à <strong>{replyingTo.name}</strong> <button type="button" aria-label="Retirer la mention" onClick={() => setReplyingTo(null)}>×</button></p><blockquote>{replyingTo.text.length > 90 ? `${replyingTo.text.slice(0, 90)}…` : replyingTo.text}</blockquote></div>}<label><span className="sr-only">Votre réponse</span><textarea autoFocus rows={3} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Poursuivre la conversation…" /></label><div><button className="quiet-action" type="button" onClick={() => { setComposer(null); setReplyingTo(null); setEditingReply(null); setDraft(""); }}>Annuler</button><button className="primary-action" type="button" disabled={!draft.trim()} onClick={() => publishReply(review.authorId)}>{editingReply ? "Enregistrer" : "Publier"}</button></div></div>}
      </article>
    );
  };

  const followedReviews = reviews.filter((review) => followedActorIds.includes(review.authorId)).slice(0, 3);
  const generalReviews = reviews.filter((review) => !followedActorIds.includes(review.authorId));
  return (
    <div className="social-reviews">
      <Fade show={Boolean(notice)} kind="feedback" changeKey={notice}>{notice && <div className="conversation-notice" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>Fermer</button></div>}</Fade>
      {followedReviews.length > 0 && <section className="review-group followed-review-group" aria-labelledby="followed-reviews-title"><h3 id="followed-reviews-title">De personnes que vous suivez</h3>{followedReviews.map((review, index) => renderReview(review, index > 0))}</section>}
      {(generalReviews.length > 0 || followedReviews.length === 0) && <section className="review-group" aria-labelledby="all-reviews-title"><h3 id="all-reviews-title">Toutes les critiques</h3>{generalReviews.length > 0 ? generalReviews.map((review) => renderReview(review)) : <div className="empty-reviews"><p>Aucune critique publiée.</p><button className="text-action" type="button" onClick={onWriteReview}>Écrire une critique</button></div>}</section>}
    </div>
  );
}

type CropTransform = { x: number; y: number; zoom: number };
export type ProfilePhoto = {
  preview: string;
  source: string;
  crop: CropTransform;
  dimensions: { width: number; height: number };
};

type PhotoCropperProps = { currentPhoto: ProfilePhoto | null; onClose: () => void; onSave: (photo: ProfilePhoto) => void };

export function PhotoCropper({ currentPhoto, onClose, onSave }: PhotoCropperProps) {
  const active = useSurfaceActive();
  const [source, setSource] = useState<string | null>(currentPhoto?.source ?? null);
  const [dimensions, setDimensions] = useState(currentPhoto?.dimensions ?? { width: 0, height: 0 });
  const [zoom, setZoom] = useState(currentPhoto?.crop.zoom ?? 1);
  const [error, setError] = useState("");
  const [preparing, setPreparing] = useState(false);
  const [readySource, setReadySource] = useState<string | null>(null);
  const [imageVersion, setImageVersion] = useState(0);
  const importRef = useRef({ generation: 0, closed: false, pending: false, expectedSource: currentPhoto?.source ?? null as string | null, cancel: () => {} });
  const lastValidRef = useRef(currentPhoto ? { source: currentPhoto.source, dimensions: { ...currentPhoto.dimensions }, crop: { ...currentPhoto.crop } } : null);
  const imageRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<CropTransform>(currentPhoto ? { ...currentPhoto.crop } : { x: 0, y: 0, zoom: 1 });
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const gestureRef = useRef({ x: 0, y: 0, distance: 0, zoom: 1 });
  const frameRef = useRef(0);
  const CROP = 320;

  const clampAndPaint = (next = transformRef.current) => {
    if (!imageRef.current || !dimensions.width) return;
    const base = Math.max(CROP / dimensions.width, CROP / dimensions.height);
    const scale = base * next.zoom;
    const maxX = Math.max(0, (dimensions.width * scale - CROP) / 2);
    const maxY = Math.max(0, (dimensions.height * scale - CROP) / 2);
    transformRef.current = { x: Math.max(-maxX, Math.min(maxX, next.x)), y: Math.max(-maxY, Math.min(maxY, next.y)), zoom: Math.max(1, Math.min(3, next.zoom)) };
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      if (!imageRef.current) return;
      const value = transformRef.current;
      const stageRatio = (stageRef.current?.getBoundingClientRect().width || CROP) / CROP;
      imageRef.current.style.transform = `translate(calc(-50% + ${value.x * stageRatio}px), calc(-50% + ${value.y * stageRatio}px)) scale(${base * value.zoom * stageRatio})`;
      if (previewRef.current) {
        const ratio = 112 / CROP;
        previewRef.current.style.transform = `translate(calc(-50% + ${value.x * ratio}px), calc(-50% + ${value.y * ratio}px)) scale(${base * value.zoom * ratio})`;
      }
    });
  };

  useLayoutEffect(() => {
    const operation = importRef.current;
    if (!active) return;
    // A visual exit may be interrupted before unmount. Reopening is still a
    // new editing session: discard the cancelled draft, keeping the saved photo.
    if (operation.closed) {
      operation.pending = false;
      operation.expectedSource = currentPhoto?.source ?? null;
      lastValidRef.current = currentPhoto ? { source: currentPhoto.source, dimensions: { ...currentPhoto.dimensions }, crop: { ...currentPhoto.crop } } : null;
      transformRef.current = currentPhoto ? { ...currentPhoto.crop } : { x: 0, y: 0, zoom: 1 };
      // Synchronize the retained visual shell with its newly active session.
      setSource(currentPhoto?.source ?? null);
      setDimensions(currentPhoto?.dimensions ?? { width: 0, height: 0 });
      setZoom(currentPhoto?.crop.zoom ?? 1);
      setError("");
      setPreparing(false);
      setReadySource(null);
      setImageVersion((version) => version + 1);
    }
    operation.closed = false;
    const pointers = pointersRef.current;
    return () => {
      operation.closed = true;
      operation.generation += 1;
      operation.cancel();
      pointers.clear();
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [active, currentPhoto]);

  useEffect(() => {
    clampAndPaint();
    // La peinture synchronise uniquement les éléments d’aperçu avec les dimensions chargées.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions.width, dimensions.height]);

  const updateZoom = (value: number) => {
    const nextZoom = Math.max(1, Math.min(3, value));
    transformRef.current.zoom = nextZoom;
    setZoom(nextZoom);
    clampAndPaint(transformRef.current);
  };

  const chooseFile = (file?: File) => {
    if (!file) return;
    const operation = importRef.current;
    if (operation.closed) return;
    const generation = ++operation.generation;
    operation.cancel();
    if (source && readySource === source) lastValidRef.current = { source, dimensions: { ...dimensions }, crop: { ...transformRef.current } };
    const current = () => !operation.closed && generation === operation.generation;
    operation.pending = true;
    operation.expectedSource = null;
    setPreparing(true);
    setError("");
    operation.cancel = startPhotoImport(file, (nextSource, nextDimensions) => {
      if (!current()) return;
      operation.expectedSource = nextSource;
      // Do not export until the displayed image also reports a successful load.
      setReadySource(null);
      setImageVersion((version) => version + 1);
      setSource(nextSource);
      setDimensions(nextDimensions);
      transformRef.current = { x: 0, y: 0, zoom: 1 };
      setZoom(1);
      pointersRef.current.clear();
    }, (message) => {
      if (!current()) return;
      operation.pending = false;
      setPreparing(false);
      setError(message);
    });
  };

  const fileChanged = (input: HTMLInputElement) => {
    const file = input.files?.[0];
    input.value = ""; // A retry of the very same file must fire change again.
    chooseFile(file);
  };

  const close = () => {
    importRef.current.closed = true;
    importRef.current.generation += 1;
    importRef.current.cancel();
    pointersRef.current.clear();
    onClose();
  };

  const imageFailed = (image: HTMLImageElement) => {
    if (importRef.current.closed || image !== imageRef.current || (importRef.current.pending && importRef.current.expectedSource !== source)) return;
    importRef.current.pending = false;
    setPreparing(false);
    setReadySource(null);
    setError("Cette image ne peut pas être affichée. Réessayez ou choisissez une autre image.");
    const previous = lastValidRef.current;
    if (previous && previous.source !== source) {
      importRef.current.expectedSource = previous.source;
      setSource(previous.source);
      setImageVersion((version) => version + 1);
      setDimensions(previous.dimensions);
      transformRef.current = { ...previous.crop };
      setZoom(previous.crop.zoom);
    }
  };

  const cropPoint = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = CROP / (bounds.width || CROP);
    return { x: (event.clientX - bounds.left) * ratio, y: (event.clientY - bounds.top) * ratio };
  };

  const resetGesture = () => {
    const points = [...pointersRef.current.values()];
    if (points.length === 1) {
      gestureRef.current = { x: points[0].x - transformRef.current.x, y: points[0].y - transformRef.current.y, distance: 0, zoom: transformRef.current.zoom };
      return;
    }
    if (points.length >= 2) {
      gestureRef.current = { ...gestureRef.current, distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y), zoom: transformRef.current.zoom };
      return;
    }
    gestureRef.current = { x: 0, y: 0, distance: 0, zoom: transformRef.current.zoom };
  };

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, cropPoint(event));
    resetGesture();
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, cropPoint(event));
    const points = [...pointersRef.current.values()];
    if (points.length === 1) clampAndPaint({ ...transformRef.current, x: points[0].x - gestureRef.current.x, y: points[0].y - gestureRef.current.y });
    if (points.length >= 2 && gestureRef.current.distance) {
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const nextZoom = Math.max(1, Math.min(3, gestureRef.current.zoom * distance / gestureRef.current.distance));
      updateZoom(nextZoom);
    }
  };

  const pointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    resetGesture();
  };
  const wheelZoom = (event: WheelEvent<HTMLDivElement>) => { event.preventDefault(); updateZoom(transformRef.current.zoom - event.deltaY * 0.0015); };

  const saveCrop = () => {
    if (importRef.current.closed || importRef.current.pending) return;
    if (!source || readySource !== source || !imageRef.current || imageRef.current.getAttribute("src") !== source) return setError("Attendez que l’image soit prête ou choisissez une autre image.");
    let preview: string;
    try {
      preview = cropPreview(imageRef.current, dimensions, transformRef.current);
    } catch {
      setError("Le recadrage n’a pas pu être créé. Votre photo est conservée ; vous pouvez réessayer.");
      return;
    }
    onSave({
      preview,
      source,
      crop: { ...transformRef.current },
      dimensions: { ...dimensions },
    });
    close();
  };

  return (
    <Modal className="photo-overlay" labelledBy="photo-crop-title" initialFocus=".close-button" returnFocusSelector="[data-photo-edit]" onRequestClose={close}>
      <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer sans enregistrer" onClick={close} />
      <section className="photo-crop-modal">
        <div className="modal-heading"><div><p className="eyebrow">Photo facultative</p><h2 id="photo-crop-title">Recadrer la photo</h2></div><button className="close-button" type="button" aria-label="Fermer" onClick={close}>×</button></div>
        {preparing && <p className="photo-preparing" role="status">Préparation de l’image…</p>}
        {source ? (
          <>
            <div className="photo-crop-layout">
              <div ref={stageRef} className="crop-stage" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd} onWheel={wheelZoom}>
                <img key={imageVersion} ref={imageRef} src={source} alt="Image à recadrer" draggable={false} onError={(event) => imageFailed(event.currentTarget)} onLoad={(event) => {
                  const image = event.currentTarget;
                  if (importRef.current.closed || image !== imageRef.current || !image.naturalWidth || (importRef.current.pending && importRef.current.expectedSource !== source)) return;
                  importRef.current.pending = false;
                  setPreparing(false);
                  setReadySource(source);
                  lastValidRef.current = { source, dimensions: { ...dimensions }, crop: { ...transformRef.current } };
                  clampAndPaint();
                }} />
                <span className="crop-guide" aria-hidden="true" />
              </div>
              <div className="crop-preview"><span>Aperçu</span><div><img ref={previewRef} src={source} alt="" /></div></div>
            </div>
            <div className="photo-controls">
              <label className="file-action"><span>Choisir une autre image</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => fileChanged(event.currentTarget)} /></label>
              <label className="zoom-control"><span>Zoom</span><input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => updateZoom(Number(event.target.value))} /></label>
              <p>Déplacez l’image directement. Sur mobile, pincez pour zoomer.</p>
              {error && <p className="photo-error" role="alert">{error}</p>}
            </div>
            <div className="modal-actions"><button className="quiet-action" type="button" onClick={close}>Annuler</button><button className="primary-action" type="button" disabled={preparing || readySource !== source} onClick={saveCrop}>Enregistrer</button></div>
          </>
        ) : (
          <>
            <div className="photo-empty-state">
              <p>Sélectionnez une image nette ; l’espace de recadrage apparaîtra ensuite.</p>
              <label className="file-action primary-action"><span>Choisir une image</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => fileChanged(event.currentTarget)} /></label>
              <small>JPEG, PNG ou WebP · 8 Mo maximum · 512 px minimum</small>
              {error && <p className="photo-error" role="alert">{error}</p>}
            </div>
            <div className="modal-actions"><button className="quiet-action" type="button" onClick={close}>Annuler</button></div>
          </>
        )}
      </section>
    </Modal>
  );
}
