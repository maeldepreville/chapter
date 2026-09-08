# Chapter — P5 : confiance et contrôle

Statut : **candidate ajustée publiée pour recette sur la version Sites 57**

Dernière mise à jour : 7 septembre 2026.

## Résultat à évaluer

P5 rassemble les garanties qui permettent de confier durablement son histoire de lecteur à Chapter : identité publique maîtrisée, frontière lisible entre privé et public, blocage transversal, archive complète, import privé et suppression réauthentifiée.

## Périmètre de la candidate

- grande carte superposée `Réglages et données`, accessible depuis le menu du compte sur desktop et mobile et directement par `/reglages`, sans quitter la section active ;
- nom public modifiable indépendamment de l'identifiant interne, photo toujours facultative et accès au recadrage existant ;
- registre de confidentialité distinguant Journal, Bibliothèque, notes privées et publications volontaires ;
- blocage porté au niveau de la session : un compte bloqué disparaît des critiques et réponses, ses profils et listes deviennent des surfaces masquées, le suivi est interrompu ;
- liste centralisée des comptes bloqués avec déblocage ;
- export JSON lisible de la bibliothèque, du Journal, des notes, publications, relations et blocages ;
- réimport de cette archive dans l'espace privé uniquement, sans republier les contenus publics qu'elle contient ;
- suppression protégée par mot de passe et saisie de `SUPPRIMER`, puis retour réel à la visite publique avec effacement de l'état personnel simulé ;
- déconnexion désormais active, sans suppression des données de session.

## Composition

L'espace adopte une densité utilitaire dans une grande carte fermable posée au-dessus de la fenêtre active. Une marge-index stable sur desktop devient une bande horizontale sur mobile, où le panneau occupe l'écran sans modifier la navigation sous-jacente. Chaque famille de contrôle forme un chapitre séparé par un filet : identité, confidentialité, relations, portabilité et suppression. La zone destructive reste en dernier et ne partage pas la même emphase que les actions courantes.

## Ajustements de recette

- après le premier repère, la navigation connectée conserve la taille des libellés publics, le filet brique de la section active et sa transition d'opacité ;
- `Réglages et données` n'est plus une destination plein écran : la fenêtre courante reste visible derrière une grande carte fermable par croix, clic extérieur ou Échap ;
- la route directe `/reglages` ouvre cette même carte au-dessus du Journal ;
- sur mobile, la carte devient un panneau plein écran scrollable et conserve une fermeture accessible.
- toutes les zones de défilement utilisent une poignée crème fine, arrondie et discrète, avec une piste transparente et un état de survol plus soutenu sur les dispositifs qui le permettent ;
- la gouttière de la page reste stable : le menu de compte ne verrouille plus inutilement le scroll sur desktop et les fenêtres modales ne déplacent plus le header ni le contenu sous-jacent ;
- les panneaux scrollables arrondis contiennent leur propre défilement et éloignent la piste de leurs angles afin d'éviter tout coin droit parasite.
- la fermeture des réglages occupe désormais une barre persistante dédiée et ne recouvre plus le contenu pendant le défilement ;
- l'index latéral colore en brique la section réellement visible, reprend ce signal au survol et anime nativement les déplacements demandés tout en respectant la réduction des mouvements ;
- après enregistrement d'une photo recadrée, les boutons de compte desktop et mobile affichent immédiatement cette photo à la place des initiales.
- la création du compte privé minimal révèle désormais la coque personnelle et son bouton de profil dès la validation, tout en conservant sur place l'étape du premier repère ; l'ouverture suivante du Journal ou de la Bibliothèque ne provoque plus de réduction tardive de la navigation ;
- le Profil propriétaire reçoit un seuil d'accueil distinct, illustré comme un coin de lecture habité, tandis que le portrait public reste inchangé ; la carte de lecteur conserve son rôle signature et l'ouverture PDR1B validée ;
- les listes et critiques du Profil propriétaire adoptent un rythme plus posé, avec des titres moins monumentaux et une lecture latérale sur desktop qui redevient linéaire sur mobile.
- la barre personnelle reprend strictement la géométrie de la barre visiteur — hauteur, marges, espacement et centrage — afin que la création du compte ne produise plus aucune réduction perceptible des titres ;
- l'illustration du Profil quitte la grande bannière : une véritable scène peinte à l'aquarelle, détourée sur transparence sans masque ni flou CSS, est ancrée dans l'angle supérieur droit puis fondue vers la page par un voile progressif ;
- l'ouverture du Profil devient un bandeau éditorial compact : l'accueil et l'aquarelle introduisent immédiatement la carte, les honneurs et les œuvres de chevet, sans hero surdimensionné ; listes et traces conservent ensuite leur respiration pleine largeur.

## Données et limites

Les effets sont simulés dans la session frontend. L'export est réellement téléchargé par le navigateur et son import reconnaît le format `chapter-export` version 1, mais aucun stockage distant n'est impliqué. La réauthentification de suppression est représentée par une vérification locale ; son contrôle serveur, les délais de conservation et la migration depuis des services tiers relèvent du lot 2. Les cas de fichiers extrêmes, erreurs réseau, audit exhaustif d'accessibilité et robustesse responsive relèvent de P6.

## Preuves avant recette

- tests P5 dédiés sur la composition, les frontières de confidentialité, le blocage transversal et le retour public après suppression ;
- non-régression P0 à P4 et historique lot 1 ;
- lint et construction réussis, **146/146 tests automatisés** et `git diff --check` sans erreur ;
- publication de la candidate sur le Site de recette existant sans synchronisation GitHub avant validation explicite.

La version Sites 57 est publiée avec l'accès existant le 8 septembre 2026. Elle conserve la navigation validée et recompose le rythme du Profil autour d'un bandeau d'accueil compact et de l'aquarelle progressivement fondue dans l'angle supérieur droit. Cette mise à disposition ne vaut ni validation de P5, ni synchronisation GitHub.
