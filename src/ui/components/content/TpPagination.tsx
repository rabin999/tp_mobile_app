import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from './TpGlyph';

export type TpPaginationProps = {
  currentPage: number;
  totalPages: number;
  previousLabel: string;
  nextLabel: string;
  onPrevious?: () => void;
  onNext?: () => void;
};

/**
 * Previous / next pagination matching Pagination.mobile.
 */
export function TpPagination({
  currentPage,
  totalPages,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
}: TpPaginationProps) {
  const { colors, text } = useTpTheme();
  if (totalPages <= 1) {
    return null;
  }
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;
  const disabledColor = `${colors.onSurface}80`;
  const labelStyle = [
    text.labelLarge,
    { fontSize: 13, lineHeight: 23, ...tpNunito('400') },
  ];

  return (
    <View style={[styles.row, { backgroundColor: colors.surface }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={previousLabel}
        disabled={!canPrev}
        onPress={canPrev ? onPrevious : undefined}
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: colors.primary,
            opacity: pressed ? 0.72 : 1,
          },
        ]}
      >
        <TpGlyph
          name="doubleArrowLeft"
          size={20}
          color={canPrev ? colors.primary : disabledColor}
        />
        <View style={styles.gap} />
        <Text
          style={[
            ...labelStyle,
            { color: canPrev ? colors.primary : disabledColor },
          ]}
        >
          {previousLabel}
        </Text>
      </Pressable>
      <View style={styles.center}>
        <Text style={[text.labelLarge, { fontSize: 13, ...tpNunito('400') }]}>
          {currentPage} / {totalPages}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={nextLabel}
        disabled={!canNext}
        onPress={canNext ? onNext : undefined}
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: colors.primary,
            opacity: pressed ? 0.72 : 1,
          },
        ]}
      >
        <Text
          style={[
            ...labelStyle,
            { color: canNext ? colors.primary : disabledColor },
          ]}
        >
          {nextLabel}
        </Text>
        <View style={styles.gap} />
        <TpGlyph
          name="doubleArrowRight"
          size={20}
          color={canNext ? colors.primary : disabledColor}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tpSpacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    paddingHorizontal: tpSpacing.md,
    minHeight: tpSizes.control,
  },
  center: {
    minHeight: tpSizes.minTap,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap: {
    width: tpSpacing.xxs,
  },
});
