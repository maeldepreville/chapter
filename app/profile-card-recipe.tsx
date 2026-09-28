"use client";

import { useState } from "react";
import Home from "./page";

const materials = [
  { id: "smooth", label: "Carton lisse", detail: "Blanc net, mat et presque sans grain, avec une tranche de carton discrète." },
  { id: "canson", label: "Grain Canson", detail: "Blanc naturel et grain de papier fin, visible surtout dans la lumière." },
  { id: "embossed", label: "Relief embossé", detail: "Papier dense, cadre en léger relief et sceau marqué en creux." },
] as const;

type MaterialId = (typeof materials)[number]["id"];

export function ProfileCardRecipe() {
  const [material, setMaterial] = useState<MaterialId>("embossed");
  const selected = materials.find((item) => item.id === material) ?? materials[2];

  return (
    <div className="profile-card-recipe">
      <header className="profile-card-recipe-toolbar">
        <div className="profile-card-recipe-heading">
          <p><strong>Recette · Carte de profil</strong><small>Cette comparaison est réservée à la recette et n’apparaît pas sur les profils normaux.</small></p>
          <p className="profile-card-recipe-current" aria-live="polite"><span>Version affichée</span>{selected.detail}</p>
        </div>
        <div className="profile-card-recipe-options" role="group" aria-label="Choisir le traitement du papier">
          {materials.map((item) => <button key={item.id} type="button" aria-pressed={material === item.id} onClick={() => setMaterial(item.id)}>{item.label}</button>)}
        </div>
      </header>
      <Home key="profile-card-recipe" refined initialData={{ view: "profile" }} profileCardMaterial={material} />
    </div>
  );
}
