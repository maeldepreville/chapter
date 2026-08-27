# Chapter — Phase 10 : découverte et interactions sociales

Statut : **implémentation JI1, correctifs PDR1B, QR1 et HDE1 publiés — évaluation utilisateur ouverte**
Dernière mise à jour : 27 août 2026

## Objectif de la phase

Faire évoluer Chapter du journal de lecture personnel vers une expérience où les œuvres, les opinions et les lecteurs enrichissent mutuellement la découverte, sans transformer le produit en fil social générique.

La phase doit préserver les fondations déjà validées : utilité personnelle autonome, publication volontaire, calme visuel, modèle centré sur l’œuvre et absence de hiérarchie dominée par les métriques de popularité.

## Point de départ validé

La première valeur de la découverte est de **trouver des œuvres pertinentes**, y compris pour une personne qui ne suit encore aucun lecteur.

Les lecteurs, critiques et listes publiques sont donc introduits ensuite comme :

- des indices permettant de comprendre pourquoi une œuvre peut convenir ;
- des chemins pour poursuivre l’exploration ;
- des occasions de créer progressivement un cercle de lecteurs pertinents.

Ils ne doivent pas rendre la découverte initiale dépendante d’un graphe social déjà constitué.

## Conséquences de cadrage

- L’entrée principale de la découverte doit mettre les œuvres au premier plan.
- La pertinence doit rester intelligible : Chapter doit donner des raisons éditoriales de s’intéresser à une œuvre plutôt qu’afficher une recommandation opaque.
- Les signaux sociaux peuvent renforcer une proposition, mais ne doivent pas réduire la qualité à un volume de notes, de réactions ou d’abonnés.
- Un nouvel utilisateur doit pouvoir obtenir une sélection utile à partir de signaux non sociaux ou déclaratifs.
- Les interactions sociales devront soutenir la lecture, l’expression et la conversation ; elles ne seront pas conçues pour maximiser le défilement ou la comparaison sociale.

## Décision validée — D4, pertinence progressive

Les œuvres proposées reposent sur une combinaison progressive de quatre familles de signaux :

1. une sélection éditoriale immédiatement utile, indépendante de l’historique et du cercle social ;
2. les traces du journal personnel — œuvres ajoutées, statuts, évaluations et critiques — lorsqu’elles deviennent assez nombreuses pour être informatives ;
3. une intention ponctuelle et facultative exprimée par le lecteur, par exemple une atmosphère, un thème ou un type d’expérience recherché ;
4. les lecteurs suivis, leurs critiques et leurs listes publiques, une fois qu’un cercle pertinent existe.

Cette combinaison ne doit pas devenir un score opaque. Chapter explicite la raison principale de chaque proposition avec une formulation compréhensible, telle que « Dans la continuité de… », « Pour une lecture contemplative » ou « Recommandé par une personne que vous suivez ».

D4 préserve ainsi la valeur de la découverte lors du démarrage, enrichit progressivement la pertinence sans questionnaire obligatoire et empêche la popularité sociale de devenir le signal dominant.

## Décision validée — N2, destination « Découvrir »

« Découvrir » devient une destination principale de Chapter et remplace « Recherche » dans la navigation mobile. La barre inférieure y présente donc **Journal · Découvrir · Bibliothèque**.

Sur desktop, « Découvrir » rejoint les destinations de navigation. Le champ de recherche rapide reste visible dans l’en-tête : il continue de proposer quelques œuvres et auteurs pendant la saisie, tandis qu’une validation de la requête ouvre « Découvrir » dans son état de résultats.

La destination réunit ainsi deux intentions sans les confondre :

- **chercher**, lorsque le lecteur connaît déjà un titre ou un auteur ;
- **explorer**, lorsqu’il souhaite trouver une œuvre sans requête précise.

Le Journal demeure strictement personnel et la découverte n’est pas fragmentée entre plusieurs écrans contextuels. N2 révise explicitement la navigation à trois entrées validée en phase 3, dont la destination « Recherche » devient « Découvrir ».

## Décision validée — C2, chemins éditoriaux

La destination « Découvrir » adopte une hiérarchie de **chemins éditoriaux** plutôt qu’une succession uniforme de rayons ou une mosaïque dense.

Après le titre et le contrôle de recherche, une proposition principale est mise en contexte : Chapter indique la raison de sa présence et donne assez d’éléments pour comprendre la parenté proposée avant d’ouvrir l’œuvre. Des chemins secondaires permettent ensuite de poursuivre l’exploration selon une envie, une proximité littéraire ou une médiation sociale.

La page ne reproduit donc ni un catalogue marchand, ni un fil social. Sa structure doit conserver :

- une recommandation principale clairement expliquée ;
- plusieurs directions de poursuite distinctes plutôt qu’une liste sans fin ;
- une fin naturelle à chaque ensemble ;
- une différence visible entre justification personnelle, intention déclarée, sélection éditoriale et signal social ;
- une composition calme où les couvertures soutiennent l’exploration sans devenir une grille répétitive dominante.

C2 est préférée aux rayons successifs, jugés trop proches des plateformes de catalogue, et à la mosaïque de pistes, dont la hiérarchie est plus dense et moins prévisible.

## Décision validée — P4, priorité adaptative

La proposition principale utilise le signal le plus explicite et le plus informatif disponible selon un ordre stable :

1. une intention ponctuelle actuellement exprimée par le lecteur ;
2. les traces du journal lorsqu’elles sont assez nombreuses et cohérentes pour justifier la proposition ;
3. une sélection éditoriale indépendante comme état de repli ;
4. les signaux sociaux pour enrichir ou départager les possibilités, jamais comme justification unique.

La page affiche toujours une proposition utile sans exiger de questionnaire. Exprimer une envie remplace temporairement la piste principale sans modifier durablement le profil de goût ni effacer les autres chemins. Lorsque le journal est mobilisé, la parenté retenue est nommée ; Chapter n’affirme pas connaître les goûts du lecteur au-delà des traces réellement disponibles.

La hiérarchie est donc adaptative, mais son comportement reste prévisible et explicable. La découverte sociale ne peut pas occuper automatiquement la première place en raison de la seule popularité d’une œuvre ou d’un lecteur.

## Décision validée — A2, ajout rapide à « À lire »

Dans « Découvrir », la couverture et le titre ouvrent la page de l’œuvre. Lorsqu’elle est absente de la bibliothèque, une action secondaire permet de l’ajouter directement avec le statut « À lire ».

L’ajout produit le retour annulable déjà validé pour Chapter. Il ne demande ni date, ni évaluation et ne publie aucune activité. Si l’œuvre est déjà enregistrée, son statut actuel est seulement indiqué ; sa modification reste disponible sur la page de l’œuvre afin de ne pas transformer la découverte en surface complète de suivi.

A2 est préférée à la consultation seule, qui ajoute une étape inutile pour conserver une découverte, et au sélecteur complet de statut, jugé trop lourd et plus exposé aux manipulations accidentelles dans ce contexte.

## Décision validée — BP2, une œuvre et deux échos

Le bloc principal présente une œuvre clairement prioritaire, accompagnée de deux alternatives plus discrètes rattachées à la même piste.

L’œuvre principale reçoit la justification complète, un court texte de mise en relation et les actions validées par A2. Les deux échos sont différenciés par une nuance compréhensible — par exemple « plus contemplatif » ou « plus resserré » — et permettent de bifurquer sans recréer un rayon de couvertures.

BP2 est préférée à une œuvre unique, qui donnerait une autorité excessive à une seule recommandation, et à un triptyque sans hiérarchie, qui affaiblirait le chemin éditorial retenu avec C2. Sur mobile, l’œuvre principale reste complète avant les deux échos, qui se succèdent sans carrousel horizontal obligatoire.

## Décision validée — I2, phrases d’envie

L’intention ponctuelle est exprimée par un petit ensemble de phrases naturelles introduites par « Aujourd’hui, j’aimerais… », par exemple « être transporté ailleurs », « lire quelque chose de calme » ou « me laisser surprendre ».

Ces formulations évitent de demander au lecteur de connaître un genre, un vocabulaire de recommandation ou les critères internes de Chapter. Elles restent facultatives, peu nombreuses et renouvelées afin de ne pas se transformer en taxonomie exhaustive ou en grille permanente de préférences.

Une seule phrase peut être active à la fois. Elle décrit une envie du moment et ne modifie pas durablement le profil supposé du lecteur. I2 est préférée aux filtres rapides, trop proches d’un catalogue, et au choix guidé, dont le mini-formulaire introduit un effort disproportionné.

## Décision validée — R1, transformation sur place

Lorsqu’une phrase d’envie I2 est sélectionnée, le bloc BP2 se transforme sur place : son œuvre principale et ses deux échos sont remplacés par une piste correspondant à l’intention active.

La phrase choisie reste visible à proximité du bloc avec une action « Effacer ». Cette action restaure immédiatement la proposition précédente et son contexte, sans recalcul durable du profil ni navigation arrière. Les autres chemins de « Découvrir » conservent leur place et leur état.

R1 est préférée à un mode de résultats séparé, qui fragmenterait l’exploration, et à l’ajout d’un second bloc, qui répéterait la structure et allongerait inutilement la page.

## Décision validée — S2, une liste publique ouvre un univers

La première porte d’entrée sociale de « Découvrir » est une liste publique composée par un lecteur. Elle présente un titre éditorial, une courte intention, l’identité de son auteur et un aperçu de plusieurs œuvres.

La liste permet de découvrir une sensibilité à travers des choix concrets avant de mettre la personne elle-même au premier plan. Elle ne comporte ni rang obligatoire, ni score de popularité dominant. L’action principale ouvre l’ensemble des œuvres ; le profil du lecteur reste accessible depuis son identité.

S2 est préférée à une critique isolée, plus adaptée à l’approfondissement d’une œuvre, et à une carte de profil directe, qui placerait la relation sociale avant la valeur de découverte. Ces deux chemins restent disponibles dans leurs contextes respectifs.

## Décision validée — O2, page publique autonome pour une liste

Une liste publique s’ouvre dans une destination autonome disposant de son propre lien partageable. La page présente son titre, son intention, son auteur et les œuvres dans un flux éditorial adapté aux listes courtes comme longues.

Chaque œuvre ouvre sa page habituelle. Le retour vers « Découvrir » restaure la position, l’intention active et le contenu de BP2. L’identité de l’auteur ouvre son profil public. La liste n’est pas obligatoirement classée et peut accompagner chaque œuvre d’une courte note de sélection.

O2 est préférée à l’expansion dans « Découvrir », qui allongerait et déséquilibrerait la destination, et à une fenêtre superposée, peu adaptée à la lecture, au partage et aux listes longues.

## Décision validée — F1, suivre depuis un contenu

L’action « Suivre » est disponible directement dans la zone d’auteur d’une liste publique. Elle reste secondaire par rapport au contenu, explicite et immédiatement réversible.

Le bloc d’identité situé à gauche du bouton — avatar, nom et indication de rôle — constitue une cible cliquable unique qui ouvre le profil public. Le bouton « Suivre » conserve une cible indépendante ; cliquer sur l’identité ne déclenche jamais l’abonnement et cliquer sur l’abonnement n’ouvre pas le profil.

F1 permet une décision contextualisée sans imposer une visite préalable du profil. Elle est préférée au profil obligatoire, qui ajoute une friction, et à la suggestion différée, qui dépendrait d’un seuil invisible et d’une sollicitation calculée.

## Décision validée — PR1, portrait éditorial

Le profil public est conçu comme un portrait de goût plutôt que comme un fil d’activité ou une bibliothèque exhaustive. Il rassemble une identité courte, quelques œuvres de chevet, les listes publiques et une sélection limitée de critiques.

Les notes privées, l’historique personnel et les statuts non publiés restent exclus. Les volumes de lecture, la fréquence de publication et les métriques sociales ne structurent pas la hiérarchie du profil. L’action « Suivre » reste accessible dans l’ouverture.

PR1 est préférée au flux chronologique, qui valoriserait la fréquence de publication, et à la bibliothèque publique exhaustive, qui exposerait davantage le suivi personnel et rapprocherait le profil d’un catalogue.

## Axes de différenciation du profil

Trois capacités supplémentaires sont ouvertes à l’analyse sans décision définitive à ce stade :

- ajout facultatif d’une photo de profil, avec solution de remplacement typographique ;
- éventuelle reconnaissance publique sous forme de titre ou de distinction, dont les critères et les garde-fous restent à définir ;
- ajout d’un unique élément visuel personnalisable pour donner une signature au profil sans fragmenter le langage graphique de Chapter.

Les pistes de titre fondé sur le nombre d’œuvres lues et de badge attribué au premier lecteur enregistré doivent être évaluées au regard des risques de comparaison, de course artificielle, de déclarations opportunistes et de hiérarchie sociale.

### Photo de profil facultative — principe validé

Le lecteur peut ajouter une photo de profil. Cette personnalisation reste facultative et conserve une solution de remplacement typographique fondée sur les initiales. Le recadrage, les formats, les états d’erreur et la modération seront détaillés avant l’implémentation.

### Gamification — orientation validée

Chapter ne cherche pas uniquement à éviter les mécaniques manipulatrices : le produit doit aussi encourager activement la lecture, l’exploration de nouvelles œuvres, la contribution et les rapprochements entre lecteurs.

Le futur système doit donc proposer de véritables objectifs poursuivables, et non de simples titres obtenus après une première action. L’analyse doit chercher un équilibre entre :

- progression suffisamment visible pour donner envie de poursuivre ;
- récompenses liées à une valeur réelle pour le lecteur ou la communauté ;
- contrôle de l’exposition publique et absence de classement global dominant ;
- garde-fous contre la course artificielle, les déclarations opportunistes et la production de contenu de faible qualité.

L’idée de récompenser les premiers lecteurs d’œuvres peu découvertes reste ouverte, mais doit être reformulée afin de soutenir réellement les œuvres de niche sans créer une rareté purement chronologique.

### Quatre axes de progression — principe validé

La progression de Chapter s’organise autour de quatre axes indépendants et simultanés :

1. **Lecture**, pour accompagner l’engagement dans les œuvres et l’élargissement de la pratique ;
2. **Exploration**, pour encourager la découverte d’œuvres, d’auteurs et de territoires moins fréquentés ;
3. **Expression**, pour valoriser les critiques et sélections qui apportent un éclairage réel ;
4. **Relation**, pour reconnaître les rapprochements construits autour des œuvres et des publications.

Ces axes ne sont ni des spécialisations à choisir, ni quatre parcours linéaires. Chaque lecteur progresse dans les quatre en parallèle selon ses usages. Une **quête** désigne un objectif poursuivable, la **progression** rend visible l’avancement, un **badge** récompense un palier atteint, le **palier suivant** donne une direction concrète et un unique **titre équipé** permet au lecteur de choisir la distinction visible près de son nom.

La progression obtenue n’est pas perdue. Les noms, seuils et critères précis des quêtes restent à arbitrer, notamment pour l’axe Exploration et la future distinction « Éclaireur ». Leur intégration visuelle dans PR1 doit rendre l’engagement perceptible sans reléguer les œuvres, listes et critiques au second plan.

### GP1 — signature intégrée au portrait

Le profil PR1 affiche une sélection resserrée de distinctions directement sous son introduction, avant les œuvres de chevet. Cette signature associe un unique titre équipé près de l’identité et jusqu’à trois badges mis en avant par le lecteur ; la collection complète reste accessible dans une destination secondaire.

GP1 fixe la hiérarchie de l’information, mais pas encore le dessin définitif des distinctions. Les badges seront produits comme de véritables assets illustrés et détourés, sans grande carte rectangulaire individuelle. Leur appellation apparaît directement sous chaque insigne. Les rectangles employés dans la comparaison initiale ne constituent donc pas un composant validé.

Une distinction conserve deux expressions complémentaires : son **insigne**, qui est l’asset visuel accompagné de son appellation, et son éventuel **titre équipé**, qui reprend une distinction obtenue près du nom du lecteur.

### G1 — « Chapitres d’honneur »

La collection complète des distinctions prend le nom **« Chapitres d’honneur »**. Cette formulation relie chaque distinction à une étape marquante du parcours du lecteur et donne à la galerie une identité propre à Chapter sans reprendre le vocabulaire générique des trophées.

Les titres publics ne comportent aucune numérotation, y compris sous forme de chiffres romains. Chaque palier reçoit une appellation unique dont la sémantique exprime une évolution réelle de la pratique : le passage d’un titre au suivant ne doit pas être une simple augmentation quantitative maquillée. Les compteurs éventuellement nécessaires pour comprendre une progression peuvent exister dans l’espace personnel, mais ne font pas partie du nom public d’une distinction.

### T3 — lignées principales et distinctions honorifiques

Le système associe deux formes complémentaires de reconnaissance :

- quatre **lignées principales**, une par axe, composées de titres successifs dont la sémantique raconte une évolution durable de la pratique ;
- cinq **distinctions honorifiques**, obtenues grâce à des accomplissements avancés et entièrement indépendantes des quatre axes.

Les lignées conservent une direction de long terme et rendent les prochains horizons compréhensibles. Les distinctions honorifiques empêchent cependant toute la collection de se réduire à quatre échelles quantitatives parallèles. Elles ne possèdent ni couleur d’axe, ni progression par palier, ni contribution à Lecture, Exploration, Expression ou Relation.

Tout titre obtenu, qu’il appartienne à une lignée ou à une distinction honorifique, peut être choisi comme titre équipé. Cette formulation révise l’idée antérieure selon laquelle chaque axe associerait sa lignée à ses propres distinctions singulières.

### L4 — quatre titres par lignée

Chacune des quatre lignées principales comporte **quatre titres**. Cette longueur permet de raconter une évolution en quatre temps — éveil, pratique établie, maîtrise puis transmission — sans multiplier les nuances artificielles ni rendre les récompenses trop rares.

La cohérence du nombre d’étapes facilite la compréhension d’un axe à l’autre et limite la production principale à seize assets. Les distinctions honorifiques apportent ensuite des accomplissements supplémentaires sans allonger les lignées. Le premier titre n’est pas accordé après une action triviale : l’avancement peut être visible avant son obtention, mais le titre doit déjà consacrer une pratique significative.

### M3 — jalons composés et concis

L’obtention d’un titre repose sur un **jalon composé** : un objectif principal clairement mesuré et au maximum deux conditions secondaires servant à vérifier que la pratique correspond réellement au sens du titre. Chapter n’utilise ni score agrégé, ni formule de points à apprendre.

La présentation doit rester immédiatement lisible :

- trois critères au maximum ;
- une seule ligne concise par critère ;
- un compteur direct ou une coche comme état ;
- aucune activation manuelle, la progression est calculée automatiquement ;
- aucun texte explicatif nécessaire pour comprendre ce qu’il reste à faire ;
- des détails facultatifs uniquement pour expliquer la définition d’un critère ou son éligibilité.

Les conditions d’un jalon restent dans le même axe. Une progression en Exploration ne peut donc pas obliger à publier une critique, qui relève de l’Expression. Les critères doivent être objectifs, contrôlables et exempts de score secret de qualité.

### V1 — progression rattachée au profil

Les quêtes, jalons et progressions ne sont rappelés ni dans le Journal, ni dans la navigation principale. Ils se consultent depuis **« Chapitres d’honneur »**, directement rattaché au profil du lecteur.

Cette localisation affirme que les distinctions décrivent un parcours et une identité de lecteur plutôt qu’une liste quotidienne de tâches. Le Journal reste centré sur les œuvres et les traces personnelles ; Chapter ne transforme pas les objectifs en sollicitations permanentes. Les badges sélectionnés et le titre équipé restent visibles dans PR1 selon GP1.

### PV1 — acquis publics, progression strictement privée

Lorsqu’un lecteur consulte les « Chapitres d’honneur » d’un autre profil, il voit uniquement les distinctions déjà obtenues. Aucun titre verrouillé, objectif en cours, compteur, pourcentage ou critère incomplet n’est exposé publiquement.

Le propriétaire du profil retrouve dans la même destination sa collection acquise et ses progressions personnelles. Cette vue privée doit toutefois rester aussi minimale que possible : elle montre où en est le lecteur sans transformer la galerie en tableau de suivi dense. La forme exacte de cette synthèse minimale reste à arbitrer.

### MP1 — une ligne de progression, uniquement dans la galerie

Dans la vue personnelle de « Chapitres d’honneur », chaque prochain titre peut résumer son jalon M3 sur une seule ligne, par exemple « 3/5 œuvres · territoires acquis · 2/3 auteurs ». Les formulations détaillées restent accessibles à la demande.

Cette ligne n’apparaît jamais directement sur la page de profil. PR1 conserve uniquement le titre équipé, les trois badges choisis et un accès discret à la galerie. Les compteurs et objectifs restent donc contenus dans « Chapitres d’honneur », afin de préserver le charme éditorial du profil.

### AC1 — titre de section cliquable

Sur PR1, l’intitulé **« Chapitres d’honneur → »** introduit les trois badges choisis et constitue lui-même l’accès à la galerie. Aucun lien supplémentaire après les badges et aucun onglet de profil ne sont ajoutés.

Cette entrée reste explicite tout en préservant la lecture continue du portrait. Le titre équipé et les badges demeurent expressifs ; ils ne sont accompagnés d’aucune progression. La galerie s’ouvre depuis son nom, ce qui évite de transformer les assets en contrôles ambigus.

### HM3 — mur continu des dernières évolutions, hiérarchie révisée par HDE1

« Chapitres d’honneur » adopte un **mur continu d’insignes** plutôt qu’un découpage visible en quatre blocs. La vue personnelle rassemble la dernière évolution obtenue dans chacun des quatre axes, le prochain badge grisé de chaque lignée et les distinctions honorifiques obtenues.

Les anciens paliers d’une lignée ne sont plus affichés : le badge est considéré comme un même insigne qui évolue, et seule sa forme la plus récente demeure dans le mur. Les distinctions honorifiques, qui ne constituent pas des niveaux successifs, s’accumulent séparément dans ce même ensemble.

Sur desktop, survoler ou placer le focus sur un badge ouvre une mini-fiche ancrée sous celui-ci. Sur mobile, un toucher produit le même contenu et un toucher extérieur le referme. Pour le propriétaire, la mini-fiche d’un prochain badge affiche son objectif et sa ligne MP1 ; pour un visiteur, seuls le sens et les critères déjà accomplis d’un badge acquis sont décrits, sans aucune progression personnelle.

### HDE1 — distinguer les honneurs du parcours, hiérarchie validée

Le retour de recette du 27 août relève que les honneurs exceptionnels sont perdus dans la masse des évolutions classiques. La composition actuelle les ajoute en fin de grille avec la même échelle et le même traitement que les badges de lignée. Cette indistinction est visuelle : T3, SGH1 et HH2 définissent déjà deux registres fonctionnels distincts.

HDE1 est validée : les honneurs obtenus ouvrent la galerie, sous « Distinctions singulières », avec une échelle légèrement supérieure, plus d'espace autour des insignes et une courte légende sur l'accomplissement. Le mur des quatre lignées poursuit ensuite la page sous « Au fil de votre parcours ». Les dessins validés ne changent pas ; aucune animation permanente, carte de trophée ou classification de rareté n'est ajoutée.

HDE1 révise explicitement le mélange des deux registres dans HM3. Le défilement continu, l'absence des anciens paliers, les paires acquis/prochain et la mini-fiche HMT1 sont conservés. La section honorifique reste absente si aucun honneur n'a été obtenu, conformément à HV1, sans révéler de collection à compléter. La sélection des trois badges du profil demeure inchangée.

La précision responsive demandée par l'utilisateur est également validée : sur desktop, les quatre familles Lecture, Exploration, Expression et Relation se lisent de gauche à droite, avec une colonne par famille, l'acquis en haut et le prochain badge grisé en dessous. Les colonnes appartiennent à une même surface ouverte, sans encadrés individuels. Sur mobile, chaque famille reprend une rangée complète, acquis à gauche et prochain à droite ; la fiche HMT1 reste sous cette paire. La vue publique supprime les prochains badges sans réserver leur emplacement.

Le périmètre consolidé a reçu l'autorisation explicite d'implémentation et de publication. La structure réalisée regroupe les badges par famille avant leur affichage, place les honneurs acquis dans une section distincte et conserve un état de sélection partagé ainsi qu'une seule zone de clic extérieur. Les rangées d'honneurs insèrent elles aussi la fiche sous la paire entière sur mobile. Des tests dédiés vérifient les paires, leur ordre, la confidentialité publique, les collections vides et les collections d'un à cinq honneurs. Le checkpoint 22 est publié après réussite du lint, de la construction de production et de quinze tests automatisés.

Le typage ciblé de `phase10.tsx` et `honors-layout.ts` passe. Le contrôle TypeScript global rencontre encore les déclarations Cloudflare absentes (`cloudflare:workers`, `Fetcher`, `D1Database`) dans les fichiers d'infrastructure non modifiés par ce lot ; il n'est donc pas présenté comme réussi. La recette navigateur des gestes et des tailles reste à effectuer par l'utilisateur après publication.

### ET1 — le titre évolue avec l’insigne

Lorsqu’un badge de lignée atteint une nouvelle évolution, son ancien titre est lui aussi remplacé. Si ce titre était équipé sur le profil, la nouvelle appellation prend automatiquement sa place.

Les titres équipables sont donc limités à la dernière évolution obtenue dans chacun des quatre axes et aux titres des distinctions honorifiques acquises. Un profil ne peut jamais afficher un ancien titre dont l’insigne n’existe plus dans son mur. Cette décision révise la règle antérieure selon laquelle tout titre déjà obtenu resterait équipable.

### ED3 — fenêtre de découverte confidentielle

La reconnaissance liée à la découverte d’une œuvre de niche devient l’une des **cinq distinctions honorifiques indépendantes**. Elle n’est rattachée à aucun axe, n’alimente pas la lignée Exploration, n’est pas réservée à un unique « premier lecteur » et n’établit aucun classement chronologique.

Une œuvre est explicitement signalée comme **confidentielle** tant que moins de vingt comptes l’ont marquée « Lu », conformément à FC1. Les statuts « À lire » et « En cours » ne ferment pas cette fenêtre ; la règle reste publique et formulable en une phrase.

Le fonctionnement retient quatre règles simples :

1. l’ajout d’une œuvre pendant sa fenêtre confidentielle mémorise l’éligibilité du lecteur ;
2. la distinction n’est accordée qu’après que ce lecteur a terminé l’œuvre ;
3. tous les lecteurs répondant à ces conditions peuvent l’obtenir, sans rang ni prime à la vitesse ;
4. une hausse ultérieure de la popularité de l’œuvre ne retire jamais une distinction acquise.

ED3 soutient donc la découverte précoce réellement menée à terme. Elle évite l’exclusivité arbitraire du « premier », limite l’intérêt des ajouts opportunistes et permet à plusieurs lecteurs de contribuer à faire émerger une œuvre encore peu fréquentée. Son mécanisme d’éligibilité reste validé, mais sa difficulté finale devra être harmonisée avec les quatre autres honneurs afin de rester réservée à un accomplissement avancé. Cette décision révise explicitement son ancien classement dans Exploration.

## Décision validée — PC4, sobriété assumée du profil

Aucun troisième élément personnalisable n’est ajouté à PR1 dans le lot actuel. La personnalisation du portrait repose sur trois expressions complémentaires déjà retenues :

- une photo de profil facultative, avec initiales comme solution de remplacement ;
- un titre équipé choisi parmi les distinctions actuellement acquises ;
- jusqu’à trois badges acquis mis en avant dans « Chapitres d’honneur ».

Les œuvres de chevet, listes et critiques complètent ensuite cette identité par le contenu plutôt que par des réglages décoratifs supplémentaires.

PC4 est préférée à la devise de lecture PC1, à l’ex-libris PC2 et à l’accent éditorial PC3 afin de préserver la sobriété du profil et de ne pas concurrencer visuellement les insignes. Une personnalisation supplémentaire pourra être réexaminée dans un lot ultérieur, après observation du rendu et de l’usage réels de PR1 ; elle ne fait pas partie de la conception ni de l’implémentation prévues pour cette phase.

## Décision validée — TI1, appellations identitaires de la lignée Lecture

Le registre poétique et non genré de TL1 est conservé, mais sa première formulation est abandonnée avant validation : « À l’orée des livres » ou « Au fil des pages » décrivent une situation sans constituer une identité que le lecteur peut véritablement revendiquer.

Un test verbal supplémentaire est donc ajouté aux règles de G1 : chaque titre doit pouvoir compléter naturellement et fièrement la phrase **« Je suis… »**, tout en restant élégant sous l’insigne et près du nom du profil.

La lignée retenue est **TI1 — Appellations identitaires** :

> **Adepte des pages → Complice des livres → Bibliophile au long cours → Bibliothèque vivante**

Elle associe quatre identités distinctes et revendicables sans reprendre une même racine à chaque palier. « Adepte », « complice » et « bibliophile » sont épicènes ; « Bibliothèque vivante » est une métaphore dont le genre grammatical ne qualifie pas celui de l’utilisateur.

TI1 est préférée à TI2, dont la répétition du mot « Bibliophile » rapprochait les paliers de niveaux suffixés, et à TI3, dont les figures devenaient grandiloquentes et faisaient évoluer la Lecture vers une idée de rayonnement appartenant plutôt à Relation.

Le quatrième temps reste interprété comme **accomplissement et mémoire**, non comme transmission. Les objectifs et seuils M3 sont définis par JL1.

## Décision validée — JL1, volume transparent pour la lignée Lecture

La progression de la lignée utilise uniquement le nombre d’œuvres marquées « Lu ». Les lectures antérieures enregistrées dans Chapter comptent au même titre que les lectures futures. Les quatre seuils sont validés pour le lot actuel :

- **Adepte des pages** — 5 œuvres ;
- **Complice des livres** — 20 œuvres ;
- **Bibliophile au long cours** — 50 œuvres ;
- **Bibliothèque vivante** — 120 œuvres.

Chapter ne possède pas, dans l’axe Lecture, de second signal suffisamment fiable et neutre pour justifier une condition supplémentaire. Le passage par « En cours » mesurerait en partie l’utilisation de l’application et pourrait être simulé par des changements de statut. Les mois actifs dépendraient de dates facultatives, introduiraient une attente incompressible et défavoriseraient inutilement les lecteurs irréguliers.

La structure M3 fixe un maximum de deux conditions secondaires, non une obligation de remplir chaque jalon avec trois critères. Un compteur unique reste donc compatible avec M3 lorsqu’une composition supplémentaire rendrait la quête moins juste ou moins lisible.

La ligne personnelle MP1 est réduite à sa forme minimale — par exemple **« 17/20 œuvres »**. Les seuils restent techniquement centralisés afin de pouvoir être recalibrés après observation des usages réels, sans rendre leur fonctionnement opaque.

## Décision validée — XE3, curiosité métaphorique pour la lignée Exploration

La lignée principale Exploration doit raconter l’élargissement durable des horizons littéraires. Elle ne remplace pas ED3 : la découverte d’une œuvre confidentielle reste un honneur indépendant de tous les axes, tandis que la lignée reconnaît une pratique répétée et diversifiée.

La lignée retenue est **XE3 — Curiosité métaphorique** :

> **Adepte de l’inattendu → Esprit nomade → Boussole des marges → Horizon vivant**

XE3 est préférée aux formulations plus littérales de XE1 et à la répétition de « Cartographe » dans XE2. Elle donne à l’axe Exploration une identité plus sensible et imagée, cohérente avec la volonté générale de proposer des titres dont les lecteurs peuvent se saisir fièrement.

Cette liberté poétique crée néanmoins une exigence supplémentaire pour la mécanique : les objectifs M3 devront rester concrets, courts et immédiatement vérifiables. Ils devront exprimer une diversification réelle des œuvres lues afin que « Boussole des marges » ou « Horizon vivant » ne deviennent pas des distinctions abstraites sans rapport compréhensible avec la pratique.

## Décision validée — JX1, trois horizons mesurables pour la lignée Exploration

La progression de XE3 repose sur trois dimensions explicites : les **auteurs distincts** constituent l’objectif principal, tandis que les **genres ou formes principales** et les **langues originales** forment les deux conditions secondaires.

JX1 est validé avec les seuils suivants pour le lot actuel :

| Titre | Auteurs | Genres ou formes | Langues originales |
|---|---:|---:|---:|
| Adepte de l’inattendu | 6 | 3 | 2 |
| Esprit nomade | 18 | 5 | 4 |
| Boussole des marges | 40 | 8 | 7 |
| Horizon vivant | 80 | 12 | 12 |

Une œuvre ne contribue qu’à un seul genre ou forme principal et à une seule langue originale, même si sa fiche comporte plusieurs étiquettes secondaires. Cette convention évite qu’une œuvre fortement taguée fasse progresser artificiellement plusieurs catégories. Les lectures antérieures enregistrées sont prises en compte comme dans JL1.

Les pays et nationalités ne sont pas employés comme critère. Ils décrivent mal les œuvres traduites, les écritures diasporiques, les doubles appartenances et les parcours transnationaux. La langue originale est un signal plus factuel, sans être présentée comme une mesure exhaustive de la diversité culturelle.

JX1 est préféré à JX2, dont les territoires éditoriaux dépendraient d’une taxonomie coûteuse à maintenir et moins immédiatement vérifiable, et à JX3, qui introduirait une distance algorithmique mouvante et difficile à expliquer, en contradiction avec M3. Le choix de JX2 formulé par erreur a été retiré avant d’être consigné comme décision validée ; JX1 constitue l’arbitrage définitif.

La ligne MP1 de JX1 conserve trois segments courts, par exemple **« 13/18 auteurs · 4/5 genres · 3/4 langues »**. ED3 ne contribue à aucun de ces seuils : elle reste une distinction honorifique extérieure aux axes, afin que l’exploration de niche conserve sa valeur propre.

## Décision validée — EX1, faire entendre sa voix

La lignée Expression retenue est :

> **Écho des pages → Interprète des œuvres → Voix singulière → Conscience des textes**

Elle décrit le passage d’une première résonance personnelle à une présence critique durable. Les titres restent revendicables après « Je suis… », épicènes ou métaphoriques, et suffisamment ouverts pour représenter aussi bien les critiques que les sélections publiques.

EX1 est préférée à EX2, dont l’idée d’un regard progressivement « affûté » pourrait laisser croire que Chapter évalue secrètement la finesse d’une contribution. EX3 est écartée parce que ses références à l’annotation, à la plume et à l’essai privilégient l’écriture longue et représentent moins bien les listes.

## Décision validée — JE2, deux formes de voix

La progression d’EX1 associe les **critiques publiques** comme objectif principal et les **listes publiques éditorialisées** comme condition secondaire :

| Titre | Critiques publiques | Listes éditorialisées |
|---|---:|---:|
| Écho des pages | 3 | 1 |
| Interprète des œuvres | 10 | 2 |
| Voix singulière | 25 | 4 |
| Conscience des textes | 60 | 8 |

Une liste est dite « éditorialisée » lorsqu’elle est publique, possède un titre, une courte présentation et au moins trois œuvres distinctes. Ces conditions sont fixes, visibles et contrôlables ; elles ne constituent pas un score secret de qualité. La ligne MP1 reste courte, par exemple **« 7/10 critiques · 2/2 listes »**.

JE2 est préférée à JE1, qui rendait les listes invisibles dans la progression, et à JE3, dont les réactions reçues auraient lié l’obtention des titres à l’audience et à la popularité. Une critique ou une liste supprimée ou rendue privée cesse de compter vers le prochain palier, mais un titre déjà acquis n’est jamais retiré.

## Décision validée — RL1, faire cercle

La lignée Relation retenue est :

> **Présence complice → Trait d’union → Point de rencontre → Cercle vivant**

Elle raconte le passage d’une participation attentive à la création d’un espace commun autour des œuvres. Les titres restent épicènes ou métaphoriques et passent le test identitaire « Je suis… ». « Cercle vivant » demeure néanmoins ajustable avant la production des assets si son emploi comme titre équipé paraît moins naturel en contexte.

RL1 est préférée à RL2, plus abstraite et grandiloquente, et à RL3, dont les formulations sont davantage genrées et proches de rôles institutionnels. La lignée ne reposera jamais sur le nombre d’abonnés, les impressions ou la popularité reçue.

## Décision validée — JR3, conversations réciproques

La progression de RL1 combine les **conversations réciproques**, les **interlocuteurs distincts** et les **œuvres distinctes** autour desquelles ces échanges ont lieu :

| Titre | Conversations réciproques | Interlocuteurs distincts | Œuvres distinctes |
|---|---:|---:|---:|
| Présence complice | 3 | 2 | 2 |
| Trait d’union | 12 | 5 | 6 |
| Point de rencontre | 30 | 12 | 15 |
| Cercle vivant | 70 | 25 | 30 |

Cette combinaison mesure la réciprocité, la variété des personnes rencontrées et l’ancrage des échanges dans plusieurs œuvres. La ligne MP1 reste lisible, par exemple **« 8/12 conversations · 4/5 lecteurs · 5/6 œuvres »**. JR3 est préférée à JR1, qui récompensait la quantité de réponses même lorsqu’elles restaient sans suite, et à JR2, qui réintroduisait indirectement une logique de réseau.

La définition technique exacte d’une conversation réciproque sera alignée sur le futur arbitrage des réponses aux critiques. Une contribution de chaque côté suffit au comptage ; aucune longueur minimale ni analyse automatique de qualité ne sera introduite.

## Décision validée — SGH1, cinq distinctions honorifiques indépendantes

Le premier lot comporte exactement **cinq distinctions honorifiques**, entièrement extérieures aux quatre axes et à leurs lignées. Elles consacrent des accomplissements rares et avancés ; elles ne servent ni à équilibrer artificiellement Lecture, Exploration, Expression et Relation, ni à compléter une grille par catégorie.

Les honneurs n’adoptent aucun code d’axe et ne contribuent à aucun compteur de lignée. ED3 appartient à ce registre, sous réserve d’un calibrage cohérent avec son caractère honorifique. Les quatre autres distinctions, leurs titres et leurs critères restent à définir.

SGH1 remplace SG1 : le nombre de cinq est conservé, mais la notion d’un noyau « asymétrique » entre axes est abandonnée puisqu’aucune distinction honorifique n’est rattachée à un axe. De nouveaux honneurs pourront être ajoutés ultérieurement par petits lots cohérents après observation des usages.

## Décision validée — HV1, révélation à l’obtention

Seuls les honneurs déjà acquis apparaissent dans « Chapitres d’honneur ». Aucun badge verrouillé, emplacement vide, nom, critère ou compteur préalable n’est montré. Leur obtention révèle simultanément l’insigne, son titre et l’explication claire de l’accomplissement reconnu.

Un honneur ne devient donc jamais une quête suivie ou une checklist optimisable. La vue publique et la vue personnelle appliquent la même règle de collection pour les distinctions honorifiques : seuls les acquis sont visibles. Les progressions des quatre lignées restent, elles, strictement privées selon PV1.

HV1 est préférée à HV2, trop prescriptive, et à HV3, qui associait la pression d’une collection incomplète à l’opacité des conditions.

## Orientation validée — honneurs hybrides entre parcours et exploits

Les cinq honneurs mélangent la logique des **parcours croisés** HC1 et celle des **exploits ponctuels** HC2. Ils doivent conserver la force narrative d’un événement rare tout en attestant une pratique déjà avancée.

HC3 est écartée comme philosophie dominante. L’ancienneté ou la régularité peuvent éventuellement servir de garde-fou ponctuel lorsqu’elles donnent du sens à un honneur, mais elles ne structurent pas la collection et n’imposent pas une attente identique à tous les lecteurs.

Un honneur ne peut dépendre d’un hasard pur, d’une métrique de popularité reçue ou d’une action unique facilement optimisable.

## Décision validée — HH2, exploits consacrés

Chacun des cinq honneurs associe un déclencheur rare à des conditions de parcours transversales déjà remplies. La formule commune devient :

> **Événement rare + parcours confirmé → honneur**

Un exploit isolé, accidentel ou dépendant uniquement de la popularité ne suffit jamais. Les conditions restent invisibles avant l’obtention selon HV1, mais elles sont objectives et clairement révélées ensuite.

HH2 est préférée à HH1, qui divisait la collection entre deux logiques d’obtention, et à HH3, dont la liberté au cas par cas aurait rendu l’ensemble plus difficile à expliquer et à équilibrer.

## Décision validée — HN1 à HN5, première collection honorifique

Une première collection complète est proposée afin de juger ensemble les cinq récits, avant de figer leurs seuils :

### HN1 — « Première lumière »

- **Événement consacré** : terminer une cinquième œuvre ajoutée pendant sa fenêtre confidentielle.
- **Parcours confirmé** : ces cinq œuvres couvrent au moins quatre auteurs distincts et trois d’entre elles ont été mises en lumière dans une critique publique ou une liste éditorialisée.
- Cet honneur reprend le mécanisme ED3 en le renforçant pour correspondre à une pratique avancée.

### HN2 — « Atlas partagé »

- **Événement consacré** : publier une liste éditorialisée réunissant au moins douze œuvres effectivement lues, six auteurs, quatre genres ou formes et trois langues originales.
- **Parcours confirmé** : avoir déjà obtenu au minimum « Complice des livres », « Esprit nomade » et « Interprète des œuvres ».
- L’accomplissement combine lecture, exploration et composition éditoriale sans dépendre de la réception sociale de la liste.

### HN3 — « Voix qui relie »

- **Événement consacré** : une critique du lecteur devient le point de départ de conversations réciproques avec cinq autres lecteurs distincts.
- **Parcours confirmé** : avoir déjà obtenu au minimum « Interprète des œuvres » et « Trait d’union ».
- Les réactions simples ne comptent pas : seules les conversations réciproques définies par JR3 sont retenues.

### HN4 — « Lien fidèle »

- **Événement consacré** : atteindre une huitième œuvre distincte autour de laquelle le lecteur et une même personne ont construit une conversation réciproque.
- **Parcours confirmé** : les échanges considérés doivent provenir d’au moins trois critiques ou listes du lecteur, et celui-ci doit déjà avoir obtenu « Trait d’union ».
- L’honneur reconnaît la profondeur d’une relation littéraire plutôt que l’étendue du réseau.

### HN5 — « Chapitre vivant »

- **Événement consacré** : obtenir le troisième titre de la dernière lignée qui n’avait pas encore atteint ce niveau.
- **Parcours confirmé** : les quatre lignées sont donc toutes au moins à leur troisième palier.
- Cet honneur consacre une maîtrise transversale sans créer de cinquième progression visible.

Les cinq titres passent le test « Je suis… » et restent métaphoriques ou épicènes. Leur ensemble distingue cinq formes de rareté : **révéler, composer, faire résonner, approfondir et accomplir**. Les titres et les mécaniques sont validés ensemble ; leurs seuils demeurent techniquement recalibrables avant l’implémentation. Les définitions exactes de HN3 et HN4 devront seulement être alignées sur le futur modèle de commentaires et de réponses, sans rouvrir leur intention.

## Décision validée — VG2, silhouettes propres aux axes et aux honneurs

La famille visuelle repose sur les règles suivantes :

- Lecture, Exploration, Expression et Relation possèdent chacune une silhouette différente, sobre et stable sur les quatre paliers.
- Chaque axe possède également un symbole propre, conservé au fil de sa lignée afin que la catégorie reste identifiable indépendamment de la couleur.
- Les évolutions ne consistent ni à agrandir le badge ni à accumuler mécaniquement des pointes ou des éléments périphériques. Chaque palier doit transformer avec sens les ornements, le cadre, le relief ou la composition intérieure, en rapport avec l’évolution sémantique du titre.
- Les cinq honneurs ne partagent pas une cinquième silhouette générique : chacun reçoit une forme et un symbole propres à l’accomplissement qu’il consacre.
- Une matière, une palette et un traitement graphique communs maintiendront l’unité du mur malgré les neuf silhouettes de référence.

VG2 remplace la recommandation VG1. VG3 reste écartée : une scène indépendante pour chacun des vingt-et-un assets rendrait la famille plus fragile, notamment à petite taille.

## Décision validée — SY1, symboles universels redessinés en emblèmes

Les quatre axes conservent des symboles immédiatement identifiables :

- **Lecture** : un livre ouvert.
- **Exploration** : une boussole.
- **Expression** : une plume ou un bec de plume.
- **Relation** : deux maillons reliés.

Ils ne seront toutefois jamais traités comme des icônes génériques d’interface. Chacun devra être redessiné spécialement pour Chapter avec une construction symétrique, des pleins et déliés, des détails intérieurs et une présence héraldique. La singularité de la famille viendra donc du dessin, de la silhouette et de la matière plutôt que d’un symbole moins immédiatement intelligible.

Le rendu final doit évoquer de véritables **blasons ou médailles d’ordre**, presque chevaleresques. Ce registre reste néanmoins contrôlé : pas de kitsch médiéval, de surcharge décorative, de trophées de jeu vidéo ni d’heroic fantasy. SY1 remplace ainsi la recommandation SY2.

## Décision validée — MH1, médailles émaillées d’ordre

Le langage matériel associe un métal patiné, des aplats d’émail profonds, des filets métalliques et un relief maîtrisé. La couleur et la silhouette distinguent les axes ; la construction doit évoquer un véritable objet d’ordre ou de chevalerie stylisé, sans perdre la sobriété éditoriale de Chapter.

Cette validation porte uniquement sur la **direction de matière**. Les formes, proportions et ornements montrés dans les schémas comparatifs précédents ne sont pas approuvés : leur niveau de fidélité était insuffisant pour juger la qualité artistique recherchée. Les arbitrages visuels suivants devront donc employer des concepts capables de montrer crédiblement le métal, l’émail, la profondeur et la finesse du dessin.

## Décision validée — MM1, ordre éditorial

Le concept haute fidélité présenté devient la référence artistique de la famille. Il associe :

- un laiton chaud légèrement vieilli, avec une patine limitée aux creux et des arêtes doucement polies ;
- un émail brique opaque et profond, complété par un émail ivoire pour le symbole central ;
- des filets métalliques fins, des biseaux crédibles et un bas-relief suffisamment marqué pour donner l’impression d’un objet réellement fabriqué ;
- une composition frontale, symétrique et très stylisée ;
- des ornements végétaux ou éditoriaux intégrés au dessin plutôt qu’accumulés autour du badge ;
- une lumière de présentation douce et un fond papier chaud cohérent avec la palette Signet brique.

Cette validation porte sur le **langage artistique et matériel**. La silhouette de bouclier et la composition précise du livre visibles dans ce concept ne fixent pas encore les formes définitives des axes ni les quatre évolutions de Lecture. MM2 et MM3 ne sont pas poursuivies après validation de MM1.

## Décision validée — production externe des assets

Aucun badge supplémentaire ne sera généré dans cette conversation de conception. Une fois les quatre silhouettes, leurs évolutions, les palettes d’axe et les cinq honneurs précisément définis, l’utilisateur recevra un prompt-cadre destiné à un autre agent.

Ce prompt devra :

- utiliser le rendu MM1 validé comme image de référence stylistique ;
- verrouiller les invariants communs de matière, lumière, cadrage, profondeur et niveau d’ornement ;
- décrire explicitement les variables propres à chaque axe, palier et honneur ;
- produire la famille par séries contrôlées et comparées, jamais par vingt-et-une générations isolées sans ancre commune ;
- prévoir une passe finale d’harmonisation avant export des assets destinés à l’interface.

## Décision validée — SL1, silhouettes héraldiques sémantiques

Les quatre lignées adoptent des contours distincts qui prolongent leur sens :

- **Lecture** : un écu-page, proche d’un ex-libris ou d’une plaque de bibliothèque, avec une partie supérieure légèrement arquée et une base contenue ;
- **Exploration** : un octogone inspiré d’une rose des vents, sans multiplier les pointes ;
- **Expression** : un losange vertical adouci, dont l’élancement rappelle un bec de plume ;
- **Relation** : un quatre-feuilles entrelacé aux lobes arrondis, évoquant plusieurs formes réunies autour d’un centre.

Leur poids visuel, leur emprise, leur épaisseur de bordure et leur champ central seront normalisés afin qu’aucune silhouette ne paraisse plus prestigieuse qu’une autre. Les contours restent sobres : ils ne deviennent ni des illustrations littérales ni des supports d’excroissances décoratives.

SL1 est préférée à SL2, dont les formes introduisaient une hiérarchie historique arbitraire, et à SL3, qui faisait reposer une trop grande part de l’identité sur le seul symbole central.

## Décision validée — EG3, rite commun et récits propres

Les quatre lignées partagent quatre fonctions structurelles invisibles au public, chacune traduite différemment selon l’axe :

1. **Signe essentiel** : le symbole apparaît dans sa forme la plus pure ; la silhouette et l’émail dominent.
2. **Symbole en action** : le symbole commence à agir sur son champ — pages qui s’ouvrent, aiguille qui trace, plume qui inscrit, maillons qui se répondent.
3. **Composition maîtrisée** : le symbole, le cadre intérieur et les ornements forment une architecture unifiée.
4. **Emblème accompli** : la transformation atteint une composition complète et équilibrée, avec un détail de matière rare ou une résolution symbolique propre à l’axe, sans simple surenchère.

Ces quatre fonctions ne deviennent jamais des titres publics ; elles servent uniquement de grammaire de conception. Les lignées conservent ainsi un même rythme de maturation tout en racontant des récits différents. EG3 est préférée à EG1, trop mécanique, et à EG2, qui risquait de disperser les seize badges en quatre collections sans rythme commun.

## Décision validée — NL2, livre habité

- **Adepte des pages — Signe essentiel** : un livre ouvert, simple et frontal, dont quelques feuillets sont visibles.
- **Complice des livres — Symbole en action** : les deux ensembles de pages se déploient et se répondent ; un mouvement symétrique exprime la familiarité avec les œuvres.
- **Bibliophile au long cours — Composition maîtrisée** : les lignes des pages se prolongent en tracés continus qui rejoignent le cadre intérieur, évoquant un parcours durable à travers les livres.
- **Bibliothèque vivante — Emblème accompli** : le livre demeure au centre et s’intègre à une architecture d’ex-libris accompagnée d’ornements botaniques classiques ; le savoir paraît habité plutôt que simplement accumulé.
- Cette narration traduit directement la progression sémantique des quatre titres tout en restant compatible avec les ornements intégrés de MM1.

Le terme « vivant » ne doit jamais être représenté littéralement. Aucun livre personnifié, mouvement animé, lévitation, lueur surnaturelle, végétation envahissante ou effet science-fiction n’est autorisé. Le caractère vivant provient uniquement du rythme des courbes, de la continuité des tracés et d’ornements empruntés aux reliures, ex-libris et arts décoratifs classiques. NL2 est préférée à NL1, trop quantitative, et à NL3, trop institutionnelle.

## Décision validée — NE2, boussole qui élargit le champ

- **Adepte de l’inattendu — Signe essentiel** : la rose des vents est claire, mais son aiguille privilégie légèrement un cap non cardinal.
- **Esprit nomade — Symbole en action** : l’aiguille laisse un tracé mobile qui traverse le champ sans suivre une route rectiligne.
- **Boussole des marges — Composition maîtrisée** : le tracé rejoint les contours périphériques ; marques de carte et lignes de relief structurent les marges de l’octogone.
- **Horizon vivant — Emblème accompli** : la boussole, le parcours et plusieurs lignes d’horizon ou de relief composent un champ ouvert, riche mais précisément cartographié.
- La progression reste dynamique tout en s’appuyant sur des signes réels : aiguille, route, courbes de niveau, repères et horizon.

Cette narration exprime une curiosité qui déborde progressivement ses repères sans perdre son ancrage cartographique. « Horizon vivant » restera composé de reliefs, routes et limites ouvertes, sans constellation dominante, lumière surnaturelle ni paysage animé. NE2 est préférée à NE1, trop centrée sur la carte géographique, et à NE3, trop céleste.

## Décision validée — NEX2, page éditorialisée

- **Écho des pages — Signe essentiel** : une plume touche une ligne brève, comme une première annotation née de la lecture.
- **Interprète des œuvres — Symbole en action** : la plume relie plusieurs traces distinctes — ligne critique, repère marginal et marque de sélection — en une composition lisible.
- **Voix singulière — Composition maîtrisée** : les traces acquièrent une cadence et une organisation propres ; texte, marges et repères de liste forment une signature éditoriale sans afficher de lettre réelle.
- **Conscience des textes — Emblème accompli** : la plume, les lignes, les marges et les repères s’unissent dans une page héraldique équilibrée, évoquant une pensée consciente de sa forme et de ses sources.
- La narration représente à la fois les critiques et les listes, sans symboliser le nombre de réactions ou la popularité.

La plume et le losange vertical restent identifiables aux quatre paliers. Aucun texte réel n’est inscrit dans l’emblème : lignes, marges et repères demeurent des formes graphiques lisibles à petite taille. NEX2 est préférée à NEX1, trop centrée sur l’écriture continue, et à NEX3, dont les ondes abstraites auraient suggéré une influence sociale croissante.

## Décision validée — NR2, lien qui devient espace commun

- **Présence complice — Signe essentiel** : deux maillons distincts se répondent et partagent un premier point de contact.
- **Trait d’union — Symbole en action** : les maillons s’entrelacent et forment un pont équilibré entre deux côtés du champ.
- **Point de rencontre — Composition maîtrisée** : le lien encadre un centre commun évoquant l’œuvre autour de laquelle la conversation se construit.
- **Cercle vivant — Emblème accompli** : les arcs reliés se résolvent en un quatre-feuilles ouvert et équilibré autour de ce centre littéraire partagé.
- Le caractère « vivant » vient du rythme et de la circulation ménagée entre les arcs, sans animation, croissance végétale, silhouettes humaines ni réseau de points.

Les deux maillons reliés et le quatre-feuilles arrondi restent identifiables aux quatre paliers. NR2 est préférée à NR1, dont la multiplication de nœuds aurait représenté la taille du réseau, et à NR3, dont le tressage était plus abstrait et principalement ornemental.

## Décision validée — SH2, emblèmes d’ordre pour les cinq honneurs

- **Première lumière** : une médaille rayonnante à pointe basse entoure une flamme géométrique qui émerge d’un livre entrouvert.
- **Atlas partagé** : un cartouche hexagonal accueille un atlas stylisé traversé par une route commune.
- **Voix qui relie** : une médaille ronde légèrement concave unit deux volutes opposées par un trait de plume central.
- **Lien fidèle** : un sceau vertical contient un double nœud fermé autour d’un petit fermoir éditorial.
- **Chapitre vivant** : une croix-rosette à quatre bras organise quatre pages autour d’un centre commun.
- Les cinq emblèmes utilisent les mêmes bordures métalliques, champs d’émail, niveaux de relief et ornements intégrés que les lignées, mais aucune silhouette n’est répétée.

SH2 est préférée à SH1, dont les objets littéraux auraient produit de petites scènes illustratives, et à SH3, dont les assemblages de symboles d’axe auraient été trop chargés et contraires à l’indépendance honorifique de SGH1.

## Décision validée — principe chromatique des axes et des honneurs

Chaque axe possède une couleur d’émail propre et stable sur ses quatre paliers : Lecture, Exploration, Expression et Relation constituent donc quatre familles chromatiques distinctes. Les cinq honneurs partagent une cinquième couleur réservée au registre honorifique ; ils se différencient entre eux par leurs silhouettes et leurs symboles SH2 plutôt que par cinq couleurs supplémentaires.

La couleur ne signale jamais le niveau d’un badge. Les évolutions restent portées par EG3, les ornements, la profondeur du relief et la composition intérieure. Le laiton chaud légèrement vieilli, l’ivoire des signes, les filets métalliques et le traitement de lumière MM1 demeurent communs aux vingt-et-un assets. L’émail brique du concept MM1 doit donc être compris comme une référence de matière, d’opacité et de profondeur, non comme l’unique teinte de toute la famille.

## Décision validée — CA1, nuancier éditorial

| Famille | Couleur d’émail | Valeur de travail |
|---|---|---|
| Lecture | Brique de reliure | `#8A3F36` |
| Exploration | Bleu pétrole | `#2E5D5B` |
| Expression | Prune d’encre | `#5D405C` |
| Relation | Vert mousse | `#4F634E` |
| Honneurs | Bleu nuit | `#28384F` |

CA1 prolonge directement Signet brique et le nuancier éditorial CP2. Les cinq couleurs restent sourdes, de force visuelle proche et suffisamment distinctes à petite taille. Les valeurs hexadécimales constituent des ancres : leur identité de teinte est stable, mais leur rendu exact pourra être légèrement adapté à la matière émaillée, à la lumière MM1 et à l’audit de contraste. CA1 est préférée à CA2, trop proche des codes de rareté vidéoludiques, et à CA3, moins distincte à petite taille.

## Livrable — prompt-cadre de production des badges

La direction artistique des vingt-et-un badges est désormais entièrement spécifiée. Le prompt destiné à l’agent de génération est centralisé dans [`PROMPT_PRODUCTION_BADGES_CHAPTER.md`](./PROMPT_PRODUCTION_BADGES_CHAPTER.md).

Il impose l’image MM1 comme ancre stylistique, une preuve de famille préalable, quatre planches cohérentes de lignée, une planche regroupant les cinq honneurs, une harmonisation globale des vingt-et-un assets et seulement ensuite les exports individuels. Les états verrouillés du prochain badge seront produits dans l’interface par désaturation et opacité réversibles ; aucun fichier gris distinct ne doit être généré.

Les vingt-et-un assets ont depuis été générés et validés artistiquement dans la conversation externe de production, puis transmis dans `chapter-badges-complete(1).zip` avec leur planche finale harmonisée et un manifeste. Le contrôle technique du 25 août 2026 confirme : archive sans erreur, 21 PNG sRGBA de 2048 × 2048 px, transparence réelle, noms conformes, quatre badges pour chacune des quatre lignées, cinq honneurs et cadrages centrés. Les originaux ne sont pas encore copiés dans le dépôt ni convertis ; ils restent la source maître jusqu’au jalon d’implémentation, qui préparera les dérivés web sans rouvrir les arbitrages artistiques.

## Décision validée — KF2, préambule relationnel

La structure K3 validée en phase 5 doit maintenant rendre la proximité relationnelle utile sans transformer la page d’une œuvre en classement social. La priorité ne peut dépendre ni du nombre de réactions, ni de la note attribuée, ni d’un score secret. En l’absence de critique provenant d’une personne suivie, la section conserve exactement son ordre neutre actuel.

- Un groupe explicitement intitulé **« De personnes que vous suivez »** précède **« Toutes les critiques »**.
- Il affiche jusqu’à trois critiques suivies, ordonnées par date de publication décroissante uniquement à l’intérieur du groupe.
- Au-delà, une action secondaire permet de consulter l’ensemble des critiques de personnes suivies sans masquer le flux général.
- Sur desktop, K3 peut conserver une première critique développée et deux aperçus plus compacts ; sur mobile, K3M1 les présente dans le même fil éditorial confortable.
- Aucun contenu n’est présenté comme meilleur : le groupe explique seulement une proximité choisie par l’utilisateur.

KF2 est préférée à KF1, qui aurait accordé une autorité visuelle excessive à la critique suivie la plus récente, et à KF3, dont la priorité diffuse aurait été moins explicite. Le regroupement disparaît entièrement lorsqu’aucune personne suivie n’a publié sur l’œuvre.

## Décision validée — RP1, conversation à plat

Les réponses doivent permettre les conversations réciproques employées par JR3, HN3 et HN4 sans transformer chaque critique en forum complexe. Cet arbitrage fixe uniquement la structure de lecture ; les droits d’action, le tri, les notifications et les outils de modération seront précisés ensuite.

- Toutes les réponses appartiennent directement à la critique et s’affichent dans un seul flux chronologique.
- L’action « Répondre » sur un message préremplit éventuellement une mention et replace le contexte cité dans le compositeur, mais le nouveau message reste au même niveau visuel.
- La conversation conserve une seule continuité et demeure stable sur desktop comme sur mobile.

RP1 est préférée à RP2, dont le niveau de ramification aurait fragmenté une même discussion, et à RP3, dont l’arbre complet aurait été difficile à parcourir sur mobile et plus coûteux à modérer. Une critique, une œuvre et un interlocuteur forment une unité stable pour JR3, quel que soit le nombre de messages échangés.

## Décision validée — DC1, conversation ouverte avec maîtrise

La conversation RP1 reste accessible à tout lecteur authentifié afin que la découverte d’une critique puisse conduire à une rencontre, même en l’absence d’abonnement préalable. Cette ouverture ne transforme toutefois pas l’auteur de la critique en modérateur des autres participants.

- L’auteur de la critique peut fermer puis rouvrir les nouvelles réponses.
- Une fermeture conserve tout l’historique visible, maintient les conversations déjà comptabilisées par JR3 et n’efface aucune progression acquise.
- Chaque participant peut modifier ou supprimer ses propres réponses, signaler un message et bloquer un compte.
- L’auteur de la critique ne peut ni modifier ni supprimer les réponses d’autrui.
- Le blocage supprime les possibilités d’interaction directe entre les comptes concernés, sans donner de pouvoir supplémentaire sur le reste de la conversation.
- Les procédures de traitement des signalements et les outils de modération administrative restent hors du périmètre de cette phase.

DC1 est préférée à DC2, qui aurait laissé l’auteur sans recours non destructif face à une discussion devenue envahissante, et à DC3, qui aurait réservé les échanges aux relations déjà établies. La fermeture réversible protège l’espace de l’auteur sans effacer la parole des autres.

## Décision validée — VC1, aperçu repliable des conversations dans K3

RP1 autorise une conversation longue, tandis que K3 doit continuer à présenter plusieurs critiques d’une œuvre sans devenir un fil social dominé par la discussion la plus active. Cette décision porte uniquement sur le niveau de conversation montré avant une action du lecteur ; elle ne change ni l’ordre chronologique interne, ni les droits DC1, ni l’unité de calcul JR3.

- Sous une critique qui possède des réponses, K3 montre la réponse la plus récente, le nombre total de réponses et une action « Voir la conversation ».
- L’action déplie la conversation complète au même endroit ; « Réduire » restaure l’aperçu sans changer la position dans la page.
- Une critique sans réponse conserve simplement l’action « Répondre ».
- Une conversation fermée montre son aperçu et son historique avec l’état « Conversation fermée », sans compositeur.

VC1 est préférée à VC2, qui aurait permis à une conversation active d’occuper l’essentiel de K3, et à VC3, qui aurait caché la tonalité des échanges et rompu le contexte de lecture. La critique demeure ainsi l’unité principale, tandis que la conversation reste perceptible et accessible au même endroit sur desktop comme sur mobile.

## Décision validée — CPR1, compositeur contextuel en ligne

Une réponse est généralement plus courte et plus contextuelle qu’une critique. Son éditeur doit donc préserver le lien avec l’échange sans installer un champ d’écriture permanent sous chaque opinion ni reproduire la modale de publication des critiques.

- L’action « Répondre » révèle un champ compact directement sous la conversation ou sous la critique lorsqu’elle ne possède encore aucune réponse.
- Répondre à un message préremplit une mention et affiche un court rappel supprimable du message visé ; la nouvelle réponse reste au niveau unique fixé par RP1.
- Le compositeur contient uniquement le texte, « Annuler » et « Publier » ; aucune note, mise en forme riche ou pièce jointe n’est ajoutée dans ce lot.
- Après publication, la réponse rejoint le flux chronologique et le compositeur se referme.

CPR1 est préférée à CPR2, dont le champ permanent aurait renforcé la logique de fil social dans K3, et à CPR3, qui aurait séparé une contribution généralement courte de la conversation qu’elle poursuit. Son comportement est identique sur desktop et mobile ; seul l’espace disponible du champ s’adapte.

Cette décision clôt le modèle fonctionnel des conversations pour le lot : structure RP1, droits DC1, exposition VC1 et composition CPR1. Les notifications complètes et la modération administrative demeurent reportées.

## Décision validée — EH1, sélection éditoriale directe sans historique exploitable

Un lecteur authentifié peut ouvrir Découvrir avant d’avoir enregistré assez d’œuvres, d’évaluations ou de critiques pour que son journal fournisse un signal pertinent. D4 garantit déjà une sélection éditoriale indépendante ; cet arbitrage fixe la manière de la présenter sans prétendre personnaliser prématurément l’expérience et sans réintroduire l’onboarding exclu du lot.

- La page conserve immédiatement sa composition C2 et son bloc BP2, alimenté par la sélection indépendante déjà prévue par D4.
- La justification emploie une formulation éditoriale explicite, telle que « Un choix de Chapter pour commencer », sans employer « pour vous » ni suggérer une connaissance inexistante des goûts.
- Une indication secondaire précise que les propositions évolueront avec les lectures enregistrées ; elle ne devient ni une alerte ni un appel à compléter le profil.
- Les phrases d’envie I2 restent visibles et facultatives pour transformer la proposition sur place selon R1.

EH1 est préférée à EH2, qui aurait retardé la valeur de Découvrir derrière une invitation proche d’un onboarding, et à EH3, qui aurait fait d’I2 un passage presque obligatoire. La transition vers une découverte plus personnelle reste progressive : l’écran ne change pas brutalement lorsque le journal devient exploitable, seule la justification principale et la sélection évoluent selon P4.

## Décision validée — EA1, médiation par le contenu sans abonnements

L’absence de personnes suivies ne doit ni vider la dimension sociale, ni déclencher une sollicitation générique à « trouver des amis ». S2 prévoit déjà qu’une liste publique constitue la première médiation sociale et F1 permet de suivre son auteur depuis ce contexte. L’arbitrage fixe si cette logique suffit ou si un état spécifique doit prendre sa place.

- Découvrir présente une liste publique éditorialisée choisie pour la cohérence et l’intérêt de sa sélection, sous une formulation telle que « Une sensibilité à découvrir ».
- La liste, son intention et ses œuvres restent au premier plan ; l’identité de l’auteur et l’action « Suivre » conservent la hiérarchie secondaire fixée par S2 et F1.
- Après le premier abonnement, ce chemin reste valable et pourra progressivement intégrer les contenus du cercle sans changer de composant.
- L’interface ne signale jamais « Vous ne suivez personne » : l’absence de cercle n’est pas présentée comme une erreur à réparer.

EA1 est préférée à EA2, qui aurait mis directement des profils en avant avec des justifications faibles en l’absence d’historique, et à EA3, qui aurait supprimé le principal chemin permettant d’amorcer naturellement un cercle. La relation reste une conséquence possible de la découverte d’un contenu, jamais un prérequis à sa valeur.

Sur les pages d’œuvre, l’invariant KF2 complète EA1 : si aucune critique ne provient d’une personne suivie, le groupe « De personnes que vous suivez » disparaît entièrement et « Toutes les critiques » conserve son ordre neutre, sans message vide.

## Décision validée — ZR1b, échec exact avec pistes proches

N2 réunit la recherche exacte et l’exploration dans une même destination. Lorsqu’aucune œuvre ni aucun auteur ne correspond à une requête validée, l’interface doit reconnaître cet échec sans présenter une suggestion éditoriale comme un résultat et sans effacer inutilement les autres chemins de Découvrir.

- La requête reste dans le champ de recherche afin d’être corrigée sans ressaisie complète.
- Un bloc compact annonce « Aucun résultat exact pour… » et propose « Modifier la recherche » et « Effacer ».
- Une zone distincte intitulée « Titres qui pourraient correspondre » peut présenter jusqu’à trois œuvres ou auteurs suffisamment plausibles lorsque quelques mots, une proximité orthographique ou l’identité de l’auteur fournissent un signal utile.
- Chaque piste affiche un indice court, par exemple « deux mots du titre correspondent » ou « même auteur », afin d’expliquer pourquoi elle apparaît.
- Ces pistes ne sont jamais comptées ni annoncées comme des résultats. Si leur plausibilité est trop faible, la zone n’apparaît pas.
- Après une séparation explicite « Continuer à explorer », les chemins éditoriaux C2 reprennent dans leur état antérieur ; ils ne sont jamais étiquetés comme résultats de la requête.

ZR1b remplace la première formulation de ZR1. Elle intègre la récupération utile de ZR2 pour une personne qui ne se souvient que d’un fragment du titre, sans afficher des correspondances approximatives comme des résultats réels. L’ordre reste explicite : absence de résultat exact → pistes proches limitées et justifiées → chemins éditoriaux indépendants.

## Décision validée — CSL1, composition adaptative lorsque le contenu social est limité

Le catalogue et la communauté peuvent ne pas fournir assez de listes éditorialisées, de critiques ou de conversations pour remplir toutes les médiations sociales prévues. Cet état ne doit ni abaisser silencieusement la qualité des contenus, ni multiplier les surfaces qui annoncent que Chapter manque d’activité.

- Dans Découvrir, le chemin S2 apparaît dès qu’une liste publique respecte réellement les critères éditoriaux validés. S’il n’existe aucune liste assez solide, cet emplacement est remplacé par un chemin éditorial non social cohérent avec C2 ; aucun cadre vide ne subsiste.
- Sur une page d’œuvre, une critique publique unique est affichée normalement, sans mention « seulement une critique » ni espace réservé pour en simuler plusieurs.
- Lorsqu’aucune critique n’existe, K3 utilise un état compact « Aucune critique publiée » avec l’action neutre « Écrire une critique », sans formulation compétitive telle que « Soyez le premier ».
- Les conversations, listes et contenus disponibles ne sont jamais dupliqués pour donner une impression artificielle de densité.
- Dès que de nouveaux contenus admissibles existent, les modules correspondants réapparaissent sans changement de structure ou d’intitulé.

CSL1 est préférée à CSL2, qui aurait fait du manque d’activité un message répété sur plusieurs surfaces, et à CSL3, qui aurait relâché les critères de manière opaque. La composition s’adapte à la matière réellement disponible, mais la définition d’une liste éditorialisée, d’une critique ou d’une conversation admissible reste identique.

Cette décision clôt les quatre états limites de la phase : absence d’historique EH1, absence d’abonnements EA1, recherche infructueuse ZR1b et contenu social limité CSL1.

## Décision validée — DR1D, hiérarchie asymétrique de Découvrir sur desktop

Les composants de Découvrir sont désormais définis, mais leur rapport spatial doit encore être fixé. La déclinaison conserve le seuil global B2 à 900 px, la navigation N2, l’absence de carrousel obligatoire pour BP2 et la hiérarchie C2. Le choix porte sur l’usage de la largeur desktop et sur l’ordre obtenu lorsque la composition devient verticale.

- Sur desktop, la recherche et l’introduction occupent toute la largeur. En dessous, BP2 utilise environ deux tiers de l’espace, tandis qu’une colonne plus étroite rassemble les phrases d’envie I2 et un premier chemin secondaire.
- Les listes publiques S2 et les autres chemins éditoriaux suivent sur une largeur généreuse, selon un rythme alternant texte, couvertures et médiation sans former une grille uniforme.

DR1D est préférée à DR2, dont l’égalité de colonnes aurait donné aux chemins secondaires le même poids que la proposition principale, et à DR3, dont la colonne unique aurait sous-exploité le grand écran. La validation porte explicitement sur cette composition desktop ; la longueur de la transposition mobile est isolée ci-dessous afin de ne pas la valider par simple conséquence.

## Décision validée — DR1M1, colonne éditoriale bornée sur mobile

Le défilement vertical est le geste de navigation le plus naturel sur mobile, mais une longue suite de blocs semblables deviendrait monotone. Le choix doit donc arbitrer entre visibilité immédiate des chemins, longueur initiale et multiplication des gestes. Dans tous les cas, la recherche, I2 et l’œuvre principale BP2 restent visibles sans interaction préalable.

- L’ordre reste : recherche → envies I2 → œuvre principale BP2 → deux échos verticaux → chemins secondaires → liste publique éventuelle.
- Après BP2, la page affiche au maximum trois chemins secondaires au total, liste publique comprise, puis atteint une fin naturelle ; aucun chargement infini n’est ajouté.
- Les échos restent plus compacts que l’œuvre principale et les chemins alternent aperçus d’œuvres, texte éditorial et liste afin d’éviter une répétition de cartes identiques.
- Les titres de section et les respirations rendent chaque changement de registre perceptible pendant le défilement.

DR1M1 est préférée à DR1M2, qui aurait masqué une partie de la valeur derrière une action générique, et à DR1M3, dont les rails auraient ajouté un second axe de navigation et rapproché la page d’un catalogue. La composition est validée comme hypothèse de travail ; la longueur perçue, le nombre de gestes et la visibilité de la fin naturelle devront être vérifiés explicitement lors du test de jalon et pourront motiver un ajustement avant clôture.

## Décision validée — PRM1, portrait ancré et contenu déroulé

PR1 doit rester un portrait de goût continu : l’identité, le titre équipé, les trois badges choisis, les œuvres de chevet, les listes et les critiques forment un seul ensemble. La déclinaison doit toutefois exploiter la largeur desktop sans produire une longue colonne uniforme sur tous les supports ni introduire une navigation qui fragmente ce portrait.

- Sur desktop, une colonne d’environ un tiers rassemble la photo ou les initiales, le nom, le titre équipé, l’introduction, l’action « Suivre » et la section cliquable « Chapitres d’honneur → » avec les trois badges choisis.
- La colonne principale commence par les œuvres de chevet, puis présente les listes publiques et une sélection limitée de critiques dans un flux éditorial plus large.
- La colonne d’identité reste visuellement stable au début du profil mais n’est pas rendue collante pendant tout le défilement.
- Sur mobile, l’ordre devient identité et action → titre équipé → introduction → « Chapitres d’honneur → » et trois badges → œuvres de chevet → listes → critiques.
- Les œuvres de chevet conservent une petite composition de couvertures visible ensemble ; les listes et critiques se lisent verticalement sans carrousel obligatoire.

PRM1 est préférée à PRM2, dont la colonne universelle aurait sous-exploité la largeur desktop et atténué la présence de la signature du lecteur, ainsi qu’à PRM3, qui aurait fragmenté le portrait derrière des onglets et concurrencé l’accès AC1. Le profil reste ainsi un ensemble éditorial continu sur les deux supports, avec une adaptation de composition plutôt qu’une simple réduction.

## Révision desktop validée — PDR1, ouverture puis flux large

La recette desktop révèle que la colonne identitaire de PRM1 devient visiblement vide sous la carte et les trois badges, tandis que les listes et les critiques continuent longtemps dans la seule colonne droite. PDR1 remplace cette application de PRM1 sans abandonner son portrait éditorial continu :

- la double colonne est limitée à l’ouverture du profil ;
- la carte de lecteur et les Chapitres d’honneur forment la partie gauche de cette ouverture ;
- les Œuvres de chevet lui répondent dans la partie droite ;
- les Listes publiques puis les Traces publiques reprennent ensuite toute la largeur utile du profil ;
- aucun compteur, résumé de goûts ou contenu de remplissage n’est ajouté pour occuper artificiellement la colonne gauche ;
- la colonne identitaire reste non collante et l’ordre mobile de PRM1 demeure inchangé.

**PDR1B est validée et implémentée après autorisation explicite.** La section Œuvres de chevet conserve sa hauteur éditoriale naturelle et l’ensemble formé par son intitulé, son titre et ses trois couvertures est centré verticalement face à la hauteur cumulée de la carte et des honneurs. Ce centrage absorbe les variations raisonnables du nom et de l’introduction sans introduire de faux espace à l’intérieur de la section. PDR1A, qui aurait étiré cette dernière jusqu’à une hauteur strictement égale, est abandonnée.

La structure frontend distingue désormais une ouverture desktop et un flux public pleine largeur. Au breakpoint B2, cette ouverture redevient une seule colonne et restitue l’ordre mobile déjà validé. La checklist de recette couvre l’alignement des deux profils d’exemple, la disparition du vide et la non-régression de l’ordre mobile. Le checkpoint 19 a été publié après réussite du lint, de la construction de production et des contrôles automatisés dédiés ; la recette utilisateur de PDR1B est ouverte.

## Principe validé — QR1, carte de lecteur recto-verso partageable

La carte de lecteur pourra être retournée depuis son propre profil. Son verso donnera une fonction concrète à la métaphore de la carte de visite en présentant un QR code qui ouvre le profil public du lecteur. Le recto existant reste inchangé et le verso doit conserver le même format, le papier blanc cassé et la sobriété éditoriale validée.

Le QR code ne contiendra que l’URL publique canonique du profil. Il ne pourra ni embarquer un jeton de session, ni contourner une restriction de visibilité, ni dépendre de l’appellation publique susceptible de changer sans redirection. Une adresse lisible ainsi que des alternatives Copier et Partager devront couvrir les situations où le QR code ne peut pas être scanné depuis le même appareil.

Cette interaction peut être simulée dans le prototype d’interface, mais sa destination réellement stable dépendra de l’authentification, de la persistance et des routes publiques finales encore hors du lot actuel. La commande de retournement, le dessin du verso, l’animation accessible et la hiérarchie des actions de partage restent à arbitrer étape par étape. Aucune implémentation n’est encore autorisée.

### RTC1 validée — commande explicite sous la carte

« Retourner la carte » est une commande extérieure placée immédiatement sous le bord droit du recto. Elle devient « Voir le recto » lorsque le verso est visible. Cette position préserve l’intégrité du papier et évite tout conflit avec « Ajouter une photo », « Recadrer » et « Retirer ».

L’en-tête n’est pas densifié et la carte entière ne devient pas cliquable : un geste sur son contenu ne peut donc jamais provoquer une rotation involontaire. La forme graphique de la micro-zone sous la carte reste à choisir avant de composer le verso.

### RTG1 validée — filet éditorial

La commande RTC1 prend la forme d’une légende de planche extérieure à la carte. Un filet horizontal très fin mène vers une icône de retournement et le libellé alignés à droite. Aucun fond, contour ou bouton permanent n’est ajouté. Au survol, seuls l’icône et le texte prennent la teinte brique ; un focus clavier explicite reste nécessaire. Sur mobile, le filet se raccourcit sans déplacer l’action.

Ce traitement est une base de travail volontairement ajustable après observation dans le profil réel. Sa validation permet d’ouvrir l’arbitrage de composition du verso sans autoriser encore l’implémentation.

### QRV1 validée — centre calme et texte aéré

Le verso conserve une signature Chapter discrète en tête et place un QR code généreux au centre. Le nom du lecteur reste visible sous le code, mais l’ensemble ne doit pas devenir un empilement dense de nom, instruction et URL. Leur séparation verticale constitue l’arbitrage suivant ; l’adresse pourra notamment être isolée dans le pied de carte.

Le QR code est généré sur une zone parfaitement unie, avec un contraste élevé et une véritable marge de silence. La texture papier peut entourer cette zone, jamais apparaître derrière ses modules. L’adresse montrée dans les comparaisons reste illustrative jusqu’à la définition des routes publiques finales.

### QRT1 validée — URL isolée dans le pied

Sous le QR code, le nom du lecteur et la phrase « Scannez pour ouvrir mon profil » forment deux niveaux séparés par une respiration franche. L’URL publique quitte ce groupe et se place plus bas dans le pied de la carte. Le verso se lit donc en deux temps : identité et invitation, puis adresse de secours.

Une appellation longue suit N1b sur une ou deux lignes, mais ne réduit jamais les espacements autour de l’instruction et de l’URL. Cette hiérarchie clôt la composition statique principale du verso et ouvre l’arbitrage du mouvement de retournement.

### QRM1b validée — retournement central légèrement ralenti

La carte effectue une rotation horizontale de 180° autour de son axe central en environ 440 ms. Son emprise reste strictement fixe : aucun déplacement dans la composition, zoom, rebond ou effet élastique n’accompagne le mouvement. QRM1b conserve donc la simplicité de QRM1 tout en ralentissant légèrement les 360 ms de la comparaison, jugées un peu trop rapides pour percevoir la matérialité de la carte.

La face opposée ne devient interactive et annoncée qu’une fois visible. Lorsque la réduction des animations est activée, la rotation laisse place à un échange direct des faces, éventuellement accompagné d’un fondu très court. Cette validation clôt le mouvement ; seule la hiérarchie des alternatives Copier et Partager reste à arbitrer avant de consolider le périmètre et de demander une autorisation d’implémentation.

### QRP1b validée — commande de face immobile

QRP1 est retenue comme base : « Copier le lien », « Partager » et la commande de face restent tous en dehors du papier. Sa disposition initiale est toutefois révisée afin que « Voir le recto » occupe exactement la même position que la commande permettant d’afficher le verso. Le lecteur conserve ainsi un repère moteur stable avant et après les 440 ms de rotation.

La commande de face demeure seule sur la ligne RTG1 immédiatement sous la carte, alignée à droite et précédée de son filet. Au verso seulement, « Copier le lien » et « Partager » apparaissent sur une seconde ligne extérieure, visuellement secondaire. Ils ne modifient ni la largeur, ni l’alignement, ni la position verticale de la commande de face. Sur mobile, les deux actions peuvent se replier ensemble sans déplacer ce repère. QRP1b remplace ainsi le rail unique initial de QRP1 et clôt les arbitrages visuels de QR1.

Le périmètre consolidé a ensuite reçu une autorisation explicite d’implémentation et de publication. Il comprend le véritable QR généré sans service tiers, une route publique dédiée à Maël qui ne rend aucune commande propriétaire, la copie avec confirmation discrète, le partage natif avec copie de repli, le retour au recto lors de la sortie du profil et les adaptations clavier, tactile, mobile et réduction des animations.

QR1 est implémenté et publié dans le checkpoint 20. Le QR encode `https://chapter-reading.smrdsh.chatgpt.site/profil/mael-depreville` ; cette route restitue le portrait public de Maël, ses listes, ses traces et uniquement ses distinctions acquises, sans recadrage photo, retrait, retournement ni progression privée. Le lint, la construction de production et huit tests automatisés passent. La recette manuelle couvre notamment la lecture du code depuis un second appareil ayant accès au Site, QRM1b, QRP1b, la copie, le partage natif et son repli. L’ouverture anonyme à des personnes extérieures reste tributaire de la future politique d’accès et des comptes réels, conformément à la limite déjà posée par QR1.

### Correctif de recette — ouverture stable du profil propriétaire

Le composant qui fabriquait le QR au moment de l'affichage était incompatible avec la chaîne de production actuelle : comme il n'était rendu que sur le profil propriétaire, « Mon profil » produisait seul une page blanche tandis que les autres vues restaient fonctionnelles. Le QR est désormais un SVG statique généré localement à partir de la même URL canonique. Le verso, la copie, le partage et la route publique ne changent pas, mais l'ouverture du profil ne dépend plus d'un moteur QR exécuté dans le navigateur. La checklist couvre explicitement l'accès à « Mon profil » depuis les trois vues principales et le retour vers celles-ci. Ce correctif est publié dans le checkpoint 21 après réussite du lint, de la construction de production et de neuf tests automatisés.

## Décision validée — HMT1, fiche tactile insérée sous la rangée

HM3 fixe déjà un mur continu composé des quatre évolutions actuelles, des quatre prochains badges grisés dans la vue personnelle et des honneurs acquis. Sur desktop, la mini-fiche reste ancrée sous le badge au survol ou au focus. Sur mobile, le toucher doit révéler le même contenu sans rendre la grille instable ni masquer une part importante du mur.

- Un toucher sélectionne le badge et insère une fiche compacte sur toute la largeur immédiatement sous sa rangée.
- La grille se décale verticalement, mais le badge choisi reste visible et clairement relié à son contenu.
- Un second toucher sur le badge ou un toucher extérieur referme la fiche ; sélectionner un autre badge déplace la fiche sous sa rangée.

HMT1 est préférée à HMT2, dont le volet inférieur aurait masqué une partie du mur et affaibli le lien spatial avec le badge, ainsi qu’à HMT3, dont la vue dédiée aurait ajouté une profondeur de navigation disproportionnée. Le léger déplacement de la grille reste borné à une seule fiche compacte et sera vérifié lors du test de jalon.

### Correctif de recette — rangées mobiles stables et listes réellement ouvrables

L’implémentation initiale insérait la fiche tactile comme un nouvel élément du quadrillage mobile : l’ouverture du premier badge pouvait donc repousser le second et rompre visuellement la paire « acquis → suivant ». Le mur est désormais composé de rangées explicites de deux badges. La fiche HMT1 s’insère après la rangée complète, sur toute sa largeur, de sorte que les deux badges restent côte à côte pendant l’ouverture, le déplacement et la fermeture du détail.

La seconde liste présentée sur le profil de Lina n’est plus une entrée statique de démonstration. « Veilles, fenêtres et lumières tardives » ouvre une liste autonome distincte de quatre œuvres. Chaque liste conserve aussi son origine de navigation : retour au profil de Lina lorsqu’elle a été ouverte depuis celui-ci, ou retour à Découvrir depuis le chemin éditorial.

## Décision validée — FC1, moins de vingt lectures terminées

Le mécanisme d’ED3 et les conditions avancées de « Première lumière » sont déjà fixés. Il reste à définir ce que le compteur public mesure et à quel niveau une œuvre cesse d’être confidentielle, sans rendre presque tout le catalogue admissible au lancement ni dépendre d’un seuil mouvant et opaque.

- Une œuvre reste confidentielle tant que moins de vingt comptes l’ont marquée « Lu ».
- Les envies et lectures en cours ne gonflent pas artificiellement sa fréquentation ; le seuil reste public, stable et immédiatement explicable.
- La condition de cinq œuvres, quatre auteurs et trois mises en lumière de HN1 maintient l’honneur à un niveau avancé malgré un seuil accessible.
- L’interface peut ainsi formuler la règle sans ambiguïté : « Confidentielle — moins de 20 lecteurs l’ont terminée sur Chapter ».
- Le seuil est centralisé afin de pouvoir être recalibré explicitement avec la croissance du service, sans modifier les éligibilités déjà mémorisées ni retirer un acquis.

FC1 est préférée à FC2, qui aurait confondu intention et lecture réelle en comptant les statuts « À lire » ou « En cours », ainsi qu’à FC3, dont le percentile aurait rendu la fenêtre mouvante et difficile à expliquer. Le caractère plus permissif du lancement reste compensé par les conditions avancées de HN1.

## Décision validée — PFP1, recadrage carré maîtrisé et fluide

La photo reste facultative et les initiales constituent déjà le remplacement permanent. Il reste à fixer la manière dont une image importée s’adapte à la vignette de profil, ainsi que les formats et erreurs minimaux du lot, sans ajouter de personnalisation décorative ni d’étape d’onboarding.

- Après sélection, une surface courte permet de déplacer l’image et d’ajuster son zoom dans un cadre carré, avec aperçu circulaire du rendu utilisé dans l’interface.
- JPEG, PNG et WebP sont acceptés jusqu’à 8 Mo ; les erreurs de format, de poids ou de lecture apparaissent dans cette même surface sans perdre l’image précédente.
- « Enregistrer » applique le cadrage, « Annuler » conserve l’état antérieur et « Retirer la photo » restaure immédiatement les initiales après confirmation simple.
- Le déplacement accepte la souris, le toucher et le stylet ; le zoom accepte le contrôle visible, la molette lorsque pertinente et le pincement tactile.
- Pendant le geste, l’aperçu transforme la source haute définition sans la réencoder ni recréer un bitmap à chaque mouvement. La génération du cadrage final intervient uniquement à l’enregistrement.
- Les transformations visuelles sont regroupées avec le rythme d’affichage afin d’éviter saccades et mises à jour excessives ; l’image reste contrainte de manière à toujours couvrir le cadre carré.
- Une source dont le petit côté est inférieur à 512 px est refusée avec une explication claire afin d’éviter un résultat pixellisé. Le cadrage enregistré doit permettre des dérivés adaptés aux différentes tailles d’affichage sans servir le fichier source de 8 Mo dans l’interface.

PFP1 est préférée à PFP2, dont le recadrage automatique aurait pu couper un visage décentré, ainsi qu’à PFP3, dont les marges auraient créé des aires apparentes irrégulières. Le contrôle reste strictement fonctionnel : aucun filtre, effet, rotation décorative ou outil de retouche n’est ajouté.

## Décision validée — JI1, un jalon intégré construit par tranches

Tous les choix produit, UX, UI et responsive de la phase sont désormais suffisamment définis pour préparer l’implémentation. Le choix porte sur le nombre de jalons présentés à l’utilisateur ; dans tous les cas, le développement interne restera découpé et chaque tranche sera vérifiée avant l’intégration suivante.

- Découvrir, profils, Chapitres d’honneur, abonnements, priorité relationnelle et conversations sont publiés ensemble dans un seul jalon utilisateur cohérent.
- L’implémentation est néanmoins réalisée et testée successivement par fondations visuelles, parcours de découverte et profil, puis comportements sociaux.
- Une checklist exhaustive unique permet de tester les relations entre toutes les surfaces, au prix d’un jalon plus dense.

JI1 est préférée à JI2, qui aurait imposé une première évaluation privée des interactions relationnelles, ainsi qu’à JI3, dont les états transitoires et campagnes de validation auraient fragmenté inutilement le jalon. Le choix porte uniquement sur la livraison présentée au lecteur-test : les validations techniques restent incrémentales à l’intérieur du développement.

## Implémentation validée — JI1 réalisé

L’autorisation explicite a été donnée et le jalon JI1 a été construit selon les six tranches internes prévues :

1. **Fondations et données simulées** : modèles locaux étendus sans retirer les parcours de lecture de la phase 9.
2. **Découvrir** : recommandation éditoriale personnalisable, échos, listes et profils publics, recherche exacte et ZR1b, états rares et composition responsive.
3. **Profil et identité** : PR1/PRM1, abonnement, titre équipé, trois badges mis en avant et recadrage PFP1 haute définition.
4. **Chapitres d’honneur** : vingt-et-un assets originaux archivés, dérivés WebP optimisés intégrés, mur HM3, progressions privées, titres et mise en avant.
5. **Interactions sociales** : priorité relationnelle KF2, conversations RP1, fermeture DC1, aperçu VC1 et réponse CPR1, avec garde-fous simulés.
6. **Consolidation** : états desktop et mobile, clavier, focus, toucher, clic extérieur, annulations, retours de contexte et non-régression couverts par les vérifications statiques et la checklist utilisateur.

Les validations automatisées comprennent le lint, les tests, le build de production et un contrôle d’intégrité des vingt-et-un assets web. La checklist exhaustive du jalon est conservée dans `PHASE_10_IMPLEMENTATION_CHECKLIST.md` ; elle distingue les comportements testables, les données simulées et les éléments reportés.

Ce périmètre n’étend pas le lot à l’authentification réelle, la persistance distante, la messagerie privée, les notifications complètes, les listes collaboratives, les classements globaux, le backend de recommandation ni l’administration de modération.

**Statut : autorisation reçue ; implémentation terminée et publiée ; évaluation utilisateur ouverte avec la checklist exhaustive.**

## Révision post-recette — badges, accès mobile, carte de lecteur et recherche

La première recette du jalon a révélé quatre ajustements immédiatement applicables :

- les images des distinctions doivent être servies directement depuis les assets WebP publics, sans dépendre du service d’optimisation d’images du framework ; cette règle couvre le profil et le mur des Chapitres d’honneur ;
- le clic extérieur du menu de compte ne doit pas intercepter les commandes situées dans sa feuille mobile : « Voir mon profil » ferme désormais la feuille après avoir effectué la navigation ;
- la photo, « Votre portrait », le nom, le titre équipé et l’introduction sont réunis dans une **carte de lecteur** inspirée d’une carte de visite éditoriale sur papier épais. Les Chapitres d’honneur restent hors de la carte afin de ne pas confondre identité et collection ;
- « Résultats exacts » est réservé à une égalité normalisée avec le titre complet ou le nom complet de l’auteur. Une recherche par fragment, mot-clé ou souvenir approché relève de « Vous cherchez peut-être… », avec au plus trois suggestions justifiées.

Cette révision précise PR1/PRM1 et ZR1b sans modifier leurs principes. Elle constitue le premier correctif de recette du jalon JI1.

## Révision visuelle — carte blanche cassée et actions d’honneur explicites

La première carte de lecteur était trop beige et trop chargée pour évoquer un papier de qualité. Elle est remplacée par une surface blanc cassé, mate, au grain très discret, avec une ombre courte et un filet brique dans l’angle supérieur droit. L’effet doit rappeler un carton d’édition plutôt qu’une carte administrative ou un panneau d’interface.

La distinction fonctionnelle des Chapitres d’honneur est également explicitée dans les libellés :

- **afficher un titre sous son nom** change l’appellation identitaire visible sur le profil et dans le menu du compte ;
- **afficher un badge sur son profil** choisit l’un des trois insignes présentés dans la section Chapitres d’honneur du profil ;
- une même distinction peut fournir à la fois le titre équipable et le badge sélectionnable, mais ces deux choix sont indépendants.

Les commandes deviennent « Afficher ce titre sous mon nom » et « Afficher ce badge sur mon profil » afin de supprimer toute ambiguïté.

## Correctif PFP1 et carte — source réversible, dialogue et ornement

La recette du recadrage a montré qu’un recadrage enregistré ne devait jamais devenir la nouvelle source de travail. Le modèle local de la photo conserve désormais séparément :

- la source originale importée ;
- les dimensions de cette source ;
- le déplacement et le niveau de zoom enregistrés ;
- le dérivé carré optimisé utilisé dans le profil.

« Recadrer » rouvre donc l’original avec le cadrage précédent et permet de revenir jusqu’au zoom minimal. L’annulation continue de préserver le dernier cadrage validé. La confirmation de suppression quitte la carte et devient un dialogue superposé non destructif, afin de ne jamais déplacer son contenu.

La composition de la carte est également rééquilibrée : le nom est centré dans son aire, protégé des bords par des marges internes et légèrement réduit lorsque nécessaire. Le simple filet d’angle est remplacé par un ornement éditorial composé de deux arcs fins et d’une petite étoile, toujours dans la teinte brique et sans concurrencer le portrait.

## Révision validée — état vide du recadrage, nom et marque de carte

La recette suivante invalide trois détails de la version précédente :

- avant le choix d’un fichier, le grand cadre noir et son libellé « Choisissez une image » sont supprimés ; une surface de sélection compacte doit précéder l’apparition du véritable espace de recadrage ;
- le nom ne doit jamais couper un mot pour remplir son aire. Trois traitements restent à arbitrer : deux lignes équilibrées avec adaptation discrète de taille (N1), prénom secondaire et nom de famille affirmé (N2), ou ligne unique ajustée (N3) ;
- l’ornement à doubles arcs est abandonné. Trois marques compactes liées à Chapter restent à arbitrer : livre ouvert ponctué (O1), sceau monogramme « C. » (O2) ou marque-page de chapitre (O3).

**O2 et N1b sont validées et implémentées**. Le sceau compact « C. » devient la marque de coin de la carte. Le champ public ne suppose ni prénom, ni nom de famille, ni deux mots : une appellation ou un pseudonyme peut occuper une ou deux lignes équilibrées, avec une taille adaptative bornée et sans césure interne. La future création de profil imposera seulement une longueur maximale de présentation d’environ 36 caractères et montrera un aperçu de la carte. Avant le choix d’un fichier, une surface claire et compacte remplace désormais le faux espace de recadrage noir ; les outils de cadrage n’apparaissent qu’après l’import d’une image valide.

## Ajustement de recette — centrage de l’import et finition du sceau

Le bouton « Choisir une image » est désormais centré explicitement dans l’état vide du panneau photo, sans dépendre de l’alignement générique des commandes de fichier. Le sceau O2 conserve sa silhouette circulaire et son monogramme : le « C » est isolé dans sa propre couche afin de recevoir un centrage optique indépendant de la ponctuation. Le point brique légèrement agrandi est placé plus bas, avec un espace visible sous les cercles, comme la ponctuation détachée sous un tampon. La rotation de l’ensemble reste supprimée. Les commandes « Ajouter une photo » et « Recadrer · Retirer » forment enfin un groupe centré sous le portrait sur desktop comme sur mobile.

## Asset validé — poinçon de la carte de lecteur

La reconstruction CSS du sceau est remplacée par le poinçon généré puis fourni par le porteur du projet. Son fond transparent est conservé ; les marges vides de génération sont retirées et une marge technique régulière est réintroduite avant une optimisation WebP sans perte. L’asset est affiché comme une véritable marque imprimée dans le coin supérieur droit de la carte, légèrement plus grand sur desktop que sur mobile, sans chevaucher le libellé de la carte ni les informations du portrait.

## Correctif de recette — badges tactiles et invitation de date

HMT1 distingue désormais les modalités d’entrée : le survol ouvre une fiche uniquement avec un pointeur fin, le focus visible la révèle au clavier et le toucher sélectionne le badge demandé en une seule transition d’état. Le passage d’un acquis à son prochain badge, y compris dans une autre rangée, ne doit plus refermer immédiatement la nouvelle fiche.

Le relais SD2 était rendu derrière son propre voile sur mobile. Il devient un panneau inférieur visible au même niveau que le sélecteur de statut, tandis que sa version desktop reste intégrée près du contrôle d’origine. Le statut est toujours enregistré avant l’invitation facultative et « Plus tard » ferme celle-ci sans annuler le statut.

## Correctif de recette — abonnement visible et commandes de conversation

Le retour utilisateur du 27 août précise l'état du bouton d'abonnement dans le profil : « Suivre » reste brique à texte clair, tandis que « Suivi » utilise un fond gris clair et un texte brique. Le survol et l'appui conservent cette distinction ; le changement reste immédiatement réversible et `aria-pressed` reflète l'état effectif.

Sous les critiques, le retrait de la marge gauche sur mobile supprimait aussi la seule séparation entre « Voir la conversation · 2 » et « Répondre ». Une rangée souple avec un espacement horizontal et vertical explicite remplace cette dépendance aux marges. Les commandes passent sur deux lignes si nécessaire ; après développement, la réponse reste proposée sous les messages. Les états sans réponse et conversation fermée sont conservés.

La consultation des auteurs de critiques est limitée par les fixtures actuelles : Lina est reliée à un profil visiteur, contrairement à Théo et Inès. Ce point est confirmé comme une limite du prototype, pas un incident de navigation. Aucun nouveau profil n'est créé dans ce lot.

Statut : correctifs implémentés et publiés avec succès en version 23 (source `e0f305c451e3c5f65aeae146128391c80dc8c9ca`). Lint, typage ciblé de `phase10.tsx` et `honors-layout.ts`, construction de production et dix-sept tests automatisés réussis. Les tests ajoutés vérifient les règles des deux états et l'espacement responsive ; le rendu serveur vérifie aussi les commandes produites. Ils ne remplacent pas la recette visuelle de l'utilisateur. La recette de phase 10 continue ; la phase 11 reste réservée au prochain chat.

## Correctif de recette — menu de tri de la bibliothèque

Le retour utilisateur signale la flèche native trop proche du bord et le survol bleu de la liste de tri. Le contrôle de phase 9 est repris pendant cette recette, sans ajouter d'option ni modifier les règles de classement.

Un sélecteur dédié remplace le menu natif : flèche dans une colonne réservée avec marge intérieure de 0,85 rem, fond blanc cassé, bordure fine, ombre discrète, survol brique doux et coche sur l'option choisie. La largeur du menu suit celle du bouton et les cibles mesurent au moins 44 px de haut, y compris sur mobile.

Le comportement reste accessible au clavier : focus sur le déclencheur, option active annoncée, flèches, Début/Fin et premières lettres pour parcourir, Entrée/Espace pour valider, Échap pour annuler, Tab pour valider puis poursuivre normalement. Le clic extérieur et la perte de focus ferment sans appliquer une option simplement parcourue ; cliquer ou toucher une option valide directement. Les écouteurs sont nettoyés à la fermeture et à la sortie de la bibliothèque.

Statut : implémenté et publié avec succès en version 24 (source `ce72daa701d73b49f399da3dbea360278fd6896e`). Lint, typage ciblé de `library-sort.tsx`, construction de production et vingt-deux tests automatisés réussis. Les cinq tests ajoutés couvrent le rendu des choix, les gestionnaires clic/clavier/perte de focus et les invariants de style, sans remplacer une recette navigateur. Les tris « Activité récente », « Titre » et « Auteur », la recherche et les filtres sont conservés. La phase 11 n'est pas ouverte.

## Arbitrages à mener

1. Définir les signaux qui structurent les premières œuvres proposées — **D4 validée**.
2. Définir la forme et la place de l’espace de découverte dans la navigation existante — **N2 validée**.
3. Composer les groupes éditoriaux et les cartes d’œuvres sans produire une grille marchande générique — **C2, P4, A2, BP2, I2 et R1 validées**.
4. Définir le rôle des critiques, listes publiques et lecteurs dans le passage d’une œuvre à une autre — **S2 et O2 validées**.
5. Définir le modèle d’abonnement, le profil public minimal utile et les distinctions — **F1, PR1, GP1, G1, T3, L4, M3, V1, PV1, MP1, AC1, HM3, ET1, ED3, PC4, TI1, JL1, XE3, JX1, EX1, JE2, RL1, JR3, SGH1, HV1, HH2, HN1 à HN5, VG2, SY1, MH1, MM1, SL1, EG3, NL2, NE2, NEX2, NR2, SH2 et CA1 validées ; aucune troisième personnalisation dans ce lot ; prompt-cadre de production externe livré**.
6. Activer la priorité donnée aux critiques de personnes suivies sur la page d’une œuvre — **KF2 validée**.
7. Définir les commentaires ou réponses à une critique, leur profondeur et leurs garde-fous — **RP1, DC1, VC1 et CPR1 validées**.
8. Concevoir les états sans abonnements, sans historique exploitable, sans résultat et avec contenu social limité — **EH1, EA1, ZR1b et CSL1 validées**.
9. Décliner l’ensemble sur desktop et mobile, puis préparer la checklist exhaustive du jalon — **DR1D et DR1M1 validées pour Découvrir ; PRM1 validée pour le profil responsive puis révisée sur desktop par PDR1B ; HMT1 validée pour le comportement tactile du mur d’insignes**.
10. Calibrer les paramètres explicitement reportés avant l’implémentation — **FC1 validée pour la fenêtre confidentielle ED3 ; PFP1 validée pour la photo de profil, avec interaction haute définition et fluide**.
11. Choisir le découpage de l’implémentation et préparer la checklist — **JI1 validée, autorisée et implémentée ; checklist exhaustive produite**.

## Point de continuité — suite du plan au 27 août

L'utilisateur demande de poursuivre exclusivement la clôture de phase 10 ici et d'entamer la phase 11 dans un autre chat du projet. Le document [`PHASE_10_BILAN_ET_PASSATION.md`](./PHASE_10_BILAN_ET_PASSATION.md) rassemble le périmètre livré, les preuves de validation, la dernière recette et les points de reprise. Le lint et les quinze tests automatisés passent à nouveau ; la validation fonctionnelle globale de l'utilisateur reste attendue. Aucune modification d'interface ni nouvelle publication n'est effectuée pendant cette préparation documentaire.

Le retour du logo « Chapter. » au Journal est maintenu à la demande de l'utilisateur ; aucune nouvelle page d'accueil n'est créée. Cette confirmation ne vaut pas clôture globale de la recette de phase 10.

La suite du plan initial est : terminer la recette et obtenir la validation finale de phase 10, puis ouvrir la phase 11 pour l'audit transversal des états limites, des interactions, de la cohérence graphique, du responsive et de l'accessibilité. Les correctifs seront présentés et autorisés avant implémentation, puis soumis à une recette finale exhaustive. Cette phase termine le premier périmètre d'interface sur données simulées ; elle ne transforme pas à elle seule le prototype en service doté de comptes et de persistance réels.

L'authentification, l'onboarding et les autres exclusions ci-dessous restent des sujets de cadrage ultérieurs, sans nouvelle phase numérotée ni implémentation automatiquement autorisée. Le point technique ouvert sur les déclarations Cloudflare du typage global devra être repris dans le bilan de consolidation.

## Hors périmètre maintenu à ce stade

- messagerie privée ;
- notifications complètes ;
- listes collaboratives ;
- classements globaux de lecteurs ;
- recommandations fondées sur un backend réel ;
- modération et administration complètes ;
- authentification et onboarding.

Ces exclusions pourront être réexaminées uniquement si un arbitrage de la phase démontre qu’un élément est indispensable à la cohérence du parcours social minimal.
