import type { PrototypeActorId } from "./prototype-data";

export type PrototypePublicReview = {
  authorId: PrototypeActorId;
  workId: string;
  rating: number;
  date: string;
  text: string;
};

export const prototypePublicReviews: readonly PrototypePublicReview[] = [
  {
    authorId: "lina",
    workId: "cartographies",
    rating: 5,
    date: "18 août 2026",
    text: "Un roman qui avance comme une carte que l’on dessine en marchant. J’ai aimé la précision des images et cette sensation persistante que nos souvenirs ne sont jamais aussi fixes qu’on le croit.",
  },
  {
    authorId: "theo",
    workId: "cartographies",
    rating: 4,
    date: "12 août 2026",
    text: "Une écriture ample, parfois exigeante, mais toujours habitée. Le dernier tiers donne une profondeur inattendue à tout ce qui précédait.",
  },
  {
    authorId: "ines",
    workId: "cartographies",
    rating: 4,
    date: "3 août 2026",
    text: "J’y suis entrée lentement, puis je n’ai plus voulu quitter cet univers. Une très belle réflexion sur les lieux que l’on emporte avec soi.",
  },
  {
    authorId: "lina",
    workId: "rivage",
    rating: 4,
    date: "9 août 2026",
    text: "Le rivage devient ici une mesure du temps : chaque retour modifie légèrement ce que les personnages croyaient reconnaître.",
  },
  {
    authorId: "lina",
    workId: "lucioles",
    rating: 5,
    date: "27 juillet 2026",
    text: "Une lumière très discrète traverse ce livre. Elle ne résout rien, mais rend chaque rencontre plus attentive et plus juste.",
  },
  {
    authorId: "theo",
    workId: "atlas",
    rating: 4,
    date: "21 juillet 2026",
    text: "J’ai aimé la patience de ce roman et sa manière de faire des fenêtres éclairées une constellation toujours incomplète.",
  },
  {
    authorId: "ines",
    workId: "miroirs",
    rating: 5,
    date: "14 juillet 2026",
    text: "La maison garde les reflets sans jamais devenir un simple symbole. Tout reste concret, jusque dans les passages les plus étranges.",
  },
];

export function prototypeReviewsForWork(workId: string): readonly PrototypePublicReview[] {
  return prototypePublicReviews.filter((review) => review.workId === workId);
}

export function prototypeReviewsForActor(authorId: PrototypeActorId): readonly PrototypePublicReview[] {
  return prototypePublicReviews.filter((review) => review.authorId === authorId);
}
