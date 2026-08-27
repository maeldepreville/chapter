# Phase 10 — Checklist d’évaluation du jalon JI1

Cette checklist couvre le jalon intégré Découvrir, profils, Chapitres d’honneur et conversations sociales. Elle complète les contrôles automatisés et sert à relever les ajustements visuels ou ergonomiques avant validation définitive.

**Clôture : phase 10 validée globalement par l'utilisateur le 27 août 2026 sur la version 24.** Les cases restent non cochées individuellement : aucune exécution détaillée de chaque scénario n'a été fournie. Cette liste est conservée comme référence de couverture et de non-régression pour la phase 11, et non comme une recette encore bloquante.

## 1. Navigation et non-régression

- [ ] Sur desktop, ouvrir successivement Journal, Découvrir et Bibliothèque depuis l’en-tête ; l’état actif reste identifiable.
- [ ] Sur mobile, retrouver ces trois destinations dans la navigation basse sans débordement horizontal.
- [ ] Ouvrir le menu du compte, puis le fermer par un clic extérieur ; accéder ensuite à son profil.
- [ ] Depuis Journal, Découvrir puis Bibliothèque, ouvrir « Mon profil » : le profil propriétaire doit s'afficher sans page blanche et la navigation doit rester utilisable pour revenir aux autres vues.
- [ ] Sur mobile, ouvrir la feuille de compte puis toucher « Voir mon profil » ; la feuille doit se fermer après la navigation, sans intercepter le clic.
- [ ] Depuis la recherche d’en-tête, saisir une œuvre et valider avec Entrée ; arriver dans Découvrir avec la requête conservée.
- [ ] Depuis Journal ou Bibliothèque, ouvrir une œuvre, changer son statut, enregistrer une note et publier une critique : les parcours de phase 9 restent fonctionnels.
- [ ] Vérifier les retours depuis une œuvre, un profil, une liste et les Chapitres d’honneur ; aucun écran ne doit produire d’impasse.
- [ ] Dans la Bibliothèque, vérifier le tri sur desktop et à 320 px : flèche éloignée du bord, menu aligné au bouton sans débordement, fond blanc cassé, survol brique doux sans bleu natif et coche sur le choix courant.
- [ ] Choisir successivement « Activité récente », « Titre » et « Auteur » : libellé et ordre des œuvres changent, le menu se ferme ; recherche et filtre restent conservés. Quitter puis revenir conserve le tri mais pas un menu ouvert.
- [ ] Tester le tri au clic et au toucher : second clic sur le bouton, clic extérieur et choix d'une option ferment correctement, sans bloquer la navigation.
- [ ] Au clavier, ouvrir le tri avec Entrée/Espace, parcourir avec les flèches, Début/Fin et les premières lettres ; Entrée/Espace valide, Échap annule le choix en attente, Tab valide puis quitte le contrôle sans piéger le focus.

## 2. Découvrir — desktop et mobile

- [ ] À l’arrivée, identifier une recommandation principale, deux échos et une liste éditoriale sans impression de catalogue marchand.
- [ ] Choisir successivement « ailleurs », « calme » et « surprise » ; la proposition principale et son texte changent immédiatement.
- [ ] Effacer l’intention ; retrouver l’état éditorial par défaut.
- [ ] Ajouter une œuvre à « À lire » ; constater le nouvel état, utiliser « Annuler », puis vérifier le retour au statut précédent.
- [ ] Ouvrir l’œuvre principale et chacun des deux échos.
- [ ] Ouvrir la liste publique, revenir à Découvrir, puis ouvrir le profil de Lina.
- [ ] Suivre puis ne plus suivre Lina depuis les différents points d’entrée ; l’état doit rester cohérent pendant la session.
- [ ] Rechercher un titre exact et ouvrir le résultat.
- [ ] Saisir un mot-clé ou un souvenir approximatif, par exemple « vent » puis « cartografies vent » ; ne pas voir « Résultats exacts », mais au plus trois propositions « Vous cherchez peut-être… » expliquées.
- [ ] Saisir le titre complet « Cartographies du vent » ; cette fois seulement, voir la rubrique « Résultats exacts ».
- [ ] Rechercher une chaîne sans correspondance ; l’état vide doit proposer une sortie simple sans quasi-onboarding.
- [ ] Sur mobile, vérifier DR1M1 : la colonne reste d’une longueur acceptable, l’ordre éditorial est compréhensible et la page possède une fin naturelle.

## 3. Profils et listes publiques

- [ ] Sur desktop, vérifier PDR1B : la double colonne doit se limiter à l’ouverture, avec carte et honneurs à gauche et la section complète « Œuvres de chevet » centrée verticalement à droite.
- [ ] Sous cette ouverture, les Listes publiques puis les Traces publiques doivent reprendre toute la largeur utile du profil ; aucun grand vide de colonne ne doit subsister.
- [ ] Comparer son profil et celui de Lina : la différence de longueur de l’introduction ne doit ni étirer artificiellement les œuvres de chevet, ni désaligner le début des sections pleine largeur.
- [ ] Vérifier la carte de lecteur : photo, « Votre portrait », nom, titre et introduction doivent former une surface blanc cassé, mate et légèrement grainée ; le sceau compact « C. » reste discret et les Chapitres d’honneur demeurent séparés sous la carte.
- [ ] Tester un nom libre court puis une appellation proche de 36 caractères : la composition doit rester centrée sur une ou deux lignes équilibrées, sans couper aucun mot ni toucher les bords.
- [ ] Sur mobile, vérifier que PDR1B restitue l’ordre continu carte → honneurs → œuvres de chevet → listes → traces, sans cartes écrasées ni sections confondues.
- [ ] Le titre « Chapitres d’honneur → » ouvre bien la galerie ; seuls trois badges acquis sont montrés sur le profil.
- [ ] Sur le profil de Lina, suivre/ne plus suivre reste réversible et aucune progression privée n’apparaît.
- [ ] Après « Suivre », vérifier que « Suivi » présente un fond gris clair et un texte brique, y compris au survol ; un second clic rétablit le fond brique et le texte clair. Refaire le cycle sur mobile.
- [ ] Ouvrir sa liste publique autonome, une œuvre de la liste et son profil ; le rôle du nom d’auteur et celui du bouton d’abonnement restent distincts.

## 4. Carte recto-verso QR1

- [ ] Sur son propre profil, vérifier que « Retourner la carte » se trouve immédiatement sous le bord droit ; la commande ne doit apparaître ni sur le profil de Lina, ni sur la route publique de Maël.
- [ ] Retourner la carte : le recto doit pivoter horizontalement autour de son centre en environ 440 ms, sans rebond, zoom, déplacement de la carte ou saut des sections voisines.
- [ ] Au verso, vérifier QRV1 et QRT1 : signature Chapter discrète, QR généreux sur aplat blanc sans grain, nom et instruction aérés, puis URL isolée dans le pied.
- [ ] Vérifier QRP1b : « Voir le recto » occupe exactement le même repère que « Retourner la carte » ; « Copier le lien » et « Partager » apparaissent sur leur propre ligne sans déplacer cette commande.
- [ ] Copier le lien, puis le coller ailleurs : l’adresse doit être `https://chapter-reading.smrdsh.chatgpt.site/profil/mael-depreville` et une confirmation discrète doit apparaître.
- [ ] Utiliser « Partager » sur un appareil compatible : la feuille de partage native doit proposer le profil. Sur un navigateur incompatible, le lien doit être copié avec un retour explicite.
- [ ] Scanner le QR depuis un second appareil ayant accès au checkpoint : arriver directement sur le portrait public de Maël, sans « Ajouter une photo », « Recadrer », « Retirer », commande de retournement ni progression privée.
- [ ] Depuis cette route publique, ouvrir une œuvre, une liste et les Chapitres d’honneur ; les retours doivent rester cohérents et seuls les badges acquis doivent être visibles.
- [ ] Quitter son profil alors que le verso est affiché, puis y revenir : la carte doit retrouver son recto.
- [ ] Répéter sur mobile à 320 px : QR, nom, instruction, URL et utilitaires doivent rester lisibles, sans débordement ni compression du silence autour du code.
- [ ] Activer la réduction des animations : les faces doivent être échangées immédiatement sans rotation, tandis que le focus et les libellés restent corrects.

## 5. Photo de profil PFP1

- [ ] Importer un JPEG, PNG ou WebP de moins de 8 Mo dont le petit côté mesure au moins 512 px.
- [ ] Avant l’import, vérifier que seule une surface claire de sélection est visible ; le cadre de recadrage ne doit apparaître qu’après le choix d’une image valide.
- [ ] Dans cet état vide, vérifier que « Choisir une image » est centré horizontalement.
- [ ] Sur la carte, vérifier que le poinçon fourni est net et entièrement visible, que son point brique reste séparé des cercles et que l’asset ne chevauche ni le libellé de la carte ni les informations du portrait.
- [ ] Sans photo puis avec une photo enregistrée, vérifier que « Ajouter une photo » et le groupe « Recadrer · Retirer » sont centrés sous le portrait sur desktop et mobile.
- [ ] Déplacer l’image à la souris puis au toucher/stylet ; aucun saut ni effet haché ne doit apparaître.
- [ ] Zoomer avec le curseur, la molette et un pincement tactile ; le cadre doit rester entièrement couvert et l’aperçu circulaire synchronisé.
- [ ] Observer la netteté durant les déplacements et zooms : la source haute définition ne doit pas se pixelliser pendant l’interaction.
- [ ] Enregistrer le cadrage ; retrouver la photo sur le profil et dans l’en-tête concerné.
- [ ] Après avoir enregistré un fort zoom et un décalage, rouvrir « Recadrer » ; retrouver le cadrage précédent tout en pouvant revenir au zoom minimal de la source originale.
- [ ] Recommencer un cadrage puis annuler ; l’image précédemment enregistrée doit rester intacte.
- [ ] Essayer un mauvais format, un fichier de plus de 8 Mo et une image trop petite ; chaque erreur doit être compréhensible et non destructive.
- [ ] Toucher « Retirer » ; le dialogue doit se superposer sans déplacer le contenu de la carte. Confirmer pour restaurer les initiales, puis tester aussi l’annulation.

## 6. Chapitres d’honneur

- [ ] Vérifier HDE1 : les honneurs obtenus ouvrent la galerie sous « Distinctions singulières », avec des insignes légèrement plus grands et une courte légende aérée ; les lignées viennent ensuite sous « Au fil de votre parcours ».
- [ ] Sur desktop, retrouver quatre colonnes dans l'ordre Lecture → Exploration → Expression → Relation, avec l'acquis au-dessus du prochain badge grisé dans chaque colonne, sans panneaux encadrés ni anciennes évolutions.
- [ ] Sur mobile et tablette sous B2, retrouver une famille par ligne : acquis à gauche et prochain à droite. À 320 px, vérifier les noms et l'absence de débordement horizontal.
- [ ] Comparer les deux honneurs de Maël et l'unique honneur de Lina : leurs dimensions restent cohérentes et un honneur isolé est centré, sans case vide. Les autres honneurs non obtenus ne sont jamais révélés.
- [ ] Dans une fixture sans honneur acquis, aucune section « Distinctions singulières », aucun compteur ni emplacement verrouillé ne doit apparaître (cas couvert automatiquement).
- [ ] Vérifier qu’aucun ancien palier remplacé n’apparaît dans le mur continu.
- [ ] Chaque axe possède une silhouette et une couleur propres ; chaque honneur possède sa forme, sa couleur et son symbole.
- [ ] Les évolutions se lisent dans les ornements et la matière sans se limiter à l’ajout de pointes décoratives.
- [ ] Sur desktop, survoler puis focaliser un badge au clavier ; la mini-fiche doit apparaître sans masquer inutilement le mur.
- [ ] Sur mobile, toucher le badge acquis d’une paire ; HMT1 doit insérer son détail sous les deux badges sans éjecter, repousser ni changer de colonne le badge suivant. Répéter avec le badge suivant, puis toucher l’extérieur pour vérifier le déplacement et la fermeture.
- [ ] Toujours sur mobile, ouvrir un acquis puis toucher immédiatement son évolution suivante et un badge de la rangée voisine ; chaque fiche demandée doit remplacer la précédente dès le premier toucher, sans fermeture parasite.
- [ ] Passer d'un honneur singulier à une lignée, puis revenir : une seule fiche reste ouverte. Le détail d'un honneur s'insère sous sa paire entière ; second toucher et toucher extérieur ferment la fiche.
- [ ] Sur desktop, tester survol, focus clavier, clic et Échap dans les deux registres ; les fiches des colonnes de bord ne doivent pas sortir de l'écran et leurs actions restent utilisables.
- [ ] Sur les prochains badges, lire une ligne MP1 concise ; aucune jauge globale ou condition privée ne doit être publique.
- [ ] Équiper un titre ; vérifier sa mise à jour immédiate sur le profil et dans le menu du compte.
- [ ] Vérifier la compréhension des deux commandes : « Afficher ce titre sous mon nom » modifie l’appellation, tandis que « Afficher ce badge sur mon profil » modifie la sélection d’insignes.
- [ ] Choisir jusqu’à trois badges à afficher ; une quatrième sélection doit être refusée clairement, sans dépasser trois.
- [ ] Ouvrir la galerie de Lina puis celle de Maël depuis sa route publique ; n'y voir que les acquis, sans badge grisé, compteur, objectif, titre verrouillé ou place réservée aux prochains badges. Les commandes propriétaires sont absentes.
- [ ] Examiner les vingt-et-un assets à plusieurs tailles et sur écran dense : contours, métal, symboles et textes voisins restent nets.
- [ ] Depuis le profil de Lina, ouvrir successivement ses deux listes ; chacune doit afficher son propre titre et son propre nombre d’œuvres, puis revenir au profil. Depuis Découvrir, vérifier que la liste publique revient bien à Découvrir.

## 7. Critiques et conversations

- [ ] Sur une œuvre riche en échanges, repérer d’abord le groupe des critiques de personnes suivies, puis le flux général.
- [ ] Sur l’œuvre sans échange communautaire, obtenir un état vide sobre ; sur l’œuvre à échange rare, voir une seule critique sans mise en scène artificielle.
- [ ] Sur une critique commentée, voir la réponse la plus récente et le nombre total, puis développer et replier la conversation.
- [ ] À 320 px puis sur desktop, vérifier un espace net entre « Voir la conversation · 2 » et « Répondre » ; si les commandes passent sur deux lignes, elles restent séparées. Après développement, « Répondre » reste sous les messages. Vérifier aussi une critique sans réponse et une conversation fermée.
- [ ] Vérifier RP1 : toutes les réponses forment une chronologie plate, sans niveau imbriqué.
- [ ] Répondre en ligne ; ajouter une mention ou citer le contexte, publier puis retrouver le message dans la conversation.
- [ ] Modifier puis supprimer une de ses réponses.
- [ ] Signaler une réponse d’un autre lecteur et bloquer son auteur ; vérifier le retour simulé et l’absence d’action ambiguë.
- [ ] Fermer sa propre conversation, vérifier que l’historique reste lisible mais que les nouvelles réponses sont empêchées, puis la rouvrir.

## 8. Accessibilité, responsive et cas limites

- [ ] Tester au clavier les navigations, boutons, badges, menus, formulaires et dialogues ; le focus reste visible et suit un ordre logique.
- [ ] Utiliser Échap et le clic/toucher extérieur sur menus, mini-fiches et surfaces temporaires lorsqu’ils sont proposés.
- [ ] Tester approximativement à 320 px, 768 px et sur grand desktop ; aucun contenu important ne doit sortir de l’écran.
- [ ] Vérifier les libellés de boutons et états actifs avec un lecteur d’écran ou l’inspecteur d’accessibilité.
- [ ] Activer la réduction des animations du système ; l’interface reste claire sans dépendre d’un mouvement.
- [ ] Répéter rapidement abonnements, ouvertures, changements de badge et recadrages ; aucun état visuel obsolète ne doit subsister.
- [ ] Depuis une œuvre et depuis la Bibliothèque mobile, choisir « En cours » puis « Lu » ; le panneau de date doit apparaître au-dessus du voile et proposer « Aujourd’hui », « Choisir » et « Plus tard » sans bloquer la conservation du statut.

## 9. Limites assumées du prototype

- [ ] Considérer les données, abonnements, signalements, blocages, titres et publications comme locaux à la session : aucune persistance distante n’est attendue.
- [ ] Dans les critiques, seul l'avatar de Lina est relié à un profil visiteur ; Théo et Inès sont encore des auteurs d'exemple sans profil navigable. Leur absence de destination est une limite documentée, non une panne.
- [ ] La route du profil de Maël est directement adressable, mais sa consultation depuis un appareil tiers reste soumise à la politique d’accès du Site ; l’accès public anonyme définitif dépendra des futurs comptes et règles de publication.
- [ ] Ne pas évaluer dans ce jalon l’authentification, la messagerie privée, les notifications complètes, les listes collaboratives, les classements, le backend de recommandation ou l’administration de modération.

## Relevé d’évaluation

Pour chaque anomalie, noter : support et largeur, écran de départ, suite d’actions, résultat obtenu, résultat attendu et capture si le problème est visuel. Les points les plus sensibles à arbitrer pendant cette recette sont la longueur de DR1M1, le déplacement HMT1 et la fluidité réelle de PFP1.
