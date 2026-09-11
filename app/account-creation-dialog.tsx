"use client";

import { useState, type ReactNode } from "react";
import { Button, Dialog, Field, Input } from "./foundation/primitives";

type ChapterAccount = {
  readerName: string;
  email: string;
};

export function AccountCreationDialog({ open, eyebrow, title, description, submitLabel, initialReaderName = "", onClose, onComplete }: {
  open: boolean;
  eyebrow: string;
  title: string;
  description: ReactNode;
  submitLabel: string;
  initialReaderName?: string;
  onClose: () => void;
  onComplete: (account: ChapterAccount) => void;
}) {
  const [readerName, setReaderName] = useState(initialReaderName);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const valid = readerName.trim().length >= 2 && email.trim().length > 0 && password.length >= 8;

  if (!open) return null;

  const finish = () => {
    if (!valid) return;
    onComplete({ readerName: readerName.trim(), email: email.trim() });
  };

  return (
    <Dialog titleId="chapter-account-title" descriptionId="chapter-account-description" initialFocus="#chapter-reader-name" onRequestClose={onClose} className="p2-auth-dialog">
      <button className="overlay-backdrop" tabIndex={-1} type="button" aria-label="Fermer la création du compte" onClick={onClose} />
      <section className="p2-auth-panel">
        <button className="p2-auth-close" type="button" aria-label="Fermer" onClick={onClose}>×</button>
        <div className="p2-auth-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="chapter-account-title">{title}</h2>
          <p id="chapter-account-description">{description}</p>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); finish(); }}>
          <Field label="Nom de lecteur" hint="Votre signature publique, unique sur Chapter"><Input id="chapter-reader-name" required minLength={2} maxLength={40} autoComplete="nickname" value={readerName} onChange={(event) => setReaderName(event.target.value)} placeholder="Ex. Maël des marges" /></Field>
          <Field label="Adresse e-mail"><Input required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></Field>
          <Field label="Mot de passe" hint="8 caractères minimum"><Input required minLength={8} autoComplete="new-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></Field>
          <p className="p2-auth-note">Ce nom signera votre profil et vos contributions publiques. Votre Journal et votre Bibliothèque restent privés.</p>
          <div className="p2-auth-actions"><button type="button" onClick={onClose}>Pas maintenant</button><Button type="submit" disabled={!valid}>{submitLabel}</Button></div>
        </form>
      </section>
    </Dialog>
  );
}
