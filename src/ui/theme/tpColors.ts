/** Semantic colors for one brightness. */
export type TpColorTokens = {
  primary: string;
  primaryHover: string;
  onPrimary: string;
  primaryContainer: string;
  surface: string;
  surfaceCream: string;
  onSurface: string;
  onSurfaceVariant: string;
  textMuted: string;
  textHint: string;
  outline: string;
  outlineVariant: string;
  divider: string;
  iconMuted: string;
  error: string;
  errorContainer: string;
  success: string;
  successContainer: string;
  warning: string;
  warningContainer: string;
  info: string;
  infoContainer: string;
  link: string;
  verificationForeground: string;
  facebook: string;
  tabIndicatorBorder: string;
  band: string;
  switchTrackOff: string;
  googleButton: string;
  googleButtonLabel: string;
  textSecondary: string;
  onMedia: string;
  onMediaForeground: string;
  inverseSurface: string;
  onInverseSurface: string;
  shadow: string;
};

/**
 * Canonical True Professional palettes.
 *
 * Semantic names reflect actual use. They do **not** copy the misused MUI
 * palette slots from the web `MobileProvider`. Brand cyan is a **fill** in
 * both brightnesses, not running text.
 */
export const tpColors = {
  primary: '#00C9EA',
  primaryHover: '#00B3D0',
  onPrimary: '#FFFFFF',
  error: '#FF3366',
  facebook: '#0866FF',

  light: {
    primary: '#00C9EA',
    primaryHover: '#00B3D0',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E6FCFF',
    surface: '#FFFFFF',
    surfaceCream: '#E8E0D8',
    onSurface: '#000000',
    onSurfaceVariant: '#3C424F',
    textMuted: '#687289',
    textHint: '#ABADBC',
    outline: '#CCCFD8',
    outlineVariant: '#ECECEC',
    divider: 'rgba(0,0,0,0.12)',
    iconMuted: '#929AAC',
    error: '#FF3366',
    errorContainer: '#FFE5EC',
    success: '#30CA83',
    successContainer: '#F2F9F9',
    warning: '#FFA128',
    warningContainer: '#FFEACE',
    info: '#4285F4',
    infoContainer: '#CBDEFF',
    link: '#3988D8',
    verificationForeground: '#6E4511',
    facebook: '#0866FF',
    tabIndicatorBorder: '#D1E7FB',
    band: '#F3F3F3',
    switchTrackOff: '#A8F3FF',
    googleButton: '#F2F2F2',
    googleButtonLabel: '#1F1F1F',
    textSecondary: 'rgba(0,0,0,0.60)',
    onMedia: '#FFFFFF',
    onMediaForeground: '#3C424F',
    inverseSurface: '#3C424F',
    onInverseSurface: '#FFFFFF',
    shadow: '#000000',
  } satisfies TpColorTokens,

  /**
   * Dark palette. Surfaces invert; brand cyan stays a fill.
   *
   * Proposed: web mobile had no dark UI. Contrast still forbids cyan
   * body text. Media-overlay discs stay light so they read on photos.
   */
  dark: {
    primary: '#00C9EA',
    primaryHover: '#00B3D0',
    onPrimary: '#FFFFFF',
    primaryContainer: '#08343C',
    surface: '#12151A',
    surfaceCream: '#3A342E',
    onSurface: '#F5F6F8',
    onSurfaceVariant: '#C5CAD3',
    textMuted: '#A8B0C0',
    textHint: '#8B93A3',
    outline: '#3A4150',
    outlineVariant: '#2A303C',
    divider: 'rgba(255,255,255,0.12)',
    iconMuted: '#8B93A3',
    error: '#FF3366',
    errorContainer: '#3D1520',
    success: '#3DD68F',
    successContainer: '#0F2A22',
    warning: '#FFB347',
    warningContainer: '#3A2710',
    info: '#5B9BFF',
    infoContainer: '#152A4A',
    link: '#5BA3E8',
    verificationForeground: '#E8C48A',
    facebook: '#0866FF',
    tabIndicatorBorder: '#1A4A5C',
    band: '#1C2028',
    switchTrackOff: '#1A4A52',
    googleButton: '#1F1F1F',
    googleButtonLabel: '#E3E3E3',
    textSecondary: 'rgba(255,255,255,0.70)',
    onMedia: '#FFFFFF',
    onMediaForeground: '#3C424F',
    inverseSurface: '#E8EAED',
    onInverseSurface: '#12151A',
    shadow: '#000000',
  } satisfies TpColorTokens,
} as const;
