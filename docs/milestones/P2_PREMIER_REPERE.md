# Chapter — P2 : Premier repère

Dernière mise à jour : 5 septembre 2026.

Statut : **candidate complète et prête pour recette visuelle ; validation utilisateur en attente**.

## Résultat visible à évaluer

Depuis une fiche œuvre publique, une personne sans compte peut choisir `À lire`, `En cours` ou `Lu`, créer son compte au moment où cette conservation devient nécessaire, puis retrouver exactement l’œuvre et le statut qui ont déclenché l’inscription. Elle peut alors consigner un premier repère privé sans être conduite vers un questionnaire, un profil ou une action sociale.

Le parcours vertical est :

1. ouvrir une œuvre depuis Découvrir ou Recherche ;
2. activer `Ajouter au journal` et choisir un statut dans un sélecteur contextuel ;
3. créer un compte dans un dialogue qui rappelle l’œuvre et le statut en attente ;
4. revenir à la fiche avec le statut appliqué ;
5. écrire puis enregistrer un premier repère clairement identifié comme privé.

## Contrat d’interaction

- La fiche adopte l’ouverture historique P2–E2 : couverture généreuse, identité et action dans la première vue, puis récit éditorial.
- Le sélecteur de statut reprend AJ2 : ancré à l’action sur desktop et transformé en panneau bas court sur mobile.
- Fermer le sélecteur sans choisir ne modifie rien.
- Pour une personne non connectée, le statut choisi devient une intention en attente. Fermer l’inscription ne la détruit pas : la fiche l’affiche et permet de la reprendre.
- La création de compte simulée restaure l’œuvre, le statut et la position fonctionnelle ; elle ne demande ni goûts, ni photo, ni nom public, ni abonnement.
- Le premier repère est un écrit privé court attaché à l’œuvre. P2 prouve sa création ; l’édition complète des notes, la progression et les usages quotidiens restent à P3.
- Aucun changement de statut ou repère privé ne crée d’activité publique.
- L’état est simulé en mémoire de session avec les identifiants stables du catalogue ; aucune persistance ou authentification réelle n’est prétendue.

## Hors périmètre

- authentification, validation d’e-mail et persistance réelles ;
- Journal et Bibliothèque connectés, progression de lecture, dates, relecture et gestion complète des notes ;
- nom public, profil, critique, liste, abonnement ou conversation ;
- récupération de mot de passe, fournisseurs OAuth et erreurs réseau de production ;
- fusion vers `main` ou synchronisation GitHub avant validation explicite.

## Vérifications attendues

- le statut choisi avant inscription est restauré après création du compte simulée ;
- fermer puis reprendre l’inscription conserve l’œuvre et le statut en attente ;
- les trois statuts fonctionnent et peuvent être modifiés après activation ;
- le repère ne peut pas être enregistré vide et reste visible après enregistrement ;
- le retour vers Découvrir ou Recherche conserve le comportement P1 ;
- la route directe d’une œuvre rend le nouveau parcours ;
- le dialogue, le sélecteur et le repère sont utilisables au clavier et sur petit écran ;
- aucun contenu privé ou social futur n’est publié ou présenté comme disponible.

## Limites de la candidate

Le compte, le statut et le repère vivent uniquement dans l’état local de la page. Un rechargement les réinitialise. Cette limite est volontaire avant le backend du lot 2 et doit rester perceptible comme une simulation de parcours, jamais comme une promesse de sauvegarde réelle.

## Preuves avant recette

- construction de production réussie ;
- lint réussi ;
- 117 tests automatisés réussis, dont deux tests P2 consacrés à la restauration du statut, au repère privé et au responsive ;
- `git diff --check` réussi ;
- aucune recette navigateur n’est revendiquée : l’évaluation visuelle et tactile appartient à la recette utilisateur de cette candidate.
