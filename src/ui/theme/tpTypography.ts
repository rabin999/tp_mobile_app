import type { TextStyle } from 'react-native';

import type { TpColorTokens } from './tpColors';
import { tpHalant, tpNunito } from './tpFonts';

export type TpTextTheme = {
  displayLarge: TextStyle;
  displayMedium: TextStyle;
  displaySmall: TextStyle;
  headlineLarge: TextStyle;
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  titleSmall: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  labelSmall: TextStyle;
};

function nunito(options: {
  size: number;
  weight: TextStyle['fontWeight'];
  color: string;
  height?: number;
}): TextStyle {
  return {
    ...tpNunito(options.weight),
    fontSize: options.size,
    color: options.color,
    lineHeight: options.size * (options.height ?? 1.4),
  };
}

function halant(size: number, color: string): TextStyle {
  return {
    ...tpHalant('700'),
    fontSize: size,
    color,
    lineHeight: size * 1.25,
  };
}

/**
 * Canonical text styles for the mobile product.
 *
 * Halant is reserved for display styles. Line heights are normalized
 * (headings 1.25, body 1.4).
 */
export function tpTextTheme(tokens: TpColorTokens): TpTextTheme {
  return {
    displayLarge: halant(34, tokens.onSurface),
    displayMedium: halant(30, tokens.onSurface),
    displaySmall: nunito({
      size: 24,
      weight: '700',
      color: tokens.onSurface,
      height: 1.25,
    }),
    headlineLarge: nunito({
      size: 24,
      weight: '700',
      color: tokens.onSurface,
      height: 1.25,
    }),
    headlineMedium: nunito({
      size: 20,
      weight: '700',
      color: tokens.onSurface,
      height: 1.25,
    }),
    headlineSmall: nunito({
      size: 18,
      weight: '700',
      color: tokens.onSurfaceVariant,
      height: 1.25,
    }),
    titleLarge: nunito({
      size: 16,
      weight: '700',
      color: tokens.onSurfaceVariant,
      height: 1.25,
    }),
    titleMedium: nunito({
      size: 16,
      weight: '600',
      color: tokens.onSurfaceVariant,
    }),
    titleSmall: nunito({
      size: 14,
      weight: '600',
      color: tokens.onSurfaceVariant,
    }),
    bodyLarge: nunito({
      size: 14,
      weight: '400',
      color: tokens.onSurface,
    }),
    bodyMedium: nunito({
      size: 14,
      weight: '600',
      color: tokens.textHint,
    }),
    bodySmall: nunito({
      size: 12,
      weight: '500',
      color: tokens.textMuted,
    }),
    labelLarge: nunito({
      size: 14,
      weight: '600',
      color: tokens.onSurface,
    }),
    labelMedium: nunito({
      size: 12,
      weight: '600',
      color: tokens.onSurfaceVariant,
    }),
    labelSmall: nunito({
      size: 11,
      weight: '600',
      color: tokens.textHint,
    }),
  };
}
