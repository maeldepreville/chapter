"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import { CoverFrame } from "./cover-frame";
import { Button, Dialog, Field, Input, Textarea } from "./foundation/primitives";
import type { ReadingStatus, Work } from "./foundation/contracts";
import { publicListCatalog, publicListIds, type PublicListId } from "./catalogue";
import { profilePresentations, prototypeActors, type ProfileOwner } from "./prototype-data";

type PublicViewProps = {
  works: readonly Work[];
  onOpenWork: (id: string) => void;
};

const normalize = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("fr")
  .trim();

function PublicCover({ work, className = "p1-cover" }: { work: Work; className?: string }) {
  return (
    <CoverFrame work={work} className={className} sizes="(max-width: 899px) 42vw, 300px" priority={className.includes("featured")}>
      <span className="p1-cover-copy" aria-hidden="true">
        <small>CHAPTER</small>
        <strong>{work.title}</strong>
        <span>{work.author}</span>
      </span>
    </CoverFrame>
  );
}

function WorkTextButton({ work, onOpen, note }: { work: Work; onOpen: () => void; note?: string }) {
  return (
    <button className="p1-work-line" type="button" onClick={onOpen}>
      <span>
        <strong>{work.title}</strong>
        <small>{work.author}</small>
      </span>
      {note && <em>{note}</em>}
      <span className="p1-line-arrow" aria-hidden="true">↗</span>
    </button>
  );
}

export function PublicDiscover({ works, onOpenWork, onOpenSearch }: PublicViewProps & { onOpenSearch: () => void }) {
  const featured = works[0];
  const paths = works.slice(1, 4);
  const shelf = works.slice(4, 6);

  if (!featured) {
    return <section className="p1-empty"><p className="eyebrow">Découvrir</p><h1>Aucune œuvre n’est disponible pour le moment.</h1></section>;
  }

  return (
    <section className="p1-public-page p1-discover" aria-labelledby="p1-discover-title">
      <header className="p1-intro">
        <div className="p1-intro-copy">
          <p className="eyebrow">Revue littéraire · journal personnel</p>
          <h1 id="p1-discover-title">Ici, on commence par une œuvre.</h1>
          <p>Pour retrouver un livre, garder ce qu’il vous a laissé et, quand vous le choisissez, ouvrir un chemin vers d’autres lecteurs.</p>
          <button className="p1-search-call" type="button" onClick={onOpenSearch}><span aria-hidden="true">⌕</span> Rechercher un titre ou un auteur</button>
        </div>
        <figure className="p1-intro-illustration">
          <Image
            src="/editorial/p1-reading-trace.webp"
            alt="Un livre ouvert dont le marque-page rouge rejoint un autre ouvrage."
            width={1400}
            height={1050}
            sizes="(max-width: 899px) calc(100vw - 2rem), 58vw"
            unoptimized
            priority
          />
          <figcaption><span>En marge</span> Une lecture, une trace, un chemin.</figcaption>
        </figure>
      </header>

      <section className="p1-featured" aria-labelledby="p1-featured-title">
        <div className="p1-featured-art">
          <span className="p1-folio" aria-hidden="true">01</span>
          <button type="button" onClick={() => onOpenWork(featured.id)} aria-label={`Ouvrir ${featured.title}`}>
            <PublicCover work={featured} className="p1-cover p1-cover--featured" />
          </button>
        </div>
        <div className="p1-featured-copy">
          <p className="eyebrow">Une œuvre pour entrer</p>
          <h2 id="p1-featured-title">{featured.title}</h2>
          <p className="p1-byline">{featured.author} · {featured.meta}</p>
          <p className="p1-lede">{featured.lede}</p>
          <button className="chapter-button chapter-button--primary" type="button" onClick={() => onOpenWork(featured.id)}>Ouvrir l’œuvre</button>
        </div>
      </section>

      <section className="p1-paths" aria-labelledby="p1-paths-title">
        <header>
          <p className="eyebrow">Trois directions</p>
          <h2 id="p1-paths-title">Choisir une sensation plutôt qu’un classement</h2>
        </header>
        <div className="p1-path-grid">
          {paths.map((work, index) => (
            <article key={work.id}>
              <p className="p1-path-number">0{index + 2}</p>
              <button className="p1-path-cover" type="button" onClick={() => onOpenWork(work.id)} aria-label={`Ouvrir ${work.title}`}><PublicCover work={work} /></button>
              <p className="p1-path-mood">{["Pour changer de rythme", "Pour habiter la nuit", "Pour suivre une lumière"][index]}</p>
              <h3><button type="button" onClick={() => onOpenWork(work.id)}>{work.title}</button></h3>
              <p>{work.lede}</p>
              <span>{work.author}</span>
            </article>
          ))}
        </div>
      </section>

      {shelf.length > 0 && (
        <section className="p1-shelf" aria-labelledby="p1-shelf-title">
          <div>
            <p className="eyebrow">Encore quelques pages</p>
            <h2 id="p1-shelf-title">Poursuivre l’exploration</h2>
            <p>Des œuvres retenues pour ce qu’elles déplacent, pas pour occuper une vitrine.</p>
          </div>
          <div>{shelf.map((work) => <WorkTextButton key={work.id} work={work} onOpen={() => onOpenWork(work.id)} note={work.genre} />)}</div>
        </section>
      )}
    </section>
  );
}

export function PublicSearch({ works, onOpenWork, query: controlledQuery, onQueryChange, onOpenProfile, onOpenList }: PublicViewProps & { query?: string; onQueryChange?: (query: string) => void; onOpenProfile?: (owner: ProfileOwner) => void; onOpenList?: (listId: PublicListId) => void }) {
  const [localQuery, setLocalQuery] = useState("");
  const query = controlledQuery ?? localQuery;
  const setQuery = (value: string) => {
    setLocalQuery(value);
    onQueryChange?.(value);
  };
  const results = useMemo(() => {
    const normalized = normalize(query);
    if (!normalized) return works;
    return works.filter((work) => normalize(`${work.title} ${work.author}`).includes(normalized));
  }, [query, works]);
  const socialQuery = normalize(query);
  const readerResults = socialQuery && onOpenProfile ? (["self", "lina", "theo", "ines"] as ProfileOwner[]).filter((owner) => {
    const presentation = profilePresentations[owner];
    const actor = prototypeActors[presentation.actorId];
    return normalize(`${actor.name} ${presentation.defaultTitle}`).includes(socialQuery);
  }) : [];
  const listResults = socialQuery && onOpenList ? publicListIds.filter((id) => normalize(`${publicListCatalog[id].title} ${publicListCatalog[id].description}`).includes(socialQuery)) : [];

  return (
    <section className="p1-public-page p1-search" aria-labelledby="p1-search-title">
      <header className="p1-search-opening">
        <div className="p1-search-heading">
          <p className="eyebrow">Recherche publique</p>
          <h1 id="p1-search-title">Retrouver une œuvre ou une voix</h1>
          <p>Un titre, un auteur, un lecteur ou une liste suffit. Aucun compte n’est nécessaire pour consulter ces chemins publics.</p>
        </div>
        <figure className="p1-search-sketch" aria-hidden="true">
          <Image src="/editorial/p2-search-atlas.webp" alt="" width={1440} height={960} sizes="(max-width: 899px) 92vw, 56vw" unoptimized priority />
        </figure>
        <p className="p1-search-margin-note" aria-hidden="true"><span>Index</span> Chercher par le texte,<br />retrouver par la trace.</p>
      </header>
      <label className="p1-search-field">
        <span className="sr-only">Rechercher un titre, un auteur, un lecteur ou une liste</span>
        <span aria-hidden="true">⌕</span>
        <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titre, auteur, lecteur ou liste" />
        {query && <button type="button" onClick={() => setQuery("")}>Effacer</button>}
      </label>
      <div className="p1-search-summary" aria-live="polite">
        <span>{query ? `${results.length} œuvre${results.length > 1 ? "s" : ""} · ${readerResults.length + listResults.length} chemin${readerResults.length + listResults.length > 1 ? "s" : ""}` : "Sélection de départ"}</span>
        <span>{works.length} œuvres disponibles</span>
      </div>
      {results.length > 0 ? (
        <div className="p1-search-results">
          {results.map((work, index) => (
            <article key={work.id}>
              <span className="p1-result-index">{String(index + 1).padStart(2, "0")}</span>
              <WorkTextButton work={work} onOpen={() => onOpenWork(work.id)} note={`${work.genre} · ${work.year}`} />
            </article>
          ))}
        </div>
      ) : readerResults.length === 0 && listResults.length === 0 ? (
        <div className="p1-search-empty">
          <h2>Aucune œuvre ne correspond à « {query} ».</h2>
          <p>Essayez le nom de l’auteur, un mot du titre ou revenez à la sélection complète.</p>
          <button className="chapter-button chapter-button--quiet" type="button" onClick={() => setQuery("")}>Voir toutes les œuvres</button>
        </div>
      ) : null}
      {(readerResults.length > 0 || listResults.length > 0) && (
        <section className="p4-search-social" aria-labelledby="p4-search-social-title">
          <div className="p1-section-mark"><span>02</span><h2 id="p4-search-social-title">Lecteurs et listes</h2></div>
          <div className="p4-search-social-results">
            {readerResults.map((owner) => {
              const presentation = profilePresentations[owner];
              const actor = prototypeActors[presentation.actorId];
              return <button type="button" key={owner} onClick={() => onOpenProfile?.(owner)}><span className="avatar">{actor.initials}</span><span><strong>{actor.name}</strong><small>{presentation.defaultTitle} · Profil public</small></span><span aria-hidden="true">→</span></button>;
            })}
            {listResults.map((id) => <button type="button" key={id} onClick={() => onOpenList?.(id)}><span className="p4-list-glyph" aria-hidden="true">§</span><span><strong>{publicListCatalog[id].title}</strong><small>Liste publique · {publicListCatalog[id].workIds.length} œuvres</small></span><span aria-hidden="true">→</span></button>)}
          </div>
        </section>
      )}
    </section>
  );
}

export type FirstMarkerRecord = { status: ReadingStatus; marker: string };

const personalIntroContent = {
  journal: {
    eyebrow: "Journal personnel · privé",
    title: "Ce que vous lisez mérite mieux qu’un compteur.",
    description: "Le Journal rassemble les lectures en cours, les repères que vous choisissez de garder et les traces auxquelles vous voudrez revenir.",
    steps: [
      ["Reprendre", "Retrouvez immédiatement la lecture qui vous accompagne."],
      ["Garder", "Consignez une phrase, une impression ou une page, uniquement pour vous."],
      ["Relire", "Voyez se construire la mémoire de vos lectures au fil du temps."],
    ],
    note: "Votre Journal est encore vierge. Il prendra forme dès votre première œuvre.",
  },
  library: {
    eyebrow: "Bibliothèque personnelle · privée",
    title: "Une bibliothèque pour choisir, pas pour compter.",
    description: "La Bibliothèque garde les œuvres que vous souhaitez lire, celles qui vous accompagnent et celles qui ont déjà laissé une trace.",
    steps: [
      ["À lire", "Préparez les prochaines œuvres sans perdre le chemin qui vous y a mené."],
      ["En cours", "Situez vos lectures présentes et reprenez-les depuis votre Journal."],
      ["Lu", "Retrouvez une œuvre par son titre, son auteur ou votre dernière activité."],
    ],
    note: "Votre Bibliothèque est encore vierge. Une première œuvre suffit pour l’ouvrir.",
  },
} as const;

export function PublicPersonalIntro({ kind, onExplore, onSearch }: {
  kind: "journal" | "library";
  onExplore: () => void;
  onSearch: () => void;
}) {
  const content = personalIntroContent[kind];
  const titleId = `p1-${kind}-intro-title`;
  const asset = kind === "journal"
    ? { src: "/editorial/p4-journal-threshold.webp", width: 600, height: 900 }
    : { src: "/editorial/p4-library-threshold.webp", width: 1100, height: 733 };

  return (
    <section className={`p1-public-page p1-personal-intro p1-personal-intro--${kind}`} aria-labelledby={titleId}>
      <header className="p1-personal-intro-opening">
        <div className="p1-personal-intro-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id={titleId}>{content.title}</h1>
          <p>{content.description}</p>
        </div>
        <div className="p1-personal-intro-action">
            <button className="p1-personal-intro-primary" type="button" onClick={onExplore}>
              <span className="p1-personal-intro-assets" aria-hidden="true">
                <Image className="p1-personal-intro-asset" src={asset.src} alt="" width={asset.width} height={asset.height} sizes="(max-width: 899px) 70vw, 30vw" unoptimized />
              </span>
              <span className="p1-personal-intro-primary-copy">
                <small>Votre première action</small>
                <strong>{kind === "journal" ? "Commencer le Journal par une œuvre" : "Choisir une première œuvre"}</strong>
                <span>{kind === "journal" ? "Explorez les chemins de Chapter et gardez ce que votre lecture vous laisse." : "Parcourez les chemins éditoriaux avant de décider ce que vous souhaitez lire."}</span>
                <em>Ouvrir Découvrir <b aria-hidden="true">→</b></em>
              </span>
            </button>
          <div className="p1-personal-intro-alternatives"><span>Vous avez déjà un titre en tête ?</span><button type="button" onClick={onSearch}>Rechercher un titre</button></div>
        </div>
      </header>
      <section className="p1-personal-intro-details" aria-labelledby={`${titleId}-details`}>
        <div><p className="eyebrow">Ce qui se construit</p><h2 id={`${titleId}-details`}>{content.note}</h2><small>Aucun profil public n’est nécessaire pour conserver une lecture.</small></div>
        <ol className="p1-personal-intro-preview" aria-label={kind === "journal" ? "Fonctions du Journal" : "Fonctions de la Bibliothèque"}>
          {content.steps.map(([label, description], index) => (
            <li key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><small>{description}</small></li>
          ))}
        </ol>
      </section>
    </section>
  );
}

export function PublicWork({ work, works, onBack, onOpenWork, onActivate, onSaveMarker, onOpenJournal, activated = false, record, backLabel = "Retour à Découvrir", social }: {
  work: Work;
  works: readonly Work[];
  onBack: () => void;
  onOpenWork: (id: string) => void;
  onActivate: (status: ReadingStatus) => void;
  onSaveMarker: (marker: string) => void;
  onOpenJournal?: () => void;
  activated?: boolean;
  record?: FirstMarkerRecord;
  backLabel?: string;
  social?: ReactNode;
}) {
  const related = works.filter((candidate) => candidate.id !== work.id).slice(0, 3);
  const [statusOpen, setStatusOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ReadingStatus | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [markerDraft, setMarkerDraft] = useState(record?.marker ?? "");
  const [markerOpen, setMarkerOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const chooseStatus = (status: ReadingStatus) => {
    setStatusOpen(false);
    setPendingStatus(status);
    if (activated) {
      onActivate(status);
      setMarkerOpen(!record?.marker);
      setFeedback(`Statut « ${status} » enregistré en privé.`);
      return;
    }
    setAuthOpen(true);
  };

  const finishAccount = () => {
    if (!pendingStatus || !email.trim() || password.length < 8) return;
    onActivate(pendingStatus);
    setAuthOpen(false);
    setMarkerOpen(true);
    setFeedback(`Votre compte est prêt. « ${pendingStatus} » a bien été conservé.`);
  };

  const saveMarker = () => {
    const marker = markerDraft.trim();
    if (!marker) return;
    onSaveMarker(marker);
    setMarkerOpen(false);
    setFeedback("Votre premier repère privé est enregistré.");
  };

  return (
    <article className="p1-public-page p1-public-work" aria-labelledby="p1-work-title">
      <button className="p1-back" type="button" onClick={onBack}><span aria-hidden="true">←</span> {backLabel}</button>
      <header className="p1-work-opening p2-work-opening">
        <div className="p1-work-cover-stage"><PublicCover work={work} className="p1-cover p1-cover--work" /></div>
        <div className="p1-work-identity">
          <p className="eyebrow">{work.meta}</p>
          <h1 id="p1-work-title">{work.title}</h1>
          <p className="p1-work-author">de {work.author}</p>
          <p className="p1-lede">{work.lede}</p>
          <div className="p2-action-cluster">
            <div className={`p2-status-control ${statusOpen ? "open" : ""}`}>
              <Button aria-expanded={statusOpen} aria-controls="p2-status-menu" onClick={() => setStatusOpen((open) => !open)}>
                {record?.status ?? "Ajouter au journal"}<span aria-hidden="true">⌄</span>
              </Button>
              {statusOpen && (
                <div className="p2-status-menu" id="p2-status-menu" role="dialog" aria-label="Choisir un statut de lecture">
                  <p>Où en êtes-vous ?</p>
                  <div>{(["À lire", "En cours", "Lu"] as ReadingStatus[]).map((status) => <button className={record?.status === status ? "selected" : ""} type="button" key={status} onClick={() => chooseStatus(status)}>{status}</button>)}</div>
                  <small>Ce choix reste privé.</small>
                </div>
              )}
            </div>
            <p>Gardez cette œuvre et ce qu’elle vous laisse. Rien n’est publié.</p>
          </div>
          {!activated && pendingStatus && !authOpen && (
            <div className="p2-pending" role="status">
              <span><small>Geste conservé</small><strong>{pendingStatus}</strong></span>
              <button type="button" onClick={() => setAuthOpen(true)}>Reprendre l’inscription</button>
            </div>
          )}
          {activated && record && (
            <section className="p2-first-marker" aria-labelledby="p2-marker-title">
              <div>
                <p className="eyebrow">Votre premier repère</p>
                <h2 id="p2-marker-title">Une trace à retrouver plus tard</h2>
                <p className="p2-privacy">Privée · visible uniquement par vous</p>
              </div>
              {markerOpen ? (
                <div className="p2-marker-editor">
                  <label htmlFor="p2-marker">Qu’aimeriez-vous garder de cette lecture ?</label>
                  <Textarea id="p2-marker" autoFocus maxLength={500} value={markerDraft} onChange={(event) => setMarkerDraft(event.target.value)} placeholder="Une phrase, une impression, une idée…" />
                  <div><button type="button" onClick={() => { setMarkerDraft(record.marker); setMarkerOpen(false); }}>Plus tard</button><Button disabled={!markerDraft.trim()} onClick={saveMarker}>Enregistrer le repère</Button></div>
                </div>
              ) : record.marker ? (
                <div className="p2-marker-saved"><blockquote>{record.marker}</blockquote><button type="button" onClick={() => { setMarkerDraft(record.marker); setMarkerOpen(true); }}>Modifier</button></div>
              ) : (
                <Button variant="quiet" onClick={() => setMarkerOpen(true)}>Poser un premier repère</Button>
              )}
              {!markerOpen && onOpenJournal && (
                <div className="p2-space-confirmation">
                  <p><strong>{record.marker ? "Votre première trace est enregistrée dans votre Journal." : "Cette œuvre est enregistrée dans votre Journal."}</strong><span>Vous pourrez la retrouver ici, sans rien rendre public.</span></p>
                  <div className="p2-space-actions"><button type="button" onClick={onBack}>Continuer à explorer</button><Button onClick={onOpenJournal}>Voir mon Journal</Button></div>
                </div>
              )}
            </section>
          )}
          <dl className="p1-work-facts">
            <div><dt>Genre</dt><dd>{work.genre}</dd></div>
            <div><dt>Langue</dt><dd>{work.language}</dd></div>
            <div><dt>Première publication</dt><dd>{work.year}</dd></div>
          </dl>
        </div>
      </header>

      <section className="p1-work-about" aria-labelledby="p1-about-title">
        <div className="p1-section-mark"><span>01</span><h2 id="p1-about-title">À propos</h2></div>
        <div className="p1-work-prose">{work.synopsis.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      {social}

      {related.length > 0 && (
        <section className="p1-work-related" aria-labelledby="p1-related-title">
          <div className="p1-section-mark"><span>{social ? "03" : "02"}</span><h2 id="p1-related-title">Chemins voisins</h2></div>
          <div>{related.map((candidate) => <WorkTextButton key={candidate.id} work={candidate} onOpen={() => onOpenWork(candidate.id)} note={candidate.genre} />)}</div>
        </section>
      )}

      {statusOpen && <button className="p2-status-backdrop" type="button" aria-label="Fermer le choix de statut" onClick={() => setStatusOpen(false)} />}
      {authOpen && pendingStatus && (
        <Dialog titleId="p2-auth-title" descriptionId="p2-auth-description" onRequestClose={() => setAuthOpen(false)} className="p2-auth-dialog">
          <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer l’inscription" onClick={() => setAuthOpen(false)} />
          <section className="p2-auth-panel">
            <button className="p2-auth-close" type="button" aria-label="Fermer" onClick={() => setAuthOpen(false)}>×</button>
            <div className="p2-auth-heading">
              <p className="eyebrow">Votre geste vous attend</p>
              <h2 id="p2-auth-title">Gardons ce premier repère.</h2>
              <p id="p2-auth-description"><strong>{work.title}</strong> sera ajouté avec le statut <strong>{pendingStatus}</strong>. Après la création du compte, vous reviendrez exactement ici.</p>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); finishAccount(); }}>
              <Field label="Adresse e-mail"><Input required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></Field>
              <Field label="Mot de passe" hint="8 caractères minimum"><Input required minLength={8} autoComplete="new-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></Field>
              <p className="p2-auth-note">Aucun profil public n’est créé à cette étape.</p>
              <div className="p2-auth-actions"><button type="button" onClick={() => setAuthOpen(false)}>Pas maintenant</button><Button type="submit" disabled={!email.trim() || password.length < 8}>Créer mon compte</Button></div>
            </form>
          </section>
        </Dialog>
      )}
      {feedback && <div className="p2-feedback" role="status" aria-live="polite"><span>{feedback}</span><button type="button" aria-label="Fermer" onClick={() => setFeedback("")}>×</button></div>}
    </article>
  );
}
