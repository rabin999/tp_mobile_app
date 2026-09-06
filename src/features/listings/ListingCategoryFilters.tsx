import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { TpButton } from '../../ui/components/actions/TpButton';
import { TpDivider } from '../../ui/components/content/TpDivider';
import { TpSpinner } from '../../ui/components/feedback/TpSpinner';
import { tpNunito } from '../../ui/theme/tpFonts';
import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';
import { ListingCategoryButton } from './ListingCategoryButton';
import { listingCategoryRows } from './listingCategories';
import { listingCategoryText } from './listingCategoryText';
import {
  loadListingCategories,
  type LoadListingCategories,
} from './loadListingCategories';
import { useListingCategories } from './useListingCategories';

export type ListingCategoryFiltersProps = {
  load?: LoadListingCategories;
};

/**
 * Shared Categories heading and horizontal category buttons from the API.
 */
export function ListingCategoryFilters({
  load = loadListingCategories,
}: ListingCategoryFiltersProps) {
  const { colors } = useTpTheme();
  const { categories, loading, error, retry } = useListingCategories(load);
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();
  const rows = listingCategoryRows(categories);

  return (
    <View>
      <View style={styles.block}>
        <Text
          style={[
            styles.title,
            tpNunito('700'),
            { color: colors.onSurfaceVariant },
          ]}
        >
          {listingCategoryText.title}
        </Text>
        <ListingCategoryBody
          loading={loading}
          error={error}
          rows={rows}
          selectedSlug={selectedSlug}
          onRetry={retry}
          onSelect={setSelectedSlug}
        />
      </View>
      <TpDivider variant="band" />
    </View>
  );
}

function ListingCategoryBody({
  loading,
  error,
  rows,
  selectedSlug,
  onRetry,
  onSelect,
}: {
  loading: boolean;
  error?: string;
  rows: ReturnType<typeof listingCategoryRows>;
  selectedSlug?: string;
  onRetry: () => void;
  onSelect: (slug: string | undefined) => void;
}) {
  const { colors } = useTpTheme();

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={listingCategoryText.loading}
        accessibilityState={{ busy: true }}
        style={styles.status}
      >
        <TpSpinner size={24} color={colors.primary} />
      </View>
    );
  }

  if (error != null) {
    return (
      <View style={styles.error}>
        <Text
          style={[
            styles.errorMessage,
            tpNunito('400'),
            { color: colors.error },
          ]}
        >
          {error}
        </Text>
        <TpButton
          label={listingCategoryText.retry}
          variant="outlined"
          size="compact"
          onPress={onRetry}
        />
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <Text
        style={[styles.empty, tpNunito('400'), { color: colors.textSecondary }]}
      >
        {listingCategoryText.empty}
      </Text>
    );
  }

  return (
    <>
      {rows.map((row, index) => (
        <ScrollView
          key={row.map(item => item.slug).join('-') || String(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.rowScroll}
          contentContainerStyle={styles.row}
        >
          {row.map(category => (
            <ListingCategoryButton
              key={category.slug}
              category={category}
              selected={category.slug === selectedSlug}
              onPress={() => {
                onSelect(
                  selectedSlug === category.slug ? undefined : category.slug,
                );
              }}
            />
          ))}
        </ScrollView>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: tpSpacing.md,
  },
  title: {
    fontSize: 14,
    paddingTop: tpSpacing.md,
    paddingHorizontal: tpSpacing.md,
  },
  empty: {
    fontSize: 13,
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.md,
  },
  status: {
    alignItems: 'center',
    paddingVertical: tpSpacing.md,
  },
  error: {
    gap: tpSpacing.sm,
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.md,
  },
  errorMessage: {
    fontSize: 13,
  },
  rowScroll: {
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.md,
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xs,
    overflow: 'visible',
  },
});
