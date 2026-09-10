import type { Metadata } from "next";
import { P7JourneyLab } from "./p7-journey-lab";

export const metadata: Metadata = {
  title: "Recette P7 — Chapter",
  description: "Atelier isolé pour la recette complète de la refonte Chapter.",
  robots: { index: false, follow: false },
};

export default function P7RecipePage() {
  return <P7JourneyLab />;
}
