import type { Metadata } from "next";
import Home from "../../page";

export const metadata: Metadata = {
  title: "Maël Depréville — Chapter",
  description: "Le portrait public de Maël Depréville sur Chapter.",
};

export default function MaelPublicProfilePage() {
  return <Home initialProfileOwner="public-self" />;
}
