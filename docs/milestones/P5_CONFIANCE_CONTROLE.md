# Chapter — P5 : confiance et contrôle

Statut : **validé le 8 septembre 2026 sur la version Sites 66**

Dernière mise à jour : 8 septembre 2026.

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
- la carte de lecteur redevient l'objet principal de l'ouverture ; sa matière associe fibres, variations d'encre, double filet et profondeur légère pour évoquer un beau papier imprimé ;
- l'accueil aquarellé devient une alcôve secondaire face à la carte ; les Chapitres d'honneur forment ensuite un registre transversal autonome, puis les œuvres de chevet retrouvent un rôle calme ;
- listes et traces publiques partagent une composition éditoriale asymétrique : sommaire numéroté pour les chemins, fragments sur papier pour les critiques, puis empilement linéaire sur mobile.
- l'espace sous la carte devient un sommaire du portrait, utile sur desktop et masqué sur mobile, avec accès fluide au chevet, aux honneurs, aux listes et aux traces ;
- le nom public enregistré devient la source unique de la carte, des initiales de l'avatar, de ses libellés accessibles et des menus de compte desktop/mobile.
- la barre personnelle reprend strictement la géométrie de la barre visiteur — hauteur, marges, espacement et centrage — afin que la création du compte ne produise plus aucune réduction perceptible des titres ;
- l'illustration du Profil quitte la grande bannière : une véritable scène peinte à l'aquarelle, détourée sur transparence sans masque ni flou CSS, est ancrée dans l'angle supérieur droit puis fondue vers la page par un voile progressif ;
- l'ouverture du Profil devient un bandeau éditorial compact : l'accueil et l'aquarelle introduisent immédiatement la carte, les honneurs et les œuvres de chevet, sans hero surdimensionné ; listes et traces conservent ensuite leur respiration pleine largeur.
- l'import fusionne les lectures et traces reconnues sans effacer l'historique local absent de l'archive ; une critique contenue dans l'archive devient un brouillon privé et sa trace est explicitement marquée `Critique importée · privée`. Elle reste absente des critiques publiques et du Profil jusqu'à une nouvelle publication volontaire ; une critique déjà publique dans la session n'est jamais remplacée par l'import.
- l'export et l'import réussis déclenchent le retour temporaire global déjà utilisé pour les actions publiques, visible au-dessus de la carte de réglages et refermable ; une archive invalide conserve son explication contextualisée dans la section `Vos données`.
- l'accès au Profil depuis le menu du compte ferme désormais immédiatement ce menu ; réouvrir le Profil déjà affiché ne pousse plus une destination identique dans l'historique de retour.
- le sélecteur d'archive n'est réinitialisé qu'après la lecture du fichier, ce qui préserve l'import dans les navigateurs qui invalident tôt le fichier associé au champ.

## Données et limites

Les effets sont simulés dans la session frontend. L'export est réellement téléchargé par le navigateur et son import reconnaît le format `chapter-export` version 1, mais aucun stockage distant n'est impliqué. L'import ne restaure ni l'identité publique, ni les relations, ni les blocages : ces données sont présentes dans l'archive complète mais leur réactivation pourrait produire des effets publics ou relationnels sans geste actuel. La réauthentification de suppression est représentée par une vérification locale ; son contrôle serveur, les délais de conservation et la migration depuis des services tiers relèvent du lot 2. Les cas de fichiers extrêmes, erreurs réseau, audit exhaustif d'accessibilité et robustesse responsive relèvent de P6.

## Preuves avant recette

- tests P5 dédiés sur la composition, les frontières de confidentialité, le blocage transversal et le retour public après suppression ;
- non-régression P0 à P4 et historique lot 1 ;
- lint et construction réussis, **153/153 tests automatisés** et `git diff --check` sans erreur ;
- publication de la candidate sur le Site de recette existant sans synchronisation GitHub avant validation explicite.

## Validation finale

L'utilisateur valide explicitement la recette de la version Sites 66 le 8 septembre 2026. Le Profil, l'identité publique, les réglages superposés, les scrollbars, les mouvements, le blocage transversal et la portabilité privée sont acceptés dans leur état audité. P5 peut être synchronisé sur `refonte-pre-lot-2` ; `main` reste inchangé jusqu'à P7. P6 — États transversaux devient la prochaine tranche.
