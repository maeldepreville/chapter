# Chapter — contexte courant compact

Dernière mise à jour : 2 septembre 2026.

Ce document est le point d'entrée des agents. Il résume l'état utile ; les journaux longs restent consultables à la demande et ne doivent pas être chargés intégralement par réflexe.

## État actuel

- **Phase active :** phase 11 et lot 1 clôturés le 2 septembre 2026 ; aucun lot suivant n'est encore ouvert.
- **Produit :** prototype frontend sur données simulées et état local à la session. Authentification réelle, persistance distante, moteur de recommandation, modération complète et onboarding restent hors lot 1.
- **Jalon visible accepté :** version Sites 31, déployée en accès propriétaire. Elle synchronise les traces publiques avec les pages d'œuvres et rend chaque identité sociale navigable ; build, lint, `git diff --check` et 101/101 tests réussissent.
- **Source fonctionnelle acceptée :** version 31 issue du SHA `904d2dfbf8fbcb5bb7dc6b8f710f24907f3d1570`, complétée par ses documents de validation et de clôture.
- **Validation :** après sa recette et l'acceptation ciblée de P11-F35, l'utilisateur valide explicitement le jalon regroupé le 2 septembre 2026. Cette décision clôt la phase 11 et le lot 1 sans constituer un audit WCAG exhaustif.
- **GitHub :** la validation du jalon autorise et exige la synchronisation directe de la branche `main`, suivie d'une lecture de contrôle de la référence distante.
- **Prochaine étape produit :** cadrer explicitement le lot 2 avant tout nouveau développement ; le backend, l'authentification et la persistance restent des candidats de périmètre, pas des travaux déjà ouverts.

## Invariants à préserver

- Direction éditoriale sobre ; pas de refonte ni d'effet gratuit.
- AM1 : fondu d'opacité seul pour les panneaux ; mouvement réduit respecté.
- S2 : retours de boutons tonals, sans rebond ni déplacement.
- QRM1b : retournement de la carte autour de 440 ms.
- QR1/QRP1b : carte recto-verso et commandes extérieures préservées.
- HDE1/HMT1/P11-F32 : hiérarchie des honneurs, fiche tactile et accès au pointeur conservés.
- P11-F33 : une liste conserve le propriétaire du profil qui l'a ouverte ; aucun suivi de soi-même sur la liste personnelle.
- P11-F34 : permissions, destinations et relations utilisent des identifiants stables ; les données statiques intentionnelles sont centralisées et consignées dans `PROTOTYPE_DATA_REGISTER.md`.
- P11-F35 : une critique publique possède une source commune entre profil et œuvre ; toute identité affichée dans une critique ou une réponse ouvre son profil.
- PFP1 : JPEG/PNG/WebP, 8 Mo, petit côté minimal de 512 px ; gestes confinés à l'image.
- N1b : nom de la carte sans césure interne.
- Critiques publiques limitées à 3 000 caractères ; écrits complets conservés.
- Une implémentation de recette ne vaut ni validation ni autorisation GitHub ; la version 31 constitue l'exception désormais acceptée explicitement.

## Routage du contexte

| Besoin | Lire ou rechercher |
| --- | --- |
| Statut, prochaine action, garde-fous | Ce document uniquement |
| Clôture et recette du lot 1 | `PHASE_11_BILAN_ET_CLOTURE.md`, puis la section utile de `PHASE_11_IMPLEMENTATION_CHECKLIST.md` |
| Correctif phase 11 | `rg -n "P11-F|mot-clé" docs/PHASE_11_CONSOLIDATION_TRANSVERSALE.md docs/CHAPTER_DECISIONS.md` puis quelques lignes autour du résultat |
| Décision historique identifiée | `rg -n "CODE|expression exacte" docs/` ; ouvrir seulement le livrable de phase trouvé |
| Architecture ou fichiers à modifier | `CODEMAP.md`, puis les symboles concernés avec `rg` |
| Donnée en dur ou future source backend | `PROTOTYPE_DATA_REGISTER.md` |
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
