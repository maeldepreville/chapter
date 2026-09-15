import type { Metadata } from "next";
import { WorkRecipeLab } from "./work-recipe-lab";
import "./work-recipe.css";

export const metadata: Metadata = {
  title: "Recette page œuvre — Chapter",
  description: "Cinq situations pour vérifier la séparation de l’œuvre, de la lecture privée et des publications.",
  robots: { index: false, follow: false },
};

export default function WorkRecipePage() {
  return <WorkRecipeLab />;
}
