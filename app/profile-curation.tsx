"use client";

import { useMemo, useState } from "react";
import { Modal } from "./modal";

type CuratedWork = { id: string; title: string; author: string; meta: string };

export type EditableProfileList = {
  id: string;
  title: string;
  description: string;
  profileSummary: string;
  workIds: string[];
};

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
const matchingWorks = (works: readonly CuratedWork[], query: string, selected: readonly string[]) => {
  const normalized = normalize(query.trim());
  const source = normalized ? works.filter((work) => normalize(`${work.title} ${work.author}`).includes(normalized)) : works;
  const selectedWorks = selected.flatMap((id) => works.find((work) => work.id === id) ?? []);
  return [...selectedWorks, ...source.filter((work) => !selected.includes(work.id))].slice(0, 18);
};

function WorkPicker({ works, selected, limit, onChange }: { works: readonly CuratedWork[]; selected: readonly string[]; limit?: number; onChange: (ids: string[]) => void }) {
  const [query, setQuery] = useState("");
  const candidates = useMemo(() => matchingWorks(works, query, selected), [query, selected, works]);
  const toggle = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter((workId) => workId !== id));
    else if (!limit || selected.length < limit) onChange([...selected, id]);
  };
  return <div className="curation-work-picker">
    <label><span>Rechercher une œuvre</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titre ou auteur" /></label>
    <p className="curation-count">{selected.length}{limit ? ` sur ${limit}` : ""} sélectionnée{selected.length > 1 ? "s" : ""}</p>
    <div className="curation-work-results">
      {candidates.map((work) => { const checked = selected.includes(work.id); return <button type="button" key={work.id} aria-pressed={checked} disabled={!checked && Boolean(limit && selected.length >= limit)} onClick={() => toggle(work.id)}><span aria-hidden="true">{checked ? "✓" : "+"}</span><span><strong>{work.title}</strong><small>{work.author} · {work.meta}</small></span></button>; })}
    </div>
  </div>;
}

export function FavoritesEditor({ works, selected, onSave, onClose }: { works: readonly CuratedWork[]; selected: readonly string[]; onSave: (ids: string[]) => void; onClose: () => void }) {
  const [draft, setDraft] = useState([...selected]);
  return <Modal className="curation-overlay" labelledBy="favorites-editor-title" initialFocus='input[type="search"]' onRequestClose={onClose}>
    <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer sans enregistrer" onClick={onClose} />
    <section className="curation-card">
      <div className="curation-heading"><div><p className="eyebrow">Profil public</p><h2 id="favorites-editor-title">Choisir mes œuvres de chevet</h2><p>Jusqu’à trois livres qui resteront visibles dans votre portrait de lecteur.</p></div><button className="close-button" type="button" aria-label="Fermer" onClick={onClose}>×</button></div>
      <WorkPicker works={works} selected={draft} limit={3} onChange={setDraft} />
      <div className="modal-actions"><button className="quiet-action" type="button" onClick={onClose}>Annuler</button><button className="primary-action" type="button" onClick={() => { onSave(draft); onClose(); }}>Enregistrer la sélection</button></div>
    </section>
  </Modal>;
}

export function ListsEditor({ works, lists, onSave, onClose }: { works: readonly CuratedWork[]; lists: readonly EditableProfileList[]; onSave: (lists: EditableProfileList[]) => void; onClose: () => void }) {
  const [draftLists, setDraftLists] = useState<EditableProfileList[]>(lists.map((list) => ({ ...list, workIds: [...list.workIds] })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [workIds, setWorkIds] = useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const edit = (list?: EditableProfileList) => {
    setEditingId(list?.id ?? "new");
    setTitle(list?.title ?? "");
    setDescription(list?.description ?? "");
    setWorkIds(list ? [...list.workIds] : []);
    setDeleteId(null);
  };
  const saveList = () => {
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!cleanTitle || !cleanDescription) return;
    const next: EditableProfileList = {
      id: editingId === "new" ? `liste-${Date.now()}` : editingId ?? `liste-${Date.now()}`,
      title: cleanTitle,
      description: cleanDescription,
      profileSummary: cleanDescription.length > 105 ? `${cleanDescription.slice(0, 102).trimEnd()}…` : cleanDescription,
      workIds,
    };
    setDraftLists((current) => editingId === "new" ? [...current, next] : current.map((list) => list.id === editingId ? next : list));
    setEditingId(null);
  };
  const commit = () => { onSave(draftLists); onClose(); };

  return <Modal className="curation-overlay" labelledBy="lists-editor-title" initialFocus={editingId ? "#profile-list-title" : ".curation-new-list"} onRequestClose={onClose}>
    <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer sans enregistrer" onClick={onClose} />
    <section className="curation-card curation-card--lists">
      <div className="curation-heading"><div><p className="eyebrow">Profil public</p><h2 id="lists-editor-title">Gérer mes listes</h2><p>Créez des chemins publics, puis choisissez les œuvres qui les composent.</p></div><button className="close-button" type="button" aria-label="Fermer" onClick={onClose}>×</button></div>
      {editingId ? <div className="curation-list-form">
        <button className="text-action back-action" type="button" onClick={() => setEditingId(null)}>← Revenir aux listes</button>
        <label htmlFor="profile-list-title"><span>Titre de la liste</span><input id="profile-list-title" maxLength={90} value={title} onChange={(event) => setTitle(event.target.value)} /></label>
        <label htmlFor="profile-list-description"><span>Intention de la liste</span><textarea id="profile-list-description" maxLength={420} rows={3} value={description} onChange={(event) => setDescription(event.target.value)} /></label>
        <WorkPicker works={works} selected={workIds} onChange={setWorkIds} />
        <div className="modal-actions"><button className="quiet-action" type="button" onClick={() => setEditingId(null)}>Annuler</button><button className="primary-action" type="button" disabled={!title.trim() || !description.trim()} onClick={saveList}>{editingId === "new" ? "Créer la liste" : "Enregistrer les modifications"}</button></div>
      </div> : <div className="curation-list-index">
        <button className="primary-action curation-new-list" type="button" onClick={() => edit()}>Créer une liste</button>
        {draftLists.length ? draftLists.map((list) => <article key={list.id}><div><strong>{list.title}</strong><small>{list.workIds.length} œuvre{list.workIds.length > 1 ? "s" : ""} · Publique</small></div>{deleteId === list.id ? <div className="curation-delete-confirm"><span>Supprimer ?</span><button className="text-action" type="button" onClick={() => setDeleteId(null)}>Non</button><button className="destructive-action" type="button" onClick={() => { setDraftLists((current) => current.filter((item) => item.id !== list.id)); setDeleteId(null); }}>Oui</button></div> : <div><button className="text-action" type="button" onClick={() => edit(list)}>Modifier</button><button className="text-action muted-action" type="button" onClick={() => setDeleteId(list.id)}>Supprimer</button></div>}</article>) : <p className="trust-empty">Vous n’avez encore créé aucune liste publique.</p>}
        <div className="modal-actions"><button className="quiet-action" type="button" onClick={onClose}>Annuler</button><button className="primary-action" type="button" onClick={commit}>Enregistrer</button></div>
      </div>}
    </section>
  </Modal>;
}
