import { tpThemeFor, type TpTheme } from '../ui/theme/tpTheme';

/**
 * Application theme facade.
 *
 * Implementation lives in `src/ui/theme`. Both brightnesses are real
 * palettes.
 */
export const appTheme = {
  light: tpThemeFor('light'),
  dark: tpThemeFor('dark'),
} as const satisfies { light: TpTheme; dark: TpTheme };
