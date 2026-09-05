"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CoverFrame } from "./cover-frame";
import type { Work } from "./foundation/contracts";

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
      <header>
        <p className="eyebrow">Recherche publique</p>
        <h1 id="p1-search-title">Trouver une œuvre</h1>
        <p>Un titre ou un auteur suffit. Aucun compte n’est nécessaire pour consulter une œuvre.</p>
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

export function PublicWork({ work, works, onBack, onOpenWork, backLabel = "Retour à Découvrir" }: { work: Work; works: readonly Work[]; onBack: () => void; onOpenWork: (id: string) => void; backLabel?: string }) {
  const related = works.filter((candidate) => candidate.id !== work.id).slice(0, 3);
  return (
    <article className="p1-public-page p1-public-work" aria-labelledby="p1-work-title">
      <button className="p1-back" type="button" onClick={onBack}><span aria-hidden="true">←</span> {backLabel}</button>
      <header className="p1-work-opening">
        <div className="p1-work-cover-stage"><PublicCover work={work} className="p1-cover p1-cover--work" /></div>
        <div className="p1-work-identity">
          <p className="eyebrow">{work.meta}</p>
          <h1 id="p1-work-title">{work.title}</h1>
          <p className="p1-work-author">de {work.author}</p>
          <p className="p1-lede">{work.lede}</p>
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
    </article>
  );
}
