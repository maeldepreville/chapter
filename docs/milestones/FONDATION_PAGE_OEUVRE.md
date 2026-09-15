# Chapter — fondation de la page œuvre (candidate)

Statut : candidate de recette, non validée et non synchronisée sur GitHub. Base acceptée : Sites 84 / `main`.

## Contrat produit de cette étape

Une œuvre est la porte d'entrée commune, mais trois espaces gardent des responsabilités distinctes : **L’œuvre** donne les faits et le contexte à tous ; **Ma lecture** accueille un premier repère et les traces privées ; **Autour de l’œuvre** montre les critiques publiques. On peut parcourir le premier et le troisième sans compte. Ajouter une œuvre à sa lecture n'est ni une publication ni une possession.

La page publique et la page personnelle partagent maintenant la même silhouette, couverture, navigation interne, cadrage des faits et sections ; seules les actions réellement dépendantes du compte diffèrent. Aucune destination principale n'est active sur une page œuvre : le retour conserve la provenance. Une critique est une action publique distincte, après confirmation. Aucun nouveau service, compte réel ou stockage serveur n'est présumé.

## Candidate visible et données

- Navigation interne dans les trois espaces, sur la page normale, pas seulement dans l'atelier.
- Les six états de recette emploient désormais les mêmes identifiants et le même sommaire actif (`about`, `journal`, `reviews`). Le panneau « Ajouter au journal » sans compte partage le conteneur, le calque et l'habillage du panneau personnel : sa carte reste au-dessus du sommaire. Sur une œuvre ouverte directement dans l'atelier, un fragment de section ne réinitialise ni la vue ni la provenance ; revenir à la route initiale restaure l'œuvre, pas Découvrir.
- Atelier isolé `/recette/oeuvre` : sans compte, À lire, En cours avec marque-page et note, Lu avec critique, relecture, plus un cas extrême de nombreuses relectures. Ses contrôles de fixture n'apparaissent pas dans Chapter ; la route est `noindex`.
- Les anciens panneaux « Traces publiques » et « Chemins voisins » ne sont pas dupliqués sous Autour de l’œuvre. Une critique publiée apparaît une seule fois dans la liste sous « Vous », avec son action de modification sur cette carte. Un brouillon importé reste privé et ne montre que son geste explicite de publication.
- En relecture, la note précédente est archivée en `pastNotes` plutôt qu'écrasée ; elle reste visible dans Ma lecture et dans le journal. L'export et l'import du prototype conservent toutes les archives. Le rendu en montre trois au départ, puis cinq supplémentaires à chaque demande, sans ordinal « 2e lecture ». Il n'y a pas de limite de conservation arbitraire côté prototype ; la future persistance devra paginer la consultation sans perdre l'historique. Ce n'est pas encore un modèle complet de lectures multiples.

## Recette attendue

Pour chaque situation, vérifier sur desktop et mobile : même silhouette de page malgré le changement d'état ; ordre des trois espaces ; capacité de savoir ce qui est public et privé sans lire des conditions ; évidence du premier geste ; cohérence des libellés et des retours ; absence de rupture lorsqu'on commence ou termine une lecture. En relecture, vérifier que l'ancienne note n'est pas remplacée et que les notes anciennes s'ouvrent progressivement. Tester aussi une critique publiée séparément d'une note privée, sans doublon visuel.

À vérifier en priorité lors de la recette de cette correction : en « Sans compte », ouvrir « Ajouter au journal » près du sommaire et confirmer que tout le panneau reste visible et cliquable ; suivre chacun des trois liens sans quitter la page œuvre, puis répéter sur la route publique directe et dans les cinq autres situations. Le navigateur n'a pas été relancé pour cette demande de correction : la superposition et l'événement réel de navigation restent des points de recette visuelle, au-delà des tests statiques et de rendu.

Preuves automatisées de cette correction : 182 tests, lint et construction de production réussis ; les nouveaux tests contrôlent le sommaire partagé, la route de recette et les niveaux des panneaux. Contrôle navigateur précédent (avant cette correction) : ouverture et trois sections vues dans les états sans compte, Lu, En cours et relectures nombreuses ; les six états mesurés ont 14 px de séparation entre petit libellé et titre pour les trois sections, sans débordement horizontal au viewport ordinateur (1363 px). Le navigateur disponible ne propose pas de réglage de viewport mobile : le responsive mobile est couvert par les styles et tests, pas par une inspection visuelle navigateur dans cette correction. Le contrôle `tsc --noEmit` séparé reste en échec sur des erreurs déjà présentes dans la base (types Cloudflare et quelques lignes inchangées de `app/page.tsx`). Aucune validation visuelle utilisateur n'est encore acquise.

## Hors périmètre et prochaine action

Authentification, persistance serveur, permissions réelles, modération, migrations, et historique complet de chaque lecture sont différés. La prochaine action est la recette visuelle explicite de cette candidate. Après accord, synchroniser uniquement ce périmètre sur la branche GitHub dédiée, sans fusion automatique.
