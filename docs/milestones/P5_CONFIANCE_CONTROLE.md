# Chapter — P5 : confiance et contrôle

Statut : **candidate publiée pour recette sur la version Sites 50**

Dernière mise à jour : 7 septembre 2026.

## Résultat à évaluer

P5 rassemble les garanties qui permettent de confier durablement son histoire de lecteur à Chapter : identité publique maîtrisée, frontière lisible entre privé et public, blocage transversal, archive complète, import privé et suppression réauthentifiée.

## Périmètre de la candidate

- nouvel espace `Réglages et données`, accessible depuis le menu du compte sur desktop et mobile et directement par `/reglages` ;
- nom public modifiable indépendamment de l'identifiant interne, photo toujours facultative et accès au recadrage existant ;
- registre de confidentialité distinguant Journal, Bibliothèque, notes privées et publications volontaires ;
- blocage porté au niveau de la session : un compte bloqué disparaît des critiques et réponses, ses profils et listes deviennent des surfaces masquées, le suivi est interrompu ;
- liste centralisée des comptes bloqués avec déblocage ;
- export JSON lisible de la bibliothèque, du Journal, des notes, publications, relations et blocages ;
- réimport de cette archive dans l'espace privé uniquement, sans republier les contenus publics qu'elle contient ;
- suppression protégée par mot de passe et saisie de `SUPPRIMER`, puis retour réel à la visite publique avec effacement de l'état personnel simulé ;
- déconnexion désormais active, sans suppression des données de session.

## Composition

L'espace adopte une densité utilitaire et non une succession de cartes. Une marge-index stable sur desktop devient une bande horizontale sur mobile. Chaque famille de contrôle forme un chapitre séparé par un filet : identité, confidentialité, relations, portabilité et suppression. La zone destructive reste en dernier et ne partage pas la même emphase que les actions courantes.

## Données et limites

Les effets sont simulés dans la session frontend. L'export est réellement téléchargé par le navigateur et son import reconnaît le format `chapter-export` version 1, mais aucun stockage distant n'est impliqué. La réauthentification de suppression est représentée par une vérification locale ; son contrôle serveur, les délais de conservation et la migration depuis des services tiers relèvent du lot 2. Les cas de fichiers extrêmes, erreurs réseau, audit exhaustif d'accessibilité et robustesse responsive relèvent de P6.

## Preuves avant recette

- tests P5 dédiés sur la composition, les frontières de confidentialité, le blocage transversal et le retour public après suppression ;
- non-régression P0 à P4 et historique lot 1 ;
- lint et construction réussis, **140/140 tests automatisés** et `git diff --check` sans erreur ;
- publication de la candidate sur le Site de recette existant sans synchronisation GitHub avant validation explicite.

La version Sites 50 est publiée avec l'accès existant le 7 septembre 2026. Cette mise à disposition ouvre la recette visuelle mais ne vaut ni validation de P5, ni synchronisation GitHub.
