# Chapter — instructions essentielles pour les agents

Ce fichier est chargé automatiquement. Il reste volontairement court : les détails sont lus seulement lorsqu'ils concernent la tâche.

## Démarrage minimal

- Exécuter `bash scripts/agent-context.sh summary` avant une tâche produit, UX, UI, frontend ou documentaire liée à l'état du projet.
- Ne pas lire intégralement `docs/product/CHAPTER_DECISIONS.md` ni un long journal de phase par défaut. Consulter d'abord `docs/agents/AGENT_CONTEXT.md`, puis utiliser son routage et `rg` pour ne charger que les sections utiles.
- Vérifier l'état Git avant toute modification et préserver tout travail sans rapport avec la demande.

## Travail et mémoire

- Une demande de correctif ou d'implémentation autorise une réalisation candidate directe. Demander un arbitrage seulement si une ambiguïté produit ou visuelle changerait matériellement le résultat.
- Une candidate visuelle complète et vérifiée est mise directement à disposition sur le Site de recette, sans demande intermédiaire. Cette mise à disposition n'autorise ni validation du jalon, ni synchronisation GitHub, ni fusion.
- Après une décision validée, révisée ou abandonnée, mettre à jour l'état compact, la section pertinente du journal transversal et le document de phase. Signaler explicitement tout remplacement de décision.
- Le dépôt est la mémoire durable ; le chat n'est qu'un complément. Ne pas dupliquer un même détail dans plusieurs fichiers : résumer et pointer vers la source détaillée.
- Pour une comparaison de rendus visibles, présenter les visuels dans le même ordre que les options. Un jalon final reçoit une checklist exhaustive.

## Vérification et actions externes

- Exécuter d'abord les tests ciblés, puis les vérifications complètes adaptées au périmètre. Distinguer preuve automatisée, inspection statique et recette navigateur réelle.
- La mise à disposition des candidates sur le Site de recette est autorisée durablement ; préserver son accès existant et ne jamais en déduire une validation. Toute autre publication, modification de visibilité ou action destructive exige son autorisation propre.
- La version Sites 31 clôt la phase 11 et le lot 1. La refonte pré-lot 2 se développe sur `refonte-pre-lot-2`, jamais à moitié sur `main`.
- Après validation explicite d'un jalon P0 à P6, synchroniser uniquement son périmètre accepté sur `refonte-pre-lot-2`, sans force-push ni réécriture, puis vérifier la référence distante. La fusion vers `main` attend la validation de la recette P7. Suivre `docs/agents/AGENT_WORKFLOW.md`.

## Références à la demande

- État, invariants et routage : `docs/agents/AGENT_CONTEXT.md`
- Doctrine et feuille de route de la refonte : `docs/product/REFONTE_PRE_LOT_2.md`
- Contrat actif de P1 : `docs/milestones/P1_PREMIER_CONTACT_PUBLIC.md`
- Procédures de travail, tests, GitHub et publication : `docs/agents/AGENT_WORKFLOW.md`
- Carte du code : `docs/engineering/CODEMAP.md`
- Recherche et stratégie de tokens : `docs/agents/AI_AGENT_CONTEXT_STRATEGY.md`
