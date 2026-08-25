# Chapter — règles de continuité du projet

Ces règles s’appliquent à toute conversation, tout chat et tout agent travaillant dans ce dépôt.

## Mémoire documentaire obligatoire

- Avant de proposer ou de modifier une décision produit, UX, UI ou frontend, lire `docs/CHAPTER_DECISIONS.md`, le document de la phase active et l’état du dépôt.
- Après chaque interaction qui valide, précise, révise ou abandonne une décision, mettre à jour avant la fin du tour :
  1. `docs/CHAPTER_DECISIONS.md`, source de vérité transversale ;
  2. le document détaillé de la phase active.
- Ne jamais considérer l’historique d’un chat comme l’unique mémoire du projet.
- Lorsqu’une décision en révise une autre, signaler explicitement le remplacement dans les documents au lieu de conserver deux règles contradictoires.
- Maintenir les statuts, arbitrages ouverts et dates de mise à jour cohérents entre les documents.

## Méthode de travail

- Respecter le cycle : discussion → analyse UX → proposition → ajustements → validation explicite → implémentation.
- Lorsqu’un utilisateur valide un arbitrage et demande de continuer ou d’avancer, consigner ce choix puis présenter directement dans la même réponse l’arbitrage suivant, précédé seulement du contexte indispensable. Éviter un tour intermédiaire limité à l’accusé de réception.
- Ne pas implémenter, publier, pousser ou déployer une solution encore en arbitrage sans autorisation explicite.
- Pour toute décision comportant plusieurs rendus ou états visibles, présenter une comparaison visuelle dans le même ordre que les options textuelles avant de demander un choix.
- Pendant les échanges de conception, ne pas terminer les réponses par une redirection vers le site. Partager le site uniquement lors d’un jalon d’implémentation ou d’évaluation.
- Accompagner chaque jalon final d’une checklist exhaustive de validation.
