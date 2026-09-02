# Chapter — carte compacte du code

Dernière mise à jour : 1er septembre 2026.

Cette carte sert à ouvrir les bons symboles sans charger les deux grands composants applicatifs en entier.

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

`app/page.tsx` et `app/phase10.tsx` restent volumineux. Une extraction mécanique de composants peut être envisagée lorsqu'une fonctionnalité les modifie réellement, mais elle ne doit pas être menée comme une opération isolée de « réduction de tokens » : le risque de régression dépasserait le gain immédiat. La carte et la recherche par symbole fournissent le gain sûr actuel.

Les données simulées intentionnelles et leur future source persistante sont suivies dans [`PROTOTYPE_DATA_REGISTER.md`](./PROTOTYPE_DATA_REGISTER.md). Une valeur visible ne doit jamais servir d'identifiant de permission ou de navigation.
