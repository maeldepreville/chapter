# Chapter — carte compacte du code

Dernière mise à jour : 5 septembre 2026.

Cette carte sert à ouvrir les bons symboles sans charger les deux grands composants applicatifs en entier.

La carte ci-dessous décrit la base acceptée du lot 1. P0 peut extraire les nouveaux tokens, primitives, coquilles et adaptateurs de fixtures lorsqu'ils servent une tranche testable ; chaque extraction réellement implémentée doit être ajoutée ici dans le même changement. Le contrat cible est dans [`P0_FONDATIONS_PROTOTYPE.md`](../milestones/P0_FONDATIONS_PROTOTYPE.md).

| Zone | Source principale | Modules ciblés | Tests principaux |
| --- | --- | --- | --- |
| Journal, œuvre, Bibliothèque, état racine | `app/page.tsx` | `journal-model.ts`, `library-sort.tsx`, `catalogue.ts`, `cover-frame.tsx` | `rendered-html`, `library-sort`, `phase11-empty-states`, `phase11-journeys` |
| Identités et données de profils simulées | `app/prototype-data.ts` | `social-data.ts`, `site-config.ts`, `profile-share.ts` | `hardcoded-data`, `social-profiles`, `profile-layout`, `profile-qr` |
| Découvrir | `DiscoverView` dans `app/phase10.tsx` | `catalogue.ts`, `prototype-data.ts`, `cover-frame.tsx` | `social-controls`, `hardcoded-data`, `phase11-polish`, `phase11-journeys` |
| Profil et carte de lecteur | `ProfileView` dans `app/phase10.tsx` | `prototype-data.ts`, `site-config.ts`, `profile-share.ts`, `photo-processing.ts` | `profile-layout`, `profile-qr`, `hardcoded-data`, `phase11-recovery`, `phase11-polish` |
| Honneurs | `HonorsView` dans `app/phase10.tsx` | `honors-layout.ts`, `fade.tsx`, `fade-behavior.ts` | `honors-layout`, `fade-behavior`, `phase11-accessibility`, `phase11-polish` |
| Listes publiques et conversations | `PublicListView` / `SocialReviews` dans `app/phase10.tsx` | `catalogue.ts`, `prototype-data.ts`, `social-data.ts` | `social-controls`, `social-profiles`, `hardcoded-data`, `phase11-recovery`, `phase11-journeys` |
| Modales et focus | `modal.tsx` | `modal-behavior.ts` | `modal-behavior`, `phase11-accessibility` |
| Styles globaux | `app/globals.css` | — | `rendered-html`, `phase11-accessibility`, `phase11-polish` |
| Styles sociaux/profil/honneurs | `app/phase10.css` | — | `profile-layout`, `profile-qr`, `phase11-polish` |
| Build et hébergement | `vite.config.ts`, `worker/index.ts`, `.openai/hosting.json` | `build/sites-vite-plugin.ts`, `scripts/build-verified.sh` | construction via `npm test` |

## Recherche ciblée

```bash
rg -n "export function|function NomDuComposant|P11-F32" app tests docs
sed -n 'DEBUT,FINp' app/fichier.tsx
node --test tests/fichier-cible.test.mjs
```

`app/page.tsx` et `app/phase10.tsx` restent volumineux. P0 justifie désormais des extractions orientées vers le nouveau système, mais pas une réécriture en bloc : chaque module extrait doit porter un contrat ou une tranche vérifiable et conserver la base exécutable.

Les données simulées intentionnelles et leur future source persistante sont suivies dans [`PROTOTYPE_DATA_REGISTER.md`](./PROTOTYPE_DATA_REGISTER.md). Une valeur visible ne doit jamais servir d'identifiant de permission ou de navigation.
