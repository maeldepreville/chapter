# Chapter — contexte courant compact

Mise à jour : 28 septembre 2026.

Ce document résume l'état utile.

## État actuel

- **Fondations :** la fondation 2 est validée sur `fondation-experiences-lecture-2026-09-23`. La fondation 3 « publication distincte de la mémoire privée » est validée et synchronisée le 28 septembre 2026 sur `fondation-publication-distincte-2026-09-28`, depuis la branche de fondation 2 ; voir `docs/milestones/FONDATION_PUBLICATION_DISTINCTE.md`.
- **Statut P1–P6 :** validés, synchronisés ; voir leurs documents de jalon.
- **Statut P7 :** validé le 12 septembre 2026 sur Sites 84 et fusionné vers le `main` GitHub après audit final ; 177 tests, lint, construction de production et contrôle Git réussis.
- **Prochaine action unique :** cadrer séparément le lot 2 backend, sans déduire de cette synchronisation son ouverture ou ses choix techniques.
- **Produit actuel :** prototype frontend sur données simulées et état de session local. Backend, authentification, persistance, modération et recommandation réels restent au lot 2.
- **Publication :** toute candidate complète et vérifiée rejoint directement le Site de recette avec son accès existant. Cela ne vaut ni validation, ni synchronisation GitHub, ni fusion.

## Doctrine de la refonte

« Chapter n'est pas l'endroit où l'on compte les livres lus. C'est l'endroit où chaque lecture laisse une trace, et où ces traces deviennent des chemins vers les autres. »

- Acquisition d'abord auprès des lecteurs qui n'ont pas encore investi une application ; migration privée et fiable comme voie secondaire.
- Activation : une œuvre → `À lire`, `En cours` ou `Lu` → premier repère. Aucun questionnaire de goûts, profil ou abonnement imposé.
- Journal, Bibliothèque et notes toujours privés. Une critique, une liste ou une conversation publique résulte d'un geste explicite et réversible.
- Navigation principale : Journal, Bibliothèque, Découvrir et Recherche. Les œuvres, profils, listes, critiques et conversations publiques sont consultables sans compte.
- Progression facultative et manuelle sous forme de marque-page ; aucun champ de possession.
- Création d’espace au premier geste personnel : e-mail et mot de passe. Le `Nom de lecteur` public est demandé au premier geste public ; son unicité et l'identité stable relèvent du backend.
- Direction d'atelier éditorial contemporain ; Newsreader + Inter ; couvertures comme couleur principale ; densité adaptée au contexte ; microdesign et mouvement inclus dans la refonte.

Le détail et les justifications sont dans `docs/product/REFONTE_PRE_LOT_2.md`.

## Invariants techniques et comportementaux

- Identifiants stables pour permissions, relations, profils, œuvres et contenus ; jamais le nom, la photo ou la biographie.
- Données intentionnelles centralisées et consignées dans `docs/engineering/PROTOTYPE_DATA_REGISTER.md` lors de leur implémentation.
- AM1 : surfaces en fondu à leur position finale, texte immobile, transition interruptible et mouvement réduit immédiat.
- S2 : retours de boutons tonals, sans rebond ni déplacement ; navigation, recherche et tri immédiats.
- QRM1b : retournement de la carte autour de 440 ms.
- PFP1 : JPEG/PNG/WebP, 8 Mo, petit côté minimal de 512 px ; gestes confinés à l'image.
- Critiques publiques limitées à 3 000 caractères ; écrits complets conservés.
- Une implémentation candidate ne vaut ni validation ni synchronisation GitHub. Sa mise à disposition sur le Site de recette est automatique après vérification.

## Routage du contexte

| Besoin | Lire ou rechercher |
| --- | --- |
| Statut, prochaine action, garde-fous | Ce document uniquement |
| Doctrine et roadmap P0–P7 | `docs/product/REFONTE_PRE_LOT_2.md` |
| Implémenter ou évaluer P0 | `docs/milestones/P0_FONDATIONS_PROTOTYPE.md`, puis `docs/engineering/CODEMAP.md` |
| Consulter P1 validé | `docs/milestones/P1_PREMIER_CONTACT_PUBLIC.md`, puis `docs/engineering/CODEMAP.md` |
| Cadrer, implémenter ou évaluer P2 | `docs/milestones/P2_PREMIER_REPERE.md`, puis `docs/engineering/CODEMAP.md` |
| Implémenter ou évaluer P3 | `docs/milestones/P3_USAGE_PERSONNEL_QUOTIDIEN.md`, `docs/milestones/PHASE_09_COMPOSANTS_ESPACE_PERSONNEL.md`, puis `docs/engineering/CODEMAP.md` |
| Implémenter ou évaluer P4 | `docs/milestones/P4_DIMENSION_SOCIALE.md`, `docs/milestones/PHASE_10_DECOUVERTE_INTERACTIONS_SOCIALES.md`, puis `docs/engineering/CODEMAP.md` |
| Implémenter ou évaluer P5 | `docs/milestones/P5_CONFIANCE_CONTROLE.md`, puis `docs/engineering/CODEMAP.md` |
| Implémenter ou évaluer P6 | `docs/milestones/P6_ETATS_TRANSVERSAUX.md`, puis `docs/engineering/CODEMAP.md` |
| Cadrer ou exécuter P7 | `docs/milestones/P7_RECETTE_COMPLETE.md`, puis les checklists P1 à P6 ciblées par le parcours |
| Clôture du lot 1 | `docs/milestones/PHASE_11_BILAN_ET_CLOTURE.md` |
| Décision historique identifiée | `rg -n "CODE|expression exacte" docs/` puis ouvrir seulement le livrable trouvé |
| Architecture ou fichiers à modifier | `docs/engineering/CODEMAP.md`, puis les symboles concernés avec `rg` |
| Fixtures ou future source backend | `docs/engineering/PROTOTYPE_DATA_REGISTER.md` |
| Acquisition et croissance | `docs/product/REFONTE_PRE_LOT_2.md`, puis `docs/product/CHAPTER_PRODUCT_GROWTH_PRINCIPLES.md` |
| Fondations restantes avant première publication | `docs/product/AVANT_PREMIERE_PUBLICATION.md`, puis le jalon actif |
| Fondation 2 — expériences de lecture | `docs/milestones/FONDATION_EXPERIENCES_LECTURE.md`, puis `app/reading-experience-model.ts` |
| Fondation 3 — publication distincte | `docs/milestones/FONDATION_PUBLICATION_DISTINCTE.md`, puis `app/publication-model.ts` et `app/page.tsx` |
| Créer ou évaluer un asset | `docs/design/ASSET_SYSTEM.md`, puis la famille concernée dans `docs/product/REFONTE_PRE_LOT_2.md` |
| Synchronisation GitHub ou publication | `docs/agents/AGENT_WORKFLOW.md` et l'état Git/Sites réel |
| Optimisation des agents | `docs/agents/AI_AGENT_CONTEXT_STRATEGY.md` |

`docs/product/CHAPTER_DECISIONS.md` demeure l'archive transversale : la rechercher de façon ciblée, ne pas la lire entièrement par défaut.

## Démarrage d'un nouveau chat

```bash
npm run context
git status --short --branch
```

Vérifier ensuite que la branche correspond au jalon, lire sa ligne de routage et charger seulement les sources concernées. Un chat distinct par jalon est recommandé ; le dépôt, non l'historique du chat, porte le statut durable.

## Écriture documentaire

- Mettre ce fichier à jour lorsqu'un statut, une prochaine action, un jalon, un blocage ou un invariant change.
- Garder le détail dans un seul document spécialisé ; ailleurs, résumer et pointer.
- À la clôture de chaque jalon, consigner preuves, limites, reports et prochaine action avant la synchronisation distante autorisée.
