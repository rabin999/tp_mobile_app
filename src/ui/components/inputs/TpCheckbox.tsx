import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';

export type TpCheckboxProps = {
  value: boolean;
  label?: string;
  onChanged?: (value: boolean) => void;
  enabled?: boolean;
};

/**
 * Checkbox with an optional start label.
 */
export function TpCheckbox({
  value,
  label,
  onChanged,
  enabled = true,
}: TpCheckboxProps) {
  const { colors, text } = useTpTheme();
  const canPress = enabled && onChanged != null;
  const box = (
    <View style={styles.hit}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: value ? colors.primary : 'transparent',
            borderColor: value ? colors.primary : colors.outline,
          },
        ]}
      >
        {value ? (
          <TpGlyph name="check" size={16} color={colors.onPrimary} />
        ) : null}
      </View>
    </View>
  );

  if (label == null) {
    return (
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: value, disabled: !canPress }}
        disabled={!canPress}
        onPress={canPress ? () => onChanged!(!value) : undefined}
      >
        {box}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled: !canPress }}
      disabled={!canPress}
      onPress={canPress ? () => onChanged!(!value) : undefined}
      style={styles.row}
    >
      {box}
      <Text numberOfLines={2} style={[text.bodyLarge, styles.label]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hit: {
    width: tpSizes.minTap,
    height: tpSizes.minTap,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderRadius: tpCorners.xxs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
  },
});
