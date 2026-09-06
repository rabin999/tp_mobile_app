# UI and design system

Load when changing components, screens, theme, tokens, copy, or accessibility.

Values live in code. This file records **why** we diverged from the web source.

| Kind | Where |
| --- | --- |
| Colors, extra tones | `src/ui/theme/tpColors.ts` via `useTpTheme().colors` |
| Space, corners, sizes, elevation, type, fonts, assets | `tpSpacing.ts`, `tpCorners.ts`, `tpSizes.ts`, `tpElevation.ts`, `tpTypography.ts`, `tpFonts.ts`, `tpAssets.ts` |
| Theme | `src/ui/theme/tpTheme.tsx` via `src/app/theme.ts` (`appTheme`) |
| Public components | `src/ui/components/index.ts` |
| Visual history | `docs/design-system/decisions.md` |

If `docs/design-system/components.md` names a component that is not exported, it is not public. `tpFieldError.ts`, `TpTimeoutBar.tsx`, and `TpGlyph.tsx` are unpublished helpers.

## Compose the kit

**Why:** One visual language. Feature hex and one-off padding recreate the web’s scattered CSS.

```tsx
// good
<TpButton label="Continue" onPress={onContinue} />

// bad
<Pressable
  style={{ backgroundColor: '#00C9EA', padding: 12 }}
  onPress={onContinue}>
  <Text>Continue</Text>
</Pressable>
```

New **global** look goes on tokens. New **variants** stay on the component (`TpStatusTone` on `TpStatusBadge`). Do not add a `tpColors` wash used on one row.

Build screens and composite components (cards, headers, forms) by composing `Tp*` primitives. Those composites live in `features/`, not in the kit. Do not restyle a raw React Native primitive in a feature when a `Tp*` component already covers it.

Kit is **primitives only** (product request). Cards, filter sheets, profile sections, carousels, and page layouts belong in `features/`.

## Decisions vs web (keep these)

- **Light and dark.** Web mobile had no dark UI; we still ship both palettes so the app can follow system appearance or a later user setting. Components read `useTpTheme()`, not light-only statics. Cyan stays a **fill**, not body text (`src/app/theme.ts`, `src/app/App.tsx`, `src/ui/theme/tpTheme.tsx`).
- **Semantic color roles.** Web MUI slots were misnamed (`warning.main` was black text, `secondary.main` was white). Roles here mean what they say. Extra tones (success, warning, info, link, cream, muted) live on `TpColorTokens`, not jammed into `secondary`.
- **Halant only for display.** Web mixed heading fonts. `tpTypography` reserves Halant for `displayLarge` / `displayMedium`.
- **Dropped the 14px corner outlier.** Web had a one-off 14px surface radius. Use `tpCorners` — do not reintroduce 14.
- **Buttons: elevation 0, no `textTransform`.** Web theme zeroed button shadows; we kept that. Heights come from `tpSizes`, not a second scale.
- **Snackbar is not `left: 60px`.** That offset was a web leftover. Use `TpSnackbar` / `TpAlert` (top-end overlay using alert chrome — same job as Flutter’s custom snackbar).
- **Merged duplicates on purpose:** search → `TpSearchField`; status → `TpStatusBadge`; empty/404 → `TpStatusPage` (`TpEmptyState` / `TpErrorState` are thin wrappers); images → `TpImage` (not a second fallback widget); confirms → `TpConfirmSheet`; loading → `TpSpinner` (size / color; no separate page loader). Do not add siblings.
- **Social buttons are visual only** until a real OAuth feature exists.

Prefer an enum / union variant over a copy-pasted sibling component:

```tsx
<TpButton
  label="Save"
  variant="outlined"
  loading={saving}
  onPress={saving ? undefined : onSave}
/>
```

Disabled = `onPress` omitted / `undefined`. Loading ignores presses (`TpButton.tsx`).

## Copy

**Why:** Kit components must stay localizable. Pass the full string in. Do not concatenate inside components. Copyright is a pure function on the drawer, not buried layout copy.

Do not add `i18n` until product needs it; still keep copy injectable.

## Feedback components

Use the exported spinner / empty / error / snackbar / sheet / confirm components in `index.ts`. Empty and error screens share `TpStatusPage` — pass `illustration`, copy, and optional `variant`. `TpEmptyState` / `TpErrorState` wrap that page. Loading is `TpSpinner` — pass `size` and `color`; wrap in a centered `View` for a page. Field-level validation uses `errorText` on `TpTextField` (via `tpFieldError` internally).

```tsx
<TpTextField
  label="Email"
  errorText={emailError} // undefined = no error
  onChangeText={onEmailChanged}
/>
```

## Images

**Why:** A 4K listing photo must not decode at intrinsic size. Bundled vs remote are different constructors so invalid URLs never hit the network.

```tsx
<TpImage.Asset source={tpAssets.empty} width={280} semanticLabel="No results" />
<TpImage.Network uri={photoUrl} width={120} height={120} semanticLabel={name} />
```

Gate URLs with `tpImageCache.isUsableUrl`. Pass layout width/height so decode size is bounded.

## Accessibility

Icon-only controls: `accessibilityLabel` + `tpSizes.minTap` (`TpIconButton`). Cyan-on-white body text is not allowed. Text must wrap at ~360dp. Honor font scaling (`allowFontScaling` stays on). Overlays need a close action. Field errors stay on the field — do not replace them with a generic toast.

## Screens

A screen composes kit + feature components. If render cannot be scanned, extract. No API/JSON/business math in render. The gallery is not a styling API — do not copy its scaffolding into features.
