import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

import { tpColors, type TpColorTokens } from './tpColors';
import { tpTextTheme, type TpTextTheme } from './tpTypography';

export type TpThemeMode = 'system' | 'light' | 'dark';

export type TpBrightness = 'light' | 'dark';

export type TpTheme = {
  brightness: TpBrightness;
  colors: TpColorTokens;
  text: TpTextTheme;
};

export type AppThemeControllerValue = {
  mode: TpThemeMode;
  setMode: (mode: TpThemeMode) => void;
  theme: TpTheme;
};

const AppThemeContext = createContext<AppThemeControllerValue | null>(null);

export function resolveBrightness(
  mode: TpThemeMode,
  system: TpBrightness | null | undefined,
): TpBrightness {
  if (mode === 'light' || mode === 'dark') {
    return mode;
  }

  return system === 'dark' ? 'dark' : 'light';
}

export function tpThemeFor(brightness: TpBrightness): TpTheme {
  const colors = brightness === 'dark' ? tpColors.dark : tpColors.light;

  return {
    brightness,
    colors,
    text: tpTextTheme(colors),
  };
}

/**
 * Lets the gallery (and a future settings screen) choose theme mode.
 */
export function AppThemeProvider({
  initialMode = 'system',
  children,
}: {
  initialMode?: TpThemeMode;
  children: ReactNode;
}) {
  const [mode, setMode] = useState<TpThemeMode>(initialMode);
  const system = useColorScheme();
  const value = useMemo<AppThemeControllerValue>(() => {
    const brightness = resolveBrightness(mode, system);

    return {
      mode,
      setMode,
      theme: tpThemeFor(brightness),
    };
  }, [mode, system]);

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppThemeController(): AppThemeControllerValue {
  const value = useContext(AppThemeContext);

  if (value == null) {
    throw new Error('useAppThemeController requires AppThemeProvider');
  }

  return value;
}

/**
 * Product tokens for the active brightness.
 */
export function useTpTheme(): TpTheme {
  return useAppThemeController().theme;
}

export function useOptionalAppThemeController(): AppThemeControllerValue | null {
  return useContext(AppThemeContext);
}
