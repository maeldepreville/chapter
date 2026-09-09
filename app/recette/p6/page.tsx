import type { Metadata } from "next";
import { P6StateLab } from "./p6-state-lab";

export const metadata: Metadata = {
  title: "Recette P6 — Chapter",
  description: "Atelier isolé pour éprouver les états transversaux du prototype Chapter.",
  robots: { index: false, follow: false },
};

export default function P6RecipePage() {
  return <P6StateLab />;
}
