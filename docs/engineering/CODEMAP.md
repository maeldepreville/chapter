# Chapter — carte compacte du code

Dernière mise à jour : 10 septembre 2026.

Cette carte sert à ouvrir les bons symboles sans charger les deux grands composants applicatifs en entier. Elle décrit le socle P0, les tranches P1 à P6 et leur recette complète P7 au-dessus de la base acceptée du lot 1.

| Zone | Source principale | Modules ciblés | Tests principaux |
| --- | --- | --- | --- |
| Contrats P0, coquilles et navigation | `app/foundation/contracts.ts` | `foundation/shell.tsx`, `page.tsx` | `p0-foundation`, `phase11-accessibility`, `phase11-journeys` |
| Tokens et primitives P0 | `app/foundation/tokens.css`, `app/foundation/primitives.tsx` | `foundation/primitives.css`, `modal.tsx`, `cover-frame.tsx` | `p0-foundation`, `phase11-accessibility`, `modal-behavior` |
| Fixtures et sessions P0 | `app/foundation/fixtures.ts` | `foundation/dense-fixtures.ts`, `foundation/session.ts`, `page.tsx`, `journal-model.ts` | `p0-foundation`, `phase11-empty-states`, `phase11-journeys` |
| Premier contact public P1 | `app/p1-public.tsx` | `p1-public.css`, `p1-public-fixtures.ts`, `page.tsx` | `p1-public`, `rendered-html`, `fade-behavior` |
| Illustration éditoriale P1 | `public/editorial/p1-reading-trace.webp` | `assets/editorial/p1-reading-trace-master.png`, `app/p1-public.tsx`, `docs/design/ASSET_SYSTEM.md` | `p1-public` |
| Accent éditorial Recherche | `public/editorial/p2-search-atlas.webp` | `assets/editorial/p2-search-atlas-master.png`, `app/p1-public.tsx`, `p1-public.css`, `docs/design/ASSET_SYSTEM.md` | `p1-public` |
| Routes publiques P1 | `app/decouvrir/page.tsx`, `app/recherche/page.tsx`, `app/oeuvres/[workId]/page.tsx` | `p1-public-fixtures.ts`, `page.tsx` | `p1-public` |
| Premier repère P2 | `PublicWork` dans `app/p1-public.tsx` | `p2-first-marker.css`, `page.tsx`, `foundation/primitives.tsx`, `modal.tsx` | `p2-first-marker`, `p1-public` |
| P3 : Journal, œuvre, Bibliothèque et état personnel | `app/page.tsx` | `app/journal/page.tsx`, `app/bibliotheque/page.tsx`, `foundation/fixtures.ts`, `foundation/dense-fixtures.ts`, `journal-model.ts`, `library-sort.tsx`, `cover-frame.tsx` | `p3-personal-use`, `rendered-html`, `library-sort`, `phase11-empty-states`, `phase11-journeys` |
| Identités et données de profils simulées | `app/prototype-data.ts` | `social-data.ts`, `site-config.ts`, `profile-share.ts` | `hardcoded-data`, `social-profiles`, `profile-layout`, `profile-qr` |
| Découvrir | `DiscoverView` dans `app/phase10.tsx` | `catalogue.ts`, `prototype-data.ts`, `cover-frame.tsx` | `social-controls`, `hardcoded-data`, `phase11-polish`, `phase11-journeys` |
| Profil et carte de lecteur | `ProfileView` dans `app/phase10.tsx` | `prototype-data.ts`, `site-config.ts`, `profile-share.ts`, `photo-processing.ts` | `profile-layout`, `profile-qr`, `hardcoded-data`, `phase11-recovery`, `phase11-polish` |
| Honneurs | `HonorsView` dans `app/phase10.tsx` | `honors-layout.ts`, `fade.tsx`, `fade-behavior.ts` | `honors-layout`, `fade-behavior`, `phase11-accessibility`, `phase11-polish` |
| P4 : profils, listes, critiques et conversations publiques | `PublicListView` / `ProfileView` / `SocialReviews` dans `app/phase10.tsx` | `p1-public.tsx`, `p4-social.css`, `catalogue.ts`, `prototype-data.ts`, `social-data.ts`, `lecteurs/[actorId]/page.tsx`, `listes/[listId]/page.tsx` | `p4-social`, `social-controls`, `social-profiles`, `hardcoded-data`, `phase11-recovery`, `phase11-journeys` |
| P5 : identité, confidentialité, blocage et données | `TrustSettings` dans `app/p5-trust.tsx` | `p5-trust.css`, `page.tsx`, `phase10.tsx`, `reglages/page.tsx`, `public/editorial/p7-data-success.webp` | `p5-trust`, `p4-social`, `social-controls`, `phase11-journeys` |
| P6 : états transversaux et atelier de recette | `app/p6-states.tsx`, `app/recette/p6/p6-state-lab.tsx` | `p6-states.css`, `p6-fixtures.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`, routes dynamiques | `p6-cross-cutting-states`, `phase11-accessibility`, `phase11-empty-states`, `phase11-recovery`, `phase11-polish` |
| P7 : recette complète P0 à P6 | `app/recette/p7/p7-journey-lab.tsx` | `p7-recipe.css`, `foundation/contracts.ts`, atelier P6 et routes publiques directes | `p7-complete-recipe`, puis suite complète |
| Modales et focus | `modal.tsx` | `modal-behavior.ts` | `modal-behavior`, `phase11-accessibility` |
| Retours temporaires empilés | `app/toast-stack.tsx` | `page.tsx`, `globals.css`, `p1-public.tsx` | `toast-stack`, `p3-personal-use`, `phase11-empty-states`, `phase11-journeys` |
| Styles globaux | `app/globals.css` | `foundation/tokens.css`, `foundation/primitives.css` | `p0-foundation`, `rendered-html`, `phase11-accessibility`, `phase11-polish` |
| Styles sociaux/profil/honneurs | `app/phase10.css` | — | `profile-layout`, `profile-qr`, `phase11-polish` |
| Build et hébergement | `vite.config.ts`, `worker/index.ts`, `.openai/hosting.json` | `build/sites-vite-plugin.ts`, `scripts/build-verified.sh` | construction via `npm test` |

## Recherche ciblée

```bash
rg -n "export function|function NomDuComposant|P11-F32" app tests docs
sed -n 'DEBUT,FINp' app/fichier.tsx
node --test tests/fichier-cible.test.mjs
```

`app/page.tsx` et `app/phase10.tsx` restent volumineux. P0 a extrait le catalogue cœur, les états initiaux, les tokens, les primitives et les contrats qui servent plusieurs tranches ; les compositions d'écran restent en place jusqu'à leur jalon vertical.

Les données simulées intentionnelles et leur future source persistante sont suivies dans [`PROTOTYPE_DATA_REGISTER.md`](./PROTOTYPE_DATA_REGISTER.md). Une valeur visible ne doit jamais servir d'identifiant de permission ou de navigation.
