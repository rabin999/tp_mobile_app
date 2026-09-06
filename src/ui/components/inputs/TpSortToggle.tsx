import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';

export type TpSortDirection = 'asc' | 'desc';

export type TpSortToggleProps = {
  value?: TpSortDirection | null;
  ascLabel: string;
  descLabel: string;
  onChanged?: (value: TpSortDirection | null) => void;
};

/**
 * Asc/desc toggle matching FilterSortingByFieldMobile.
 */
export function TpSortToggle({
  value,
  ascLabel,
  descLabel,
  onChanged,
}: TpSortToggleProps) {
  return (
    <View style={styles.row}>
      <View style={styles.flex}>
        <SortChip
          label={ascLabel}
          selected={value === 'asc'}
          onPress={
            onChanged == null
              ? undefined
              : () => onChanged(value === 'asc' ? null : 'asc')
          }
        />
      </View>
      <View style={styles.gap} />
      <View style={styles.flex}>
        <SortChip
          label={descLabel}
          selected={value === 'desc'}
          onPress={
            onChanged == null
              ? undefined
              : () => onChanged(value === 'desc' ? null : 'desc')
          }
        />
      </View>
    </View>
  );
}

function SortChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress?: () => void;
}) {
  const { colors, text } = useTpTheme();
  const color = selected ? colors.primary : colors.onSurface;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: colors.surface,
          borderColor: color,
          opacity: pressed ? 0.72 : 1,
        },
      ]}
    >
      <Text
        numberOfLines={2}
        style={[
          text.labelLarge,
          { color, lineHeight: 17, textAlign: 'center' },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  gap: {
    width: tpSpacing.md,
  },
  chip: {
    borderWidth: 1,
    borderRadius: tpCorners.pill,
    paddingVertical: tpSpacing.xs,
    paddingHorizontal: tpSpacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
