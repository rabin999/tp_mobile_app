import { StyleSheet, View } from 'react-native';

import { useTpTheme } from '../../theme/tpTheme';

export type TpDividerVariant = 'line' | 'band';

export type TpDividerProps = {
  variant?: TpDividerVariant;
};

/**
 * Product divider.
 */
export function TpDivider({ variant = 'line' }: TpDividerProps) {
  const { colors } = useTpTheme();

  if (variant === 'band') {
    return <View style={[styles.band, { backgroundColor: colors.band }]} />;
  }

  return <View style={[styles.line, { backgroundColor: colors.outline }]} />;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
  },
  band: {
    height: 6,
    width: '100%',
  },
});
