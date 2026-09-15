# Chapter — fondation de la page œuvre (candidate)

Statut : candidate de recette, non validée et non synchronisée sur GitHub. Base acceptée : Sites 84 / `main`.

## Contrat produit de cette étape

Une œuvre est la porte d'entrée commune, mais trois espaces gardent des responsabilités distinctes : **L’œuvre** donne les faits et le contexte à tous ; **Ma lecture** accueille un premier repère et les traces privées ; **Autour de l’œuvre** montre les critiques et chemins publics. On peut parcourir le premier et le troisième sans compte. Ajouter une œuvre à sa lecture n'est ni une publication ni une possession.

La page publique et la page personnelle suivent cette même grammaire sans exposer le journal ou une note privée aux visiteurs. Une critique est une action publique distincte, après confirmation. Aucun nouveau service, compte réel ou stockage serveur n'est présumé.

## Candidate visible et données

- Navigation interne dans les trois espaces, sur la page normale, pas seulement dans l'atelier.
- Atelier isolé `/recette/oeuvre` : sans compte, À lire, En cours avec marque-page et note, Lu avec critique, relecture. Ses contrôles de fixture n'apparaissent pas dans Chapter ; la route est `noindex`.
- En relecture, la note de la lecture précédente est archivée en `pastNotes` plutôt qu'écrasée ; elle reste visible dans Ma lecture et dans le journal. L'export et l'import du prototype conservent ces archives. Ce n'est pas encore un modèle complet de lectures multiples.

## Recette attendue

Pour chaque situation, vérifier sur desktop et mobile : ordre des trois espaces ; capacité de savoir ce qui est public et privé sans lire des conditions ; évidence du premier geste ; cohérence des libellés et des retours ; absence de rupture lorsqu'on commence ou termine une lecture. En relecture, vérifier que l'ancienne note n'est pas remplacée. Tester aussi une critique publiée séparément d'une note privée.

Preuves automatisées : 179 tests, lint et construction de production réussis. Le contrôle `tsc --noEmit` séparé reste en échec sur des erreurs déjà présentes dans la base (types Cloudflare et quelques lignes inchangées de `app/page.tsx`) ; il n'est pas une preuve de recette navigateur. Aucune validation visuelle utilisateur n'est encore acquise.

## Hors périmètre et prochaine action

Authentification, persistance serveur, permissions réelles, modération, migrations, et historique complet de chaque lecture sont différés. La prochaine action est la recette visuelle explicite de cette candidate. Après accord, synchroniser uniquement ce périmètre sur la branche GitHub dédiée, sans fusion automatique.
