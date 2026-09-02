# Chapter — registre des données statiques du prototype

Dernière mise à jour : 1er septembre 2026.

Ce registre distingue les valeurs figées qui faussaient un parcours de celles qui constituent encore volontairement les données simulées du lot 1. Une chaîne visible n'est pas un identifiant : permissions, navigation et relations doivent toujours utiliser des identifiants stables, et les paramètres reçus par un callback doivent être transmis à la destination.

## Incohérences corrigées

| Risque constaté | Correction candidate |
| --- | --- |
| Découvrir recevait un identifiant de liste mais ouvrait toujours `places`. | L'identifiant reçu est désormais transmis jusqu'à la liste publique. |
| L'auteur d'une critique ou d'une réponse était reconnu par son nom affiché. | Les droits d'édition, le blocage et l'ouverture de profil reposent sur des identifiants d'acteurs stables. |
| Noms, initiales et présentations de Maël et Lina étaient recopiés dans plusieurs composants. | `app/prototype-data.ts` centralise l'identité et les présentations simulées. |
| Titres, descriptions, œuvres et aperçu de listes étaient dupliqués. | `app/catalogue.ts` porte un catalogue canonique dont les différentes vues dérivent. |
| Domaine et chemin du profil public étaient répétés. | `app/site-config.ts` fournit l'origine, le chemin et l'URL publique canoniques. |

Le test `tests/hardcoded-data.test.mjs` protège ces règles et interdit notamment le retour des comparaisons de noms pour déterminer un droit.

## Données encore volontairement simulées

| Zone statique actuelle | Remplacement attendu après le lot 1 |
| --- | --- |
| Lecteur courant et acteurs de démonstration dans `prototype-data.ts` | Session authentifiée et API de profils. |
| Présentation, favoris et titre exposé des profils | Données de profil persistées et réglages du lecteur. |
| `defaultWorks` dans `catalogue.ts` | Catalogue distant avec identifiants pérennes. |
| Entrées de bibliothèque, traces du Journal et compteurs de lecteurs | Stockage utilisateur et agrégats du service. |
| Deux listes publiques, leurs descriptions et leurs œuvres | Entités de listes rattachées à leur propriétaire dans le backend. Le partage actuel du même catalogue de listes entre Maël et Lina est une limite de démonstration, pas le modèle métier final. |
| Badges, titres exposables et progression | Progression calculée et persistée par compte. |
| Parcours de recommandation, œuvre d'ancrage et liste mise en avant | Moteur de recommandation et configuration éditoriale administrable. |
| Critiques, réponses, états de suivi et dates sociales centralisés dans `social-data.ts` | Service social persistant avec profils navigables, modération et permissions côté serveur. |
| Route fixe `/profil/mael-depreville` | Route de profil dynamique fondée sur un identifiant ou un slug durable. |

Toute nouvelle donnée simulée doit rejoindre l'un de ces modules canoniques ou être ajoutée à ce tableau. Elle ne doit pas être recopiée dans un composant pour piloter une permission, une destination ou une relation.

## Constantes produit et techniques conservées

Ces valeurs sont figées par une décision produit ou une contrainte technique et ne constituent pas, à ce stade, une incohérence de données : limite de critique à 3 000 caractères ; images JPEG/PNG/WebP de 8 Mo maximum et 512 px minimum ; trois badges exposés ; seuil FC1 ; durées et comportements AM1/QRM1b ; tailles minimales de contrôles et seuils responsive.

`https://app.local` dans `app/chatgpt-auth.ts` est une origine sentinelle interne utilisée pour normaliser et contrôler les URL ; elle ne représente ni le domaine public ni une donnée de démonstration. `SITE_ORIGIN` est désormais centralisée ; elle pourra devenir une variable d'environnement si plusieurs domaines ou environnements publics doivent coexister.
