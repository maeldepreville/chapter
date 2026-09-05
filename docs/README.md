# Chapter — documentation du projet

La documentation est organisée par fonction. Ce fichier est le seul index global ; aucun document ne doit être copié dans plusieurs dossiers pour faciliter sa découverte.

## Démarrage rapide

Un nouveau chat ou agent commence par :

```bash
npm run context
git status --short --branch
```

Le résumé actif se trouve dans [`agents/AGENT_CONTEXT.md`](./agents/AGENT_CONTEXT.md). Il indique ensuite le minimum à lire selon la tâche. Le long journal de décisions reste interrogeable et ne doit pas être chargé entièrement par défaut.

## Arborescence

```text
docs/
├── agents/       contexte, procédures et stratégie des agents
├── product/      doctrine, décisions et croissance produit
├── design/       système visuel et briefs d'assets
├── engineering/  carte du code et contrats de données simulées
├── milestones/   jalon actif P1, P0 validé et archives des phases 2 à 11
└── operations/   procédures historiques de transfert et d'exploitation
```

## Agents et orchestration

- [`agents/AGENT_CONTEXT.md`](./agents/AGENT_CONTEXT.md) — état actif, invariants, routage et prochaine action.
- [`agents/AGENT_WORKFLOW.md`](./agents/AGENT_WORKFLOW.md) — orchestration unique des implémentations, validations, synchronisations GitHub et publications Sites.
- [`agents/AI_AGENT_CONTEXT_STRATEGY.md`](./agents/AI_AGENT_CONTEXT_STRATEGY.md) — stratégie de contexte progressif, mesures et limites.

Il n'existe pas de `ORCHESTRATOR.md` séparé : `AGENT_WORKFLOW.md` porte volontairement cette responsabilité afin d'éviter deux procédures concurrentes.

## Produit

- [`product/REFONTE_PRE_LOT_2.md`](./product/REFONTE_PRE_LOT_2.md) — doctrine validée et feuille de route P0 à P7.
- [`product/CHAPTER_DECISIONS.md`](./product/CHAPTER_DECISIONS.md) — archive transversale recherchée de façon ciblée.
- [`product/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md`](./product/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md) — acquisition, activation, rétention et garde-fous.

## Design

- [`design/ASSET_SYSTEM.md`](./design/ASSET_SYSTEM.md) — direction, échelle, hiérarchie et checklist des assets.
- [`design/PROMPT_PRODUCTION_BADGES_CHAPTER.md`](./design/PROMPT_PRODUCTION_BADGES_CHAPTER.md) — brief historique des badges de production.

## Ingénierie

- [`engineering/CODEMAP.md`](./engineering/CODEMAP.md) — correspondance entre surfaces, sources et tests.
- [`engineering/PROTOTYPE_DATA_REGISTER.md`](./engineering/PROTOTYPE_DATA_REGISTER.md) — fixtures intentionnelles et futures sources backend.

## Jalons

### Actif

- [`milestones/P0_FONDATIONS_PROTOTYPE.md`](./milestones/P0_FONDATIONS_PROTOTYPE.md) — périmètre, exclusions et critères d'acceptation de P0.
- [`milestones/P1_PREMIER_CONTACT_PUBLIC.md`](./milestones/P1_PREMIER_CONTACT_PUBLIC.md) — contrat, candidate et recette du premier contact public.

### Lot 1 archivé

- [`milestones/PHASE_02_CARTE_ECRANS.md`](./milestones/PHASE_02_CARTE_ECRANS.md)
- [`milestones/PHASE_03_NAVIGATION.md`](./milestones/PHASE_03_NAVIGATION.md)
- [`milestones/PHASE_04_DIRECTION_VISUELLE.md`](./milestones/PHASE_04_DIRECTION_VISUELLE.md)
- [`milestones/PHASE_05_PAGE_OEUVRE.md`](./milestones/PHASE_05_PAGE_OEUVRE.md)
- [`milestones/PHASE_06_MOBILE.md`](./milestones/PHASE_06_MOBILE.md)
- [`milestones/PHASE_07_PARCOURS_PERSONNELS.md`](./milestones/PHASE_07_PARCOURS_PERSONNELS.md)
- [`milestones/PHASE_08_IMPLEMENTATION.md`](./milestones/PHASE_08_IMPLEMENTATION.md)
- [`milestones/PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md`](./milestones/PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md)
- [`milestones/PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md`](./milestones/PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md)
- [`milestones/PHASE_10_IMPLEMENTATION_CHECKLIST.md`](./milestones/PHASE_10_IMPLEMENTATION_CHECKLIST.md)
- [`milestones/PHASE_10_BILAN_ET_PASSATION.md`](./milestones/PHASE_10_BILAN_ET_PASSATION.md)
- [`milestones/PHASE_11_CONSOLIDATION_TRANSVERSALE.md`](./milestones/PHASE_11_CONSOLIDATION_TRANSVERSALE.md)
- [`milestones/PHASE_11_IMPLEMENTATION_CHECKLIST.md`](./milestones/PHASE_11_IMPLEMENTATION_CHECKLIST.md)
- [`milestones/PHASE_11_BILAN_ET_CLOTURE.md`](./milestones/PHASE_11_BILAN_ET_CLOTURE.md)

## Opérations historiques

- [`operations/GITHUB_PHASE_10_TRANSFERT.md`](./operations/GITHUB_PHASE_10_TRANSFERT.md) — procédure exceptionnelle conservée comme archive, pas comme méthode courante.

Lorsqu'une décision révise un choix antérieur, mettre à jour explicitement l'archive transversale et le document actif concerné. Le dépôt reste la mémoire durable ; les conversations n'en sont pas le substitut.
