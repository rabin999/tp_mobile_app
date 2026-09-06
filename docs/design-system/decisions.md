# Decisions

Each item is tagged **observed** (in the web mobile source), **inferred**
(from frequency / accessibility), **kit** (token / platform mapping), or
**proposed** (not locked by source). Do not restyle a page away from web
mobile and call that a kit decision.

## Theme

- **Observed:** Light theme only. Nunito Sans + Halant. Brand cyan `#00C9EA`.
- **Observed:** MUI palette slots are misnamed (`warning.main` is black text,
  `secondary.main` is white, `success.dark` is Facebook blue).
- **Kit:** Color roles use semantic meaning. Extra tones live on
  `TpColorTokens` / `useTpTheme().colors`, not jammed into `secondary`.
- **Kit:** Light and dark palettes. Web had no dark UI; dark surfaces
  are **proposed** so system appearance (and a later user setting) can work.
  Components resolve color from theme, not from light-only statics.
  `appTheme.dark` is a real dark palette.
- **Kit:** Button `textTransform` is none. Elevation on buttons is 0.
- **Inferred (web):** MUI `size="small"` fields were ~40px with 14px type.
- **Kit:** Default control height **44** (between web ~40 and Android’s
  48dp min tap). Compact is **40** (true MUI small). Field values use
  `tpSizes.inputFont` **16** (Material body / common mobile floor). `bodyLarge`
  stays 14 for paragraphs. Compact remains an explicit variant, not the
  form default.
- **Kit:** Corner rounding 8 / 12 / 16 / fully round. Dropped the
  14px surface outlier.
- **Kit:** Transient snackbars (`TpSnackbar`) float at the **bottom**,
  inset, above the home indicator and keyboard - Material 3 / Android
  enterprise. They reuse `TpAlert` chrome. Web `CustomSnackbar` is
  top-right (desktop toast); the `left: 60px` offset is a leftover. Do
  not overlay the app bar. Inline `TpAlert` stays in the page for
  persistent / in-context messages.
- **Proposed:** Tab selected pill border `#D1E7FB` kept as
  `tpColors.tabIndicatorBorder`.

## Contrast

- **Observed:** Source uses cyan for fills, headings, and brand spans where
  the page shows them (login title and “True Professional”). Marketing
  section labels next to the cyan bar are 16px/700 primary (Contact /
  About / Client Stories).
- **Kit:** `onPrimary` is white on cyan fills. Body text is black /
  `#3C424F` unless the page uses primary. Link blue `#3988D8` is for text
  links. Section chrome labels may use `primary`.

## Scope (this delivery)

- **Proposed (product request):** Ship **individual shared / global
  primitives only**. Do not add cards, forms, or page-level compositions
  to the kit.
- **Kit:** Search fields merge into `TpSearchField`. Status pills
  merge into `TpStatusBadge`. Empty / 404 merge into `TpStatusPage`
  (`TpEmptyState` / `TpErrorState` wrap it). Image fallbacks merge into
  `TpImage`. Delete / terminate / confirm dialogs merge into
  `TpConfirmSheet`. Inline and page loaders merge into `TpSpinner`
  (pass `size` and `color`; center it for a blocking page).
- **Kit:** Confirm is a bottom sheet with left-aligned title, body,
  and a footer via `TpFormActions`: text Cancel (`tone="neutral"`) plus
  filled confirm. Destructive confirm uses `TpButton` `tone="danger"`.
  Do not paint a one-off red `Pressable`. A lone form submit uses the
  same primitive, stays centered, and matches web width (`expanded`
  when web is 90% / full).
- **Kit:** Filter count badge sits on the 44 control's top-right
  corner, matching web `serviceFilterHomeAdvanceFilterNumberStyles`
  (offset from the outlined box, not overlapping the glyph).
- **Kit:** Edge-to-edge Android does not resize the window for the
  keyboard. Form pages use `TpKeyboardScrollView` (extra bottom inset +
  scroll the focused field above the keyboard).

## Platform (React Native)

- **Kit:** No Material `ThemeData`. Tokens + `useTpTheme()` are the
  equivalent so light and dark both work.
- **Kit:** `react-native-svg` is the bundled-SVG path (same job as
  Flutter `flutter_svg`). Kit glyphs that were Material Icons are SVG
  paths in unpublished `TpGlyph` - not a vector-icon package.
- **Kit:** `@react-native-community/datetimepicker` is the React
  Native date/time picker to use. It is the community-maintained native
  bridge (~1.5M weekly npm downloads, RN 0.87 compatible) to iOS
  `UIDatePicker` and Android `DatePickerDialog`. Do not add
  `react-native-date-picker` (cross-platform iOS lookalike) or
  `react-native-modal-datetime-picker` (a wrapper around this same
  package). A custom calendar matching Flutter’s Today/Cancel chrome
  can wrap this package later if product needs it - not a second picker
  library.
- **Kit:** No extra image, theme, or navigation packages.
- **Kit:** React Native has no Flutter `Overlay`. `OverlayHost`
  (`src/ui/overlay/overlayHost.tsx`) is the one process-wide insert/remove
  list for snackbars and sheets. Mount it once from `src/app/App.tsx`.
- **Kit:** Expo is not used. Stable Expo SDK has not shipped React
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

## Login

- **Observed:** Web mobile `/login` is a centered auth form: Nunito 20px/700
  primary “Welcome Back.” (`gutterBottom` ~8px), `text.secondary` subhead
  with “True Professional” in primary, right-aligned pill Customer /
  Service Provider tabs (`padding` 6×24, `marginBottom` 24) on
  `primaryContainer`. Container padding 20 + inner `mt` 60. Intro
  `mb={6}` (48px). Fields use InputBase `marginBottom` 8; password group
  `mb={1.5}` (12) with Keep me logged in `my={1}` (8).
  `CustomLoadingButton` margin 12. The lone centered Login button is
  50% width (product). Below Login: `mt={5}`
  (40px), “Don’t have an account yet?” and “Sign Up” in primary with
  `ml={1}` (8px). Outer `mb={10}` (80px). Forgot-password and a Sign Up
  *page* are omitted (product). Paint this with the kit; do not restyle
  it into a different screen chrome.

## Unresolved

- Exact Facebook glyph (source uses a custom icon; a simple “f” mark in
  `TpGlyph` is the stand-in).
- Whether compact 40dp fields should ever become the default on booking
  screens (currently an explicit variant).
- Variable Nunito Sans is instanced into Regular / Medium / SemiBold /
  Bold files; Android vs iOS family-name mapping is handled by
  `tpNunito()` / `tpHalant()`.
