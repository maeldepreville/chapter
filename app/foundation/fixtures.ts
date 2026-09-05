import type { JournalTrace } from "../journal-model";
import type { Author, Edition, Follow, PrototypeSession, PublicList, PublicProfile, PublicReply, PublicReview, Reader, Work } from "./contracts";

export const emptyPersonalEntry = { readingStatus: null, readingDate: "", note: "", review: "", rating: 0 } as const;

export const coreWorks = [
  {
    id: "cartographies", authorId: "author-camille-maret", editionId: "edition-cartographies-fr-2021", title: "Les Cartographies du vent", author: "Camille Maret", meta: "Roman · 2021", year: "2021", genre: "Roman contemporain", language: "Français", rating: "4,3", ratingCount: "1 248 évaluations", cover: true, coverTone: "slate",
    lede: "Une cartographe revient dans l’archipel de son enfance et découvre que les lieux oubliés continuent de déplacer ceux qui les ont quittés.",
    synopsis: ["Après douze années loin de Néréis, Ana Vales retourne dans l’archipel pour vider la maison de sa mère. Les cartes qu’elle y retrouve ne représentent aucun territoire connu : elles semblent plutôt suivre les déplacements de la mémoire, les silences d’une famille et les routes que le vent efface chaque nuit.", "À mesure qu’elle reprend son ancien métier, Ana comprend que cartographier un lieu consiste parfois moins à en fixer les contours qu’à accepter ce qui nous échappe."],
  },
  {
    id: "rivage", authorId: "author-nora-sorel", editionId: "edition-rivage-fr-2019", title: "Le Rivage des heures", author: "Nora Sorel", meta: "Roman · 2019", year: "2019", genre: "Fiction littéraire", language: "Français", rating: "4,1", ratingCount: "862 évaluations", cover: false, coverTone: "brick",
    lede: "Sur une côte où les marées dérèglent les horloges, une restauratrice tente de reconstituer les derniers jours d’un village disparu.",
    synopsis: ["Élise arrive à Keravel pour restaurer les cadrans d’un ancien observatoire. Chaque mécanisme porte pourtant une heure différente, comme si le village avait refusé de vivre selon un temps commun.", "Entre archives incomplètes et récits contradictoires, elle découvre une communauté qui a choisi de mesurer le passé autrement que par les dates."],
  },
  {
    id: "atlas", authorId: "author-yanis-delcourt", editionId: "edition-atlas-fr-2024", title: "Atlas des nuits calmes", author: "Yanis Delcourt", meta: "Récit · 2024", year: "2024", genre: "Récit contemporain", language: "Français", rating: "4,5", ratingCount: "534 évaluations", cover: false, coverTone: "petrol",
    lede: "Un veilleur de nuit inventorie les lumières encore allumées et compose, sans le savoir, le portrait intime de toute une ville.",
    synopsis: ["Chaque nuit, Sami parcourt les rues désertes et note les fenêtres éclairées dans un carnet. Il imagine les vies derrière ces halos, jusqu’au soir où l’une de ses descriptions lui revient sous la forme d’une lettre.", "Son inventaire devient alors un atlas sensible des solitudes, des attentes et des gestes minuscules qui empêchent la ville de dormir tout à fait."],
  },
  {
    id: "lucioles", authorId: "author-elise-varenne", editionId: "edition-lucioles-fr-2018", title: "La Saison des lucioles", author: "Élise Varenne", meta: "Roman · 2018", year: "2018", genre: "Roman initiatique", language: "Français", rating: "4,0", ratingCount: "719 évaluations", cover: false, coverTone: "sage",
    lede: "Dans une vallée où les lucioles ont disparu, deux sœurs rouvrent l’observatoire abandonné de leur père.",
    synopsis: ["Mila revient à Valcroix au début d’un été trop silencieux. Sa sœur a conservé les carnets de leur père, remplis de relevés sur les lumières qui animaient autrefois les prés.", "Leur enquête transforme peu à peu un deuil familial en exploration sensible de ce qui persiste lorsque les signes familiers s’éteignent."],
  },
  {
    id: "miroirs", authorId: "author-samuel-ardent", editionId: "edition-miroirs-fr-2020", title: "La Maison des miroirs lents", author: "Samuel Ardent", meta: "Roman · 2020", year: "2020", genre: "Fiction littéraire", language: "Français", rating: "4,2", ratingCount: "947 évaluations", cover: false, coverTone: "plum",
    lede: "Un restaurateur découvre que les miroirs d’une demeure normande ne renvoient jamais tout à fait le présent.",
    synopsis: ["Chargé de restaurer une maison promise à la vente, Jonas remarque que certaines pièces semblent conserver les gestes de leurs anciens habitants.", "Au fil des reflets, l’architecture devient une mémoire instable où chaque réparation révèle une absence nouvelle."],
  },
  {
    id: "sel", authorId: "author-diane-kermor", editionId: "edition-sel-fr-2023", title: "Un Peu de sel dans la brume", author: "Diane Kermor", meta: "Récit · 2023", year: "2023", genre: "Récit contemporain", language: "Français", rating: "3,9", ratingCount: "381 évaluations", cover: false, coverTone: "ochre",
    lede: "Une cuisinière embarque sur le dernier ferry d’une ligne condamnée et recueille les recettes de ses passagers.",
    synopsis: ["Pendant les trois dernières semaines de la traversée, Maud cuisine avec ce que les voyageurs lui confient : une épice, un souvenir, parfois seulement un nom.", "Son carnet compose le portrait d’un passage maritime autant que celui des vies qui l’ont emprunté."],
  },
] as const satisfies readonly Work[];

export type CoreWorkId = (typeof coreWorks)[number]["id"];
export type CoreWork = (typeof coreWorks)[number];

export const coreAuthors: readonly Author[] = coreWorks.map((work) => ({ id: work.authorId, name: work.author }));
export const coreEditions: readonly Edition[] = coreWorks.map((work) => ({ id: work.editionId, workId: work.id, language: work.language, publicationYear: Number(work.year) }));

export const coreActivityOrder: Record<CoreWorkId, number> = { cartographies: 6, rivage: 5, atlas: 4, lucioles: 3, miroirs: 2, sel: 1 };

export const coreEntries = {
  cartographies: { ...emptyPersonalEntry, readingStatus: "En cours", readingDate: "4 août 2026", note: "La carte semble moins représenter un territoire que la manière dont Ana accepte enfin de ne plus pouvoir le fixer. Cette idée revient dans chaque passage consacré au vent et donne au roman une douceur inattendue." },
  rivage: { ...emptyPersonalEntry, readingStatus: "En cours", readingDate: "12 août 2026", note: "Observer comment les différentes heures deviennent une manière de raconter les désaccords du village." },
  atlas: { ...emptyPersonalEntry, readingStatus: "En cours", readingDate: "8 août 2026", note: "Garder l’image des fenêtres éclairées comme une constellation qui n’existe que depuis la rue." },
  lucioles: { ...emptyPersonalEntry, readingStatus: "Lu", readingDate: "19 août 2026", rating: 4 },
  miroirs: { ...emptyPersonalEntry, readingStatus: "Lu", readingDate: "2 août 2026", review: "Une maison décrite comme un organisme discret, avec des reflets qui ne servent jamais de simple artifice. Le dernier tiers resserre admirablement tout ce que le roman avait laissé en suspens.", rating: 4 },
  sel: { ...emptyPersonalEntry, readingStatus: "À lire" },
} as const;

export const coreJournalTraces: readonly JournalTrace[] = [
  { id: "trace-note-cartographies", workId: "cartographies", date: "22 août 2026", kind: "Note privée", text: coreEntries.cartographies.note, action: "note" },
  { id: "trace-finished-lucioles", workId: "lucioles", date: "19 août 2026", kind: "Lecture terminée" },
  { id: "trace-review-miroirs", workId: "miroirs", date: "17 août 2026", kind: "Critique publique", text: coreEntries.miroirs.review, action: "review" },
  { id: "trace-start-rivage", workId: "rivage", date: "12 août 2026", kind: "Lecture commencée" },
  { id: "trace-note-atlas", workId: "atlas", date: "8 août 2026", kind: "Note privée", text: coreEntries.atlas.note, action: "note" },
  { id: "trace-finished-miroirs", workId: "miroirs", date: "2 août 2026", kind: "Lecture terminée" },
];

const givenNames = ["Camille", "Lina", "Théo", "Inès", "Noé", "Aya", "Lou", "Sacha"];
const familyNames = ["Martin", "Morel", "Renaud", "Naël"];
export const prototypeReaders: readonly Reader[] = Array.from({ length: 32 }, (_, index) => {
  const publicName = index < 2 ? "Camille Martin" : `${givenNames[index % givenNames.length]} ${familyNames[Math.floor(index / givenNames.length)]}`;
  return { id: `reader-${String(index + 1).padStart(3, "0")}`, publicName, initials: publicName.split(" ").map((part) => part[0]).join("") };
});
export const prototypeProfiles: readonly PublicProfile[] = prototypeReaders.slice(0, 28).map((reader, index) => ({ id: `profile-${String(index + 1).padStart(3, "0")}`, readerId: reader.id, bio: index === 3 ? "Je lis lentement et je garde des traces détaillées. ".repeat(18).trim() : "Lectrice ou lecteur de récits qui déplacent le regard." }));

export const prototypeReviews: readonly PublicReview[] = [{ id: "review-public-001", authorId: prototypeReaders[2].id, workId: "cartographies", text: "Une critique publique distincte de toute note privée.", rating: 4, publishedAt: "2026-08-22T18:00:00.000Z" }, { id: "review-removed-001", authorId: prototypeReaders[3].id, workId: "atlas", text: "Contenu retiré", rating: 3, publishedAt: "2026-08-19T18:00:00.000Z", removedAt: "2026-08-20T10:00:00.000Z" }];
export const prototypeReplies: readonly PublicReply[] = [{ id: "reply-public-001", reviewId: "review-public-001", authorId: prototypeReaders[4].id, text: "Cette lecture du vent me parle.", publishedAt: "2026-08-23T08:00:00.000Z" }];
export const prototypeFollows: readonly Follow[] = [{ id: "follow-001", followerId: prototypeReaders[2].id, followedId: prototypeReaders[3].id }];
export const prototypeLists: readonly PublicList[] = [{ id: "list-public-001", ownerId: prototypeReaders[2].id, title: "Lieux qui nous déplacent", description: "Une liste publique de référence.", workIds: ["cartographies", "rivage", "miroirs"] }];

export const prototypeSessionSeeds = {
  blank: { id: "session-blank", readerId: null, privateRecords: [], reviews: [], replies: [], follows: [] },
  activated: { id: "session-activated", readerId: "reader-new", privateRecords: [{ id: "record-new-001", readerId: "reader-new", workId: "cartographies", readingStatus: "À lire", readingDate: "", privateNote: "", rating: 0 }], reviews: [], replies: [], follows: [] },
} as const satisfies Record<"blank" | "activated", PrototypeSession>;

export const p0Fixtures = { works: coreWorks, authors: coreAuthors, editions: coreEditions, readers: prototypeReaders, profiles: prototypeProfiles, reviews: prototypeReviews, replies: prototypeReplies, follows: prototypeFollows, lists: prototypeLists, sessions: prototypeSessionSeeds } as const;
