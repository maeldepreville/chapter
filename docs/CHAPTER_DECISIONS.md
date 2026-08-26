# Chapter — Journal des décisions produit et UI/UX

Ce document constitue la source de référence des décisions prises au cours de la conception de l’interface de Chapter. Il distingue les choix validés des sujets encore ouverts afin d’éviter les glissements de périmètre et les contradictions.

Dernière mise à jour : 26 août 2026

## Cadre de collaboration

- Notre travail porte exclusivement sur l’interface de Chapter : architecture de l’information, parcours, UX, direction visuelle, responsive, accessibilité, composants et frontend.
- Le développement d’une interface ne commence qu’après une validation explicite de la solution proposée.
- Cycle de travail : discussion → analyse UX → proposition → ajustements → validation → implémentation.
- Lorsqu’un arbitrage est validé avec une demande de poursuivre, la réponse suivante consigne la décision et présente immédiatement l’arbitrage suivant avec un contexte très léger ; aucun tour séparé de simple transition n’est ajouté.
- Dans chaque chat travaillant sur le projet, les décisions sont consignées après chaque interaction de conception dans ce journal transversal et dans le document détaillé de la phase active. L’historique conversationnel ne constitue jamais l’unique mémoire du projet.
- Une décision révisée doit être remplacée explicitement, jamais contredite silencieusement.
- Lorsqu’un sujet est évoqué, il doit être situé explicitement dans le plan : phase actuelle, phase ultérieure identifiée, hors du premier lot ou nouveau sujet à intégrer.
- Chaque jalon final publié doit être accompagné d’une checklist exhaustive des points à tester : écrans, parcours, interactions, responsive, états limites, fermetures, annulations, restauration du contexte et reports connus.
- Les choix produit et UI doivent rechercher un équilibre explicite entre valeur pour le lecteur, acquisition, activation et rétention. Les leviers de croissance doivent être étayés par des références crédibles et assortis de garde-fous contre les métriques trompeuses et les interfaces manipulatrices.

## Plan de développement de référence

1. Définir le périmètre précis de la première interface.
2. Dresser la carte des écrans.
3. Décider de la navigation.
4. Établir la direction visuelle.
5. Concevoir la page d’un livre.
6. La décliner sur mobile.
7. Valider le parcours d’ajout et de critique.
8. Implémenter la première tranche verticale approuvée.
9. Consolider les composants et développer l’espace personnel.
10. Développer la découverte et les interactions sociales.
11. Traiter les états transversaux et finaliser la cohérence, le responsive et l’accessibilité.

### Avancement

- Phase 1 — définition du périmètre : **terminée et validée**.
- Phase 2 — carte des écrans : **terminée et validée**.
- Phase 3 — navigation : **terminée et validée**.
- Phase 4 — direction visuelle : **terminée et validée**.
- Phase 5 — page d’une œuvre : **terminée et validée**.
- Phase 6 — déclinaison mobile : **terminée et validée**.
- Phase 7 — parcours d’ajout, de note privée et de critique : **terminée et validée**.
- Phase 8 — implémentation de la première tranche verticale : **terminée et validée**.
- Phase 9 — consolidation des composants et espace personnel : **terminée et validée**.
- État actuel : phase 10 ouverte ; cadrage de la découverte et des interactions sociales en cours.
- L’interface fonctionnelle reste fondée sur des données simulées ; le jalon permet d’évaluer l’ensemble du parcours personnel sur desktop et mobile.
- Livrables : [`PHASE_02_CARTE_ECRANS.md`](./PHASE_02_CARTE_ECRANS.md), [`PHASE_03_NAVIGATION.md`](./PHASE_03_NAVIGATION.md), [`PHASE_04_DIRECTION_VISUELLE.md`](./PHASE_04_DIRECTION_VISUELLE.md), [`PHASE_05_PAGE_OEUVRE.md`](./PHASE_05_PAGE_OEUVRE.md), [`PHASE_06_MOBILE.md`](./PHASE_06_MOBILE.md), [`PHASE_07_PARCOURS_PERSONNELS.md`](./PHASE_07_PARCOURS_PERSONNELS.md), [`PHASE_08_IMPLEMENTATION.md`](./PHASE_08_IMPLEMENTATION.md), [`PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md`](./PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md), [`PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md`](./PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md) et [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md).

## Décisions validées pendant la phase 10

### Priorité initiale de la découverte

- La découverte doit d’abord permettre de **trouver des œuvres pertinentes**, même lorsque l’utilisateur ne suit encore personne.
- Les lecteurs, les critiques et les listes publiques viennent ensuite enrichir et expliquer cette découverte, puis peuvent conduire progressivement à la constitution d’un cercle de lecteurs.
- L’expérience initiale ne dépend donc pas de l’existence préalable d’un graphe social.
- La phase conserve un modèle centré sur l’œuvre et évite de faire du fil social générique son point d’entrée.
- Le cadrage détaillé est maintenu dans [`PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md`](./PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md).
- Statut : **validé**.

### D4 — Pertinence progressive

- Les œuvres proposées combinent progressivement quatre familles de signaux : sélection éditoriale indépendante, traces du journal personnel, intention ponctuelle facultative et signaux issus du cercle suivi.
- La sélection éditoriale permet une découverte utile sans historique ni abonnement ; les autres signaux affinent ensuite la pertinence sans devenir des prérequis.
- Chaque proposition expose une raison principale compréhensible afin d’éviter une recommandation opaque.
- Les signaux sociaux renforcent ou diversifient une proposition, mais la popularité ne devient pas le critère dominant.
- D4 remplace les approches exclusivement fondées sur l’historique, sur un questionnaire initial ou sur le graphe social.
- Statut : **validé**.

### N2 — Destination principale « Découvrir »

- « Découvrir » devient une destination principale et remplace « Recherche » dans la navigation mobile : **Journal · Découvrir · Bibliothèque**.
- Sur desktop, « Découvrir » rejoint les liens de navigation, tandis que le champ de recherche rapide reste directement disponible dans l’en-tête.
- La destination rassemble la recherche exacte et l’exploration sans requête, avec des états clairement distincts.
- Une requête validée depuis le champ desktop ouvre « Découvrir » dans son état de résultats ; les suggestions courtes continuent d’ouvrir directement une œuvre ou un auteur.
- Le Journal reste un espace strictement personnel et n’accueille pas de modules de découverte sociale.
- Cette décision révise explicitement la destination « Recherche » validée en phase 3, sans modifier les deux autres entrées principales.
- Statut : **validé**.

### C2 — Chemins éditoriaux

- La page « Découvrir » est structurée par des chemins éditoriaux plutôt que par une succession de rayons uniformes ou une mosaïque dense.
- Une proposition principale expliquée ouvre l’exploration ; des chemins secondaires permettent ensuite de poursuivre selon une envie, une proximité littéraire ou une médiation sociale.
- La raison principale d’une proposition reste visible et distingue clairement les signaux personnels, déclaratifs, éditoriaux et sociaux.
- Chaque ensemble possède une fin naturelle ; la page ne repose pas sur un défilement infini.
- C2 préserve une hiérarchie calme, limite la répétition de grilles de couvertures et renforce l’identité de revue littéraire contemporaine de Chapter.
- Statut : **validé**.

### P4 — Priorité adaptative

- La proposition principale mobilise le signal le plus explicite disponible selon un ordre stable : intention ponctuelle, journal suffisamment informatif, puis sélection éditoriale de repli.
- Les signaux sociaux enrichissent ou départagent les propositions, mais ne deviennent jamais seuls la justification principale.
- Une proposition utile est toujours affichée sans questionnaire préalable.
- Une intention exprimée remplace temporairement la piste principale sans modifier durablement le profil de goût supposé du lecteur.
- L’interface nomme la raison retenue et n’extrapole pas au-delà des traces réellement disponibles.
- P4 est préférée à une priorité permanente donnée au journal, à l’intention déclarée ou à la sélection éditoriale.
- Statut : **validé**.

### A2 — Ajout rapide à « À lire »

- Depuis « Découvrir », la couverture et le titre ouvrent l’œuvre ; une action secondaire ajoute directement une œuvre absente avec le statut « À lire ».
- L’ajout déclenche une confirmation annulable et ne demande ni date, ni évaluation, ni publication.
- Lorsqu’une œuvre est déjà enregistrée, son statut est simplement indiqué ; sa modification reste réservée à la page de l’œuvre.
- A2 évite l’étape supplémentaire de la consultation seule sans exposer le sélecteur complet de suivi dans l’espace de découverte.
- Statut : **validé**.

### BP2 — Une œuvre et deux échos

- Le bloc principal de « Découvrir » présente une œuvre prioritaire et deux alternatives plus discrètes liées à la même piste.
- L’œuvre principale reçoit la justification complète et les actions A2 ; chaque écho est distingué par une nuance éditoriale courte.
- La composition évite à la fois l’autorité excessive d’une recommandation unique et l’absence de direction d’un triptyque égalitaire.
- Sur mobile, le contenu se déroule verticalement sans imposer de carrousel horizontal.
- Statut : **validé**.

### I2 — Phrases d’envie

- Le lecteur peut exprimer une intention ponctuelle au moyen de quelques phrases naturelles introduites par « Aujourd’hui, j’aimerais… ».
- Les formulations restent facultatives, peu nombreuses et renouvelées ; elles ne constituent ni des filtres permanents, ni une taxonomie exhaustive.
- Une seule envie peut être active et elle ne modifie pas durablement le profil de goût supposé du lecteur.
- I2 est préférée aux filtres de catalogue et au mini-formulaire guidé.
- Statut : **validé**.

### R1 — Transformation sur place

- Sélectionner une phrase I2 remplace sur place le contenu de BP2 par une nouvelle œuvre principale et deux échos correspondant à l’intention active.
- La phrase reste visible avec une action « Effacer », qui restaure immédiatement la proposition précédente et son contexte.
- Les autres chemins de « Découvrir » conservent leur position et leur état.
- R1 évite la fragmentation d’un écran de résultats séparé et la répétition produite par l’ajout d’un second bloc.
- Statut : **validé**.

### S2 — Une liste publique ouvre un univers

- La première porte d’entrée sociale de « Découvrir » est une liste publique avec un titre éditorial, une intention courte, l’identité de son auteur et plusieurs œuvres en aperçu.
- La liste révèle d’abord une sensibilité par des choix concrets ; le profil de son auteur reste accessible sans devenir le point de départ principal.
- Aucun rang obligatoire ni score de popularité dominant n’est affiché.
- La critique isolée reste privilégiée pour approfondir une œuvre ; la carte de profil intervient après un intérêt déjà manifesté pour les contenus d’une personne.
- Statut : **validé**.

### O2 — Page publique autonome pour une liste

- Une liste publique possède une destination et un lien propres, avec son titre, son intention, son auteur et ses œuvres dans un flux éditorial.
- Chaque œuvre ouvre sa page habituelle ; l’identité de l’auteur ouvre son profil public.
- Le retour restaure intégralement le contexte de « Découvrir », y compris la position et l’éventuelle envie active.
- Une liste n’est pas obligatoirement classée et peut associer une courte note de sélection à chaque œuvre.
- O2 est préférée à une expansion dans « Découvrir » et à une fenêtre superposée.
- Statut : **validé**.

### F1 — Suivre depuis un contenu

- L’action « Suivre » est proposée directement dans la zone d’auteur d’une liste publique ; elle est secondaire, explicite et réversible.
- L’ensemble avatar, nom et rôle situé à gauche du bouton est cliquable et ouvre le profil public.
- La cible du profil et celle de l’abonnement restent séparées : aucune des deux actions ne déclenche implicitement l’autre.
- F1 évite l’obligation de consulter le profil et les suggestions différées fondées sur un seuil invisible.
- Statut : **validé**.

### PR1 — Portrait éditorial

- Le profil public exprime un goût à travers une identité courte, quelques œuvres de chevet, des listes publiques et une sélection limitée de critiques.
- Il ne devient ni un fil d’activité, ni une bibliothèque exhaustive.
- Les notes privées, l’historique personnel, les statuts non publiés, les volumes de lecture et la fréquence de publication ne structurent pas le profil.
- PR1 préserve une identité éditoriale sans hiérarchie dominée par les métriques sociales.
- Statut : **validé**.

### Différenciation du profil

- La possibilité d’ajouter une photo de profil est validée dans son principe ; elle reste facultative et utilise les initiales comme solution de remplacement. Ses états et son traitement restent à concevoir.
- Une gamification engageante est un objectif produit explicite : elle doit soutenir la lecture, la découverte, la contribution et les rapprochements sociaux, tout en restant contrôlée.
- Les récompenses doivent former de véritables quêtes poursuivables plutôt que de simples titres obtenus après une première action.
- Les badges fondés sur le nombre d’œuvres lues ou sur le fait d’être le premier lecteur enregistré doivent être challengés au regard de la comparaison sociale, de la course artificielle et de la facilité de manipulation.
- L’idée de valoriser les premiers découvreurs d’œuvres de niche reste ouverte à une reformulation moins dépendante d’une rareté chronologique stricte.
- Un unique élément visuel personnalisable supplémentaire est recherché afin de singulariser le profil sans rompre la cohérence de Chapter.
- Statut : **principes validés ; intégration et critères détaillés ouverts**.

### Quatre axes de progression

- La gamification s’organise autour de quatre axes indépendants : **Lecture**, **Exploration**, **Expression** et **Relation**.
- Ces axes ne sont ni exclusifs, ni linéaires : chaque lecteur y progresse simultanément selon ses usages.
- Une quête est un objectif poursuivable ; sa progression conduit à des paliers et à des badges, tandis que le palier suivant donne une direction concrète.
- Le lecteur peut équiper un seul titre déjà obtenu afin de choisir la distinction affichée près de son nom.
- Les acquis ne sont pas supprimés ; aucun classement global ni remise à zéro punitive ne structure le système.
- Les noms, seuils et critères précis restent à définir, notamment pour la valorisation des découvertes d’œuvres peu fréquentées.
- L’intégration dans PR1 doit rendre la progression visible sans repousser les œuvres de chevet, listes et critiques au second plan.
- Statut : **validé**.

### GP1 — Signature intégrée des distinctions

- Le profil PR1 présente un titre équipé près du nom et jusqu’à trois badges choisis par le lecteur avant ses œuvres de chevet.
- La collection complète reste accessible dans une destination secondaire afin de ne pas déplacer le centre de gravité du portrait éditorial.
- Chaque badge utilisera un véritable asset illustré et détouré ; les grandes cartes rectangulaires de la comparaison initiale sont écartées.
- L’appellation de la distinction est placée sous son insigne.
- L’insigne visible dans la sélection et le titre équipé près du nom sont deux expressions complémentaires d’une distinction obtenue.
- La direction artistique détaillée des assets reste à arbitrer avant leur production.
- Statut : **validé**.

### G1 — « Chapitres d’honneur » et titres non numérotés

- La collection complète des distinctions porte le nom **« Chapitres d’honneur »**.
- Le nom associe chaque distinction à une étape du parcours du lecteur et personnalise la galerie pour Chapter sans recourir au vocabulaire générique des trophées.
- Aucun titre public ne comporte de chiffre ou de numéro romain.
- Chaque palier reçoit une appellation propre dont le sens doit traduire une évolution réelle, et non une simple hausse quantitative renommée.
- Un compteur de progression peut rester visible dans l’espace personnel lorsqu’il aide à comprendre le prochain objectif, mais il n’entre jamais dans le nom public du titre ou du badge.
- L’architecture reliant progressions principales, quêtes particulières, badges et titres reste à arbitrer.
- Statut : **validé**.

### T3 — Lignées et distinctions honorifiques

- Chacun des quatre axes possède une lignée principale de titres successifs, conçue pour exprimer une évolution durable et sémantiquement lisible.
- Cinq distinctions singulières forment parallèlement un registre **honorifique entièrement extérieur aux quatre axes**.
- Cette architecture conserve un objectif de long terme tout en évitant de réduire tous les badges à des niveaux quantitatifs parallèles.
- Une distinction honorifique ne possède ni axe, ni progression de lignée, ni contribution à un palier Lecture, Exploration, Expression ou Relation.
- Un titre obtenu dans une lignée ou par une distinction honorifique peut être équipé sur le profil public.
- Cette formulation révise explicitement l’idée antérieure selon laquelle chaque axe associerait sa lignée à des distinctions singulières propres.
- Statut : **validé**.

### L4 — Quatre titres par lignée

- Chaque lignée principale comporte quatre titres, soit seize titres principaux sur les quatre axes.
- Les quatre étapes représentent l’éveil, la pratique établie, la maîtrise puis la transmission.
- Ce rythme conserve des récompenses significatives sans créer de trop longues périodes dépourvues d’évolution visible.
- Les distinctions honorifiques fournissent des accomplissements supplémentaires sans allonger artificiellement les lignées.
- Le premier titre exige déjà une pratique significative ; une première action triviale ne suffit pas à l’obtenir.
- Les appellations et les critères précis restent à arbitrer.
- Statut : **validé**.

### M3 — Jalons composés et concis

- Chaque titre est obtenu par un objectif principal mesuré et au maximum deux conditions secondaires.
- Chaque critère tient sur une ligne et expose son état par un compteur direct ou une coche.
- La progression est automatique : aucune quête ne doit être activée manuellement.
- Aucun score agrégé ni système de points opaque n’est utilisé.
- Les détails explicatifs sont facultatifs et ne sont pas nécessaires pour comprendre l’objectif courant.
- Les conditions restent propres à leur axe ; progresser en Exploration ne peut pas imposer une action d’Expression.
- Les critères sont objectifs et ne reposent pas sur une évaluation secrète de la qualité.
- Statut : **validé**.

### V1 — Progression rattachée au profil

- Les quêtes, jalons et progressions sont consultés depuis « Chapitres d’honneur », directement rattaché au profil.
- Aucun rappel de quête n’est ajouté au Journal et aucune destination « Quêtes » n’entre dans la navigation principale.
- Les distinctions décrivent ainsi l’identité et le parcours du lecteur plutôt qu’une liste de tâches quotidiennes.
- Le titre équipé et les badges sélectionnés restent visibles sur le profil public selon GP1.
- Statut : **validé**.

### PV1 — Acquis publics et progression privée

- La galerie publique d’un lecteur présente uniquement les distinctions qu’il a déjà obtenues.
- Les titres verrouillés, critères incomplets, compteurs, pourcentages et objectifs en cours ne sont jamais visibles par les autres lecteurs.
- Le propriétaire retrouve ses acquis et ses progressions dans sa propre vue de « Chapitres d’honneur ».
- Cette vue personnelle synthétise l’avancement sans devenir un tableau de suivi dense.
- Statut : **validé**.

### MP1 — Ligne de progression confinée à la galerie

- Dans la vue personnelle de « Chapitres d’honneur », chaque prochain titre résume ses critères M3 sur une seule ligne concise.
- Les formulations détaillées restent disponibles à la demande.
- Aucune progression, aucun compteur et aucun objectif incomplet n’apparaît directement sur la page du profil.
- PR1 conserve seulement le titre équipé, jusqu’à trois badges acquis sélectionnés et un accès discret à la galerie.
- Cette séparation préserve le caractère éditorial et le charme du profil.
- Statut : **validé**.

### AC1 — Titre de section cliquable

- Sur le profil, « Chapitres d’honneur → » est à la fois le titre de la section et l’accès à la galerie.
- Les trois badges choisis apparaissent directement sous ce titre.
- Aucun lien redondant après les badges et aucun onglet supplémentaire ne sont ajoutés à PR1.
- Les assets restent des éléments expressifs et ne deviennent pas des contrôles ambigus.
- Cette entrée préserve la lecture éditoriale continue du profil.
- Statut : **validé**.

### HM3 — Mur continu des dernières évolutions

- « Chapitres d’honneur » utilise un mur continu plutôt que quatre blocs ou bandes par axe.
- La vue personnelle montre la dernière évolution acquise de chaque axe, son prochain badge grisé et les distinctions honorifiques obtenues.
- Les anciens paliers de lignée ne sont plus affichés : un badge de lignée est un même insigne qui évolue et remplace sa forme précédente.
- Les distinctions honorifiques restent cumulables puisqu’elles ne représentent pas les étapes d’une même évolution.
- Sur desktop, le survol et le focus ouvrent une mini-fiche sous le badge ; sur mobile, un toucher l’ouvre et un toucher extérieur la ferme.
- La mini-fiche personnelle d’un prochain badge expose son objectif et sa ligne MP1.
- Un visiteur ne voit que les badges acquis ; leur mini-fiche décrit le sens ou les critères accomplis sans révéler aucune progression.
- Statut : **validé**.

### ET1 — Le titre évolue avec l’insigne

- Une nouvelle évolution de badge remplace également l’ancien titre de sa lignée.
- Si l’ancien titre était équipé, le nouveau titre prend automatiquement sa place sur le profil.
- Les titres équipables se limitent aux quatre dernières évolutions de lignée obtenues et aux titres honorifiques acquis.
- Un profil ne peut pas afficher un ancien titre dont l’insigne n’existe plus dans son mur.
- Cette règle révise explicitement la décision antérieure selon laquelle tout titre obtenu resterait équipable.
- Statut : **validé**.

### ED3 — Fenêtre de découverte confidentielle

- La reconnaissance des œuvres de niche constitue l’une des cinq distinctions honorifiques indépendantes, sans rattachement à l’axe Exploration et sans titre de « premier lecteur » exclusif.
- Une œuvre est déclarée « confidentielle » tant que son nombre de lecteurs enregistrés reste sous un seuil transparent ; la valeur exacte de ce seuil sera calibrée avant l’implémentation.
- L’éligibilité d’un lecteur est mémorisée lorsqu’il ajoute l’œuvre pendant cette fenêtre, puis la distinction est accordée uniquement lorsqu’il termine effectivement sa lecture.
- Plusieurs lecteurs peuvent être reconnus pour une même œuvre : aucun rang, podium ou avantage lié à la vitesse n’est introduit.
- Si l’œuvre devient ensuite plus connue, la distinction déjà obtenue reste acquise.
- ED3 récompense ainsi une découverte précoce réellement menée à terme, sans organiser de course au premier enregistrement ni inciter à accumuler des ajouts opportunistes.
- FC1 fixe la fenêtre à moins de vingt lectures terminées sur Chapter ; la difficulté finale est complétée par les conditions avancées de HN1.
- Cette décision révise explicitement son ancien classement comme distinction singulière de l’axe Exploration.
- Statut : **validé avec FC1 et HN1**.

### PC4 — Sobriété assumée du profil

- Aucun troisième élément personnalisable n’est ajouté à PR1 dans ce lot.
- La signature du lecteur repose sur la photo facultative, le titre équipé et les badges sélectionnés, auxquels s’ajoutent naturellement ses œuvres de chevet, listes et critiques.
- La devise de lecture PC1, l’ex-libris PC2 et l’accent éditorial PC3 sont écartés du périmètre actuel afin de ne pas surcharger le portrait ni concurrencer les distinctions.
- Cette décision n’interdit pas de réexaminer une personnalisation supplémentaire dans un lot ultérieur, après évaluation du profil réel en contexte.
- Statut : **validé**.

### TI1 — Appellations identitaires de la lignée Lecture

- La première proposition TL1 conservait le registre poétique et non genré recherché, mais décrivait surtout un rapport aux livres. Elle est remplacée avant validation : chaque titre doit désormais pouvoir compléter naturellement et fièrement la formule **« Je suis… »**.
- La lignée validée est : **« Adepte des pages » → « Complice des livres » → « Bibliophile au long cours » → « Bibliothèque vivante »**.
- Les appellations sont revendicables, distinctes et utilisent des termes épicènes ou des métaphores qui n’assignent pas le genre de la personne.
- TI1 est préférée à TI2, qui répétait « Bibliophile » à chaque palier, et à TI3, dont les figures devenaient grandiloquentes et évoquaient progressivement l’influence sur autrui.
- Le genre grammatical éventuel d’une métaphore, comme « Bibliothèque vivante », ne décrit pas le genre de l’utilisateur ; aucune variante masculine ou féminine du titre n’est nécessaire.
- Pour l’axe Lecture, le quatrième temps de L4 reste interprété comme **accomplissement et mémoire** plutôt que transmission, afin de ne pas introduire de critère appartenant à Expression, Exploration ou Relation.
- Les seuils et critères M3 de cette lignée sont fixés par JL1.
- Statut : **validé**.

### JL1 — Volume transparent pour la lignée Lecture

- La progression utilise un unique compteur d’œuvres marquées « Lu », avec les seuils **5 → 20 → 50 → 120**. Les lectures antérieures enregistrées comptent également.
- La ligne personnelle MP1 reste minimale, par exemple « 17/20 œuvres ».
- M3 autorise jusqu’à deux conditions secondaires mais n’oblige pas à en inventer. Pour cette lignée, un critère unique et transparent peut être plus fidèle au sens de l’axe qu’un jalon artificiellement composé.
- JL1 est préférée à JL2, qui encourageait le suivi dans Chapter plutôt que la lecture elle-même, et à JL3, qui introduisait une attente temporelle dépendante de dates facultatives.
- Les seuils sont centralisés techniquement afin de pouvoir être recalibrés après observation des usages, sans rendre leur fonctionnement opaque.
- Statut : **validé pour le lot actuel**.

### XE3 — Curiosité métaphorique pour la lignée Exploration

- La lignée principale Exploration décrit l’élargissement durable des horizons littéraires. Elle reste distincte d’ED3, honneur indépendant qui reconnaît ponctuellement la lecture d’une œuvre encore confidentielle.
- La lignée validée est : **« Adepte de l’inattendu » → « Esprit nomade » → « Boussole des marges » → « Horizon vivant »**.
- XE3 est préférée à XE1 et XE2 pour son caractère plus métaphorique, sensible et distinctif.
- Les objectifs M3 devront conserver un lien concret et immédiatement vérifiable avec la diversification des lectures afin que la poésie des titres ne masque pas la progression réelle.
- La lignée reste distincte d’ED3, qui ne contribue à aucun axe.
- Statut : **validé**.

### JX1 — Trois horizons mesurables pour la lignée Exploration

- La progression combine trois dimensions explicites : **auteurs distincts** comme objectif principal, puis **genres ou formes principales** et **langues originales** comme conditions secondaires.
- Les seuils validés pour le lot actuel sont **6/3/2 → 18/5/4 → 40/8/7 → 80/12/12**, respectivement associés à « Adepte de l’inattendu », « Esprit nomade », « Boussole des marges » et « Horizon vivant ».
- Une œuvre contribue à un seul genre ou forme principal et à une seule langue originale afin d’éviter l’inflation par multi-étiquetage. Les lectures antérieures enregistrées sont prises en compte.
- Les pays et nationalités ne servent pas de critère : ils décrivent imparfaitement les œuvres, les parcours diasporiques et les identités culturelles. La langue originale constitue un signal plus factuel sans prétendre résumer la diversité culturelle.
- JX1 est préférée à JX2, dont les territoires éditoriaux exigeraient une taxonomie coûteuse et moins transparente, et à JX3, fondée sur une distance algorithmique mouvante incompatible avec M3.
- La ligne MP1 reste concise, par exemple : « 13/18 auteurs · 4/5 genres · 3/4 langues ».
- ED3 n’entre dans aucun seuil de la lignée et reste une distinction honorifique extérieure aux axes.
- JX1 remplace explicitement le choix JX2 formulé par erreur puis retiré avant sa consignation comme décision validée.
- Statut : **validé pour le lot actuel**.

### EX1 — Faire entendre sa voix pour la lignée Expression

- La lignée validée est : **« Écho des pages » → « Interprète des œuvres » → « Voix singulière » → « Conscience des textes »**.
- Elle raconte le passage d’une première résonance personnelle à une présence critique durable, sans réduire l’Expression à l’écriture longue.
- Ses titres restent épicènes ou métaphoriques et passent le test identitaire « Je suis… ».
- EX1 est préférée à EX2, qui pourrait suggérer une évaluation opaque de la finesse du regard, et à EX3, trop centrée sur l’écriture longue pour représenter aussi les sélections publiques.
- Les objectifs M3 devront rester objectifs : Chapter ne prétend pas noter la qualité intellectuelle ou stylistique d’une contribution.
- Statut : **validé**.

### JE2 — Deux formes de voix pour la lignée Expression

- Les critiques publiques constituent l’objectif principal et les listes publiques éditorialisées la condition secondaire.
- Les seuils validés pour le lot actuel sont **3/1 → 10/2 → 25/4 → 60/8**, respectivement associés à « Écho des pages », « Interprète des œuvres », « Voix singulière » et « Conscience des textes ».
- Une liste est dite « éditorialisée » lorsqu’elle est publique, possède un titre, une courte présentation et au moins trois œuvres distinctes. Ces conditions sont fixes, visibles et objectives.
- La ligne MP1 reste concise, par exemple : « 7/10 critiques · 2/2 listes ».
- JE2 est préférée à JE1, qui ignorait les listes publiques, et à JE3, dont les réactions reçues auraient transformé l’Expression en mesure de popularité et empiété sur Relation.
- Les critiques ou listes supprimées ou rendues privées ne comptent plus dans la progression en cours ; un titre déjà acquis demeure néanmoins acquis conformément à la règle générale de progression non punitive.
- Statut : **validé pour le lot actuel**.

### RL1 — Faire cercle pour la lignée Relation

- La lignée validée est : **« Présence complice » → « Trait d’union » → « Point de rencontre » → « Cercle vivant »**.
- Elle raconte le passage d’une participation attentive à la création d’un espace commun autour des œuvres.
- Les titres restent épicènes ou métaphoriques et passent le test identitaire « Je suis… ».
- « Cercle vivant » demeure ajustable avant la production des assets si son usage comme titre équipé paraît moins naturel en contexte.
- RL1 est préférée à RL2, plus abstraite et grandiloquente, et à RL3, dont les formulations sont davantage genrées et proches de rôles institutionnels.
- La lignée ne reposera jamais sur le nombre d’abonnés, les impressions ou la popularité reçue.
- Statut : **validé**.

### JR3 — Conversations réciproques pour la lignée Relation

- La progression combine les **conversations réciproques**, les **interlocuteurs distincts** et les **œuvres distinctes** autour desquelles ces échanges ont lieu.
- Les seuils validés pour le lot actuel sont **3/2/2 → 12/5/6 → 30/12/15 → 70/25/30**, respectivement associés à « Présence complice », « Trait d’union », « Point de rencontre » et « Cercle vivant ».
- Une conversation ne compte qu’après au moins une contribution du lecteur et une contribution d’une autre personne.
- La ligne MP1 reste concise, par exemple : « 8/12 conversations · 4/5 lecteurs · 5/6 œuvres ».
- JR3 est préférée à JR1, qui récompensait des réponses même restées sans suite, et à JR2, qui réduisait la relation à un réseau d’abonnements réciproques.
- La définition technique exacte d’un échange sera alignée sur le futur arbitrage des réponses aux critiques. Aucune longueur minimale ni analyse opaque de qualité ne sera utilisée.
- Statut : **validé pour le lot actuel**.

### SGH1 — Cinq distinctions honorifiques indépendantes

- Le premier lot comporte exactement **cinq distinctions honorifiques**, entièrement extérieures aux quatre axes et à leurs lignées.
- Elles consacrent des accomplissements rares et avancés ; elles ne servent ni à équilibrer artificiellement Lecture, Exploration, Expression et Relation, ni à compléter une grille par catégorie.
- Elles n’adoptent aucun code d’axe et ne contribuent à aucun compteur de lignée.
- ED3 appartient à ce registre, sous réserve d’un calibrage cohérent avec son caractère honorifique. Les quatre autres distinctions, leurs titres et leurs critères restent à définir.
- De nouveaux honneurs pourront être ajoutés ultérieurement par petits lots cohérents après observation des usages.
- SGH1 remplace SG1 : le nombre de cinq est conservé, mais la notion de noyau « asymétrique » entre axes est abandonnée puisqu’aucun honneur n’est rattaché à un axe.
- Statut : **validé**.

### HV1 — Révélation des honneurs à l’obtention

- Seuls les honneurs déjà acquis apparaissent dans « Chapitres d’honneur » ; aucun badge verrouillé, emplacement vide, nom, critère ou compteur préalable n’est montré.
- L’obtention révèle simultanément l’insigne, son titre et l’explication claire de l’accomplissement reconnu.
- Un honneur ne devient donc jamais une quête suivie ou une checklist optimisable.
- La vue publique et la vue personnelle appliquent la même règle de collection pour les honneurs : seuls les acquis sont visibles. Les progressions des quatre lignées restent, elles, strictement privées selon PV1.
- HV1 est préférée à HV2, trop prescriptive, et à HV3, qui associait pression de collection et conditions opaques.
- Statut : **validé**.

### Orientation validée — honneurs hybrides entre parcours et exploits

- Les cinq honneurs mélangent la logique des parcours croisés HC1 et celle des exploits ponctuels HC2.
- HC3 est écartée comme philosophie dominante : l’ancienneté ou la régularité peuvent éventuellement servir de garde-fou ponctuel, mais ne structurent pas la collection.
- Un honneur doit conserver la force narrative d’un événement rare tout en attestant une pratique déjà avancée ; il ne peut dépendre d’un hasard pur, d’une métrique de popularité ou d’une action unique facilement optimisable.
- Statut : **orientation validée ; structure HH2 validée**.

### HH2 — Exploits consacrés

- Chacun des cinq honneurs associe un déclencheur rare à des conditions de parcours transversales déjà remplies.
- La formule commune est : **événement rare + parcours confirmé → honneur**.
- Un exploit isolé, accidentel ou dépendant uniquement de la popularité ne suffit jamais à obtenir une distinction honorifique.
- Les conditions restent invisibles avant l’obtention selon HV1, mais elles sont objectives et clairement révélées ensuite.
- HH2 est préférée à HH1, qui divisait la collection entre deux logiques, et à HH3, trop libre pour garantir une cohérence d’ensemble.
- Statut : **validé**.

### HN1 à HN5 — Première collection honorifique

- **HN1 — « Première lumière »** : consacrer plusieurs découvertes confidentielles réellement terminées et publiquement mises en lumière.
- **HN2 — « Atlas partagé »** : publier une liste éditorialisée exceptionnelle réunissant des œuvres lues, des auteurs, des formes et des langues variés, après un parcours déjà établi en Lecture, Exploration et Expression.
- **HN3 — « Voix qui relie »** : voir une critique devenir le point de départ de conversations réciproques avec plusieurs lecteurs, après un parcours établi en Expression et Relation.
- **HN4 — « Lien fidèle »** : construire avec une même personne des conversations réciproques autour de plusieurs œuvres, dans le cadre d’une activité relationnelle et expressive déjà avancée.
- **HN5 — « Chapitre vivant »** : atteindre une maîtrise transversale en franchissant au moins le troisième palier des quatre lignées.
- Les formulations passent le test « Je suis… » et restent métaphoriques ou épicènes. Les mécaniques proposées sont retenues ; leurs seuils exacts demeurent techniquement recalibrables avant l’implémentation.
- La collection cherche volontairement cinq formes différentes de rareté : révéler, composer, faire résonner, approfondir et accomplir.
- Statut : **validé**.

### VG2 — Silhouettes propres aux axes et aux honneurs

- Lecture, Exploration, Expression et Relation possèdent chacune une silhouette différente, sobre et stable sur les quatre paliers, ainsi qu’un symbole propre.
- Les évolutions ne se limitent ni à agrandir le badge ni à ajouter mécaniquement des pointes : chaque palier transforme de manière signifiante les ornements, le cadre, le relief ou la composition intérieure tout en préservant la silhouette et le symbole qui rendent l’axe reconnaissable.
- Les cinq honneurs ne forment pas une cinquième silhouette répétée : chacun reçoit sa propre forme et son propre symbole, cohérents avec l’accomplissement consacré.
- La matière, la palette et le traitement graphique communs devront maintenir l’unité du mur malgré ces neuf silhouettes de référence.
- VG2 remplace la recommandation VG1 ; VG3 reste écartée parce qu’une illustration entièrement indépendante pour chaque palier fragiliserait la cohérence et la lisibilité à petite taille.
- Statut : **validé**.

### SY1 — Symboles éditoriaux universels, redessinés en emblèmes

- Les noyaux symboliques sont : livre ouvert pour Lecture, boussole pour Exploration, plume pour Expression et maillons pour Relation.
- Ces symboles ne doivent jamais être repris comme de simples pictogrammes d’interface. Ils seront redessinés spécialement pour Chapter avec une construction symétrique, des pleins et déliés, des détails intérieurs et une présence héraldique.
- Le rendu final doit évoquer de véritables blasons ou médailles d’ordre, presque chevaleresques, tout en évitant le kitsch médiéval, l’heroic fantasy et la surcharge décorative.
- SY1 remplace la recommandation SY2 : la singularité viendra du traitement et de la composition plutôt que d’une métaphore plus difficile à identifier.
- Statut : **validé**.

### MH1 — Médailles émaillées d’ordre

- Le langage matériel associe métal patiné, aplats d’émail profonds, filets métalliques et relief maîtrisé.
- La couleur et la silhouette continuent de distinguer les axes, tandis que la construction doit évoquer un véritable objet d’ordre ou de chevalerie stylisé.
- La validation porte uniquement sur cette direction de matière. Les formes, proportions et ornements des schémas comparatifs précédents ne sont pas approuvés : leur rendu était trop rudimentaire pour servir de référence artistique.
- Toute décision graphique ultérieure devra être évaluée sur des concepts de fidélité suffisante pour montrer crédiblement métal, émail, profondeur et finesse du dessin.
- Statut : **direction de matière validée ; direction artistique détaillée ouverte**.

### MM1 — Ordre éditorial

- La référence artistique validée associe laiton chaud légèrement vieilli, émail brique opaque et profond, émail ivoire, filets métalliques fins, biseaux crédibles et bas-relief net.
- Le dessin est frontal, symétrique et très stylisé, avec des ornements végétaux ou éditoriaux intégrés à la composition plutôt qu’ajoutés en périphérie.
- L’objet doit paraître réellement fabriqué et photographié sous une lumière de présentation douce, sur un fond papier chaud, tout en restant lisible comme asset d’interface.
- Cette validation concerne le langage artistique et matériel du concept haute fidélité montré. Sa silhouette de bouclier et sa composition de livre ne fixent pas encore les formes définitives des quatre axes ni leurs évolutions.
- MM2 et MM3 ne sont pas poursuivies après validation de cette référence.
- Statut : **validé**.

### Mode de production externe des badges

- Aucun asset supplémentaire ne sera généré dans cette conversation de conception.
- Une fois les quatre silhouettes, les évolutions, les palettes d’axe et les cinq honneurs entièrement spécifiés, un prompt-cadre de production sera remis à l’utilisateur pour un autre agent.
- Ce prompt imposera la référence MM1 comme ancre visuelle et organisera la génération comme une famille cohérente, avec invariants partagés et déclinaisons explicites, plutôt que comme vingt-et-un prompts indépendants.
- Le rendu haute fidélité validé pourra être fourni à cet agent comme image de référence stylistique.
- Statut : **validé**.

### SL1 — Silhouettes héraldiques sémantiques

- Lecture utilise un écu-page, Exploration un octogone de boussole, Expression un losange allongé rappelant une plume et Relation un quatre-feuilles entrelacé.
- Les quatre formes conservent un poids visuel, une emprise, une épaisseur de bordure et un champ central équivalents afin qu’aucun axe ne paraisse plus prestigieux.
- Les contours sont sémantiques mais restent sobres ; ils ne doivent pas devenir des illustrations littérales ni multiplier les excroissances décoratives.
- SL1 est préférée à SL2, dont les formes introduisaient une hiérarchie historique arbitraire, et à SL3, trop dépendante des symboles centraux pour différencier les axes.
- Statut : **validé**.

### EG3 — Rite commun, récits propres

- Les quatre lignées partagent les fonctions de design **Signe essentiel → Symbole en action → Composition maîtrisée → Emblème accompli**, invisibles dans l’interface publique.
- Chaque axe traduit ces fonctions par ses propres transformations symboliques, liées au sens de ses quatre titres.
- Le quatrième palier résout le récit avec une composition complète et éventuellement un détail matériel rare ; il n’ajoute pas simplement davantage de métal ou d’ornements.
- EG3 est préférée à EG1, trop mécanique, et à EG2, qui risquait de disperser les seize badges en quatre collections sans rythme commun.
- Statut : **validé**.

### NL2 — Livre habité

- Le livre ouvert reste le noyau stable : forme essentielle, pages qui se répondent, tracés qui rejoignent le cadre, puis composition réunissant livre, ornements éditoriaux et architecture d’ex-libris.
- « Bibliothèque vivante » ne produit aucune animation littérale : pas de livre personnifié, de lévitation, de lumière surnaturelle, de racines envahissantes ni de registre science-fiction.
- Le caractère vivant vient uniquement du rythme des courbes, de la continuité des tracés et d’ornements botaniques classiques intégrés comme sur une reliure ou un ex-libris.
- NL2 est préférée à NL1, trop quantitative, et à NL3, trop institutionnelle.
- Statut : **validé**.

### NE2 — Boussole qui élargit le champ

- La rose des vents conserve une aiguille orientée vers un cap inattendu, puis celle-ci laisse un parcours libre, rejoint les marques périphériques et s’unit enfin à des routes, courbes de relief et lignes d’horizon.
- « Horizon vivant » reste cartographique et tangible : aucune constellation dominante, lumière surnaturelle, animation du paysage ou esthétique de science-fiction.
- NE2 est préférée à NE1, trop centrée sur la carte géographique, et à NE3, trop céleste.
- Statut : **validé**.

### NEX2 — Page éditorialisée

- La plume fait naître une première annotation, organise ensuite une ligne critique, un repère marginal et une marque de sélection, puis transforme ces traces en signature éditoriale avant de les unir dans une page héraldique équilibrée.
- L’évolution représente à la fois les critiques et les listes éditorialisées prises en compte par JE2, sans suggérer une note de qualité, un volume de réactions ou une popularité croissante.
- Aucun texte réel n’est inscrit dans l’emblème : les lignes, marges et repères restent des formes graphiques afin de préserver la lisibilité à petite taille.
- NEX2 est préférée à NEX1, trop centrée sur l’écriture continue, et à NEX3, trop abstraite et proche de l’influence sociale.
- Statut : **validé**.

### NR2 — Lien qui devient espace commun

- Deux maillons distincts établissent un premier contact réciproque, s’entrelacent ensuite en trait d’union, encadrent une œuvre commune puis se résolvent en un quatre-feuilles ouvert autour de ce centre littéraire partagé.
- L’évolution raconte l’approfondissement et la réciprocité des échanges sans compter les personnes, les abonnés, les réactions ou les connexions du lecteur.
- Le caractère « vivant » du dernier palier vient du rythme et de la circulation entre les arcs : aucun réseau de points, silhouette humaine, mouvement littéral ou croissance végétale n’est représenté.
- NR2 est préférée à NR1, trop quantitative, et à NR3, trop abstraite et principalement ornementale.
- Statut : **validé**.

### SH2 — Emblèmes d’ordre pour les cinq honneurs

- Chaque honneur reçoit une silhouette de médaille propre et un signe central stylisé : médaille rayonnante et lumière révélée pour « Première lumière », cartouche hexagonal et atlas parcouru pour « Atlas partagé », médaille concave et voix reliées pour « Voix qui relie », sceau vertical et nœud scellé pour « Lien fidèle », croix-rosette et chapitre quadripartite pour « Chapitre vivant ».
- Les cinq emblèmes utilisent les mêmes bordures métalliques, champs d’émail, niveaux de relief et ornements intégrés que les lignées, sans répéter leurs silhouettes ni assembler mécaniquement leurs symboles d’axe.
- SH2 est préférée à SH1, trop illustrative, et à SH3, trop chargée et contradictoire avec l’indépendance honorifique de SGH1.
- Statut : **validé**.

### Principe chromatique des axes et des honneurs

- Lecture, Exploration, Expression et Relation possèdent chacune une couleur d’émail distincte, stable sur les quatre étapes de leur lignée.
- Les cinq honneurs partagent une cinquième couleur propre au registre honorifique, indépendante des quatre couleurs d’axe ; leur individualité repose sur leurs silhouettes et symboles SH2.
- La couleur identifie une famille, jamais un niveau. Les évolutions continuent donc d’être exprimées par EG3, les ornements, le relief et la composition intérieure.
- Le laiton vieilli, l’ivoire des signes, le fond papier et le traitement MM1 restent communs à tous les badges. L’émail brique du concept MM1 était une référence de matière et de profondeur, non l’obligation d’une teinte unique.
- Statut : **validé et précisé par CA1**.

### CA1 — Nuancier éditorial pour les axes et les honneurs

- Lecture utilise une brique de reliure `#8A3F36`, Exploration un bleu pétrole `#2E5D5B`, Expression une prune d’encre `#5D405C`, Relation un vert mousse `#4F634E` et les Honneurs un bleu nuit `#28384F`.
- Ces valeurs servent d’ancres de production : leur teinte reste stable, tandis que leur rendu exact peut être légèrement adapté à la matière émaillée, à la lumière MM1 et aux contrôles de contraste.
- CA1 est préférée à CA2, trop proche des codes de rareté vidéoludiques, et à CA3, moins distincte à petite taille.
- Statut : **validé**.

### Prompt-cadre de production des badges

- La spécification des vingt-et-un badges est désormais complète et centralisée dans `docs/PROMPT_PRODUCTION_BADGES_CHAPTER.md`.
- Le prompt impose l’image MM1 comme ancre artistique, une preuve de famille, quatre planches de lignées, une planche des cinq honneurs, une harmonisation globale et seulement ensuite les exports individuels.
- Les états verrouillés seront produits par désaturation et opacité dans l’interface ; aucun second asset gris n’est généré.
- Les vingt-et-un assets ont ensuite été générés et validés artistiquement dans la conversation externe de production, puis transmis dans `chapter-badges-complete(1).zip` avec leur planche finale harmonisée.
- Le contrôle technique confirme 21 PNG sRGBA de 2048 × 2048 px avec transparence réelle, les noms attendus, quatre assets par lignée, cinq honneurs, des cadrages centrés et une archive sans erreur.
- Les originaux ne sont pas encore copiés dans le dépôt ni convertis : ils resteront la source de référence jusqu’au jalon d’implémentation, qui produira les dérivés web nécessaires sans altérer les fichiers maîtres.
- Statut : **livré, produit et contrôlé ; intégration reportée au jalon**.

### KF2 — Préambule relationnel pour les critiques suivies

- Un groupe « De personnes que vous suivez » présente jusqu’à trois critiques suivies avant « Toutes les critiques » ; la récence ne classe qu’à l’intérieur de ce groupe.
- Au-delà de trois critiques suivies, une action secondaire donne accès à l’ensemble sans masquer le flux général.
- Le groupe disparaît entièrement lorsqu’aucune personne suivie n’a publié sur l’œuvre, et l’ordre neutre actuel demeure inchangé.
- KF2 est préférée à KF1, qui donnait trop d’autorité à une seule voix, et à KF3, dont la logique de priorité était moins perceptible.
- Statut : **validé**.

### RP1 — Conversation à plat sous les critiques

- Toutes les réponses appartiennent à la critique et s’affichent chronologiquement sur un seul niveau.
- « Répondre » à un message peut préremplir une mention et conserver un contexte cité dans le compositeur, mais ne crée jamais de sous-branche.
- Une critique, une œuvre et un interlocuteur forment une unité stable pour JR3, quel que soit le nombre de messages échangés.
- RP1 est préférée à RP2, qui fragmentait la discussion, et à RP3, trop complexe et étroit sur mobile.
- Statut : **validé**.

### DC1 — Conversation ouverte avec maîtrise

- Tout lecteur authentifié peut répondre à une critique publique, avec ou sans abonnement préalable à son auteur.
- L’auteur de la critique peut fermer puis rouvrir les nouvelles réponses ; cette fermeture est réversible, conserve l’historique visible et ne retire aucune progression déjà acquise.
- Chaque participant reste seul maître de ses propres réponses et peut signaler un message ou bloquer un compte ; l’auteur de la critique ne peut ni modifier ni supprimer les contributions d’autrui.
- La modération et l’administration complètes restent reportées au lot de sécurité correspondant.
- DC1 est préférée à DC2, qui ne protégeait pas suffisamment l’espace ouvert par l’auteur, et à DC3, qui aurait limité les rencontres littéraires aux relations déjà établies.
- Statut : **validé**.

### VC1 — Aperçu repliable des conversations dans K3

- Sous une critique qui possède des réponses, K3 montre la réponse la plus récente, le nombre total de réponses et une action « Voir la conversation ».
- La conversation complète se déplie au même endroit et peut être réduite sans perdre la position dans la page.
- Une critique sans réponse conserve simplement l’action « Répondre » ; une conversation fermée garde son aperçu et son historique, avec l’état « Conversation fermée » et sans compositeur.
- VC1 est préférée à VC2, qui aurait laissé une conversation active repousser les critiques suivantes, et à VC3, qui aurait masqué la tonalité des échanges dans une surface séparée.
- Statut : **validé**.

### CPR1 — Compositeur contextuel en ligne

- « Répondre » révèle un champ compact directement sous la conversation ou sous la critique lorsqu’elle ne possède encore aucune réponse.
- Répondre à un message préremplit une mention et affiche un court rappel supprimable du contexte visé, sans créer de branche dans le flux RP1.
- Le compositeur se limite au texte, à « Annuler » et « Publier » ; aucune note, pièce jointe ou mise en forme riche n’est ajoutée dans ce lot.
- Après publication, la réponse rejoint le flux chronologique et le compositeur se referme.
- CPR1 est préférée à CPR2, trop présente dans K3 avant toute intention d’écrire, et à CPR3, qui aurait séparé une contribution courte de la conversation qu’elle prolonge.
- Statut : **validé**.

### EH1 — Sélection éditoriale directe sans historique exploitable

- Découvrir conserve immédiatement sa composition C2 et son bloc BP2, alimenté par la sélection indépendante prévue par D4.
- La source est nommée honnêtement, par exemple « Un choix de Chapter pour commencer », sans employer « pour vous » ni suggérer une personnalisation inexistante.
- Une indication secondaire précise que les lectures enregistrées affineront progressivement les propositions, sans devenir une alerte ni un appel à compléter le profil.
- Les phrases d’envie I2 restent visibles et facultatives pour transformer la proposition selon R1.
- EH1 est préférée à EH2, qui aurait créé un quasi-onboarding, et à EH3, qui aurait transformé l’intention ponctuelle en passage presque obligatoire.
- Statut : **validé**.

### EA1 — Médiation par le contenu sans abonnements

- Découvrir conserve une liste publique éditorialisée choisie pour son contenu sous une formulation telle que « Une sensibilité à découvrir ».
- La liste, son intention et ses œuvres restent au premier plan ; l’identité de l’auteur et l’action F1 permettent ensuite de former naturellement un cercle.
- Chapter n’affiche jamais « Vous ne suivez personne » et ne propose aucun annuaire de profils à suivre.
- Sur les pages d’œuvre, le groupe KF2 « De personnes que vous suivez » disparaît simplement ; aucun message vide ne le remplace.
- EA1 est préférée à EA2, qui aurait placé les personnes avant les œuvres avec des justifications faibles, et à EA3, qui aurait supprimé le principal chemin d’amorçage du cercle.
- Statut : **validé**.

### ZR1b — Échec exact avec pistes proches

- La requête reste visible et l’absence de correspondance exacte est annoncée sans substitution silencieuse.
- Jusqu’à trois œuvres ou auteurs suffisamment plausibles apparaissent dans une zone « Titres qui pourraient correspondre », distincte des résultats et des chemins éditoriaux.
- Chaque piste expose un indice court, comme « deux mots du titre correspondent », « orthographe proche » ou « même auteur » ; si aucune piste n’atteint un seuil minimal, la zone disparaît.
- Les chemins C2 reprennent ensuite sous « Continuer à explorer » dans leur état antérieur et ne sont jamais présentés comme des résultats de la requête.
- ZR1b remplace la première formulation de ZR1 en intégrant la récupération utile de ZR2 sans fusionner les approximations avec les résultats réels.
- Statut : **validé**.

### CSL1 — Composition adaptative lorsque le contenu social est limité

- Chaque contenu social disponible est affiché normalement, sans commentaire sur sa rareté ni duplication destinée à simuler de la densité.
- Dans Découvrir, un chemin S2 impossible à alimenter avec une liste suffisamment éditorialisée est remplacé par un chemin non social cohérent avec C2.
- Sur une page d’œuvre, une critique unique reste présentée normalement ; en l’absence de toute critique, K3 montre l’état compact « Aucune critique publiée » et l’action neutre « Écrire une critique ».
- Les critères de qualité restent stables et les modules sociaux réapparaissent automatiquement dès qu’un contenu admissible existe.
- CSL1 est préférée à CSL2, qui aurait transformé la faible activité en message récurrent, et à CSL3, qui aurait rendu les critères variables et moins fiables.
- Statut : **validé**.

### DR1D — Hiérarchie asymétrique de Découvrir sur desktop

- La recherche et l’introduction occupent toute la largeur ; BP2 domine ensuite environ deux tiers de la composition, tandis que les envies I2 et un premier chemin secondaire utilisent une colonne plus étroite.
- Les listes publiques S2 et autres chemins suivent dans un rythme éditorial plus large, sans grille uniforme.
- DR1D est préférée aux colonnes égales DR2, qui affaiblissaient la priorité de BP2, et à la colonne universelle DR3, qui sous-exploitait le grand écran.
- La validation porte sur desktop ; la déclinaison mobile reste en arbitrage séparé.
- Statut : **validé**.

### DR1M1 — Colonne éditoriale bornée pour Découvrir sur mobile

- L’ordre mobile reste recherche → envies I2 → œuvre principale BP2 → deux échos compacts → chemins secondaires.
- Après BP2, trois chemins secondaires au maximum sont affichés, liste publique comprise, puis la page atteint une fin naturelle sans chargement infini.
- Les chemins alternent les densités et les formes éditoriales afin d’éviter une succession monotone de cartes identiques.
- DR1M1 est préférée à DR1M2, qui masquait une partie de la découverte, et à DR1M3, qui introduisait des rails horizontaux proches des catalogues évités par C2.
- Le confort de cette longueur verticale sera explicitement réévalué lors du test de jalon.
- Statut : **validé comme composition de travail**.

### PRM1 — Portrait ancré, contenu déroulé

- Sur desktop, l’identité, le titre équipé, l’introduction, l’action « Suivre » et les trois badges choisis occupent une colonne dédiée d’environ un tiers, sans comportement collant ; les œuvres de chevet, listes publiques et critiques forment le contenu principal.
- Sur mobile, le profil se déroule selon l’ordre identité → titre → introduction → « Chapitres d’honneur → » → œuvres de chevet → listes → critiques, sans onglet ni carrousel obligatoire.
- PRM1 est préférée à PRM2, qui sous-exploitait la largeur desktop, et à PRM3, qui fragmentait le portrait derrière une navigation interne.
- Statut : **validé pour le principe responsive ; composition desktop révisée par PDR1**.

### PDR1 — Ouverture asymétrique puis flux large

- Sur desktop, les deux colonnes de PRM1 sont limitées à l’ouverture du profil : la carte de lecteur et les Chapitres d’honneur occupent la colonne gauche, tandis que les Œuvres de chevet occupent la colonne droite.
- Après cette ouverture, les Listes publiques puis les Traces publiques reprennent la largeur complète du profil. Elles ne restent plus enfermées dans la colonne droite, ce qui supprime le grand vide sous les honneurs sans inventer de statistiques ni de contenu identitaire secondaire.
- Le profil conserve un seul ordre éditorial continu et la colonne gauche demeure non collante. La composition mobile validée par PRM1 ne change pas.
- PDR1B est retenue : la section Œuvres de chevet conserve sa hauteur éditoriale naturelle et son ensemble complet — intitulé, titre et couvertures — est centré verticalement face à la hauteur cumulée de la carte et des honneurs. Les variations raisonnables du nom ou de l’introduction ne créent donc pas de remplissage interne artificiel.
- PDR1A, qui aurait étiré la section à hauteur égale, est abandonnée.
- L’implémentation regroupe la carte et les honneurs avec les œuvres de chevet dans une ouverture dédiée, puis rend les listes et traces sœurs dans un flux pleine largeur. Sous 900 px, la structure revient explicitement à une seule colonne dans l’ordre PRM1.
- Le checkpoint 19 publie PDR1B après réussite du lint, de la construction de production et des contrôles automatisés dédiés.
- Statut : **PDR1B validée, autorisée, implémentée et publiée ; recette utilisateur ouverte**.

### QR1 — Carte de lecteur recto-verso partageable

- Depuis son propre profil, un lecteur pourra retourner sa carte de lecteur afin d’afficher un verso partageable contenant un QR code vers son profil public.
- Le recto actuel reste inchangé. Le verso conserve les dimensions, la matérialité blanc cassé et l’identité éditoriale de la carte sans devenir une surface promotionnelle.
- Le QR code encodera uniquement l’URL publique canonique et stable du profil : aucun jeton de session, contournement de confidentialité ni paramètre de suivi ne sera intégré.
- Une adresse lisible et des alternatives de partage devront compléter le QR code pour les usages depuis un seul appareil.
- L’interaction peut être conçue dans le prototype, mais sa fiabilité finale dépendra des véritables comptes, URL publiques et règles de persistance encore hors du lot actuel.
- Restent à arbitrer séparément : la commande de retournement, la composition du verso, le mouvement et ses alternatives accessibles, puis les actions Copier/Partager.
- RTC1 est validée pour la commande : « Retourner la carte » se place hors du recto, immédiatement sous son bord droit. Au verso, la même commande devient « Voir le recto ».
- La surface entière de la carte ne devient jamais une cible de retournement et son en-tête n’accueille pas cette action ; les commandes de photo restent donc indépendantes.
- Le traitement graphique précis de cette micro-zone sous la carte reste ouvert.
- RTG1 est validée : un filet horizontal très fin relie visuellement le bord gauche de la micro-zone à une icône de retournement et au libellé alignés à droite. La zone n’a ni fond, ni contour, ni forme de bouton permanente.
- Au survol, seuls l’icône et le libellé prennent la teinte brique ; le focus clavier reste explicitement visible. Sur mobile, le filet se raccourcit sans changer la position de l’action.
- Cette micro-zone pourra être recalibrée facilement après observation du rendu réel sans remettre en cause RTC1.
- QRV1 est validée pour le verso : le QR code occupe le centre de la carte, sous une signature Chapter discrète, sans reléguer l’identité du lecteur ni devenir un simple écran technique.
- Le texte sous le QR code doit rester nettement aéré. Le nom, l’instruction de scan et l’adresse ne formeront pas un bloc compact ; leur répartition précise reste à arbitrer, notamment en isolant l’URL dans le pied de carte.
- Le QR code repose sur un aplat parfaitement uni avec sa marge de silence réglementaire ; le grain blanc cassé ne traverse jamais ses modules.
- QRT1 est validée : le nom et l’instruction courte « Scannez pour ouvrir mon profil » occupent deux niveaux distincts sous le QR code ; l’adresse publique est isolée plus bas dans le pied de carte.
- Les espacements restent structurels et ne se contractent pas pour absorber un nom long. N1b adapte l’appellation sur une ou deux lignes sans densifier l’instruction ni l’URL.
- QRM1b est validée pour le mouvement : la carte pivote horizontalement de 180° autour de son axe central en environ 440 ms, sans rebond, changement d’échelle ni déplacement de sa boîte dans la page. QRM1b ralentit légèrement les 360 ms présentées par QRM1 afin de mieux faire sentir l’objet sans alourdir l’interaction.
- Lorsque le système demande de réduire les animations, la rotation est remplacée par un échange direct des faces accompagné au plus d’un fondu très court. La commande, le focus et l’état visible ne dépendent jamais de l’animation.
- QRP1 est retenue comme base pour maintenir les trois utilitaires hors de la carte, mais sa première disposition est révisée par QRP1b : la commande de face garde exactement la même position sous le bord droit au recto comme au verso. « Copier le lien » et « Partager » occupent une seconde ligne extérieure propre au verso et ne peuvent jamais déplacer ce repère.
- Sur mobile, les deux actions de partage peuvent se replier ensemble sur leur propre ligne sans modifier le repère de retournement. QRP1b remplace donc le rail unique initial de QRP1.
- Le périmètre consolidé de QR1 est explicitement autorisé : véritable QR généré localement, route publique de Maël distincte des commandes propriétaires, copie, partage natif avec repli, retour automatique au recto à la sortie et contrôles responsive/accessibilité.
- Statut : **QR1, RTC1, RTG1, QRV1, QRT1, QRM1b et QRP1b validés ; implémentation autorisée et en cours de validation technique**.

### HMT1 — Fiche tactile insérée sous la rangée

- Sur mobile, toucher un badge insère une fiche compacte sur toute la largeur directement sous sa rangée ; le badge sélectionné reste visible et la grille se décale verticalement.
- Un second toucher sur le badge ou un toucher extérieur referme la fiche ; sélectionner un autre badge la déplace sous la nouvelle rangée.
- HMT1 est préférée au volet inférieur HMT2, qui aurait masqué le mur, et à la vue dédiée HMT3, trop profonde pour une information concise.
- Le déplacement de la grille sera vérifié lors du test de jalon.
- Statut : **validé**.

### Correctif de recette — stabilité des paires HMT1 et listes de profil

- Sur mobile, les badges sont structurés en rangées explicites de deux éléments. La fiche tactile appartient à la rangée entière et s’insère seulement après la paire « acquis → suivant » ; l’ouverture du badge acquis ne peut donc plus éjecter ou déplacer son prochain badge.
- Les deux listes visibles sur le profil de Lina sont de véritables destinations cliquables. « Veilles, fenêtres et lumières tardives » ouvre un contenu propre de quatre œuvres au lieu de rester une entrée statique de démonstration.
- Le retour d’une liste ouverte depuis le profil ramène au profil de Lina ; une liste ouverte depuis Découvrir conserve son retour vers Découvrir.
- Statut : **validé par retour de recette et implémenté**.

### FC1 — Moins de vingt lectures terminées

- Une œuvre est confidentielle tant que moins de vingt comptes l’ont marquée « Lu » ; les statuts « À lire » et « En cours » ne comptent pas.
- La règle publique est formulée « Confidentielle — moins de 20 lecteurs l’ont terminée sur Chapter ».
- Le seuil est centralisé et pourra être recalibré explicitement sans modifier les éligibilités mémorisées ni les honneurs déjà acquis.
- FC1 est préférée à FC2, qui confondait intention et lecture réelle, et à FC3, dont la règle relative aurait été mouvante et moins transparente.
- Statut : **validé**.

### PFP1 — Recadrage carré maîtrisé et fluide

- La photo facultative accepte JPEG, PNG et WebP jusqu’à 8 Mo, avec un petit côté d’au moins 512 px ; les erreurs conservent l’image précédente.
- Le lecteur déplace et zoome la source dans un cadre carré avec aperçu circulaire ; souris, toucher, stylet, pincement et contrôle visible sont pris en charge selon le support.
- Pendant le geste, la source haute définition est uniquement transformée à l’écran : aucun réencodage ou redécoupage destructif n’est effectué avant « Enregistrer ».
- Le recadrage doit rester continu et net, regrouper ses mises à jour avec le rythme d’affichage et maintenir le cadre entièrement couvert.
- « Annuler » préserve l’état antérieur et « Retirer la photo » restaure les initiales ; aucun filtre ni outil de retouche n’est ajouté.
- PFP1 est préférée au cadrage automatique PFP2 et à l’image entière PFP3 pour garantir une vignette cohérente sans sacrifier le contrôle du lecteur.
- Statut : **validé**.

### JI1 — Jalon intégré construit par tranches

- Découvrir, profils, Chapitres d’honneur et interactions sociales seront présentés dans un seul jalon utilisateur cohérent.
- Le développement reste divisé en six tranches internes : fondations et données simulées ; Découvrir ; profil et identité ; Chapitres d’honneur et assets ; relations et conversations ; consolidation responsive et régressions.
- Chaque tranche doit passer les vérifications statiques et le build avant l’intégration suivante ; la publication finale reçoit une checklist utilisateur exhaustive.
- JI1 est préférée à JI2 et JI3, qui auraient multiplié les validations d’états provisoires privés d’une partie de leurs relations.
- L’authentification réelle, la persistance distante, la messagerie privée, les notifications complètes, les listes collaboratives, les classements, le backend de recommandation et l’administration de modération restent hors périmètre.
- L’autorisation explicite a été reçue. Le jalon a été implémenté dans ses six tranches, avec données simulées, vingt-et-un badges intégrés en dérivés web, contrôle statique, tests et build de production.
- La recette utilisateur est définie dans `PHASE_10_IMPLEMENTATION_CHECKLIST.md` ; la persistance distante et les services backend restent hors périmètre.
- Le checkpoint de version 7 a été publié avec succès sur le site Chapter ; l’évaluation utilisateur peut commencer depuis la version en ligne.
- Statut : **validé, implémenté et publié ; évaluation utilisateur ouverte**.

### Révision de recette JI1 — identité, assets et recherche

- Les badges du profil et des Chapitres d’honneur sont chargés directement depuis leurs dérivés WebP publics afin d’éviter une dépendance défaillante à l’optimisation d’images du framework.
- La fermeture par clic extérieur distingue la feuille de compte mobile : ses actions, notamment « Voir mon profil », s’exécutent avant sa fermeture.
- PR1/PRM1 sont précisés par une carte de lecteur cartonnée regroupant photo, libellé « Votre portrait », nom, titre et introduction. Les badges restent dans une section séparée sous la carte.
- ZR1b réserve « Résultats exacts » au titre complet ou au nom complet de l’auteur après normalisation. Les fragments, mots-clés et formulations approchées alimentent au plus trois suggestions « Vous cherchez peut-être… » accompagnées d’une justification concise.
- Statut : **correctifs implémentés ; nouvelle recette requise**.

### Révision de recette JI1 — matérialité de la carte et distinction titre/badge

- La carte de lecteur abandonne le dégradé beige et le grain régulier au profit d’un blanc cassé mat, d’une texture papier très discrète et d’un filet graphique brique limité à un angle.
- « Équiper un titre » et « mettre un badge en avant » restent deux réglages indépendants : le premier affiche une appellation sous le nom, le second sélectionne jusqu’à trois insignes dans le profil.
- Les libellés visibles sont reformulés en « Afficher ce titre sous mon nom » et « Afficher ce badge sur mon profil ».
- Statut : **validé par retour de recette et implémenté**.

### Correctif PFP1 — recadrage réversible et carte stable

- Le recadrage conserve la source originale, ses dimensions, le déplacement et le zoom en plus du dérivé carré affiché ; rouvrir « Recadrer » ne travaille jamais sur une image déjà recadrée.
- Le zoom peut revenir à son minimum après un enregistrement, et l’annulation préserve le dernier cadrage validé.
- La confirmation « Retirer la photo » devient un dialogue superposé et ne participe plus à la grille de la carte.
- Le nom est centré et protégé des bords ; l’ornement d’angle devient un motif discret à doubles arcs et étoile.
- Statut : **validé par retour de recette et implémenté**.

### Révision validée — lisibilité du nom et marque compacte

- Le cadre noir précédant l’import d’une photo est abandonné : le recadrage n’apparaîtra qu’après la sélection d’un fichier, précédée par une commande d’import compacte.
- La coupure d’un mot dans le nom est interdite. N1 propose deux lignes équilibrées, N2 distingue prénom et nom de famille, N3 conserve une ligne unique ajustée.
- L’ornement à arcs et étoile est abandonné. O1 propose un livre ouvert ponctué, O2 un sceau « C. », O3 un marque-page de chapitre.
- O2 est validée et implémentée : le sceau compact « C. » remplace l’ornement précédent.
- **N1b — nom libre à composition adaptative** est validée et implémentée : aucune structure prénom/nom ni aucun nombre de mots n’est imposé ; le rendu utilise une ou deux lignes équilibrées, une taille adaptative bornée et aucune coupure interne de mot.
- La future création de profil définira uniquement une longueur maximale de présentation d’environ 36 caractères et montrera un aperçu de la carte, sans imposer la nature de l’appellation.
- Avant l’import d’une photo, une surface claire de sélection remplace le faux espace de recadrage noir ; les outils de cadrage apparaissent seulement après la sélection d’un fichier valide.
- Statut : **validé par arbitrage et implémenté**.

### Ajustement de recette — centrage de l’import et finition du sceau

- Dans l’état vide du panneau photo, « Choisir une image » est centré explicitement dans la surface de sélection ; son ancien alignement hérité à gauche est supprimé.
- Le sceau conserve son principe, son emplacement et son faible encombrement. Sa finition repose sur une double empreinte ; le « C » possède désormais une couche dédiée avec un centrage optique indépendant, tandis qu’un point brique légèrement agrandi est détaché plus bas sous les cercles avec un espace visible. La rotation précédemment ajoutée reste supprimée.
- « Ajouter une photo » ainsi que le groupe « Recadrer · Retirer » sont centrés sous le portrait sur desktop et mobile.
- Statut : **validé par retour de recette et implémenté**.

### Asset validé — poinçon de la carte de lecteur

- Le sceau reconstruit en CSS est abandonné au profit de l’asset généré et fourni par le porteur du projet.
- L’image conserve sa transparence, est recadrée sur son contenu puis optimisée sans perte en WebP afin de rester nette à petite taille.
- Le poinçon est légèrement plus grand sur desktop que sur mobile et demeure confiné au coin supérieur droit, sans chevaucher les informations de la carte.
- Statut : **asset fourni, validé et intégré**.

### Correctif de recette — enchaînement tactile des badges et relais de date mobile

- Le toucher d’un badge ne déclenche plus successivement son état de focus puis son action de clic. Le survol automatique est réservé aux pointeurs fins capables de survol ; au clavier, le focus visible ouvre la fiche ; sur écran tactile, chaque pression sélectionne directement le badge visé.
- Il devient ainsi possible de passer d’un badge acquis à son évolution suivante, y compris entre deux rangées, sans fermeture parasite ni fiche obsolète.
- Le relais SD2 de date conserve son comportement intégré sur desktop. Sur mobile, après le choix « En cours » ou « Lu », il prend explicitement la place du panneau inférieur au-dessus du voile, avec « Aujourd’hui », « Choisir » et « Plus tard ».
- Statut : **validé par retour de recette et implémenté**.

## Décisions validées

### Positionnement du premier lot

- Chapter commence comme un **journal de lecture personnel**.
- Le produit pourra évoluer ensuite vers un meilleur équilibre avec la découverte et les interactions sociales.
- Justification : les objets fondamentaux — livre, lecture, opinion et identité du lecteur — doivent être utiles et cohérents avant de construire les mécaniques sociales.

### Supports

- Les expériences **desktop et mobile sont conçues simultanément**.
- Elles conservent la même hiérarchie fonctionnelle, mais leurs interactions et leur composition sont adaptées au support ; le mobile n’est pas une simple réduction du desktop.

### Contexte utilisateur

- Le premier lot commence avec un **utilisateur déjà authentifié**.
- L’inscription et l’onboarding sont reportés.
- Justification : cela permet de concentrer le premier travail sur la valeur centrale du journal de lecture.

### Périmètre fonctionnel initial

Le premier lot doit former la boucle suivante :

> Retrouver ou chercher un livre → consulter sa page → l’ajouter à sa bibliothèque → suivre sa lecture → consigner une note ou publier une critique → retrouver cette trace dans son journal.

Les espaces ou capacités prévus sont :

- journal personnel ;
- recherche de livres ;
- page d’un livre ;
- bibliothèque personnelle ;
- enregistrement ou mise à jour d’une lecture ;
- note privée et critique publique, clairement séparées.

Leur forme exacte — page, panneau, dialogue ou autre interaction — n’est pas encore décidée.

### Modèle de statut de lecture

- Le premier lot utilise seulement trois statuts visibles : **À lire**, **En cours** et **Lu**.
- Les statuts « Interrompu », « Abandonné », les sessions multiples et la relecture ne sont pas exposés dans la première interface.
- La relecture pourra être étudiée plus tard en fonction des usages réels.
- Justification : le statut doit répondre immédiatement à « où en suis-je avec ce livre ? » sans obliger l’utilisateur à comprendre un modèle de suivi complexe.

### Confidentialité et publication

- Les notes de lecture personnelles sont privées.
- Une critique ne devient publique qu’après une action explicite **Publier**.
- L’évaluation d’un livre est facultative.
- Un changement de statut ne publie jamais automatiquement une activité.
- Les préférences plus fines de visibilité du profil seront traitées avec les futures fonctionnalités sociales.
- Justification : l’utilisateur doit pouvoir utiliser Chapter comme journal sans risque de divulgation involontaire.

### Fonctionnalités hors du premier lot

- fil social complet ;
- profils publics détaillés ;
- abonnements ;
- commentaires et réponses ;
- notifications ;
- recommandations personnalisées ;
- listes avancées ou collaboratives ;
- tags personnalisés avancés ;
- statistiques de lecture ;
- messagerie ;
- gamification ;
- paramètres complets ;
- administration et modération ;
- authentification et onboarding.

## Décision de clôture de la phase 1

### Œuvre et édition

- Chapter adopte une **gestion centrée sur l’œuvre** dans le premier lot.
- Les statuts, notes, critiques et futures interactions sociales sont rattachés à l’œuvre, et non à une édition particulière.
- La sélection et la gestion détaillées des éditions sont reportées.
- Clarification : l’**œuvre** désigne le livre comme création intellectuelle commune à toutes ses publications ; une **édition** désigne une version commerciale précise, caractérisée notamment par son éditeur, sa collection, sa date, sa langue ou traduction, son format, sa couverture, son ISBN et sa pagination.
- Exemple : *1984* de George Orwell est l’œuvre ; une traduction française publiée par Gallimard dans une collection et un format donnés est une édition.
- Une couverture et quelques métadonnées issues d’une édition représentative peuvent être affichées sans demander à l’utilisateur de sélectionner son exemplaire.
- Justification : ce modèle réduit la complexité du parcours d’ajout et permettra plus tard de regrouper naturellement les conversations et activités sociales autour d’un même livre.
- Statut : **validé**.

## Organisation documentaire

- Conserver **un unique journal transversal**, `CHAPTER_DECISIONS.md`, comme source de vérité pour les décisions validées, leurs justifications, les révisions et l’avancement général.
- Créer un fichier distinct uniquement lorsqu’une phase produit un livrable détaillé qui deviendrait encombrant dans le journal, par exemple `PHASE_02_CARTE_ECRANS.md` ou un futur document de fondations visuelles.
- Le journal doit alors résumer la décision et référencer le livrable concerné ; le fichier de phase contient l’analyse, les spécifications et les détails propres à ce livrable.
- Éviter de dupliquer le même niveau de détail dans les deux fichiers afin de ne pas créer deux sources contradictoires.
- Justification : un fichier par phase pour toutes les décisions fragmenterait l’historique et rendrait difficiles les choix transversaux, tandis qu’un seul fichier contenant aussi tous les livrables finirait par devenir trop long et difficile à parcourir.
- Statut : **validé**.

## Décisions validées pendant la phase 2

### Rédaction et lecture des critiques

- La rédaction d’une critique utilise une **fenêtre modale**, et non un écran de destination autonome.
- La modale offre une surface suffisamment confortable pour un paragraphe plutôt qu’une petite boîte de dialogue.
- Sur mobile, elle peut occuper presque tout l’écran afin de rester utilisable avec le clavier affiché, tout en conservant un comportement modal.
- Les critiques publiques longues sont tronquées dans leur contexte d’affichage et disposent d’une action **« Lire la suite »** pour révéler le texte complet, sans page de détail distincte dans le premier lot.
- Les critiques sont limitées à **3 000 caractères**, avec un compteur explicite et sans longueur minimale. Cette limite représente environ 450 à 500 mots en français et laisse de la place à une critique construite sans encourager des billets très longs.

### Notes privées

- Une note privée peut être ajoutée depuis la page de l’œuvre.
- Pour une lecture en cours, elle peut aussi être ajoutée directement depuis le journal personnel.
- Justification : l’écriture doit être disponible à la fois dans le contexte détaillé de l’œuvre et au moment où l’utilisateur reprend sa lecture quotidienne.

## Décisions validées pendant la phase 3

### Navigation principale

- Le libellé **« Journal »** est employé plutôt que « Accueil » afin d’affirmer la fonction personnelle de Chapter.
- Sur desktop, la recherche est directement visible sous forme de champ dans l’en-tête lorsque la largeur disponible le permet.
- Sur mobile, une barre inférieure persistante contient trois entrées : **Journal**, **Bibliothèque** et **Recherche**.
- Une barre supérieure mobile minimale complète cette navigation pour donner accès au compte.

### Comportements de navigation

- Pendant la saisie, la recherche propose une courte liste d’œuvres et d’auteurs ; sélectionner une suggestion ouvre directement sa destination, tandis qu’Entrée ouvre l’écran complet des résultats.
- Sur la page d’une œuvre, la navigation globale reste visible mais aucune destination principale n’est marquée comme active, car l’œuvre peut être atteinte depuis plusieurs origines.
- L’en-tête desktop et la barre inférieure mobile restent visibles pendant le défilement.
- La barre supérieure mobile défile avec le contenu afin de préserver l’espace de lecture.
- Le retour restaure le contexte de l’écran d’origine : requête, filtre, statut sélectionné et position de défilement selon le parcours.
- L’avatar ouvre un menu compact limité aux informations d’identité nécessaires et à la déconnexion ; aucun lien désactivé vers des écrans futurs n’est affiché.

## Décisions validées pendant la phase 4

### Fondations visuelles

- Chapter adopte une atmosphère légèrement chaude, avec un fond évoquant un papier contemporain sans dominante sépia, un texte presque noir, des gris chauds secondaires et un accent rouge brique ou carmin assourdi.
- La variante **A — Signet brique** devient la palette de référence : fond papier contemporain, texte presque noir et accent brique assourdi.
- Cette sélection est validée pour poursuivre la conception, mais reste révisable lorsqu'elle pourra être évaluée dans des écrans plus avancés, notamment selon le contraste réel, la densité, les couvertures et le responsive.
- Les couvertures constituent la principale source de couleur du contenu et leurs couleurs ne sont pas automatiquement propagées dans toute l’interface.
- Le système typographique associe une serif éditoriale pour le contenu littéraire à une sans-serif claire pour l’interface, avec deux familles au maximum.
- Le duo **T1 — Newsreader + Inter** devient la référence typographique : Newsreader pour les titres et contenus littéraires, Inter pour la navigation, les actions, les métadonnées et les formulaires.
- Comme la palette, ce choix sera contrôlé dans les écrans avancés avant d'être figé, notamment pour la lisibilité, la hiérarchie, les performances et le rendu mobile.
- Le rythme **R2 — Équilibré** devient la référence de densité de Chapter.
- Ce rythme peut être légèrement resserré dans les collections et légèrement ouvert autour des critiques ou textes longs, sans modifier la hiérarchie ni créer plusieurs langages d'interface.
- Justification : R2 préserve le caractère calme du journal tout en maintenant une consultation efficace, notamment sur mobile.
- Le traitement **C1 — Objet discret** devient la référence pour les couvertures disponibles : ratio original préservé, rayon presque imperceptible et ombre très légère.
- L'ombre est adaptative et peut disparaître lorsqu'une couverture possède déjà des contours suffisamment contrastés.
- Justification : ce traitement évoque discrètement le livre physique et détache les couvertures claires sans les enfermer dans des cartes ou des cadres uniformes.
- La stratégie **M1 — Couverture typographique** est retenue lorsqu'aucune couverture exploitable n'est disponible : titre et auteur sont composés dans le ratio d'un livre, sur une teinte déterministe issue d'une palette restreinte.
- Cette validation concerne le principe d'identification, pas sa composition interne définitive.
- Le centrage, les tailles, les retours à la ligne, la troncature éventuelle et la position de l'auteur seront testés dans les phases 5 et 6, puis consolidés avec le composant de couverture en phase 9.
- Le seuil **B2 — 900 px** devient la valeur de travail pour la bascule globale : navigation mobile jusqu'à 899 px et en-tête desktop à partir de 900 px.
- La valeur définitive sera stabilisée en phase 6 à partir de l'encombrement réel de l'en-tête, de l'agrandissement du texte et des langues supportées.
- L’interface reste majoritairement plate et utilise d’abord la proximité, les alignements, la typographie et les séparateurs ; ombres, rayons et surfaces sont réservés aux contextes qui les justifient.

### Croissance et intégrité du produit

- L’acquisition et la rétention sont des objectifs légitimes, mais elles doivent découler d’une valeur réelle : découvrir une œuvre, suivre sa lecture, exprimer une pensée ou échanger utilement.
- Le temps passé, la fréquence d’ouverture ou le volume d’interactions ne constituent pas seuls des preuves de réussite.
- Toute proposition de mécanisme de croissance doit préciser le résultat utilisateur recherché, le résultat produit attendu, le mécanisme supposé, les risques comportementaux et les métriques de contrôle.
- Chapter privilégie l’autonomie, la compétence et la relation entre lecteurs ; il exclut les dark patterns, la culpabilisation, les fausses urgences et les incitations sociales artificielles.
- Le cadre de référence détaillé et sa bibliographie sont maintenus dans [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md).

### Méthode de décision graphique

- Toute question graphique soumise pour arbitrage doit être accompagnée d'une visualisation comparative simple.
- Cette règle s’étend à toute décision de rendu ou d’interaction pour laquelle plusieurs états visibles peuvent être comparés : les options sont montrées dans le même ordre que leur présentation textuelle avant de demander une sélection.
- Pendant les échanges de conception, aucun accès au site n’est présenté à la fin des réponses ; le site est de nouveau partagé lors de l’implémentation et de ses jalons d’évaluation.
- Le support doit isoler autant que possible la variable discutée : couleur, typographie, densité, forme, iconographie ou mouvement.
- Ces visualisations servent uniquement à faciliter la décision. Elles ne constituent ni une maquette finale ni une approbation implicite de l'implémentation.
- La méthode de représentation est choisie selon le sujet, en privilégiant la solution la plus rapide et la plus lisible.
- Statut : **validé**.

## Décisions validées pendant la phase 5

### Macrostructure de la page d’une œuvre

- La structure **P2 — Ouverture puis récit** est retenue.
- L'ouverture associe la couverture, le titre, l'auteur, le statut et les actions personnelles avant de laisser les sections détaillées suivre un flux éditorial de lecture.
- Le choix doit préserver la mise en valeur de l'œuvre appréciée dans P3 : la couverture ne devient pas une simple vignette et l'ouverture doit posséder une présence éditoriale identifiable.
- Cette mise en scène ne doit cependant ni repousser les actions personnelles sous la ligne de flottaison, ni retarder l'accès au contenu.
- Statut : **validé**.

### Intensité de l'ouverture

- L'ouverture **E2 — Éditoriale affirmée** est retenue.
- Elle associe une couverture généreuse, une respiration verticale assumée, un court texte introductif et des actions personnelles visibles sans défilement dans les conditions desktop de référence.
- Elle traduit l'attrait de P3 dans la structure P2 sans recréer son retard fonctionnel.
- Statut : **validé**.

### Hiérarchie des sections

- H4 « Contenu continu avec repères ancrés » est retenue.
- Elle conserve l'ordre de H1 — **Mon journal → À propos → Critiques publiques** — et propose une navigation locale persistante vers chaque section.
- Elle permet une lecture exhaustive par défilement continu et un accès ciblé par ancres, sans masquer les autres contenus comme le feraient des onglets exclusifs.
- Le comportement desktop de ce repère relève de la phase 5 ; sa transposition tactile et sa forme mobile seront définies en phase 6.
- La décision pourra être réévaluée à partir d'un rendu plus avancé si son encombrement ou son comportement réel s'avère insatisfaisant.
- Statut : **validé**.

### Principe de lisibilité de « Mon journal »

- L'utilisateur doit obtenir une vision globale rapide de sa situation sur l'œuvre.
- Les informations conservent des emplacements stables afin de minimiser la mémorisation : lecture et évaluation, note privée, puis critique publique.
- La direction J2 « Entrée de journal » est appréciée, mais sa forme chronologique initiale est jugée potentiellement trop complexe.
- J2S « Journal synthétique » est retenue : elle conserve le langage éditorial de J2 sans faire de la chronologie le principe organisateur.
- Une chronologie détaillée appartient au développement de l'espace personnel en phase 9, et non à la page d'une œuvre en phase 5.
- J2S remplace explicitement la forme chronologique initiale de J2.
- Statut : **validé**.

### Composition de « À propos »

- A2 « Lecture et repères » est retenue.
- Le résumé constitue le contenu principal ; la première publication, le genre et la langue originale restent regroupés dans une zone secondaire stable.
- Les données propres à une édition, notamment l'ISBN, le format et la pagination, sont exclues.
- Justification : cette composition concilie lecture éditoriale, repérage rapide et modèle centré sur l'œuvre.
- Statut : **validé**.

### Composition des critiques publiques

- K3 « Critique mise en avant » est retenue comme structure cible.
- Une critique n'est visuellement prioritaire que lorsqu'elle provient d'une personne suivie par l'utilisateur ; la relation doit être explicitement indiquée.
- En l'absence de critique issue du cercle suivi, la section revient à une liste neutre sans hiérarchie artificielle.
- Comme les abonnements sont exclus du premier lot, cet état neutre est celui utilisé avant la phase 10.
- L'activation complète de K3, les règles de sélection, les commentaires et les réponses seront traités avec les interactions sociales en phase 10.
- « Critique » désigne l'opinion publiée sur l'œuvre ; « commentaire » désigne une future réponse ou discussion rattachée à cette critique.
- Statut : **structure cible validée ; activation sociale reportée**.

## Historique synthétique

### 22 août 2026

- Adoption du plan de développement de l’interface et de son fonctionnement par phases.
- Orientation initiale vers le journal de lecture personnel.
- Conception desktop et mobile en parallèle.
- Premier parcours conçu pour un utilisateur déjà connecté.
- Adoption d’un modèle de lecture limité à « À lire », « En cours » et « Lu ».
- Validation des règles de confidentialité séparant note privée et critique publiée explicitement.
- Création du présent journal de décisions et engagement à le mettre à jour après chaque interaction de conception.
- Clarification de la distinction entre une œuvre et ses différentes éditions ; aucune décision supplémentaire validée à ce stade.
- Validation d’une gestion centrée sur l’œuvre ; la gestion détaillée des éditions est reportée.
- Clôture de la phase 1 — définition du périmètre. La carte des écrans devient la prochaine phase.
- Proposition d’une documentation hybride : journal de décisions unique et fichiers distincts pour les livrables détaillés de chaque phase.
- Validation de l’organisation documentaire hybride.
- Ouverture de la phase 2 — carte des écrans — et création de son livrable de travail.
- Réduction de la carte proposée à quatre écrans de destination : la rédaction d’une critique devient une interaction modale.
- Validation de l’ajout d’une note privée depuis la page de l’œuvre et le journal.
- Validation de l’expansion « Lire la suite » pour les critiques publiques longues dans le premier lot.
- Validation d’une limite de 3 000 caractères par critique.
- Validation d’une modale de critique presque plein écran sur mobile lorsque l’espace disponible l’exige.
- Validation globale de la carte à quatre écrans de destination et clôture de la phase 2.
- Adoption d’une règle de cadrage explicite pour situer chaque nouveau sujet dans le plan.
- Les écrans d’interactions sociales sont affectés à la phase 10, après la consolidation du cœur personnel de Chapter.
- Ouverture de la phase 3 — navigation.
- Validation du libellé « Journal », du champ de recherche visible sur desktop et de la navigation mobile inférieure à trois entrées.
- Validation des suggestions de recherche, de l’absence d’entrée active sur la page d’une œuvre et de la persistance différenciée des éléments de navigation.
- Validation de la restauration du contexte au retour et du menu de compte minimal.
- Clôture de la phase 3 — navigation — et ouverture de la phase 4 — direction visuelle.
- Validation des fondations proposées pour l’atmosphère, la couleur, la typographie et le langage des surfaces.
- Adoption d’un cadre transversal conciliant objectifs de croissance, valeur utilisateur et conception non manipulatrice.
- Adoption d’une règle imposant un support visuel comparatif pour chaque futur arbitrage graphique.
- Ouverture de l’arbitrage sur la nuance précise de la palette chaude de Chapter ; aucune variante n’est encore validée.
- Sélection de la variante A « Signet brique » comme palette de référence révisable lors des rendus plus avancés.
- Ouverture de l’arbitrage sur les familles typographiques précises.
- Sélection du duo T1 « Newsreader + Inter » comme référence typographique révisable lors des rendus plus avancés.
- Ouverture de l’arbitrage sur la densité générale de l’interface.
- Sélection du rythme R2 « Équilibré » comme référence de densité, avec une modulation contextuelle limitée.
- Ouverture de l’arbitrage sur le traitement visuel des couvertures.
- Sélection du traitement C1 « Objet discret » pour les couvertures disponibles.
- Ouverture de l’arbitrage sur le remplacement visuel des couvertures absentes.
- Sélection de la stratégie M1 « Couverture typographique » pour les couvertures absentes ; sa composition interne reste explicitement à retravailler.
- Affectation des essais contextuels de M1 aux phases 5 et 6, puis de sa consolidation à la phase 9.
- Ouverture de l’arbitrage sur le seuil de bascule entre les navigations mobile et desktop.
- Sélection de B2 — 900 px comme seuil responsive de travail ; la stabilisation définitive est reportée en phase 6.
- Clôture de la phase 4 — direction visuelle.
- Ouverture de la phase 5 — page d’une œuvre — et création de son livrable de travail.
- Ouverture de l’arbitrage sur la macrostructure desktop de la page d’une œuvre.
- Sélection de P2 « Ouverture puis récit » comme macrostructure, avec obligation de conserver la mise en valeur de l'œuvre appréciée dans P3.
- Ouverture de l'arbitrage sur l'intensité éditoriale de l'ouverture P2.
- Sélection de E2 « Éditoriale affirmée » pour l'ouverture de la page d'une œuvre.
- Ouverture de l'arbitrage sur la hiérarchie des sections situées après l'ouverture.
- Préférence provisoire exprimée pour H1, avec une hésitation persistante en faveur de H3 en raison du coût de navigation dans une page longue.
- Introduction de H4 « Contenu continu avec repères ancrés » afin de concilier lecture continue et accès direct aux sections.
- Validation de H4 comme hiérarchie de référence, révisable à partir d'un rendu plus avancé.
- Ouverture de l'arbitrage sur la composition interne de la section « Mon journal ».
- Préférence exprimée pour J2, assortie d'une exigence de simplicité, de vision globale et d'emplacements prévisibles.
- Introduction de J2S « Journal synthétique » et report d'une chronologie détaillée à l'espace personnel de la phase 9.
- Validation de J2S comme composition de référence pour la section « Mon journal ».
- Ouverture de l'arbitrage sur la composition et la densité de la section « À propos ».
- Validation de A2 « Lecture et repères » pour la section « À propos ».
- Ouverture de l'arbitrage sur la présentation des critiques publiques, sans introduire les interactions sociales prévues en phase 10.
- Sélection de K3 « Critique mise en avant » comme structure cible des critiques publiques.
- Décision de réserver la mise en avant aux critiques de personnes suivies ; état neutre obligatoire tant que les abonnements ne sont pas disponibles.
- Clarification de la distinction entre une critique publiée et les futurs commentaires ou réponses associés.
- Confirmation de la règle progressive de K3 et ouverture de la composition desktop consolidée D1.
- D1 rassemble P2–E2, H4, J2S, A2 et l'état neutre de K3 afin d'auditer le rythme global avant la phase mobile.
- Validation de la composition globale D1 et clôture de la phase 5.
- Ouverture de la phase 6 consacrée à la déclinaison mobile de la page d'une œuvre.
- Ouverture de l'arbitrage sur l'adaptation mobile de l'ouverture E2.
- Validation de V2 « Ouverture partagée » pour le mobile : couverture, identité de l'œuvre et actions essentielles conservent simultanément une présence forte.
- Ouverture de l'arbitrage H4M1–H4M3 sur l'adaptation mobile de la navigation locale H4 ; H4M1 « Repères persistants » est recommandée.
- Validation de H4M1 « Repères persistants » : les trois sections restent visibles et la section courante est signalée pendant le défilement.
- Ouverture de l'arbitrage J2SM1–J2SM3 sur l'adaptation mobile de « Mon journal » ; J2SM2 « Synthèse verticale » est recommandée.
- Validation de J2SM2 « Synthèse verticale » : lecture, note privée et critique publique occupent trois rangées stables avec aperçu et action directe.
- Ouverture de l'arbitrage A2M1–A2M3 sur l'adaptation mobile de « À propos » ; A2M1 « Résumé puis repères » est recommandée.
- Validation de A2M1 « Résumé puis repères » : le texte conserve la priorité et les faits restent immédiatement visibles dans une grille compacte.
- Ouverture de l'arbitrage K3M1–K3M3 sur la lecture mobile des critiques publiques ; K3M1 « Fil éditorial » est recommandée, sans activer la hiérarchie sociale reportée en phase 10.
- Validation de K3M1 « Fil éditorial » : les critiques sont lues dans une colonne continue avec aperçu et expansion « Lire la suite » ; l'ordre demeure neutre dans le premier lot.
- Création de MC1, composition mobile consolidée réunissant V2, H4M1, J2SM2, A2M1 et K3M1 avant le traitement de la couverture absente et la stabilisation du breakpoint.
- Validation de MC1 comme composition mobile globale de référence, sans autoriser encore l'implémentation.
- Ouverture de l'arbitrage M1M1–M1M3 sur la composition mobile de la couverture absente ; M1M2 « Titre central, auteur en pied » est recommandée. Les règles typographiques extrêmes restent prévues en phase 9.
- Validation de M1M2 « Titre central, auteur en pied » pour la couverture absente ; le dimensionnement typographique extrême reste reporté en phase 9.
- Ouverture du dernier arbitrage de la phase 6 sur le breakpoint responsive ; B2 à 900 px reste recommandé après confrontation au contenu réel de navigation.
- Validation et stabilisation de B2 à 900 px, guidé par le contenu de navigation ; clôture de la phase 6.
- Ouverture de la phase 7 consacrée aux parcours d'ajout, de note privée et de critique.
- Ouverture de l'arbitrage AJ1–AJ3 sur l'ajout d'une œuvre au journal ; AJ2 « Sélecteur contextuel » est recommandé.
- Clarification de AJ2 : « Où en êtes-vous ? » est absent au repos et ne s'ouvre qu'après activation de « Ajouter au journal » ; une sélection s'applique immédiatement, tandis qu'une fermeture ne change rien.
- Validation de AJ2 « Sélecteur contextuel » pour l'ajout et la modification du statut d'une œuvre.
- Décision de fixer en phase 7 les libellés, priorités et états comportementaux des boutons, puis de reporter leur personnalisation détaillée et leur système de variantes à la phase 9 ; l'audit d'accessibilité reste en phase 11.
- Ouverture de l'arbitrage DT1–DT3 sur les dates de lecture facultatives ; DT2 « Proposition facultative » est recommandée après application immédiate du statut.
- Validation de DT2 « Proposition facultative » : le statut est appliqué immédiatement, puis une date adaptée peut être renseignée sans blocage ou reportée ; « À lire » ne déclenche aucune sollicitation.
- Ouverture de l'arbitrage NP1–NP3 sur la rédaction d'une note privée depuis la page de l'œuvre et le journal ; NP2 « Éditeur contextuel » est recommandée.
- Validation de NP2 « Éditeur contextuel » : la page de l'œuvre et le journal ouvrent le même éditeur, sous forme de modale compacte sur desktop et de panneau inférieur sur mobile, avec une confidentialité toujours explicite.
- Ouverture de l'arbitrage NS1–NS3 sur la sauvegarde et la fermeture de la note privée ; NS1 « Enregistrement explicite protégé » est recommandée.
- Validation de NS1 « Enregistrement explicite protégé » : la note est conservée par une action « Enregistrer » et seule une fermeture avec modifications déclenche une protection contre leur perte.
- Ouverture de l'arbitrage CR1–CR3 sur la composition de l'éditeur de critique ; CR2 « Opinion réunie » est recommandée afin d'associer une évaluation facultative au texte sans ajouter d'étape.
- Préférence conditionnelle pour CR2, avec rejet de la liste déroulante au profit de cinq étoiles cliquables et demande d'un positionnement plus pertinent par rapport au corps de la critique.
- Proposition de CR2R : texte en premier, évaluation facultative par étoiles ensuite, puis actions ; la structure et le comportement sont décidés en phase 7, le traitement visuel détaillé en phase 9 et l'audit d'accessibilité en phase 11.
- Validation du positionnement de CR2R « critique → évaluation → publication » et rejet de tout encadrement permanent autour de la section d'évaluation ou de chaque étoile.
- Ouverture de l'arbitrage EV1–EV3 sur la précision individuelle : EV1 « Étoiles entières libres » est recommandée pour le premier lot ; EV3 « Étoiles puis ajustement » est préférable à des demi-étoiles directement cliquables si les pas de 0,5 deviennent indispensables.
- Validation de EV1 « Étoiles entières libres » pour le premier lot ; les évaluations individuelles utilisent cinq niveaux entiers sans encadrement, tandis que les moyennes agrégées peuvent conserver une décimale.
- Finalisation fonctionnelle de CR2R avec l'ordre « critique → évaluation EV1 facultative → publication » ; les détails visuels des étoiles restent reportés en phase 9.
- Ouverture de l'arbitrage PB1–PB3 sur le résultat de la publication d'une critique ; PB3 « Publication avec annulation » est recommandée afin de protéger l'utilisateur sans confirmation systématique.
- Validation de PB3 « Publication avec annulation » : la critique devient visible immédiatement et peut être retirée pendant un court délai, ce qui rouvre l'éditeur avec son contenu.
- Achèvement de tous les arbitrages fonctionnels de la phase 7 ; la synthèse AJ2–DT2–NP2–NS1–CR2R–EV1–PB3 est proposée à confirmation avant clôture, sans autoriser encore l'implémentation.
- Confirmation de la synthèse AJ2–DT2–NP2–NS1–CR2R–EV1–PB3, clôture officielle de la phase 7 et autorisation explicite de l’implémentation.
- Ouverture de la phase 8 avec une première tranche verticale centrée sur la page d’une œuvre, en données simulées et sans backend.
- Implémentation responsive des compositions validées P2–E2, H4, J2S, A2 et K3 neutre, ainsi que de leurs adaptations mobiles V2, H4M1, J2SM2, A2M1 et K3M1.
- Implémentation des parcours personnels validés : AJ2 et DT2 pour la lecture, NP2 et NS1 pour la note privée, CR2R et EV1 pour la critique, puis PB3 pour la publication annulable.
- La durée exacte de l’annulation, le dessin définitif des étoiles, les variantes de boutons et la consolidation des tokens restent explicitement affectés à la phase 9 ; l’audit d’accessibilité complet reste en phase 11.
- Retour d’évaluation positif sur la direction graphique du premier jalon de la phase 8.
- Identification de deux défauts de navigation : les résultats de recherche secondaires ne changeaient pas l’œuvre affichée et l’entrée globale « Bibliothèque » réutilisait à tort l’ancre locale « À propos ».
- Correction du modèle de navigation : sélectionner un résultat de recherche ouvre désormais la page de l’œuvre correspondante ; les états personnels restent distincts entre les œuvres.
- Séparation explicite de la navigation globale et de la navigation locale : « Journal » et « Bibliothèque » ouvrent leurs espaces personnels, tandis que « Mon journal », « À propos » et « Critiques » restent les repères internes à la page d’une œuvre.
- Des vues fonctionnelles légères du Journal et de la Bibliothèque sont intégrées pour rendre cette navigation cohérente ; leur composition détaillée et leur consolidation demeurent prévues en phase 9.
- Les œuvres sans image utilisent la couverture typographique M1M2 déjà validée ; ses règles typographiques extrêmes restent à stabiliser en phase 9.
- Ouverture de la phase 9 — consolidation des composants et développement de l’espace personnel — sans autorisation d’implémentation à ce stade.
- Le premier arbitrage de la phase porte sur la complémentarité du Journal, orienté vers l’activité personnelle de lecture, et de la Bibliothèque, orientée vers l’organisation de la collection.
- Validation d’une priorité équilibrée dans le Journal entre les lectures en cours et les traces personnelles récentes ; la Bibliothèque conserve le rôle de collection exhaustive organisée.
- Exclusion explicite d’un Journal réduit à un tableau de statistiques, à une copie de la Bibliothèque ou à un fil social anticipant la phase 10.
- Validation de J2 « Journal composé » : lectures du moment et trace personnelle la plus récente partagent l’ouverture, puis une chronologie prolonge la page.
- Rejet de J1, trop rigide et difficile à équilibrer sur mobile, ainsi que de J3, qui ralentit le repérage des lectures en cours.
- La chronologie de J2 retient les écrits et les étapes marquantes : début ou fin de lecture, note privée ajoutée ou significativement modifiée, critique publique publiée ou significativement modifiée.
- Les corrections mineures, les ajustements techniques et l’ajout à « À lire » ne créent pas d’entrée chronologique ; la confidentialité privée ou publique de chaque écrit reste explicite.
- L’ouverture de J2 affiche jusqu’à trois lectures en cours, classées selon l’activité personnelle la plus récente, avec des actions rapides pour ouvrir l’œuvre ou ajouter une note.
- Au-delà de trois lectures, un accès mène à la Bibliothèque déjà filtrée sur « En cours » ; aucune notion distincte de lecture principale n’est introduite.
- Validation de O1 « Face-à-face » pour l’ouverture desktop de J2 : les lectures en cours et la dernière trace occupent deux zones de poids comparable, avant une chronologie en pleine largeur.
- O2 est rejetée pour sa proximité excessive avec une vue de collection ; O3 est rejetée parce qu’elle rend la trace dominante et relègue les lectures.
- Validation de OM3 « Rail horizontal » pour l’adaptation mobile de O1 : les lectures en cours précèdent la dernière trace dans une étagère tactile compacte.
- Le rail utilise un défilement natif sans lecture automatique, laisse entrevoir l’élément suivant, sépare l’ouverture de l’œuvre de l’action de note et conserve un accès vers la Bibliothèque filtrée.
- Validation de C1 « Marges datées » pour la chronologie : date en marge sur desktop et au-dessus de l’entrée sur mobile, sans ligne temporelle continue.
- C2 est rejetée pour son allure de fil d’activité ; C3 est rejetée car ses regroupements mensuels diluent les dates précises et alourdissent le rythme.
- Confirmation du maintien de la méthode documentaire : `CHAPTER_DECISIONS.md` reste la source de vérité transversale, tandis que le livrable détaillé de phase 9 est tenu dans `PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md` ; les deux sont mis à jour après chaque interaction de conception au niveau de détail qui leur revient.
- Validation de E2 « Entrée éditoriale » pour les traces C1 : date, œuvre, type et confidentialité, aperçu léger de l’écrit et action de modification ; les étapes sans texte restent plus compactes.
- Les écrits longs utilisent « Lire la suite » puis « Réduire » pour une expansion locale ; aucune page autonome d’entrée de journal n’est créée.
- La dernière trace de l’ouverture O1 n’est pas dupliquée en tête de chronologie ; les archives plus anciennes sont chargées par l’action explicite « Afficher les entrées précédentes », sans défilement infini.
- Plusieurs entrées peuvent rester développées simultanément et « Modifier » réutilise l’éditeur contextuel existant avec ses protections de saisie.
- Validation des trois états vides du Journal : absence de lecture avec traces existantes, absence de trace avec lectures existantes, et absence totale fusionnée en une invitation unique à rechercher une œuvre.
- Sur mobile, aucun rail vide n’est rendu ; l’action « Voir mes livres à lire » devient « Rechercher une œuvre » lorsque la liste « À lire » est vide.
- Clôture fonctionnelle de la conception détaillée du Journal en phase 9, sous réserve de la validation consolidée précédant l’implémentation.
- Ouverture de la conception détaillée de la Bibliothèque ; le premier arbitrage porte sur sa macrostructure.
- Validation de B2 « Collection filtrée » pour la Bibliothèque : grille unique avec « Toutes » par défaut, puis filtres « À lire », « En cours » et « Lu », accompagnés de leurs nombres d’œuvres.
- Le filtre et la position sont restaurés au retour d’une œuvre ; B1 est rejetée pour ses sections déséquilibrées et B3 parce qu’elle duplique la mise en avant des lectures en cours du Journal.
- Ouverture de l’arbitrage sur l’ordre, le tri et la recherche interne de la collection.
- Autorisation explicite d’un jalon d’implémentation de phase 9 afin d’évaluer en contexte le Journal validé et la Bibliothèque B2 avant la validation consolidée.
- Le jalon présente provisoirement une recherche interne, « Activité récente » par défaut, les tris « Titre » et « Auteur », la restauration du contexte et une grille unique ; ces outils restent à confirmer après évaluation.
- Évaluation positive du jalon de phase 9 et validation en contexte du Journal J2/O1/OM3/C1/E2 ainsi que de la Bibliothèque B2.
- Validation de la recherche interne, de l’ordre « Activité récente », des tris « Titre » et « Auteur », de la restauration du contexte et de la grille unique.
- Ouverture de l’arbitrage sur l’anatomie et les actions de chaque élément de collection, dont la modification éventuelle du statut depuis la Bibliothèque.
- Validation de I2b « Statut typographique » : contrôle texte–flèche sans capsule visible afin de préserver la sobriété éditoriale de la grille. La zone entière reste interactive, avec un retour discret au survol et au focus ainsi qu’une cible tactile confortable.
- Ouverture de l’arbitrage sur la densité informative de l’élément : trio essentiel titre–auteur–statut, ajout d’un repère de date contextuel, ou suivi plus riche.
- Validation de D1 « Essentielle » : chaque élément de la Bibliothèque se limite à la couverture, au titre, à l’auteur et au statut interactif I2b ; dates, progression et notation ne sont pas affichées dans la grille.
- Ouverture de l’arbitrage sur l’emplacement de l’action « Retirer de ma bibliothèque », sans réintroduire de menu d’actions sur la vignette.
- Validation de R1 « Dans le sélecteur » : « Retirer de ma bibliothèque » est placé sous les trois statuts, séparé visuellement et traité comme une action destructive, sans ajouter de menu sur la vignette.
- Ouverture de l’arbitrage sur les effets du retrait, la conservation des écrits et de l’historique, ainsi que les mécanismes de confirmation et d’annulation.
- Validation du retrait organisationnel : l’œuvre et son statut quittent la collection, tandis que notes privées, critiques publiées et traces historiques sont conservées ; aucun événement de retrait n’est ajouté au Journal.
- Sans écrit associé, le retrait est immédiat avec « Annuler » ; en présence d’un écrit, une confirmation explicite sa conservation avant le retrait, puis l’annulation reste proposée. L’effacement complet des données demeure une action distincte hors du sélecteur.
- Ouverture de l’arbitrage sur les états vides de la Bibliothèque : collection vide, filtre vide et recherche locale sans résultat.
- Validation des états vides contextualisés de la Bibliothèque : invitation à rechercher une première œuvre lorsque la collection est vide, réinitialisation du seul filtre pour un statut vide, et effacement de la seule requête pour une recherche sans résultat.
- Les outils inutiles sont masqués uniquement lorsque toute la Bibliothèque est vide ; ils restent disponibles dans les autres états. Les messages combinent filtre et requête lorsque nécessaire, sans illustration décorative.
- Clôture fonctionnelle de la conception détaillée de la Bibliothèque en phase 9 et ouverture de la consolidation des composants communs.
- Le premier arbitrage de consolidation porte sur les règles typographiques des titres longs dans la couverture de remplacement M1M2.
- Validation de L2 « Paliers équilibrés » pour les titres longs de M1M2 : trois paliers selon le nombre de lignes, limite de quatre lignes avec ellipse, titre intégral conservé hors de la couverture et dans son nom accessible.
- M1M2 et L2 s’appliquent exclusivement aux œuvres sans couverture réelle exploitable ou après un échec durable de chargement. Une couverture valide conserve toujours C1, tandis que son chargement utilise un état neutre temporaire pour éviter un clignotement du remplacement typographique.
- Ouverture de l’arbitrage sur la palette déterministe et restreinte des couvertures typographiques, sans codage du genre littéraire.
- Validation de CP2 « Nuancier éditorial » : six teintes sourdes de force visuelle comparable, inspirées des familles brique, ocre, sauge, bleu pétrole, prune et ardoise.
- La teinte de remplacement est dérivée de l’identifiant canonique de l’œuvre et reste stable sur tous les écrans ; elle ne code jamais le genre, le statut, l’auteur ou l’ordre d’affichage.
- Ouverture de la consolidation graphique des cinq étoiles entières EV1, déjà validées fonctionnellement sans encadrement permanent.
- Validation de ES1 « Accent plein » : étoiles sélectionnées remplies avec l’accent brique atténué, étoiles restantes en contour neutre, sans fond ni encadrement permanent.
- Ouverture de l’arbitrage sur les états interactifs de l’évaluation et sur le mécanisme explicite de retrait d’une valeur existante.
- Validation des états ES1 : repos en contours neutres, prévisualisation temporaire au survol ou au focus, sélection entière stable, modification directe et action textuelle « Retirer » uniquement lorsqu’une valeur existe.
- Un second clic sur l’étoile active ne supprime pas l’évaluation ; les zones interactives dépassent le dessin visible et seule une transition de couleur discrète est utilisée.
- Ouverture de la consolidation du retour temporaire annulable commun à PB3 et au retrait organisationnel.
- Rejet des extrêmes N1, jugé trop proche d’une pilule générique, et N2, jugé trop rigide ; validation de N2C « Capsule éditoriale », qui combine la structure lisible de N2 avec un rayon intermédiaire d’environ 12 px, une hauteur d’environ 46 px et une présence flottante légère.
- N2C organise le message, un séparateur discret et l’action « Annuler » sans dégradé ni icône décorative ; le composant reste compact sur desktop et devient presque pleine largeur au-dessus de la navigation mobile.
- La durée du retour annulable est validée à 5 secondes, avec suspension au survol et au focus ; elle doit rester centralisée et facilement ajustable dans l’implémentation.
- Validation de A2 « Hiérarchie éditoriale » : une seule action principale remplie par groupe, des actions secondaires transparentes sans encadrement permanent et des actions contextuelles traitées comme du texte.
- Les actions destructives restent isolées ; une surface destructive remplie est réservée à la confirmation finale d’une opération irréversible. Le retrait organisationnel annulable demeure textuel.
- Les boutons courants adoptent un rayon modéré d’environ 5 à 6 px, afin que le rayon de 12 px de N2C reste une exception expressive liée au retour flottant.
- Validation de G2 « Équilibré » pour le gabarit des boutons : 40 px de hauteur sur desktop, 44 px sur mobile et rayon commun de 6 px.
- Les valeurs de G2 définissent la hauteur perçue ; l’audit de phase 11 pourra augmenter la cible interactive invisible si nécessaire sans épaissir visuellement le composant.
- Validation de S2 « Retours fonctionnels » : variation tonale au survol, anneau externe au focus, tonalité renforcée à la pression et aucune animation de déplacement, réduction ou rebond.
- En chargement, le libellé et la largeur restent stables avec un indicateur adjacent et le blocage des activations répétées ; l’état indisponible demeure lisible et sans retour de survol.
- Les transitions des boutons sont courtes, limitées aux couleurs et respectent les préférences de réduction du mouvement. A2, G2 et S2 clôturent la consolidation du système commun d’actions.
- Validation de SD2 « Relais discret » pour AJ2–DT2 : le statut s’applique et le sélecteur se ferme avant qu’une invitation distincte et proche ne propose une date facultative.
- « À lire » ne sollicite aucune date ; « En cours » propose une date de début et « Lu » une date de fin avec « Aujourd’hui », « Choisir une date » et « Plus tard ». La fermeture conserve le statut sans date.
- Sur desktop, SD2 reste lié au contrôle d’origine ; sur mobile, il prolonge le panneau inférieur sans devenir bloquant. N2C n’est pas réutilisé pour cette saisie secondaire.
- Validation de EM2 « Surface adaptative » pour NP2 et CR2R : modale courte pour la note et surface plus ample pour la critique sur desktop.
- Sur mobile, la note utilise un panneau inférieur ajusté au contenu, tandis que la critique peut approcher le plein écran ; les deux éditeurs conservent une structure et des composants communs.
- Validation de NSV2 « Alerte intégrée » pour la protection NS1 : l’éditeur et le texte modifié restent visibles, tandis que les actions ordinaires sont remplacées par le choix de revenir à l’écrit ou d’ignorer les modifications.
- « Revenir à la note » ou « Revenir à la critique » est l’action principale sûre ; « Ignorer les modifications » demeure destructive et textuelle. Aucun dialogue supplémentaire ne s’empile sur la modale ou le panneau mobile.
- La conception détaillée de la phase 9 est complète et son implémentation consolidée a été autorisée afin de produire un jalon d’évaluation.
- Autorisation explicite reçue pour implémenter l’ensemble des choix validés de la phase 9 et publier un nouveau jalon d’évaluation.
- Implémentation consolidée du Journal J2/O1/OM3/C1/E2, de la Bibliothèque B2/I2b/D1/R1 et des composants L2/CP2/ES1/N2C/A2/G2/S2/SD2/EM2/NSV2.
- Le jalon inclut les retraits organisationnels protégés et annulables, les états vides contextualisés, les relais de date distincts, les éditeurs adaptatifs avec protection intégrée et les retours responsives associés.
- Premier retour sur le jalon de phase 9 : l’ensemble est jugé correct, à l’exception d’un bref retour visuel vers l’onglet précédent dans la navigation locale de la page d’une œuvre lors d’un défilement descendant entre deux sections.
- Le défaut provenait du choix instantané de la section active parmi plusieurs intersections concurrentes. La navigation utilise désormais une ligne de lecture verticale stable, ce qui supprime le retour transitoire vers l’onglet précédent.
- Le panneau de compte desktop ne se ferme pas encore lors d’un clic extérieur ou de la sélection d’un autre élément. Ce comportement est enregistré pour la phase 11, avec l’harmonisation transversale des fermetures, du focus et des surfaces superposées ; il ne déclenche aucune modification du jalon de phase 9.
- Aucun autre défaut n’a été relevé lors de l’évaluation. La phase 9 est clôturée et la méthode de travail impose désormais une checklist exhaustive avec chaque jalon final pour guider la validation utilisateur.
- Demande d’archivage du projet dans un dépôt GitHub créé par l’utilisateur. Le site possède déjà un historique Git et un dépôt distant réservé à son déploiement ; la stratégie proposée consiste à conserver ce dépôt technique comme `origin` et à ajouter GitHub comme dépôt distant secondaire, sans écrasement ni réinitialisation de l’historique.
- Le futur dépôt GitHub doit contenir le code de l’interface ainsi qu’une copie versionnée des documents de décision dans un dossier `docs/`, afin que la continuité du projet ne dépende pas exclusivement d’une conversation ou de la mémoire du produit.
- L’ajout et le premier envoi vers GitHub restent en attente de l’URL exacte du dépôt et d’un accès configuré ; aucune mutation distante n’a été effectuée à ce stade.
- Pour la continuité conversationnelle, la recommandation est de conserver une conversation par unité de travail cohérente et d’ouvrir une nouvelle conversation du même projet à une frontière majeure, notamment au début de la phase 9.
- Une nouvelle conversation partage les sources et instructions du projet, mais conserve son propre historique. Elle devra donc commencer par la lecture de `CHAPTER_DECISIONS.md`, du livrable de la phase active et de l’état du dépôt ; les fichiers versionnés restent la source durable et la mémoire conversationnelle un complément.
- Validation finale du jalon fonctionnel après vérification de la sélection des œuvres, du Journal et de la Bibliothèque ; clôture officielle de la phase 8.
- La phase 9 n’est pas encore ouverte. La prochaine action convenue est la réception de l’URL du dépôt GitHub, puis la synchronisation du code et des documents avant le changement de conversation.
- Réception et validation du dépôt GitHub `maeldepreville/chapter` comme dépôt partagé du projet.
- Synchronisation achevée sur la branche `main` : le code de l’interface, les ressources graphiques, le README et les documents de décision sont publiés dans le dépôt GitHub.
- L’unique commit initial du dépôt GitHub a été conservé, puis les quatre jalons significatifs du prototype ont été reproduits dans un historique linéaire lisible : fondation de la page d’œuvre, complétion des parcours, corrections de navigation et documentation des décisions.
- Le dépôt technique associé à l’hébergement reste configuré comme `origin` ; GitHub est conservé comme dépôt distant secondaire nommé `github`, afin de séparer le déploiement géré du dépôt partagé sans réécriture d’historique.
- La synchronisation GitHub ne constitue pas l’ouverture de la phase 9. Le prochain travail de conception devra commencer dans une nouvelle conversation du même projet après lecture de `docs/CHAPTER_DECISIONS.md` et `docs/PHASE_08_IMPLEMENTATION.md`.
