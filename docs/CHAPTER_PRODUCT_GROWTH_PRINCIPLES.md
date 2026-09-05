# Chapter — Principes produit, croissance et intégrité UX

Statut : **cadre transversal évolutif**  
Dernière mise à jour : 5 septembre 2026

## Finalité

Ce document aide à concilier la viabilité de Chapter — acquisition, activation, rétention et recommandation — avec sa promesse : soutenir la lecture, la mémoire personnelle, l’expression et des relations sociales utiles.

La croissance n’est pas considérée comme opposée à l’expérience utilisateur. Elle doit être la conséquence d’une valeur répétée et identifiable, et non d’une augmentation artificielle du temps passé ou du nombre d’interactions.

## Doctrine produit

> **Chapter doit donner envie de revenir parce qu’il accompagne réellement la vie de lecteur, pas parce qu’il crée une obligation de revenir.**

Une fonctionnalité de croissance est recevable si elle :

1. aide l’utilisateur à atteindre un objectif de lecture ou d’expression ;
2. améliore un résultat produit ou commercial explicite ;
3. respecte l’autonomie et la compréhension de l’utilisateur ;
4. possède des métriques de succès et des garde-fous ;
5. reste réversible lorsque ses effets observés contredisent l’intention initiale.

## Grille d’évaluation d’une décision

Pour chaque mécanisme susceptible d’influencer l’acquisition ou la rétention, documenter :

### 1. Résultat utilisateur

Quelle valeur concrète le lecteur obtient-il ? Exemples : trouver une œuvre pertinente, reprendre une lecture, conserver une pensée, découvrir une critique utile.

### 2. Résultat produit

Quel comportement ou sentiment souhaitable devrait évoluer ? Exemples : réussite de la première recherche, ajout d’une première œuvre, retour au journal, publication volontaire d’une critique.

### 3. Hypothèse de mécanisme

Pourquoi l’interface devrait-elle produire ce résultat ? La causalité supposée doit être explicite avant d’ajouter un élément visuel ou une sollicitation.

### 4. Risques et populations exposées

Le mécanisme peut-il créer de la pression, une publication involontaire, une comparaison sociale, une distraction ou une perte de confiance ? Peut-il affecter plus fortement les utilisateurs vulnérables ou très engagés ?

### 5. Mesure et garde-fou

Associer au résultat principal au moins une mesure de qualité ou de confiance. Une hausse d’engagement ne suffit pas si elle s’accompagne d’abandons, d’erreurs, de regrets ou d’un sentiment de contrainte.

## Acquisition

La refonte pré-lot 2 fixe une priorité : Chapter vise d'abord les jeunes lecteurs, les nouveaux lecteurs et les personnes qui n'ont pas encore construit leur vie de lecture dans un service concurrent. La migration des lecteurs déjà équipés reste une voie secondaire importante : import privé, continuité et réversibilité doivent réduire le coût de changement sans transformer l'accueil en outil de transfert.

Les leviers compatibles avec Chapter comprennent :

- une promesse compréhensible rapidement ;
- une identité visuelle mémorable mais lisible ;
- des pages d’œuvres et critiques partageables lorsque leur caractère public aura été conçu ;
- une découvrabilité organique fondée sur les livres, auteurs et opinions ;
- un onboarding contextuel conduisant directement à une première valeur personnelle.

Le parcours validé est : une œuvre → un statut → un premier repère. L'inscription intervient seulement lorsqu'elle devient nécessaire et restaure l'action engagée. Aucun questionnaire de goûts, profil complété, suivi de personnes ou tutoriel bloquant ne précède cette valeur. La source détaillée de ces décisions est [`REFONTE_PRE_LOT_2.md`](./REFONTE_PRE_LOT_2.md).

## Activation

L’activation ne doit pas être définie comme la simple création d’un compte. Une activation plus pertinente pour Chapter pourrait correspondre à une séquence telle que :

> trouver une œuvre → l'ajouter avec un statut → créer un premier repère → retrouver cette trace dans son journal.

Cette définition restera une hypothèse tant qu’elle n’aura pas été confrontée à des utilisateurs et à des données réelles.

## Rétention

La rétention souhaitée repose sur des usages à valeur élevée :

- reprendre une lecture en cours ;
- mettre à jour son statut ;
- ajouter une note privée ;
- retrouver son historique ;
- découvrir plus tard une œuvre ou une opinion pertinente.

Chapter ne doit pas confondre rétention avec temps passé. Sont notamment déconseillés sans justification forte :

- séries quotidiennes culpabilisantes ;
- notifications fréquentes sans événement utile ;
- compteurs sociaux dominants ;
- défilement infini conçu pour empêcher une fin naturelle ;
- faux sentiment d’urgence ;
- publication ou partage présélectionné.

## Motivation et autonomie

Le modèle comportemental de BJ Fogg décrit un comportement comme la convergence de la motivation, de la capacité et d’un déclencheur. Pour Chapter, ce cadre doit servir en priorité à **réduire l’effort** et à proposer des déclencheurs contextuels, plutôt qu’à intensifier artificiellement la motivation.

La théorie de l’autodétermination offre trois garde-fous utiles :

- **autonomie** : choix explicites, confidentialité claire, absence de culpabilisation ;
- **compétence** : interactions compréhensibles, progression maîtrisée, retours système utiles ;
- **relation** : échanges significatifs et découverte, sans transformer la popularité en statut dominant.

## Mesures recommandées

Le cadre HEART permet de ne pas réduire le succès à l’engagement :

- **Happiness** : satisfaction, confiance, sentiment de contrôle ;
- **Engagement** : actions significatives, sans assimiler automatiquement fréquence ou durée à de la valeur ;
- **Adoption** : découverte et usage des capacités essentielles ;
- **Retention** : retour vers des usages à valeur élevée ;
- **Task success** : réussite, temps raisonnable et faible taux d’erreur sur les parcours centraux.

Les métriques seront définies par objectif. Une métrique unique ne doit pas devenir une cible absolue : l’optimisation isolée favorise le déplacement du comportement vers la mesure plutôt que vers le résultat réel.

## Pratiques interdites par défaut

- options publiques ou marketing présélectionnées ;
- confirmations ambiguës ;
- difficulté artificielle à annuler, masquer ou quitter ;
- informations importantes dissimulées ;
- rareté ou urgence mensongère ;
- incitations sociales exploitant la peur de l’exclusion ;
- métriques de vanité utilisées comme hiérarchie principale ;
- expérimentation évaluée uniquement sur le clic ou le temps passé.

Une exception ne pourrait être envisagée qu’après démonstration d’un bénéfice utilisateur, analyse des risques et validation explicite.

## Références initiales

- Kerry Rodden, Hilary Hutchinson et Xin Fu, **Measuring the User Experience on a Large Scale: User-Centered Metrics for Web Applications** — cadre HEART : <https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/>.
- BJ Fogg, **Fogg Behavior Model** — motivation, capacité et déclencheur : <https://www.behaviormodel.org/>.
- Self-Determination Theory, **Basic Psychological Needs** — autonomie, compétence et relation : <https://selfdeterminationtheory.org/topics/application-basic-psychological-needs/>.
- Teresa Torres, **Shifting from Outputs to Outcomes** et *Continuous Discovery Habits* — distinction entre résultats produit, résultats business et métriques de traction : <https://www.producttalk.org/shifting-from-outputs-to-outcomes/>.
- Center for Humane Technology, **Building Products That Prioritize People** — métriques fondées sur les valeurs et respect de la psychologie humaine : <https://www.humanetech.com/humane-product-design>.
- Arunesh Mathur et al., **Dark Patterns at Scale: Findings from a Crawl of 11K Shopping Websites** : <https://dl.acm.org/doi/10.1145/3359183>.
- Federal Trade Commission, **Bringing Dark Patterns to Light** : <https://www.ftc.gov/reports/bringing-dark-patterns-light>.
- Nielsen Norman Group, **Campbell’s Law: The Dark Side of Metric Fixation** : <https://www.nngroup.com/articles/campbells-law/>.

Cette bibliographie sera enrichie au moment où un sujet concret — onboarding, notifications, recommandations, partage ou mécanique sociale — exige une littérature plus spécialisée.
