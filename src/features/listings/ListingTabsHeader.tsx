import { StyleSheet, View } from 'react-native';

import { TpFilterIconButton } from '../../ui/components/actions/TpFilterIconButton';
import { TpSearchField } from '../../ui/components/inputs/TpSearchField';
import { TpHeaderTabs } from '../../ui/components/navigation/TpHeaderTabs';
import { tpElevation } from '../../ui/theme/tpElevation';
import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';

export type ListingTabId = 'services' | 'tasks' | 'professionals';

const listingTabs: { id: ListingTabId; label: string }[] = [
  { id: 'services', label: 'Services' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'professionals', label: 'Professionals' },
];

export type ListingTabsHeaderProps = {
  selectedId: ListingTabId;
  onSelected?: (id: ListingTabId) => void;
  filterTooltip?: string;
};

/**
 * Services, Tasks, and Professionals tabs plus search and filter.
 */
export function ListingTabsHeader({
  selectedId,
  onSelected,
  filterTooltip = 'Service filter dialog',
}: ListingTabsHeaderProps) {
  const { colors } = useTpTheme();

  return (
    <View
      style={[
        styles.header,
        tpElevation.pageHeader,
        { backgroundColor: colors.surface },
      ]}
    >
      <TpHeaderTabs
        mode="listing"
        tabs={listingTabs}
        selectedId={selectedId}
        onSelected={id => onSelected?.(id as ListingTabId)}
      />
      <View style={styles.searchRow}>
        <View style={styles.searchField}>
          <TpSearchField hint="Search" />
        </View>
        <TpFilterIconButton tooltip={filterTooltip} onPress={() => undefined} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 100,
    paddingBottom: tpSpacing.xl,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.md,
    paddingTop: tpSpacing.xl,
    paddingHorizontal: tpSpacing.xl,
  },
  searchField: {
    flex: 1,
  },
});
