# Chapter — Phase 5 : page d’une œuvre

Statut : **en cours — structure générale en discussion**
Dernière mise à jour : 22 août 2026

## Objectif de la phase

Concevoir la page d’une œuvre, nœud central du premier parcours de Chapter, en appliquant les fondations validées sans encore produire son implémentation finale.

La phase doit définir :

- la hiérarchie entre l’identité de l’œuvre et la situation personnelle du lecteur ;
- la structure générale de la page ;
- l’ordre et le poids des sections ;
- la place du résumé, des notes privées, de l’évaluation et de la critique publiée ;
- l’aperçu limité des critiques publiques ;
- les actions visibles et leurs états principaux ;
- une structure viable pour l’adaptation mobile détaillée en phase 6.

## Contraintes héritées

- La page représente l’**œuvre**, pas une édition détaillée.
- La couverture suit le traitement « Objet discret » ; une couverture absente utilise la stratégie typographique M1.
- Les statuts visibles sont uniquement « À lire », « En cours » et « Lu ».
- Une note personnelle est privée ; une critique ne devient publique qu’après une action explicite.
- La rédaction d’une critique s’ouvre dans une modale.
- La navigation globale reste visible, mais aucune destination principale n’est marquée comme active.
- La page doit employer la palette Signet brique, Newsreader + Inter et le rythme équilibré validés en phase 4.
- Les commentaires, abonnements et autres interactions sociales détaillées restent en phase 10.

## Premier arbitrage : macrostructure desktop

### P1 — Colonne persistante

La couverture et le statut personnel occupent une colonne latérale tandis que toutes les sections défilent dans la colonne principale.

- avantage : l’œuvre et la situation de lecture restent fortement associées ;
- risque : la colonne peut devenir vide ou artificiellement persistante lorsque les contenus de droite sont longs.

### P2 — Ouverture puis récit

Une ouverture asymétrique associe couverture, titre, auteur, statut et actions. Les sections suivantes reviennent ensuite dans un flux éditorial de lecture confortable.

- avantage : identité et action sont immédiatement accessibles, puis les contenus longs disposent d’une largeur maîtrisée ;
- avantage : la structure se transpose naturellement en pile sur mobile ;
- risque : la couverture n’accompagne plus visuellement les sections basses après défilement.

Cette option est recommandée.

### P3 — Couverture manifeste

La couverture, le titre et les actions sont centrés avant les sections détaillées.

- avantage : ouverture mémorable et contemplative ;
- risque : priorité excessive donnée à la mise en scène, allongement du parcours avant les informations et actions utiles.

## Limite de l’arbitrage actuel

Le choix porte uniquement sur la macrostructure. Les contenus exacts de l’ouverture, l’ordre détaillé des sections, le comportement des actions et la composition mobile ne sont pas encore validés.

## Décision sur la macrostructure

La structure **P2 — Ouverture puis récit** est retenue. Elle doit toutefois préserver la qualité appréciée dans P3 : une mise en valeur sensible et mémorable de l'œuvre.

Le compromis impose donc :

- une couverture suffisamment présente pour ne jamais devenir une vignette utilitaire ;
- un espace d'ouverture identifiable, porté par la couverture, le titre et la typographie ;
- le statut et les actions personnelles visibles sans devoir faire défiler la page ;
- aucun centrage spectaculaire qui repousserait les actions ou le début du contenu hors de portée.

Statut : **validé**.

## Deuxième arbitrage : intensité de l'ouverture

### E1 — Fonctionnelle

Ouverture asymétrique courte, petite couverture et actions très rapidement suivies des sections. Elle maximise l'efficacité, mais exploite peu la qualité éditoriale recherchée.

### E2 — Éditoriale affirmée

Couverture plus généreuse, espace vertical assumé, titre et court texte d'introduction à droite, avec statut et actions toujours visibles dans l'ouverture.

Cette option est recommandée : elle transpose l'attrait de P3 dans P2 sans recréer son retard fonctionnel.

### E3 — Manifeste tempéré

La couverture et l'identité sont recentrées comme dans P3, mais les actions restent dans le même ensemble d'ouverture. Cette variante demeure plus contemplative et risque de perdre l'avantage structurel de P2, particulièrement sur de faibles hauteurs d'écran.

## Décision sur l'intensité de l'ouverture

L'ouverture **E2 — Éditoriale affirmée** est retenue :

- couverture généreuse, traitée comme un élément principal plutôt que comme une vignette ;
- espace vertical assumé sans devenir une introduction plein écran ;
- titre, auteur et métadonnées essentielles immédiatement lisibles ;
- courte introduction à l'œuvre dans l'ouverture ;
- statut et actions personnelles visibles sans défilement dans les conditions desktop de référence.

Statut : **validé**.

## Troisième arbitrage : hiérarchie des sections

### H1 — Personnel d'abord

Ordre proposé : **Mon journal → À propos → Critiques publiques**.

Cette hiérarchie prolonge l'action personnelle amorcée dans l'ouverture et affirme le positionnement journal-first. Le court texte introductif d'E2 donne déjà assez de contexte avant le bloc personnel. Cette option est recommandée.

### H2 — Œuvre d'abord

Ordre proposé : **À propos → Mon journal → Critiques publiques**.

Cette hiérarchie est familière pour une fiche de livre, mais elle rapproche Chapter d'un catalogue conventionnel et éloigne les traces personnelles du lecteur.

### H3 — Onglets

Les trois sections occupent le même niveau derrière des onglets.

Cette structure raccourcit la page, mais masque du contenu, fragmente la lecture et rend moins évidente la distinction hiérarchique entre journal personnel et opinions publiques.

### H4 — Contenu continu avec repères ancrés

Ordre proposé : **Mon journal → À propos → Critiques publiques**, comme dans H1, avec une navigation locale persistante permettant d'atteindre directement chaque section.

Cette variante répond à la crainte d'une navigation verticale trop longue sans reprendre le principal défaut des onglets : les contenus restent dans un flux continu et peuvent être parcourus intégralement sans changements de contexte. Le repère actif évolue avec la section consultée ; un clic sur un autre libellé déplace directement vers celle-ci.

H4 conserve la priorité donnée au journal personnel tout en offrant la rapidité d'accès appréciée dans H3. La forme exacte de la navigation locale sur mobile sera définie en phase 6.

## Décision sur la hiérarchie des sections

La variante **H4 — Contenu continu avec repères ancrés** est retenue :

- les contenus restent accessibles dans un flux vertical continu ;
- une navigation locale persistante permet d'atteindre directement chacune des trois sections ;
- le repère actif suit la section consultée ;
- l'ordre reste **Mon journal → À propos → Critiques publiques** ;
- la solution pourra être réévaluée à partir d'une page plus avancée, sans rouvrir automatiquement l'arbitrage.

Statut : **validé**.

## Quatrième arbitrage : composition de la section « Mon journal »

### J1 — Tableau d'actions

Le changement de statut, l'évaluation et les actions d'écriture dominent la section. Cette composition est efficace pour administrer rapidement la lecture, mais elle risque de présenter le journal comme un panneau de réglages.

### J2 — Entrée de journal

La trace personnelle devient le contenu principal : événement de lecture, note privée puis actions secondaires. Cette composition exprime le mieux le positionnement journal-first tout en conservant un accès direct aux modifications. Elle est recommandée.

Cette direction est appréciée, mais sa traduction chronologique initiale n'est pas retenue telle quelle. L'utilisateur doit pouvoir comprendre l'ensemble de sa situation personnelle d'un regard et retrouver chaque information sans mémoriser une organisation particulière.

### J2S — Journal synthétique

J2S conserve l'identité éditoriale de J2 tout en remplaçant la succession d'événements par trois emplacements stables :

1. **Ma lecture et mon évaluation** ;
2. **Ma note**, toujours identifiée comme privée ;
3. **Ma critique**, avec son état de publication et une action explicite.

Le statut, la note et la critique occupent ainsi toujours la même position. Les dates et la chronologie ne sont affichées que lorsqu'elles apportent une information directement utile ; elles ne structurent pas cette section. L'identité de Chapter repose sur la typographie, le rythme, le vocabulaire personnel et quelques repères éditoriaux, non sur une architecture inhabituelle.

Cette variante est retenue. Une chronologie personnelle plus complète relève de la conception de l'espace personnel en phase 9.

### J3 — Modules égaux

Lecture, note privée et critique publique sont présentées comme trois modules de poids comparable. La structure est explicite, mais elle fragmente la lecture et affaiblit la distinction entre espace privé et expression publique.

## Décision sur la composition de « Mon journal »

La variante **J2S — Journal synthétique** est retenue :

- lecture et évaluation occupent le premier niveau ;
- la note privée possède un emplacement stable et une indication de confidentialité explicite ;
- la critique possède un emplacement distinct avec son état de publication ;
- les actions restent visibles sans transformer la section en panneau d'administration ;
- la chronologie détaillée ne structure pas cette page.

J2S remplace la forme chronologique initiale de J2. Statut : **validé**.

## Cinquième arbitrage : composition de la section « À propos »

### A1 — Récit continu

Le résumé complet domine, puis les quelques métadonnées liées à l'œuvre apparaissent en dessous. La lecture est éditoriale, mais les informations factuelles sont moins faciles à localiser.

### A2 — Lecture et repères

Le résumé conserve la place principale tandis qu'une colonne secondaire rassemble les repères stables : première publication, genre et langue originale. Cette option équilibre identité littéraire et consultation rapide ; elle est recommandée.

### A3 — Fiche compacte

Les métadonnées précèdent un résumé replié. Cette option est efficace mais rapproche Chapter d'une base de données et impose une interaction supplémentaire pour lire le texte complet.

Les informations propres à une édition, comme l'ISBN, le format ou la pagination, restent exclues de cette section conformément au cadrage centré sur l'œuvre.

## Décision sur la composition de « À propos »

La variante **A2 — Lecture et repères** est retenue :

- le résumé constitue le contenu principal ;
- une colonne secondaire rassemble la première publication, le genre et la langue originale ;
- la structure permet une lecture éditoriale et une localisation rapide des faits ;
- aucune donnée propre à une édition n'est introduite.

Statut : **validé**.

## Sixième arbitrage : composition des critiques publiques

### K1 — Fil de lecture

Les critiques sont empilées dans une seule colonne. L'identité du lecteur, l'évaluation et la date restent secondaires par rapport au texte. Les critiques longues s'étendent en place avec « Lire la suite ». Cette option est recommandée.

### K2 — Grille compacte

Deux critiques sont visibles côte à côte. Cette structure augmente la quantité d'opinions immédiatement perceptible, mais réduit le confort de lecture et produit des hauteurs irrégulières avec des textes de longueurs différentes.

### K3 — Critique mise en avant

Une critique principale domine, suivie d'opinions compactes. Cette composition crée un point d'entrée fort, mais suppose une logique de sélection ou de classement qui risquerait de donner une autorité excessive à une opinion.

Dans le premier lot, la section reste une sélection limitée et dépourvue de commentaires, réactions ou compteurs d'engagement. La logique avancée de classement et les interactions sociales appartiennent à la phase 10.

## Décision sur la composition des critiques publiques

La variante **K3 — Critique mise en avant** est retenue comme structure cible, avec les règles suivantes :

- la priorité est justifiée par une relation explicitement choisie : une critique mise en avant provient d'une personne suivie par l'utilisateur ;
- cette priorité est expliquée dans l'interface par un libellé relationnel clair, et non par un classement opaque ;
- les autres critiques restent visibles dans un niveau secondaire ;
- si aucune critique ne provient d'une personne suivie, aucune opinion n'est artificiellement mise en avant et la section revient à une liste neutre ;
- le premier lot, qui ne comprend pas encore les abonnements, utilise donc cet état neutre ;
- l'activation complète de K3 et ses règles de sélection seront traitées en phase 10.

Le terme **critique** désigne ici l'opinion publiée sur l'œuvre. Les commentaires et réponses éventuellement rattachés à cette critique constituent une interaction sociale distincte, également reportée à la phase 10.

Statut : **structure cible validée ; activation sociale reportée à la phase 10**.

## Statut des décisions

Les contraintes héritées, la macrostructure P2 enrichie de la mise en valeur de P3, l'ouverture E2, la hiérarchie H4, la composition J2S de « Mon journal », la composition A2 de « À propos » et la structure cible K3 des critiques publiques sont validées. En l'absence de relations de suivi dans le premier lot, K3 adopte un état neutre sans opinion privilégiée.

## Composition desktop consolidée D1

Une première composition consolidée réunit désormais :

- l'en-tête desktop validé avec recherche visible ;
- l'ouverture P2–E2 et son traitement éditorial de la couverture ;
- la navigation locale H4 ;
- la section « Mon journal » en J2S ;
- la section « À propos » en A2 ;
- l'état neutre de K3 avant l'introduction des abonnements.

D1 sert à contrôler le rythme vertical, la répétition des informations, la priorité des actions et la cohérence entre les sections. Elle ne constitue ni une maquette finale ni une autorisation d'implémentation.

La composition globale D1 est appréciée et retenue comme référence desktop pour la suite. Statut : **validé**.

## Clôture de la phase 5

La page desktop d'une œuvre est suffisamment définie pour servir de référence à sa déclinaison mobile. Les ajustements de détail resteront possibles sur les rendus avancés, mais ils ne rouvrent pas les arbitrages de structure sans motif identifié.

Statut : **phase 5 terminée et validée ; phase 6 ouverte**.
