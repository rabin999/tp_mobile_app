import { Pressable, StyleSheet, Text } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';

export type TpRadioPillProps = {
  label: string;
  selected: boolean;
  onPress?: () => void;
  enabled?: boolean;
};

/**
 * Selectable radio used on signup steppers.
 */
export function TpRadioPill({
  label,
  selected,
  onPress,
  enabled = true,
}: TpRadioPillProps) {
  const { colors, text } = useTpTheme();
  const canPress = enabled && onPress != null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !canPress }}
      disabled={!canPress}
      onPress={canPress ? onPress : undefined}
      style={({ pressed }) => [
        styles.pill,
        {
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.outline,
          opacity: pressed ? 0.72 : canPress ? 1 : 0.4,
        },
      ]}
    >
      <Text
        style={[
          text.labelLarge,
          { color: selected ? colors.onPrimary : colors.onSurface },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: tpSizes.minTap,
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.sm,
    justifyContent: 'center',
  },
});
