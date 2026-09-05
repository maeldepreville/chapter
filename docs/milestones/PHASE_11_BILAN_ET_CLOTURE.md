# Phase 11 — Bilan et clôture du lot 1

Dernière mise à jour : 2 septembre 2026.

## Statut exact

Le périmètre technique de la phase 11 et du lot 1 est **accepté et clôturé le 2 septembre 2026**. Après la validation ciblée de P11-F35, l'utilisateur a confirmé explicitement la validation du jalon regroupé de la version Sites 31.

P11-F35 est validé individuellement sur la version 31 : les traces correspondent aux critiques d'œuvre et toutes les identités sociales ouvrent leur profil. La confirmation finale porte ensuite sur l'ensemble du jalon ; elle n'est pas déduite de la simple absence d'un nouveau défaut signalé.

La version Sites **31** est le jalon accepté, déployé en accès propriétaire sur `https://chapter-reading.smrdsh.chatgpt.site`. Elle remplace la version 30, conserve les correctifs précédents et ajoute la source commune des critiques ainsi que les profils navigables de Maël, Lina, Théo et Inès. La synchronisation GitHub prévue par `../../AGENTS.md` fait partie de la clôture opérationnelle et doit être vérifiée indépendamment du déploiement Sites.

## Périmètre consolidé

| Ensemble | Résultat candidat |
| --- | --- |
| Superpositions | Cinq fenêtres partagent le dialogue modal, le confinement et la restitution du focus, le verrou de défilement et les fermetures sûres NSV2. |
| Données absentes | Catalogue vide ou incomplet sans substitution trompeuse, écrits conservés, trois états vides du Journal, EH1 éditorial et couverture typographique de repli. |
| Récupération | Import photo ordonné et annulable, erreurs locales récupérables, copie/partage sérialisés, textes longs préservés et contenus sans espaces contenus. |
| Mouvement AM1 | Fondus d'opacité seuls, interruptions continues, réduction du mouvement respectée ; S2 et le retournement QRM1b à environ 440 ms sont préservés. |
| Carte et cadrage | Faces isolées, corps du verso centré et verrouillé à une colonne, correctifs WebKit candidats, gestes confinés à l'image, repère adapté à la taille affichée et continuité pincement → glissement. |
| Responsive et accès | Reflow des titres/actions/formulaires, limites de contrôles renforcées, focus fichier visible, groupe d'étoiles au clavier, destinations courantes et sémantique interactive fidèle. |
| Parcours transversaux | Continuité vérifiée dans la logique racine entre Découvrir, profil, listes et honneurs ; statut, date et traces du Journal ; ajout à lire et annulation. |
| Cohérence sociale et recherche | « Suivre/Suivi » et couleurs partagés sur profil, Découvrir et listes ; effacement natif WebKit remplacé par une action Chapter explicite. |
| Honneurs au pointeur | Le badge, son intervalle et sa fiche forment une zone interactive précise : les actions restent atteignables au survol, puis la fiche se ferme à la sortie de cet ensemble ; clic, clavier et toucher conservent une ouverture persistante. |
| Propriété des listes | Une liste conserve Maël ou Lina depuis son profil d'origine ; auteur, suivi, ouverture du profil et retour utilisent tous cette même identité. La propre liste de Maël n'affiche aucun abonnement à soi-même. |
| Données codées en dur | Les identités, listes et URL partagées ont une source canonique ; permissions et navigation reposent sur des identifiants stables. Les fixtures restantes et leur future source backend sont consignées dans `PROTOTYPE_DATA_REGISTER.md`. |
| Profils et critiques publiques | Une trace de profil et sa critique sur l'œuvre dérivent du même registre. Maël, Lina, Théo et Inès ont un profil navigable depuis leurs critiques, avatars, noms et réponses ; les suivis restent distincts par identité. |

Les choix PDR1B, PFP1, N1b, QR1, QRP1b, QRM1b, HDE1, HV1 et HMT1, les assets validés et la limite de 3 000 caractères restent inchangés. CT1 demeure refusé : aucun bouton directionnel ou de recentrage n'est ajouté au recadrage.

## Preuves automatisées

- Construction de production réussie.
- Lint final sans erreur après constitution du dossier de clôture.
- **101/101 tests automatisés réussis**, dont les parcours racine, les régressions de reprise visuelle, la propriété des listes publiques, la cohérence profil–œuvre, la navigation de toutes les identités sociales et trois contrôles de l'infrastructure documentaire.
- Rendu de la page principale et de la route publique vérifié depuis le worker produit.
- `git diff --check` final sans anomalie.
- Aucune dépendance, ressource graphique ou donnée de catalogue nouvelle dans le diff de phase 11.

Les tests utilisent rendu serveur, fonctions pures et doublures React/DOM ciblées. Ils ne simulent pas WebKit, un vrai tactile, la disposition à 200 %, un lecteur d'écran ni le contraste forcé. Ils ne cochent donc aucune case de recette manuelle.

## Recette décisive utilisée pour l'acceptation

La checklist exhaustive reste [`PHASE_11_IMPLEMENTATION_CHECKLIST.md`](./PHASE_11_IMPLEMENTATION_CHECKLIST.md). L'ordre conseillé pour évaluer le jalon regroupé est :

1. Safari mobile : recto → verso → recto, sans contenu miroir ni mélange ; QR, identité et adresse lisibles.
2. Desktop étroit : 901/900/899 px puis largeur minimale, face demandée toujours visible et composition stable.
3. Recadrage tactile : glissement, pincement, retrait d'un doigt, annulation et perte de capture sans défilement de page ni saut d'image.
4. Responsive et accès : 320 à 900 px, texte/zoom à 200 %, clavier, focus visible, étoiles, contraste forcé et annonces essentielles.
5. Superpositions et AM1 : Tab/Maj+Tab, Échap, retour du focus, protection des écrits, interruptions rapides et réduction du mouvement.
6. Non-régression produit : Journal, Bibliothèque, Découvrir, œuvre, profil, liste, honneurs, suivi, copie/partage et annulations.

## Limites conservées

- Le cadrage horizontal/vertical reste un geste direct ; son zoom conserve le curseur. CT1 ayant été refusé, aucune alternative visible au glissement n'est ajoutée. Cette limite P11-F04 doit rester documentée et ne permet pas de revendiquer une conformité WCAG globale.
- Les données et interactions demeurent locales à la session. Authentification réelle, onboarding, persistance distante, notifications complètes, messagerie, listes collaboratives, classement et moteur de recommandation réel restent hors lot 1.
- Le catalogue de listes actuellement partagé entre les profils est une fixture de démonstration. Le futur backend devra rattacher chaque liste à son propriétaire ; les autres points de remplacement sont détaillés dans [`PROTOTYPE_DATA_REGISTER.md`](../engineering/PROTOTYPE_DATA_REGISTER.md).
- La confidentialité décrite correspond aux vues du prototype, pas à une garantie backend.
- Les avertissements de proxy npm et de classification statique vinext sont des limites d'environnement inchangées ; ils n'ont pas empêché la construction.

## Décision de clôture

La condition est remplie : l'utilisateur valide explicitement le jalon regroupé de la version 31 le 2 septembre 2026. La phase 11 et le lot 1 sont donc terminés. Les cases manuelles non consignées individuellement restent des limites de preuve historiques et ne permettent pas de revendiquer un audit exhaustif d'accessibilité. Le lot 2 devra être cadré séparément avant toute implémentation ; aucune nouvelle publication Sites n'est nécessaire pour cette clôture documentaire.
