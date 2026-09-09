"use client";

import { useState } from "react";
import Home from "../../page";
import { p6RecipeData } from "../../p6-fixtures";
import { ErrorSurface, LoadingSurface } from "../../p6-states";

type Scenario = "normal" | "empty" | "loading" | "error" | "extreme";

const scenarios: readonly { id: Scenario; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "empty", label: "Vide" },
  { id: "loading", label: "Chargement" },
  { id: "error", label: "Erreur" },
  { id: "extreme", label: "Contenus extrêmes" },
];

export function P6StateLab() {
  const [scenario, setScenario] = useState<Scenario>("empty");
  const application = scenario === "loading"
    ? <LoadingSurface />
    : scenario === "error"
      ? <ErrorSurface onRetry={() => setScenario("normal")} />
      : <div className={scenario === "extreme" ? "p6-extreme-surface" : undefined}><Home key={scenario} refined initialData={p6RecipeData[scenario]} /></div>;

  return (
    <div className="p6-recipe">
      <aside className="p6-recipe-toolbar" aria-label="Scénarios de recette P6">
        <p><strong>Recette P6 · États transversaux</strong><small>Ce bandeau n’apparaît pas dans l’application normale.</small></p>
        <div className="p6-recipe-options">
          {scenarios.map((item) => <button type="button" key={item.id} aria-pressed={scenario === item.id} onClick={() => setScenario(item.id)}>{item.label}</button>)}
        </div>
      </aside>
      {application}
    </div>
  );
}
