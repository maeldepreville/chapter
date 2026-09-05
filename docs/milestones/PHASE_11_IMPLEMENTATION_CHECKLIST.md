# Phase 11 — Recette des ensembles, d'AM1 et du correctif responsive

Date : 1er septembre 2026. Statut mis à jour le 2 septembre : **jalon regroupé accepté par l'utilisateur sur la version 31**. Les cases non cochées restent des scénarios sans relevé individuel et ne doivent pas être présentées comme exécutées par l'agent. Périmètre : superpositions, focus, fermetures, protection NSV2, états vides, données manquantes, couvertures en erreur, import/recadrage, copie/partage, textes longs, mouvement AM1, correctifs responsive/tactiles et parcours transversaux ; aucune refonte graphique. CT1 est refusé.

## Conditions

- [ ] Sur desktop, utiliser souris puis clavier seul. Sur mobile, utiliser le toucher et, si disponible, un clavier externe ; Échap nécessite un clavier.
- [ ] Vérifier un petit écran (environ 320–390 px), les deux côtés du seuil 900 px et le desktop habituel. Ce relevé concerne les surfaces modifiées, pas l'audit responsive complet.
- [ ] Noter écran de départ, suite d'actions, résultat attendu/obtenu et navigateur pour toute anomalie.

## Règles communes aux cinq fenêtres

À répéter pour recherche, note privée, critique, recadrage photo et confirmation de retrait de photo :

- [ ] Ouvrir avec la souris/toucher puis, séparément, avec Tab et Entrée/Espace. Aucun double déclenchement ni page blanche.
- [ ] Vérifier le focus initial : champ de recherche, champ de note/critique, bouton Fermer du recadrage, bouton Conserver du retrait.
- [ ] Parcourir tous les contrôles avec Tab ; le dernier revient au premier. Maj+Tab fait le chemin inverse. Aucun contrôle de la page derrière n'est atteint ; le focus reste visible, y compris après défilement interne.
- [ ] Vérifier que le fond ne reçoit pas d'action et ne défile pas ; le contenu long de la fenêtre reste défilable. À la fermeture, le défilement de page est rétabli.
- [ ] Fermer séparément par Échap, bouton Fermer/Annuler/Conserver selon la surface, et clic/toucher sur le voile. Les règles de protection ci-dessous priment sur une fermeture immédiate.
- [ ] Un clic dans le panneau ne le ferme pas. Une seule pression sur Échap n'exécute qu'une transition.
- [ ] Vérifier le retour du focus au déclencheur, sans saut de page. Si l'action a changé d'écran ou supprimé ce déclencheur, vérifier le repli décrit ci-dessous.
- [ ] Ouvrir/fermer à plusieurs reprises ; aucune fenêtre invisible, focus perdu ou page restant bloquée après fermeture.
- [ ] Comparer les dimensions, couleurs, panneaux mobile/desktop et positions au rendu validé ; aucun cadre natif supplémentaire.

## Recherche

- [ ] Ouvrir puis fermer sans sélection ; retrouver le contrôle d'origine.
- [ ] Saisir une recherche, parcourir et ouvrir une œuvre ; retrouver la bonne œuvre avec un focus logique sur la nouvelle page.
- [ ] Ouvrir les résultats dans Découvrir depuis la fenêtre ; vérifier la destination, la requête et l'absence de blocage du focus ou du défilement.

## Notes et critiques — chacun des deux éditeurs

- [ ] Ouvrir depuis une œuvre ; pour les entrées disponibles, répéter depuis le Journal. Sans modification, fermer sans alerte.
- [ ] Modifier le texte, puis demander à fermer par Échap, la croix, Annuler et le voile dans des essais séparés : une seule alerte intégrée apparaît et le texte demeure visible.
- [ ] Vérifier que le focus arrive sur « Revenir à la note/critique », y compris quand les actions sont sous la partie visible d'un long éditeur.
- [ ] Choisir « Revenir à… » : retour au champ avec le brouillon intact. Refaire le scénario avec Échap depuis l'alerte : même résultat sûr, aucune fermeture de l'éditeur.
- [ ] Depuis l'alerte, la croix ou le voile ramène également à l'écrit sans abandon implicite.
- [ ] Demander de nouveau à fermer puis choisir « Ignorer les modifications » : fermeture, état enregistré antérieur conservé et focus restitué.
- [ ] Enregistrer la note ; publier/modifier la critique : fermeture normale, contenu correct, aucune protection résiduelle à la réouverture.
- [ ] Pour la critique, modifier uniquement les étoiles : la protection se déclenche aussi. Un retour sûr conserve texte et évaluation ; l'abandon restitue les valeurs enregistrées.
- [ ] Après publication, utiliser « Annuler » dans le retour temporaire : réouverture avec le texte attendu, focus dans l'éditeur, puis fermeture sans perte ou blocage. Le bouton d'annulation disparu ne doit pas recevoir le focus.

## Photo de profil

- [ ] Sans photo, ouvrir le panneau puis l'annuler ; les initiales sont conservées.
- [ ] Importer un fichier valide et enregistrer. Rouvrir Recadrer : la source et le cadrage enregistrés restent disponibles.
- [ ] Modifier le cadrage puis quitter par Annuler, Échap, la croix ou le voile : la dernière photo enregistrée est conservée, sans nouvelle confirmation ajoutée.
- [ ] Avec une photo, ouvrir Retirer : focus sur Conserver et fond bloqué. Conserver, Échap et le voile annulent chacun la confirmation ; la photo reste intacte et le focus revient sur Retirer.
- [ ] Confirmer « Retirer la photo » : initiales restaurées et focus sur « Ajouter une photo », puisque Retirer n'existe plus. La carte ne change pas de composition.

## Non-régression des surfaces non modales

- [ ] Compte desktop/mobile : ouverture, fermeture extérieure, Échap et accès au profil fonctionnent toujours ; Tab n'est pas piégé comme dans une modale.
- [ ] Tri de Bibliothèque : flèches, Début/Fin, premières lettres, Entrée/Espace, Échap et Tab conservent les règles validées ; clic extérieur ferme sans appliquer un choix seulement parcouru.
- [ ] Statut depuis œuvre et Bibliothèque : ouvrir, fermer, choisir En cours/Lu puis une date ou Plus tard ; le relais reste visible et le statut est conservé sans date lorsque prévu.
- [ ] Mini-fiches des honneurs : passer entre badges au clavier/toucher, fermer par Échap ou toucher extérieur ; compositions et assets inchangés.
- [ ] Passer ensuite entre Journal, Découvrir, Bibliothèque et profil : aucun voile résiduel, navigation inactive ou page impossible à faire défiler.

## Contrôle assisté et limites

- [ ] Si un lecteur d'écran est disponible, vérifier nom et rôle de chaque fenêtre, annonce de la protection NSV2 et absence de navigation dans le fond d'une vraie modale.
- [ ] Distinguer les tests automatisés (logique et invariants de source) de cette recette réelle. Aucun succès automatique ne coche implicitement ces cases.
- [ ] Le déplacement de l'image au clavier, les contrastes, tous les cas extrêmes de données et l'audit global responsive/accessibilité restent des sujets ultérieurs de phase 11. Les données demeurent simulées.

## Deuxième ensemble — préparation des scénarios

Les données absentes/incomplètes sont injectées par les fixtures internes de `tests/fixtures/phase11.mjs` et `tests/phase11-empty-states.test.mjs`, exécutables avec `node --test tests/phase11-empty-states.test.mjs`. Ne pas demander à l'utilisateur d'effacer ses contenus, modifier le code ou utiliser un panneau public de débogage. Ces tests automatisés ne cochent aucune case visuelle ci-dessous : les scénarios non présents dans la démonstration normale devront être préparés dans un environnement interne pour une future recette navigateur explicitement demandée.

- [ ] Catalogue vide : Découvrir, profils, listes, Journal et page d'œuvre restent lisibles, sans page blanche ; les retours au Journal ou à l'écran précédent fonctionnent.
- [ ] Catalogue incomplet : chaque liste/favori affiche uniquement les œuvres disponibles, une fois chacune ; compteurs et ordre cohérents, aucun titre, couverture ou commentaire emprunté à une autre œuvre.
- [ ] Proposition principale indisponible : message sobre, envies facultatives et autres propositions réellement disponibles utilisables ; aucun remplacement trompeur.
- [ ] Métadonnées absentes : « Œuvre indisponible », texte de la note/critique conservé, confidentialité inchangée, absence de faux lien ou commande Modifier. Pour un texte long déjà prévu, Lire la suite reste utilisable.

## Deuxième ensemble — Journal et conservation des écrits

- [ ] Ni lecture ni trace : invitation unique « Votre journal commence avec une œuvre » et recherche fonctionnelle ; aucun rail ni bloc chronologique vide.
- [ ] Traces sans lecture : message compact, traces présentes ; « Voir mes livres à lire » ouvre la bonne catégorie si elle contient une œuvre. Sinon « Rechercher une œuvre » ouvre la recherche.
- [ ] Lectures sans trace : lectures et actions de note présentes ; « Votre prochaine note ou étape de lecture apparaîtra ici. » sans CTA supplémentaire.
- [ ] Lectures avec traces : composition habituelle conservée ; dernière trace, développement d'un texte et accès aux entrées précédentes fonctionnent.
- [ ] Enregistrer une première note, la modifier puis la vider explicitement : la trace suit l'écrit ; un brouillon abandonné ne crée pas de trace.
- [ ] Commencer/terminer une lecture : une étape rejoint le Journal ; un clic répété sur le même statut ne duplique pas la trace.
- [ ] Publier/modifier une critique, puis Annuler : état public et trace précédente restaurés, brouillon conservé dans l'éditeur, autres traces intactes.
- [ ] Retirer de la bibliothèque une œuvre avec puis sans écrit, et annuler le retrait : seuls l'organisation et le statut changent ; textes, évaluations et traces sont conservés.
- [ ] Bibliothèque vide, catégorie vide, recherche sans résultat, combinaison filtre/recherche : chaque action de récupération garde les autres données intactes.

## Deuxième ensemble — Découvrir et couvertures

- [ ] Sans historique, ou avec seulement À lire : « Un choix de Chapter pour commencer », indication d'évolution des propositions, envies facultatives ; aucune invitation à compléter un compte.
- [ ] Avec un signal réel sur les Cartographies et l'œuvre disponible : justification liée à cette lecture. Sans cette œuvre, retour à la justification éditoriale, sans référence personnelle introuvable.
- [ ] Choisir puis effacer chaque envie : raison cohérente, œuvres disponibles correctes, retour au parcours initial.
- [ ] Couverture valide : image habituelle conservée dans tous les formats, y compris après navigation et retour ; dimensions stables.
- [ ] Chargement ralenti : emplacement neutre, pas d'apparition fugace de la couverture typographique ni d'image cassée visible.
- [ ] Échec d'image : repli typographique de la même œuvre, avec titre/auteur ou initiale selon le format, sans déplacement de la mise en page. Refaire sur page d'œuvre, Journal, Bibliothèque, Découvrir, favoris et listes.
- [ ] Image absente dès le départ : couverture typographique immédiate. Changement d'œuvre/source : aucun état d'erreur hérité de l'image précédente.

Les animations S2 et QRM1b ne sont pas modifiées par cet ensemble. Leur harmonisation et la réduction des mouvements seront discutées dans le volet 3 de la phase 11, avant la recette finale.

## Troisième ensemble — photo et récupération

Les erreurs déterministes sont couvertes par les doublures internes de `tests/phase11-recovery.test.mjs`. Ces tests ne prouvent pas les comportements du navigateur réel ; préparer les scénarios rares dans un environnement interne, sans modifier les données de l'utilisateur.

- [ ] Choisir un JPEG, PNG puis WebP valide ; contrôler les limites de 8 Mo et 512 px, sans nouveau seuil ni retouche.
- [ ] Pendant « Préparation de l’image… », Enregistrer est indisponible ; Annuler, la croix, Échap et le voile restent utilisables. La photo déjà enregistrée reste intacte.
- [ ] Choisir A puis B rapidement, avec fins de lecture/décodage inversées : seul B est activé. Un ancien échec n'écrase pas le résultat de B.
- [ ] Fermer/quitter pendant la préparation, puis revenir : aucune réapparition de la photo annulée, aucun message tardif.
- [ ] Échec de lecture, format refusé, fichier trop lourd ou trop petit : message local et dernier cadrage valide conservé ; sélectionner de nouveau le même fichier déclenche un nouvel essai.
- [ ] Échec d'affichage après lecture : message local, retour au cadrage valide précédent lorsqu'il existe ; pas d'enregistrement d'une image cassée.
- [ ] Échec de dessin/encodage ou sortie vide/invalide : panneau ouvert, cadrage et photo enregistrée conservés, erreur annoncée. Réessayer avec succès, puis rouvrir : source et cadrage corrects.
- [ ] Modifier zoom/cadrage puis annuler : l'objet photo enregistré et son cadrage d'origine sont inchangés. Vérifier le déplacement/pincement et l'aperçu ; le cadrage au clavier reste à traiter au volet 3.

## Troisième ensemble — copie et partage

- [ ] Copier avec succès : confirmation uniquement après réussite réelle ; vérifier le contenu collé.
- [ ] Refuser le presse-papiers natif : vérifier le repli, son nettoyage et le retour du focus, y compris lorsqu'il échoue. En cas d'échec total, le message oriente vers le lien visible.
- [ ] Cliquer rapidement Copier/Partager : une seule opération, deux commandes indisponibles pendant son traitement, puis réactivées.
- [ ] Partager via le système : réussite confirmée ; annulation silencieuse et aucune copie implicite. Absence/échec du partage : message adapté seulement si la copie de repli réussit.
- [ ] Retourner la carte ou quitter le profil pendant l'opération : aucun ancien résultat affiché au retour, aucune copie de repli tardive. La disposition QRP1b et le retournement QRM1b restent identiques.

## Troisième ensemble — textes et titres

- [ ] Critique courte inchangée ; critique longue : aperçu puis Lire la suite/Réduire au clavier et au toucher, intégralité restituée sans modification du texte enregistré.
- [ ] Développer une critique puis sa conversation, et réduire chacune séparément : états indépendants, réponses et saisies conservées.
- [ ] Notes, critiques, Journal, réponses et aperçu de réponse : paragraphes conservés ; chaînes sans espaces contenues sur petit écran et avec texte agrandi.
- [ ] Titres longs hors couvertures : texte intégral dans œuvre, Journal, Bibliothèque, recherche, Découvrir, favoris et listes ; pas de débordement horizontal. Les limites L2 de couverture restent inchangées.
- [ ] Carte N1b : nom sans césure interne ; tailles, composition, badges et poinçon inchangés. Aucun nouvel effet animé.

## AM1 — mouvement, continuité et réduction

- [ ] Menus de statut (œuvre et bibliothèque), compte desktop et tri : fondu seul, ouverture 140 ms / sortie 100 ms ; aucune translation, échelle ni saut de contenu. Tri et statut appliqués dès le choix.
- [ ] Compte mobile, recherche, note, critique, cadrage et retrait photo : fondu seul 180/120 ms, panneaux et positions antérieurs conservés. Vérifier la sortie du dialogue natif sans disparition brusque du panneau ni double voile.
- [ ] Fermer durant l'ouverture puis rouvrir durant la sortie : animation reprise sans flash, aucune fermeture tardive. Répéter rapidement depuis plusieurs déclencheurs.
- [ ] Dès la fermeture : fond utilisable, scroll libéré, focus rendu sans attendre 120 ms ; aucune commande du contenu sortant atteignable au clavier, lecteur d'écran ou pointeur.
- [ ] Échap/clic extérieur durant une transition : NSV2 protège immédiatement un écrit modifié, jamais deux alertes ni perte de saisie ; retour à l'éditeur sans remonter une fenêtre.
- [ ] Photo : choisir/déplacer sans enregistrer, annuler, rouvrir immédiatement ; retrouver la photo enregistrée. Répéter pendant un import : aucune image/erreur tardive et nouveau choix possible.
- [ ] Retours d'action et copie/partage : fondu 120 ms sur changement réel, texte annoncé une seule fois, aucune réussite anticipée ni action dupliquée. Retourner/quitter le profil pendant une opération.
- [ ] Navigation, recherche, filtres et saisies immédiats, pas de cascade des livres. Changement de destination sans défilement animé ; ancres internes douces uniquement hors mouvement réduit.
- [ ] Souris : couleurs d'action sur 120 ms, pression et focus immédiats, pas d'échelle/rebond. Écran tactile : pas de survol persistant ; sélection et focus restent visibles.
- [ ] Activer la réduction du mouvement avant ouverture, puis pendant une entrée et une sortie : état final immédiat, aucun voile retenu, aucune boucle d'attente animée. Désactiver ensuite : prochains fondus rétablis, pas d'effet rejoué spontanément.
- [ ] QRM1b inchangé (environ 440 ms) hors mouvement réduit, alternative existante sans rotation dans ce mode. Badges, poinçon et honneurs sans nouvel effet.
- [ ] Répéter autour du seuil 900 px, redimensionner avec un menu ouvert et vérifier les variantes masquées ; aucune surface invisible interactive. Vérifier mouvement réduit dans CSS et JavaScript.

## Retour mobile et desktop étroit — correctifs candidats à évaluer

Signalement reçu : capture `IMG_0750.png`, Safari, verso arrêté après rotation ; recto en miroir superposé au verso. Ce constat utilisateur n'est pas une recette corrective passée par l'agent.

Second signalement reçu le 1er septembre : fenêtre desktop réduite au minimum, aucune face retournée visible et composition étrange. Aucun correctif n'était encore appliqué lors de ces deux observations.

- [ ] Pour la recette corrective, noter appareil, version Safari, largeur et état du mouvement réduit ; contrôler pendant la rotation et une fois le verso arrêté.
- [ ] Carte à 320/390/560/768 px et de part et d'autre de 900 px : verso à une colonne, QR centré et lisible, identité/instruction/adresse séparées ; aucun contenu du recto visible en miroir.
- [ ] Sur desktop, réduire progressivement la fenêtre à 901, 900, 899 px puis au minimum ; la face demandée reste visible, lisible et correctement composée à chaque étape, sans disparition au changement de navigation responsive.
- [ ] Répéter recto → verso → recto, avec/sans photo, portrait/paysage, mouvement normal/réduit ; dimensions de carte et repère de la commande stables, aucune face invisible interactive.
- [ ] Glisser un doigt et pincer deux doigts dans le recadrage : la photo seule réagit, ni la page ni la modale ne défilent. Un geste commencé hors image conserve le défilement normal du contenu de la modale.
- [ ] Après pincement, retirer alternativement l'un puis l'autre doigt et poursuivre avec le doigt restant : aucun saut ; quitter/revenir, annuler le geste ou perdre la capture : aucun contact fantôme.
- [ ] Comparer aperçu et photo enregistrée à chaque taille, puis rouvrir/annuler ; zoom au curseur inchangé, pas de nouveaux boutons de cadrage.

## Responsive, texte agrandi et contrôles — candidat du volet 3

- [ ] À 320, 390, 560, 899, 900 px puis sur desktop habituel : aucun défilement horizontal de page ; titres, actions, résultats approchants, formulaire de date et messages reviennent à la ligne sans recouvrir un contrôle.
- [ ] Zoom navigateur et taille de texte à 200 % : Journal, Bibliothèque, Découvrir, œuvre, profil, honneurs, liste publique et cinq fenêtres restent lisibles ; aucune information ni commande ne disparaît. Répéter avec espacement de texte personnalisé si disponible.
- [ ] Au clavier, parcourir tous les champs : bordure identifiable au repos et halo brique net au focus. Le focus du champ fichier doit entourer « Choisir une image » / « Choisir une autre image » sans faire apparaître un contrôle de fichier minuscule.
- [ ] Dans l'évaluation : Tab entre sur l'étoile sélectionnée, ou la première sans note ; flèches droite/bas et gauche/haut déplacent focus et sélection avec boucle ; Début/Fin rejoignent 1/5 ; Espace sélectionne ; Retirer remet une entrée clavier logique.
- [ ] Navigation desktop et mobile : la destination active est annoncée comme page courante. Compte, statut et honneurs annoncent leur état développé et leur surface associée ; Échap et Tab conservent un ordre visible.
- [x] Critiques et réponses : l'avatar et le nom de Maël, Lina, Théo et Inès ouvrent chacun le bon profil, avec des états de suivi indépendants. Validé par l'utilisateur sur la version 31 le 2 septembre 2026.
- [ ] Mesurer dans le rendu final les limites des champs et le halo de focus, y compris en contraste forcé. Vérifier les cibles compte/fermeture au toucher et l'absence de chevauchement avec les titres longs.

## Volet 4 — validation regroupée et décision de clôture

Les **101/101 tests automatisés**, la construction de production et le lint réussis préparent le jalon ; ils ne remplacent aucune case ci-dessous. Les tests du volet vérifient les liaisons de logique entre destinations, statuts/dates/traces et ajout/annulation depuis Découvrir, puis les reprises de recette et les sources canoniques de données simulées.

- [ ] Parcourir Journal → Bibliothèque → Découvrir → œuvre → profil de Lina → chacune de ses listes → honneurs → retours ; vérifier titres, destination courante, origine des retours et absence de page blanche.
- [ ] Suivre/ne plus suivre Lina depuis Découvrir, son profil et une liste : état et libellé identiques à chaque destination, y compris après les retours.
- [ ] Ajouter une œuvre depuis Découvrir, la retrouver dans Bibliothèque, annuler puis recommencer ; aucune trace ou saisie sans rapport n'est perdue.
- [ ] Enregistrer En cours puis Lu avec Aujourd'hui, une date choisie et Plus tard ; Journal, œuvre et Bibliothèque affichent le même statut, la bonne date et les traces attendues.
- [ ] Publier puis annuler une critique, modifier puis protéger une note, retirer puis restaurer une œuvre ; écrits, évaluation, focus et message temporaire restent cohérents.
- [ ] Ouvrir le profil public par son QR dans le contexte autorisé : aucun contrôle propriétaire ; revenir au profil propriétaire et vérifier photo, carte, partage, titre et trois badges exposés.
- [ ] Rejouer les contrôles prioritaires Safari/carte, recadrage tactile, 200 % de texte, clavier/focus, mouvement réduit et interruptions rapides des sections précédentes.
- [ ] Noter chaque anomalie avec navigateur, appareil, largeur, mouvement réduit et étapes ; ne cocher que les scénarios réellement exécutés.
- [x] Après correction éventuelle, décider explicitement : le jalon regroupé est validé par l'utilisateur le 2 septembre 2026 sur la version 31.
- [x] Après validation : bilan et documents de clôture mis à jour ; synchronisation GitHub directe engagée puis contrôlée séparément. Aucune nouvelle publication Sites n'est nécessaire.

## Reprise de recette — contrôle des trois nouveaux correctifs

- [ ] Sur le même téléphone et à la même largeur que la capture, retourner la carte : signature en tête, QR centré et généreux, nom puis instruction sous le QR, URL seule dans le pied. Aucun élément ne reste à gauche ou à droite dans une ancienne colonne.
- [ ] Répéter à 320, 390, 520 et 560 px, ainsi qu'à 899/900 px : la hiérarchie du verso reste verticale et aérée, sans modifier l'emprise de la carte ni le repère « Voir le recto ».
- [ ] Dans Découvrir, suivre puis ne plus suivre Lina depuis « Une sensibilité à découvrir » ; comparer au profil et à la page de liste : mêmes couleurs, mêmes états « Suivre » / « Suivi », même état annoncé.
- [ ] Saisir du texte dans « Titre ou auteur » sur Safari et Chrome : aucune croix native ; « Effacer » apparaît dans le champ, reste lisible et focalisable, vide requête/résultats puis rend la saisie immédiatement possible.
- [ ] Avec une souris, survoler un badge puis déplacer le pointeur jusque sur sa fiche : l'intervalle se franchit sans fermeture et les deux actions de la fiche restent cliquables. Quitter ensuite l'ensemble badge–fiche : la fiche disparaît immédiatement. Passer directement sur un autre badge : seule sa fiche apparaît.
- [ ] Cliquer un badge ou l'ouvrir au clavier avant de quitter sa cellule : la fiche reste disponible pour utiliser ses actions ; Échap, clic extérieur et sortie de la collection la ferment. Sur mobile, le toucher conserve son basculement actuel.
- [ ] Depuis mon profil, ouvrir chacune des deux listes : Maël Depréville et « Votre liste publique » sont affichés, aucun bouton « Suivre » n'est proposé, l'identité et « Retour à mon profil » ramènent au profil propriétaire.
- [ ] Refaire depuis le profil de Lina puis depuis Découvrir : Lina reste autrice, son bouton « Suivre/Suivi » conserve son état et le retour vise respectivement son profil ou Découvrir. Depuis le profil public de Maël, vérifier « Auteur de la liste » et le retour au profil public plutôt qu'au profil propriétaire.
- [ ] Depuis Découvrir, ouvrir successivement chacune des listes lorsqu'elle est proposée : la destination doit conserver la liste réellement choisie, sans retomber systématiquement sur « Des lieux qui racontent ».
- [ ] Vérifier qu'un changement de nom affiché n'altère ni les droits d'édition d'une réponse, ni le blocage d'un auteur, ni la destination de son profil ; ces règles reposent sur l'identifiant de l'acteur.
- [x] Depuis chaque trace publique de Maël, Lina, Théo et Inès, ouvrir l'œuvre : la même critique, la même note et le même auteur sont présents dans la section Critiques. Une critique retirée ne doit plus apparaître sur le profil. Validé par l'utilisateur sur la version 31 le 2 septembre 2026.
- [x] Dans les critiques et les réponses, ouvrir successivement l'avatar puis le nom de Maël, Lina, Théo et Inès : chaque action rejoint le bon profil, sans partager l'état de suivi d'une autre personne. Validé par l'utilisateur sur la version 31 le 2 septembre 2026.
