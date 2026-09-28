# Chapter — fondation 3 : publication distincte de la mémoire privée

Statut : validée après recette visuelle et synchronisée le 28 septembre 2026 sur `fondation-publication-distincte-2026-09-28`, depuis `fondation-experiences-lecture-2026-09-23`. Elle reste un prototype frontend de session, sans backend.

### Ajustement visuel demandé le 28 septembre

Dans la liste « Autour de l’œuvre », la critique du lecteur courant reçoit une surface très légère teintée de papier et un filet brique fin. Le libellé « Vous » reste le repère principal ; la différence ne prend pas la forme d'un badge ou d'une hiérarchie supérieure. Le bloc divulgâcheur est aéré et aligné avec le texte de critique sur desktop ; sur mobile, il rejoint la marge de lecture commune.

### Retours de recette intégrés

- Les actions de modération sont regroupées dans un menu à trois points, discret et bien ancré à la critique ou à la réponse ouverte dans la conversation.
- « Signaler » ouvre un choix de motifs ; « Autre motif » accepte un texte court avec compteur dynamique. Après confirmation, le résultat est montré dans une fenêtre annulable et reste explicitement local au prototype.
- « Bloquer » confirme l'action dans une fenêtre avec possibilité d'annuler ; les retours apparaissent au niveau de l'interaction, sans bandeau qui décale la liste.
- Les espacements des divulgâcheurs, y compris quand « Autre motif » fait défiler le contenu de la fenêtre, ont été corrigés.

## Contrat de la candidate

- `review` conserve exclusivement un brouillon privé. `publicReview` porte l'objet publié : identifiant stable, œuvre, auteur, texte, évaluation, date, divulgâcheur et lien facultatif vers une expérience. Les anciennes fixtures à `reviewPublished` sont converties une seule fois au chargement ; les nouvelles écritures ne partagent plus ce champ.
- L'éditeur public mène à un aperçu. Celui-ci reprend le texte exact après suppression des espaces de bord, le Nom de lecteur, l'évaluation, l'œuvre, le lieu de publication et l'avertissement de divulgâcheur. Un deuxième geste confirme la publication ou la modification ; le retour à l'éditeur est possible sans publier.
- Le lecteur peut garder un brouillon privé. Les notes de lecture et les brouillons survivent à la modification et au retrait d'une critique. Le retrait et la publication conservent l'annulation temporaire existante.
- Une première lecture personnelle ne demande que l'espace privé ; le Nom de lecteur est demandé au premier geste public. Après une création de compte initiée par une critique, les deux étapes sont réunies. Aucun retour de création de compte ne publie à lui seul.
- Une critique marquée comme divulgâcheur masque son texte sur la page œuvre jusqu'à une action du lecteur ; le Profil n'en affiche pas d'extrait. L'aperçu explique cette portée.
- L'archive garde les publications séparées des enregistrements privés. À l'import, leurs textes deviennent des brouillons privés et ne rejoignent ni le Profil ni les critiques publiques. Une publication déjà présente dans la session demeure intacte.

## Recette et validation

La recette visuelle a été conduite sur le Site de recette. L'utilisateur a validé le rendu et les interactions de publication ainsi que les ajustements de modération et de divulgâcheur. La vérification automatisée couvre les parcours décrits ci-dessous :

1. Ajouter `À lire` sans choisir de Nom de lecteur ; commencer une lecture, écrire une pensée, puis ouvrir une critique. Le Nom de lecteur n'apparaît qu'au geste public.
2. Rédiger une critique et choisir éventuellement un divulgâcheur ; aller à l'aperçu. Comparer caractère par caractère le texte, la signature, l'évaluation et l'œuvre avec ce qui paraît après confirmation.
3. Revenir de l'aperçu, conserver un brouillon, rouvrir l'éditeur puis quitter sans confirmer : vérifier qu'aucune publication n'apparaît.
4. Publier puis modifier et retirer la critique ; vérifier chaque fois la note privée, l'expérience de lecture, le brouillon et l'évaluation privée. Rejouer l'annulation temporaire.
5. Importer une archive avec une critique publique et une note, vérifier que tout arrive en privé ; exporter puis contrôler que `privateRecords` ne contient pas d'objet public et que `publications` conserve son objet distinct.
6. Vérifier l'avertissement de divulgâcheur, le bouton de révélation, l'absence d'extrait sur le Profil et l'accessibilité du retour de l'aperçu au clavier.
7. Tester textes vides, 3 000 caractères, longs mots sans espace, noms longs, absence d'évaluation, fermeture extérieure et affichage mobile sans débordement.

## Preuves et limites

Les tests ciblés couvrent la conversion héritée, l'identité de l'objet public, l'aperçu, la confirmation, l'annulation, la conservation d'une note privée et de l'évaluation personnelle, la révélation des divulgâcheurs et l'entrée personnelle sans nom public. La construction de production et la suite complète (202/202), le lint et `git diff --check` ont réussi avant la publication de recette. Ces preuves automatisées ne remplacent pas une recette visuelle et tactile réelle.

Le prototype demeure un état React de session. Un service backend devra contrôler l'autorisation, l'unicité du Nom de lecteur, l'intégrité de l'aperçu face à une mutation concurrente, l'import privé, le signalement, le blocage, la modération et le recours avant l'ouverture à une vraie communauté. Ces garanties ne sont pas établies par cette candidate frontend.
