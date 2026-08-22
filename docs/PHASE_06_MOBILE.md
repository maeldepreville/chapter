# Chapter — Phase 6 : déclinaison mobile de la page d’une œuvre

Ce document constitue le livrable de travail de la phase 6. Il adapte au mobile la page desktop validée en phase 5 sans redéfinir son architecture fonctionnelle.

## Objectifs

- préserver la hiérarchie et l'identité éditoriale de la page sur les écrans étroits ;
- maintenir les actions essentielles immédiatement accessibles ;
- adapter H4 à une navigation tactile compacte ;
- simplifier les compositions sans masquer les informations importantes ;
- tester les couvertures disponibles et absentes dans un contexte mobile réel ;
- stabiliser le seuil de bascule B2 actuellement fixé à 900 px comme valeur de travail.

## Décisions héritées

- navigation mobile inférieure à trois entrées et barre supérieure minimale pour le compte ;
- palette Signet brique, Newsreader + Inter et densité R2 ;
- couverture C1 « Objet discret » et remplacement M1 « Couverture typographique » ;
- macrostructure P2, ouverture E2 et navigation locale H4 ;
- sections J2S, A2 et K3, avec état neutre des critiques dans le premier lot ;
- statuts limités à « À lire », « En cours » et « Lu » ;
- notes privées et critiques publiques strictement séparées.

## Hors de cette phase

- modification du périmètre fonctionnel ;
- introduction des abonnements, commentaires ou autres interactions sociales ;
- conception finale des composants et de leurs tokens ;
- implémentation frontend.

## Premier arbitrage : adaptation mobile de l’ouverture E2

### V1 — Couverture d’abord

La couverture est centrée et généreuse, puis viennent le titre, l'auteur, l'introduction et les actions. Cette solution protège fortement l'identité littéraire, mais repousse les actions vers le bas sur les petits écrans.

### V2 — Ouverture partagée

La couverture et l'identité de l'œuvre occupent une première ligne compacte ; les actions apparaissent immédiatement dessous, suivies du court texte introductif. Cette option préserve la couverture sans retarder l'utilité et constitue la recommandation.

### V3 — Actions d’abord

Le titre et les actions précèdent la couverture. Cette structure minimise le délai d'action, mais traite la couverture comme une illustration secondaire et affaiblit la continuité avec E2.

### Décision

La variante **V2 — Ouverture partagée** est validée. Elle maintient dans le même regard la couverture, l'identité de l'œuvre et les actions essentielles. Ce choix conserve la présence éditoriale recherchée sans repousser l'utilité sur les petits écrans.

## Deuxième arbitrage : adaptation mobile de la navigation locale H4

### H4M1 — Repères persistants

Une rangée compacte affiche simultanément « Journal », « À propos » et « Critiques ». Elle reste disponible lors du défilement et indique la section courante. Cette option donne une vision globale de la page et constitue la recommandation.

### H4M2 — Sélecteur compact

Un sélecteur unique affiche la section courante et masque les deux autres options jusqu'à son ouverture. Il économise légèrement de la hauteur, mais oblige l'utilisateur à se rappeler les sections disponibles.

### H4M3 — Sommaire à la demande

Un bouton ouvre le sommaire des sections. La page paraît plus calme, mais toute navigation demande une action supplémentaire et les repères disparaissent au repos.

### Décision

La variante **H4M1 — Repères persistants** est validée. Les trois sections restent visibles et la section courante est signalée pendant le défilement. Cette solution privilégie la compréhension globale et la prévisibilité des emplacements, conformément aux principes déjà fixés pour Chapter.

## Troisième arbitrage : adaptation mobile de J2S « Mon journal »

### J2SM1 — Blocs développés

Les trois emplacements sont affichés intégralement les uns sous les autres. Le contenu est confortable à lire, mais la section s'allonge rapidement et repousse les sections suivantes.

### J2SM2 — Synthèse verticale

Lecture, note privée et critique publique prennent la forme de trois rangées stables. Chaque rangée montre son état ou un court aperçu et conserve une action directe. Cette option maintient la vision globale sans masquer la structure et constitue la recommandation.

### J2SM3 — Sections repliées

Les trois emplacements restent identifiables, mais leur contenu est masqué jusqu'à l'ouverture. Cette option est compacte, au prix d'actions supplémentaires et d'une visibilité réduite sur les informations enregistrées.

### Décision

La variante **J2SM2 — Synthèse verticale** est validée. Lecture, note privée et critique publique restent visibles sous forme de trois rangées stables, chacune associant un état ou un court aperçu à une action directe. Cette structure conserve une vue d'ensemble rapide sans transformer la section en panneau d'administration.

## Quatrième arbitrage : adaptation mobile de A2 « À propos »

### A2M1 — Résumé puis repères

Le résumé ouvre la section, suivi des trois repères factuels disposés dans une grille compacte. Cette option conserve la priorité éditoriale de A2 tout en laissant les faits visibles sans interaction et constitue la recommandation.

### A2M2 — Repères puis résumé

Les informations factuelles précèdent le texte. Elles se parcourent plus vite, mais retardent la présentation littéraire de l'œuvre et rapprochent la section d'une fiche de catalogue.

### A2M3 — Détails repliés

Le résumé domine et les repères sont regroupés derrière une ouverture. La section est plus courte au repos, mais les informations stables deviennent invisibles et demandent une action supplémentaire.

### Décision

La variante **A2M1 — Résumé puis repères** est validée. Le résumé conserve la priorité éditoriale et les trois repères factuels restent immédiatement visibles dans une grille compacte. La structure prolonge A2 sans transformer la section en fiche de catalogue ni ajouter d'interaction.

## Cinquième arbitrage : adaptation mobile de K3 « Critiques publiques »

Cet arbitrage porte uniquement sur la lecture mobile des critiques. Le premier lot conserve un ordre neutre ; la hiérarchisation fondée sur les personnes suivies reste reportée à la phase 10.

### K3M1 — Fil éditorial

Les critiques sont présentées dans une colonne continue. Chaque entrée conserve l'identité du lecteur, son évaluation, un aperçu confortable du texte et l'expansion « Lire la suite » lorsqu'elle est nécessaire. Cette option privilégie la lecture et constitue la recommandation.

### K3M2 — Aperçus compacts

Chaque critique est réduite à une rangée courte avec un extrait. Davantage d'auteurs apparaissent simultanément, mais la lecture devient une succession d'ouvertures et le texte perd sa place centrale.

### K3M3 — Critique à la une

Une seule critique est visible à la fois dans un carrousel. Cette composition donne du poids à chaque opinion, mais masque les suivantes et suggère une hiérarchie que le premier lot ne sait pas encore justifier.

### Décision

La variante **K3M1 — Fil éditorial** est validée. Les critiques sont parcourues dans une colonne continue, avec identité du lecteur, évaluation, aperçu confortable et expansion « Lire la suite » pour les textes longs. Le premier lot conserve un ordre neutre ; aucune mise en avant sociale anticipée n'est introduite.

## Composition mobile consolidée MC1

MC1 rassemble les décisions V2, H4M1, J2SM2, A2M1 et K3M1 dans une page mobile continue. Elle inclut également la barre supérieure minimale et la navigation inférieure à trois entrées déjà validées.

Cette consolidation sert à contrôler :

- la présence relative de la couverture et des actions dans l'ouverture ;
- la visibilité de la navigation locale entre l'ouverture et les sections ;
- le rythme vertical entre « Mon journal », « À propos » et « Critiques » ;
- la répétition des séparateurs et des actions ;
- la coexistence entre navigation locale et navigation globale.

MC1 ne constitue pas encore une autorisation d'implémentation. Après sa validation, la phase 6 devra encore traiter la couverture absente M1 sur mobile et stabiliser le breakpoint B2.

### Décision

La composition mobile consolidée **MC1** est validée comme référence globale. Son rythme et la coexistence des deux niveaux de navigation sont retenus. Cette validation ne vaut toujours pas autorisation d'implémentation.

## Sixième arbitrage : composition mobile de la couverture absente M1

La stratégie typographique M1 et son ratio de livre sont déjà validés. L'arbitrage actuel porte sur la hiérarchie interne. Les tailles exactes, seuils de réduction et cas extrêmes seront consolidés avec le composant de couverture en phase 9.

### M1M1 — Centrage intégral

Le titre et l'auteur forment un bloc unique centré. L'ensemble est calme et équilibré pour les titres courts, mais la hiérarchie devient moins nette lorsque le titre occupe plusieurs lignes.

### M1M2 — Titre central, auteur en pied

Un discret repère Chapter occupe le haut, le titre reste centré dans la zone principale et l'auteur possède une position stable en pied. Cette composition conserve une présence éditoriale, distingue clairement les niveaux et constitue la recommandation.

### M1M3 — Alignement supérieur

Le titre commence en haut à gauche et l'auteur reste en pied. La lecture des titres longs est efficace, mais la couverture ressemble davantage à une affiche ou une carte graphique et s'éloigne du calme recherché.

Dans les trois cas, aucune illustration générique, icône ou code couleur lié au genre n'est introduit. La teinte reste déterministe et stable pour l'œuvre.

### Décision

La variante **M1M2 — Titre central, auteur en pied** est validée. Un repère Chapter discret structure le haut de la couverture, le titre occupe la zone centrale et l'auteur conserve une position stable en pied. Les règles de taille et les cas typographiques extrêmes restent réservés à la consolidation du composant en phase 9.

## Septième arbitrage : stabilisation du breakpoint B2

La comparaison reprend les trois seuils étudiés en phase 4 avec le contenu réel de navigation désormais validé.

### B1 — 768 px

L'en-tête desktop apparaît tôt. À proximité du seuil, la recherche doit fortement se contracter et les destinations disposent de peu d'espace, surtout avec un texte agrandi ou des libellés plus longs.

### B2 — 900 px

La navigation mobile reste active jusqu'à 899 px. À partir de 900 px, le logo, les destinations, la recherche et le compte disposent d'un espace raisonnable sans créer une longue période de navigation mobile sur des fenêtres déjà larges. Cette option reste la recommandation.

### B3 — 1024 px

L'en-tête desktop est fortement protégé, mais le mode mobile persiste sur des tablettes paysage et de petites fenêtres de bureau où une recherche visible serait déjà confortable.

La valeur choisie deviendra la règle du premier lot. Elle restera soumise à un contrôle d'accessibilité avec agrandissement du texte et aux tests de langues en phase 11, sans être automatiquement rouverte.

### Décision

Le breakpoint **B2 — 900 px** est stabilisé pour le premier lot. La navigation mobile reste active jusqu'à 899 px ; l'en-tête desktop complet devient la référence à partir de 900 px. La règle est guidée par le contenu de navigation et reste auditée en phase 11 avec agrandissement du texte et langues plus longues.

## Statut

La phase 6 est **terminée et validée**. V2, H4M1, J2SM2, A2M1, K3M1, MC1, M1M2 et B2 à 900 px constituent la référence mobile du premier lot. Les contrôles d'accessibilité de phase 11 et les règles typographiques extrêmes de phase 9 restent explicitement prévus.
