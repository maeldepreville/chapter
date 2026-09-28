import type { Metadata } from "next";
import { ProfileCardRecipe } from "../../profile-card-recipe";
import "../../profile-card-recipe.css";

export const metadata: Metadata = {
  title: "Recette carte de profil — Chapter",
  description: "Comparer trois rendus de papier pour la carte de profil Chapter.",
  robots: { index: false, follow: false },
};

export default function ProfileCardRecipePage() {
  return <ProfileCardRecipe />;
}
