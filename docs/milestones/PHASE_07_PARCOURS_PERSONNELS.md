# Chapter — Phase 7 : parcours d’ajout, de note privée et de critique

Ce document constitue le livrable de travail de la phase 7. Il définit les interactions permettant d'ajouter une œuvre au journal, de modifier son statut, de consigner une note privée et de rédiger ou publier une critique.

## Objectifs

- rendre l'ajout d'une œuvre immédiatement compréhensible ;
- conserver seulement les statuts « À lire », « En cours » et « Lu » ;
- éviter qu'un simple changement de statut ouvre un formulaire disproportionné ;
- séparer visuellement et sémantiquement la note privée de la critique publique ;
- garantir qu'aucune publication ne résulte implicitement d'une action personnelle ;
- assurer une continuité cohérente entre desktop et mobile.

## Décisions héritées

- le modèle est centré sur l'œuvre ;
- les statuts avancés, l'interruption et la relecture ne sont pas exposés dans le premier lot ;
- un changement de statut ne publie aucune activité ;
- la note personnelle reste privée et peut être ouverte depuis la page de l'œuvre ainsi que depuis le journal pour une lecture en cours ;
- la critique est rédigée dans une modale, presque plein écran sur mobile si nécessaire ;
- la critique est limitée à 3 000 caractères, sans longueur minimale ;
- la publication exige une action explicite « Publier » ;
- les textes publics longs s'étendent en place avec « Lire la suite ».

## Hors de cette phase

- commentaires, réponses, abonnements et notifications sociales ;
- sessions multiples, relectures et statuts avancés ;
- implémentation frontend ;
- tokens définitifs des composants.

## Premier arbitrage : interaction d’ajout au journal

### AJ1 — Choix visibles

Les trois statuts apparaissent directement dans l'ouverture de la page. L'ajout demande un seul geste, mais trois contrôles permanents occupent l'espace principal, y compris après que l'utilisateur a déjà choisi son statut.

### AJ2 — Sélecteur contextuel

Une action unique « Ajouter au journal » ouvre trois choix simples. Sur desktop, le sélecteur est ancré au bouton ; sur mobile, il devient un panneau inférieur court. Après sélection, le bouton affiche le statut courant et permet de le modifier par le même mécanisme. Cette option est recommandée.

Le comportement proposé est explicitement séquentiel :

1. au repos, seul le bouton « Ajouter au journal » est visible ;
2. un clic ou une activation clavier ouvre « Où en êtes-vous ? » ;
3. choisir un statut l'applique immédiatement, ferme le panneau et remplace le libellé du bouton par le statut choisi ;
4. fermer le panneau, cliquer hors de celui-ci ou utiliser Échap ne modifie rien ;
5. activer ultérieurement le bouton de statut rouvre le même sélecteur.

Le panneau n'occupe donc aucun espace et n'ajoute aucun bruit visuel tant que l'utilisateur ne sollicite pas l'action. La gestion facultative des dates reste un arbitrage distinct.

### AJ3 — Formulaire groupé

Une modale rassemble statut, dates et évaluation. Elle permet de tout renseigner immédiatement, mais transforme un ajout simple en formulaire et suggère que des informations facultatives sont attendues.

### Décision

La variante **AJ2 — Sélecteur contextuel** est validée avec son comportement à la demande : le panneau est absent au repos, une sélection s'applique immédiatement et une fermeture sans sélection ne modifie rien.

## Frontière concernant les boutons

La phase 7 fixe uniquement ce qui affecte le parcours :

- le libellé de l'action ;
- son niveau de priorité relatif ;
- les états nécessaires au comportement — repos, ouvert et statut sélectionné ;
- le résultat d'une activation et les conditions de fermeture ;
- les différences de contenant entre desktop et mobile.

La personnalisation détaillée des boutons est reportée à la phase 9 consacrée aux composants : dimensions, espacements, rayons, couleurs appliquées, icônes, variantes, transitions et règles de réutilisation. La phase 11 auditera ensuite les contrastes, le focus, les cibles tactiles et le texte agrandi.

Cette séparation évite de figer un bouton isolé avant de connaître l'ensemble des actions à harmoniser, tout en garantissant dès maintenant une hiérarchie fonctionnelle correcte.

## Deuxième arbitrage : dates de lecture facultatives

Le statut choisi par AJ2 est toujours appliqué immédiatement. « À lire » ne déclenche aucune proposition de date. « En cours » peut recevoir une date de début et « Lu » une date de fin ; ces informations restent facultatives et modifiables depuis « Mon journal ».

### DT1 — Date automatique

La date du jour est enregistrée automatiquement lors du passage à « En cours » ou « Lu ». L'interaction est immédiate, mais elle crée une donnée potentiellement fausse lorsque l'utilisateur consigne une lecture après coup.

### DT2 — Proposition facultative

Après la mise à jour du statut, une sollicitation secondaire et non bloquante propose « Aujourd'hui », « Choisir une date » ou « Plus tard ». Refuser ou fermer cette proposition conserve le statut sans date. Cette option facilite la saisie au moment opportun sans rendre la date obligatoire.

### DT3 — Modification ultérieure

Aucune date n'est proposée au changement de statut. L'utilisateur peut l'ajouter plus tard depuis « Mon journal ». Le parcours immédiat est très calme, mais les dates risquent d'être oubliées alors qu'elles structurent utilement le journal.

Pour un passage direct à « Lu », DT2 demande uniquement la date de fin. Une éventuelle date de début demeure modifiable plus tard, sans transformer la sollicitation en formulaire à deux champs.

### Décision

La variante **DT2 — Proposition facultative** est validée. Le statut reste l'action principale et s'applique immédiatement ; la date est proposée ensuite sans blocage. « À lire » ne sollicite aucune date, « En cours » propose une date de début et « Lu » une date de fin. « Plus tard » ou la fermeture conserve le statut sans date. Toutes les dates restent modifiables depuis « Mon journal ».

## Troisième arbitrage : rédaction d’une note privée

La note privée est accessible depuis la section « Mon journal » de la page de l’œuvre ainsi que depuis le journal personnel. Ces deux points d’entrée doivent ouvrir le même contenu et le même mécanisme d’édition. L’interface emploie explicitement « Privée » et l’action « Enregistrer » ; elle ne présente jamais l’action publique « Publier ».

### NP1 — Champ dans la section

Le champ de rédaction se déploie directement dans la section depuis laquelle l’utilisateur agit. Le parcours est immédiat, mais il agrandit la page, crée deux compositions d’édition à maintenir et mélange consultation et rédaction.

### NP2 — Éditeur contextuel

Une action « Ajouter une note » ou l’aperçu d’une note existante ouvre un éditeur court et dédié. Il prend la forme d’une modale compacte sur desktop et d’un panneau inférieur confortable sur mobile. Le même éditeur est utilisé depuis la page de l’œuvre et le journal, reste absent au repos et sépare nettement l’écriture privée de la critique publique.

### NP3 — Espace de rédaction

Une vue dédiée offre un grand espace d’écriture. Elle convient aux textes longs, mais introduit une rupture de navigation disproportionnée pour une pensée personnelle généralement brève.

Dans les trois variantes, une note existante est modifiée au même endroit qu’elle a été créée.

### Décision

La variante **NP2 — Éditeur contextuel** est validée. L’action « Ajouter une note » ou l’aperçu d’une note existante ouvre le même éditeur depuis la page de l’œuvre et le journal. Cet éditeur prend la forme d’une modale compacte sur desktop et d’un panneau inférieur confortable sur mobile. L’indication « Privée » reste explicite et son action d’enregistrement ne reprend jamais le vocabulaire public de la critique.

## Quatrième arbitrage : sauvegarde et fermeture de la note privée

### NS1 — Enregistrement explicite protégé

L’utilisateur choisit « Enregistrer ». Une fermeture sans modification est immédiate ; une fermeture après modification demande seulement s’il souhaite revenir à la note ou ignorer les changements. Le comportement reste explicite sans introduire d’état permanent supplémentaire.

### NS2 — Sauvegarde automatique

Chaque modification est conservée automatiquement et l’interface confirme brièvement l’enregistrement. Le risque de perte est faible, mais tout fragment saisi devient aussitôt la note officielle ; les états de synchronisation et d’erreur doivent en outre rester compréhensibles.

### NS3 — Brouillon automatique

La saisie est conservée comme brouillon jusqu’à une action « Valider la note ». Cette solution protège davantage les textes interrompus, mais ajoute une distinction entre brouillon et note enregistrée qui contredit l’objectif de simplicité du premier lot.

Dans NS1, « Annuler » ferme immédiatement si le contenu n’a pas changé. Après une modification, la protection ne s’affiche qu’au moment de quitter et ne constitue donc pas un statut permanent à apprendre.

### Décision

La variante **NS1 — Enregistrement explicite protégé** est validée. L’action « Enregistrer » confirme la création ou la modification de la note. Une fermeture sans changement est immédiate. Si le texte a été modifié, quitter propose uniquement « Revenir à la note » ou « Ignorer les modifications ». Aucun brouillon ni statut de synchronisation n’est exposé dans le premier lot.

## Cinquième arbitrage : composition de l’éditeur de critique

Les trois variantes conservent les décisions déjà validées : modale dédiée, limite de 3 000 caractères, aucune longueur minimale, visibilité publique explicite et publication uniquement après activation de « Publier la critique ».

### CR1 — Texte seul

La modale contient uniquement le texte de la critique. L’évaluation facultative reste gérée ailleurs sur la page de l’œuvre. La rédaction est minimale, mais les deux dimensions de l’opinion publique peuvent être enregistrées à des moments différents et manquer de cohérence.

### CR2 — Opinion réunie

La modale réunit une évaluation facultative compacte et le texte de la critique. L’utilisateur préfère CR2 à condition de remplacer la liste déroulante exploratoire par cinq étoiles cliquables et de revoir leur position par rapport au corps du texte.

La révision **CR2R** place le corps de la critique en premier, puis l’évaluation facultative immédiatement sous le texte et enfin les actions de fermeture et de publication. Les étoiles servent ainsi de synthèse éventuelle de l’opinion au lieu de conditionner la rédaction dès l’ouverture. Aucune étoile n’est sélectionnée par défaut ; un choix de un à cinq peut être retiré sans effacer la critique.

Le positionnement relatif « critique → évaluation → publication » est apprécié et considéré comme validé. En revanche, tout encadrement permanent de la section d’évaluation ou de chaque étoile est rejeté. Le contrôle cible doit présenter des étoiles visuellement libres ; seuls les états interactifs nécessaires peuvent apparaître ponctuellement.

### CR3 — Rédaction puis aperçu

La rédaction et la publication sont séparées en deux étapes, la seconde montrant un aperçu. Cette protection convient à des contenus longs ou fortement formatés, mais ajoute une étape systématique peu justifiée pour une critique généralement limitée à un paragraphe.

Le recours à cinq étoiles cliquables et leur position relative dans la modale relèvent de la phase 7, car ils structurent le parcours de publication. Leur taille, leur dessin, leurs couleurs, leurs espacements, leurs micro-interactions et leurs états visuels définitifs appartiennent à la phase 9 consacrée aux composants. Leur audit clavier, tactile et lecteur d’écran appartient à la phase 11.

## Sixième arbitrage : précision de l’évaluation

### EV1 — Étoiles entières libres

L’utilisateur choisit une valeur entière de un à cinq à l’aide d’étoiles sans encadrement permanent. Le contrôle reste rapide et la critique écrite porte la nuance. La moyenne communautaire peut néanmoins être affichée avec une décimale, même si les évaluations individuelles sont entières.

### EV2 — Demi-étoiles directes

Chaque moitié d’étoile correspond à une valeur par tranche de 0,5. Ce modèle est compact, mais la cible d’interaction devient difficile à comprendre et trop étroite sur mobile ; le survol qui aide sur desktop n’existe pas sur écran tactile.

### EV3 — Étoiles puis ajustement

Un clic sur une étoile choisit rapidement une valeur entière, puis des actions « − » et « + » permettent de l’ajuster par pas de 0,5. Cette solution est la plus explicite et accessible si les demi-points sont jugés indispensables, mais elle ajoute un second mécanisme à une action secondaire.

Le choix entre cinq et dix niveaux doit être fixé en phase 7 avant l’implémentation, car il modifie la signification de l’évaluation et pas seulement son apparence.

### Décision

La variante **EV1 — Étoiles entières libres** est validée pour le premier lot. Une évaluation individuelle prend une valeur entière de un à cinq et peut être retirée. Le contrôle ne possède aucun encadrement permanent. Une moyenne agrégée peut néanmoins afficher une décimale. Le traitement graphique détaillé des étoiles reste reporté en phase 9.

Cette décision finalise également **CR2R — Opinion réunie révisée** : corps de la critique, évaluation facultative EV1, puis actions de fermeture et de publication.

## Septième arbitrage : résultat de la publication

Dans toutes les variantes, fermer l’éditeur sans modification est immédiat. Fermer après modification reprend la protection de NS1 : revenir à la critique ou ignorer les changements. La différence porte uniquement sur l’activation de « Publier la critique ».

### PB1 — Publication directe

La critique est publiée sans étape supplémentaire, la modale se ferme, le contenu apparaît dans la page et un retour bref confirme la réussite. Le parcours est simple, mais une activation accidentelle exige ensuite de retrouver l’action de retrait.

### PB2 — Confirmation préalable

Un dialogue demande systématiquement de confirmer la publication publique. Cette solution rend la conséquence très explicite, mais répète une intention déjà indiquée par la visibilité « Publique » et le libellé « Publier la critique ».

### PB3 — Publication avec annulation

La publication est immédiate comme dans PB1. Un retour temporaire « Critique publiée — Annuler » permet de retirer la critique et de rouvrir l’éditeur avec son contenu. Passé ce délai, la critique reste modifiable ou supprimable par ses actions ordinaires. Cette option protège sans ajouter de friction systématique.

La durée précise du retour temporaire et son animation relèvent de la phase 9 ; la phase 7 décide uniquement de la présence de l’annulation et de son résultat.

### Décision

La variante **PB3 — Publication avec annulation** est validée. « Publier la critique » rend immédiatement la critique visible, ferme l’éditeur et affiche le contenu dans la page. Un retour temporaire permet d’annuler : la critique est alors retirée et l’éditeur est rouvert avec son contenu. Aucune confirmation préalable systématique n’est ajoutée.

## Synthèse fonctionnelle proposée pour clôture

### Ajout et suivi

- « Ajouter au journal » ouvre AJ2 avec « À lire », « En cours » et « Lu » ;
- le statut est appliqué immédiatement et ne publie aucune activité ;
- DT2 propose ensuite, sans blocage, une date adaptée pour « En cours » ou « Lu ».

### Note privée

- NP2 ouvre le même éditeur contextuel depuis la page de l’œuvre ou le journal ;
- l’indication privée et l’action « Enregistrer » excluent toute ambiguïté avec la critique ;
- NS1 protège uniquement une fermeture contenant des modifications non enregistrées.

### Critique publique

- CR2R présente le corps de la critique, puis l’évaluation EV1 facultative et enfin les actions ;
- le texte accepte jusqu’à 3 000 caractères sans longueur minimale ;
- EV1 utilise cinq niveaux entiers et des étoiles sans encadrement permanent ;
- PB3 publie directement et propose une annulation temporaire.

Cette synthèse a reçu une confirmation explicite. Elle constitue désormais la spécification fonctionnelle de référence utilisée pour l’implémentation de la phase 8.

## Statut

La phase 7 est **terminée et validée**. Tous ses arbitrages fonctionnels — AJ2, DT2, NP2, NS1, CR2R, EV1 et PB3 — ont reçu une confirmation consolidée, et l’implémentation de la phase 8 a été explicitement autorisée. La personnalisation détaillée des boutons, des étoiles et du retour temporaire reste prévue en phase 9.
