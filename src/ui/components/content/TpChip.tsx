import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpNunito } from '../../theme/tpFonts';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from './TpGlyph';

export type TpChipVariant = 'filter' | 'assist';

export type TpChipProps = {
  label: string;
  selected?: boolean;
  onSelected?: (selected: boolean) => void;
  onDeleted?: () => void;
  variant?: TpChipVariant;
  enabled?: boolean;
};

/**
 * Product chip wrapping filter / assist styles.
 */
export function TpChip({
  label,
  selected = false,
  onSelected,
  onDeleted,
  variant = 'filter',
  enabled = true,
}: TpChipProps) {
  const { colors, text } = useTpTheme();
  if (variant === 'assist' && onSelected == null) {
    return (
      <View style={[styles.assist, { backgroundColor: colors.surface }]}>
        <Text
          numberOfLines={1}
          style={[
            text.labelSmall,
            {
              fontSize: 11.2,
              ...tpNunito('700'),
              color: colors.textSecondary,
            },
          ]}
        >
          {label}
        </Text>
        {onDeleted != null ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remove ${label}`}
            onPress={onDeleted}
            hitSlop={4}
            style={styles.delete}
          >
            <TpGlyph name="close" size={14} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
    );
  }

  const canPress = enabled && onSelected != null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !canPress }}
      disabled={!canPress}
      onPress={canPress ? () => onSelected!(!selected) : undefined}
      style={[
        styles.filter,
        {
          backgroundColor: selected ? colors.surface : colors.primaryContainer,
          borderColor: selected ? colors.tabIndicatorBorder : 'transparent',
        },
      ]}
    >
      <Text numberOfLines={1} style={text.labelMedium}>
        {label}
      </Text>
      {onDeleted != null ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          onPress={onDeleted}
          hitSlop={4}
          style={styles.delete}
        >
          <TpGlyph name="close" size={14} color={colors.onSurfaceVariant} />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  assist: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: tpCorners.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: tpCorners.pill,
    borderWidth: 1,
    paddingHorizontal: tpSpacing.sm,
    paddingVertical: tpSpacing.xxs,
  },
  delete: {
    marginLeft: 4,
  },
});
