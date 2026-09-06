# Tokens

Canonical values live in `src/ui/theme`. The theme object and component
styles consume them. Extra tones (success, warning, info, link, cream,
muted text) live on `TpColorTokens` / `useTpTheme().colors` because React
Native has no Material `ColorScheme` type.

`tpColors.light` is the observed web mobile palette. `tpColors.dark` is
**proposed** (web had no night UI). Brand cyan stays a fill in both.

## Color (light)

| Token | Value | Role |
| --- | --- | --- |
| `primary` | `#00C9EA` | Brand cyan |
| `primaryHover` | `#00B3D0` | Pressed cyan |
| `primaryContainer` | `#E6FCFF` | Chip / tab wash |
| `onPrimary` | `#FFFFFF` | Text on cyan |
| `surface` | `#FFFFFF` | Page / card surface |
| `surfaceCream` | `#E8E0D8` | Image fallback |
| `onSurface` | `#000000` | Body text |
| `onSurfaceVariant` | `#3C424F` | Secondary text |
| `textMuted` | `#687289` | Input value |
| `textHint` | `#ABADBC` | Labels / captions |
| `outline` | `#CCCFD8` | Borders |
| `outlineVariant` | `#ECECEC` | Hairlines |
| `iconMuted` | `#929AAC` | Icons / progress |
| `error` | `#FF3366` | Danger |
| `success` | `#30CA83` | Success |
| `warning` | `#FFA128` | Amber accent |
| `info` | `#4285F4` | Alert info |
| `link` | `#3988D8` | Links |

Dark counterparts live on `tpColors.dark` in code. Token **code** wins if
this table drifts.

**Observed:** MobileProvider assigned black text to `warning.main` and white to
`secondary.main`.

**Normalized:** Color roles use real meaning (`error` is danger, not a text
color). Cyan is never body text.

## Type

Nunito Sans for UI. Halant for `displayLarge` / `displayMedium` only.

Sizes: display 34/30, headlines 24/20/18, title 16, body 14, labels 14/12/11.
Heading line height 1.25, body 1.4.

## Spacing, corners, size

Spacing scale: 4, 8, 12, 16, 20, 24, 32.

Corner rounding (`tpCorners`): 8 inputs, 12 surfaces, 16 sheet top,
fully round pills.

Control height **40** default, **36** compact. App bar 56. Min tap 48.

## Elevation

Buttons have none. App bar, bottom nav, and resting surfaces may use the
named shadow lists on `tpElevation`.

## Fonts and icons

Bundled OFL files under `assets/fonts/`. Nunito Sans is shipped as
static Regular / Medium / SemiBold / Bold files (the Google Fonts
variable file defaults to ExtraLight 200; Android will not interpolate
`fontWeight` on it). Use `tpNunito(weight)` / `tpHalant(weight)` so
family and weight stay paired. Product SVGs under `assets/icons/`
and `assets/images/`. Kit glyphs (Close, Search, Menu, Star) are small SVG
paths in unpublished `TpGlyph` — not a vector-icon package, and not a
public `Tp*` export. Tinted product SVGs use `currentColor` via
`TpSvgIcon` `color` (Flutter `ColorFilter.srcIn`).
