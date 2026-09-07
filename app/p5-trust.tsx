"use client";

import { useState, type ChangeEvent } from "react";
import { Dialog, Input } from "./foundation/primitives";
import { prototypeActors, type PrototypeActorId } from "./prototype-data";

export type ChapterExportSnapshot = {
  format: "chapter-export";
  version: 1;
  exportedAt: string;
  account: { publicName: string };
  privacy: { journal: "private"; library: "private"; notes: "private" };
  privateRecords: Array<Record<string, unknown>>;
  journalTraces: Array<Record<string, unknown>>;
  publications: Array<Record<string, unknown>>;
  followingActorIds: PrototypeActorId[];
  blockedActorIds: PrototypeActorId[];
};

type ImportResult = { records: number; traces: number };

type TrustSettingsProps = {
  publicName: string;
  privateRecordCount: number;
  privateNoteCount: number;
  publicationCount: number;
  blockedActorIds: readonly PrototypeActorId[];
  onClose: () => void;
  onSavePublicName: (name: string) => void;
  onEditPhoto: () => void;
  onToggleBlock: (actorId: PrototypeActorId) => void;
  createExport: () => ChapterExportSnapshot;
  onImport: (snapshot: ChapterExportSnapshot) => ImportResult;
  onDeleteAccount: () => void;
};

export function TrustSettings({ publicName, privateRecordCount, privateNoteCount, publicationCount, blockedActorIds, onClose, onSavePublicName, onEditPhoto, onToggleBlock, createExport, onImport, onDeleteAccount }: TrustSettingsProps) {
  const [nameDraft, setNameDraft] = useState(publicName);
  const [notice, setNotice] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [deletePhrase, setDeletePhrase] = useState("");

  const exportChapterData = () => {
    const snapshot = createExport();
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chapter-export-${snapshot.exportedAt.slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Votre archive complète a été préparée.");
  };

  const importChapterData = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const snapshot = JSON.parse(await file.text()) as ChapterExportSnapshot;
      if (snapshot.format !== "chapter-export" || snapshot.version !== 1 || !Array.isArray(snapshot.privateRecords) || !Array.isArray(snapshot.journalTraces)) throw new Error("invalid");
      const result = onImport(snapshot);
      setNotice(`Import privé terminé : ${result.records} lecture${result.records > 1 ? "s" : ""} et ${result.traces} trace${result.traces > 1 ? "s" : ""} reconnues.`);
    } catch {
      setNotice("Ce fichier n’est pas une archive Chapter reconnue. Aucune donnée n’a été modifiée.");
    }
  };

  const saveIdentity = () => {
    const nextName = nameDraft.trim();
    if (!nextName) return;
    onSavePublicName(nextName);
    setNameDraft(nextName);
    setNotice("Votre identité publique a été mise à jour. Vos espaces privés restent inchangés.");
  };

  const confirmDeletion = () => {
    if (password.length < 8 || deletePhrase !== "SUPPRIMER") return;
    onDeleteAccount();
  };

  return (
    <section className="trust-card" aria-labelledby="trust-title">
      <button className="close-button trust-card-close" type="button" aria-label="Fermer les réglages" onClick={onClose}>×</button>
      <header className="trust-heading">
        <p className="eyebrow">Compte · confiance et contrôle</p>
        <h1 id="trust-title">Vos lectures vous appartiennent.</h1>
        <p>Comprendre ce qui reste privé, choisir ce qui vous représente et reprendre vos données à tout moment.</p>
      </header>

      {notice && <div className="trust-notice" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice("")}>Fermer</button></div>}

      <div className="trust-layout">
        <nav className="trust-index" aria-label="Sections des réglages">
          <a href="#identity">Identité publique</a>
          <a href="#privacy">Confidentialité</a>
          <a href="#blocked">Comptes bloqués</a>
          <a href="#data">Vos données</a>
          <a href="#deletion">Suppression</a>
        </nav>

        <div className="trust-sections">
          <section id="identity" className="trust-section" aria-labelledby="identity-title">
            <div className="trust-section-heading"><span>01</span><div><p className="eyebrow">Ce que les autres voient</p><h2 id="identity-title">Identité publique</h2></div></div>
            <p className="trust-section-intro">Votre nom public signe vos critiques, listes et réponses. Il n’a pas besoin d’être unique ; votre compte reste relié par un identifiant interne.</p>
            <div className="trust-form-row">
              <label htmlFor="p5-public-name"><span>Nom public</span><Input id="p5-public-name" value={nameDraft} maxLength={60} onChange={(event) => setNameDraft(event.target.value)} /></label>
              <button className="chapter-button chapter-button--primary" type="button" disabled={!nameDraft.trim() || nameDraft.trim() === publicName} onClick={saveIdentity}>Enregistrer</button>
            </div>
            <button className="text-action" type="button" onClick={onEditPhoto}>Modifier ma photo facultative</button>
          </section>

          <section id="privacy" className="trust-section" aria-labelledby="privacy-title">
            <div className="trust-section-heading"><span>02</span><div><p className="eyebrow">Règles stables</p><h2 id="privacy-title">Confidentialité</h2></div></div>
            <div className="privacy-ledger">
              <div><span className="privacy-seal" aria-hidden="true">P</span><p><strong>Journal</strong><small>{privateRecordCount} lectures et repères</small></p><b>Privé, toujours</b></div>
              <div><span className="privacy-seal" aria-hidden="true">P</span><p><strong>Bibliothèque</strong><small>Statuts, dates et progression</small></p><b>Privée, toujours</b></div>
              <div><span className="privacy-seal" aria-hidden="true">P</span><p><strong>Notes personnelles</strong><small>{privateNoteCount} note{privateNoteCount > 1 ? "s" : ""}</small></p><b>Privées, toujours</b></div>
              <div className="privacy-public"><span className="privacy-seal" aria-hidden="true">V</span><p><strong>Publications</strong><small>{publicationCount} critique{publicationCount > 1 ? "s" : ""}, listes et réponses</small></p><b>Visibles après votre geste</b></div>
            </div>
            <p className="trust-footnote">Une note ne devient jamais une critique automatiquement. Retirer une publication ne touche pas à votre trace privée.</p>
          </section>

          <section id="blocked" className="trust-section" aria-labelledby="blocked-title">
            <div className="trust-section-heading"><span>03</span><div><p className="eyebrow">Relations</p><h2 id="blocked-title">Comptes bloqués</h2></div></div>
            <p className="trust-section-intro">Le blocage masque partout les critiques, réponses et listes du compte, et coupe les interactions directes.</p>
            {blockedActorIds.length ? <div className="blocked-list">{blockedActorIds.map((actorId) => { const actor = prototypeActors[actorId]; return <div key={actorId}><span className="avatar">{actor.initials}</span><p><strong>{actor.name}</strong><small>Publications et interactions masquées</small></p><button className="text-action" type="button" onClick={() => { onToggleBlock(actorId); setNotice(`${actor.name} n’est plus bloqué·e.`); }}>Débloquer</button></div>; })}</div> : <p className="trust-empty">Aucun compte bloqué.</p>}
          </section>

          <section id="data" className="trust-section" aria-labelledby="data-title">
            <div className="trust-section-heading"><span>04</span><div><p className="eyebrow">Portabilité</p><h2 id="data-title">Vos données</h2></div></div>
            <div className="data-actions">
              <article><h3>Tout exporter</h3><p>Une archive lisible contenant votre bibliothèque, votre Journal, vos notes, vos publications et vos relations.</p><button className="chapter-button chapter-button--quiet" type="button" onClick={exportChapterData}>Télécharger mon archive</button></article>
              <article><h3>Importer en privé</h3><p>Les lectures reconnues rejoignent votre espace privé. Rien n’est publié, même si l’archive contient des publications.</p><label className="chapter-button chapter-button--quiet import-control">Choisir une archive<input type="file" accept="application/json,.json" onChange={(event) => void importChapterData(event)} /></label></article>
            </div>
          </section>

          <section id="deletion" className="trust-section danger-zone" aria-labelledby="deletion-title">
            <div className="trust-section-heading"><span>05</span><div><p className="eyebrow">Action irréversible</p><h2 id="deletion-title">Supprimer le compte</h2></div></div>
            <p>Votre profil, vos espaces privés et vos propres publications disparaîtront. Les réponses écrites par d’autres resteront autour d’un repère neutre « Publication retirée ».</p>
            <button className="chapter-button chapter-button--danger" type="button" onClick={() => setDeleteOpen(true)}>Demander la suppression</button>
          </section>
        </div>
      </div>

      {deleteOpen && <Dialog titleId="delete-account-title" descriptionId="delete-account-description" initialFocus="#delete-password" onRequestClose={() => setDeleteOpen(false)} className="delete-account-overlay">
        <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Annuler la suppression" onClick={() => setDeleteOpen(false)} />
        <section className="delete-account-dialog">
          <p className="eyebrow">Dernière vérification</p>
          <h2 id="delete-account-title">Supprimer définitivement votre compte ?</h2>
          <p id="delete-account-description">Cette action efface vos données privées, votre profil et vos propres publications. Elle ne peut pas être annulée.</p>
          <label htmlFor="delete-password"><span>Mot de passe</span><Input id="delete-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <label htmlFor="delete-confirmation"><span>Écrivez SUPPRIMER</span><Input id="delete-confirmation" value={deletePhrase} onChange={(event) => setDeletePhrase(event.target.value)} /></label>
          <div className="modal-actions"><button className="chapter-button chapter-button--quiet" type="button" onClick={() => setDeleteOpen(false)}>Conserver mon compte</button><button className="chapter-button chapter-button--danger" type="button" disabled={password.length < 8 || deletePhrase !== "SUPPRIMER"} onClick={confirmDeletion}>Supprimer définitivement</button></div>
        </section>
      </Dialog>}
    </section>
  );
}
