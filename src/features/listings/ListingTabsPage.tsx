import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTpTheme } from '../../ui/theme/tpTheme';
import { ListingCategoryFilters } from './ListingCategoryFilters';
import { ListingTabsHeader, type ListingTabId } from './ListingTabsHeader';

export type ListingTabsPageProps = {
  selectedId: ListingTabId;
  children: ReactNode;
  onSelected?: (id: ListingTabId) => void;
  filterTooltip?: string;
};

/**
 * Keeps listing tabs, search, category filters, and filter mounted while
 * the list body changes.
 */
export function ListingTabsPage({
  selectedId,
  children,
  onSelected,
  filterTooltip,
}: ListingTabsPageProps) {
  const { colors } = useTpTheme();

  return (
    <View style={[styles.page, { backgroundColor: colors.surface }]}>
      <ListingTabsHeader
        selectedId={selectedId}
        onSelected={onSelected}
        filterTooltip={filterTooltip}
      />
      <ListingCategoryFilters />
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
