# Chapter — procédures de travail des agents

Ce document complète les règles essentielles de `../../AGENTS.md`. Il est consulté seulement quand la tâche touche la procédure correspondante.

## Cadrer une tâche

Reformuler intérieurement quatre éléments avant d'agir :

1. **But** — comportement ou livrable attendu.
2. **Contexte** — surface, fichiers ou défaut observé.
3. **Contraintes** — décisions et exclusions à préserver.
4. **Terminé lorsque** — preuves permettant de conclure.

Pour un défaut non ambigu, inspecter puis produire directement un candidat. Pour une ambiguïté qui changerait le produit ou le rendu, poser une question courte avant l'implémentation.

## Charger le contexte progressivement

1. Lancer `bash scripts/agent-context.sh summary`.
2. Lire la ligne de routage correspondant à la tâche dans `docs/agents/AGENT_CONTEXT.md`.
3. Rechercher d'abord les symboles, codes de décision ou titres avec `rg`.
4. Lire des plages ciblées ; élargir seulement si une dépendance ou contradiction apparaît.
5. Résumer les conclusions utiles dans le plan de travail. Ne pas recopier les sorties brutes longues dans le chat ou dans un nouveau fichier.

Ne pas générer un instantané complet du dépôt pour un agent qui peut déjà naviguer dans les fichiers. Ne pas créer d'index vectoriel tant que la recherche lexicale ciblée reste suffisante.

## Modifier et vérifier

- Préserver l'architecture, les dépendances, les assets et les choix validés qui ne sont pas nécessaires à la demande.
- Appliquer le plus petit changement cohérent ; éviter les nettoyages adjacents.
- Exécuter les tests ciblés pendant l'itération. Après stabilisation, lancer `npm run lint`, `npm test` et `git diff --check` pour un changement applicatif transversal.
- Un test Node, un rendu serveur ou une inspection de source ne prouve pas un comportement Safari, tactile, lecteur d'écran ou visuel. Maintenir cette distinction dans les documents et la réponse.
- Ne pas démarrer de navigateur ou de recette visuelle sans demande explicite.

## Mettre à jour la mémoire

- **Toujours si l'état change :** `docs/agents/AGENT_CONTEXT.md`.
- **Décision produit validée/révisée/abandonnée :** section ciblée de `docs/product/CHAPTER_DECISIONS.md` et document de phase.
- **Implémentation candidate :** document actif de phase, bilan/checklist si concernés ; le journal transversal reçoit seulement la synthèse nécessaire à la continuité.
- **Simple correction documentaire ou technique sans effet produit :** document spécialisé et index concernés ; ne pas gonfler tous les journaux.

Une information possède une source détaillée unique. Les autres fichiers indiquent son statut et un lien.

## Enchaîner les jalons de la refonte

La refonte pré-lot 2 utilise un chat par jalon et la branche `refonte-pre-lot-2`.

1. Au début d'un chat, lancer `npm run context`, vérifier la branche et lire `docs/product/REFONTE_PRE_LOT_2.md` avec le document du jalon actif.
2. Reformuler le résultat visible à évaluer et les non-objectifs. Ne pas anticiper l'écran du jalon suivant pour rentabiliser une extraction.
3. Construire une tranche verticale sur fixtures centralisées. Une action visible doit avoir un effet observable, même si le futur service est remplacé par un adaptateur de session.
4. Documenter les preuves et limites dans le document du jalon. Mettre `docs/agents/AGENT_CONTEXT.md`, `docs/engineering/CODEMAP.md` et `docs/engineering/PROTOTYPE_DATA_REGISTER.md` à jour seulement si leur contenu change réellement.
5. Dès que la candidate visuelle est complète et que les vérifications adaptées réussissent, la mettre directement à disposition sur le Site de recette avec son accès existant, sans attendre une nouvelle demande.
6. Une validation explicite autorise ensuite l'envoi du jalon accepté sur la branche GitHub de refonte. Elle n'autorise ni le jalon suivant, ni la fusion vers `main`.
7. Terminer avec une prochaine action unique afin que le chat suivant reprenne sans interpréter l'historique conversationnel.

## Synchroniser GitHub après validation d'un jalon

L'utilisateur a autorisé durablement une synchronisation directe après chaque validation explicite. La cible dépend du cycle :

- lot 1 historique : `main` ;
- refonte P0 à P6 : `refonte-pre-lot-2` ;
- P7 : fusion vers `main` seulement après recette complète et accord explicite.

1. Mettre à jour les documents de décision et de clôture du périmètre accepté.
2. Vérifier le dépôt de travail, la référence GitHub distante et les éventuelles divergences.
3. Inclure uniquement code, assets, tests et documents du jalon accepté. Préserver tout travail sans rapport et tout candidat non validé.
4. Utiliser Git authentifié ou la connexion GitHub intégrée. L'absence d'identifiants dans le terminal n'établit pas l'indisponibilité de la connexion intégrée.
5. Envoyer sans force-push, sans réécriture et sans contournement de branche protégée.
6. Vérifier après l'envoi que la référence cible pointe sur le commit attendu et que l'arbre distant correspond au contenu préparé.

Ne jamais pousser un candidat non validé sous prétexte qu'une branche de travail l'isole. La création initiale de la branche et son cadrage documentaire constituent la préparation explicitement demandée le 5 septembre 2026 ; les implémentations suivent le cycle candidat → recette → validation.

Le bundle de phase 10 était une exception de préservation d'historiques. Ne pas le réintroduire sans blocage réel et accord de l'utilisateur. En cas de divergence ou de refus d'accès, arrêter l'envoi, expliquer le blocage et demander une direction.

## Publication Sites

- Publication, sauvegarde de version et synchronisation GitHub sont trois actions distinctes.
- L'utilisateur autorise durablement, à partir du 5 septembre 2026, la mise à disposition directe de toute candidate visuelle complète et vérifiée afin de supprimer un aller-retour inutile. Aucune demande intermédiaire n'est requise.
- Préserver le `project_id` existant, construire et tester la source exacte, pousser le commit correspondant sur le dépôt technique du Site, sauvegarder cette version puis déployer selon l'accès existant.
- Le commit et l'envoi techniques nécessaires au Site restent distincts de la synchronisation vers GitHub. Ne jamais déduire une validation utilisateur du succès d'un déploiement.

## Usage des agents secondaires

Les agents secondaires servent à isoler une exploration réellement indépendante et volumineuse : recherche multi-source, lecture de logs massifs ou audits séparables. Ils ne sont pas une réduction garantie du nombre total de tokens et ne doivent pas être lancés pour une tâche courte, séquentielle ou fortement couplée. Leur retour doit être une synthèse compacte, pas la retranscription de leur contexte.
