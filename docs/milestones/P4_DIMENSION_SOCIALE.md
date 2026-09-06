# Chapter — P4 : dimension sociale

Statut : **candidate vérifiée, en attente de recette utilisateur**

Dernière mise à jour : 6 septembre 2026.

## Résultat évalué

P4 transforme une trace volontairement publique en chemin continu entre une œuvre, la voix qui l’a publiée, ses sélections et les conversations qu’elle ouvre. La consultation reste publique ; écrire, répondre ou suivre demeure un geste explicite.

## Périmètre de la candidate

- critiques et conversations intégrées aux fiches d’œuvre publiques, après « À propos » et avant les chemins voisins ;
- auteur et avatar de chaque critique ou réponse ouvrant un profil public réel ;
- profils de Maël, Lina, Théo et Inès consultables sans compte, avec œuvres de chevet, listes et traces publiques ;
- listes publiques autonomes, avec auteur, description, ordre éditorial et retour vers l’origine ;
- Recherche étendue aux lecteurs et aux listes sans retirer les résultats d’œuvres ;
- routes directes `/lecteurs/:actorId` et `/listes/:listId`, en complément des fiches `/oeuvres/:workId` et du profil public historique ;
- premier geste visible protégé par une identité publique minimale : nom non unique, photo facultative, reprise de l’action après validation ;
- contrat de visibilité affiché dans l’éditeur avant publication ; note privée, Journal et Bibliothèque explicitement séparés ;
- publication immédiate et annulable, critique réinjectée dans la page d’œuvre et dans le profil public au sein de la session ;
- réponses à plat, aperçu de la dernière réponse et développement local de la conversation.

## Corrections de recette

- les profils publics exposent toujours une action de retour, y compris lorsqu’ils sont ouverts directement ;
- œuvres, profils, listes et honneurs partagent une pile de navigation contextuelle : le retour restaure la destination exacte, l’entité affichée, l’URL et la position de défilement de la source ;
- les listes ouvertes depuis Recherche reviennent à Recherche et les œuvres ouvertes depuis Découvrir dans l’espace connecté reviennent à Découvrir ;
- l’aperçu d’une réponse sépare explicitement le nom de son auteur et le corps du message ;
- le mode d’accès et l’identité publique sont deux états indépendants : créer une identité minimale autorise les gestes publics sans faire apparaître Journal ou Bibliothèque. Seule l’entrée explicite dans l’espace personnel change la navigation principale.

## Choix de composition

La page d’œuvre reste le centre de gravité. Le social ne devient ni une racine supplémentaire de navigation, ni un fil général : la conversation naît sous une critique rattachée à une œuvre. La section publique adopte une composition en marge sur desktop et une colonne continue sur mobile. Les profils et listes conservent leurs silhouettes éditoriales validées tout en devenant accessibles depuis le parcours public refondu.

L’identité minimale n’est pas un onboarding complet. Elle intervient au moment précis où le lecteur tente de publier, répondre ou suivre. La confirmation ne publie aucun texte : elle restitue l’action en attente, et l’éditeur garde son propre bouton explicite « Publier ».

## Données et limites

Les œuvres, profils, critiques, réponses, listes et suivis restent des fixtures et un état local de session. Les permissions reposent sur les identifiants d’acteurs existants ; le nom public n’est jamais utilisé comme clé. L’authentification, la persistance, la modération opérationnelle, le blocage transversal et les réglages d’identité complets restent respectivement au lot 2 ou à P5. Les cas vides, erreurs, contenus extrêmes et l’audit exhaustif responsive/accessibilité relèvent de P6.

## Preuves automatisées de la candidate

- construction de production avec routes publiques œuvre, lecteur et liste ;
- tests P4 dédiés : recherche sociale, ordre de composition, conversations, reprise après identité et rendu direct ;
- non-régression P1 à P3 et tests historiques sociaux ;
- lint réussi, construction réussie, **132/132 tests automatisés** et `git diff --check` sans erreur avant publication sur le Site de recette.

Une candidate publiée ne vaut ni validation du jalon, ni synchronisation GitHub, ni fusion vers `main`.
