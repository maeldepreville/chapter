# Chapter — P7 : recette complète

Statut : **candidate vérifiée, prête pour la recette utilisateur**

Dernière mise à jour : 11 septembre 2026.

## Résultat à évaluer

P7 vérifie que les décisions validées de P0 à P6 forment une expérience continue, compréhensible et stable. Il ne crée pas une nouvelle tranche produit : il rejoue les parcours de bout en bout, corrige seulement les non-régressions constatées et rassemble les preuves nécessaires à une décision explicite de fusion vers `main`.

## Atelier de recette

La route isolée `/recette/p7`, absente de la navigation produit, propose six points d’entrée :

1. **Visite publique** — Découvrir, Recherche et fiche œuvre sans compte ;
2. **Premier repère** — choix d’un statut, activation et restitution du geste ;
3. **Usage personnel** — Journal, Bibliothèque, progression, notes et relecture ;
4. **Vie sociale** — critiques, conversations, profils, listes et suivis ;
5. **Confiance** — identité publique, confidentialité, blocage, export, import et suppression ;
6. **Robustesse** — contenus extrêmes de P6, avec un accès distinct aux cinq scénarios complets de `/recette/p6`.

Changer de point d’entrée réinitialise uniquement la fixture de recette concernée. Le bandeau n’appartient pas au produit et ne doit apparaître sur aucune route normale.

## Matrice de recette finale

### Parcours public et activation

- ouvrir Découvrir, une œuvre, un auteur, une liste et un profil sans compte ;
- rechercher par titre et auteur, vérifier les absences locales puis revenir au catalogue ;
- choisir `À lire`, `En cours` puis `Lu` depuis une œuvre et vérifier la continuité de l’action après activation ;
- vérifier qu’aucune note, lecture ou identité privée n’est publiée implicitement.

### Parcours personnel

- retrouver le premier repère dans Journal et Bibliothèque ;
- filtrer, trier, rechercher et charger progressivement la Bibliothèque dense ;
- ouvrir une œuvre depuis chaque origine puis revenir à la destination et au contexte attendus ;
- enregistrer, modifier et abandonner une progression ou une note ;
- terminer une lecture, commencer une relecture et vérifier les traces chronologiques ;
- contrôler l’état introductif public, l’état personnel sans activité et l’état de catalogue réellement vide sans les confondre.

### Parcours social

- publier puis retirer une critique, développer son texte sur la fiche œuvre et vérifier son aperçu borné dans le Profil ;
- répondre à une conversation après création de l’identité minimale ;
- suivre et ne plus suivre depuis Découvrir, un Profil et une liste ;
- depuis son Profil, remplacer ou retirer les trois œuvres de chevet, puis créer, modifier et supprimer une liste publique ; vérifier que les deux sélecteurs ne proposent que les œuvres présentes dans la Bibliothèque ;
- sur une fiche œuvre, vérifier que sa propre critique et ses propres réponses sont signées « Vous », tandis que les autres lecteurs conservent leur nom public ;
- parcourir œuvre → critique → profil → liste → œuvre, puis vérifier tous les retours contextuels ;
- ouvrir et fermer Profil, liste et Chapitres d’honneur sur desktop et mobile sans flash ni perte du cadre de carte.

### Confiance et données

- modifier le nom public et la photo sans affecter les identifiants stables ;
- bloquer un lecteur et vérifier la disparition transversale de ses contenus, puis le débloquer ;
- exporter les données, réimporter une archive valide et vérifier que ses écrits restent privés ;
- éprouver les erreurs d’import sans altérer la session ;
- vérifier la confirmation de suppression, l’annulation et la sortie publique résultante ;
- contrôler la fermeture des réglages, du menu de compte et des dialogues au clavier et au toucher.
- enchaîner plusieurs actions à retour temporaire : les notifications restent empilées de la plus ancienne en haut à la plus récente en bas et leur réagencement est fluide ; vérifier aussi les cartes de réussite d'import et d'export et leurs destinations contextuelles.
- sur mobile, faire défiler Réglages et données : le sommaire horizontal reste disponible sous la barre de fermeture et chaque ancre laisse son titre visible.

### États, responsive et accessibilité

- rejouer `Normal`, `Vide`, `Chargement`, `Erreur` et `Contenus extrêmes` dans `/recette/p6` ;
- vérifier les routes inconnues, le lien d’évitement, les intitulés accessibles, les focus visibles et le retour du focus après dialogue ;
- contrôler 1440 px, 900 px, 390 px et 320 px sans débordement horizontal ni action masquée ;
- vérifier les césures, contrastes et zones distinctes des couvertures typographiques ;
- activer la réduction des mouvements et vérifier transitions, squelette et retournement de carte ;
- recharger les routes publiques directes et confirmer que l’URL, le contenu et les retours restent cohérents.

## Portes de sortie

La candidate P7 est présentable lorsque la construction de production, le lint, la suite automatisée et `git diff --check` réussissent, que la matrice a été auditée visuellement sur desktop et mobile, et que toute limite non vérifiable ici est nommée précisément.

Une candidate P7 publiée ne vaut pas validation. Seul un accord explicite de l’utilisateur après recette autorise la préparation puis la fusion de `refonte-pre-lot-2` vers `main`, sans force-push ni réécriture.

## Preuves de la candidate

- construction de production réussie avec la route isolée `/recette/p7` ;
- lint réussi ;
- **171/171 tests automatisés réussis**, dont les contrôles propres à P7, la pile de notifications, la curation du Profil et toute la non-régression P0 à P6 ;
- `git diff --check` sans erreur ;
- audit navigateur desktop des six points d’entrée sans débordement horizontal, avec activation complète `En cours`, restitution du premier geste, réglages superposés, contenus extrêmes, routes directes Recherche et œuvre, ainsi qu’une route d’œuvre absente ;
- aucune erreur applicative relevée dans la console ; les seuls messages observés proviennent de l’extension du navigateur de recette ;
- ce navigateur piloté ne permet pas de changer de viewport : les contrats et tests responsive réussissent, mais la passe visuelle P7 à 390 px et 320 px reste à effectuer dans la recette utilisateur et ne doit pas être confondue avec une preuve navigateur déjà acquise.
