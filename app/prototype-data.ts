export type PrototypeActorId = "self" | "lina" | "theo" | "ines";
export type ProfileOwner = "self" | "public-self" | Exclude<PrototypeActorId, "self">;

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
  theo: {
    actorId: "theo",
    defaultTitle: "Lecteur au long cours",
    intro: "Je lis les récits qui prennent leur temps, déplacent patiemment leurs lignes et donnent envie de revenir aux premières pages.",
    favorites: ["atlas", "cartographies", "lucioles"],
  },
  ines: {
    actorId: "ines",
    defaultTitle: "Éclat sensible",
    intro: "Je garde les livres qui font affleurer une émotion sans l’expliquer et transforment un détail familier en souvenir durable.",
    favorites: ["miroirs", "cartographies", "rivage"],
  },
} as const satisfies Record<ProfileOwner, { actorId: PrototypeActorId; defaultTitle: string; intro: string; favorites: readonly string[] }>;

export function actorIdForProfile(owner: ProfileOwner): PrototypeActorId {
  return profilePresentations[owner].actorId;
}

export function profileOwnerForActor(actorId: PrototypeActorId): ProfileOwner {
  return actorId === CURRENT_READER_ID ? "self" : actorId;
}
