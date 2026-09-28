# Chapter — fondation des expériences de lecture (candidate)

Statut : candidate corrigée le 26 septembre 2026 après les premiers retours de recette, en attente de validation explicite. Candidate visée : Sites 96. Base validée : fondation page œuvre, Sites 93. Branche de travail : `fondation-experiences-lecture-2026-09-23`.

## Contrat livré

`À lire` demeure une intention sans expérience fabriquée. `Commencer` crée une expérience stable ; `Terminer` ou `Arrêter pour l’instant` la clôt sans effacer ses dates, son marque-page ni son écrit. `Relire` crée une nouvelle expérience reliée à la même œuvre et laisse les précédentes en lecture seule.

Le premier niveau conserve les statuts familiers `À lire`, `En cours` et `Lu`. Le menu emploie ensuite les verbes adaptés au contexte : `Commencer la lecture`, `Terminer la lecture`, `Arrêter pour l’instant` et `Relire`. Une interruption n’est ni une lecture terminée ni un échec : la Bibliothèque revient à `À lire` avec l’indication discrète `À reprendre · lecture précédente conservée`.

## Modèle et projections

- `ReadingExperience` possède un identifiant, un ordre, un état `active`, `completed` ou `interrupted`, ses dates, son marque-page, son écrit et un indicateur d’import.
- Une œuvre garde au plus une expérience active. Si un import entre en conflit avec une lecture locale active, celle-ci reste active ; les expériences importées distinctes sont conservées comme interrompues.
- Les anciens champs `completedReadings` et `pastNotes` restent projetés pour la compatibilité du prototype, mais `experiences` porte désormais la mémoire structurée.
- Les traces du Journal peuvent référencer `experienceId`. Début, fin, interruption et écrit sont ainsi rattachés à la bonne lecture.
- L’import conserve les identifiants explicites, ajoute sans écraser les expériences locales distinctes et garde les lectures importées en lecture seule. L’export transporte la structure complète.

Le prototype reste un état React de session : la persistance, les migrations, les conflits multi-appareils et les passages surlignés appartiennent au backend ultérieur, qui devra respecter ce contrat.

## Surfaces visibles

- `Ma lecture` distingue l’intention, la lecture active, l’interruption et la dernière lecture terminée.
- L’écrit courant s’appelle `Ma pensée` pendant une lecture et `Mon bilan` après sa fin.
- L’historique montre trois expériences closes, puis cinq supplémentaires à la demande, sans ordinal artificiel. Les dates absentes et les lectures importées sont nommées explicitement.
- Depuis un filtre de la Bibliothèque, une œuvre dont le statut change reste auprès de son invitation de date facultative ; elle rejoint sa nouvelle catégorie seulement à la fermeture de cette étape.
- Après une première intention `À lire`, `Ma lecture` confirme simplement son caractère privé : aucun panneau de première trace ni raccourci vers un Journal encore vide n’est affiché. Les trois liens du sommaire ciblent directement les titres de chapitre, et l’action de critique conserve le même alignement avant et après la création de l’espace.
- L’atelier `/recette/oeuvre` couvre huit situations : sans compte, à lire, en cours, interrompue, terminée, relecture, importée et nombreuses relectures.

## Recette avant validation

À rejouer sur desktop puis mobile, avec clavier pour tous les contrôles :

1. Depuis `À lire`, commencer sans date puis avec une date ; vérifier qu’une seule expérience active apparaît.
2. Ajouter une pensée et un marque-page, terminer, puis confirmer que dates, écrit et progression restent attachés à cette lecture.
3. Depuis `En cours`, choisir `Arrêter pour l’instant` ; vérifier le retour à `À lire`, l’indication non culpabilisante, l’historique interrompu et la conservation de l’écrit.
4. Depuis `Lu`, choisir `Relire` ; écrire une nouvelle pensée et vérifier que le premier bilan reste inchangé et non modifiable.
5. Dans le Journal, vérifier que début, fin, interruption et écrit renvoient à la bonne expérience et gardent leur date.
6. Dans la Bibliothèque, vérifier que la grille reste compacte et que seule l’interruption ajoute le bref repère `À reprendre`.
7. Dans l’atelier, inspecter le cas importé sans date, le cas avec dates anciennes et l’historique long ; ouvrir les groupes supplémentaires par lots de cinq.
8. Vérifier les états vides, les textes longs, l’absence de débordement horizontal, les focus visibles, la fermeture des panneaux et la réduction du mouvement.

## Preuves automatisées

Les tests ciblés couvrent l’intention sans expérience, la fin puis la relecture sans écrasement, l’interruption avec conservation du marque-page, le rattachement des dates et traces, le conflit d’expériences actives importées, l’historique long, l’interface publique et l’import privé. La suite complète, le lint, la construction de production et `git diff --check` doivent être verts avant publication de la candidate.

## Suite

Cette candidate ne vaut ni validation ni synchronisation GitHub. Après recette et validation explicite, elle pourra être synchronisée sur sa branche dédiée. La fondation 3 — publication publique distincte de la mémoire privée — viendra ensuite.
