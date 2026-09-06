import { Platform } from 'react-native';

import {
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
    fontWeight: '600',
  });
  expect(tpHalantFamily('700')).toBe('Halant-Bold');
  Object.defineProperty(Platform, 'OS', {
    configurable: true,
    value: previous,
  });
});
