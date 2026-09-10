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
| Atlas de recherche P2 | Un livre ouvert se dissout en fragments de pages et lignes de repérage reliés par un fil brique ; famille découverte | `assets/editorial/p2-search-atlas-master.png` ; `public/editorial/p2-search-atlas.webp` | source PNG 1536 × 1024 avec transparence ; diffusion WebP 1440 × 960, 134 590 octets | Illustration originale générée le 6 septembre 2026 avec OpenAI ImageGen : graphite, fusain et lavis translucides, bords diffus et grand espace négatif. L’asset flotte sans cadre dans Recherche et ne reprend pas la nature morte rectangulaire de Découvrir. |
| Marque-page de progression P3 | Un repère matériel rend la progression volontaire immédiatement tangible ; famille mémoire | `assets/editorial/p3-reading-bookmark-master.png` ; `public/editorial/p3-reading-bookmark.webp` | source PNG 1024 × 1536 avec transparence, 1 451 943 octets ; diffusion WebP recadrée 420 × 640, 12 696 octets | Objet original généré le 6 septembre 2026 avec OpenAI ImageGen : carton ivoire à grain discret et cordon textile brique, sans texte ni symbole. La page actuelle reste du HTML superposé et accessible ; l’asset est réservé aux lectures en cours et se place latéralement aux informations textuelles. |
| Famille d’états vides P6 | Sept variations d’un même vocabulaire d’objets en papier : journal, rayonnage, carte, index, ex-libris, feuillets liés et plume ; familles mémoire, découverte, identité et conversation | `assets/editorial/p6-empty-{journal,library,discover,search,profile,list,trace}-master.png` ; `public/editorial/p6-empty-{journal,library,discover,search,profile,list,trace}.webp` | sources PNG 1536 × 1024 avec transparence, 2,42 à 2,84 Mo ; diffusions WebP 1200 × 800, 46 728 à 172 422 octets | Série originale générée les 9 et 10 septembre 2026 avec OpenAI ImageGen : encre, graphite et lavis chaud, accent brique restreint, sans cadre ni texte. Le détourage final conserve un vrai canal alpha ; chaque asset est contrôlé sur le papier Chapter et borné dans sa figure pour ne jamais recouvrir le texte. |
| Réussite de portabilité P7 | Une enveloppe-archive, des fiches de lecture et un ruban brique matérialisent un transfert achevé sans triomphalisme ; famille mémoire | `assets/editorial/p7-data-success-master.png` ; `public/editorial/p7-data-success.webp` | source PNG 1536 × 1024 avec transparence, 2 092 480 octets ; diffusion WebP 768 × 512, 42 160 octets | Illustration originale générée le 10 septembre 2026 avec OpenAI ImageGen : gouache et crayon éditoriaux, papier ivoire, graphite et ruban brique, sans texte, logo ni interface. L’asset est réservé aux confirmations d’import et d’export. |

L'asset P1 est réservé à l'ouverture publique. Il soutient la promesse de mémoire et de chemin sans remplacer les couvertures, qui demeurent les masses colorées liées aux œuvres. L’asset P2 est réservé à Recherche : sa transparence, son débordement et sa disparition progressive dans le fond doivent être conservés afin qu’il ne devienne jamais une seconde image cadrée.

L’asset P3 n’instaure pas une illustration obligatoire par destination. Dans une Bibliothèque remplie, les couvertures constituent déjà la matière visuelle ; un poinçon ou ex-libris reste envisageable uniquement pour l’état vide si une recette future en confirme le besoin.

La famille P6 remplace cette éventualité par un contrat explicite : les absences globales de Journal, Bibliothèque, Découvrir et Recherche partagent une composition ample ; Profil, listes et critiques utilisent la même famille dans une composition compacte. Les recherches ou filtres sans résultat conservent leurs contrôles et ne sont pas assimilés à un catalogue globalement vide.
