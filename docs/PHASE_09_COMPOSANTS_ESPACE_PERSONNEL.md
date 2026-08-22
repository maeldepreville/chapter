# Chapter — Phase 9 : composants et espace personnel

Statut : **implémentée — jalon d’évaluation publié**

Dernière mise à jour : 23 août 2026

## Objectif

Transformer les vues légères du Journal et de la Bibliothèque introduites en phase 8 en un espace personnel cohérent, puis consolider les composants révélés par ces écrans et par la page d’une œuvre.

La phase a suivi le cycle validé : discussion → analyse UX → proposition → ajustements → validation explicite → implémentation. Le jalon d’évaluation rassemble désormais le Journal, la Bibliothèque et les composants consolidés afin de permettre une revue en contexte.

## État de l’implémentation

Le jalon publié le 23 août 2026 comprend :

- le Journal composé J2 avec ouverture O1, rail mobile OM3, chronologie C1 et entrées E2 ;
- la Bibliothèque B2 avec recherche, tris, filtres, statuts I2b, densité D1 et retrait R1 protégé et annulable ;
- les couvertures de remplacement L2 et CP2, uniquement en l’absence d’une couverture exploitable ;
- l’évaluation ES1, le retour temporaire N2C à cinq secondes et le système d’actions A2–G2–S2 ;
- le relais de date SD2, les surfaces d’édition EM2 et la protection intégrée NSV2 ;
- les états vides contextualisés du Journal et de la Bibliothèque ainsi que les adaptations desktop et mobile correspondantes.

Les données restent simulées : ce jalon sert à évaluer la composition, les états et les interactions avant l’ouverture de la phase suivante.

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

Après évaluation du jalon, la recherche **« Rechercher dans ma bibliothèque »**, l’ordre **« Activité récente »** par défaut, les tris **« Titre »** et **« Auteur »**, la restauration du contexte et la grille unique sans bascule vers une liste sont validés.

## Jalon d’évaluation de phase 9

Une mise à jour du site a été explicitement autorisée afin d’évaluer les choix en contexte avant leur validation consolidée. Elle met en scène :

- le Journal J2 avec O1 sur desktop et OM3 sur mobile ;
- la chronologie C1 et ses entrées E2 ;
- l’expansion locale des écrits et le chargement volontaire des archives ;
- la Bibliothèque B2 et les outils de recherche et de tri proposés.

Ce jalon utilise toujours des données simulées. Il constitue un support de décision et n’entérine pas automatiquement les choix encore ouverts ni la clôture de la phase 9.

Son évaluation a confirmé le Journal J2/O1/OM3/C1/E2, la Bibliothèque B2 et ses outils de recherche et de tri. La phase 9 se poursuit avec l’anatomie des éléments de collection et la consolidation des composants communs.

### Arbitrage ouvert — élément de collection

Le prochain arbitrage porte sur les informations et actions disponibles sous chaque couverture, notamment la possibilité de modifier directement le statut de lecture depuis la grille.

La variante éditoriale **I2b — Statut typographique** est validée : le statut et sa petite flèche restent un contrôle unique, mais sans fond, bordure ni forme arrondie permanente. Cette variante allège la grille tout en conservant l’accès direct au sélecteur de statut. Pour ne pas rendre l’action ambiguë, toute la zone texte–flèche doit rester activable ; le survol ou le focus apporte seul un retour discret, et la zone tactile conserve une taille confortable sans devenir visible.

Cet arbitrage appartient bien à la conception actuelle de l’élément : il détermine la hiérarchie et la compréhension de l’action. Les microparamètres exacts de couleur, d’espacement et de mouvement seront consolidés plus tard avec les autres composants.

### Arbitrage ouvert — densité informative

La variante **D1 — Essentielle** est validée. Chaque élément de collection affiche uniquement la couverture, le titre, l’auteur et le statut interactif I2b. Les repères datés restent dans le Journal et aucun indicateur de progression ou de notation ne transforme la Bibliothèque en tableau de suivi.

### Arbitrage ouvert — retrait de la collection

La composition **R1 — Dans le sélecteur** est validée. « Retirer de ma bibliothèque » apparaît sous les trois statuts, séparé par un filet et traité comme une action destructive distincte. La vignette ne reçoit aucun menu supplémentaire et le même principe est conservé sur desktop comme sur mobile.

### Arbitrage ouvert — effets et protection du retrait

Le **retrait organisationnel** est validé. L’œuvre quitte la Bibliothèque et les lectures en cours, et son statut personnel est retiré, mais les notes privées, critiques publiées et anciennes traces du Journal sont conservées. Le retrait ne crée pas lui-même une nouvelle entrée dans la chronologie et l’effacement complet des données liées à l’œuvre reste une action séparée, explicitement nommée, hors du sélecteur de statut.

Sans écrit associé, le retrait est immédiat et suivi d’une notification « Œuvre retirée — Annuler ». En présence d’une note privée ou d’une critique, une confirmation précise d’abord que les écrits seront conservés ; la possibilité d’annuler reste ensuite disponible.

### Arbitrage ouvert — états vides de la Bibliothèque

Les trois états vides contextualisés sont validés :

- une Bibliothèque entièrement vide masque les filtres, la recherche interne et le tri, puis présente « Votre bibliothèque attend sa première œuvre » avec « Rechercher une œuvre » ;
- un filtre vide conserve les outils, nomme le statut concerné et propose « Voir toutes les œuvres », qui réinitialise uniquement le filtre ;
- une recherche locale sans résultat conserve filtre et tri, rappelle la requête et propose « Effacer la recherche » sans modifier les autres choix.

Lorsqu’une requête est combinée à un filtre, le message explicite ce contexte. Ces états restent typographiques et fonctionnels, sans illustration décorative. Avec ces règles, la conception détaillée de la Bibliothèque est considérée comme fonctionnellement complète.

## Consolidation des composants communs

Les parcours AJ2, DT2, NP2, CR2R et PB3 sont déjà fixés fonctionnellement par la phase 7. La consolidation commence donc par les composants dont la forme détaillée avait été explicitement reportée.

### Arbitrage ouvert — titres longs sur la couverture typographique M1M2

La variante **L2 — Paliers équilibrés** est validée pour M1M2. Le titre utilise un grand palier sur une ou deux lignes, un palier intermédiaire sur trois lignes, puis un dernier palier lisible limité à quatre lignes. Au-delà, la quatrième ligne se termine par une ellipse ; le titre intégral demeure présent hors de la couverture et dans son nom accessible. Le repère Chapter et l’auteur conservent leur position stable.

Cette composition s’applique **uniquement lorsqu’aucune couverture réelle exploitable n’est disponible**. Une image de couverture valide garde toujours le traitement C1 « Objet discret », avec son ratio original et sans superposition typographique. Pendant le chargement d’une image, un état neutre temporaire est utilisé afin de ne pas afficher brièvement M1M2 ; la couverture typographique ne prend le relais qu’en cas d’absence connue ou d’échec durable du chargement.

### Arbitrage suivant — palette des couvertures typographiques

La variante **CP2 — Nuancier éditorial** est validée. Six tonalités sourdes — famille brique, ocre, sauge, bleu pétrole, prune et ardoise — sont maintenues à des niveaux proches de saturation et de luminosité afin d’apporter une variété maîtrisée sans concurrencer les couvertures réelles.

Chaque œuvre est associée de manière stable à l’une de ces teintes à partir de son identifiant canonique. La couleur ne dépend jamais du genre, du statut, de l’auteur ou de l’ordre d’affichage, et reste identique dans le Journal, la Bibliothèque, la recherche et la page de l’œuvre.

### Arbitrage ouvert — dessin des étoiles EV1

La variante **ES1 — Accent plein** est validée. Les étoiles sélectionnées sont remplies avec l’accent brique atténué de Chapter, tandis que les étoiles restantes conservent un contour neutre. Le contrôle reste libre de tout fond ou encadrement permanent et la valeur demeure immédiatement lisible dans l’éditeur comme dans une critique publiée.

### Arbitrage ouvert — états interactifs de l’évaluation

Les états interactifs ES1 sont validés :

- sans valeur, cinq contours neutres sont accompagnés de « Aucune évaluation » ;
- le survol ou le focus prévisualise temporairement la valeur visée dans l’accent brique et l’énonce sous la forme « 4 sur 5 » ;
- un clic, un toucher, Entrée ou Espace fixe la valeur, tandis que les flèches permettent de parcourir les cinq niveaux ;
- sélectionner une autre étoile remplace directement la valeur ;
- lorsqu’une valeur existe, une action textuelle « Retirer » apparaît et la supprime explicitement sans toucher au texte de la critique ; cliquer une seconde fois sur l’étoile active ne supprime rien ;
- seule une courte transition de couleur accompagne les changements, sans rebond ni agrandissement.

Les zones d’interaction restent plus grandes que le dessin visible des étoiles. L’audit transversal détaillé demeure prévu en phase 11.

### Décision validée — N2C, capsule éditoriale annulable

PB3 et le retrait organisationnel utilisent le même composant de retour temporaire. Trois compositions sont comparées : capsule flottante compacte, barre éditoriale discrète ou message replacé dans le contenu d’origine.

L’utilisateur souhaite conserver l’effet pop-up et les bords arrondis de la capsule N1 sans adopter une forme de pilule complète, jugée susceptible de devenir trop générique, tandis que N2 est considérée comme trop rigide. La variante de compromis **N2C — Capsule éditoriale** est validée : structure interne de N2, hauteur d’environ 46 px, rayon intermédiaire d’environ 12 px et ombre très légère. Le message, un séparateur discret et l’action « Annuler » forment une structure lisible, sans dégradé ni icône décorative. Le composant reste compact sur desktop et devient presque pleine largeur au-dessus de la navigation mobile.

La durée cible est fixée à **5 secondes**, plutôt que 10. Le décompte est suspendu au survol ou lorsque le composant ou son action reçoit le focus ; la durée reste une constante facilement ajustable pendant l’implémentation et réévaluable lors de l’audit de phase 11.

### Décision validée — A2, hiérarchie éditoriale des actions

La composition **A2 — Hiérarchie éditoriale** est validée. Chaque groupe d’actions ne contient qu’une seule action principale remplie ; les actions secondaires restent transparentes et sans encadrement permanent, tandis que les commandes contextuelles comme « Modifier », « Lire la suite » ou « Retirer » prennent la forme d’actions textuelles.

Une action destructive est isolée visuellement et nommée explicitement. Elle ne reçoit une surface destructive remplie que lorsqu’elle constitue la validation finale d’une opération irréversible ; le retrait organisationnel de la Bibliothèque, qui reste annulable, demeure une action textuelle séparée. Les boutons courants emploient un rayon modéré d’environ 5 à 6 px : les 12 px de N2C restent ainsi une exception volontaire liée à sa nature de retour flottant.

### Décision validée — G2, gabarit équilibré

Le gabarit **G2 — Équilibré** est validé pour les actions principales et secondaires : hauteur de 40 px sur desktop, portée à 44 px sur mobile, avec un rayon commun de 6 px. Il conserve une présence nette sans épaissir la composition et distingue clairement les boutons courants de la capsule flottante N2C.

Ces valeurs définissent le composant visuel de référence. L’audit transversal définitif des cibles tactiles, du texte agrandi et du focus reste prévu en phase 11 et pourra imposer une zone interactive invisible plus généreuse sans modifier la hauteur perçue.

### Décision validée — S2, retours fonctionnels

La composition **S2 — Retours fonctionnels** est validée. Le survol utilise une variation tonale légère ; le focus clavier reçoit un anneau externe net qui ne déplace pas le contrôle ; la pression renforce temporairement la tonalité sans réduction, translation ni rebond.

Pendant le chargement, le libellé reste visible et immobile tandis qu’un indicateur adjacent signale l’attente ; la largeur du bouton est conservée et les activations répétées sont bloquées. L’état indisponible réduit le contraste sans rendre le texte illisible et n’applique aucun retour de survol. Les transitions restent courtes, limitées aux couleurs et supprimées lorsque les préférences de mouvement le demandent.

Avec A2, G2 et S2, le système commun des boutons et actions textuelles est considéré comme consolidé. Le prochain composant ouvert est le sélecteur de statut AJ2 et sa proposition de date DT2, à harmoniser entre le menu ancré desktop et le panneau inférieur mobile.

### Décision validée — SD2, relais discret entre statut et date

La composition **SD2 — Relais discret** est validée pour l’enchaînement AJ2–DT2. Le choix du statut est appliqué immédiatement et le sélecteur se ferme ; une invitation distincte, compacte et placée à proximité propose ensuite la date correspondante. Cette séparation confirme visuellement que le statut est déjà enregistré et que la date reste facultative.

« À lire » ne provoque aucune invitation. « En cours » propose une date de début et « Lu » une date de fin, avec les actions « Aujourd’hui », « Choisir une date » et « Plus tard ». La fermeture ou « Plus tard » conserve le statut sans date. Sur desktop, l’invitation reste liée au contrôle d’origine ; sur mobile, elle prend place dans la continuité du panneau inférieur sans devenir une étape bloquante. N2C reste réservé aux confirmations annulables et n’accueille pas cette saisie secondaire.

### Décision validée — EM2, surfaces d’édition adaptatives

La composition **EM2 — Surface adaptative** est validée pour les éditeurs NP2 et CR2R. Sur desktop, la note privée conserve une modale courte et compacte, tandis que la critique publique bénéficie d’une surface plus large et plus haute pour accueillir son texte, l’évaluation facultative ES1 et les actions de publication.

Sur mobile, les deux éditeurs deviennent des panneaux inférieurs : la note reste ajustée à un contenu bref, tandis que la critique peut approcher le plein écran lorsque l’espace d’écriture le nécessite. Les deux variantes partagent toutefois la même structure, les mêmes composants et la même logique de fermeture ; seule leur dimension répond au volume et à la conséquence de l’écrit.

### Décision validée — NSV2, protection intégrée

La fermeture sans modification reste immédiate. En présence de changements non enregistrés, la composition **NSV2 — Alerte intégrée** est validée : l’éditeur EM2 reste ouvert et le texte modifié demeure visible, tandis que ses actions ordinaires sont remplacées par un court bloc de protection intégré à la même surface.

« Revenir à la note » ou « Revenir à la critique » constitue l’action principale sûre et rend immédiatement l’éditeur actif. « Ignorer les modifications » reste une action destructive textuelle et ferme l’éditeur en revenant au dernier contenu enregistré. Aucun second dialogue ne s’empile sur la modale desktop ou le panneau mobile, et la confirmation ne masque pas le texte concerné.

## Clôture de la conception détaillée

Les arbitrages du Journal, de la Bibliothèque et des composants communs identifiés pour la phase 9 sont désormais validés. Le système couvre notamment les lignes et états personnels, les éléments de collection, les couvertures de remplacement, l’évaluation, les actions, le sélecteur de statut et de date, les retours annulables ainsi que les surfaces d’édition protégées.

La phase 9 n’est pas encore terminée : l’étape suivante est l’implémentation cohérente de cette tranche dans le site, suivie d’un jalon d’évaluation. Conformément au cycle de travail du projet, cette modification de l’interface attend une autorisation explicite.

## Hors périmètre maintenu

- profil public détaillé et préférences sociales ;
- découverte, abonnements, commentaires et autres interactions sociales — phase 10 ;
- audit transversal complet des états extrêmes, du responsive et de l’accessibilité — phase 11 ;
- backend, persistance distante, authentification et onboarding.
