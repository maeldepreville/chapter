# Chapter — Phase 11 : consolidation transversale

Dernière mise à jour : 27 août 2026.

Statut : **premier ensemble de correctifs validé par l'utilisateur le 27 août 2026 et implémenté ; vérifications et publication en cours. Recette non encore effectuée.**

## 1. Point de départ et limites

La phase 10 reste terminée et validée sur la version Sites 24. La présente phase termine le lot 1 : « Traiter les états transversaux et finaliser la cohérence, le responsive et l'accessibilité ». La demande, réitérée après une interruption de crédits, ouvre le travail de consolidation, pas une autorisation générale de développement.

Références : `CHAPTER_DECISIONS.md`, `PHASE_10_BILAN_ET_PASSATION.md`, `PHASE_10_IMPLEMENTATION_CHECKLIST.md` et les règles de `../AGENTS.md`. Le dépôt était propre au début de l'examen, sur `bbfadab`. Aucune nouvelle vérification distante GitHub n'est réalisée à cette ouverture ; les confirmations de synchronisation antérieures restent celles de la passation.

Préserver les choix PDR1B, PFP1, N1b, QR1, HDE1, HV1 et HMT1, les dessins des badges et le poinçon fourni. Ne pas rouvrir les arbitrages graphiques sans défaut démontré et nouvel accord.

Le prototype conserve des données simulées et des interactions locales à la session. Authentification réelle, onboarding, persistance distante, messagerie, notifications complètes, listes collaboratives, classements, moteur réel de recommandation et administration restent exclus. Les vérifications de confidentialité portent sur les vues de démonstration, pas sur la sécurité d'un backend inexistant.

## 2. Ordre de travail proposé — à valider

1. **Superpositions et continuité des actions** : fermetures, focus, clavier, protection des saisies, restitution du contexte et arbitrage des surfaces simultanées.
2. **États transversaux et cas limites** : absence de données, résultats vides, erreurs d'image ou de partage, noms/titres/écrits longs, données incomplètes, clics répétés. Réutiliser les comportements déjà validés ; ne pas simuler une panne réseau d'un service absent.
3. **Responsive et accessibilité** : petits écrans, seuil de 900 px, texte agrandi, débordements, navigation et contrôles au clavier, lecteurs d'écran, contrastes, cibles tactiles et réduction du mouvement.
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

## 6. Journal de phase

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
