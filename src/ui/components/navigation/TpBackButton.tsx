import { Pressable, StyleSheet } from 'react-native';

import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';

export type TpBackButtonProps = {
  tooltip: string;
  onPress?: () => void;
};

/**
 * Back chevron used on in-page headers. Matches BackButton.mobile.
 */
export function TpBackButton({ tooltip, onPress }: TpBackButtonProps) {
  const { colors } = useTpTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tooltip}
      disabled={onPress == null}
      onPress={onPress}
      style={({ pressed }) => [
        styles.hit,
        { opacity: pressed ? 0.72 : onPress == null ? 0.4 : 1 },
      ]}
    >
      <TpGlyph name="backspace" color={colors.onSurfaceVariant} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
