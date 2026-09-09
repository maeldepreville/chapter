"use client";

import Link from "next/link";

type ErrorSurfaceProps = {
  onRetry?: () => void;
  title?: string;
  description?: string;
};

function StateHeader() {
  return <header className="p6-state-header"><Link className="wordmark" href="/">Chapter<span>.</span></Link><Link className="text-action" href="/decouvrir">Découvrir</Link></header>;
}

export function LoadingSurface() {
  return (
    <div className="p6-state-shell" aria-busy="true">
      <StateHeader />
      <main className="p6-state-main" id="main-content">
        <p className="sr-only" role="status">Chargement de Chapter…</p>
        <div className="p6-loading-heading" aria-hidden="true"><span /><span /><span /></div>
        <div className="p6-loading-grid" aria-hidden="true">
          <div className="p6-loading-cover" />
          <div className="p6-loading-lines"><span /><span /><span /><span /></div>
        </div>
      </main>
    </div>
  );
}

export function ErrorSurface({ onRetry, title = "Cette page n’a pas pu s’ouvrir", description = "Votre espace reste intact. Vous pouvez réessayer ou reprendre depuis Découvrir." }: ErrorSurfaceProps) {
  return (
    <div className="p6-state-shell">
      <StateHeader />
      <main className="p6-state-main p6-message-state" id="main-content">
        <p className="eyebrow">Interruption passagère</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="p6-state-actions">{onRetry && <button className="primary-action" type="button" onClick={onRetry}>Réessayer</button>}<Link className="quiet-action" href="/decouvrir">Revenir à Découvrir</Link></div>
      </main>
    </div>
  );
}

export function NotFoundSurface() {
  return <ErrorSurface title="Cette page ne figure plus au sommaire" description="Le lien est peut-être incomplet, ou ce contenu n’est plus disponible. Rien n’a été modifié dans votre espace." />;
}
