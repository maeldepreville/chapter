# Chapter — doctrine et feuille de route de la refonte pré-lot 2

Dernière mise à jour : 5 septembre 2026.

Statut : **socle produit et P0 validés ; candidate P1 locale en attente de recette**.

Ce document est la source détaillée de la refonte visible qui précède le lot 2 backend. Il complète l'archive historique sans rouvrir le lot 1. Quand une ancienne décision de composition entre en conflit avec ce socle, le présent document gouverne la refonte ; les invariants de sécurité, de données et d'accessibilité restent applicables tant qu'ils ne sont pas révisés explicitement.

## Vision

> Chapter n'est pas l'endroit où l'on compte les livres lus. C'est l'endroit où chaque lecture laisse une trace, et où ces traces deviennent des chemins vers les autres.

Chapter se distingue d'un catalogue social par trois engagements :

1. **Commencer par lire** : l'œuvre et le repère de lecture précèdent le profil, les statistiques et le graphe social.
2. **Transformer la mémoire en chemins** : notes, critiques, listes et conversations donnent du sens aux lectures sans les réduire à des compteurs.
3. **Protéger l'intime** : le Journal, la Bibliothèque et les notes restent privés ; rendre une trace publique est un geste explicite et réversible.

## Acquisition et activation

- Le cœur d'acquisition vise d'abord les jeunes lecteurs, nouveaux lecteurs et personnes qui n'ont pas encore investi une autre application.
- Les lecteurs déjà équipés ne sont pas ignorés : une migration privée et fiable réduit leur coût de changement, mais ne dicte pas l'expérience initiale.
- L'activation ne dépend ni d'un questionnaire de goûts, ni d'un profil complété, ni d'abonnements imposés. Le premier cycle est : **une œuvre → un statut → un premier repère**.
- Une création de compte demandée au bon moment restaure l'action et l'emplacement qui l'ont déclenchée.
- Pas de visite guidée à projecteur ou de surcouche bloquante. Des indices contextuels, courts et affichés une seule fois peuvent accompagner une action inhabituelle.
- La croissance ne doit pas reposer sur des notifications anxiogènes, des séries artificielles, de la publication implicite ou un graphe social obligatoire.

## Modèle d'expérience

### Espaces principaux

- **Journal** : chronologie privée et sensible des lectures et repères.
- **Bibliothèque** : organisation privée des œuvres, statuts et filtres utiles.
- **Découvrir** : chemins éditoriaux compréhensibles, utiles même sans historique.
- **Recherche** : accès exact et immédiat aux œuvres, auteurs, lecteurs et listes.

Une œuvre, une liste publique, une critique, un profil public et une conversation publique sont consultables sans compte. Journal et Bibliothèque ne sont jamais publics.

### Lecture et traces

- Statuts : `À lire`, `En cours`, `Lu` ; la relecture ne crée pas une œuvre dupliquée.
- La progression est facultative et manuelle. Elle prend la forme d'un marque-page stylisé, utile comme repère ponctuel et non comme obligation de suivi quotidien.
- La possession d'un exemplaire n'appartient pas au modèle central : Chapter accompagne la lecture, pas l'inventaire matériel.
- Une note privée et une critique publique sont deux objets distincts. Une trace privée n'est ni publiée ni exploitée sémantiquement sans nouveau consentement explicite.
- Chaque publication publique a une visibilité compréhensible et peut être retirée. Aucun contenu personnel n'est rendu public par défaut.

### Identité et confiance

- La navigation publique ne requiert pas de compte.
- L'identité publique est demandée lors de la première action visible aux autres : un `Nom public` non unique est requis, la photo est facultative.
- L'unicité et les permissions reposent sur un `user_id` interne stable. Un identifiant public unique peut être proposé plus tard, sans être nécessaire au démarrage.
- Les homonymes ne sont jamais résolus par une heuristique de photo ou de biographie côté système ; le backend utilise les identifiants stables et l'interface fournit simplement assez de contexte humain.
- Le blocage agit partout. L'export est complet ; l'import reste privé jusqu'à une publication volontaire.
- La suppression de compte exige réauthentification et confirmation. Les données privées, le profil et les publications propres disparaissent ; les réponses écrites par d'autres restent attribuées à leurs auteurs autour d'un repère neutre « Publication retirée ». Toute conservation légale ou de sécurité est minimale et documentée.

## Direction visuelle et comportementale

### Grammaire

- Atelier éditorial contemporain : papier, encre, marge, sceau, poinçon et marque-page, sans pastiche ancien.
- Les couvertures portent la majorité de la couleur ; la brique sert de ponctuation et non de bain chromatique.
- Conserver les silhouettes fortes déjà conçues : emblème, carte de visite, badges, marque-page et couverture comme objet.
- Les assets se répartissent en quatre familles : mémoire, découverte, conversation et identité. Un visuel marketing peut idéaliser une atmosphère, jamais inventer une fonction. L'échelle, la hiérarchie et la règle d'une idée par asset sont définies dans [`ASSET_SYSTEM.md`](../design/ASSET_SYSTEM.md).

### Densité

- Rythme éditorial respirant pour œuvres, critiques et listes.
- Densité de parcours pour Journal, Découvrir et conversations.
- Densité utilitaire pour Bibliothèque, Recherche et réglages.
- Échelle d'espacement : `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`.
- Typographies : Newsreader pour la voix éditoriale, Inter pour l'interface.
- Point de bascule responsive de référence : `900 px`, à vérifier selon le contenu plutôt qu'à appliquer aveuglément.
- Éviter les mosaïques de cartes et l'imbrication de cartes dans des cartes.

### Composants et mouvement

- La refonte couvre aussi boutons, champs, menus, dialogues, cartes, zones, états et micro-interactions ; elle ne se limite pas aux grands écrans.
- Navigation, recherche et tri répondent immédiatement.
- Bouton : environ `120 ms` ; menu : `140 ms` à l'ouverture et `100 ms` à la fermeture ; dialogue : `180/120 ms` ; retournement de carte : environ `440 ms`.
- AM1 reste le principe des surfaces : fondu à la position finale, texte immobile, animation interruptible. Le mode de mouvement réduit rend les transitions immédiates.
- Aucun effet de célébration automatique sur les badges. Les mouvements doivent expliquer un changement d'état, pas réclamer de l'attention.

## Feuille de route verticale

| Jalon | Résultat évalué par l'utilisateur |
| --- | --- |
| **P0 — Fondations du prototype** | Tokens, coquilles responsive, modèle de fixtures et primitives partagées capables de porter la refonte sans dette supplémentaire. |
| **P1 — Premier contact public** | Comprendre Chapter, explorer et ouvrir une œuvre sans compte. |
| **P2 — Premier repère** | Choisir un statut, créer le premier repère et s'inscrire sans perdre son geste. |
| **P3 — Usage personnel quotidien** | Journal, Bibliothèque, progression facultative, notes privées et relecture. |
| **P4 — Dimension sociale** | Critiques, profils, listes et conversations, avec publication explicite. |
| **P5 — Confiance et contrôle** | Identité publique, confidentialité, blocage, export, import et suppression. |
| **P6 — États transversaux** | Vide, erreur, chargement, contenus extrêmes, accessibilité, responsive et mouvement réduit. |
| **P7 — Recette complète** | Parcours de bout en bout, non-régression et décision de fusion vers `main`. |

Chaque jalon est une tranche verticale testable. Les écrans ne doivent pas contenir de contrôles morts ; l'état de session et les fixtures simulent les contrats futurs avec des identifiants stables. Le prototype doit inclure plusieurs dizaines d'œuvres et de profils utiles aux parcours, ainsi qu'une persona de Bibliothèque d'environ 500 œuvres pour éprouver la densité et les performances perçues.

## Contrat Git et continuité entre chats

- Branche de refonte : `refonte-pre-lot-2`, créée depuis le `main` GitHub accepté du lot 1.
- P0 à P6 : une candidate visuelle complète et vérifiée est mise directement à disposition sur le Site de recette. Elle reste hors de la branche GitHub de refonte jusqu'à validation explicite ; le jalon accepté et ses documents sont alors poussés sur cette branche, puis la référence distante est relue.
- P7 : la recette complète et l'accord explicite de l'utilisateur sont requis avant toute fusion vers `main`.
- Aucun force-push, aucune réécriture d'historique et aucun déploiement implicite.
- Un nouveau chat peut être utilisé par jalon. Il commence par `npm run context`, vérifie la branche active, lit ce document puis le contrat du jalon concerné. Le chat précédent n'est jamais la seule mémoire.
- À la fin d'un jalon, `docs/agents/AGENT_CONTEXT.md` précise le statut, les preuves, les reports et l'unique prochaine action. Le document du jalon conserve le détail.

## Hors périmètre immédiat

Le backend réel, l'authentification de production, la persistance distante, la modération opérationnelle, l'algorithme de recommandation et la migration connectée appartiennent au lot 2. P0 peut préparer leurs contrats et adaptateurs, mais ne doit pas les simuler comme des services réellement disponibles.
