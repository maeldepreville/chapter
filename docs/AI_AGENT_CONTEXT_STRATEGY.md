# Chapter — stratégie de contexte et d'usage des tokens pour les agents

Dernière mise à jour : 1er septembre 2026.

## Conclusion

Pour Chapter, le levier dominant est la **divulgation progressive du contexte** : charger un état courant très court, puis rechercher seulement les décisions, fichiers et tests concernés. Avant cette révision, les règles demandaient la lecture systématique de `AGENTS.md`, du journal transversal et du document de phase 11, soit **225 449 caractères**. Avec une approximation volontairement simple de quatre caractères par token, cela représentait environ **56 000 tokens d'entrée avant l'analyse du code**.

Le démarrage courant repose maintenant sur `AGENTS.md` et `AGENT_CONTEXT.md`, soit **6 996 caractères**, environ **1 750 tokens selon la même approximation** : une réduction théorique proche de **97 % du contexte documentaire de départ**. Une tâche nécessitant aussi la procédure complète reste autour de 3 000 tokens documentaires estimés, soit environ 95 % sous l'ancien démarrage.

Ces nombres ne sont pas une mesure de facturation : le découpage réel dépend du tokenizer, des instructions de la plateforme et des outils. Ils fournissent toutefois une comparaison homogène avant/après.

## Méthodes classées pour ce projet

| Priorité | Méthode | Effet attendu ici | Décision |
| --- | --- | --- | --- |
| 1 | État compact + contexte juste à temps | Évite de relire 220 Ko de journaux à chaque tâche | Appliqué |
| 2 | `AGENTS.md` court et stable | Réduit le contexte automatique et concentre les règles dures | Appliqué |
| 3 | Routage par tâche + recherche `rg` | Charge une section ou un symbole au lieu d'un fichier entier | Appliqué |
| 4 | Carte du code et tests ciblés | Réduit l'exploration, les logs et les itérations inutiles | Appliqué |
| 5 | Mémoire externe structurée | Permet un nouveau chat ou une compaction sans perdre l'état | Appliqué via `AGENT_CONTEXT.md` et les bilans |
| 6 | Prompts cadrés par but/contexte/contraintes/fin | Diminue les hypothèses, les reprises et les sorties inutiles | Intégré à la procédure |
| 7 | Sorties d'outils bornées | Empêche logs, builds et recherches de polluer la conversation | Règle appliquée ; commandes ciblées |
| 8 | Nouveau chat aux frontières de jalon | Repart d'un contexte propre lorsque l'état est déjà durable | Recommandé, non automatisé |
| 9 | Modèle/raisonnement adaptés à la tâche | Peut réduire fortement les crédits sur les tâches simples | Choix utilisateur ou configuration locale, pas imposé au dépôt |
| 10 | Agents secondaires | Isole le bruit d'une exploration massive, mais peut augmenter les tokens totaux | Réservé aux sous-tâches indépendantes volumineuses |

## Fondements vérifiés

OpenAI recommande un prompt comportant le but, le contexte, les contraintes et la condition de fin. Sa documentation conseille également un `AGENTS.md` court et pratique, avec des fichiers spécialisés lorsque celui-ci grossit. C'est exactement la séparation adoptée ici entre règles automatiques, état courant et procédures conditionnelles. [Bonnes pratiques Codex](https://learn.chatgpt.com/guides/best-practices), [fonctionnement de `AGENTS.md`](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

La recherche juste à temps est cohérente avec les travaux d'Anthropic sur le context engineering : conserver des identifiants légers, naviguer avec des outils comme `grep`, `head` ou `tail`, puis maintenir seulement le sous-ensemble utile en mémoire. Le même article présente trois leviers pour les tâches longues : compaction, notes persistantes et sous-agents spécialisés. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

GitHub recommande des instructions spécifiques à un chemin afin de ne pas surcharger les règles générales. Chapter n'ajoute pas aujourd'hui de fichiers `.github/instructions` : le dépôt ne possède pas assez de conventions divergentes par dossier pour justifier cette couche, et `AGENTS.md` est déjà compris par plusieurs agents. Cette option deviendra pertinente si `app/`, `worker/` et `db/` acquièrent des procédures réellement distinctes. [Personnalisation des réponses Copilot](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/prompting/response-customization).

Enfin, les tokens ne proviennent pas seulement du prompt : OpenAI compte aussi fichiers, historique, résultats d'outils et réponse. Au tarif Codex publié au 1er septembre 2026, les tokens mis en cache sont moins coûteux que les entrées ordinaires et les sorties sont plus coûteuses ; réduire les lectures inutiles et les réponses répétitives reste donc prioritaire. [Tarification Codex](https://learn.chatgpt.com/docs/pricing).

## Compaction, nouveau chat et mémoire

La compaction automatique est utile lorsqu'une tâche continue exige le fil exact des échanges. Codex expose notamment un seuil de compaction dans sa configuration locale. Mais une compaction est une synthèse avec perte potentielle ; elle peut également réduire la réutilisation du cache de prompt. [Référence de configuration Codex](https://learn.chatgpt.com/docs/config-file/config-reference), [prompt caching OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching).

Pour Chapter, la règle pratique est donc :

- continuer le même chat pendant une recette ou une implémentation fortement liée ;
- écrire immédiatement les décisions et l'état utile dans le dépôt ;
- ouvrir un nouveau chat à la frontière d'un jalon ou lorsque l'historique est surtout composé de logs et d'anciennes tentatives ;
- reprendre par `scripts/agent-context.sh summary`, pas par le collage d'un ancien échange.

Le fichier courant doit conserver les décisions, blocages et prochaines étapes ; les sorties brutes de tests, captures intermédiaires et essais abandonnés n'y entrent pas.

## Cache de prompt : utile, mais peu pilotable ici

Le cache bénéficie aux préfixes stables. Dans une intégration API, les instructions stables doivent précéder le contenu dynamique et des points de rupture explicites peuvent rendre ce préfixe réutilisable. Dans ChatGPT Work/Codex, cette mécanique est essentiellement gérée par la plateforme : le dépôt ne peut pas garantir un taux de cache.

Garder `AGENTS.md` stable, court et rarement réécrit aide indirectement, mais **ajouter du texte uniquement pour dépasser un seuil de cache serait contre-productif**. Une entrée non lue reste préférable à une entrée mise en cache mais inutile.

## Agents secondaires : qualité du contexte, pas économie automatique

Les sous-agents disposent d'un contexte isolé et peuvent renvoyer une synthèse au fil principal, ce qui protège celui-ci du bruit. OpenAI les recommande notamment pour l'exploration, les tests ou l'analyse de logs volumineux. [Sous-agents Codex](https://learn.chatgpt.com/docs/agent-configuration/subagents).

Ils ne réduisent cependant pas nécessairement le total de tokens : plusieurs agents peuvent relire les mêmes instructions et explorer des pistes redondantes. Pour Chapter, ils sont pertinents si au moins deux travaux sont indépendants et volumineux ; ils ne doivent pas être utilisés pour une correction locale ou pour contourner une mauvaise organisation documentaire.

## Ce qui n'est pas retenu maintenant

- **Repomix ou export monolithique du dépôt :** utile lorsqu'un modèle ne possède aucun accès aux fichiers, mais redondant et coûteux pour un agent capable de naviguer dans le dépôt.
- **RAG ou base vectorielle :** maintenance et opacité inutiles à cette taille. `rg` sur des codes de décision stables est plus simple, précis et vérifiable. Anthropic recommande d'ailleurs de commencer par la recherche agentique et d'ajouter le sémantique seulement lorsqu'un besoin de vitesse ou de rappel le justifie. [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk).
- **Skill Chapter dédié :** il dupliquerait pour l'instant `AGENTS.md` et les documents du dépôt. Les skills deviennent utiles pour une procédure réutilisée entre plusieurs projets, pas pour recopier la mémoire d'un seul dépôt.
- **Micro-prompts télégraphiques :** économiser quelques dizaines de tokens au prix d'une contrainte oubliée provoque des reprises beaucoup plus coûteuses.
- **Refactor immédiat de `page.tsx` et `phase10.tsx` :** la carte du code et la recherche par symbole produisent déjà un gain sans risque. L'extraction de composants sera pertinente au prochain changement fonctionnel qui touche ces zones, avec tests de non-régression, pas comme chantier autonome.
- **Baisse forcée du niveau de raisonnement :** adaptée à un correctif mécanique bien borné, mais dangereuse pour un arbitrage UI/UX ou un diagnostic Safari. Le choix doit rester lié à la difficulté réelle.

## Utilisation quotidienne

Une demande efficace peut rester naturelle. Lorsqu'un sujet est complexe, quatre lignes suffisent :

```text
But : ce qui doit changer.
Contexte : écran, fichier ou défaut observé.
Contraintes : décisions à préserver et exclusions.
Terminé lorsque : comportement visible et preuves attendues.
```

L'agent complète ce cadre à partir de l'état du dépôt ; l'utilisateur n'a pas à répéter les décisions déjà documentées.

Pour suivre le budget documentaire :

```bash
bash scripts/agent-context.sh budget
```

Le garde-fou automatisé maintient `AGENTS.md` sous 4 Ko et `AGENT_CONTEXT.md` sous 7 Ko. Si l'un dépasse sa limite, déplacer le détail vers un document spécialisé plutôt que relever le plafond par défaut.

## Lecture critique des tendances sociales

La recherche sur X fait surtout remonter quatre promesses récurrentes : routage automatique vers un modèle moins coûteux, contexte de code structuré avant exploration, récupération juste à temps et compression automatique des anciens résultats. Les trois dernières convergent avec les sources officielles et sont reflétées dans cette stratégie. Le routage de modèle reste un choix de difficulté et de qualité, pas une règle fixe du dépôt.

Les affirmations absolues du type « ne plus jamais atteindre une limite » ou « diviser les tokens par trois » ne sont pas reprises sans protocole, trace et périmètre comparables à Chapter. Les publications sociales servent ici à identifier des hypothèses ; la décision s'appuie sur une documentation vérifiable et sur la mesure du dépôt.

## Sources communautaires examinées avec recul

Les dépôts populaires convergent vers la maîtrise explicite du contexte, les agents focalisés et les erreurs compactes. Le projet 12-Factor Agents formule notamment « own your context window » et « small, focused agents ». Ces principes confortent la stratégie, mais ne remplacent pas les documentations produit officielles ni une mesure sur Chapter. [12-Factor Agents](https://github.com/humanlayer/12-factor-agents), [Own your context window](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md).
