# Decisions

Each item is tagged **observed** (in the web mobile source), **inferred**
(from frequency / accessibility), **normalized** (canonical choice), or
**proposed** (not locked by source).

## Theme

- **Observed:** Light theme only. Nunito Sans + Halant. Brand cyan `#00C9EA`.
- **Observed:** MUI palette slots are misnamed (`warning.main` is black text,
  `secondary.main` is white, `success.dark` is Facebook blue).
- **Normalized:** Color roles use semantic meaning. Extra tones live on
  `TpColorTokens` / `useTpTheme().colors`, not jammed into `secondary`.
- **Normalized:** Light and dark palettes. Web had no dark UI; dark surfaces
  are **proposed** so system appearance (and a later user setting) can work.
  Components resolve color from theme, not from light-only statics.
  `appTheme.dark` is a real dark palette.
- **Normalized:** Button `textTransform` is none. Elevation on buttons is 0.
- **Inferred:** Default control height 40dp (source fields are often 40px)
  with an explicit compact 36 variant.
- **Normalized:** Corner rounding 8 / 12 / 16 / fully round. Dropped the
  14px surface outlier.
- **Normalized:** Snackbar is a top-end overlay using `TpAlert` chrome (same
  job as the Flutter custom snackbar). The web `left: 60px` offset is treated
  as a leftover.
- **Proposed:** Tab selected pill border `#D1E7FB` kept as
  `tpColors.tabIndicatorBorder`.

## Contrast

- **Observed:** Cyan-on-white body text would fail WCAG. Source uses cyan
  for fills, not running text.
- **Normalized:** `onPrimary` is white on cyan fills. Body text is black /
  `#3C424F`. Link blue `#3988D8` is for text links.

## Scope (this delivery)

- **Proposed (product request):** Ship **individual shared / global
  primitives only**. Do not add cards, forms, or page-level compositions
  to the kit.
- **Normalized:** Search fields merge into `TpSearchField`. Status pills
  merge into `TpStatusBadge`. Empty / 404 merge into `TpStatusPage`
  (`TpEmptyState` / `TpErrorState` wrap it). Image fallbacks merge into
  `TpImage`. Delete /
  terminate / confirm dialogs merge into `TpConfirmSheet`. Inline and
  page loaders merge into `TpSpinner` (pass `size` and `color`; center
  it for a blocking page).

## Platform (React Native)

- **Normalized:** No Material `ThemeData`. Tokens + `useTpTheme()` are the
  equivalent so light and dark both work.
- **Normalized:** `react-native-svg` is the bundled-SVG path (same job as
  Flutter `flutter_svg`). Kit glyphs that were Material Icons are SVG
  paths in unpublished `TpGlyph` — not a vector-icon package.
- **Normalized:** `@react-native-community/datetimepicker` is the React
  Native date/time picker to use. It is the community-maintained native
  bridge (~1.5M weekly npm downloads, RN 0.87 compatible) to iOS
  `UIDatePicker` and Android `DatePickerDialog`. Do not add
  `react-native-date-picker` (cross-platform iOS lookalike) or
  `react-native-modal-datetime-picker` (a wrapper around this same
  package). A custom calendar matching Flutter’s Today/Cancel chrome
  can wrap this package later if product needs it — not a second picker
  library.
- **Normalized:** No extra image, theme, or navigation packages.
- **Normalized:** React Native has no Flutter `Overlay`. `OverlayHost`
  (`src/ui/overlay/overlayHost.tsx`) is the one process-wide insert/remove
  list for snackbars and sheets. Mount it once from `src/app/App.tsx`.
- **Normalized:** Expo is not used. Stable Expo SDK has not shipped React
  Native 0.87.

## Exclude list

**Instruction / product (not DS):**

- Maps, Places, GPS, location radius UI
- Google / Facebook OAuth (visual buttons only)
- Payment checkout and payment steppers
- Page-only negotiation / booking / time-log / OTP-send dialogs
- Rich text editor (not used by mobile routes)
- Font Awesome as a font; Manrope / Noto Sans; Bootstrap tokens
- The ~275 product page files

**Cards / forms / compositions (not primitives):**

- Media / professional / booking / account / CTA / subscription cards
- Category strips, profile meta/sections, review lists
- Media carousel / media header / breadcrumb
- Filter sheet, review composer, file upload, min/max range fields
- Accordion / FAQ blocks

Those can be assembled later from `TpButton`, `TpTextField`, `TpRating`,
`TpImage`, and sheets.

## Unresolved

- Exact Facebook glyph (source uses a custom icon; a simple “f” mark in
  `TpGlyph` is the stand-in).
- Whether compact 36dp fields should ever become the default on booking
  screens (currently an explicit variant).
- Variable Nunito Sans is instanced into Regular / Medium / SemiBold /
  Bold files; Android vs iOS family-name mapping is handled by
  `tpNunito()` / `tpHalant()`.
