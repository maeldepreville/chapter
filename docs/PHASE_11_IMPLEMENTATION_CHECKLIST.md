# Phase 11 — Recette du premier ensemble de correctifs

Date : 27 août 2026. Statut : **recette à effectuer**, cases non exécutées par l'agent. Périmètre : superpositions, focus, fermetures et protection NSV2 ; aucune refonte graphique.

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
