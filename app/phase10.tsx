"use client";

import Image from "next/image";
/* eslint-disable @next/next/no-img-element */
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState, WheelEvent } from "react";

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
};

type DiscoverProps = {
  works: readonly SocialWork[];
  statuses: Record<string, string | null | undefined>;
  onOpenWork: (id: string) => void;
  onAddToRead: (id: string) => void;
  onOpenProfile: (owner: "self" | "lina") => void;
  onOpenList: () => void;
  followingLina: boolean;
  onToggleFollow: () => void;
  initialQuery?: string;
};

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
    <span className={`${className} ${work.cover ? "cover-image" : `typographic-cover ${work.coverTone}`}`} aria-hidden="true">
      {work.cover ? (
        <Image src="/chapter-cover-art.png" alt="" fill sizes="(max-width: 899px) 35vw, 220px" />
      ) : (
        <span className="compact-cover-copy"><strong>{work.title}</strong><small>{work.author}</small></span>
      )}
    </span>
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

export function DiscoverView({ works, statuses, onOpenWork, onAddToRead, onOpenProfile, onOpenList, followingLina, onToggleFollow, initialQuery = "" }: DiscoverProps) {
  const [intent, setIntent] = useState<Intent>("default");
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery.trim());
  const searchRef = useRef<HTMLInputElement>(null);
  const workById = (id: string) => works.find((work) => work.id === id) ?? works[0];
  const track = discoveryTracks[intent];
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
          <article className="discovery-feature">
            <div className="discovery-feature-art">
              <button type="button" onClick={() => onOpenWork(mainWork.id)} aria-label={`Ouvrir ${mainWork.title}`}><CompactCover work={mainWork} /></button>
            </div>
            <div className="discovery-feature-copy">
              <p className="eyebrow">{track.reason}</p>
              <h2 id="discovery-track-title">{track.title}</h2>
              <p>{track.description}</p>
              <button className="title-link" type="button" onClick={() => onOpenWork(mainWork.id)}>{mainWork.title}</button>
              <span className="discovery-author">{mainWork.author} · {mainWork.meta}</span>
              {renderSaveAction(mainWork)}
            </div>
          </article>
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
              <h2 id="public-list-title">Habiter les lieux qui nous quittent</h2>
              <p>Des romans où une maison, une ville ou un rivage deviennent une manière de retrouver ce que l’on croyait perdu.</p>
              <div className="list-author-row">
                <button className="identity-link" type="button" onClick={() => onOpenProfile("lina")}><span className="avatar">LM</span><span><strong>Lina Morel</strong><small>Lectrice et autrice de la liste</small></span></button>
                <button className="quiet-action" type="button" aria-pressed={followingLina} onClick={onToggleFollow}>{followingLina ? "Suivie" : "Suivre"}</button>
              </div>
              <button className="primary-action" type="button" onClick={onOpenList}>Ouvrir la liste</button>
            </div>
            <div className="list-cover-row" aria-hidden="true">
              {["miroirs", "rivage", "cartographies", "lucioles"].map((id) => <CompactCover key={id} work={workById(id)} className="list-preview-cover" />)}
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
        <div><input ref={searchRef} id="discover-query" type="search" value={query} onChange={(event) => { setQuery(event.target.value); if (!event.target.value) setSubmittedQuery(""); }} placeholder="Retrouver une œuvre ou un auteur" /><button className="primary-action" type="submit">Rechercher</button></div>
      </form>

      {submittedQuery ? (
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
  honor1: { id: "honor1", title: "Première lumière", src: "/badges/honor-01-premiere-lumiere.webp", description: "Cinq œuvres confidentielles terminées, quatre auteurs et trois mises en lumière publiques." },
  honor2: { id: "honor2", title: "Atlas partagé", src: "/badges/honor-02-atlas-partage.webp", description: "Une liste exceptionnelle reliant douze œuvres lues, six auteurs, quatre formes et trois langues." },
} as const;

export type BadgeId = keyof typeof badgeCatalog;

function BadgeImage({ badgeId, locked = false }: { badgeId: BadgeId; locked?: boolean }) {
  const badge = badgeCatalog[badgeId];
  return <img className={locked ? "locked" : ""} src={badge.src} alt="" width="220" height="220" loading="eager" decoding="async" />;
}

type ProfileProps = {
  owner: "self" | "lina";
  works: readonly SocialWork[];
  following: boolean;
  onToggleFollow: () => void;
  onOpenWork: (id: string) => void;
  onOpenHonors: () => void;
  onOpenList: () => void;
  photo: string | null;
  onEditPhoto: () => void;
  onRemovePhoto: () => void;
  equippedTitle: string;
  showcase: BadgeId[];
};

export function ProfileView({ owner, works, following, onToggleFollow, onOpenWork, onOpenHonors, onOpenList, photo, onEditPhoto, onRemovePhoto, equippedTitle, showcase }: ProfileProps) {
  const isSelf = owner === "self";
  const [removePhotoConfirm, setRemovePhotoConfirm] = useState(false);
  const profile = isSelf ? {
    name: "Maël Depréville", initials: "MD", title: equippedTitle,
    intro: "Lecteur de fictions où les lieux, les souvenirs et les voix discrètes déplacent le regard.",
    favorites: ["cartographies", "atlas", "miroirs"],
  } : {
    name: "Lina Morel", initials: "LM", title: "Voix singulière",
    intro: "Je rassemble des romans où les paysages gardent une mémoire et où chaque détour ouvre une manière différente d’habiter le monde.",
    favorites: ["rivage", "lucioles", "sel"],
  };
  const workById = (id: string) => works.find((work) => work.id === id) ?? works[0];
  const visibleBadges = isSelf ? showcase : (["reading3", "exploration2", "honor1"] as BadgeId[]);

  return (
    <section className="profile-page" aria-labelledby="profile-name">
      <aside className="profile-identity-column">
        <div className="profile-identity-card">
          <div className="profile-card-masthead"><span>Chapter<span aria-hidden="true">.</span></span><small>{isSelf ? "Carte de lecteur" : "Portrait public"}</small></div>
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{isSelf && photo ? <Image src={photo} alt="Photo de profil de Maël" fill sizes="180px" unoptimized /> : <span>{profile.initials}</span>}</div>
            {isSelf && <div className="profile-photo-actions"><button className="text-action" type="button" onClick={onEditPhoto}>{photo ? "Recadrer" : "Ajouter une photo"}</button>{photo && <button className="text-action muted-action" type="button" onClick={() => setRemovePhotoConfirm(true)}>Retirer</button>}</div>}
            {removePhotoConfirm && <div className="photo-remove-confirm" role="alertdialog" aria-label="Retirer la photo de profil"><p>Restaurer vos initiales ?</p><div><button className="quiet-action" type="button" onClick={() => setRemovePhotoConfirm(false)}>Conserver</button><button className="destructive-action" type="button" onClick={() => { onRemovePhoto(); setRemovePhotoConfirm(false); }}>Retirer la photo</button></div></div>}
          </div>
          <div className="profile-heading-copy">
            <p className="eyebrow">{isSelf ? "Votre portrait" : "Portrait de lecteur"}</p>
            <h1 id="profile-name">{profile.name}</h1>
            <p className="equipped-title">{profile.title}</p>
            {!isSelf && <button className="primary-action" type="button" aria-pressed={following} onClick={onToggleFollow}>{following ? "Suivie" : "Suivre"}</button>}
          </div>
          <p className="profile-intro">{profile.intro}</p>
        </div>
        <section className="profile-honors" aria-labelledby="profile-honors-title">
          <button className="profile-section-link" type="button" onClick={onOpenHonors}><span id="profile-honors-title">Chapitres d’honneur</span><span aria-hidden="true">→</span></button>
          <div className="profile-badge-row">{visibleBadges.map((badgeId) => <div key={badgeId}><BadgeImage badgeId={badgeId} /><span>{badgeCatalog[badgeId].title}</span></div>)}</div>
        </section>
      </aside>
      <div className="profile-content-column">
        <section className="profile-section favorites-section" aria-labelledby="favorites-title">
          <div className="profile-section-heading"><p className="eyebrow">Œuvres de chevet</p><h2 id="favorites-title">Celles qui restent</h2></div>
          <div className="favorite-books">{profile.favorites.map((id) => { const work = workById(id); return <button type="button" key={id} onClick={() => onOpenWork(id)}><CompactCover work={work} className="favorite-cover" /><span><strong>{work.title}</strong><small>{work.author}</small></span></button>; })}</div>
        </section>
        <section className="profile-section" aria-labelledby="profile-lists-title">
          <div className="profile-section-heading"><p className="eyebrow">Listes publiques</p><h2 id="profile-lists-title">Composer des chemins</h2></div>
          <button className="profile-list-entry" type="button" onClick={onOpenList}><span><strong>Habiter les lieux qui nous quittent</strong><small>6 œuvres · Une sélection sur les paysages qui deviennent mémoire.</small></span><span aria-hidden="true">→</span></button>
          <div className="profile-list-entry static-entry"><span><strong>Veilles, fenêtres et lumières tardives</strong><small>4 œuvres · Des présences aperçues lorsque la ville se tait.</small></span></div>
        </section>
        <section className="profile-section" aria-labelledby="profile-reviews-title">
          <div className="profile-section-heading"><p className="eyebrow">Critiques choisies</p><h2 id="profile-reviews-title">Quelques traces publiques</h2></div>
          <article className="profile-review"><button type="button" onClick={() => onOpenWork(profile.favorites[0])}>{workById(profile.favorites[0]).title}</button><p>Une œuvre qui laisse les lieux agir sur les personnages au lieu de les réduire à un décor. Sa force tient à ce déplacement presque imperceptible.</p></article>
          <article className="profile-review"><button type="button" onClick={() => onOpenWork(profile.favorites[1])}>{workById(profile.favorites[1]).title}</button><p>Le livre avance par signes minuscules et finit par composer une géographie très précise de l’attention.</p></article>
        </section>
      </div>
    </section>
  );
}

type HonorsProps = {
  owner: "self" | "lina";
  equippedTitle: string;
  onEquip: (title: string) => void;
  showcase: BadgeId[];
  onToggleShowcase: (id: BadgeId) => void;
  onBack: () => void;
};

export function HonorsView({ owner, equippedTitle, onEquip, showcase, onToggleShowcase, onBack }: HonorsProps) {
  const isSelf = owner === "self";
  const items: { id: BadgeId; locked?: boolean }[] = isSelf
    ? [
        { id: "reading2" }, { id: "reading3", locked: true },
        { id: "exploration2" }, { id: "exploration3", locked: true },
        { id: "expression2" }, { id: "expression3", locked: true },
        { id: "relation2" }, { id: "relation3", locked: true },
        { id: "honor1" }, { id: "honor2" },
      ]
    : [{ id: "reading3" }, { id: "exploration2" }, { id: "expression3" }, { id: "relation2" }, { id: "honor1" }];
  const [selected, setSelected] = useState<BadgeId | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOutside = (event: globalThis.PointerEvent) => {
      if (selected && wallRef.current && !wallRef.current.contains(event.target as Node)) setSelected(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [selected]);

  return (
    <section className="destination-page honors-page" aria-labelledby="honors-title">
      <button className="text-action back-action" type="button" onClick={onBack}>← Retour au profil</button>
      <header className="destination-heading honors-heading">
        <p className="eyebrow">{isSelf ? "Votre parcours" : "Distinctions acquises"}</p>
        <h1 id="honors-title">Chapitres d’honneur</h1>
        <p>{isSelf ? "Vos évolutions actuelles, les prochains horizons et les accomplissements qui consacrent votre parcours." : "Les dernières évolutions et les honneurs obtenus par Lina. Ses objectifs en cours restent privés."}</p>
      </header>
      <div ref={wallRef} className="honor-wall" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSelected(null); }} onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setSelected(null); }}>
        {items.map(({ id, locked }) => {
          const badge = badgeCatalog[id];
          const open = selected === id;
          const highlighted = showcase.includes(id);
          return (
            <div className={`honor-cell ${locked ? "locked" : ""}`} key={id}>
              <button type="button" className="honor-badge-button" aria-expanded={open} onClick={() => setSelected(open ? null : id)} onMouseEnter={() => setSelected(id)} onFocus={() => setSelected(id)}>
                <BadgeImage badgeId={id} locked={locked} />
                <span>{badge.title}</span>
                {locked && <small>Prochain</small>}
              </button>
              {open && (
                <div className="honor-detail" role="status">
                  <strong>{badge.title}</strong>
                  <p>{badge.description}</p>
                  {isSelf && locked && "progress" in badge && <span>{badge.progress}</span>}
                  {isSelf && !locked && <div className="honor-detail-actions"><button className="text-action" type="button" disabled={equippedTitle === badge.title} onClick={() => onEquip(badge.title)}>{equippedTitle === badge.title ? "Titre affiché sous mon nom" : "Afficher ce titre sous mon nom"}</button><button className="text-action" type="button" disabled={!highlighted && showcase.length >= 3} onClick={() => onToggleShowcase(id)}>{highlighted ? "Retirer ce badge du profil" : showcase.length >= 3 ? "Trois badges déjà affichés" : "Afficher ce badge sur mon profil"}</button></div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isSelf && <p className="honors-note">Seuls vos acquis sont visibles par les autres lecteurs. Les badges grisés et leurs progressions restent privés.</p>}
    </section>
  );
}

export function PublicListView({ works, following, onToggleFollow, onOpenProfile, onOpenWork, onBack }: { works: readonly SocialWork[]; following: boolean; onToggleFollow: () => void; onOpenProfile: () => void; onOpenWork: (id: string) => void; onBack: () => void }) {
  const chosen = ["miroirs", "rivage", "cartographies", "lucioles", "atlas", "sel"].map((id) => works.find((work) => work.id === id) ?? works[0]);
  return (
    <section className="destination-page public-list-page" aria-labelledby="list-page-title">
      <button className="text-action back-action" type="button" onClick={onBack}>← Retour à Découvrir</button>
      <header className="public-list-heading">
        <p className="eyebrow">Liste publique</p>
        <h1 id="list-page-title">Habiter les lieux qui nous quittent</h1>
        <p>Six récits où les maisons, les villes et les rivages ne sont jamais de simples décors : ils conservent ce que les personnages n’arrivent plus à porter seuls.</p>
        <div className="list-author-row"><button className="identity-link" type="button" onClick={onOpenProfile}><span className="avatar">LM</span><span><strong>Lina Morel</strong><small>Autrice de la liste</small></span></button><button className="quiet-action" type="button" aria-pressed={following} onClick={onToggleFollow}>{following ? "Suivie" : "Suivre"}</button></div>
      </header>
      <div className="public-list-works">{chosen.map((work, index) => <article key={work.id}><span className="list-index">{String(index + 1).padStart(2, "0")}</span><button type="button" className="public-list-work" onClick={() => onOpenWork(work.id)}><CompactCover work={work} className="public-list-cover" /><span><strong>{work.title}</strong><small>{work.author} · {work.meta}</small><p>{index % 2 === 0 ? "Un lieu qui agit sur la mémoire et oblige à regarder autrement ce qui semblait familier." : "Une géographie intime, traversée par les voix de celles et ceux qui y ont vécu."}</p></span></button></article>)}</div>
    </section>
  );
}

type Reply = { id: string; name: string; initials: string; text: string; date: string };
type SocialReview = { id: string; name: string; initials: string; rating: number; date: string; text: string; followed?: boolean; own?: boolean };

const socialReviews: SocialReview[] = [
  { id: "lina", name: "Lina Morel", initials: "LM", rating: 5, date: "18 août 2026", followed: true, text: "Un roman qui avance comme une carte que l’on dessine en marchant. J’ai aimé la précision des images et cette sensation persistante que nos souvenirs ne sont jamais aussi fixes qu’on le croit." },
  { id: "theo", name: "Théo Renaud", initials: "TR", rating: 4, date: "12 août 2026", text: "Une écriture ample, parfois exigeante, mais toujours habitée. Le dernier tiers donne une profondeur inattendue à tout ce qui précédait." },
  { id: "ines", name: "Inès Naël", initials: "IN", rating: 4, date: "3 août 2026", text: "J’y suis entrée lentement, puis je n’ai plus voulu quitter cet univers. Une très belle réflexion sur les lieux que l’on emporte avec soi." },
];

export function SocialReviews({ workId, personalReview, personalRating, onOpenProfile, onWriteReview }: { workId: string; personalReview: string; personalRating: number; onOpenProfile: () => void; onWriteReview: () => void }) {
  const contextualReviews = workId === "sel" ? [] : workId === "lucioles" ? socialReviews.slice(0, 1) : socialReviews;
  const reviews = personalReview ? [{ id: "self", name: "Maël Depréville", initials: "MD", rating: personalRating, date: "Aujourd’hui", text: personalReview, own: true }, ...contextualReviews] : contextualReviews;
  const [expanded, setExpanded] = useState<string[]>([]);
  const [composer, setComposer] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<{ name: string; text: string } | null>(null);
  const [editingReply, setEditingReply] = useState<{ reviewId: string; replyId: string } | null>(null);
  const [blockedNames, setBlockedNames] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [closed, setClosed] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [replies, setReplies] = useState<Record<string, Reply[]>>({
    lina: [
      { id: "r1", name: "Théo Renaud", initials: "TR", date: "19 août", text: "La carte qui se fabrique en marchant, c’est exactement ce qui m’a retenu aussi." },
      { id: "r2", name: "Lina Morel", initials: "LM", date: "19 août", text: "Oui — et elle accepte de rester incomplète, ce qui change tout à la fin." },
    ],
    theo: [{ id: "r3", name: "Inès Naël", initials: "IN", date: "13 août", text: "Le dernier tiers m’a aussi fait relire les premières pages autrement." }],
  });

  const publishReply = (reviewId: string) => {
    if (!draft.trim()) return;
    setReplies((current) => editingReply ? {
      ...current,
      [reviewId]: (current[reviewId] ?? []).map((reply) => reply.id === editingReply.replyId ? { ...reply, text: draft.trim(), date: "Modifiée à l’instant" } : reply),
    } : ({ ...current, [reviewId]: [...(current[reviewId] ?? []), { id: `${reviewId}-${Date.now()}`, name: "Maël Depréville", initials: "MD", date: "À l’instant", text: `${replyingTo ? `@${replyingTo.name} ` : ""}${draft.trim()}` }] }));
    setExpanded((current) => current.includes(reviewId) ? current : [...current, reviewId]);
    setComposer(null);
    setReplyingTo(null);
    setEditingReply(null);
    setDraft("");
  };

  const renderReview = (review: SocialReview, compact = false) => {
    const reviewReplies = (replies[review.id] ?? []).filter((reply) => !blockedNames.includes(reply.name));
    const isExpanded = expanded.includes(review.id);
    const isClosed = closed.includes(review.id);
    const latest = reviewReplies.at(-1);
    return (
      <article className={`review social-review ${compact ? "compact-review" : ""}`} key={review.id}>
        <header className="review-header">
          <button className="avatar avatar-button" type="button" onClick={review.name === "Lina Morel" ? onOpenProfile : undefined}>{review.initials}</button>
          <div><h3>{review.name}</h3><p>{review.date}</p></div>
          {review.rating > 0 && <span className="review-stars" aria-label={`${review.rating} étoiles sur 5`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>}
        </header>
        <p className="review-copy">{review.text}</p>
        {review.own && <button className="text-action conversation-toggle" type="button" onClick={() => setClosed((current) => isClosed ? current.filter((id) => id !== review.id) : [...current, review.id])}>{isClosed ? "Rouvrir les réponses" : "Fermer les réponses"}</button>}
        {latest && !isExpanded && <div className="reply-preview"><span className="avatar">{latest.initials}</span><p><strong>{latest.name}</strong>{latest.text}</p></div>}
        {reviewReplies.length > 0 && <button className="text-action conversation-toggle" type="button" aria-expanded={isExpanded} onClick={() => setExpanded((current) => isExpanded ? current.filter((id) => id !== review.id) : [...current, review.id])}>{isExpanded ? "Réduire" : `Voir la conversation · ${reviewReplies.length}`}</button>}
        {isExpanded && <div className="reply-list">{reviewReplies.map((reply) => <article key={reply.id} className="reply"><span className="avatar">{reply.initials}</span><div><header><strong>{reply.name}</strong><small>{reply.date}</small></header><p>{reply.text}</p><div>{reply.name === "Maël Depréville" ? <><button className="text-action" type="button" onClick={() => { setComposer(review.id); setReplyingTo(null); setEditingReply({ reviewId: review.id, replyId: reply.id }); setDraft(reply.text); }}>Modifier</button><button className="text-action muted-action" type="button" onClick={() => setReplies((current) => ({ ...current, [review.id]: (current[review.id] ?? []).filter((item) => item.id !== reply.id) }))}>Supprimer</button></> : <><button className="text-action" type="button" onClick={() => { setComposer(review.id); setReplyingTo({ name: reply.name, text: reply.text }); setEditingReply(null); setDraft(""); }}>Répondre</button><button className="text-action muted-action" type="button" onClick={() => setNotice("Réponse signalée. Elle reste visible pendant son examen.")}>Signaler</button><button className="text-action muted-action" type="button" onClick={() => { setBlockedNames((current) => [...current, reply.name]); setNotice(`${reply.name} est bloqué·e. Ses réponses sont masquées et les interactions directes sont désactivées.`); }}>Bloquer</button></>}</div></div></article>)}</div>}
        {isClosed ? <p className="conversation-closed">Conversation fermée · l’historique reste visible.</p> : <button className="text-action reply-action" type="button" onClick={() => { setComposer(review.id); setReplyingTo(null); setEditingReply(null); setDraft(""); }}>Répondre</button>}
        {composer === review.id && !isClosed && <div className="inline-composer">{replyingTo && <div className="reply-context"><p>En réponse à <strong>{replyingTo.name}</strong> <button type="button" aria-label="Retirer la mention" onClick={() => setReplyingTo(null)}>×</button></p><blockquote>{replyingTo.text.length > 90 ? `${replyingTo.text.slice(0, 90)}…` : replyingTo.text}</blockquote></div>}<label><span className="sr-only">Votre réponse</span><textarea autoFocus rows={3} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Poursuivre la conversation…" /></label><div><button className="quiet-action" type="button" onClick={() => { setComposer(null); setReplyingTo(null); setEditingReply(null); setDraft(""); }}>Annuler</button><button className="primary-action" type="button" disabled={!draft.trim()} onClick={() => publishReply(review.id)}>{editingReply ? "Enregistrer" : "Publier"}</button></div></div>}
      </article>
    );
  };

  const followedReviews = reviews.filter((review) => review.followed).slice(0, 3);
  const generalReviews = reviews.filter((review) => !review.followed);
  return (
    <div className="social-reviews">
      {notice && <div className="conversation-notice" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>Fermer</button></div>}
      {followedReviews.length > 0 && <section className="review-group followed-review-group" aria-labelledby="followed-reviews-title"><h3 id="followed-reviews-title">De personnes que vous suivez</h3>{followedReviews.map((review, index) => renderReview(review, index > 0))}</section>}
      {(generalReviews.length > 0 || followedReviews.length === 0) && <section className="review-group" aria-labelledby="all-reviews-title"><h3 id="all-reviews-title">Toutes les critiques</h3>{generalReviews.length > 0 ? generalReviews.map((review) => renderReview(review)) : <div className="empty-reviews"><p>Aucune critique publiée.</p><button className="text-action" type="button" onClick={onWriteReview}>Écrire une critique</button></div>}</section>}
    </div>
  );
}

type PhotoCropperProps = { currentPhoto: string | null; onClose: () => void; onSave: (photo: string) => void };

export function PhotoCropper({ currentPhoto, onClose, onSave }: PhotoCropperProps) {
  const [source, setSource] = useState<string | null>(currentPhoto);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const transformRef = useRef({ x: 0, y: 0, zoom: 1 });
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const gestureRef = useRef({ x: 0, y: 0, distance: 0, zoom: 1 });
  const frameRef = useRef(0);
  const objectUrlRef = useRef<string | null>(null);
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
      imageRef.current.style.transform = `translate(calc(-50% + ${value.x}px), calc(-50% + ${value.y}px)) scale(${base * value.zoom})`;
      if (previewRef.current) {
        const ratio = 112 / CROP;
        previewRef.current.style.transform = `translate(calc(-50% + ${value.x * ratio}px), calc(-50% + ${value.y * ratio}px)) scale(${base * value.zoom * ratio})`;
      }
    });
  };

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    window.cancelAnimationFrame(frameRef.current);
  }, []);

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
    setError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setError("Choisissez une image JPEG, PNG ou WebP.");
    if (file.size > 8 * 1024 * 1024) return setError("Cette image dépasse 8 Mo.");
    const url = URL.createObjectURL(file);
    const probe = new window.Image();
    probe.onload = () => {
      if (Math.min(probe.naturalWidth, probe.naturalHeight) < 512) {
        URL.revokeObjectURL(url);
        setError("Le petit côté de l’image doit mesurer au moins 512 px pour rester net.");
        return;
      }
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = url;
      setSource(url);
      setDimensions({ width: probe.naturalWidth, height: probe.naturalHeight });
      transformRef.current = { x: 0, y: 0, zoom: 1 };
      updateZoom(1);
    };
    probe.onerror = () => { URL.revokeObjectURL(url); setError("Cette image ne peut pas être lue."); };
    probe.src = url;
  };

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointersRef.current.values()];
    if (points.length === 1) gestureRef.current = { x: points[0].x - transformRef.current.x, y: points[0].y - transformRef.current.y, distance: 0, zoom: transformRef.current.zoom };
    if (points.length === 2) gestureRef.current = { ...gestureRef.current, distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y), zoom: transformRef.current.zoom };
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointersRef.current.values()];
    if (points.length === 1) clampAndPaint({ ...transformRef.current, x: points[0].x - gestureRef.current.x, y: points[0].y - gestureRef.current.y });
    if (points.length === 2 && gestureRef.current.distance) {
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const nextZoom = Math.max(1, Math.min(3, gestureRef.current.zoom * distance / gestureRef.current.distance));
      updateZoom(nextZoom);
    }
  };

  const pointerUp = (event: ReactPointerEvent<HTMLDivElement>) => { pointersRef.current.delete(event.pointerId); };
  const wheelZoom = (event: WheelEvent<HTMLDivElement>) => { event.preventDefault(); updateZoom(transformRef.current.zoom - event.deltaY * 0.0015); };

  const saveCrop = () => {
    if (!source || !imageRef.current || !dimensions.width) return setError("Choisissez d’abord une image à recadrer.");
    const base = Math.max(CROP / dimensions.width, CROP / dimensions.height);
    const scale = base * transformRef.current.zoom;
    const sourceSize = CROP / scale;
    const sourceX = (dimensions.width - sourceSize) / 2 - transformRef.current.x / scale;
    const sourceY = (dimensions.height - sourceSize) / 2 - transformRef.current.y / scale;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext("2d");
    if (!context) return setError("Le recadrage n’a pas pu être créé.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(imageRef.current, sourceX, sourceY, sourceSize, sourceSize, 0, 0, 1024, 1024);
    onSave(canvas.toDataURL("image/webp", 0.9));
    onClose();
  };

  return (
    <div className="overlay photo-overlay" role="dialog" aria-modal="true" aria-labelledby="photo-crop-title">
      <button className="overlay-backdrop" type="button" aria-label="Fermer sans enregistrer" onClick={onClose} />
      <section className="photo-crop-modal">
        <div className="modal-heading"><div><p className="eyebrow">Photo facultative</p><h2 id="photo-crop-title">Recadrer la photo</h2></div><button className="close-button" type="button" aria-label="Fermer" onClick={onClose}>×</button></div>
        <div className="photo-crop-layout">
          <div className="crop-stage" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onWheel={wheelZoom}>
            {source ? <img ref={imageRef} src={source} alt="Image à recadrer" draggable={false} onLoad={(event) => { const image = event.currentTarget; if (!dimensions.width) setDimensions({ width: image.naturalWidth, height: image.naturalHeight }); clampAndPaint(); }} /> : <span>Choisissez une image</span>}
            <span className="crop-guide" aria-hidden="true" />
          </div>
          <div className="crop-preview"><span>Aperçu</span><div>{source ? <img ref={previewRef} src={source} alt="" /> : <span>MD</span>}</div></div>
        </div>
        <div className="photo-controls">
          <label className="file-action"><span>{source ? "Choisir une autre image" : "Choisir une image"}</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => chooseFile(event.target.files?.[0])} /></label>
          <label className="zoom-control"><span>Zoom</span><input type="range" min="1" max="3" step="0.01" value={zoom} disabled={!source} onChange={(event) => updateZoom(Number(event.target.value))} /></label>
          <p>Déplacez l’image directement. Sur mobile, pincez pour zoomer.</p>
          {error && <p className="photo-error" role="alert">{error}</p>}
        </div>
        <div className="modal-actions"><button className="quiet-action" type="button" onClick={onClose}>Annuler</button><button className="primary-action" type="button" disabled={!source} onClick={saveCrop}>Enregistrer</button></div>
      </section>
    </div>
  );
}
