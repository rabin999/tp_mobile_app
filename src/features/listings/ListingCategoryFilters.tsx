import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TpDivider } from '../../ui/components/content/TpDivider';
import { tpNunito } from '../../ui/theme/tpFonts';
import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';
import { ListingCategoryButton } from './ListingCategoryButton';
import {
  listingCategories,
  listingCategoryRows,
  type ListingCategory,
} from './listingCategories';

export type ListingCategoryFiltersProps = {
  categories?: readonly ListingCategory[];
};

/**
 * Shared Categories heading, View All, and horizontal category buttons.
 */
export function ListingCategoryFilters({
  categories = listingCategories,
}: ListingCategoryFiltersProps) {
  const { colors } = useTpTheme();
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();
  const rows = listingCategoryRows(categories);

  return (
    <View>
      <View style={styles.block}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              tpNunito('700'),
              { color: colors.onSurfaceVariant },
            ]}
          >
            Categories
          </Text>
          <Pressable accessibilityRole="button" onPress={() => undefined}>
            <Text
              style={[styles.viewAll, tpNunito('500'), { color: colors.link }]}
            >
              View All
            </Text>
          </Pressable>
        </View>
        {rows.length === 0 ? (
          <Text
            style={[
              styles.empty,
              tpNunito('400'),
              { color: colors.textSecondary },
            ]}
          >
            No categories found
          </Text>
        ) : (
          rows.map((row, index) => (
            <ScrollView
              key={row.map(item => item.slug).join('-') || String(index)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.row}
            >
              {row.map(category => (
                <ListingCategoryButton
                  key={category.slug}
                  category={category}
                  selected={category.slug === selectedSlug}
                  onPress={() => {
                    setSelectedSlug(current =>
                      current === category.slug ? undefined : category.slug,
                    );
                  }}
                />
              ))}
            </ScrollView>
          ))
        )}
      </View>
      <TpDivider variant="band" />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: tpSpacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: tpSpacing.md,
    paddingHorizontal: tpSpacing.md,
  },
  title: {
    fontSize: 14,
  },
  viewAll: {
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  empty: {
    fontSize: 13,
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.md,
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xs,
  },
});
