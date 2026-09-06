import { Pressable, StyleSheet } from 'react-native';

import { tpElevation } from '../../theme/tpElevation';
import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';

export type TpBackButtonOnMediaProps = {
  tooltip: string;
  onPress?: () => void;
};

/**
 * Circular back button over media/hero images.
 *
 * The disc stays light in both themes so it still reads on photographs.
 */
export function TpBackButtonOnMedia({
  tooltip,
  onPress,
}: TpBackButtonOnMediaProps) {
  const { colors } = useTpTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tooltip}
      disabled={onPress == null}
      onPress={onPress}
      style={({ pressed }) => [
        styles.disc,
        tpElevation.mediaBack,
        {
          backgroundColor: colors.onMedia,
          opacity: pressed ? 0.72 : onPress == null ? 0.4 : 1,
        },
      ]}
    >
      <TpGlyph
        name="backspace"
        size={tpSizes.iconSm}
        color={colors.onMediaForeground}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  disc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
