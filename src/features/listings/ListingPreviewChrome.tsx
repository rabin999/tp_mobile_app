import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { TpFilterIconButton } from '../../ui/components/actions/TpFilterIconButton';
import { TpSearchField } from '../../ui/components/inputs/TpSearchField';
import { TpHeaderTabs } from '../../ui/components/navigation/TpHeaderTabs';
import { tpElevation } from '../../ui/theme/tpElevation';
import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';

export const listingPreviewTabs = [
  { id: 'services', label: 'Services' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'professionals', label: 'Professionals' },
];

export type ListingPreviewChromeProps = {
  selectedId: string;
  children: ReactNode;
  onSelected?: (id: string) => void;
  filterTooltip?: string;
};

/**
 * Static Services / Tasks / Professionals header used by listing previews.
 */
export function ListingPreviewChrome({
  selectedId,
  children,
  onSelected,
  filterTooltip = 'Service filter dialog',
}: ListingPreviewChromeProps) {
  const { colors } = useTpTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <View
        style={[
          styles.header,
          tpElevation.pageHeader,
          { backgroundColor: colors.surface },
        ]}
      >
        <TpHeaderTabs
          mode="listing"
          tabs={listingPreviewTabs}
          selectedId={selectedId}
          onSelected={onSelected}
        />
        <View style={styles.searchRow}>
          <View style={styles.searchField}>
            <TpSearchField hint="Search" />
          </View>
          <TpFilterIconButton
            tooltip={filterTooltip}
            onPress={() => undefined}
          />
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
