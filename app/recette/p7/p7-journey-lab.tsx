"use client";

import { useState } from "react";
import Home from "../../page";
import { p6RecipeData } from "../../p6-fixtures";

type Journey = "public" | "marker" | "personal" | "social" | "trust" | "resilience";

const journeys: readonly { id: Journey; label: string; detail: string }[] = [
  { id: "public", label: "Visite publique", detail: "Découvrir, rechercher et ouvrir une œuvre sans compte." },
  { id: "marker", label: "Premier repère", detail: "Partir d’une œuvre et vérifier que le premier geste est restitué après l’activation." },
  { id: "personal", label: "Usage personnel", detail: "Parcourir Journal, Bibliothèque, progression, notes et relectures." },
  { id: "social", label: "Vie sociale", detail: "Suivre les chemins entre œuvres, critiques, profils, listes et conversations." },
  { id: "trust", label: "Confiance", detail: "Relire l’identité, la confidentialité, le blocage et la portabilité des données." },
  { id: "resilience", label: "Robustesse", detail: "Éprouver la composition avec les contenus extrêmes de P6." },
];

function JourneyApplication({ journey }: { journey: Journey }) {
  if (journey === "public") return <Home key={journey} refined initialPublicView="discover" />;
  if (journey === "marker") return <Home key={journey} refined initialPublicWorkId="cartographies" />;
  if (journey === "personal") return <Home key={journey} refined initialData={{ view: "journal" }} />;
  if (journey === "social") return <Home key={journey} refined initialData={{ view: "discover" }} />;
  if (journey === "trust") return <Home key={journey} refined initialData={{ view: "profile" }} initialSettingsOpen />;
  return <div className="p6-extreme-surface"><Home key={journey} refined initialData={p6RecipeData.extreme} /></div>;
}

export function P7JourneyLab() {
  const [journey, setJourney] = useState<Journey>("public");
  const selected = journeys.find((item) => item.id === journey) ?? journeys[0];

  return (
    <div className="p7-recipe">
      <aside className="p7-recipe-toolbar" aria-label="Parcours de recette P7">
        <div className="p7-recipe-heading">
          <p><strong>Recette P7 · Parcours complets</strong><small>Ce bandeau n’apparaît pas dans l’application normale.</small></p>
          <p className="p7-recipe-current"><span>À vérifier</span>{selected.detail}</p>
        </div>
        <div className="p7-recipe-options">
          {journeys.map((item) => <button type="button" key={item.id} aria-pressed={journey === item.id} onClick={() => setJourney(item.id)}>{item.label}</button>)}
          <a href="/recette/p6">Les 5 états P6</a>
        </div>
      </aside>
      <JourneyApplication journey={journey} />
    </div>
  );
}
