# Chapter — P3 : usage personnel quotidien

Statut : **candidate vérifiée et mise à disposition — recette utilisateur attendue**

Dernière mise à jour : 6 septembre 2026.

## Résultat évalué

P3 transforme le premier repère de P2 en espace personnel utilisable au quotidien. La tranche relie désormais le Journal, la Bibliothèque et la page d’une œuvre autour d’un même état de session privé.

## Périmètre de la candidate

- accès connecté direct par `/journal` et `/bibliotheque` ;
- passage explicite du premier repère P2 vers le Journal sans perdre le statut ni la note ;
- Journal J2/O1/OM3/C1/E2 conservé, avec trois lectures en cours au maximum et chronologie personnelle ;
- Bibliothèque B2 de 500 œuvres, filtres et recherche immédiats, tris validés et chargement volontaire par lots de 36 cartes ;
- retour d’une page d’œuvre vers le Journal ou la Bibliothèque d’origine ;
- notes privées NP2/NSV2 accessibles depuis le Journal et la page d’œuvre ;
- progression manuelle facultative sous forme de marque-page, visible dans le Journal et la section personnelle de l’œuvre, jamais dans la grille de Bibliothèque ;
- relecture sur la même œuvre : une nouvelle étape personnelle est ouverte sans dupliquer la fiche ni l’élément de Bibliothèque ;
- dates facultatives SD2 et statuts AJ2 conservés.

## Choix P3 précisés par l’implémentation

Le marque-page contient uniquement la page actuelle. Le total de l’œuvre, testé dans une première candidate, a été retiré de la saisie et de l’affichage : il ajoutait une information secondaire et une zone textuelle parasite sans mieux servir le geste. Le repère n’est proposé que pour une lecture « En cours », ne génère pas de trace chronologique à chaque déplacement et disparaît de la lecture active lorsqu’elle est terminée. Chapter ne transforme donc pas la lecture en obligation de suivi.

Une relecture conserve le nombre de lectures terminées sur l’unique état privé de l’œuvre. « Relire cette œuvre » repasse l’œuvre « En cours », crée une entrée « Relecture commencée » et présente le rang de lecture dans le Journal. La prochaine fin incrémente le nombre de lectures terminées et crée « Relecture terminée ».

La Bibliothèque dense ne recourt pas au défilement infini. Trente-six œuvres sont rendues initialement ; l’utilisateur charge volontairement le lot suivant. Les filtres et la recherche portent toujours sur les 500 œuvres.

## Données et limites

La collection de 500 œuvres est une fixture déterministe de densité : six œuvres cœur conservent leur contenu éditorial, complétées par 494 notices de charge. L’état demeure local à la session ; le compte, le backend et la persistance distante restent au lot 2. Les critiques et interactions sociales ne sont pas étendues dans P3 et restent le périmètre de P4.

## Preuves automatisées de la candidate

- construction de production réussie avec les routes `/journal` et `/bibliotheque` ;
- tests P3 ciblés : densité progressive, marque-page, relecture et rendu direct des routes ;
- non-régression ciblée P1, P2 et parcours personnels historiques ;
- lint, 118 tests automatisés, construction complète et `git diff --check` réussis avant publication de la candidate.

La recette visuelle et tactile réelle reste distincte des preuves automatisées. La candidate publiée ne vaut ni validation de P3, ni synchronisation GitHub, ni fusion vers `main`.

## Reprise de recette

La première candidate conservait trop de la composition historique. La reprise applique une coquille personnelle harmonisée, relie Découvrir et Recherche aux surfaces refondues, distingue lectures actives, feuille de dernière trace et archives et densifie la Bibliothèque. Après recette, la feuille de dernière trace a été resserrée à la hauteur de son contenu puis simplifiée en une surface à contour unique et marge brique intérieure, sans traits superposés ou coupés. Le repère CSS a été remplacé par un véritable objet transparent en carton ivoire et cordon textile brique ; il est placé latéralement aux informations de lecture sur Journal comme sur la fiche d’œuvre. Seule la page actuelle est inscrite sur l’objet en HTML net et accessible. La Bibliothèque remplie ne reçoit pas d’illustration supplémentaire : ses couvertures assurent déjà sa présence visuelle sans transformer chaque destination en démonstration d’asset. Le nouveau lecteur conserve un état vierge, distinct de la persona dense. Le retour contextuel restaure la position. Recette utilisateur attendue.
