# Chapter — Phase 11 : consolidation transversale

Dernière mise à jour : 2 septembre 2026.

Statut : **phase 11 et lot 1 clôturés le 2 septembre 2026 sur la version Sites 31. Trois ensembles puis la charte AM1 sont validés et implémentés ; CT1 reste refusé. Les reprises de recette du volet 4 sont intégrées et le jalon regroupé est accepté.**

## 1. Point de départ et limites

**Consignes prioritaires :** le 27 août 2026, l'utilisateur demande d'attendre plusieurs étapes avant de publier un jalon regroupé ; cette règle de publication demeure. Le 1er septembre, il révise en revanche le cycle de développement : une demande de correctif ou d'implémentation autorise désormais sa réalisation directe pour évaluation, puis validation ou reprise. Cette autorisation ne vaut ni publication, ni synchronisation GitHub, ni recette accomplie.

La phase 10 reste terminée et validée sur la version Sites 24. La présente phase termine le lot 1 : « Traiter les états transversaux et finaliser la cohérence, le responsive et l'accessibilité ». La demande, réitérée après une interruption de crédits, ouvre le travail de consolidation, pas une autorisation générale de développement.

Références : `CHAPTER_DECISIONS.md`, `PHASE_10_BILAN_ET_PASSATION.md`, `PHASE_10_IMPLEMENTATION_CHECKLIST.md` et les règles de `../AGENTS.md`. Le dépôt était propre au début de l'examen, sur `bbfadab`. Aucune nouvelle vérification distante GitHub n'est réalisée à cette ouverture ; les confirmations de synchronisation antérieures restent celles de la passation.

Préserver les choix PDR1B, PFP1, N1b, QR1, HDE1, HV1 et HMT1, les dessins des badges et le poinçon fourni. Ne pas rouvrir les arbitrages graphiques sans défaut démontré et nouvel accord.

Le prototype conserve des données simulées et des interactions locales à la session. Authentification réelle, onboarding, persistance distante, messagerie, notifications complètes, listes collaboratives, classements, moteur réel de recommandation et administration restent exclus. Les vérifications de confidentialité portent sur les vues de démonstration, pas sur la sécurité d'un backend inexistant.

## 2. Ordre de travail proposé — à valider

1. **Superpositions et continuité des actions** : fermetures, focus, clavier, protection des saisies, restitution du contexte et arbitrage des surfaces simultanées.
2. **États transversaux et cas limites** : absence de données, résultats vides, erreurs d'image ou de partage, noms/titres/écrits longs, données incomplètes, clics répétés. Réutiliser les comportements déjà validés ; ne pas simuler une panne réseau d'un service absent.
3. **Responsive, cohérence et accessibilité** : petits écrans, seuil de 900 px, texte agrandi, débordements, navigation et contrôles au clavier, lecteurs d'écran, contrastes, cibles tactiles ; discussion dédiée aux animations et transitions (utilité, rythme, cohérence, réduction du mouvement), en conservant les choix S2 et QRM1b sauf nouvel arbitrage.
4. **Clôture du lot** : non-régression ciblée des parcours personnels et sociaux, bilan technique, checklist exhaustive et validation utilisateur. La validation du jalon déclenchera la synchronisation GitHub directe conformément à `AGENTS.md`.

Ces ensembles organisent l'audit et ne constituent pas une autorisation de refonte. Depuis le 1er septembre, les correctifs demandés peuvent être implémentés directement comme candidats à l'évaluation ; les choix de direction encore ambigus restent arbitrés avant développement.

## 3. Premiers constats — examen statique uniquement

| Référence | Constat et preuve dans la source | Conséquence à vérifier lors de la recette |
| --- | --- | --- |
| P11-F01 | Les modales de recherche, note, critique et photo utilisent `role="dialog"` / `aria-modal`, mais aucun confinement du focus ni retour explicite au déclencheur n'est implémenté dans ces composants. Quelques champs ont `autoFocus`. Sources : `app/page.tsx`, `app/phase10.tsx`. | Le parcours au clavier n'est pas garanti dans la seule surface active ; la fermeture peut perdre le point de reprise. |
| P11-F02 | `removePhotoConfirm` appartient à `ProfileView` sans gestionnaire Échap propre. Le gestionnaire global et son verrouillage de défilement n'incluent pas cet état. Sources : `ProfileView` dans `app/phase10.tsx`, effets de `app/page.tsx`. | La confirmation de retrait de photo ne bénéficie pas des mêmes règles de fermeture et de défilement que les autres modales. |
| P11-F03 | Les protections NSV2 remplacent les actions de l'éditeur et rendent le texte non modifiable, sans déplacement explicite du focus vers « Revenir à la note/critique ». Source : éditeurs de `app/page.tsx`. | L'alerte peut ne pas être rencontrée immédiatement au clavier ; le retour à l'écrit n'a pas de point de focus explicitement géré. |
| P11-F04 | Le déplacement de la photo repose sur les événements de pointeur ; le zoom possède un curseur natif mais le cadrage horizontal/vertical n'a pas de commande clavier. Source : `PhotoCropper` dans `app/phase10.tsx`. | À examiner dans le volet accessibilité des contrôles ; solution et éventuels contrôles visibles à arbitrer séparément. |

Point déjà résolu : la fermeture extérieure du compte existe dans le gestionnaire `pointerdown`, qui distingue le menu desktop et la feuille mobile. Prévoir sa non-régression, pas son développement comme fonctionnalité manquante.

## 4. Premier ensemble proposé — superpositions, fermetures et focus

**Statut : validé explicitement le 27 août 2026 ; implémentation autorisée, sans refonte graphique.**

- Une vraie modale reçoit le focus à l'ouverture, garde Tab/Maj+Tab dans son contenu et rend le fond inactif. À la fermeture, restituer le focus au déclencheur s'il existe encore, sinon à un point logique du parcours.
- Les menus non modaux ne piègent pas Tab. Préserver le fonctionnement déjà validé du tri, des mini-fiches et du compte ; ne pas transformer indistinctement toutes les surfaces en dialogues bloquants.
- Échap, le bouton de fermeture et le clic extérieur lorsqu'il est prévu suivent une politique cohérente, propre à la surface au premier plan. Aucun geste ne ferme plusieurs couches à la fois.
- Sans modification, fermer normalement. Avec une note ou une critique modifiée, conserver NS1/NSV2 : alerte intégrée, aucun deuxième dialogue visuel ; focus sur l'action sûre « Revenir à… ». Échap depuis l'alerte ramène à l'éditeur sans perdre le texte. Seul « Ignorer les modifications » abandonne explicitement la saisie.
- Pour le retrait de photo, Échap ou le clic extérieur annule la confirmation et conserve la photo ; le focus et le défilement suivent les règles communes. Après retrait, un repli logique doit être prévu si l'ancien déclencheur a disparu.
- Ne pas ajouter de nouvelle confirmation au recadrage de photo sans arbitrage spécifique : PFP1 conserve son annulation actuelle et la dernière photo enregistrée.
- Conserver les dimensions, couleurs, compositions et assets existants. Cette proposition porte sur le comportement, pas sur une comparaison de nouvelles directions graphiques.

Référence technique consultée le 27 août 2026 : [W3C WAI-ARIA APG — Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), pour le focus initial, son confinement, le fond inactif et le retour au déclencheur. Cette référence n'est pas une preuve de conformité du prototype.

## 5. Vérifications à préparer après autorisation

Pour chaque surface concernée : ouverture souris/toucher/clavier, position du focus initial, Tab et Maj+Tab aux extrémités, visibilité du focus, Échap, bouton de fermeture, clic extérieur, préservation/abandon explicite des saisies, retour au déclencheur ou repli, défilement et absence d'action sur le fond. Tester également les successions rapides et la transition statut → date.

Pour NSV2 : texte inchangé puis modifié ; première demande de fermeture, retour sûr, seconde demande et abandon explicite ; absence de publication/enregistrement implicites. Pour le retrait de photo : annulation et conservation, puis retrait et retour aux initiales.

La recette navigateur et visuelle reste à exécuter avec l'autorisation correspondante ; aucun test navigateur, lecteur d'écran, mesure de contraste ou test responsive n'a été réalisé dans ce tour. Aucun nouveau build ou test automatique n'est exécuté puisque seuls les documents changent. Les 22 tests et le build réussis cités dans la passation sont des preuves du jalon précédent ; le typage global reste signalé comme limité par les déclarations Cloudflare manquantes.

## 5 bis. Deuxième ensemble validé — données absentes et erreurs de couverture

Statut **validé explicitement par l'utilisateur ; implémentation autorisée**. Cette validation remplace le statut de proposition précédent et ne vaut ni recette effectuée, ni autorisation de publier.

| Référence | Constat | Preuve et limite |
| --- | --- | --- |
| P11-F05 | Découvrir, profil et listes remplacent une œuvre introuvable par `works[0]`. | Trois essais de rendu serveur avec catalogue vide échouent sur une propriété `title` absente. Il ne s'agit pas d'une panne observée sur le jeu complet publié. |
| P11-F06 | Un catalogue incomplet peut produire des substitutions trompeuses. | Avec la liste « places » et une seule œuvre disponible, le rendu serveur produit six articles affichant cette même œuvre. |
| P11-F07 | Le Journal utilise des traces de démonstration fixes et rend leur premier élément sans branche vide. | Lecture de `app/page.tsx` ; le bouton sans lecture dirige toujours vers « À lire », même si cette catégorie est vide. |
| P11-F08 | La justification de découverte par défaut mentionne toujours les Cartographies du vent. | `DiscoverView` ne branche pas la justification sur l'absence de signal personnel, contrairement à EH1. |
| P11-F09 | Les couvertures ne gèrent pas l'échec de leur image. | `WorkCover` et `CompactCover` n'ont pas de repli `onError` ; la couverture typographique n'est utilisée que si l'image est déclarée absente. |

Les essais de rendu ont été exécutés en mémoire avec des fixtures temporaires, sans navigateur, changement de source, nouveau build ni publication.

### Corrections autorisées

1. Résoudre les œuvres par identifiant sans substitution arbitraire. Dans les propositions, favoris et listes, afficher les éléments réellement disponibles, avec des nombres cohérents ; si aucun élément ne reste, proposer un état sobre et un retour utile. Les traces personnelles et leurs textes ne sont pas supprimés si leurs métadonnées d'œuvre manquent : indiquer l'indisponibilité sans faux lien.
2. Raccorder les trois états vides du Journal validés en phase 9 : sans lecture avec traces ; lectures sans traces ; absence totale fusionnée. Si « À lire » est vide, l'action devient « Rechercher une œuvre ». Bibliothèque vide ne signifie jamais historique effacé ; le retrait organisationnel conserve les écrits.
3. Appliquer EH1 sans historique exploitable : sélection éditoriale et justification « Un choix de Chapter pour commencer », envies facultatives. Ne pas créer de moteur réel de recommandation ; la justification doit correspondre aux seuls signaux disponibles.
4. Préserver l'image valide, garder un état neutre stable pendant son chargement, puis afficher le remplacement typographique de la même œuvre après échec, selon les choix M1M2/L2 déjà validés.

Prévoir des fixtures internes pour vérifier ces cas sans demander à l'utilisateur d'effacer ses données ou de modifier le code. Pas d'onboarding, panneau public de débogage, nouveaux comptes ou persistance distante. Les états vides de Bibliothèque déjà présents seront vérifiés en non-régression.

L'import photo, le partage, les textes très longs et le cadrage au clavier restent à examiner dans les sous-ensembles suivants ; aucun nouvel écran ni nouveau traitement de ces sujets n'est autorisé ici.

## 6. Journal de phase

- 27 août 2026 : « Bien passons à la suite alors. » Ouverture du volet 3 et poursuite de la méthode proposée, pas autorisation anticipée d'implémenter une animation. Lecture ciblée du code, formulation de la charte et comparaison AM1/AM2 dans la conversation. Aucune modification applicative, nouveau build, recette navigateur ou publication. Les 70 tests restent la preuve du troisième ensemble au commit `9547a2ad1a2678a58d54691d1ae3a7b1cec5ab9e`, synchronisé et vérifié au tour précédent.

- 27 août 2026 : l'utilisateur valide le troisième ensemble et demande une analyse de `emilkowalski/skills` pour le prochain volet. Validation consignée et correctifs implémentés ; analyse documentaire des principaux guides du dépôt, sans installation de skills externes, ajout de dépendance ni application de leurs instructions au projet. Publication toujours différée. Les conclusions sont une proposition de méthode, pas un nouvel arbitrage de mouvement validé.

- 27 août 2026 : l'utilisateur demande de poursuivre. Audit des textes longs, de l'import photo, du recadrage et de la copie/du partage ; six diagnostics ciblés sur gestionnaires simulés et rendu serveur. Proposition du troisième ensemble ci-dessous, sans autorisation de développement. Aucun changement applicatif, asset, build, test navigateur ou déploiement dans ce tour ; seules les notes de suivi sont mises à jour.

- 27 août 2026 : l'utilisateur valide les correctifs liés aux états vides et données manquantes. Implémentation du deuxième ensemble autorisée, publication toujours différée. Il demande quand les animations seront abordées : sujet rattaché au volet 3, cohérence et accessibilité, avant la recette finale. Les choix S2 (retours tonaux des boutons, sans déplacement ni rebond) et QRM1b (retournement de la carte de lecteur, environ 440 ms, alternative à mouvement réduit) restent acquis. L'harmonisation des transitions, leur rythme et leur utilité devront être discutés avant tout nouveau développement d'animation ; aucun effet nouveau n'est autorisé par cette question.

- 27 août 2026 : premier ensemble accepté par l'utilisateur ; publication reportée à un jalon regroupé. Audit du deuxième ensemble avec lecture du code et essais de rendu sur données absentes/incomplètes. Mise à jour documentaire uniquement ; pas de nouveau développement, build ou déploiement.

- 27 août 2026 : ouverture explicite du lot 1 / phase 11 ; lecture de la passation, des règles du dépôt et du journal transversal ; examen statique ciblé des superpositions ; proposition du premier ensemble de corrections. Documentation seule, sans changement applicatif, publication ni push.
- 27 août 2026 : « Je valides ce premier ensemble de correctifs. » Autorisation reçue pour le premier ensemble uniquement. Elle remplace son statut de proposition et ne valide ni les autres volets ni une recette non encore exécutée. Mise en place de dialogues natifs modaux partagés, restauration du focus, protection NSV2 intégrée et fermeture sûre du retrait de photo ; tests et publication à vérifier avant livraison.

## 7. Implémentation du premier ensemble

Les cinq surfaces bloquantes (recherche, note, critique, recadrage photo, retrait de photo) emploient un composant commun `Modal`, ouvert avec le dialogue natif `showModal()`. Le navigateur rend le fond inactif ; des gestionnaires explicites gèrent les bornes Tab/Maj+Tab et la fermeture sûre par Échap ou annulation native. Les conteneurs et les règles visuelles existants sont préservés ; seules les valeurs par défaut du dialogue natif sont neutralisées.

Le verrou de défilement est compté et restaure la valeur antérieure après la dernière surface. Les gestionnaires globaux du compte et d'Échap ignorent les événements tant qu'une modale est ouverte. Les menus du compte, du tri, de statut et les mini-fiches ne sont pas convertis en modales.

NSV2 conserve une seule surface : le dialogue prend temporairement le rôle d'alerte et le libellé de la confirmation, le focus passe sur « Revenir à… », puis revient au champ lors de la reprise. Le déplacement du focus peut faire défiler l'intérieur de l'éditeur pour rendre l'action visible. Le texte et l'évaluation restent préservés ; seul l'abandon explicite les ignore.

Après fermeture, le focus revient au déclencheur encore disponible sans défilement de page. Si le déclencheur a disparu, le retrait de photo utilise « Ajouter une photo » et une navigation depuis la recherche utilise le titre de la page de destination. La restitution est différée à la fin du rendu et n'interrompt pas l'ouverture d'une autre modale.

Onze nouveaux tests automatisés couvrent la logique de focus, de verrouillage, de transitions rapides, de fermeture et le raccordement des cinq surfaces. Ils utilisent des doublures minimales et des vérifications de source ; ils ne simulent pas un navigateur et ne prouvent pas le comportement natif d'inertie, le rendu mobile ou les annonces d'un lecteur d'écran. La [checklist exhaustive du jalon](./PHASE_11_IMPLEMENTATION_CHECKLIST.md) reste à exécuter par l'utilisateur. Aucun audit navigateur n'est annoncé.

P11-F04 (déplacement du cadrage photo au clavier) et les autres volets restent à arbitrer. La validation de ce premier ensemble ne clôture pas la phase 11.

Contrôles avant publication : lint réussi, typage ciblé de `modal.tsx`, `modal-behavior.ts`, `page.tsx` et `phase10.tsx` réussi, 31 tests hors rendu serveur réussis. Le build de production et les deux tests de rendu serveur restent à vérifier lors de la préparation du jalon. Aucun succès de publication ou de synchronisation n'est déduit de ces contrôles.

### Résultat des vérifications du premier ensemble

Ce résultat remplace l'état de contrôles partiels précédent : **build de production réussi, lint réussi, typage ciblé réussi et 33 tests automatisés réussis**, dont les deux tests de rendu serveur. Aucun test navigateur ou lecteur d'écran n'a été exécuté.

Le code et la documentation de préparation sont synchronisés directement sur GitHub au commit `4db6c22cb7b75cf531513385f25e952a097c1651`. L'arbre GitHub créé est identique à l'index préparé (`6223c41bb0fd3d3acaffa1131146138aea4c162d`) ; le même commit a été récupéré localement, sans recréer l'historique, puis la référence distante a été avancée sans forcer et relue. Les notes de résultat sont reprises dans la mise à jour documentaire consignant la publication différée.

La version Sites **25** a été enregistrée depuis ce commit, **pas déployée** :

- Projet : `appgprj_6a89f5d96774819197b23b79c7c07abd`.
- Version sauvegardée : `appgprj_6a89f5d96774819197b23b79c7c07abd~appgver_dc314583ba008191bd17d203656876de`.
- Aucun identifiant de déploiement n'existe encore ; la version en ligne reste la 24.
- L'archive temporaire a été supprimée après vérification du projet et du commit de la version enregistrée ; elle n'est plus nécessaire pour déployer cette version.

La préparation initiale s'était arrêtée avant déploiement, faute d'accord explicite pour publier ce site préexistant. L'utilisateur a depuis demandé de regrouper plusieurs étapes : ce flux reste donc inactif. La version 25 n'est pas automatiquement la cible du futur jalon ; celui-ci devra refléter l'ensemble des changements alors validés, faire l'objet des vérifications correspondantes et recevoir un accord de publication distinct. Ne pas présenter la validation de conception comme une recette utilisateur accomplie.

## 8. Implémentation du deuxième ensemble

- Résolution des œuvres par identifiant sans repli vers la première œuvre. Découvrir, les favoris, les listes et la page d'œuvre supportent l'absence de données. Les listes affichent seulement les œuvres disponibles et des nombres cohérents ; les commentaires restent associés à leur identifiant original.
- Les textes des traces personnelles et critiques de profil restent lisibles si les métadonnées manquent, sous « Œuvre indisponible », sans lien ni commande de modification trompeurs. Aucun retrait de bibliothèque n'efface les traces.
- Les trois états du Journal sont raccordés aux lectures et traces réellement présentes. Une liste À lire vide mène à la recherche. Le rail et la chronologie vides ne sont pas rendus. L'enregistrement d'une première note/critique ou d'une étape de lecture alimente l'état local du Journal ; l'annulation d'une critique restaure sa trace antérieure sans supprimer les autres écrits.
- EH1 conserve le parcours éditorial et les envies facultatives. La justification liée aux Cartographies n'apparaît que si cette œuvre existe et qu'un signal de lecture, d'évaluation ou d'écrit lui est réellement associé. Une simple intention À lire n'est pas interprétée comme une lecture. Aucun moteur de recommandation ni seuil opaque n'est ajouté.
- `CoverFrame` centralise le chargement neutre, l'image réussie et le repli typographique. Les formats et assets existants sont conservés ; un changement d'œuvre ou de source réinitialise le cycle. Aucun mouvement nouveau n'est introduit.
- Les fixtures sont internes aux tests, via des données initiales injectables ; aucune commande publique, paramètre d'URL, nouvelle route ni persistance distante. Aucun utilisateur n'a besoin d'effacer ses données pour vérifier les états vides.

Vérifications exécutées : **build de production réussi ; lint réussi ; typage strict ciblé réussi ; 49 tests automatisés réussis, dont 16 nouveaux**. Les nouveaux tests couvrent les rendus vides/incomplets, les trois états du Journal, les raisons éditoriales, les compteurs, les premiers écrits, le retrait et son annulation, l'annulation de publication, les actions de récupération de Bibliothèque et les transitions d'état des couvertures.

Limites : rendus serveur et gestionnaires exécutés avec des doublures de hooks, pas un navigateur. Aucun test visuel, chargement réseau réel d'image, lecteur d'écran ou audit global de contraste n'est déclaré effectué. Les tests existants des routes compilées restent inclus. La checklist des deux ensembles est mise à jour et reste non cochée.

Aucune publication ni nouvelle version Sites n'accompagne cet ensemble. La suite reste l'audit des autres cas limites (textes longs, import/partage, actions répétées), puis le volet responsive, animations et accessibilité avant la recette finale.

## 9. Troisième ensemble validé — textes longs et erreurs d'action

**Statut : validé explicitement le 27 août 2026, puis implémenté.** Ce statut remplace la proposition précédente. Il relève toujours du volet 2 de la phase 11. Les animations, le cadrage au clavier et l'audit global responsive/accessibilité restent dans le volet 3 ; aucun nouveau mouvement n'est introduit ici.

### Constats et limites de preuve

Examen de `PhotoCropper`, `ProfileView` et `SocialReviews` dans `app/phase10.tsx`, des écrits dans `app/page.tsx` et des deux feuilles CSS. Diagnostic Node en mémoire à l'aide du chargeur et des doublures de hooks déjà présents dans `tests/helpers/load-tsx.mjs` : aucune API native de navigateur, photo réelle ou copie dans le presse-papiers n'a été utilisée.

| Référence | Constat | Preuve |
| --- | --- | --- |
| P11-F10 | Deux imports successifs ne sont pas ordonnés par la dernière intention. | Sélection A puis B ; fin de B, puis de A : la source B est remplacée par A. Aucun identifiant de requête ni invalidation des callbacks tardifs. |
| P11-F11 | Une exception pendant la production du recadrage n'est pas traduite en message local. | Exception simulée dans `drawImage` : exception propagée, aucune alerte dans le panneau. Aucun enregistrement ni fermeture n'a eu lieu dans cet essai. `toDataURL` appartient au même chemin non protégé. |
| P11-F12 | Le repli de copie peut lui-même échouer sans retour utilisateur et sans nettoyage. | Refus simulé de `clipboard.writeText`, puis exception dans `execCommand` : promesse rejetée sans interception, champ temporaire toujours attaché et message vide. |
| P11-F13 | Les actions de partage peuvent se chevaucher. | Deux clics déclenchent deux appels de partage avant résolution ; aucun verrou ni désactivation en cours. Leur ordre de retour n'est pas maîtrisé. |
| P11-F14 | L'expansion des critiques publiques longues n'est pas raccordée dans `SocialReviews`. | Une critique de 1 781 caractères est rendue intégralement sans contrôle « Lire la suite », alors que ce comportement est déjà validé. L'expansion des conversations est distincte et doit le rester. |
| P11-F15 | Les écrits saisis ne disposent pas d'un traitement explicite des paragraphes et des chaînes sans espaces. | Lecture CSS : pas de conservation des sauts de ligne pour les notes/critiques/réponses, ni de repli ciblé des mots très longs dans ces zones. Risque de débordement à confirmer visuellement, pas un débordement mesuré dans ce tour. |

Non-régressions identifiées : le refus d'un format non accepté affiche déjà un message et conserve la source précédente (diagnostic réussi). PFP1 fixe déjà JPEG/PNG/WebP, 8 Mo maximum et un petit côté de 512 px minimum : ne pas inventer d'autres seuils. L'annulation native du partage (`AbortError`) est déjà traitée silencieusement ; la préserver. La limite de 3 000 caractères des critiques reste inchangée. N1b protège le nom de la carte contre une césure interne : ne pas lui appliquer une règle globale de découpe.

### Corrections autorisées

1. **Import photo fiable** : message discret « Préparation de l’image… », seul le dernier fichier choisi peut devenir actif ; ignorer les réponses anciennes après nouveau choix ou fermeture. Conserver le dernier cadrage valide pendant un échec, permettre de réessayer le même fichier et empêcher l'enregistrement pendant la préparation. Annuler et Fermer restent disponibles. Aucun nouvel effet animé, outil de retouche ou modification des limites PFP1.
2. **Recadrage récupérable** : intercepter les échecs de lecture de l'image affichée, de dessin et d'export ; garder le panneau et le cadrage, expliquer l'échec au même endroit et permettre un nouvel essai. Remplacer la photo enregistrée et fermer uniquement après production d'une image valide. Ne pas annoncer une réussite sur un export vide ou invalide.
3. **Copie et partage cohérents** : une seule opération à la fois, commandes concernées temporairement indisponibles ; confirmer uniquement le succès effectif. Si copie native et repli échouent, rendre un message utile avec recours au lien déjà affiché, nettoyer le champ temporaire et restituer le focus. Garder l'annulation de partage silencieuse, ne pas copier à son insu après cette annulation et empêcher un ancien résultat d'écraser le retour courant. Préserver la disposition QRP1b et la carte QRM1b.
4. **Écrits longs lisibles** : appliquer l'aperçu et l'expansion locale « Lire la suite / Réduire » aux critiques longues là où ils manquent, sans changer l'ouverture des conversations ; conserver les paragraphes des notes/critiques/réponses. Contenir les chaînes sans espaces dans les zones de texte et les titres d'œuvre, tout en préservant le titre intégral hors de la couverture. Ne pas tronquer les données enregistrées, ajouter une limite de saisie ou modifier la carte N1b. Les lignes/espaces exacts relèveront du contrôle visuel ultérieur.

Vérifications requises : tests de régression avec fins d'import inversées, fermeture pendant préparation, erreurs de décodage/export/copie, clics répétés, partage annulé et texte multi-paragraphes/chaînes longues. Compléter la checklist du futur jalon et distinguer ces tests des vérifications réelles de navigateur. Pas de simulation de panne réseau d'un backend absent ni de nouvelle persistance.

## 10. Implémentation du troisième ensemble

- `photo-processing.ts` sépare la lecture annulable et l'export. `PhotoCropper` invalide les imports précédents et les callbacks après fermeture/démontage ; affiche « Préparation de l’image… » et attend aussi le chargement de l'image réellement affichée avant d'autoriser Enregistrer. L'input est vidé et l'image remontée pour réessayer le même fichier. Les limites PFP1 restent inchangées.
- Une erreur de lecture conserve la source précédente ; une erreur d'affichage permet de retrouver le dernier cadrage valide. Les transformations en cours ne mutent plus l'objet photo enregistré. Les exceptions de dessin/encodage et les sorties vides, malformées ou sans signature d'image reconnue restent locales ; seul un export réussi enregistre puis ferme. Le PNG de repli natif du canvas est accepté.
- `profile-share.ts` impose un verrou synchrone partagé à Copier/Partager. Les deux boutons sont désactivés pendant l'opération. Le changement de face ou de profil et le démontage invalident les retours tardifs sans lancer une seconde opération concurrente. Annuler le partage ne copie rien. Le repli de copie nettoie son champ temporaire et rend le focus ; un échec propose le lien déjà affiché, sans fausse confirmation.
- Les critiques sociales longues disposent d'un aperçu de 280 points de code puis « Lire la suite / Réduire », indépendant des conversations. C'est un seuil de présentation, pas une limite de saisie ; le Journal conserve son aperçu existant, les données intégrales et la limite de 3 000 caractères des critiques sont préservées. Les paragraphes et chaînes longues sont traités par des règles CSS ciblées, sans césure interne du nom N1b ni modification des couvertures L2.
- Ajout de `tests/phase11-recovery.test.mjs` : 21 tests de logique, gestionnaires avec doublures et invariants de source. Le test statique QR1 suit désormais le partage dans son module extrait, sans retirer ses invariants. Aucun test navigateur, photo réelle, presse-papiers natif ou lecteur d'écran n'est présenté comme effectué. Le rendu des paragraphes, le focus réel, le partage système et les gestes restent dans la recette non cochée.

Résultat complet : **build de production réussi, lint réussi, typage strict ciblé réussi, 70 tests automatisés réussis**. Le typage ciblé couvre les points d'entrée et leurs modules importés ; il ne résout pas la limitation historique du typage global liée aux déclarations Cloudflare. Aucune publication, nouvelle version Sites, nouvelle animation ni dépendance ajoutée. Périmètre de synchronisation GitHub : ces correctifs validés, leurs tests et la documentation de suivi, depuis la référence distante vérifiée `430cf00614eed08e7c7d77953d19d635a6cc809a`, sans réécriture d'historique. La proposition du volet 3 reste documentaire, sans effet applicatif.

## 11. Préparation du volet 3 — lecture du dépôt d’Emil Kowalski

Demande : examiner le dépôt et dire ce qu'on en tire, pas installer ses skills ni appliquer ses recettes. Sources primaires consultées le 27 août 2026, révision `d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7` : README, `emil-design-eng`, `find-animation-opportunities` et `improve-animations`. Ce relevé n'est pas une revue exhaustive de tous les guides natifs/web.

### Ce qui est utile

Le dépôt formalise une discipline de design engineering : justifier le mouvement par son rôle et sa fréquence, relier l'apparition d'une surface à son origine, conserver une réponse fluide aux interruptions, prévoir le toucher et la réduction du mouvement. Les durées/courbes sont des repères à éprouver, pas une identité graphique à importer. [Guide de design engineering](https://github.com/emilkowalski/skills/blob/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/emil-design-eng/SKILL.md).

Le guide de recherche d'opportunités demande de rejeter les animations sans bénéfice et de limiter les propositions. Le guide d'amélioration sépare inventaire, audit argumenté, choix utilisateur et plan précis ; il demande aussi de respecter les compromis déjà documentés. Ce fonctionnement s'accorde avec notre cycle de validation. [Opportunités](https://github.com/emilkowalski/skills/blob/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/find-animation-opportunities/SKILL.md), [audit et plans](https://github.com/emilkowalski/skills/blob/d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7/skills/improve-animations/SKILL.md).

### Application proposée à Chapter — non encore validée

| Famille | Orientation à examiner | Garde-fou |
| --- | --- | --- |
| Navigation, tri, lecture et saisie | Réponse immédiate ; ne pas faire attendre l'accès au texte | Pas de cascade d'apparition systématique dans Journal/Bibliothèque |
| Menus, modales et feuilles | Étudier seulement les transitions qui clarifient l'ouverture/fermeture et leur origine | Focus, Échap et interruption restent prioritaires ; aucune nouvelle transition implémentée |
| Retours d'action | Distinguer attente, succès réel et échec avec un retour cohérent | Ne pas masquer une latence ou annoncer un succès prématuré |
| Carte de lecteur et honneurs | Préserver les moments expressifs déjà arbitrés | QRM1b reste à environ 440 ms ; pas de nouvelle célébration ni refonte des badges |
| Mouvement réduit et toucher | Examiner chaque famille dans son état alternatif | Aucune information ne doit dépendre d'un déplacement ou d'un survol |

Lecture critique : le conseil de réduction d'échelle à l'appui contredit S2 (retours tonaux sans déplacement/rebond) : ne pas l'appliquer. La recommandation générale de moins de 300 ms ne remplace pas QRM1b ; le guide donne lui-même des budgets plus larges pour certaines surfaces. Ses prescriptions absolues et ses raccourcis de performance doivent être confrontés au contexte et aux mesures, non assimilés à des normes de conformité.

Point de départ observé dans le code : transitions CSS de la carte à 440 ms, des images de badges à 160 ms, défilement fluide, indicateur d'attente et règles `prefers-reduced-motion` déjà présents ; pas de bibliothèque dédiée de mouvement dans les dépendances. Ce relevé statique ne démontre ni fluidité ni défaut visuel.

Prochaine proposition : dans le **volet 3 de la phase 11**, inventorier responsive, accessibilité et mouvement ; présenter une courte charte Chapter par famille (rôle, déclencheur, durée/courbe, interruption, alternative à mouvement réduit), puis comparer les rares évolutions visibles retenues avant validation. Le volet 4 reste la non-régression et la clôture du lot. Rien n'autorise encore de nouveaux effets, une installation de skills, une refonte ou une publication.

## 12. Volet 3 — charte de mouvement validée avec AM1

La demande initiale de poursuite ouvrait la discussion. L'utilisateur valide ensuite explicitement, le 27 août 2026 : **« Je valides avec AM1. Continuons. »** Les règles communes ci-dessous et **AM1 pour les surfaces temporaires** sont donc acceptées ; AM2 n'est pas retenu. Les corrections responsive et les contrôles accessibles viennent ensuite, dans le même volet, avant la recette de clôture.

### État observé — inspection de source, pas recette visuelle

- P11-F16 : `openView`, `openDiscoverWithQuery` et `selectWork` dans `app/page.tsx` imposent `scrollTo({ top: 0, behavior: "smooth" })`, sans consultation de la préférence système. La règle CSS `scroll-behavior: auto` en mouvement réduit ne pilote pas ces appels explicitement animés. Proposition : retour immédiat pour un changement de destination, défilement doux réservé aux ancres internes sans préférence de réduction du mouvement.
- P11-F17 : le sélecteur générique de mouvement réduit ramène `animation-duration` à 0,01 ms, mais ne supprime pas l'itération infinie de l'indicateur `button-spin`. Risque conditionnel si cet indicateur est utilisé, pas un clignotement observé. Proposition : arrêter explicitement sa rotation dans ce mode, en conservant le texte et l'état d'attente.
- Les panneaux communs n'ont pas de transition d'ouverture/fermeture ; ajouter un fondu serait une amélioration proposée, pas la réparation d'une animation défectueuse démontrée. Les boutons disposent des retours tonaux S2 mais pas de transition commune explicite. La carte et les badges ont déjà leurs règles de mouvement réduit.
- P11-F04 reste à traiter : le déplacement de la photo utilise les pointeurs, sans équivalent clavier. Le curseur de zoom ne permet pas de déplacer le cadrage. Sujet à arbitrer après la charte ; pas d'ajout de commande dans ce tour.
- Le seuil responsive de 900 px et les variantes mobiles existent. Aucun débordement, contraste, cible tactile ou rendu à texte agrandi n'est déclaré testé ici ; leur audit reste ouvert.

Références primaires : [défilement explicite et automatique](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo), [W3C SCR40 — préférence de mouvement en JavaScript](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR40), [clavier, critère 2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), [redistribution du contenu, critère 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). Le [critère 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) est de niveau AAA ; le prendre comme référence ne constitue ni une exigence globale AAA ni une déclaration de conformité.

### Règles communes désormais validées

| Famille | Proposition | Interruption et alternative |
| --- | --- | --- |
| Navigation entre destinations, recherche, tri, saisie | Réponse immédiate, sans transition de page ni cascade des livres ; retour en haut immédiat au changement de destination | Pas de temporisation de l'action ni du focus ; ancres internes éventuellement douces uniquement sans mouvement réduit |
| Boutons et liens d'action | S2 conservé ; couleurs sur 120 ms `ease`, pression et focus immédiats ; aucune réduction d'échelle, translation ou rebond | Couleurs instantanées en mouvement réduit ; effets de survol limités aux dispositifs capables de survol |
| Menus contextuels non modaux | Ouverture 140 ms, fermeture 100 ms | Ne pas ajouter de piège de focus ; sélection immédiatement appliquée |
| Modales et feuilles existantes | Ouverture 180 ms, fermeture 120 ms | Clavier utilisable dès l'ouverture ; Échap pendant la transition reste effectif ; protection NSV2 prioritaire |
| Retours d'action | Fondu de 120 ms, sans translation, uniquement sur changement réel d'état | Le texte et l'annonce restent prioritaires ; aucun délai artificiel ; attente statique en mouvement réduit |
| Carte de lecteur et honneurs | QRM1b conservé à environ 440 ms avec sa courbe existante ; honneurs sans nouvel effet ni célébration | Alternatives déjà validées conservées, sans rotation en mouvement réduit |

Pour les surfaces, courbe validée `cubic-bezier(0.23, 1, 0.32, 1)` à l'ouverture et à la fermeture, sur l'opacité seule. Ces valeurs sont un choix de conception Chapter, pas une règle universelle tirée du dépôt externe. Les transitions repartent de leur état courant, sans minuterie tardive refermant une surface rouverte. Les durées de sortie ne retardent pas une sélection, un enregistrement, une navigation ou l'application d'une protection. Le détail de l'intégration au cycle des modales est consigné au §13.

### AM1 / AM2 — historique du choix visible

1. **AM1 — Fondu seul, retenu.** Les menus, modales et feuilles apparaissent à leur position définitive ; seule l'opacité change. Le texte reste immobile et la carte conserve son rôle de moment expressif distinct.
2. **AM2 — Fondu avec déplacement discret, non retenu.** Même rythme et même opacité, avec un trajet final proposé de 3 px pour les menus, 6 px pour les modales centrées et 12 px depuis le bas pour les feuilles mobiles. Aucun changement d'échelle ni rebond. Cette variante aurait rendu la provenance plus perceptible, mais ajouté du mouvement près des textes.

Dans les deux variantes, l'activation de la réduction du mouvement donne un changement immédiat, sans translation ni fondu ; la préférence système est prise en compte en CSS et dans les appels JavaScript. Aucun paramètre public supplémentaire dans Chapter n'est proposé.

Comparaison de conversation : deux extraits simplifiés d'une note, même composition, ouverture/fermeture synchronisées à 180/120 ms, AM1 sans translation et AM2 sur 6 px. Le contrôle de réduction du mouvement appartient uniquement à cette comparaison. Ce support illustre le mouvement, pas une refonte du panneau, un mode sombre produit validé ou un test du site. Identifiants, syntaxe et gestionnaires vérifiés avec doublures ; aucun navigateur utilisé.

**Arbitrage clos : AM1 et règles communes validés.** Les sujets tactiles/clavier (dont le cadrage), texte agrandi, contraste et petits écrans restent explicitement dans la suite du volet 3 ; le volet 4 demeure la recette globale et la clôture du lot 1.

## 13. AM1 — implémentation et vérifications

- Contrôleur d'opacité partagé, sans dépendance supplémentaire : `app/fade-behavior.ts` et `app/fade.tsx`. Menus de statut, compte desktop, tri ; feuille de compte mobile, recherche, éditeurs, photo et retrait ; retours d'action et partage. Aucune cascade, translation, réduction d'échelle, animation de page ou célébration ajoutée. Détails et dessins des honneurs inchangés.
- La fermeture conserve brièvement le dernier contenu uniquement pour sa sortie visuelle : `inert`, `aria-hidden` et absence d'interaction immédiats. La modale native est fermée et rend le focus sans attendre l'opacité. Les protections NSV2 restent prioritaires et les changements fonctionnels restent synchrones.
- Une interruption repart de l'opacité courante. La fin d'une ancienne animation ne peut pas fermer une surface rouverte. Une reprise rapide du cadrage annule les anciens imports et repart de la photo enregistrée, pas du brouillon annulé.
- Préférence système prise en compte au début et lors d'un changement pendant le fondu ; entrée/sortie immédiate en mouvement réduit, animation annulée et écouteur nettoyé. Repli immédiat si l'API d'animation est indisponible ou la variante masquée.
- Couleurs des actions sur 120 ms, focus/pression immédiats. Survol limité aux dispositifs fins avec survol ; états sélectionnés et clavier restent indépendants. Navigation JavaScript immédiate ; ancres CSS douces hors mouvement réduit. Indicateur d'attente sans rotation en mouvement réduit. QRM1b et comportements antérieurs des badges conservés.
- Vérifications du 27 août 2026 : `npm test` (build vérifié puis **80/80 tests**), `npm run lint` sans erreur ni avertissement de code, TypeScript strict ciblé sur `app/page.tsx` et `app/phase10.tsx` réussis. Dix tests ajoutés : contrôleur/interruption/repli/préférence/nettoyage, règles de survol, cycle de modale et réouverture photo ; tests existants conservés, chargeurs adaptés à l'import partagé. Avertissements d'environnement proxy/npm et classification des routes vinext inchangés.
- Limite : les doublures de gestionnaires/animations et le rendu serveur ne vérifient pas le rendu navigateur, la couche native des dialogues, la fluidité ni les lecteurs d'écran. Checklist manuelle enrichie, toujours non exécutée. Aucun déploiement ou nouveau jalon Sites.

## 14. CT1 — proposition de commandes supplémentaires refusée

**Statut : refusé explicitement le 27 août 2026, jamais implémenté.** L'utilisateur ne souhaite pas de commandes supplémentaires : conserver le curseur et s'assurer que pincements/glissements sur l'image ne déplacent pas la page. Cette décision remplace la demande de validation CT1 ; ne pas réintroduire les boutons directionnels ou Recentrer implicitement. Même phase 11, volet 3. P11-F04 reste une limite connue : `PhotoCropper` déplace l'image au pointeur ; le curseur natif règle le zoom mais pas la position. Le champ de fichier est masqué visuellement sans report du focus sur son libellé visible ; ce sujet reste séparé, sans développement autorisé ici.

**Ancienne proposition CT1, non retenue :** conserver le déplacement direct, le pincement et le curseur de zoom ; ajouter sous l'aperçu un groupe compact « Déplacer l'image » avec quatre boutons nommés Gauche, Droite, Haut, Bas, puis « Recentrer ». Boutons natifs utilisables par clic, toucher, Tab et Entrée/Espace ; cibles d'au moins 44 px, retours immédiats et limites empêchant de découvrir une zone vide. Un clic aurait déplacé l'image de 8 unités dans le repère de recadrage de 320 unités ; Recentrer aurait remis x/y à zéro sans modifier le zoom. Historique uniquement, aucune autorisation de réalisation.

La correspondance entre coordonnées du recadrage et aperçu réduit sur mobile reste à vérifier indépendamment de CT1 : la source utilise un repère de 320 alors que la zone affichée peut être plus petite. Il s'agit d'une vérification ciblée du cadrage, pas d'une refonte responsive anticipée. Format de sortie, photo facultative, limites de fichier, confidentialité et règle « rien n'est enregistré avant Enregistrer » inchangés.

Pourquoi ne pas se limiter à des raccourcis fléchés : ils ne résolvent pas à eux seuls le besoin d'une action simple au toucher sans glissement. Références : [W3C 2.1.1 — clavier](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) et [W3C 2.5.7 — alternative au glissement](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), qui donne les boutons directionnels comme exemple. Cela guide la proposition, sans revendiquer une conformité globale.

Comparaison historique dans la conversation, ordre **Actuel → CT1 proposé**, limitée aux commandes et à une image schématique. Cette simulation n'est pas une recette du vrai recadrage ni un rendu produit validé. CT1 étant refusé, cette comparaison n'est plus l'arbitrage actif.

## 15. Retour utilisateur — gestes confinés à l'image et carte retournée sur mobile

L'utilisateur demande de conserver l'interface de cadrage et signale un verso mobile avec des éléments inversés, petits et mélangés. Il fournit ensuite la capture `IMG_0750.png` et précise **Safari, après la rotation** : le défaut persiste donc dans l'état arrêté du verso. Le 1er septembre, il confirme que le défaut est toujours présent — les corrections n'ont alors pas encore été autorisées ni appliquées — et ajoute qu'une fenêtre desktop réduite à sa largeur minimale affiche une composition étrange sans face retournée visible. Le modèle exact d'appareil et la version du navigateur ne sont pas précisés et ne sont pas déduits de la capture. **Aucune modification applicative dans ces tours de diagnostic : analyse et mise à jour des décisions uniquement.** Ces observations complètent le diagnostic ; elles ne valent pas validation explicite du développement. La restauration proposée reste dans le volet 3, sans nouvelle direction graphique ni changement du mouvement QRM1b.

### Constats vérifiés et limites

- **Gestes / défilement :** `.crop-stage` possède déjà `touch-action: none`, sans surcharge mobile ; `pointerDown` capture le pointeur et l'image n'a pas de glissement HTML natif. La modale locale utilise aussi le verrou de scroll partagé. Ce sont les mécanismes présents dans la source, pas une preuve de comportement sur le téléphone de l'utilisateur. Le comportement attendu est local : un doigt déplace la photo, deux doigts la zooment, le curseur est conservé ; hors image, le contenu long de la modale doit rester défilable. Ne pas bloquer globalement le zoom ou les gestes de toute la page. Référence : [MDN, touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action).
- **P11-F18 — collision de grille, confirmée par analyse CSS :** la classe commune `.profile-identity-card` remet deux colonnes sous 900 px, puis sous 561 px, après la règle à une colonne de `.profile-card-back`. Les deux classes ont la même spécificité ; la règle mobile gagne. Analyse des déclarations à 390/560/768/900/901/1280 px : deux colonnes dans les trois premiers cas, une colonne dans les trois derniers. À 390 px, le QR est placé dans la colonne de 5,5 rem et sa largeur de 58 % est calculée dans cette colonne étroite ; nom/instruction et URL sont aussi redistribués. Cela explique la réduction et la mauvaise composition. Le défaut est déjà dans le code précédant AM1 ; les règles de grille n'ont pas été modifiées par AM1.
- **P11-F19 — superposition des faces confirmée sur la capture utilisateur Safari :** après la rotation, le verso contient un QR, le nom lisible, l'instruction et l'adresse, tandis que plusieurs éléments du recto restent visibles en miroir : signature Chapter, « Carte de lecteur », « Votre portrait », titre équipé, commandes photo et grand nom. Le poinçon du recto reste également visible. « Voir le recto » et les actions de partage sont dans leur état verso normal. Il ne s'agit donc pas seulement d'une mauvaise grille ni d'un instant intermédiaire de l'animation : des contenus de la face arrière continuent d'être peints. Le code contient déjà `backface-visibility: hidden`, une rotation parent et une rotation verso ; le problème de masquage/composition est à traiter en plus de P11-F18. **Symptôme confirmé par capture, cause CSS/moteur exacte non isolée et aucune reproduction navigateur par l'agent.** Ne pas présenter l'ajout d'un préfixe, une propriété précise ou un bug WebKit comme cause/remède prouvé sans vérification. Référence du comportement attendu : [W3C, visibilité des faces en 3D](https://www.w3.org/TR/css-transforms-2/#backface-visibility-property). L'ancienne demande « navigateur et pendant/après » est satisfaite ; ne pas la reposer. La capture demeure une pièce de conversation, pas un asset du site ni un fichier envoyé à GitHub.
- **P11-F20 — pincement vers glissement, confirmé avec doublure des gestionnaires :** `pointerUp` supprime un contact sans recalculer l'origine du doigt restant. Essai sur le vrai composant avec photo carrée et zoom initial 2 : déplacement x=10, pincement jusqu'au zoom 2,8, retrait du premier doigt puis événement du second doigt sans mouvement ; x passe de 10 à 150. C'est un saut de l'image, pas un défilement de page observé. Prévoir le recalage du geste à chaque changement du nombre de contacts et la fin propre en cas d'annulation/perte de capture.
- **P11-F21 — fenêtre desktop étroite, signalement utilisateur :** à largeur minimale, aucune face retournée n'est visible et la composition devient étrange. La source bascule sous 900 px vers les mêmes règles `.profile-identity-card` qui écrasent la grille du verso ; ce lien rend P11-F18 directement pertinent, mais ne suffit pas à expliquer si la face absente relève aussi du masquage 3D de P11-F19. Signalement non reproduit par l'agent. La recette du correctif devra couvrir une fenêtre desktop redimensionnée à 901/900/899 px puis jusqu'à sa largeur minimale, sur un navigateur desktop, en plus de Safari mobile.
- Le repère fixe de 320 unités et l'affichage réduit sur petit écran restent à faire correspondre ; aucun test d'export réel sur appareil n'est déclaré réalisé. Les 80 tests du tour AM1 ne couvraient pas la cascade mobile ni la transition de deux contacts vers un.

### Correctif ciblé autorisé et implémenté — évaluation à effectuer

1. Conserver le curseur et tous les contrôles visibles actuels. Garantir le confinement des gestes sur l'image et leur continuité, notamment deux doigts → un doigt, annulation et sortie de zone ; vérifier la correspondance geste/aperçu/export sur petit écran. Aucun bouton CT1, aucun blocage global des gestes.
2. Séparer les règles de grille du recto et du verso pour restaurer le verso centré à une colonne à toutes les tailles. Corriger la composition et le masquage des faces, y compris leurs contenus, pour qu'aucun recto en miroir ne subsiste au verso et réciproquement. Conserver dimensions de carte, hiérarchie QR/identité/adresse, assets, rail QRP1b et rotation QRM1b de 440 ms. Valider le résultat dans le contexte Safari signalé ; ne pas supprimer le retournement, raccourcir sa durée ou ajouter seulement un délai pour masquer le problème.
3. Ajouter les régressions ciblées de cascade, gestes et non-régression des états/focus. La recette visuelle sur navigateur mobile reste distincte ; les contrôles avec doublures ne la remplacent pas.

### Implémentation candidate du 1er septembre 2026

- Les media queries modifient désormais uniquement la grille du recto ; le verso réaffirme sa colonne unique sous 560 px. La rotation conserve QRM1b à 440 ms. Les deux faces ont des transformations explicites, le masquage 3D préfixé pour WebKit et un état d'opacité exclusif qui empêche la face inactive de rester peinte une fois la rotation arrêtée.
- La zone de recadrage conserve `touch-action: none` localement. Les coordonnées de pointeur sont converties dans le repère canonique de 320 unités et la peinture est ramenée à la largeur réellement affichée ; geste, aperçu et export partagent donc le même cadrage sur petit écran.
- Chaque ajout, retrait, annulation ou perte de capture recalcule l'origine du geste restant. Le passage de deux doigts à un ne réutilise plus l'origine du pincement et ne provoque plus le saut P11-F20. Fermer la surface nettoie aussi les contacts actifs.
- Régression ciblée réussie : **25/25 tests** sur la carte, le partage, l'import photo et le recadrage, dont un scénario à 160 px avec glissement, pincement, retrait d'un doigt et perte de capture. Les assertions CSS couvrent grille distincte, masquage WebKit, angles et face active. Cette preuve ne remplace pas Safari mobile ni la fenêtre desktop redimensionnée.
- Vérification globale réussie : build de production, lint sans erreur et **81/81 tests**. La tentative d'inspection locale n'a pas abouti, l'environnement ayant refusé l'ouverture du serveur ; aucune recette navigateur n'est revendiquée.

### État de livraison

AM1 et ce correctif restent préparés localement avec leurs tests. Aucun nouvel essai de synchronisation, contournement, commit distant ou déploiement dans ce tour. La publication reste différée au jalon regroupé et l'utilisateur doit encore évaluer le comportement réel sur Safari mobile et desktop étroit.

## 16. Volet 3 — reflow, contraste et accessibilité des contrôles

La demande « Bien. Continuons. » poursuit le plan annoncé après le correctif de carte : audit du responsive global, du texte agrandi, des contrastes, des cibles tactiles et des contrôles. Conformément à la règle du 1er septembre, les défauts non ambigus sont corrigés directement comme candidats à l'évaluation. Aucun nouvel écran, mouvement, asset, bouton CT1 ou traitement de données n'est introduit.

### Constats et corrections candidates

| Référence | Constat dans la source | Correction appliquée |
| --- | --- | --- |
| P11-F22 | Les bordures `--line` des champs atteignent environ 1,4:1 sur leurs fonds ; le halo de focus mélangeait seulement 45 % de brique avec la transparence. Les textes brique et atténués dépassent déjà 4,5:1 sur les fonds principaux. | Ajout de `--control-line: #938a81`, mesuré à 3,34:1 sur `--surface` et 3,07:1 sur `--paper`, réservé aux limites nécessaires des champs/contrôles. Focus clavier en brique pleine. Les séparateurs éditoriaux conservent `--line`. |
| P11-F23 | `.text-action` imposait `white-space: nowrap`; le formulaire de date avait une largeur minimale fixe et certains grands titres/résultats rapprochés pouvaient déborder à faible largeur ou texte agrandi. | Retour à la ligne autorisé, largeur du formulaire bornée à 100 %, actions de date flexibles, titres mobiles bornés et sécables en dernier recours, résultats rapprochés empilés sous 560 px. `body` suit désormais la taille de texte utilisateur avec `100 %`. |
| P11-F24 | Le champ fichier visuellement masqué recevait le focus sans reporter d'indicateur visible sur son libellé. | Le libellé `.file-action` porte le halo lorsque son champ a `:focus-visible`, sans révéler le contrôle natif ni déplacer la composition. |
| P11-F25 | Les cinq étoiles ARIA étaient toutes dans l'ordre de Tab ; les flèches changeaient la note sans déplacer le focus et s'arrêtaient aux extrémités. | Tab entre et sort du groupe par une seule étoile ; la sélection courante reçoit `tabIndex=0`. Flèches et Début/Fin changent sélection et focus, avec boucle 5 → 1 et 1 → 5. La suppression de note remet la première étoile comme entrée. |
| P11-F26 | Les avatars de Maël, Théo et Inès étaient des boutons sans action ; seule Lina possède un profil raccordé dans le prototype. | Seul l'avatar de Lina reste un bouton, nommé « Ouvrir le profil de Lina Morel » ; les autres redeviennent des repères statiques, visuellement identiques. |
| P11-F27 | Les destinations actives n'exposaient que classe/couleur ; plusieurs déclencheurs expansibles n'identifiaient pas leur surface. Les détails d'honneur utilisaient un `role=status` malgré leurs actions interactives. | `aria-current="page"` sur les deux navigations, `aria-controls` et identifiants pour compte/statut/honneurs ; les détails d'honneur deviennent des régions nommées. Cibles circulaires du compte et de fermeture portées à 44 × 44 px. |

Références de mise en œuvre : [W3C — contraste non textuel](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [W3C — taille minimale des cibles](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [ARIA APG — groupe de boutons radio](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). L'objectif est de supprimer les défauts démontrés, pas de déclarer Chapter conforme WCAG 2.2 à partir d'une inspection de source.

### Vérifications et limites

Quatre régressions ciblées sont ajoutées : ratios calculés et sélecteurs de contrôles, règles de reflow/focus fichier, sémantique de navigation/avatar/honneurs et comportement complet des étoiles. Vérification finale réussie : **build de production, lint et 85/85 tests**. Les avertissements d'environnement proxy/npm et la classification statique incomplète des routes vinext restent inchangés.

La recette réelle reste ouverte : texte à 200 %, espacements personnalisés, 320/390/560/899/900 px, zoom navigateur, contrastes calculés sur le rendu final, ordre de focus visible, lecteur d'écran et modes de contraste forcé. Les assertions de source et doublures React ne simulent ni le moteur de mise en page ni une technologie d'assistance.

## 17. Volet 4 — non-régression et clôture candidate

La poursuite demandée ouvre la dernière étape du plan initial : vérifier les liaisons entre les ensembles déjà constitués, dresser le bilan technique et préparer la validation regroupée. Aucun nouveau besoin produit, asset, mouvement ou dépendance n'est ajouté.

### Complément de non-régression

Trois parcours manquaient au niveau du composant racine malgré la couverture détaillée des sous-composants :

1. Découvrir → suivi de Lina → profil → liste publique → retour au bon profil → honneurs, puis liste ouverte depuis Découvrir avec retour à la bonne origine ; l'état de relation reste partagé.
2. Œuvre → En cours → date reportée → Journal → Lu → date choisie → Journal ; les deux traces de lecture et la date restent cohérentes.
3. Ajout à « À lire » depuis Découvrir → Bibliothèque → Annuler ; l'état antérieur de bibliothèque vide est restauré.

Ces trois parcours réussissent avec les vrais gestionnaires et états de `Home`, via une doublure de hooks. Ils portent la suite à **88/88 tests**. Ils ne constituent pas un test de navigation dans un navigateur réel.

### Bilan technique

- Construction de production réussie, lint final sans erreur et `git diff --check` sans anomalie après constitution du dossier.
- Aucun changement de dépendance, asset validé, catalogue ou schéma de données dans la phase 11.
- Le diff reste une consolidation frontend : logique de focus/mouvement/récupération, reflow et sémantique, tests et documentation.
- Les limites de preuve demeurent explicites : Safari, tactile réel, mise en page à 200 %, lecteur d'écran et contraste forcé n'ont pas été exécutés par l'agent.
- P11-F04 demeure une limite acceptée de périmètre après le refus de CT1 ; aucune conformité WCAG globale n'est déclarée.

Le bilan détaillé et les conditions de clôture sont consignés dans [`PHASE_11_BILAN_ET_CLOTURE.md`](./PHASE_11_BILAN_ET_CLOTURE.md). Le lot 1 est **candidat à la validation**, pas encore clôturé. Le candidat est disponible pour recette en version Sites 28 ; seule la synchronisation GitHub du périmètre encore non validé reste différée.

## 18. Reprise de recette — verso mobile, suivi et recherche Découvrir

L'utilisateur fournit une nouvelle capture mobile du verso : la signature et l'en-tête occupent toute la largeur, mais le QR reste réduit à gauche, l'instruction se place à droite et l'URL demeure sous la première colonne. Il relève aussi deux incohérences dans Découvrir : le suivi de Lina n'a ni les couleurs ni le libellé du profil, et la croix native du champ « Titre ou auteur » détonne avec Chapter. Conformément au cycle validé, ces défauts non ambigus sont corrigés directement pour une nouvelle évaluation.

### Corrections candidates

- **P11-F28 — composition du verso :** le QR et le bloc nom/instruction sont regroupés dans un corps autonome, centré entre l'en-tête et l'URL. La grille extérieure est renforcée par le sélecteur `.profile-identity-card.profile-card-back`, avec une seule colonne et trois rangées explicites. Les media queries réaffirment cette structure. L'ordre QRV1/QRT1 reste QR généreux → nom → instruction → URL isolée ; QRM1b et QRP1b ne changent pas.
- **P11-F29 — suivi incohérent :** le profil, la sensibilité éditoriale de Découvrir et les pages de liste utilisent désormais le même bouton principal, le même `aria-pressed`, les mêmes couleurs avant/après et les libellés neutres « Suivre » / « Suivi ». L'ancienne variante « Suivie » et le bouton transparent disparaissent.
- **P11-F30 — effacement natif :** la décoration `::-webkit-search-cancel-button` est masquée dans la seule recherche Découvrir. Une action textuelle brique « Effacer », accessible et cohérente avec les autres actions Chapter, apparaît dans le champ lorsqu'il contient du texte ; elle vide requête et résultats puis conserve le point de saisie.

Trois régressions dédiées couvrent la structure du corps de verso et sa cascade mobile, l'identité des trois points d'entrée du suivi et le comportement réel de l'action d'effacement. Vérification complète réussie : **build de production, lint, `git diff --check` et 91/91 tests**. Aucun test Safari ou rendu tactile réel n'est revendiqué ; la capture est une preuve du défaut antérieur, pas de sa correction.

Aucune dépendance, asset, publication, synchronisation ou modification de QR n'accompagne cette reprise. Le jalon regroupé reste à réévaluer par l'utilisateur.

### Mise à disposition pour recette — version Sites 26

Le 1er septembre 2026, l'utilisateur demande explicitement que les correctifs soient visibles sur le Site. Cette demande remplace, pour ce candidat regroupé, l'ancienne suspension de publication qui interdisait de déployer la version 25 ; elle n'équivaut pas à une validation fonctionnelle.

- Source candidate commitée au SHA `4d225a642d2f362f6595d67ae43a843f9033de97` et envoyée uniquement sur le dépôt technique `origin` du Site. Le distant GitHub `github` n'est pas modifié.
- Build exact du commit réussi, archive vinext enregistrée comme version **26** : `appgprj_6a89f5d96774819197b23b79c7c07abd~appgver_9b62fb5672688191b9b53cc40a3de5fa`.
- Déploiement privé propriétaire réussi : `appgdep_6a96adbe3e348191b904304056472b2a`, URL `https://chapter-reading.smrdsh.chatgpt.site`.
- Contrôle après publication : version courante 26, page principale servie avec son titre et son contenu ; la feuille CSS en ligne contient les nouvelles règles du corps de verso, de sa grille renforcée et de l'action d'effacement Découvrir.

La version 26 devient la base de recette visible. Elle reste révocable et ne clôt ni la phase 11 ni le lot 1.

## 19. Reprise de recette — durée de la fiche d'honneur au survol

L'utilisateur relève que la fiche explicative ouverte au survol d'un badge ne se ferme qu'en quittant toute la collection. Il demande qu'elle suive la même zone que l'animation du badge : ouverture à l'entrée et disparition dès la sortie du badge lui-même.

**P11-F31 — correction candidate :** l'état sélectionné distingue désormais un survol temporaire d'une ouverture persistante. Sur un dispositif à pointeur fin, `mouseenter` ouvre la fiche en mode temporaire et `mouseleave` du même bouton la referme immédiatement. Le passage sur un autre badge remplace toujours la fiche. Un clic, un focus clavier ou un toucher l'ouvre en mode persistant afin que les actions « afficher ce titre » et « afficher ce badge » restent utilisables ; Échap, la sortie de collection, le clic extérieur et la perte de focus globale conservent leurs fermetures existantes.

Une régression de composant vérifie les deux branches : survol → sortie ferme ; survol → clic → sortie conserve la fiche. Vérification complète réussie : **build de production, lint, `git diff --check` et 92/92 tests**. HDE1, HMT1, les compositions mobile/desktop, les assets et le mouvement visuel du badge restent inchangés.

### Mise à disposition pour recette — version Sites 27

- Source P11-F31 commitée au SHA `e852d772f265f8e751f0dc01bb246b6f183a466d` et envoyée uniquement sur le dépôt technique `origin` du Site. Le distant GitHub `github` reste inchangé.
- Build exact du commit réussi, archive vinext enregistrée comme version **27** : `appgprj_6a89f5d96774819197b23b79c7c07abd~appgver_d630d64abef081919c88009e014469f8`.
- Déploiement privé propriétaire réussi : `appgdep_6a96b0c23204819190eb1d58e88a88e3`, URL `https://chapter-reading.smrdsh.chatgpt.site`.
- Contrôle après publication : version courante 27, provenance égale au SHA candidat, accès limité au seul propriétaire sans groupe ni visiteur externe ; le bundle JavaScript en ligne contient les deux modes `hover` et `persistent` attendus.

La version 27 remplace la version 26 comme base de recette visible. Elle ne constitue ni une validation de P11-F31, ni une clôture de la phase 11 ou du lot 1, ni une autorisation de synchronisation GitHub.

## 20. Reprise de recette — accès aux actions de la fiche d'honneur

La recette de la version 27 révèle une régression d'usage : la fermeture au `mouseleave` du bouton intervient avant que le pointeur puisse franchir le léger intervalle qui le sépare de la fiche. Les actions « Afficher ce titre sous mon nom » et « Afficher ce badge sur mon profil » deviennent donc inaccessibles sans clic préalable.

**P11-F32 — correction candidate :** la fermeture temporaire est portée par la cellule précise du badge plutôt que par son seul bouton. La fiche desktop, descendante de cette cellule, prolonge sa zone interactive grâce à un pont transparent limité à l'intervalle visuel. Le pointeur peut ainsi passer du badge à la fiche et cliquer ses actions sans fermeture ; il ferme toujours immédiatement la fiche temporaire dès qu'il quitte l'ensemble badge–intervalle–fiche. Une ouverture persistante au clic, au clavier ou au toucher n'est pas fermée par cette sortie locale.

La régression ciblée vérifie désormais l'ouverture au survol, la présence des actions pendant le passage vers la fiche, la fermeture à la sortie de la cellule et la persistance après clic. Vérification complète réussie : **build de production, lint, `git diff --check` et 92/92 tests**, dont **7/7 tests ciblés**. Aucun changement de composition, texte, asset, mouvement du badge ou comportement mobile n'accompagne cette reprise.

### Mise à disposition pour recette — version Sites 28

- Source P11-F32 commitée au SHA `7da469f78c16e8bf75b9a3ab171d855a7aae2b92` et envoyée uniquement sur le dépôt technique `origin` du Site. Le distant GitHub `github` reste inchangé.
- Build exact du commit réussi, archive enregistrée comme version **28** : `appgprj_6a89f5d96774819197b23b79c7c07abd~appgver_41799257dffc819181866b7edd70b5c7`.
- Déploiement privé propriétaire réussi : `appgdep_6a97016c7ee48191a9d2107a68b46ba1`, URL `https://chapter-reading.smrdsh.chatgpt.site`.
- Contrôle après publication : version courante 28 et provenance égale au SHA candidat.

La version 28 remplace la version 27 comme base de recette visible. Elle ne constitue ni une validation de P11-F32, ni une clôture de la phase 11 ou du lot 1, ni une autorisation de synchronisation GitHub.

## 21. Infrastructure documentaire — contexte agent à la demande

Le 1er septembre 2026, l'utilisateur demande d'étudier les méthodes récentes de réduction des tokens des agents et d'intégrer immédiatement les gains sûrs au projet. L'audit constate que les anciennes règles imposaient 225 449 caractères de documentation avant toute lecture de code : `AGENTS.md`, le journal transversal et le présent suivi de phase. Cette charge répétée est disproportionnée et peut aussi enfouir les décisions prioritaires.

Le candidat documentaire remplace cette lecture exhaustive par :

- un `AGENTS.md` automatique limité aux règles dures ;
- un `AGENT_CONTEXT.md` compact avec état, prochaine étape, invariants et routage ;
- une recherche juste à temps dans les journaux longs ;
- une carte des sources/tests, une procédure conditionnelle et un rapport de recherche sourcé ;
- un script de résumé/recherche et trois tests de budget, de liens et de fonctionnement.

La source de vérité n'est ni supprimée ni résumée de façon destructive. Les anciens arbitrages restent dans `CHAPTER_DECISIONS.md` et les livrables de phase. La modification concerne la manière de les récupérer et la discipline de non-duplication. Aucun composant, style, asset, comportement visible ou dépendance applicative n'est modifié.

Ce travail documentaire est intégré à la source technique la plus récente, postérieure à P11-F32. Il ne vaut pas validation du jalon regroupé, ne modifie pas la version Sites 28 et n'autorise pas sa synchronisation GitHub. Les vérifications automatisées doivent confirmer le budget annoncé et la non-régression de la suite existante.

Résultat : `AGENTS.md` mesure 2 673 octets et `AGENT_CONTEXT.md` 4 323 octets. Les trois nouveaux tests contrôlent leurs plafonds, les références et le script de récupération ciblée. **Build de production, lint, `git diff --check` et 95/95 tests réussis**, soit les 92 tests produit antérieurs plus 3 tests d'infrastructure documentaire. Les avertissements de proxy et de classification vinext restent inchangés. Aucun déploiement ni synchronisation GitHub n'accompagne cette intégration.

## 22. Reprise de recette — propriété des listes ouvertes depuis un profil

L'utilisateur relève qu'une liste ouverte depuis ses propres « Listes publiques » présente ensuite Lina comme autrice, propose son suivi et renvoie vers son profil. L'origine générale « profil » était bien conservée, mais le propriétaire précis ne l'était pas : la destination réinjectait Lina en dur.

**P11-F33 — correction candidate :** l'ouverture mémorise désormais séparément l'identifiant de la liste, son origine et son propriétaire (`self`, `public-self` ou `lina`). La vue utilise cette identité unique pour l'avatar, le nom, la relation, l'état de suivi, l'ouverture du profil et le retour. Depuis le profil propriétaire de Maël, elle affiche « Maël Depréville » et « Votre liste publique », masque le bouton de suivi de soi-même et revient à « mon profil ». Une liste ouverte depuis Lina ou depuis Découvrir conserve le parcours existant ; le profil public de Maël reste également distinct du profil propriétaire.

Deux régressions couvrent le rendu auteur/abonnement et le parcours profil de Maël → liste → profil, tandis que le parcours de Lina est renforcé par l'identité attendue. Après intégration de l'infrastructure documentaire parallèle, vérification complète réussie : **build de production, lint, `git diff --check` et 97/97 tests**. Les titres, descriptions, œuvres, compositions et états de suivi existants ne changent pas.

### Mise à disposition pour recette — version Sites 29

- Source P11-F33 et infrastructure documentaire intégrée au SHA `60601915430b629639668db0a24059016c184a54`, envoyé uniquement sur le dépôt technique `origin` du Site. Le distant GitHub `github` reste inchangé.
- Build exact du commit réussi, archive enregistrée comme version **29** : `appgprj_6a89f5d96774819197b23b79c7c07abd~appgver_7c410d15f73c8191811fafa537b14ba4`.
- Déploiement privé propriétaire réussi : `appgdep_6a970a27a564819192c9b1e5551100ed`, URL `https://chapter-reading.smrdsh.chatgpt.site`.
- Contrôle après publication : version courante 29 et provenance égale au SHA candidat.

La version 29 remplace la version 28 comme base de recette visible. Elle ne constitue ni une validation de P11-F33, ni une clôture de la phase 11 ou du lot 1, ni une autorisation de synchronisation GitHub.

## 23. Audit des données codées en dur et des identités

À la suite du correctif de propriété des listes, l'utilisateur demande de vérifier les autres valeurs « en dur », de corriger celles qui créent une incohérence et de consigner celles qui devront évoluer plus tard. L'audit ciblé des composants, modèles et URL distingue les fixtures assumées du prototype des valeurs qui pilotaient à tort un comportement.

**P11-F34 — corrections candidates :** Découvrir transmet désormais l'identifiant de liste reçu au lieu d'ouvrir systématiquement `places`. Les critiques et réponses utilisent des identifiants d'acteurs stables pour les permissions, le blocage et les destinations de profil ; aucune comparaison du nom visible ne détermine plus un droit. Les identités et présentations simulées sont centralisées dans `app/prototype-data.ts`, le catalogue des listes dans `app/catalogue.ts`, et l'origine ainsi que la route publique dans `app/site-config.ts`. Les vues dérivent leurs noms, initiales, listes, aperçus et URL de ces sources communes.

Le nouveau [`PROTOTYPE_DATA_REGISTER.md`](./PROTOTYPE_DATA_REGISTER.md) consigne les données encore volontairement statiques et leur remplacement futur : session et profils, catalogue, bibliothèque/Journal, listes liées à leur propriétaire, progression, recommandations et interactions sociales. Il signale explicitement que les deux profils partagent encore le même catalogue de listes dans la démonstration. Les seuils produit validés et l'origine sentinelle `https://app.local` de la normalisation d'authentification restent inchangés et ne sont pas traités comme des données métier oubliées.

Une régression dédiée protège la transmission des identifiants, l'absence de permission fondée sur un nom et l'unicité des sources canoniques. Vérification complète réussie : **build de production, lint, `git diff --check` et 98/98 tests**. Cette centralisation prépare le futur backend sans l'implémenter et ne change ni le contenu visible attendu, ni le périmètre du lot 1.

### Mise à disposition pour recette — version Sites 30

- Source P11-F34 commitée au SHA `9bce0e85869a1ceb5c10fbfa9f212beaa2a1e664` et envoyée uniquement sur le dépôt technique `origin` du Site. Le distant GitHub `github` reste inchangé.
- Build exact du commit réussi, archive enregistrée comme version **30** : `appgprj_6a89f5d96774819197b23b79c7c07abd~appgver_0e2722e95fe481919105db56d6005dfd`.
- Déploiement privé propriétaire réussi : `appgdep_6a987ed34b208191935caf4dd8b6e542`, URL `https://chapter-reading.smrdsh.chatgpt.site`.
- Contrôle après publication : version courante 30, provenance égale au SHA candidat, accès personnalisé limité au propriétaire sans groupe autorisé.

La version 30 remplace la version 29 comme base de recette visible. Elle ne constitue ni une validation de P11-F34, ni une clôture de la phase 11 ou du lot 1, ni une autorisation de synchronisation GitHub.

## 24. Reprise de recette — cohérence des traces et profils sociaux

La recette de la version 30 révèle que les « Traces publiques » d'un profil étaient des textes autonomes : ouvrir l'œuvre ne garantissait donc ni la présence de cette critique, ni le même contenu. L'utilisateur confirme également que la limitation historique aux seuls liens de Lina doit disparaître : toute apparition d'un profil doit être navigable, sur le modèle d'un réseau social cohérent.

**P11-F35 — corrections candidates :** `app/social-data.ts` devient la source commune des critiques simulées. Les traces de chaque profil filtrent ce registre par auteur, tandis que chaque page d'œuvre le filtre par œuvre ; les critiques personnelles publiées proviennent directement des entrées du lecteur. Une trace ne peut donc plus exister sans sa critique correspondante. Maël, Lina, Théo et Inès disposent tous d'une présentation publique, d'un état de suivi indépendant et d'une destination depuis leur avatar comme depuis leur nom. Cette navigation couvre les critiques, les aperçus de réponse et les conversations développées.

Trois régressions dédiées vérifient la source commune profil–œuvre, l'exposition de chaque identité dans critiques/réponses et l'ouverture réelle du profil de Théo depuis la racine. Vérification complète réussie : **build de production, lint, `git diff --check` et 101/101 tests**. Le backend social, les routes publiques dynamiques et la persistance restent hors lot 1 ; le registre simule leur futur contrat sans les prétendre réalisés.

### Mise à disposition pour recette — version Sites 31

- Source P11-F35 commitée au SHA `904d2dfbf8fbcb5bb7dc6b8f710f24907f3d1570` et envoyée uniquement sur le dépôt technique `origin` du Site. Le distant GitHub `github` reste inchangé.
- Build exact du commit réussi, archive enregistrée comme version **31** : `appgprj_6a89f5d96774819197b23b79c7c07abd~appgver_fd6d9ca4275081918cd842fe6a562f4d`.
- Déploiement privé propriétaire réussi : `appgdep_6a98860710d8819190c3e749fdfb7124`, URL `https://chapter-reading.smrdsh.chatgpt.site`.
- Contrôle après publication : version courante 31 et provenance égale au SHA candidat.

La version 31 remplace la version 30 comme base de recette visible. Elle ne constitue ni une validation de P11-F35, ni une clôture de la phase 11 ou du lot 1, ni une autorisation de synchronisation GitHub.

### Validation de P11-F35

Le 2 septembre 2026, après vérification de la version 31, l'utilisateur valide la cohérence des traces et la navigation de toutes les identités. Il confirme comprendre que les routes publiques dynamiques, la persistance et les autres cohérences de données sociales seront renforcées par le futur backend. P11-F35 est donc accepté. Cette validation ciblée ne clôt pas implicitement le jalon regroupé : la décision finale sur l'ensemble de la phase 11 reste distincte.

## 25. Validation du jalon regroupé et clôture

Le 2 septembre 2026, invité à confirmer la validation du jalon complet de la version 31, l'utilisateur répond explicitement « Je valides. ». Cette décision succède à la recette des reprises et à l'acceptation ciblée de P11-F35 : elle porte sur l'ensemble regroupé, clôt la phase 11 et termine le lot 1.

La référence fonctionnelle acceptée reste la version Sites 31, issue du SHA `904d2dfbf8fbcb5bb7dc6b8f710f24907f3d1570`, avec **build de production, lint, `git diff --check` et 101/101 tests réussis**. Les limites de preuve demeurent : les cases manuelles non consignées séparément ne deviennent pas des tests exécutés par l'agent et aucune conformité WCAG globale n'est revendiquée. Le backend, l'authentification, la persistance et les routes publiques dynamiques restent hors lot 1.

Conformément à la règle permanente du dépôt, cette validation déclenche la synchronisation directe et vérifiée de la branche `main` de `maeldepreville/chapter`. Le lot 2 n'est pas ouvert par cette clôture : son périmètre devra faire l'objet d'un cadrage distinct.
