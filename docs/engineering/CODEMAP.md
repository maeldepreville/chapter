# Chapter — carte compacte du code

Dernière mise à jour : 5 septembre 2026.

Cette carte sert à ouvrir les bons symboles sans charger les deux grands composants applicatifs en entier. Elle décrit le socle P0 validé et la candidate P1 locale construits au-dessus de la base acceptée du lot 1. Le contrat actif est dans [`P1_PREMIER_CONTACT_PUBLIC.md`](../milestones/P1_PREMIER_CONTACT_PUBLIC.md).

| Zone | Source principale | Modules ciblés | Tests principaux |
| --- | --- | --- | --- |
| Contrats P0, coquilles et navigation | `app/foundation/contracts.ts` | `foundation/shell.tsx`, `page.tsx` | `p0-foundation`, `phase11-accessibility`, `phase11-journeys` |
| Tokens et primitives P0 | `app/foundation/tokens.css`, `app/foundation/primitives.tsx` | `foundation/primitives.css`, `modal.tsx`, `cover-frame.tsx` | `p0-foundation`, `phase11-accessibility`, `modal-behavior` |
| Fixtures et sessions P0 | `app/foundation/fixtures.ts` | `foundation/dense-fixtures.ts`, `foundation/session.ts`, `page.tsx`, `journal-model.ts` | `p0-foundation`, `phase11-empty-states`, `phase11-journeys` |
| Premier contact public P1 | `app/p1-public.tsx` | `p1-public.css`, `p1-public-fixtures.ts`, `page.tsx` | `p1-public`, `rendered-html`, `fade-behavior` |
| Routes publiques P1 | `app/decouvrir/page.tsx`, `app/recherche/page.tsx`, `app/oeuvres/[workId]/page.tsx` | `p1-public-fixtures.ts`, `page.tsx` | `p1-public` |
| Journal, œuvre, Bibliothèque, état racine | `app/page.tsx` | `foundation/fixtures.ts`, `journal-model.ts`, `library-sort.tsx`, `catalogue.ts`, `cover-frame.tsx` | `rendered-html`, `library-sort`, `phase11-empty-states`, `phase11-journeys` |
| Identités et données de profils simulées | `app/prototype-data.ts` | `social-data.ts`, `site-config.ts`, `profile-share.ts` | `hardcoded-data`, `social-profiles`, `profile-layout`, `profile-qr` |
| Découvrir | `DiscoverView` dans `app/phase10.tsx` | `catalogue.ts`, `prototype-data.ts`, `cover-frame.tsx` | `social-controls`, `hardcoded-data`, `phase11-polish`, `phase11-journeys` |
| Profil et carte de lecteur | `ProfileView` dans `app/phase10.tsx` | `prototype-data.ts`, `site-config.ts`, `profile-share.ts`, `photo-processing.ts` | `profile-layout`, `profile-qr`, `hardcoded-data`, `phase11-recovery`, `phase11-polish` |
| Honneurs | `HonorsView` dans `app/phase10.tsx` | `honors-layout.ts`, `fade.tsx`, `fade-behavior.ts` | `honors-layout`, `fade-behavior`, `phase11-accessibility`, `phase11-polish` |
| Listes publiques et conversations | `PublicListView` / `SocialReviews` dans `app/phase10.tsx` | `catalogue.ts`, `prototype-data.ts`, `social-data.ts` | `social-controls`, `social-profiles`, `hardcoded-data`, `phase11-recovery`, `phase11-journeys` |
| Modales et focus | `modal.tsx` | `modal-behavior.ts` | `modal-behavior`, `phase11-accessibility` |
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
