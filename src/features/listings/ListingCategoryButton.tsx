import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TpImage } from '../../ui/components/content/TpImage';
import { tpCorners } from '../../ui/theme/tpCorners';
import { tpElevation } from '../../ui/theme/tpElevation';
import { tpNunito } from '../../ui/theme/tpFonts';
import { tpSizes } from '../../ui/theme/tpSizes';
import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';
import type { ListingCategory } from './listingCategories';

const categoryButtonSize = tpSizes.controlSmall;

export type ListingCategoryButtonProps = {
  category: ListingCategory;
  selected?: boolean;
  onPress?: () => void;
};

/**
 * One category chip: 32px image, title, selected wash.
 */
export function ListingCategoryButton({
  category,
  selected = false,
  onPress,
}: ListingCategoryButtonProps) {
  const { colors } = useTpTheme();

  return (
    <View
      style={[
        styles.wrap,
        selected ? tpElevation.none : tpElevation.listingCard,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={category.title}
        accessibilityState={{ selected }}
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: selected ? colors.outline : colors.surface,
            borderColor: selected ? colors.outline : 'transparent',
          },
        ]}
      >
        <TpImage.Network
          uri={category.imageUri ?? ''}
          width={categoryButtonSize}
          height={categoryButtonSize}
          fit="cover"
          semanticLabel={category.title}
          fallback="letter"
        />
        <Text
          numberOfLines={1}
          style={[styles.label, tpNunito('600'), { color: colors.onSurface }]}
        >
          {category.title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    borderRadius: tpCorners.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: categoryButtonSize,
    height: categoryButtonSize,
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: tpCorners.sm,
  },
  label: {
    fontSize: 14,
    paddingHorizontal: tpSpacing.xs,
  },
});
