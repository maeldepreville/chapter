import type { Metadata } from "next";
import Home from "../../page";
import { prototypeActors } from "../../prototype-data";

const reader = prototypeActors.self;

export const metadata: Metadata = {
  title: `${reader.name} — Chapter`,
  description: `Le portrait public de ${reader.name} sur Chapter.`,
};

export default function MaelPublicProfilePage() {
  return <Home initialProfileOwner="public-self" />;
}
