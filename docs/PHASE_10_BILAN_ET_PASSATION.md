# Phase 10 — Bilan de recette et préparation de la passation

Dernière mise à jour : 27 août 2026.

## Statut exact

La phase 10 est implémentée et publiée. Aucun arbitrage de conception de son périmètre validé ne reste ouvert. Sa validation fonctionnelle globale par l'utilisateur est encore attendue : ce document prépare la clôture, il ne l'atteste pas.

L'utilisateur souhaite terminer la phase 10 dans la conversation actuelle, puis entamer la phase 11 dans un autre chat du même projet. Ne pas ouvrir ni implémenter la phase 11 dans cette conversation.

## Référence publiée et documents à lire

- Dernier jalon fonctionnel : version 22, HDE1, publiée avec succès.
- Source de ce jalon : `551801dd62a0032fb08f96ea9989395703c44317`.
- Lire `../AGENTS.md`, `CHAPTER_DECISIONS.md`, puis `PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md`.
- La recette exhaustive est décrite dans `PHASE_10_IMPLEMENTATION_CHECKLIST.md`. Ses cases ne doivent pas être cochées sur la seule base d'un test automatisé ou d'un retour utilisateur limité à une anomalie.

## Périmètre livré

| Ensemble | État livré à préserver |
| --- | --- |
| Découvrir | Chemins éditoriaux, intentions, recherche exacte et correspondances approchées, ajout à lire réversible, liens vers œuvres/listes/profils. |
| Profils | Carte blanc cassé, poinçon fourni, nom libre N1b, ouverture PDR1B puis listes et traces pleine largeur. |
| Photo PFP1 | Source originale conservée, recadrage réversible, import sans faux cadre noir, suppression hors de la carte. |
| Carte QR1 | Retournement 440 ms, commande de face fixe, copie et partage extérieurs, QR statique local, route de portrait public sans commandes propriétaires. |
| Honneurs | HDE1 : honneurs singuliers acquis en ouverture, quatre colonnes de familles sur desktop ; sur mobile, acquis à gauche et prochain à droite, détail HMT1 sous la paire. |
| Relations et conversations | Abonnement réversible, priorité relationnelle, réponses à plat, édition/suppression de ses réponses, fermeture/réouverture et signalement/blocage simulés. |
| Navigation | Le logo Chapter revient au Journal ; aucune page d'accueil supplémentaire n'est demandée. |

## Contrôles et limites de preuve

- Au dernier jalon publié : construction de production réussie, lint réussi, typage ciblé des composants HDE1 réussi et quinze tests automatisés réussis.
- Pour cette préparation de clôture : lint et quinze tests relancés avec succès sur la source fonctionnelle inchangée. Aucune nouvelle construction ni publication n'était nécessaire pour cette mise à jour documentaire.
- Ces tests couvrent des fonctions de regroupement, des invariants de source, les assets et le rendu serveur ; ils ne constituent pas un test navigateur complet des interactions ou du responsive.
- Le contrôle TypeScript global reste bloqué par des déclarations Cloudflare absentes dans l'infrastructure existante : `cloudflare:workers`, `Fetcher`, `D1Database`. Ne pas présenter le typage global comme réussi.
- Les retours utilisateur ont permis de corriger plusieurs anomalies de recherche, profil, photo, badges et sélecteur de date. Ils ne constituent pas une validation implicite de toutes les cases de la checklist.

## Dernière recette de phase 10

Reprendre uniquement les points de la checklist qui ne sont pas encore vérifiés par l'utilisateur ; ne pas imposer la répétition intégrale de tous les correctifs déjà confirmés.

1. Découvrir : recherche exacte/approchée/vide, intention, ouverture des œuvres, ajout et annulation.
2. Relations et listes : suivre/ne plus suivre Lina depuis plusieurs points d'entrée, ouvrir chacune de ses deux listes, retrouver le bon profil au retour.
3. Conversations : développer, répondre, modifier/supprimer sa réponse, vérifier les commandes selon l'auteur, fermer/rouvrir sa conversation et les retours simulés de signalement/blocage.
4. Profil et photo : composition desktop/mobile, importer → recadrer → enregistrer → recadrer à nouveau, annuler et retirer sans déformer la carte.
5. QR : retourner, copier/partager, scanner depuis un appareil autorisé, constater l'absence de commandes propriétaires sur la route obtenue, revenir au recto à la réouverture du profil.
6. Honneurs : hiérarchie HDE1, colonnes/paires, passage entre familles et honneurs, fermeture des fiches, équipement du titre et limite de trois badges exposés, confidentialité publique.
7. Régression essentielle : navigation, retours, statut En cours/Lu et panneau de date visible ; aucun blocage ni page blanche.

Les cas sans honneur ou avec un nom modifié nécessitent des fixtures et ne sont pas tous pilotables par l'interface actuelle. Ne pas demander à l'utilisateur de créer un profil ou de modifier les données dans le code pour terminer sa recette. L'audit exhaustif des cas extrêmes et de l'accessibilité reste le travail de phase 11.

## Limites du prototype maintenues

Retour de recette supplémentaire du 27 août : l'état « Suivi » du profil est désormais gris clair à texte brique ; les commandes de conversation disposent d'un espacement indépendant de l'indentation mobile. Vérification et publication en cours. Deux cas ciblés sont ajoutés à la checklist ; la clôture globale reste attendue.

Dans les critiques, Lina est le seul auteur disposant d'un profil visiteur raccordé. Théo et Inès restent des contenus d'exemple ; aucune nouvelle destination n'a été autorisée dans ce correctif.

Les données sont simulées et les interactions sont locales à la session. La confidentialité décrite est celle des vues du prototype, pas une garantie de sécurité backend. Le QR utilise la route de démonstration de Maël et respecte l'accès configuré du Site ; il ne promet pas un accès anonyme depuis n'importe quel appareil.

L'authentification réelle, l'onboarding, la persistance distante, les notifications complètes, la messagerie privée, les listes collaboratives, les classements, le moteur réel de recommandation et l'administration complète restent exclus. Aucun de ces sujets n'est automatiquement ajouté à la phase 11.

## Reprise dans le prochain chat

Après validation finale de phase 10 seulement, mettre les statuts de clôture à jour ici et dans les deux documents de référence. Le prochain chat pourra ensuite cadrer la phase 11 : audit des états transversaux, cohérence, responsive, accessibilité et bilan technique, puis corrections après autorisation.

Le report historique de fermeture du menu de compte en phase 11 a été traité au cours des correctifs précédents : vérifier sa non-régression, sans supposer que la fonctionnalité reste à développer. Préserver tous les choix validés PDR1B, PFP1, N1b, QR1, HDE1, HV1 et HMT1, ainsi que les dessins des insignes et le poinçon fourni.
