# Chapter — Phase 9 : composants et espace personnel

Statut : **ouverte — cadrage en cours**  
Dernière mise à jour : 22 août 2026

## Objectif

Transformer les vues légères du Journal et de la Bibliothèque introduites en phase 8 en un espace personnel cohérent, puis consolider les composants révélés par ces écrans et par la page d’une œuvre.

La phase reste soumise au cycle de travail validé : discussion → analyse UX → proposition → ajustements → validation explicite → implémentation. Son ouverture n’autorise donc encore aucune modification de l’interface.

## Périmètre de travail proposé

1. préciser les rôles complémentaires du Journal et de la Bibliothèque ;
2. concevoir le Journal sur desktop et mobile ;
3. concevoir la Bibliothèque sur desktop et mobile ;
4. consolider les composants communs à partir des usages réellement définis ;
5. implémenter la tranche approuvée et vérifier sa cohérence avec la page d’une œuvre.

## Composants déjà identifiés pour consolidation

- boutons et actions textuelles ;
- sélecteur de statut et proposition de date ;
- couvertures disponibles et couvertures typographiques de remplacement ;
- étoiles d’évaluation ;
- modales, panneaux mobiles et protections contre la perte de saisie ;
- retour temporaire de publication annulable ;
- lignes de journal, éléments de collection et états associés.

Cette liste constitue un inventaire de départ, pas encore une spécification validée. Les composants seront consolidés après la composition des écrans personnels afin d’éviter de définir un système abstrait déconnecté des usages.

## Première orientation validée

Le Journal doit **équilibrer les lectures en cours et les traces récentes**. Aucun de ces deux ensembles ne doit devenir un simple complément secondaire de l’autre.

Cette orientation confirme la distinction suivante :

- le Journal propose une vue personnelle, sélective et temporelle de la lecture ;
- la Bibliothèque reste la vue exhaustive et organisée de la collection ;
- le Journal ne devient ni un tableau de statistiques, ni une copie de la Bibliothèque, ni un futur fil social.

### Macrostructure du Journal

La variante **J2 — Journal composé** est retenue. Son ouverture associe les lectures du moment à la trace personnelle la plus récente, puis la page se prolonge par une chronologie.

J2 est préférée :

- à J1 « Deux territoires », dont la séparation en colonnes devient rigide et perd son équilibre sur mobile ;
- à J3 « Flux unique », dont la temporalité forte rend les lectures en cours plus difficiles à retrouver.

Cette macrostructure doit conserver un rythme éditorial plutôt qu’adopter les codes d’un tableau de bord.

### Contenu de la chronologie

La chronologie conserve les **écrits et les étapes marquantes** du parcours personnel :

- début ou fin d’une lecture ;
- ajout ou modification significative d’une note privée ;
- publication ou modification significative d’une critique publique.

Les corrections de date ou d’évaluation, les autres ajustements techniques et le simple ajout d’une œuvre à « À lire » ne créent pas de trace. La chronologie raconte ainsi un parcours de lecteur plutôt qu’un historique exhaustif des manipulations de l’interface.

Une note doit rester explicitement identifiée comme privée dans la chronologie, tandis qu’une critique demeure identifiée comme publique.

### Lectures en cours dans l’ouverture

L’ouverture de J2 affiche au maximum **trois lectures en cours**, classées selon l’activité personnelle la plus récente. Chaque lecture donne accès à deux actions : ouvrir la page de l’œuvre et ajouter ou modifier rapidement sa note privée.

Lorsque plus de trois œuvres sont en cours, une action mène à la Bibliothèque avec le filtre « En cours » déjà appliqué. Cette règle évite d’allonger l’ouverture tout en donnant accès à l’ensemble des lectures parallèles, sans introduire artificiellement une notion de lecture principale.

### Composition desktop de l’ouverture

La variante **O1 — Face-à-face** est retenue. Sur desktop, les lectures en cours occupent une zone compacte face à la dernière trace, présentée avec davantage de développement textuel. Les deux zones conservent un poids comparable.

Cette séparation reste strictement limitée à l’ouverture : la suite du Journal reprend ensuite toute la largeur dans un flux chronologique unique. O1 préserve ainsi l’équilibre fonctionnel de J2 sans recréer la structure générale en deux territoires rejetée avec J1.

O2 « Bandeau de lectures » est écartée car elle rapproche excessivement l’ouverture d’une vue de collection et repousse la trace. O3 « Trace dominante » est écartée car elle relègue les lectures en cours au second plan.

### Adaptation mobile de l’ouverture

La variante **OM3 — Rail horizontal** est retenue. Les lectures en cours forment un rail tactile placé avant la dernière trace et la suite chronologique.

Le rail doit être traité comme une étagère personnelle compacte, et non comme un carrousel promotionnel :

- défilement horizontal natif avec arrêt aligné sur les éléments ;
- aucune lecture automatique ;
- une partie de l’élément suivant reste visible pour signaler la continuité ;
- les indicateurs éventuels ne constituent jamais le seul moyen de comprendre qu’il existe d’autres lectures ;
- chaque élément sépare clairement l’accès à l’œuvre et l’action rapide d’ajout ou de modification d’une note ;
- l’accès aux lectures supplémentaires dans la Bibliothèque filtrée reste disponible.

OM1 est écartée malgré sa lisibilité verticale, car elle allonge davantage l’ouverture. OM2 est écartée car elle fragmente artificiellement les lectures en donnant une place distincte à la plus récente.

### Représentation de la chronologie

La variante **C1 — Marges datées** est retenue. Sur desktop, chaque trace présente sa date dans une marge stable, puis l’œuvre, la nature de l’événement, son contenu éventuel et son niveau de confidentialité dans la colonne principale.

Sur mobile, la date passe au-dessus de l’entrée afin de préserver la largeur de lecture. La structure reste autrement identique et n’utilise pas de ligne temporelle continue.

C1 est préférée à C2, dont la ligne et les points rapprochent le Journal d’un fil d’activité social, ainsi qu’à C3, dont les grands chapitres mensuels prennent davantage de place et diluent les dates précises.

### Anatomie d’une trace

La variante **E2 — Entrée éditoriale** est retenue. Chaque entrée C1 comprend :

- la date en marge sur desktop et au-dessus sur mobile ;
- une miniature de couverture, le titre et l’auteur donnant accès à l’œuvre ;
- un libellé explicite : « Note privée », « Critique publique », « Lecture commencée » ou « Lecture terminée » ;
- un aperçu léger de l’écrit lorsqu’il existe ;
- une action contextuelle « Modifier » pour rouvrir l’éditeur correspondant.

L’aperçu est limité à quelques lignes afin de ne pas allonger chaque bloc. **« Lire la suite »** développe le texte dans l’entrée elle-même, sans créer de nouvelle page, puis devient **« Réduire »**. Ce libellé commun est préféré à « Déplier », plus technique, et à « Lire la note » ou « Lire la critique », qui pourraient suggérer une destination distincte.

Les étapes de lecture sans contenu rédigé utilisent une version plus compacte du même composant. E1 est écartée car elle réduit excessivement la présence des écrits ; E3 est écartée car elle allonge trop rapidement la chronologie.

### Comportements de la chronologie

- La dernière trace mise en avant dans l’ouverture O1 n’est pas répétée immédiatement dans la chronologie ; celle-ci reprend avec l’entrée précédente.
- Un premier ensemble d’entrées est affiché, puis **« Afficher les entrées précédentes »** charge explicitement un lot plus ancien.
- Le défilement infini est exclu : le lecteur conserve le contrôle de l’exploration de ses archives et Chapter n’encourage pas une consommation sans fin.
- Plusieurs textes peuvent rester développés simultanément ; ouvrir une entrée n’en referme pas une autre arbitrairement.
- **« Modifier »** rouvre le même éditeur contextuel que depuis la page de l’œuvre, avec les protections contre la perte de saisie déjà validées.

### États vides du Journal

Trois états spécifiques sont retenus :

1. **Aucune lecture en cours, mais des traces existent** : O1 conserve sa structure. La zone des lectures indique « Aucune lecture en cours » et propose « Voir mes livres à lire », tandis que la dernière trace reste affichée.
2. **Des lectures en cours, mais aucune trace n’existe** : les lectures restent visibles. La zone opposée indique « Votre prochaine note ou étape de lecture apparaîtra ici. » Les actions de note présentes sur les lectures suffisent, sans bouton supplémentaire.
3. **Aucune lecture et aucune trace** : les deux zones fusionnent en une invitation unique, « Votre journal commence avec une œuvre », accompagnée de « Rechercher une œuvre ».

Sur mobile, un rail vide n’est jamais rendu : il est remplacé par le message compact correspondant. Si la liste « À lire » est elle-même vide, « Voir mes livres à lire » devient « Rechercher une œuvre ».

Ces états appartiennent à la conception spécifique du Journal ; l’audit transversal des états extrêmes reste prévu en phase 11.

## Clôture de la conception du Journal

La structure J2, l’ouverture O1, son adaptation mobile OM3, la chronologie C1, l’entrée E2, les comportements d’archive et les états sans contenu sont désormais définis. La conception détaillée du Journal est fonctionnellement achevée, sous réserve de la validation consolidée préalable à toute implémentation de la phase 9.

## Ouverture de la conception de la Bibliothèque

### Macrostructure

La variante **B2 — Collection filtrée** est retenue. La Bibliothèque utilise une grille unique précédée des filtres « Toutes », « À lire », « En cours » et « Lu ». « Toutes » est sélectionné par défaut et chaque filtre peut indiquer son nombre d’œuvres sans présenter ce nombre comme une statistique de performance.

B2 affirme la complémentarité des espaces : le Journal sélectionne et raconte, tandis que la Bibliothèque inventorie et organise. La structure reste stable quelle que soit la taille de la collection et le filtre ainsi que la position sont restaurés au retour d’une œuvre.

B1 « Étagères par statut » est écartée car les sections deviennent longues et déséquilibrées. B3 « Organisation mixte » est écartée car sa mise en avant des lectures en cours duplique le rôle du Journal.

### Arbitrage ouvert — retrouver et ordonner

Le prochain arbitrage porte sur l’ordre par défaut, les possibilités de tri et la pertinence d’une recherche limitée à la collection personnelle.

Une proposition de travail est intégrée au jalon d’évaluation : recherche « Rechercher dans ma bibliothèque », ordre « Activité récente » par défaut, tris « Titre » et « Auteur », restauration du contexte et grille unique sans bascule vers une liste. Cette proposition reste à confirmer après évaluation du rendu réel.

## Jalon d’évaluation de phase 9

Une mise à jour du site a été explicitement autorisée afin d’évaluer les choix en contexte avant leur validation consolidée. Elle met en scène :

- le Journal J2 avec O1 sur desktop et OM3 sur mobile ;
- la chronologie C1 et ses entrées E2 ;
- l’expansion locale des écrits et le chargement volontaire des archives ;
- la Bibliothèque B2 et les outils de recherche et de tri proposés.

Ce jalon utilise toujours des données simulées. Il constitue un support de décision et n’entérine pas automatiquement les choix encore ouverts ni la clôture de la phase 9.

## Hors périmètre maintenu

- profil public détaillé et préférences sociales ;
- découverte, abonnements, commentaires et autres interactions sociales — phase 10 ;
- audit transversal complet des états extrêmes, du responsive et de l’accessibilité — phase 11 ;
- backend, persistance distante, authentification et onboarding.
