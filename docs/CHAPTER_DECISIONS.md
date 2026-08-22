# Chapter — Journal des décisions produit et UI/UX

Ce document constitue la source de référence des décisions prises au cours de la conception de l’interface de Chapter. Il distingue les choix validés des sujets encore ouverts afin d’éviter les glissements de périmètre et les contradictions.

Dernière mise à jour : 22 août 2026

## Cadre de collaboration

- Notre travail porte exclusivement sur l’interface de Chapter : architecture de l’information, parcours, UX, direction visuelle, responsive, accessibilité, composants et frontend.
- Le développement d’une interface ne commence qu’après une validation explicite de la solution proposée.
- Cycle de travail : discussion → analyse UX → proposition → ajustements → validation → implémentation.
- Les décisions sont consignées ici après chaque interaction de conception. Une décision révisée doit être remplacée explicitement, jamais contredite silencieusement.
- Lorsqu’un sujet est évoqué, il doit être situé explicitement dans le plan : phase actuelle, phase ultérieure identifiée, hors du premier lot ou nouveau sujet à intégrer.
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
- Phase 9 — consolidation des composants et espace personnel : **ouverte**.
- État actuel : cadrage du rôle complémentaire du Journal et de la Bibliothèque avant tout travail d’interface ; synchronisation du dépôt GitHub achevée.
- La première interface fonctionnelle de la page d’une œuvre est disponible sur desktop et mobile ; elle utilise des données simulées et ne constitue pas encore la consolidation des composants de la phase 9.
- Livrables : [`PHASE_02_CARTE_ECRANS.md`](./PHASE_02_CARTE_ECRANS.md), [`PHASE_03_NAVIGATION.md`](./PHASE_03_NAVIGATION.md), [`PHASE_04_DIRECTION_VISUELLE.md`](./PHASE_04_DIRECTION_VISUELLE.md), [`PHASE_05_PAGE_OEUVRE.md`](./PHASE_05_PAGE_OEUVRE.md), [`PHASE_06_MOBILE.md`](./PHASE_06_MOBILE.md), [`PHASE_07_PARCOURS_PERSONNELS.md`](./PHASE_07_PARCOURS_PERSONNELS.md), [`PHASE_08_IMPLEMENTATION.md`](./PHASE_08_IMPLEMENTATION.md), [`PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md`](./PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md) et [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md).

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
