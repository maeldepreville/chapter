# Chapter — Phase 11 : consolidation transversale

Dernière mise à jour : 27 août 2026.

Statut : **premier ensemble accepté ; deuxième ensemble validé et implémenté, vérifications techniques réussies ; troisième ensemble proposé, non encore autorisé. Publication différée jusqu'à un jalon regroupé. Recette navigateur non encore effectuée.**

## 1. Point de départ et limites

**Consigne prioritaire du 27 août 2026 :** l'utilisateur valide les changements du premier ensemble, mais souhaite attendre d'autres étapes avant de publier. Cette consigne remplace explicitement l'instruction historique de déployer immédiatement la version 25 à la prochaine confirmation. Le flux de publication préparé est laissé inactif ; aucune nouvelle autorisation de déploiement n'est reçue. Les prochains travaux restent soumis à validation avant développement. GitHub continue de recevoir les éléments acceptés, indépendamment de la publication Sites. Aucun test manuel n'est implicitement déclaré exécuté par cette validation.

La phase 10 reste terminée et validée sur la version Sites 24. La présente phase termine le lot 1 : « Traiter les états transversaux et finaliser la cohérence, le responsive et l'accessibilité ». La demande, réitérée après une interruption de crédits, ouvre le travail de consolidation, pas une autorisation générale de développement.

Références : `CHAPTER_DECISIONS.md`, `PHASE_10_BILAN_ET_PASSATION.md`, `PHASE_10_IMPLEMENTATION_CHECKLIST.md` et les règles de `../AGENTS.md`. Le dépôt était propre au début de l'examen, sur `bbfadab`. Aucune nouvelle vérification distante GitHub n'est réalisée à cette ouverture ; les confirmations de synchronisation antérieures restent celles de la passation.

Préserver les choix PDR1B, PFP1, N1b, QR1, HDE1, HV1 et HMT1, les dessins des badges et le poinçon fourni. Ne pas rouvrir les arbitrages graphiques sans défaut démontré et nouvel accord.

Le prototype conserve des données simulées et des interactions locales à la session. Authentification réelle, onboarding, persistance distante, messagerie, notifications complètes, listes collaboratives, classements, moteur réel de recommandation et administration restent exclus. Les vérifications de confidentialité portent sur les vues de démonstration, pas sur la sécurité d'un backend inexistant.

## 2. Ordre de travail proposé — à valider

1. **Superpositions et continuité des actions** : fermetures, focus, clavier, protection des saisies, restitution du contexte et arbitrage des surfaces simultanées.
2. **États transversaux et cas limites** : absence de données, résultats vides, erreurs d'image ou de partage, noms/titres/écrits longs, données incomplètes, clics répétés. Réutiliser les comportements déjà validés ; ne pas simuler une panne réseau d'un service absent.
3. **Responsive, cohérence et accessibilité** : petits écrans, seuil de 900 px, texte agrandi, débordements, navigation et contrôles au clavier, lecteurs d'écran, contrastes, cibles tactiles ; discussion dédiée aux animations et transitions (utilité, rythme, cohérence, réduction du mouvement), en conservant les choix S2 et QRM1b sauf nouvel arbitrage.
4. **Clôture du lot** : non-régression ciblée des parcours personnels et sociaux, bilan technique, checklist exhaustive et validation utilisateur. La validation du jalon déclenchera la synchronisation GitHub directe conformément à `AGENTS.md`.

Ces ensembles organisent l'audit ; ils ne sont pas quatre autorisations anticipées d'implémentation. Les corrections sont proposées puis validées avant développement. Aucun changement de l'architecture ni aucune refonte ne sont décidés ici.

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

## 9. Troisième ensemble proposé — textes longs et erreurs d'action

**Statut : proposé, non encore autorisé.** Il relève toujours du volet 2 de la phase 11. Les animations, le cadrage au clavier et l'audit global responsive/accessibilité restent dans le volet 3 ; aucun nouveau mouvement n'est proposé ici.

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

### Corrections proposées

1. **Import photo fiable** : message discret « Préparation de l’image… », seul le dernier fichier choisi peut devenir actif ; ignorer les réponses anciennes après nouveau choix ou fermeture. Conserver le dernier cadrage valide pendant un échec, permettre de réessayer le même fichier et empêcher l'enregistrement pendant la préparation. Annuler et Fermer restent disponibles. Aucun nouvel effet animé, outil de retouche ou modification des limites PFP1.
2. **Recadrage récupérable** : intercepter les échecs de lecture de l'image affichée, de dessin et d'export ; garder le panneau et le cadrage, expliquer l'échec au même endroit et permettre un nouvel essai. Remplacer la photo enregistrée et fermer uniquement après production d'une image valide. Ne pas annoncer une réussite sur un export vide ou invalide.
3. **Copie et partage cohérents** : une seule opération à la fois, commandes concernées temporairement indisponibles ; confirmer uniquement le succès effectif. Si copie native et repli échouent, rendre un message utile avec recours au lien déjà affiché, nettoyer le champ temporaire et restituer le focus. Garder l'annulation de partage silencieuse, ne pas copier à son insu après cette annulation et empêcher un ancien résultat d'écraser le retour courant. Préserver la disposition QRP1b et la carte QRM1b.
4. **Écrits longs lisibles** : appliquer l'aperçu et l'expansion locale « Lire la suite / Réduire » aux critiques longues là où ils manquent, sans changer l'ouverture des conversations ; conserver les paragraphes des notes/critiques/réponses. Contenir les chaînes sans espaces dans les zones de texte et les titres d'œuvre, tout en préservant le titre intégral hors de la couverture. Ne pas tronquer les données enregistrées, ajouter une limite de saisie ou modifier la carte N1b. Les lignes/espaces exacts relèveront du contrôle visuel ultérieur.

Après autorisation : ajouter des tests de régression avec fins d'import inversées, fermeture pendant préparation, erreurs de décodage/export/copie, clics répétés, partage annulé et texte multi-paragraphes/chaînes longues. Compléter la checklist du futur jalon et distinguer ces tests des vérifications réelles de navigateur. Pas de simulation de panne réseau d'un backend absent ni de nouvelle persistance.
