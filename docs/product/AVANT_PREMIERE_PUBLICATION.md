# Chapter — fondations essentielles avant première publication

Date : 16 septembre 2026  
Statut : feuille de route validée ; fondation 1 terminée, fondations 2 et 3 à traiter avant l'ouverture du produit au public.

## Pourquoi seulement trois fondations

Chapter doit être lancé tôt, mais pas sur des contrats qui obligeraient ensuite à déplacer les données, réinterpréter les gestes passés ou trahir la confiance des premiers lecteurs. Les trois fondations retenues sont donc celles dont une correction tardive provoquerait un revirement de modèle, et non une simple amélioration d'interface.

1. **Séparer les espaces sur la page œuvre** : `L’œuvre`, `Ma lecture`, `Autour de l’œuvre`.
2. **Faire d'une lecture une expérience conservée dans le temps** : intention, lecture commencée, fin ou arrêt, puis relecture sans écrasement.
3. **Séparer strictement mémoire privée et publication publique** : une critique est un objet public composé, jamais une note privée dont on change la visibilité.

La fondation 1 est validée sur la candidate Sites 93. Elle fixe la frontière visuelle commune, personnelle et publique qui permet d'implémenter les deux suivantes sans recomposer la page œuvre.

## Fondation 2 — conserver chaque expérience de lecture

### Décision

`À lire` représente une intention. `En cours`, `Lu` et une interruption appartiennent à une **expérience de lecture** identifiable. Relire une œuvre crée une nouvelle expérience reliée à la même œuvre ; elle ne rouvre pas en écriture la lecture précédente et n'écrase ni ses dates, ni ses traces, ni son bilan.

L'interface peut continuer à employer les trois statuts familiers au premier niveau. Le modèle plus précis n'apparaît qu'au moment utile, par des verbes : `Commencer`, `Terminer`, `Arrêter pour l'instant`, `Relire`, `Ajouter une pensée`, `Écrire un bilan`.

### Ce que l'utilisateur voit et ressent

- Dans `Ma lecture`, la lecture actuelle reste immédiatement compréhensible ; les expériences passées forment une histoire consultable, pas une pile de champs techniques.
- Dans le Journal, chaque événement appartient à la bonne lecture et garde sa date. Une relecture enrichit la mémoire au lieu de réécrire le passé.
- Dans la Bibliothèque, le statut courant reste compact ; les détails temporels ne surchargent pas la grille.
- Le lecteur peut interrompre une lecture sans être placé en échec ni forcé de la déclarer terminée.

Le lecteur réflexif retrouve l'évolution de son regard. Le migrant peut importer plusieurs lectures sans perte. Le lecteur en construction peut commencer, arrêter et reprendre sans jugement. Le curateur dispose plus tard d'une matière privée structurée pour composer une publication.

### Socle à figer

- Une intention `À lire` n'est pas une expérience commencée.
- Une œuvre peut posséder plusieurs expériences ordonnées, dont au plus une active dans l'usage initial.
- Dates, progression, traces, passages et bilan se rattachent à une expérience stable.
- Une relecture référence l'œuvre et conserve les expériences antérieures en lecture seule.
- Le Journal dérive de ces événements ; il ne devient pas une seconde source de vérité.
- Import, export et suppression respectent les mêmes identifiants et ne fusionnent pas silencieusement deux expériences.

Le prototype possède déjà des éléments partiels (`completedReadings`, `pastNotes`, traces de début et de fin). Ils valident la direction visuelle mais ne constituent pas encore le contrat complet : l'étape doit consolider le modèle de session et toutes ses projections avant le backend.

### Critères de sortie avant lancement

- Les parcours `À lire`, première lecture, arrêt, fin et relecture sont testables sans ambiguïté.
- Commencer une relecture laisse la lecture précédente, ses dates et ses écrits inchangés.
- Une trace ajoutée ou modifiée réapparaît dans la bonne expérience et au bon endroit du Journal.
- Les cas sans date, avec dates anciennes, lectures multiples et importées restent cohérents.
- L'utilisateur peut expliquer, sans aide, que « relire n'efface pas ma première lecture ».
- Desktop, mobile, clavier, états vides et historiques longs possèdent une recette explicite.

### Hors de cette étape

La synchronisation multi-appareils, les localisateurs complexes par édition, les statistiques de temps, les objectifs et les recommandations peuvent venir plus tard. Ils devront se rattacher aux expériences conservées sans modifier ce contrat.

## Fondation 3 — publier un objet distinct de la mémoire privée

### Décision

Une note ou une trace privée n'est jamais une publication en attente. `Publier` crée une **critique publique autonome** à partir d'un texte consciemment composé. La source privée demeure dans le Journal, même si la critique est ensuite modifiée ou retirée.

Avant la première publication, l'interface montre exactement :

- le texte qui deviendra public ;
- le Nom de lecteur affiché ;
- l'œuvre et l'emplacement public de destination ;
- les interactions possibles ;
- la possibilité de modifier ou retirer la critique ;
- la portée d'un éventuel avertissement de divulgâcheur.

### Ce que l'utilisateur voit et ressent

- Le geste de partage possède un début, un aperçu exact et une confirmation ; aucun interrupteur `privé/public` ne change rétroactivement la nature d'une note.
- Après publication, la note privée et la critique publique restent visibles comme deux objets liés mais indépendants.
- Modifier ou supprimer la critique n'altère ni la note, ni l'évaluation privée, ni l'historique de lecture.
- Créer un espace personnel ne force pas à créer immédiatement une identité publique. Le Nom de lecteur est demandé au premier acte réellement public.

Le lecteur en construction peut écrire sans se mettre en scène. Le lecteur réflexif garde le contexte intime de sa pensée. Le migrant sait que ses archives importées ne seront jamais publiées automatiquement. Le curateur peut travailler une formulation destinée aux autres sans sacrifier sa matière source. L'explorateur lit des avis dont la portée et l'auteur sont intelligibles.

### Socle à figer

- Trace privée et critique publique possèdent des identifiants, cycles de vie et permissions distincts.
- Une critique référence une œuvre, un auteur public et, facultativement, l'expérience ou la trace qui l'a inspirée ; ce lien ne donne jamais accès à la source privée.
- Brouillon, aperçu, publication, modification et retrait sont des états explicites.
- L'import reste privé par défaut ; aucune chaîne ressemblant à une critique n'est publiée implicitement.
- Les réponses naissent sous une critique identifiable, pas dans un forum général de l'œuvre.
- Signalement, blocage, retrait, traitement et recours doivent exister avant l'ouverture à une communauté réelle.

Le prototype sépare déjà `note` et `review`, protège les imports et conserve la note lors du retrait d'une critique. L'étape restante doit rendre cette séparation complète dans le parcours, la microcopie, l'identité en deux temps et les contrats de données.

### Critères de sortie avant lancement

- Il est impossible de publier une note privée par simple changement de visibilité.
- L'aperçu correspond exactement au contenu, au nom et à la destination effectivement publiés.
- Annuler ne crée aucune publication et ne perd aucun brouillon privé.
- Modifier ou retirer une critique laisse la mémoire privée intacte.
- Une première action privée ne demande pas d'identité publique ; une première action publique explique pourquoi elle est nécessaire.
- Import, export, suppression, blocage et signalement respectent la frontière privée/publique.
- L'utilisateur peut expliquer, sans aide, ce qui est privé, ce qui sera public et comment revenir sur sa publication.

### Hors de cette étape

La distribution algorithmique, les réactions mises en avant, les notifications sociales détaillées et les conversations générales sont différées. Elles ne doivent pas précéder la gouvernance minimale ni transformer la critique en métrique de performance.

## Ordre obligatoire et règle de lancement

La fondation 2 précède la fondation 3 : Chapter doit d'abord savoir ce qu'il conserve avant de décider ce qu'il fait circuler. Chaque étape suit le même cycle : cadrage ciblé, candidate Sites, recette des cas normaux et extrêmes, validation explicite, puis synchronisation de sa branche.

Une première publication du produit est raisonnable lorsque les trois phrases suivantes sont vraies dans le comportement réel, et pas seulement dans la microcopie :

1. Une page œuvre sépare clairement commun, personnel et public.
2. Une nouvelle lecture n'efface jamais une lecture précédente.
3. Une mémoire privée ne devient jamais publique sans création et confirmation d'un objet distinct.

Tout le reste peut évoluer par patchs si ces trois contrats demeurent stables.
