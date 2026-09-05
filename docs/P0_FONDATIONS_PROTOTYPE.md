# Chapter — P0, fondations du prototype

Dernière mise à jour : 5 septembre 2026.

Statut : **contrat prêt ; implémentation non commencée**.

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

Le registre canonique reste [`PROTOTYPE_DATA_REGISTER.md`](./PROTOTYPE_DATA_REGISTER.md). Il sera mis à jour en même temps que les fixtures, pas anticipé avec des identifiants fictifs qui ne seraient jamais implémentés.

## Critères d'acceptation

- [ ] Les tokens sont centralisés et les primitives n'embarquent pas de valeurs de style concurrentes sans justification.
- [ ] Les coquilles publique et connectée fonctionnent au-dessus et au-dessous du point de bascule, sans navigation morte.
- [ ] Les composants interactifs sont utilisables au clavier, exposent un focus visible et respectent le mouvement réduit.
- [ ] Les états privés, publics et de session sont distincts dans les types et les fixtures.
- [ ] Les permissions et relations utilisent des identifiants, jamais un nom, une photo ou une biographie.
- [ ] Les fixtures sont centralisées, cohérentes et réinitialisables ; le jeu dense ne bloque pas l'interface.
- [ ] Les tests ciblés, `npm run lint`, `npm run build` et `git diff --check` réussissent.
- [ ] Le code, les décisions et le registre de données décrivent le même état.
- [ ] Aucun déploiement ou fusion vers `main` n'est déduit de l'acceptation de P0.

## Hors recette P0

Les compositions finales de l'accueil public, de la page œuvre, du premier repère, du Journal, de la Bibliothèque, de Découvrir, des profils et des réglages seront évaluées dans leurs jalons verticaux respectifs. P0 peut montrer une surface représentative pour vérifier le système, mais cette surface ne vaut pas validation anticipée des écrans suivants.

## Procédure de clôture

Après implémentation, documenter les fichiers extraits ou créés dans `CODEMAP.md`, les fixtures dans `PROTOTYPE_DATA_REGISTER.md`, les preuves et limites ici, puis mettre `AGENT_CONTEXT.md` à jour. Une validation explicite autorise la synchronisation du commit P0 sur `refonte-pre-lot-2`, pas sa fusion dans `main` ni son déploiement.
