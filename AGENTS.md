# Chapter — instructions essentielles pour les agents

Ce fichier est chargé automatiquement. Il reste volontairement court : les détails sont lus seulement lorsqu'ils concernent la tâche.

## Démarrage minimal

- Exécuter `bash scripts/agent-context.sh summary` avant une tâche produit, UX, UI, frontend ou documentaire liée à l'état du projet.
- Ne pas lire intégralement `docs/CHAPTER_DECISIONS.md` ni un long journal de phase par défaut. Consulter d'abord `docs/AGENT_CONTEXT.md`, puis utiliser son routage et `rg` pour ne charger que les sections utiles.
- Vérifier l'état Git avant toute modification et préserver tout travail sans rapport avec la demande.

## Travail et mémoire

- Une demande de correctif ou d'implémentation autorise une réalisation candidate directe. Demander un arbitrage seulement si une ambiguïté produit ou visuelle changerait matériellement le résultat.
- Une implémentation candidate n'autorise pas sa validation, sa synchronisation GitHub ou son déploiement.
- Après une décision validée, révisée ou abandonnée, mettre à jour l'état compact, la section pertinente du journal transversal et le document de phase. Signaler explicitement tout remplacement de décision.
- Le dépôt est la mémoire durable ; le chat n'est qu'un complément. Ne pas dupliquer un même détail dans plusieurs fichiers : résumer et pointer vers la source détaillée.
- Pour une comparaison de rendus visibles, présenter les visuels dans le même ordre que les options. Un jalon final reçoit une checklist exhaustive.

## Vérification et actions externes

- Exécuter d'abord les tests ciblés, puis les vérifications complètes adaptées au périmètre. Distinguer preuve automatisée, inspection statique et recette navigateur réelle.
- Ne pas publier, déployer, modifier la visibilité ou effectuer une action destructive sans l'autorisation correspondante.
- La version Sites 31 clôt la phase 11 et le lot 1. La refonte pré-lot 2 se développe sur `refonte-pre-lot-2`, jamais à moitié sur `main`.
- Après validation explicite d'un jalon P0 à P6, synchroniser uniquement son périmètre accepté sur `refonte-pre-lot-2`, sans force-push ni réécriture, puis vérifier la référence distante. La fusion vers `main` attend la validation de la recette P7. Suivre `docs/AGENT_WORKFLOW.md`.

## Références à la demande

- État, invariants et routage : `docs/AGENT_CONTEXT.md`
- Doctrine et feuille de route de la refonte : `docs/REFONTE_PRE_LOT_2.md`
- Contrat actif de P0 : `docs/P0_FONDATIONS_PROTOTYPE.md`
- Procédures de travail, tests, GitHub et publication : `docs/AGENT_WORKFLOW.md`
- Carte du code : `docs/CODEMAP.md`
- Recherche et stratégie de tokens : `docs/AI_AGENT_CONTEXT_STRATEGY.md`
