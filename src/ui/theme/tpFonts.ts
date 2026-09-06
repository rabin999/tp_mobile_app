import { Platform, type TextStyle } from 'react-native';

/**
 * Numeric weights we ship as linked font files.
 *
 * The Google Fonts variable file defaults to ExtraLight (200). Android
 * (and often iOS) will not interpolate `fontWeight` on that file, so we
 * instance Regular / Medium / SemiBold / Bold and pick the file.
 */
export type TpFontNumericWeight = '400' | '500' | '600' | '700';

function numericWeight(
  weight: TextStyle['fontWeight'] | undefined,
): TpFontNumericWeight {
  switch (String(weight ?? '400')) {
    case '500':
    case 'medium':
      return '500';
    case '600':
      return '600';
    case '700':
    case '800':
    case '900':
    case 'bold':
      return '700';
    default:
      return '400';
  }
}

const nunitoAndroid = {
  '400': 'NunitoSans-Regular',
  '500': 'NunitoSans-Medium',
  '600': 'NunitoSans-SemiBold',
  '700': 'NunitoSans-Bold',
} as const;

const halantAndroid = {
  '400': 'Halant-Regular',
  '500': 'Halant-Regular',
  '600': 'Halant-SemiBold',
  '700': 'Halant-Bold',
} as const;

/**
 * Family name for a Nunito Sans weight.
 *
 * iOS uses the shared family + `fontWeight`. Android uses the file name.
 */
export function tpNunitoFamily(weight?: TextStyle['fontWeight']): string {
  if (Platform.OS === 'ios') {
    return 'NunitoSans';
  }

  return nunitoAndroid[numericWeight(weight)];
}

/**
 * Family name for a Halant weight.
 */
export function tpHalantFamily(weight?: TextStyle['fontWeight']): string {
  if (Platform.OS === 'ios') {
    return 'Halant';
  }

  return halantAndroid[numericWeight(weight)];
}

/**
 * Pair `fontFamily` + `fontWeight` so a later weight override still
 * loads the matching file on Android.
 *
 * Android already selects the instanced file by name. Sending a numeric
 * `fontWeight` on that file makes the platform look for a *further*
 * bold of Halant-Bold / NunitoSans-Bold and fall back to the system
 * sans.
 */
export function tpNunito(
  weight: TextStyle['fontWeight'] = '400',
): Pick<TextStyle, 'fontFamily' | 'fontWeight'> {
  const numeric = numericWeight(weight);

  if (Platform.OS === 'android') {
    return { fontFamily: tpNunitoFamily(numeric) };
  }

  return {
    fontFamily: tpNunitoFamily(numeric),
    fontWeight: numeric,
  };
}

export function tpHalant(
  weight: TextStyle['fontWeight'] = '700',
): Pick<TextStyle, 'fontFamily' | 'fontWeight'> {
  const numeric = numericWeight(weight);

  if (Platform.OS === 'android') {
    return { fontFamily: tpHalantFamily(numeric) };
  }

  return {
    fontFamily: tpHalantFamily(numeric),
    fontWeight: numeric,
  };
}

/**
 * Default family names (regular / display bold). Prefer `tpNunito()` /
 * `tpHalant()` when setting a weight.
 */
export const tpFonts = {
  nunitoSans: tpNunitoFamily('400'),
  halant: tpHalantFamily('700'),
} as const;
