# Components

Every `Tp*` component is a shared primitive. Callers pass copy and
callbacks. Styling comes from the active theme (light or dark) plus the
component, not from the gallery. If a name is not exported from
`src/ui/components/index.ts`, it is not public.

Unpublished helpers (do not import from features): `tpFieldError.ts`,
`TpTimeoutBar.tsx`, `TpGlyph.tsx`, `tpKeyboardInset.ts`,
`useTpKeyboardMetrics.ts`, `useAliveRef.ts`.

## Actions

| Component | Variants / states |
| --- | --- |
| `TpButton` | filled / outlined / text × standard / compact × primary / danger / neutral × loading / disabled |
| `TpIconButton` | 44 layout, 48dp tap via hitSlop, tooltip + semantics |
| `TpSocialButton` | Google outlined, Facebook filled. Visual only, no OAuth |
| `TpOverflowMenu` | noun-dots trigger |
| `TpFilterIconButton` | optional count badge on the control's top-right corner |
| `TpFormActions` | lone primary centered; Cancel left + primary right |
| `TpClearButton` | text-style compact |

## Inputs

| Component | Notes |
| --- | --- |
| `TpTextField` | default / focused / disabled / error, 44 / compact 40, value 16 |
| `TpPasswordField` | visibility toggle on the trailing edge |
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
`TpConfirmSheet` (header / body / footer; optional destructive confirm),
`TpAlert` (dismiss / collapse).
Sheets and snackbars insert through `OverlayHost` (`src/ui/overlay/`) —
not a public kit export.

## Feedback

`TpSnackbar` (bottom floating overlay using `TpAlert` chrome; not the web
top-right / `left: 60px` toast), `TpSpinner` (size / color), `TpStatusPage`
(shared empty / error layout; pass `illustration` + copy),
`TpEmptyState`, `TpErrorState` (thin wrappers), `TpDisappearingMessage`.

## Content

`TpAvatar`, `TpImage`, `TpIllustration`, `TpRating`, `TpStatusBadge`,
`TpVerificationBadge` (compact 18 / overlay `size`), `TpNotificationBadge`, `TpChip`, `TpDivider`,
`TpPagination`, `TpMenu` / `showTpMenu`, `TpSvgIcon`,
`TpKeyboardScrollView` (keyboard open grows the page and reveals the
focused field).

## Not in this kit

Cards, composed forms (filter/review/file upload), profile sections, media
carousels, and breadcrumbs are **product compositions**. Build them later
from the primitives above.
