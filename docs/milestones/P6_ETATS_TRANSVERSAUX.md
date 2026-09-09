# Chapter — P6 : états transversaux

Statut : **candidate auditée visuellement sur la version Sites 71**

Dernière mise à jour : 9 septembre 2026.

## Résultat à évaluer

P6 rend les parcours P1 à P5 robustes lorsque les données manquent, arrivent, échouent ou dépassent les formats habituels. La tranche ne redessine pas les écrans validés : elle leur donne des issues exactes, lisibles et récupérables sur desktop, mobile, au clavier et avec le mouvement réduit.

## Périmètre de la candidate

- états globaux de chargement, erreur récupérable et page absente dans la grammaire éditoriale de Chapter ;
- routes inconnues d'œuvre, de lecteur et de liste dirigées vers la vraie page absente, sans substitution silencieuse par une autre entité ;
- lien d'évitement « Aller au contenu », cible principale focalisable et indication de la destination Recherche active ;
- libellé accessible du logotype mobile aligné sur son action réelle ;
- chargement annoncé aux technologies d'assistance, squelette non verbal et animation supprimée avec `prefers-reduced-motion` ;
- protection des titres, noms, textes, nombres et mots sans espace dans le scénario de contenus extrêmes ;
- atelier isolé `/recette/p6`, absent de la navigation produit, pour observer les scénarios `Normal`, `Vide`, `Chargement`, `Erreur` et `Contenus extrêmes` sans altérer l'application normale ;
- conservation des états vides déjà propres à Journal, Bibliothèque, Découvrir, Recherche, profils, listes, critiques et honneurs ;
- conservation des 500 œuvres de la Bibliothèque, du chargement volontaire par lots et des comportements de couverture en chargement/échec.

## Ajustements issus de la recette

- les couvertures typographiques de Journal, Bibliothèque, Profil et des parcours publics réservent des zones distinctes au titre et à l'auteur, avec césure et troncature bornées ; un voile commun garantit le contraste sur chacune des six teintes ;
- la sortie partagée des menus, popovers, retours temporaires et modales conserve son opacité nulle jusqu'au démontage, supprimant la réapparition d'une trame observée à la fermeture ;
- les traces publiques longues du Profil restent des aperçus bornés sans commande de dépliage ; leur titre ouvre la fiche de l'œuvre, où la critique complète conserve `Lire la suite` et `Réduire`.
- l'audit visuel navigué transforme les absences globales de Journal, Bibliothèque, Découvrir et Recherche en seuils éditoriaux contextualisés, sans proposer d'action quand le catalogue vide ne lui donnerait aucune issue ;
- les absences secondaires du Profil et des listes publiques conservent l'intention de la section au lieu d'une ligne technique isolée ; le croquis de Recherche ne crée plus de débordement horizontal.
- l'état vide global du Journal reprend le centrage de celui de la Bibliothèque ; sur mobile, les grandes cartes de Réglages, Chapitres d'honneur et listes publiques conservent désormais un retrait sûr, leur bord et leurs coins, au lieu de se confondre avec l'écran.

## Ce qui doit être visible

Dans l'application normale, la composition P1 à P5 reste inchangée. Un lien clavier apparaît uniquement lorsqu'il reçoit le focus. Une adresse inconnue affiche désormais un feuillet d'indisponibilité explicite avec retour vers Découvrir.

Dans `/recette/p6`, un bandeau sombre de recette permet de changer de scénario :

- `Vide` ouvre un Journal sans œuvre ni trace ; la navigation permet ensuite d'observer Bibliothèque, Découvrir et Recherche sans données inventées ;
- `Chargement` conserve la silhouette d'une page Chapter grâce à un squelette calme ;
- `Erreur` explique que les données restent intactes et propose une nouvelle tentative ;
- `Contenus extrêmes` injecte titres et noms longs, mot sans espace, compteurs élevés, douze relectures, page 9 999, note et critique longues ;
- `Normal` revient à l'état connecté de référence.

## Ce qui ne doit pas être interprété comme livré

- le bandeau de recette n'appartient pas au produit et n'apparaît sur aucune route normale ;
- aucune panne réseau réelle n'est simulée : le backend, sa latence, ses reprises et ses erreurs restent au lot 2 ;
- les données de contenus extrêmes sont des fixtures de contrôle, non un nouveau catalogue ;
- les preuves statiques et automatisées ne constituent pas une recette réelle avec lecteur d'écran, Safari, zoom navigateur ou préférence système de réduction des mouvements.

## Checklist de recette utilisateur

1. Ouvrir `/recette/p6` sur desktop et parcourir les cinq scénarios depuis le bandeau.
2. Dans `Vide`, ouvrir successivement Journal, Bibliothèque, Découvrir et Recherche ; vérifier qu'aucune œuvre de remplacement n'est inventée et que chaque sortie proposée mène à une action réelle.
3. Dans `Chargement`, vérifier la stabilité de la silhouette, l'absence de saut de mise en page et la lisibilité de l'en-tête.
4. Dans `Erreur`, choisir `Réessayer` et vérifier le retour à l'état normal ; tester aussi `Revenir à Découvrir`.
5. Dans `Contenus extrêmes`, parcourir Journal, Bibliothèque et une fiche œuvre ; vérifier les césures, hauteurs, actions, page 9 999, note longue et critique longue.
6. Refaire les scénarios à largeur mobile ; vérifier l'absence de défilement horizontal parasite et l'accès à tous les boutons du bandeau.
7. Au clavier, utiliser Tab depuis le haut de page : `Aller au contenu` doit apparaître, recevoir un focus visible et atteindre le contenu principal.
8. Ouvrir une URL d'œuvre, de lecteur puis de liste inexistante ; vérifier qu'aucune entité réelle n'est affichée à sa place.
9. Activer la réduction des mouvements au niveau du système, recharger `Chargement` et vérifier l'absence de balayage animé ; les autres changements de surface doivent devenir immédiats.
10. Vérifier que les routes normales ne montrent jamais le bandeau de recette et que leurs compositions validées n'ont pas changé.

## Preuves avant recette

- construction de production réussie avec `/recette/p6` et les frontières globales ;
- lint réussi ;
- **162/162 tests automatisés réussis**, dont les contrôles P6 des états vides, de structure et de contraste, les régressions de transition, ainsi que la non-régression P0 à P5 et du lot 1 ;
- `git diff --check` sans erreur ;
- audit navigateur réalisé sur l'atelier P6 : Journal, Bibliothèque, Découvrir, Recherche, Profil, liste publique, chargement, erreur et page absente parcourus visuellement ; les familles de cartes mobiles ont aussi été inventoriées et leurs contrats responsifs contrôlés ; la validation utilisateur reste requise.

## Suite

La candidate reste hors de GitHub tant que l'utilisateur ne valide pas explicitement P6. Après validation, son périmètre sera synchronisé sur `refonte-pre-lot-2`. P7 portera ensuite la recette complète et la décision de fusion vers `main`.
