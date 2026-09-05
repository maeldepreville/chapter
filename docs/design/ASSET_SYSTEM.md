# Chapter — système d'assets

Dernière mise à jour : 5 septembre 2026.

Statut : **principes validés pour la refonte**.

Ce document transforme les cinq recommandations du brief `Assets.md` fourni par l'utilisateur en règles exécutables pour Chapter. Il gouverne les illustrations marketing, visuels de fonctionnalités et compositions promotionnelles ; les composants réels de l'application restent gouvernés par le système UI.

## Mission

Un asset doit donner envie d'entrer dans l'univers de Chapter avant d'en expliquer tous les détails. Il peut condenser, mettre en scène et idéaliser une atmosphère, comme une image éditoriale de campagne. Il ne doit toutefois pas promettre une fonction inexistante, un résultat impossible ou une action qui ne sera pas disponible dans le jalon présenté.

## Cinq règles

### 1. Désir avant exhaustivité

- Montrer le bénéfice émotionnel ou le geste central, pas une documentation d'écran.
- Autoriser une composition plus séduisante que la capture brute si son sens reste honnête.
- Préférer un détail évocateur — marque-page, annotation, carte, sceau, conversation — à une interface entière miniaturisée.

### 2. Une échelle commune

- Définir une échelle propre aux assets pour typographies, bordures, rayons, ombres, marges et tailles des objets.
- Garder une taille perceptive cohérente d'un visuel à l'autre : un même composant ne change pas arbitrairement de poids ou de proportion.
- Tester les séries ensemble, jamais uniquement asset par asset.

### 3. Une direction répétable

- Répéter papier, encre, marge, sceau, poinçon et marque-page dans une interprétation contemporaine.
- Utiliser les couvertures comme principales masses colorées ; la brique ponctue et signe.
- Conserver une lumière, un niveau de texture, un traitement des ombres et une perspective cohérents par campagne.
- Rattacher chaque visuel à une famille : **mémoire**, **découverte**, **conversation** ou **identité**.

### 4. Soutenir la hiérarchie

- L'asset accompagne le contenu éditorial ; il ne concurrence ni le titre de page ni le CTA réel.
- Éviter dans l'image les gros boutons brique, les faux CTA dominants et les titres capables d'être confondus avec l'interface.
- Maintenir un point focal clair et assez d'espace calme autour de lui.

### 5. Une idée par asset

- Un asset porte une promesse ou un geste unique.
- Pas de pavé, de corps minuscule ou de capture complète illisible.
- Recadrer sur le composant décisif et retirer tout élément qui ne renforce pas l'idée.

## Grammaire commune

| Élément | Rôle dans les assets |
| --- | --- |
| Papier et marges | Mémoire, respiration, espace de lecture |
| Encre et typographie | Voix éditoriale, précision |
| Brique | Accent, geste ou signature ; jamais aplat omniprésent |
| Couverture | Couleur, singularité de l'œuvre, point focal |
| Marque-page | Repère volontaire et progression facultative |
| Sceau ou poinçon | Identité, accomplissement et appartenance |
| Carte de visite | Identité publique choisie |
| Badges | Trace d'un parcours ; jamais mécanisme de pression |

## Gabarit de brief

Avant de produire un asset, renseigner :

- **Idée unique :** la phrase que le visuel doit faire comprendre.
- **Famille :** mémoire, découverte, conversation ou identité.
- **Composant héros :** l'objet recadré au premier plan.
- **Contexte :** campagne, page ou jalon où il apparaîtra.
- **Échelle :** format, ratio et relation avec la série existante.
- **Attributs constants :** lumière, texture, ombre, perspective, marges.
- **Interdit spécifique :** fonction non livrée, faux CTA ou texte à ne pas simuler.

## Contrôle avant intégration

- [ ] Une seule idée est compréhensible en quelques secondes.
- [ ] Le composant héros reste lisible à la taille réelle d'affichage.
- [ ] L'asset appartient visiblement à la même famille que la série.
- [ ] L'échelle, les bordures, la lumière et les ombres sont cohérentes avec les assets voisins.
- [ ] Aucun titre ou faux CTA ne vole la priorité au contenu réel.
- [ ] Aucune fonction inexistante n'est promise.
- [ ] Le fichier, son format, ses dimensions, son poids et sa source sont consignés lorsqu'il entre dans le dépôt.

P0 pose les tokens et les emplacements capables d'accueillir ce système. La production d'une campagne complète n'appartient pas à P0 sauf demande explicite.

## Registre des assets éditoriaux intégrés

| Asset | Idée et famille | Fichiers | Dimensions et poids | Source |
| --- | --- | --- | --- | --- |
| Trace de lecture P1 | Un marque-page brique relie la marge d'un livre ouvert à un autre ouvrage ; familles mémoire et découverte | `assets/editorial/p1-reading-trace-master.png` ; `public/editorial/p1-reading-trace.webp` | source PNG 1448 × 1086, 3 072 200 octets ; diffusion WebP 1400 × 1050, 190 034 octets | Illustration originale générée le 5 septembre 2026 avec OpenAI ImageGen à partir du brief Chapter : nature morte éditoriale contemporaine, encre et graphite sur papier chaud, accent brique restreint, sans texte lisible ni faux contrôle. Conversion WebP locale, qualité 84. |

L'asset P1 est réservé à l'ouverture publique. Il soutient la promesse de mémoire et de chemin sans remplacer les couvertures, qui demeurent les masses colorées liées aux œuvres.
