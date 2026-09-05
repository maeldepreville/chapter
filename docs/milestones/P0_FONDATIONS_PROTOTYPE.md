# Chapter — P0, fondations du prototype

Dernière mise à jour : 5 septembre 2026.

Statut : **validé le 5 septembre 2026 ; intégré à la branche `refonte-pre-lot-2`**.

## But

P0 construit le socle technique et visuel nécessaire aux tranches P1 à P7. Il doit rendre la refonte plus rapide à évaluer et moins coûteuse à corriger, sans tenter de livrer déjà l'ensemble de l'expérience.

## Résultat attendu

1. **Tokens** : couleurs, typographies, espacements, rayons, bordures, ombres, densités, durées et mouvement réduit sont centralisés et nommés par rôle.
2. **Coquilles** : structure publique et structure connectée responsive, navigation déclarée et point de bascule de référence à 900 px.
3. **Primitives** : bouton, lien-action, champ, zone de texte, sélection, menu, dialogue, toast, surface éditoriale, couverture, avatar et état vide partagent les mêmes règles.
4. **Données de prototype** : entités et fixtures centralisées, identifiants stables, relations explicites et état de session réinitialisable.
5. **Contrats de parcours** : routes et actions de P1 à P7 sont recensées ; toute action exposée dans P0 a un résultat observable.
6. **Preuves** : tests des invariants de données et de composants, lint, build et contrôle du diff.

## Contraintes

- Conserver la stack existante et le `project_id` Sites.
- Refactorer les monolithes seulement par extraction utile au nouveau socle ; ne pas réécrire l'application sans tranche vérifiable.
- Réutiliser les assets validés lorsque leur silhouette sert la nouvelle grammaire ; ne pas inventer de nouveaux assets pour masquer une décision manquante.
- Newsreader porte l'éditorial, Inter l'interface. Les couvertures restent la principale source chromatique.
- AM1, S2, QRM1b et le mode mouvement réduit restent les références comportementales jusqu'à révision explicite.
- Les données privées et publiques doivent être séparables dès le modèle de fixture. Aucun champ de possession.
- La progression est facultative et représentée par le futur composant marque-page ; P0 en prépare le contrat sans imposer sa saisie.
- Pas de backend, d'authentification réelle, de persistance distante, de recommandation réelle, de migration connectée ni de déploiement dans ce jalon.

## Données minimales à préparer

- œuvres, auteurs et éditions avec identifiants stables ;
- lecteurs, profils publics facultatifs et relations de suivi ;
- statuts et repères privés, critiques et réponses publiques, listes publiques ;
- au moins une session vierge, une session nouvellement activée et une session habituée ;
- une persona avec une Bibliothèque d'environ 500 œuvres pour vérifier recherche, tri, filtres et densité ;
- cas de couverture absente, texte long, homonymie et contenu retiré.

Le registre canonique reste [`PROTOTYPE_DATA_REGISTER.md`](../engineering/PROTOTYPE_DATA_REGISTER.md). Il sera mis à jour en même temps que les fixtures, pas anticipé avec des identifiants fictifs qui ne seraient jamais implémentés.

## Critères d'acceptation

- [x] Les tokens sont centralisés et les primitives n'embarquent pas de valeurs de style concurrentes sans justification.
- [x] Les coquilles publique et connectée fonctionnent au-dessus et au-dessous du point de bascule, sans navigation morte.
- [x] Les composants interactifs sont utilisables au clavier, exposent un focus visible et respectent le mouvement réduit.
- [x] Les états privés, publics et de session sont distincts dans les types et les fixtures.
- [x] Les permissions et relations utilisent des identifiants, jamais un nom, une photo ou une biographie.
- [x] Les fixtures sont centralisées, cohérentes et réinitialisables ; le jeu dense n'est pas monté par défaut.
- [x] Les tests ciblés, `npm run lint`, `npm run build` et `git diff --check` réussissent.
- [x] Le code, les décisions et le registre de données décrivent le même état.
- [x] Aucun déploiement ou fusion vers `main` n'est déduit de l'acceptation de P0.

## Candidate implémentée

- `foundation/tokens.css` nomme la palette, les rôles typographiques, espacements, rayons, bordures, ombres, densités et durées ; les alias du lot 1 restent raccordés à ces tokens.
- `foundation/primitives.tsx` et `foundation/primitives.css` fournissent bouton, lien-action, champ, zone de texte, sélection, menu, dialogue, toast, surface éditoriale, couverture, avatar et état vide.
- `foundation/contracts.ts` sépare les entités privées et publiques, déclare les coquilles, le seuil de 900 px, la navigation et le résultat observable de P1 à P7.
- `foundation/fixtures.ts` centralise les œuvres et états initiaux consommés par `page.tsx`, puis ajoute les auteurs, éditions, profils, relations et cas limites ; `foundation/dense-fixtures.ts` isole la persona de 500 œuvres hors du chargement normal.
- `foundation/session.ts` clone et réinitialise les trois sessions de référence sans partager de mutations.
- La route publique masque les destinations privées et expose Découvrir/Recherche ; la coquille connectée expose Journal/Bibliothèque/Découvrir/Recherche, avec quatre destinations dans la navigation mobile.

## Preuves de la candidate

- test ciblé : `node --test tests/p0-foundation.test.mjs` ;
- non-régression : `node --test tests/*.test.mjs` ;
- qualité : `npm run lint`, `npm run build`, `git diff --check` ;
- contrôle de charge : la chaîne sentinelle du jeu dense est absente de la sortie de production après build ;
- aucune modification de `.openai/hosting.json`, aucun déploiement, aucun commit ni push avant validation.

La recette P0 porte sur le système et ses contrats. Elle ne valide pas l'apparence finale des écrans P1 à P7 ; aucune prévisualisation navigateur n'a été créée dans ce jalon documentaire et technique.

## Validation

Le 5 septembre 2026, après clarification de la part visible et de la part structurelle du jalon, l'utilisateur valide explicitement P0. Cette validation autorise son commit et sa synchronisation sur `refonte-pre-lot-2`. Elle n'autorise ni fusion vers `main`, ni nouvelle version Sites, ni déploiement. P1 — Premier contact public devient le prochain jalon.

## Hors recette P0

Les compositions finales de l'accueil public, de la page œuvre, du premier repère, du Journal, de la Bibliothèque, de Découvrir, des profils et des réglages seront évaluées dans leurs jalons verticaux respectifs. P0 peut montrer une surface représentative pour vérifier le système, mais cette surface ne vaut pas validation anticipée des écrans suivants.

## Procédure de clôture

Après implémentation, documenter les fichiers extraits ou créés dans `docs/engineering/CODEMAP.md`, les fixtures dans `docs/engineering/PROTOTYPE_DATA_REGISTER.md`, les preuves et limites ici, puis mettre `docs/agents/AGENT_CONTEXT.md` à jour. Une validation explicite autorise la synchronisation du commit P0 sur `refonte-pre-lot-2`, pas sa fusion dans `main` ni son déploiement.
