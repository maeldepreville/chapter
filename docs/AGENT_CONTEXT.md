# Chapter — contexte courant compact

Dernière mise à jour : 1er septembre 2026.

Ce document est le point d'entrée des agents. Il résume l'état utile ; les journaux longs restent consultables à la demande et ne doivent pas être chargés intégralement par réflexe.

## État actuel

- **Phase active :** phase 11, consolidation transversale et clôture candidate du lot 1.
- **Produit :** prototype frontend sur données simulées et état local à la session. Authentification réelle, persistance distante, moteur de recommandation, modération complète et onboarding restent hors lot 1.
- **Candidat visible :** version Sites 28, déployée en accès propriétaire pour recette. Elle inclut P11-F32 et totalise 92/92 tests au dernier bilan produit.
- **Source de travail :** les règles de contexte ajoutent trois tests d'infrastructure ; build, lint et 95/95 tests réussissent sans modifier le candidat visible.
- **Validation :** le jalon regroupé n'est pas encore accepté. Safari mobile, desktop étroit, gestes de recadrage, texte à 200 %, clavier et technologies d'assistance restent à évaluer.
- **GitHub :** `maeldepreville/chapter` reste volontairement sur `9547a2a`. Les versions de recette 26 à 28 et les travaux documentaires ultérieurs ne doivent pas y être synchronisés avant validation explicite du jalon.
- **Prochaine étape produit :** recueillir la recette de la version 28, corriger les défauts éventuels, faire valider le jalon, mettre à jour le bilan puis synchroniser GitHub.

## Invariants à préserver

- Direction éditoriale sobre ; pas de refonte ni d'effet gratuit.
- AM1 : fondu d'opacité seul pour les panneaux ; mouvement réduit respecté.
- S2 : retours de boutons tonals, sans rebond ni déplacement.
- QRM1b : retournement de la carte autour de 440 ms.
- QR1/QRP1b : carte recto-verso et commandes extérieures préservées.
- HDE1/HMT1/P11-F32 : hiérarchie des honneurs, fiche tactile et accès au pointeur conservés.
- PFP1 : JPEG/PNG/WebP, 8 Mo, petit côté minimal de 512 px ; gestes confinés à l'image.
- N1b : nom de la carte sans césure interne.
- Critiques publiques limitées à 3 000 caractères ; écrits complets conservés.
- Une implémentation de recette ne vaut ni validation ni autorisation GitHub.

## Routage du contexte

| Besoin | Lire ou rechercher |
| --- | --- |
| Statut, prochaine action, garde-fous | Ce document uniquement |
| Clôture et recette du lot 1 | `PHASE_11_BILAN_ET_CLOTURE.md`, puis la section utile de `PHASE_11_IMPLEMENTATION_CHECKLIST.md` |
| Correctif phase 11 | `rg -n "P11-F|mot-clé" docs/PHASE_11_CONSOLIDATION_TRANSVERSALE.md docs/CHAPTER_DECISIONS.md` puis quelques lignes autour du résultat |
| Décision historique identifiée | `rg -n "CODE|expression exacte" docs/` ; ouvrir seulement le livrable de phase trouvé |
| Architecture ou fichiers à modifier | `CODEMAP.md`, puis les symboles concernés avec `rg` |
| Croissance produit | `CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md` |
| Synchronisation GitHub ou publication | `AGENT_WORKFLOW.md` et l'état Git/Sites réel |
| Optimisation des agents | `AI_AGENT_CONTEXT_STRATEGY.md` |

`CHAPTER_DECISIONS.md` demeure la source de vérité transversale, mais sert d'archive interrogeable : sa taille n'en fait plus un prérequis de lecture exhaustive.

## Commandes usuelles

```bash
bash scripts/agent-context.sh summary
bash scripts/agent-context.sh find "P11-F32|HMT1"
bash scripts/agent-context.sh map
npm run lint
npm test
git diff --check
```

Commencer par les tests directement liés au changement. N'exécuter la suite complète qu'une fois le candidat cohérent, sauf si la portée exige immédiatement une vérification globale.

## Écriture documentaire

- Mettre ce fichier à jour lorsqu'un statut courant, une prochaine étape, une version de recette, un blocage ou un invariant change.
- Ajouter le détail dans un seul document spécialisé ; ailleurs, conserver une synthèse et un lien.
- Dans `CHAPTER_DECISIONS.md`, rechercher la section à modifier avant de lire davantage. Ajouter une décision courte en tête seulement lorsqu'elle change réellement le cadre transversal.
- Conserver les preuves historiques et identifiants de publication dans les bilans de phase, pas dans ce résumé sauf s'ils déterminent l'action suivante.
