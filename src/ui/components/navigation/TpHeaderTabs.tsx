import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpElevation } from '../../theme/tpElevation';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpPageHeader } from './TpPageHeader';

export type TpHeaderTabMode = 'panels' | 'links' | 'listing';

export type TpHeaderTab = {
  id: string;
  label: string;
};

export type TpHeaderTabsProps = {
  tabs: TpHeaderTab[];
  selectedId: string;
  title?: string;
  mode?: TpHeaderTabMode;
  onSelected?: (id: string) => void;
  backTooltip?: string;
  onBack?: () => void;
  showBack?: boolean;
};

/**
 * Header plus text tabs matching the mobile web headers.
 */
export function TpHeaderTabs({
  tabs,
  selectedId,
  title,
  mode = 'panels',
  onSelected,
  backTooltip,
  onBack,
  showBack = true,
}: TpHeaderTabsProps) {
  const { colors } = useTpTheme();

  if (mode === 'listing') {
    return (
      <ListingTabs
        tabs={tabs}
        selectedId={selectedId}
        onSelected={onSelected}
      />
    );
  }

  return (
    <View
      style={[
        styles.panels,
        tpElevation.pageHeader,
        { backgroundColor: colors.surface },
      ]}
    >
      {title != null ? (
        <TpPageHeader
          title={title}
          backTooltip={backTooltip}
          onBack={onBack}
          showBack={showBack}
          sticky={false}
        />
      ) : null}
      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <View key={tab.id} style={styles.flex}>
            <TextTab
              label={tab.label}
              selected={tab.id === selectedId}
              onPress={() => onSelected?.(tab.id)}
              linkStyle={mode === 'links'}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

function ListingTabs({
  tabs,
  selectedId,
  onSelected,
}: {
  tabs: TpHeaderTab[];
  selectedId: string;
  onSelected?: (id: string) => void;
}) {
  const { colors, text } = useTpTheme();

  return (
    <View style={[styles.listing, { borderBottomColor: colors.outline }]}>
      {tabs.map(tab => {
        const selected = tab.id === selectedId;

        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onSelected?.(tab.id)}
            style={[
              styles.listingTab,
              {
                backgroundColor: selected
                  ? `${colors.primary}08`
                  : 'transparent',
                borderBottomColor: selected ? colors.primary : 'transparent',
              },
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                text.labelLarge,
                {
                  fontSize: 13,
                  lineHeight: 14,
                  color: selected ? colors.primary : colors.textMuted,
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TextTab({
  label,
  selected,
  onPress,
  linkStyle,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  linkStyle: boolean;
}) {
  const { colors, text } = useTpTheme();
  const color = linkStyle
    ? selected
      ? colors.primary
      : colors.textSecondary
    : selected
    ? colors.primary
    : colors.onSurfaceVariant;

  return (
    <Pressable accessibilityRole="tab" onPress={onPress} style={styles.textTab}>
      <Text
        numberOfLines={1}
        style={[
          text.titleMedium,
          { ...tpNunito('600'), color, textAlign: 'center' },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panels: {
    borderBottomLeftRadius: tpCorners.sm,
    borderBottomRightRadius: tpCorners.sm,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: tpSpacing.md,
    paddingBottom: tpSpacing.md,
  },
  flex: {
    flex: 1,
  },
  listing: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  listingTab: {
    flex: 1,
    minHeight: tpSizes.control,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  textTab: {
    paddingVertical: tpSpacing.sm,
  },
});
