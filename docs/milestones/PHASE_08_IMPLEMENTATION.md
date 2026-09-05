# Chapter — Phase 8 : implémentation de la première tranche verticale

Ce document consigne le périmètre, les choix techniques et l’état de la première implémentation fonctionnelle de Chapter. Il traduit les phases 1 à 7 sans ouvrir les travaux de consolidation de composants, d’espace personnel avancé ou d’interactions sociales.

## Statut

- phase ouverte après validation explicite de la synthèse fonctionnelle de la phase 7 ;
- première tranche verticale implémentée, compilée et testée ;
- site responsive disponible pour évaluation du rendu et des parcours ;
- données simulées et état local uniquement ;
- **phase terminée et validée après évaluation du jalon corrigé**.

## Périmètre implémenté

La tranche verticale est centrée sur les pages de trois œuvres fictives, avec *Les Cartographies du vent* de Camille Maret comme œuvre initiale. Elle comprend :

- navigation générale différenciée desktop et mobile ;
- recherche simulée par titre ou auteur, dont chaque résultat ouvre réellement l’œuvre sélectionnée ;
- ouverture éditoriale P2–E2 avec présence forte de la couverture et des actions personnelles ;
- navigation locale H4 persistante vers « Mon journal », « À propos » et « Critiques » ;
- journal synthétique J2S ;
- résumé et repères A2 ;
- critiques publiques K3 dans leur état neutre, avec expansion « Lire la suite » ;
- adaptations mobiles V2, H4M1, J2SM2, A2M1 et K3M1 ;
- menu de compte minimal pour un utilisateur déjà authentifié ;
- vues fonctionnelles légères du Journal et de la Bibliothèque pour assurer la cohérence de la navigation globale, sans anticiper leur conception détaillée de phase 9.

## Corrections issues de l’évaluation du premier jalon

- le résultat principal de recherche était le seul à fermer la recherche, tandis que les deux autres n’avaient aucune action ; les trois résultats mettent désormais à jour l’œuvre, son titre, son auteur, son résumé, ses repères, sa moyenne et sa couverture ;
- les informations personnelles sont conservées séparément par œuvre pendant la session ;
- l’entrée globale « Bibliothèque » pointait par erreur vers `#about`, qui désigne uniquement la section locale « À propos » d’une œuvre ; elle ouvre désormais l’espace Bibliothèque ;
- l’entrée globale « Journal » ouvre de même le journal personnel, afin de ne pas la confondre avec la section locale « Mon journal » ;
- la navigation inférieure mobile reprend la même séparation sémantique ;
- les œuvres sans image testent la stratégie de couverture typographique déjà validée.

## Parcours personnels implémentés

### Lecture

- AJ2 : « Ajouter au journal » ouvre « Où en êtes-vous ? » uniquement à la demande ;
- les seuls statuts proposés sont « À lire », « En cours » et « Lu » ;
- le statut s’applique immédiatement sans publication automatique ;
- DT2 propose ensuite une date facultative adaptée, avec « Aujourd’hui », « Choisir une date » ou « Plus tard ».

### Note privée

- NP2 : un même éditeur contextuel est utilisé depuis la page de l’œuvre ;
- l’indication « Privée · visible uniquement par vous » reste explicite ;
- NS1 : l’enregistrement est volontaire et une tentative de fermeture après modification protège contre la perte du texte.

### Critique publique

- CR2R : le corps de la critique précède l’évaluation facultative et l’action de publication ;
- le texte est limité à 3 000 caractères, sans minimum autre qu’un contenu non vide pour publier ;
- EV1 : cinq étoiles entières, cliquables, sans encadrement permanent ;
- PB3 : publication immédiate, retour temporaire avec « Annuler », retrait de la critique et réouverture de l’éditeur en cas d’annulation ;
- aucune critique ne devient publique sans l’action explicite « Publier la critique ».

## Fondation technique

- application React et TypeScript basée sur Next/Vinext ;
- mise en forme responsive avec un seuil de travail stabilisé à 900 px ;
- données fictives et états conservés localement dans la session courante ;
- métadonnées de partage Chapter et visuels originaux pour la couverture et l’aperçu social ;
- compilation de production, lint et test de rendu HTML validés.

## Décisions d’implémentation provisoires

- le retour PB3 reste visible huit secondes dans cette première version afin de rendre le comportement testable ; sa durée et son animation définitives seront arbitrées en phase 9 ;
- les étoiles possèdent déjà des cibles cliquables et des libellés accessibles, mais leur dessin, leur espacement et leurs états définitifs relèvent de la phase 9 ;
- les valeurs de dimensions, rayons, ombres et transitions servent le rendu actuel sans constituer encore un système de composants stabilisé ;
- les modales et panneaux répondent aux usages de base au clavier, mais l’audit complet du focus, des lecteurs d’écran, des contrastes et du texte agrandi appartient à la phase 11.

## Hors périmètre de cette phase

- backend, persistance distante et synchronisation ;
- authentification et onboarding ;
- espace personnel complet, chronologie avancée et système de composants consolidé — phase 9 ;
- abonnements, commentaires, hiérarchie sociale K3 et découverte sociale — phase 10 ;
- audit transversal complet d’accessibilité et des états extrêmes — phase 11.

## Clôture

Le site fonctionnel et ses corrections de navigation ont été évalués puis confirmés. La phase 8 est donc officiellement clôturée. Les demandes portant sur le dessin détaillé des composants, le contenu complet du Journal et de la Bibliothèque ou la consolidation de l’espace personnel restent affectées à la phase 9.

La phase 9 n’est pas ouverte dans cette conversation. La synchronisation GitHub convenue est désormais achevée ; la prochaine étape consiste à commencer la phase 9 dans une nouvelle conversation du même projet.

## Continuité et archivage

- le dépôt partagé du projet est `https://github.com/maeldepreville/chapter` ;
- le code conserve un dépôt technique associé au déploiement comme `origin`, tandis que GitHub est configuré comme dépôt distant secondaire `github` ;
- le premier envoi GitHub est terminé et comprend le code, les ressources nécessaires, un README de projet et les documents de décision dans `docs/` ;
- le commit initial du dépôt distant a été conservé et suivi des quatre jalons significatifs de la tranche verticale, afin de rendre l’historique lisible sans écraser l’existant ;
- une nouvelle conversation dans le même projet est recommandée au passage à la phase 9, après synchronisation du dépôt et des documents ;
- cette conversation distincte devra s’appuyer sur les fichiers du projet comme source de vérité, plutôt que supposer que chaque détail du présent historique sera reproduit à l’identique.
