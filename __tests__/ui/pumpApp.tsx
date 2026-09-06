import type { ReactElement } from 'react';

import { AppThemeProvider, type TpThemeMode } from '../../src/ui/theme/tpTheme';

export function pumpWithTheme(
  child: ReactElement,
  mode: TpThemeMode = 'light',
) {
  return <AppThemeProvider initialMode={mode}>{child}</AppThemeProvider>;
}
