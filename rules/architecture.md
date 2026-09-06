# Architecture and boundaries

Load when adding features, sharing code, choosing layers, or refactoring.

## Composition root

**Why:** One place constructs the app so features stay replaceable.

```ts
// index.js — registration only
AppRegistry.registerComponent(appName, () => TrueProfessionalApp);

// src/main.tsx — keep this small
export { TrueProfessionalApp } from './app/App';
```

`src/app/` owns providers, theme, and routes (`src/app/App.tsx`). It is not a feature module.

**Why no React Navigation yet:** the app has no deep links or auth gates. The gallery is the only surface and uses local state for detail views. Add a navigation package when those needs appear — not “for later.” See `src/app/router.ts`.

`react-native-safe-area-context` ships with the RN 0.87 template. Keep `SafeAreaProvider` at the root so chrome respects notches; do not wrap every screen again.

**Why `OverlayHost`:** React Native has no Flutter `Overlay.of`. Snackbars and sheets need one process-wide insert/remove list. That list lives in `src/ui/overlay/overlayHost.tsx` and is mounted once from `src/app/App.tsx`. Do not add a second portal, and do not put overlay state in features.

## Layers when they earn their keep

**Why:** A UI / domain / data split is useful only when those jobs exist. Empty `domain/` + `data/` folders are ceremony.

| Layer | Owns | Must not own |
| --- | --- | --- |
| Presentation | Screens, UI state, mapping domain → `Tp*` | HTTP DTOs, hex colors, duplicated validators |
| Domain | Business rules and entities | Views, JSON, React Native primitives |
| Data | HTTP/storage, DTO mapping; native modules when they exist | Component trees |

```tsx
// bad — I/O and parsing inside render
function ProfileHeader() {
  const json = JSON.parse(responseBody);
  return <Text>{json.name}</Text>;
}

// good — component receives already-mapped data
function ProfileHeader({ profile }: { profile: Profile }) { … }
```

`src/core/` is for boundaries many features share (`AppException`, `appLogger`). Feature-specific helpers stay in the feature.

Introduce folders when the work needs them:

```
src/features/booking/screens/BookingScreen.tsx
src/features/booking/components/BookingHeader.tsx
src/features/booking/domain/…    # when rules exist
src/features/booking/data/…      # when I/O exists
```

A screen is a composition. Extract a component when render is no longer one thought.

## What is shared vs local

Where a value belongs is defined in [core.md](core.md) § Put each decision once. Kit never imports `features/`. Features never import another feature’s `data/` or private components. Do not thread API models through views “temporarily.”

## State

**Why:** No app-wide store exists. React state and context are enough until lifetime/scoping actually fails.

UI state (tab, scroll, field values) dies with the screen. Session/entities live behind a narrow interface at the level that matches their lifetime. Re-render the smallest component that must change.

Do not add Redux, Zustand, MobX, or Recoil because they are popular.

## Flutter and web apps

Inspect Flutter / web for **behavior** (states, permissions, validation, calculations, empty/error). Reimplement with this kit. Do not copy `StatelessWidget`, MUI slot names, `left: 60px` snackbars, or page-sized widgets.

## Change existing code

Trace callers. Fix locally unless structure makes a correct fix unsafe — then extract the minimum boundary. Delete proven-dead duplicates (two chrome folders, two sources of truth).

## Dependencies

Add an npm package only if (1) the SDK cannot, (2) we do not already have it, (3) it is maintained on Android **and** iOS, (4) it supports the pinned React Native version.

Earned their keep today:

- `react-native-safe-area-context` — template; notches
- `react-native-svg` — bundled SVGs (same job as Flutter `flutter_svg`)
- `@react-native-community/datetimepicker` — native OS pickers (the community standard)

Images use `TpImage` — not another image library. Do not add packages for theming, thin HTTP wrappers, navigation, state, or “cleaner architecture.” Expo is not used: stable Expo SDK has not shipped React Native 0.87.
