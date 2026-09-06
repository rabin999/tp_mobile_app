# UI and design system

Load when changing components, screens, theme, tokens, copy, or accessibility.

Values live in code. This file is kit composition and platform constraints (keyboard, OverlayHost, dark palette). It is **not** a license to restyle a web-mobile page. Conversion sequence: [web.md](web.md). Which files to open: [index.md](index.md).

| Kind | Where |
| --- | --- |
| Colors, extra tones | `src/ui/theme/tpColors.ts` via `useTpTheme().colors` |
| Space, corners, sizes, elevation, type, fonts, assets | `tpSpacing.ts`, `tpCorners.ts`, `tpSizes.ts`, `tpElevation.ts`, `tpTypography.ts`, `tpFonts.ts`, `tpAssets.ts` |
| Theme | `src/ui/theme/tpTheme.tsx` via `src/app/theme.ts` (`appTheme`) |
| Public components | `src/ui/components/index.ts` |
| Visual history | `docs/design-system/decisions.md` |

If `docs/design-system/components.md` names a component that is not exported, it is not public. `tpFieldError.ts`, `TpTimeoutBar.tsx`, `TpGlyph.tsx`, `tpKeyboardInset.ts`, `useTpKeyboardMetrics.ts`, and `useAliveRef.ts` are unpublished helpers.

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

A `Tp*` file **renders**. Size, decode, URL, and validation policy live in a named helper (`tpImageCache.ts`, `tpFieldError.ts`), not in the middle of the component body. See [modularity.md](modularity.md).

## Decisions vs web (keep these)

- **Light and dark.** Web mobile had no dark UI; we still ship both palettes so the app can follow system appearance or a later user setting. Components read `useTpTheme()`, not light-only statics (`src/app/theme.ts`, `src/app/App.tsx`, `src/ui/theme/tpTheme.tsx`). Use color roles as they appear on the web mobile page: if the page uses primary on a heading or brand span, use `colors.primary`. Marketing section labels next to the 40×3 cyan bar use `colors.primary` at 16px/700 (observed on Contact / About / Client Stories).
- **Semantic color roles.** Web MUI slots were misnamed (`warning.main` was black text, `secondary.main` was white). Roles here mean what they say. Extra tones (success, warning, info, link, cream, muted) live on `TpColorTokens`, not jammed into `secondary`.
- **Halant only for display.** Web mixed heading fonts. `tpTypography` reserves Halant for `displayLarge` / `displayMedium`. `displayMedium` is the observed 26px Halant section subhead (`#3C424F`).
- **Dropped the 14px corner outlier.** Web had a one-off 14px surface radius. Use `tpCorners` - do not reintroduce 14.
- **Buttons: elevation 0, no `textTransform`.** Web theme zeroed button shadows; we kept that. Heights come from `tpSizes`, not a second scale.
- **Controls are 44 / compact 40, field type is 16.** Web MUI small was ~40px / 14px. Material and Android want 16sp input type and a 48dp min tap. Default `tpSizes.control` is 44; compact is 40. Field values use `tpSizes.inputFont`, not `bodyLarge` (14). Do not pass `size="compact"` on public forms unless the screen is dense on purpose.
- **Form actions.** Lone submit is centered (`TpFormActions`). Width matches web mobile (`CustomLoadingButton` at 90% → `expanded`). Cancel + primary is Cancel left, filled primary right - same as web confirm / filter footers. Do not left-align a single submit (`TpButton` `alignSelf: 'flex-start'` will do that inside a column).
- **Filter count badge.** Web pins a 22px count at `top/right: -22` of the icon so it sits on the outlined box corner (`serviceFilterHomeAdvanceFilterNumberStyles`). Pin the badge to the 44 control's top-right corner, not the 24px glyph - otherwise it overlaps the icon.
- **Keyboard on edge-to-edge Android.** `adjustResize` does not shrink the window when `edgeToEdgeEnabled` is on, so the keyboard covers the form and a short page cannot scroll. Form screens use `TpKeyboardScrollView`. Do not add a one-off `KeyboardAvoidingView` in a feature.
- **Snackbar vs inline alert.** Ignore web desktop toasts. On a phone a top-right snackbar overlaps the app bar. Enterprise mobile (Material 3, Gmail/Drive, Microsoft, Firefox Acorn): **transient snackbars float at the bottom**, inset from the edges, above the home indicator and the keyboard; **one at a time**. **Inline `TpAlert`** stays in the page below the app bar (form/page errors, states that must remain). **`TpConfirmSheet`** is for a blocking choice. Do not use a snackbar for field validation - keep `errorText` on the field.
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

Use the exported spinner / empty / error / snackbar / sheet / confirm components in `index.ts`. Empty and error screens share `TpStatusPage` - pass `illustration`, copy, and optional `variant`. `TpEmptyState` / `TpErrorState` wrap that page. Loading is `TpSpinner` - pass `size` and `color`; wrap in a centered `View` for a page. Field-level validation uses `errorText` on `TpTextField` (via `tpFieldError` internally). Inline `TpAlert` is for in-page errors and states. `TpSnackbar.show` is for a short confirmation after an action (bottom overlay).

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

Icon-only controls: `accessibilityLabel` + `tpSizes.minTap` (`TpIconButton`). Follow web-mobile text colors; do not restyle headings or brand spans away from `colors.primary` when the page uses them. Text must wrap at ~360dp. Honor font scaling (`allowFontScaling` stays on). Overlays need a close action. Field errors stay on the field - do not replace them with a generic toast.

## Screens

A screen composes kit + feature components. If render cannot be scanned, extract. No API/JSON/business math in render. The gallery is not a styling API - do not copy its scaffolding into features.

Match the web-mobile page: alignment, grouping, hierarchy, spacing, type, and color as they appear. Paint with `Tp*` and tokens - do not invent a different title style, grouping, or density. Do not use another screen (for example Contact) as a layout template. Product rules: [web.md](web.md). After implement, measure pixel-by-pixel against that page: [audit.md](audit.md).
