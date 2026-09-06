"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CoverFrame } from "./cover-frame";
import { Button, Dialog, Field, Input, Textarea } from "./foundation/primitives";
import type { ReadingStatus, Work } from "./foundation/contracts";

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

export function PublicSearch({ works, onOpenWork, query: controlledQuery, onQueryChange }: PublicViewProps & { query?: string; onQueryChange?: (query: string) => void }) {
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

  return (
    <section className="p1-public-page p1-search" aria-labelledby="p1-search-title">
      <header className="p1-search-opening">
        <div className="p1-search-heading">
          <p className="eyebrow">Recherche publique</p>
          <h1 id="p1-search-title">Trouver une œuvre</h1>
          <p>Un titre ou un auteur suffit. Aucun compte n’est nécessaire pour consulter une œuvre.</p>
        </div>
        <figure className="p1-search-sketch" aria-hidden="true">
          <Image src="/editorial/p2-search-atlas.webp" alt="" width={1440} height={960} sizes="(max-width: 899px) 92vw, 56vw" unoptimized priority />
        </figure>
        <p className="p1-search-margin-note" aria-hidden="true"><span>Index</span> Chercher par le texte,<br />retrouver par la trace.</p>
      </header>
      <label className="p1-search-field">
        <span className="sr-only">Rechercher un titre ou un auteur</span>
        <span aria-hidden="true">⌕</span>
        <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titre ou auteur" />
        {query && <button type="button" onClick={() => setQuery("")}>Effacer</button>}
      </label>
      <div className="p1-search-summary" aria-live="polite">
        <span>{query ? `${results.length} résultat${results.length > 1 ? "s" : ""}` : "Sélection de départ"}</span>
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
      ) : (
        <div className="p1-search-empty">
          <h2>Aucune œuvre ne correspond à « {query} ».</h2>
          <p>Essayez le nom de l’auteur, un mot du titre ou revenez à la sélection complète.</p>
          <button className="chapter-button chapter-button--quiet" type="button" onClick={() => setQuery("")}>Voir toutes les œuvres</button>
        </div>
      )}
    </section>
  );
}

export type FirstMarkerRecord = { status: ReadingStatus; marker: string };

export function PublicWork({ work, works, onBack, onOpenWork, onActivate, onSaveMarker, onOpenJournal, activated = false, record, backLabel = "Retour à Découvrir" }: {
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
              {!markerOpen && onOpenJournal && <button className="p2-open-journal" type="button" onClick={onOpenJournal}>Ouvrir mon journal <span aria-hidden="true">→</span></button>}
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

      {related.length > 0 && (
        <section className="p1-work-related" aria-labelledby="p1-related-title">
          <div className="p1-section-mark"><span>02</span><h2 id="p1-related-title">Chemins voisins</h2></div>
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
