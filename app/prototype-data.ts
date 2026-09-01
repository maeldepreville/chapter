export type ProfileOwner = "self" | "public-self" | "lina";
export type PrototypeActorId = "self" | "lina" | "theo" | "ines";

export const CURRENT_READER_ID: PrototypeActorId = "self";

export const prototypeActors = {
  self: { id: "self", name: "Maël Depréville", firstName: "Maël", initials: "MD" },
  lina: { id: "lina", name: "Lina Morel", firstName: "Lina", initials: "LM" },
  theo: { id: "theo", name: "Théo Renaud", firstName: "Théo", initials: "TR" },
  ines: { id: "ines", name: "Inès Naël", firstName: "Inès", initials: "IN" },
} as const satisfies Record<PrototypeActorId, { id: PrototypeActorId; name: string; firstName: string; initials: string }>;

export const profilePresentations = {
  self: {
    actorId: "self",
    defaultTitle: "Esprit nomade",
    intro: "Lecteur de fictions où les lieux, les souvenirs et les voix discrètes déplacent le regard.",
    favorites: ["cartographies", "atlas", "miroirs"],
  },
  "public-self": {
    actorId: "self",
    defaultTitle: "Esprit nomade",
    intro: "Lecteur de fictions où les lieux, les souvenirs et les voix discrètes déplacent le regard.",
    favorites: ["cartographies", "atlas", "miroirs"],
  },
  lina: {
    actorId: "lina",
    defaultTitle: "Voix singulière",
    intro: "Je rassemble des romans où les paysages gardent une mémoire et où chaque détour ouvre une manière différente d’habiter le monde.",
    favorites: ["rivage", "lucioles", "sel"],
  },
} as const satisfies Record<ProfileOwner, { actorId: "self" | "lina"; defaultTitle: string; intro: string; favorites: readonly string[] }>;

export function actorIdForProfile(owner: ProfileOwner): "self" | "lina" {
  return profilePresentations[owner].actorId;
}
