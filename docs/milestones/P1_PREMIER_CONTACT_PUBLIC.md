# Chapter — P1, premier contact public

Dernière mise à jour : 5 septembre 2026.

Statut : **reprise visuelle disponible pour recette privée en version Sites 33 ; validation utilisateur requise**.

## But

P1 transforme l'arrivée sur Chapter en expérience publique immédiatement utile. Une personne sans compte doit comprendre la proposition du produit, explorer une sélection et ouvrir une œuvre sans rencontrer de commande personnelle, sociale ou d'inscription prématurée.

## Résultat attendu

1. **Comprendre** : l'entrée exprime que Chapter relie une mémoire de lecture privée à des chemins publics choisis, en gardant l'œuvre au centre.
2. **Explorer** : Découvrir propose une œuvre d'entrée, trois directions sensibles et une continuité éditoriale sans classement de popularité.
3. **Rechercher** : un titre ou un auteur filtre immédiatement le catalogue public, sans soumission ni compte.
4. **Ouvrir** : chaque œuvre dispose d'une URL directe et d'une fiche publique comprenant identité, présentation, synopsis, repères bibliographiques et chemins voisins.
5. **Naviguer** : Découvrir et Recherche restent les deux seules destinations principales publiques de P1, sur desktop et mobile.

## Décisions de composition P1

- La racine ouvre Découvrir, pas un écran promotionnel ni une fiche personnelle préremplie.
- Le premier écran associe une entrée éditoriale courte à une illustration-signature, puis conduit immédiatement vers une œuvre ouvrable ; la présentation du produit ne repousse pas l'activité principale sous une succession de blocs marketing.
- Le retour de recette de la version 32 invalide la monumentalité de l'ancien titre « Chaque lecture laisse une trace. Certaines ouvrent un chemin. » et le rythme trop dépendant des seules couvertures. La reprise adopte « Ici, on commence par une œuvre. », une échelle nettement réduite et une composition texte–illustration plus humaine.
- L'illustration P1 matérialise la trace laissée par une lecture au moyen d'un livre ouvert et d'un marque-page brique reliant un second ouvrage. Elle apporte une présence visuelle propre à Chapter sans simuler d'interface ou de fonctionnalité.
- Les directions de découverte utilisent des sensations compréhensibles plutôt qu'un score, une tendance ou une promesse de recommandation personnalisée.
- La recherche P1 couvre œuvres et auteurs. Lecteurs et listes rejoindront cette surface avec la recomposition sociale de P4.
- Une œuvre ouverte depuis Recherche revient à Recherche sans perdre la requête de la session ; une œuvre ouverte depuis Découvrir revient à Découvrir.
- La fiche œuvre P1 ne montre ni statut, ni note privée, ni critique, ni abonnement. P2 introduit le premier repère et l'inscription ; P4 introduit les traces publiques et conversations.
- Aucun appel à créer un compte n'est exposé avant que P2 puisse restaurer le geste qui l'a déclenché.

## Routes et données

| Route | Résultat public |
| --- | --- |
| `/` et `/decouvrir` | Entrée éditoriale et exploration |
| `/recherche` | Recherche immédiate par titre ou auteur |
| `/oeuvres/:workId` | Fiche publique directement rechargeable |

Le catalogue P1 contient 24 œuvres fictives cohérentes, chacune reliée à un `authorId` et un `editionId` stables. Les six œuvres cœur restent partagées avec le socle connecté ; dix-huit œuvres supplémentaires vivent dans `app/p1-public-fixtures.ts`. Les routes inconnues et les états d'erreur détaillés restent à consolider dans P6.

## Ce qui doit être visible dans la candidate

- une nouvelle arrivée publique « Ici, on commence par une œuvre. », accompagnée d'une illustration éditoriale originale ;
- la navigation publique limitée à `Découvrir` et `Recherche` ;
- une œuvre d'entrée, trois directions horizontales sur mobile et une continuité éditoriale ;
- une recherche affichant les 24 œuvres et filtrant au fil de la saisie ;
- une fiche œuvre publique plus sobre, avec `À propos` et `Chemins voisins` ;
- des mises en page distinctes mais cohérentes au-dessus et au-dessous de 900 px.

## Ce qui ne doit pas encore être visible

- inscription, connexion réelle ou récupération d'une action après inscription ;
- statuts `À lire`, `En cours`, `Lu`, marque-page de progression ou premier repère ;
- Journal et Bibliothèque recomposés ;
- critiques, profils, listes, abonnements et conversations recomposés ;
- réglages de confidentialité, blocage, export, import ou suppression ;
- backend, persistance distante, recommandation calculée ou modération opérationnelle.

Les anciens parcours du lot 1 restent présents dans le code et dans leurs tests pour prévenir les régressions. Ils ne constituent pas le premier contact public P1 et seront recomposés dans leurs jalons respectifs.

## Critères d'acceptation

- [x] La racine rend une coquille publique et n'expose aucune destination privée.
- [x] Toutes les actions visibles de Découvrir et Recherche ouvrent une destination réelle.
- [x] Les trois routes P1 répondent directement après construction de production.
- [x] Le catalogue public utilise des identifiants stables et couvre au moins deux dizaines d'œuvres.
- [x] La fiche œuvre publique ne contient aucun contrôle réservé à P2, P3 ou P4.
- [x] Le responsive de référence à 900 px, les cibles tactiles, le focus visible et le mouvement réduit sont préservés statiquement.
- [x] Tests ciblés, lint, build, suite complète et `git diff --check` réussissent.
- [ ] La composition, la lisibilité, le rythme, le débordement et les interactions sont validés par recette visuelle desktop et mobile.
- [ ] L'utilisateur valide explicitement P1 avant synchronisation GitHub ; la mise à disposition Sites pour recette ne vaut pas validation.

## Preuves et limites de la candidate

- `tests/p1-public.test.mjs` vérifie le volume et les identifiants du catalogue, l'absence de commandes prématurées, les actions principales, la navigation de la racine, les routes directes, le responsive déclaré et le mouvement réduit.
- `tests/rendered-html.test.mjs` protège la nouvelle entrée publique rendue par le serveur.
- Les tests historiques continuent d'exécuter les parcours connectés à travers une injection interne explicite.
- Les preuves automatisées ne remplacent pas une recette réelle dans Safari/Chrome ni l'inspection visuelle aux largeurs desktop et mobile.
- Le commit et l'envoi techniques requis pour le Site de recette restent séparés de la synchronisation GitHub du jalon, qui attend sa validation.
- La source candidate a été enregistrée et déployée avec succès en version Sites 32 le 5 septembre 2026, sous l'accès privé existant. Son commit technique de publication est `c427bef9d5a7b3f11645fb3e2175e0511d5c3901` ; le commit produit P1 reste `da8bebfe443893162457e6d6efbe86d41dcb58f1` sur la branche locale, sans envoi GitHub avant validation.
- La version 32 confirme par recette le bon fonctionnement des retours et de la Recherche, dont la composition est conservée. Son premier écran reste refusé dans son rythme et sa singularité visuelle ; la reprise ne vaut pas validation de P1.
- La reprise est construite, vérifiée et déployée avec succès en version Sites 33 le 5 septembre 2026, toujours sous l'accès privé existant. Son commit produit est `38d08d156fad536128064fb5e0c7ed2bfcebd9f1` et son commit technique de publication est `4c82db330150da397e83d21654af48816bad703e` ; aucun envoi GitHub du candidat non validé n'a été effectué.
- La recette de la version 33 valide la nouvelle composition mais relève que l'illustration ne charge pas. L'asset est bien présent dans la construction ; son URL était toutefois réécrite vers le service d'optimisation Vinext. Le correctif conserve les dimensions réservées et sert directement le WebP déjà optimisé, sans modifier la composition.

## Recette utilisateur attendue

1. Sur desktop, vérifier la nouvelle première vue, l'équilibre texte–illustration, l'échelle du titre et la présence rapide d'une œuvre ouvrable.
2. Ouvrir les œuvres depuis la mise en avant, chacune des trois directions et les lignes finales ; vérifier le retour à Découvrir.
3. Ouvrir Recherche, tester un titre, un auteur, une recherche sans résultat, `Effacer` et l'ouverture du résultat.
4. Recharger directement `/decouvrir`, `/recherche` et une URL telle que `/oeuvres/atlas`.
5. Sur mobile, vérifier les deux destinations inférieures, le rail horizontal à trois directions, le scroll, les longueurs de titres et la fiche œuvre.
6. Vérifier qu'aucun statut, Journal, Bibliothèque, profil, critique ou commande de compte ne se glisse dans ce premier contact.

La candidate vérifiée est mise directement à disposition sur le Site de recette. Après validation explicite, P1 sera synchronisé sur la branche GitHub `refonte-pre-lot-2`, puis P2 — Premier repère deviendra l'unique prochaine action.
