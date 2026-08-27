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
- Phase 11, consigne du 27 août 2026 : l'utilisateur valide le premier ensemble mais demande plusieurs étapes avant un jalon regroupé. Ne pas déployer la version 25 ni publier chaque sous-étape. Attendre l'accord sur le jalon regroupé ; la synchronisation GitHub des éléments validés reste distincte.

## Synchronisation GitHub après validation d'un jalon

- À chaque validation explicite d'un jalon par l'utilisateur, synchroniser dans le même tour le code, les assets, les tests et les documents correspondant au jalon accepté vers `https://github.com/maeldepreville/chapter.git`, branche `main` (remote `github`). Cette demande constitue une autorisation permanente pour ces synchronisations, tant que la cible et le périmètre ne changent pas.
- **Méthode par défaut confirmée le 27 août 2026 : synchronisation directe par l'agent, sans bundle ni commandes à faire exécuter à l'utilisateur.** Utiliser les accès GitHub configurés : `git push` si Git dispose d'une authentification adaptée, ou la connexion GitHub intégrée. L'absence d'identifiants dans le terminal ne signifie pas que le connecteur GitHub est indisponible.
- Pour de nouveaux commits publiés par le connecteur, partir de la référence distante vérifiée, créer les objets nécessaires au seul périmètre accepté, mettre à jour la branche sans forcer, puis récupérer ces mêmes commits localement. Vérifier l'égalité du contenu préparé et de l'arbre envoyé ainsi que la concordance des références. Ne pas recréer sous de nouveaux identifiants des commits existants à préserver ; ne pas écraser des changements locaux ou distants.
- Le bundle de phase 10 était un transfert exceptionnel d'historiques existants à conserver à l'identique. Il ne définit pas la procédure des futurs jalons. En cas de blocage réel de la synchronisation directe ou de préservation de l'historique, l'expliquer et demander l'accord de l'utilisateur avant de proposer un nouveau transfert manuel ; ne jamais le réintroduire par défaut.
- Mettre d'abord à jour les documents de décision et de clôture, puis vérifier l'état du dépôt et récupérer l'état distant avant l'envoi. Préserver tout travail sans rapport avec le jalon ; ne pas l'inclure par défaut.
- Ne pas confondre publication Sites, envoi vers `origin` et synchronisation GitHub. Vérifier explicitement après l'envoi que `refs/heads/main` sur GitHub pointe sur le commit attendu, puis confirmer le résultat à l'utilisateur.
- Ne jamais forcer un push, réécrire l'historique distant, contourner une branche protégée ni réutiliser des identifiants hors de leur usage configuré. En cas de divergence, de refus d'accès ou d'authentification manquante, signaler le blocage et demander la direction nécessaire sans prétendre que la synchronisation est faite.
- Cette règle reste applicable dans les futurs chats du projet. Elle n'autorise ni développement non validé, ni nouveau déploiement, ni changement de visibilité du dépôt.
