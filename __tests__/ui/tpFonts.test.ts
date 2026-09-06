import { Platform } from 'react-native';

import {
  tpHalant,
  tpHalantFamily,
  tpNunito,
  tpNunitoFamily,
} from '../../src/ui/theme/tpFonts';

test('android pairs Nunito weight to the instanced file', () => {
  const previous = Platform.OS;

  Object.defineProperty(Platform, 'OS', {
    configurable: true,
    value: 'android',
  });
  expect(tpNunitoFamily('400')).toBe('NunitoSans-Regular');
  expect(tpNunitoFamily('700')).toBe('NunitoSans-Bold');
  expect(tpNunito('600')).toEqual({
    fontFamily: 'NunitoSans-SemiBold',
  });
  expect(tpHalantFamily('700')).toBe('Halant-Bold');
  expect(tpHalant('700')).toEqual({
    fontFamily: 'Halant-Bold',
  });
  Object.defineProperty(Platform, 'OS', {
    configurable: true,
    value: previous,
  });
});
