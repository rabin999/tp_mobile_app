# Design system overview

The React Native app owns light and dark themes plus reusable `Tp*`
components. Product screens are not part of this kit. The Design System
Gallery at launch is a temporary approval surface.

## How to use

1. Wrap the app with `AppThemeProvider` so both palettes exist
   (`appTheme.light` / `appTheme.dark`).
2. Set `mode` to `'system'` (or a later user setting). Components read
   `useTpTheme()`, so they follow the active brightness.
3. Compose screens from `Tp*` components plus props. Do not copy hex
   colors or one-off padding into feature code.
4. Pass all user-visible strings in. Components do not concatenate copy.

```tsx
<TpButton label="Continue" onPress={onContinue} />
```

## What this kit is

Shared, global primitives:

- Tokens (`tpColors`, `tpTypography`, spacing, corners, sizes)
- Actions, inputs, navigation, overlays, feedback, content atoms

## What this kit is not

- Application screens
- Cards (service, booking, professional, CTA, subscription)
- Forms (filter sheets, review composers, file-upload flows, min/max pairs)
- Maps, auth, payments, networking

Those belong in features later, built from these primitives.

## Folder map

- `src/ui/theme/` - tokens and theme
- `src/ui/components/` - `Tp*` components by role
- `src/ui/gallery/` - approval gallery
- `docs/design-system/` - this documentation
