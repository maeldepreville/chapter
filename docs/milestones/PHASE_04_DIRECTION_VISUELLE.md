# Chapter — Phase 4 : direction visuelle

Statut : **validé — phase terminée**
Dernière mise à jour : 22 août 2026

## Objectif de la phase

Définir une identité visuelle suffisamment précise pour guider la conception de la page d’une œuvre, sans construire prématurément un design system complet.

Cette phase couvre :

- l’atmosphère générale ;
- les rôles typographiques ;
- les rôles de couleur ;
- la densité et le rythme des pages ;
- le traitement des couvertures ;
- les surfaces, bordures, rayons et ombres ;
- les principes d’iconographie et de mouvement ;
- le seuil réel de bascule entre les structures de navigation desktop et mobile.

La composition détaillée de la page d’une œuvre appartient à la **phase 5**. Les fondations visuelles définies ici devront l’orienter sans la figer.

## Méthode de décision visuelle

Toute question graphique de cette phase et des suivantes sera accompagnée d'un support comparatif léger. Lorsque cela est possible, les variantes conserveront le même contenu et la même structure afin d'isoler le paramètre réellement discuté.

Ces supports sont des outils d'arbitrage, pas des maquettes finales. Une préférence exprimée sur une variable n'approuve pas automatiquement les autres choix visibles dans l'exemple.

## Thèse visuelle proposée

> **Une revue littéraire contemporaine devenue journal personnel.**

Chapter devrait évoquer l’attention portée aux mots, aux marges et aux couvertures, sans reproduire l’esthétique nostalgique d’une vieille bibliothèque. Le résultat recherché est éditorial, calme et cultivé, mais également vivant et accessible.

La personnalité doit venir de la typographie, du rythme, des couvertures et de quelques signes distinctifs. Elle ne doit pas dépendre de grandes cartes arrondies, de dégradés ou d’effets décoratifs.

Cette thèse visuelle et les fondations décrites ci-dessous sont validées.

## Atmosphère et couleur

### Direction recommandée

- fond principal légèrement chaud, proche d’un papier contemporain mais sans dominante sépia ;
- texte principal presque noir, moins dur qu’un noir pur ;
- gris chauds réservés aux métadonnées et séparateurs ;
- une couleur d’accent profonde inspirée d’un signet ou d’une annotation à l’encre, dans une famille rouge brique ou carmin assourdi ;
- couleurs des couvertures laissées visibles sans être réinjectées automatiquement dans toute l’interface.

L’accent doit signaler la sélection, le focus ou une action importante. Il ne doit pas colorer chaque titre, badge ou surface.

### Alternative significative

Une direction plus froide — blanc minéral, graphite et bleu encre — produirait une interface plus graphique et distante. Elle serait contemporaine, mais moins intime pour un produit d’abord centré sur le journal personnel.

### Palette de référence

La variante **A — Signet brique** est retenue pour la suite de la conception. Elle apporte le meilleur équilibre identifié entre chaleur, distinction et sobriété.

Valeurs de travail en thème clair :

- fond principal : `#F7F3EC` ;
- surface ponctuelle : `#FFFDF9` ;
- texte principal : `#24211F` ;
- texte secondaire : `#6F675F` ;
- séparateur : `#D9D1C7` ;
- accent brique : `#A3483F`.

Ces valeurs permettent de produire les prochains comparatifs, mais ne sont pas encore des tokens définitifs. Elles pourront être ré-arbitrées sur des écrans plus avancés si les contrastes, les couvertures, la densité ou le responsive font apparaître un problème.

Statut : **référence validée, révision contextuelle autorisée**.

## Typographie

### Système recommandé

- une **serif éditoriale** pour les titres d’œuvres, certains titres de page et la lecture des critiques ;
- une **sans-serif claire** pour la navigation, les actions, les métadonnées, les formulaires et les petits textes fonctionnels ;
- deux familles au maximum ;
- contrastes de taille mesurés plutôt que titres surdimensionnés ;
- largeur de lecture contrôlée pour les critiques et notes longues.

La serif ne doit pas être utilisée partout : elle perdrait son rôle éditorial et réduirait la clarté des contrôles.

Le choix des fontes précises viendra après validation de ces rôles et prendra en compte la lisibilité, les accents français, les performances et les droits d’usage.

### Typographie de référence

Le duo **T1 — Newsreader + Inter** est retenu :

- **Newsreader** pour les titres d’œuvres, certains titres de page, les critiques et les textes littéraires qui bénéficient d'une voix éditoriale ;
- **Inter** pour la navigation, les actions, les métadonnées, les formulaires et les textes fonctionnels.

Newsreader est conçue pour la lecture continue sur écran, tandis qu'Inter apporte une lisibilité robuste à l'interface. Le choix reste contrôlable dans les rendus avancés si les usages répétés, le mobile ou les performances révèlent un défaut.

Références : [Newsreader](https://fonts.google.com/specimen/Newsreader) et [Inter](https://fonts.google.com/specimen/Inter).

Statut : **référence validée, révision contextuelle autorisée**.

## Densité et rythme

- densité moyenne : suffisamment d’air pour lire, sans grands espaces vides décoratifs ;
- alignements et rythme vertical inspirés de la mise en page éditoriale ;
- séparateurs et variations typographiques privilégiés aux conteneurs ;
- regroupements obtenus par la proximité avant d’ajouter une surface ;
- contenu principal conservé dans une largeur confortable, avec des zones plus larges uniquement pour les couvertures ou collections.

### Densité de référence

Le rythme **R2 — Équilibré** est retenu. Il offre suffisamment de respiration pour les notes et les contenus littéraires, sans réduire excessivement le nombre d'éléments visibles.

La densité peut varier dans un intervalle limité selon le contexte :

- légèrement plus compacte dans la bibliothèque et les résultats de recherche ;
- légèrement plus respirante autour des critiques, notes longues et informations principales d'une œuvre ;
- inchangée dans sa hiérarchie, ses tailles de contrôle et ses exigences tactiles.

Cette modulation ne doit pas produire des expériences visuellement différentes entre les écrans.

Statut : **référence validée, modulation contextuelle autorisée**.

## Couvertures

- les couvertures sont les principaux éléments visuels colorés ;
- leur ratio original est respecté autant que possible ;
- aucun recadrage agressif pour homogénéiser artificiellement une grille ;
- une ombre très légère peut les détacher du fond, car elles représentent des objets physiques ;
- une couverture manquante utilise un remplacement typographique stable, fondé sur le titre et l’auteur, plutôt qu’une illustration générique.

### Traitement de référence

Le traitement **C1 — Objet discret** est retenu pour les couvertures disponibles :

- ratio original respecté ;
- aucun recadrage destiné à uniformiser artificiellement les œuvres ;
- rayon presque imperceptible ;
- ombre très légère, réduite ou supprimée lorsque les contours de l'image suffisent à la séparer du fond.

Ce traitement doit évoquer le livre comme objet sans transformer chaque couverture en carte d'interface.

Statut : **validé**.

### Couverture absente — stratégie de référence

La stratégie **M1 — Couverture typographique** est retenue. Le titre et l'auteur maintiennent l'identité de l'œuvre dans le ratio d'un livre, sur une teinte déterministe issue d'un ensemble restreint compatible avec Chapter.

La couleur ne doit pas coder arbitrairement le genre littéraire. Elle sert à différencier visuellement les œuvres et reste stable pour une œuvre donnée.

La composition interne n'est pas figée : centrage ou alignement supérieur, tailles typographiques, nombre de lignes, position de l'auteur et traitement des titres extrêmes devront être testés dans les écrans des phases 5 et 6. Les règles finales seront consolidées avec le composant de couverture en phase 9.

Statut : **stratégie validée, composition détaillée reportée**.

## Seuil de bascule responsive

La structure de navigation possède deux modes déjà validés : barre inférieure à trois entrées sur mobile et en-tête complet avec recherche visible sur desktop. Trois seuils provisoires sont comparés :

1. **B1 — 768 px** : convention répandue, mais l'en-tête complet risque d'être contraint sur tablette et avec des textes agrandis.
2. **B2 — 900 px** : conserve la navigation mobile tant que le logo, les destinations, la recherche et le compte ne disposent pas d'un espace confortable ; variante recommandée.
3. **B3 — 1024 px** : protège fortement l'en-tête desktop, mais maintient inutilement une navigation mobile sur de nombreuses tablettes en paysage et petites fenêtres de bureau.

Le seuil **B2 — 900 px** est retenu comme valeur de travail. La navigation mobile reste utilisée jusqu'à 899 px ; l'en-tête desktop devient la référence à partir de 900 px.

Cette valeur n'est pas un token définitif. La règle finale sera déterminée par le moment où le contenu réel de l'en-tête tient sans compression, avec agrandissement du texte et dans les langues supportées. Elle sera stabilisée pendant la phase 6.

Statut : **seuil de travail validé, stabilisation reportée en phase 6**.

## Surfaces et formes

- surfaces globalement plates ;
- bordures fines ou simples changements de fond pour distinguer une zone interactive ;
- rayons faibles à modérés, réservés aux contrôles et véritables surfaces superposées ;
- ombres réservées aux couvertures, menus et modales ;
- aucune carte imbriquée dans une autre carte ;
- boutons en forme de pilule uniquement lorsqu’un contrôle segmenté ou un état le justifie.

## Iconographie et mouvement

- icônes simples, cohérentes et toujours accompagnées d’un libellé lorsque le sens n’est pas évident ;
- animations courtes limitées aux transitions d’état, à l’ouverture des surfaces et au retour utilisateur ;
- aucun mouvement décoratif ou continu ;
- respect de la préférence de réduction des animations ;
- focus visible dès la première définition des composants.

## Sujets explicitement prévus plus tard

- la mise en page exacte de la page d’une œuvre : **phase 5** ;
- son adaptation complète sur mobile : **phase 6** ;
- les composants détaillés et leurs tokens consolidés : **phase 9** ;
- l’identité visuelle des fonctions sociales : **phase 10**, dérivée des fondations présentes ;
- l’audit final des contrastes, du clavier et des animations : **phase 11**.

## Équilibre entre identité, acquisition et rétention

La direction visuelle ne doit être ni une œuvre éditoriale autosuffisante ni une enveloppe optimisée uniquement pour la conversion. Elle doit soutenir simultanément :

- **l’acquisition**, par une identité mémorable, une promesse rapidement compréhensible et des pages partageables ou découvrables lorsqu’elles entreront dans le périmètre ;
- **l’activation**, par une hiérarchie qui rend immédiatement accessibles la recherche, l’ajout d’une œuvre et le premier statut de lecture ;
- **la rétention**, par le plaisir de retrouver un journal lisible, la continuité du contexte et la facilité à consigner une pensée ;
- **la confiance**, par des actions explicites, une confidentialité compréhensible et l’absence de pression artificielle.

Les métriques d’engagement ne doivent jamais conduire à augmenter le bruit visuel, la fréquence des sollicitations ou la compétition sociale sans bénéfice démontré pour le lecteur. Le cadre transversal est détaillé dans [`CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](../product/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md).

## Fondations validées

1. **Atmosphère :** palette « Signet brique » retenue comme référence révisable.
2. **Typographie :** duo Newsreader pour le contenu littéraire et Inter pour l’interface, retenu comme référence révisable.
3. **Langage de surface :** interface plate, structurée par la typographie, la proximité et les séparateurs plutôt que par une accumulation de cartes.

## Statut des décisions

Les fondations principales, la palette, le duo typographique, la densité, le traitement des couvertures, leur stratégie de remplacement et le seuil responsive de travail sont validés. La phase 4 est terminée ; la phase 5 consacrée à la page d’une œuvre peut commencer.
