# Components

Every `Tp*` component is a shared primitive. Callers pass copy and
callbacks. Styling comes from the active theme (light or dark) plus the
component, not from the gallery. If a name is not exported from
`src/ui/components/index.ts`, it is not public.

Unpublished helpers (do not import from features): `tpFieldError.ts`,
`TpTimeoutBar.tsx`, `TpGlyph.tsx`.

## Actions

| Component | Variants / states |
| --- | --- |
| `TpButton` | filled / outlined / text × standard / compact × loading / disabled |
| `TpIconButton` | 48dp target, tooltip + semantics |
| `TpSocialButton` | Google outlined, Facebook filled. Visual only, no OAuth |
| `TpOverflowMenu` | noun-dots trigger |
| `TpFilterIconButton` | optional count badge |
| `TpClearButton` | text-style compact |

## Inputs

| Component | Notes |
| --- | --- |
| `TpTextField` | default / focused / disabled / error, 40 / compact 36 |
| `TpPasswordField` | visibility toggle |
| `TpSearchField` | idle / loading |
| `TpSelect` | controlled dropdown |
| `TpCheckbox` | optional label, 48dp |
| `TpRadioPill` | selected / unselected |
| `TpSwitch` | iOS-styled track |
| `TpOtpField` | digit boxes, no auth |
| `TpDateField` | platform date picker (`showTpDatePicker`) |
| `TpSortToggle` | asc / desc |

## Navigation

`TpLogo`, `TpAppBar`, `TpPageHeader`, `TpBackButton`, `TpBackButtonOnMedia`,
`TpHeaderTabs` (panels / links / listing), `TpNavDrawer`.

## Overlays

`showTpBottomSheet` / `TpBottomSheet` (slide up, 90% max, radius 16 top),
`TpConfirmSheet` (optional destructive), `TpAlert` (dismiss / collapse).
Sheets and snackbars insert through `OverlayHost` (`src/ui/overlay/`) —
not a public kit export.

## Feedback

`TpSnackbar` (top-end overlay using `TpAlert` chrome; not the web
`left: 60px` snackbar), `TpSpinner` (size / color), `TpStatusPage`
(shared empty / error layout; pass `illustration` + copy),
`TpEmptyState`, `TpErrorState` (thin wrappers), `TpDisappearingMessage`.

## Content

`TpAvatar`, `TpImage`, `TpIllustration`, `TpRating`, `TpStatusBadge`,
`TpVerificationBadge`, `TpNotificationBadge`, `TpChip`, `TpDivider`,
`TpPagination`, `TpMenu` / `showTpMenu`, `TpSvgIcon`.

## Not in this kit

Cards, composed forms (filter/review/file upload), profile sections, media
carousels, and breadcrumbs are **product compositions**. Build them later
from the primitives above.
