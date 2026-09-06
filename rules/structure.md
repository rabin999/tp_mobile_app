# Structure, naming, and formatting

Load when creating, moving, or renaming files, or when imports / format / lint / assets change.

Folder tree: `README.md` § Architecture. Do not invent a parallel tree.

## Naming

**Why:** TypeScript and React Native use the language conventions of the runtime. The file name matches the main export.

```ts
// good
export const defaultTimeoutMs = 3000;
export function TpButton(props: TpButtonProps) { … }

// bad - Hungarian / Java constants / Dart file names
export const kDefaultTimeout = 3000;
export const DEFAULT_TIMEOUT = 3000;
```

| Kind | Shape | Why |
| --- | --- | --- |
| Types, components, enums | `PascalCase` | TypeScript + React |
| Members, functions, **constants** | `camelCase` | No `k` prefix, no `SCREAMING_SNAKE` |
| Files for a `Tp*` / `App*` type | `TpButton.tsx`, `AppException.ts` | File matches the main type |
| Token / facade **objects** | `tpColors.ts`, `appConfig.ts` | Value export, not a class |
| Directories | `lowercase` (`components/actions`) | Case-insensitive filesystems |
| Booleans | `is` / `has` when it reads naturally | Readable props |
| Unused params | `_` prefix or omit | TypeScript / ESLint |

**Prefixes we chose:**

- `Tp` = kit **types** (`TpButton`, `TpColorTokens`).
- `tp` = kit **value objects** (`tpColors`, `tpSpacing`, `tpImageCache`).
- `App` = process-wide **types** (`AppException`).
- `app` = process-wide **value facades** (`appConfig`, `appTheme`, `appRouter`, `appLogger`).

Feature components use the feature name (`BookingScreen`), not `Tp`.

Token holders are `as const` objects with named fields - see `src/ui/theme/tpSpacing.ts`. Filename matches the main export; small related enums may colocate (`TpButtonVariant` in `TpButton.tsx`).

Acronyms: `Http`, `Uri` in types; two-letter caps stay caps (`ID`, `UI`) in names that are already acronyms (`TpOtpField`).

## Layout decisions

**Why:** Keep a thin composition root and a public kit surface so features do not scrape internals.

- `index.js` - `AppRegistry` registration only.
- `src/main.tsx` - re-exports the root; keep it small.
- `src/app/` - providers, theme facade, routes. Not a feature.
- `src/core/` - cross-feature technical boundaries, not a junk drawer. File-level jobs: [modularity.md](modularity.md).
- `src/ui/overlay/` - `OverlayHost` (snackbars / sheets). Not a feature; not a public kit export.
- Public kit: `src/ui/components/index.ts` and `src/ui/theme/index.ts`.
- Navigation chrome lives in `navigation/` (exported). **Do not add `chrome/`.** If both exist, the barrel is the API - delete the duplicate.
- Product screens: `src/features/<name>/`, never `ui/gallery/` (temporary approval UI).
- Feature code must not import unpublished helpers (`tpFieldError.ts`, `TpTimeoutBar.tsx`, `TpGlyph.tsx`, `tpKeyboardInset.ts`, `useTpKeyboardMetrics.ts`, `useAliveRef.ts`).

## Imports

**Why:** ESLint + a stable `src/` vs `__tests__/` split.

```ts
import { useState } from 'react';
import { Text, View } from 'react-native';

import { tpSizes } from '../../theme/tpSizes';
import { tpFieldError } from './tpFieldError';
```

- `src/`: relative imports inside the package.
- Tests: import library code from `src/…`; relative for helpers (`__tests__/ui/pumpApp.tsx`).
- Inward only: features → `ui/` + `core/`. Kit must not import `features/`. `core/` must not import UI.
- Import from `react-native` at the package root. Do not deep-import `react-native/Libraries/*` (Strict TypeScript API, RN 0.87).

## Constants and assets

**Why:** One place per kind of value, so screens do not grow private palettes or path strings.

```ts
// good
<TpImage.Asset source={tpAssets.empty} width={280} semanticLabel="No results" />

// bad
<Image source={require('../../../assets/images/empty.png')} />
```

- Process-wide non-secrets → `src/app/config.ts` (`appConfig`).
- Visual values → `src/ui/theme/` (code wins if `docs/design-system/` drifts).
- Paths / `require()` ids / SVG components → `src/ui/theme/tpAssets.ts`.
- Fonts are bundled Nunito Sans + Halant. Link with `npx react-native-asset` after a clone or a new `.ttf`. Do not add a Google Fonts package.
- Secrets never belong here - [security.md](security.md).

## Format and lint

**Why:** Prettier + ESLint (`@react-native`) + `tsc --noEmit` are the machine source of truth (80 columns, 2-space indent, single quotes).

`react-native/no-inline-styles` is **off**: theme colors are resolved at render, so `StyleSheet` cannot hold them. Do not disable any other lint to hide a design problem.

Blank lines: one empty line between functions, classes, exports, and logical groups inside a function (after `if` / `try` / a `const` group). Prettier keeps those lines; ESLint `padding-line-between-statements` inserts them. Do not stack more than one blank line.

```ts
// good - infer obvious locals; annotate public APIs
const theme = useTpTheme();
export function mapProfile(dto: ProfileDto): Profile { … }

// bad
const theme: TpTheme = useTpTheme();
export const mapProfile = (dto: any) => { … };
```

Prefer named function components, `const` locals, `async`/`await` over nested `.then`. No commented-out code. No module-level mutable state except `OverlayHost` ([architecture.md](architecture.md)).

```ts
appLogger.debug('profile: timeout'); // good
console.log(error); // bad - call sites go through src/core/logging/appLogger.ts
```

`TODO` states remaining work and a tracker id when one exists. Do not TODO the change you are making.
