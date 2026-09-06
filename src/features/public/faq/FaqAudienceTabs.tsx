import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSizes } from '../../../ui/theme/tpSizes';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import type { FaqAudience } from './faq';
import { faqText } from './faqText';

const audienceTabs = [
  { id: 'SERVICE_PROVIDER' as const, label: faqText.providerTab },
  { id: 'CUSTOMER' as const, label: faqText.customerTab },
];

export type FaqAudienceTabsProps = {
  selectedId: FaqAudience;
  onSelected: (id: FaqAudience) => void;
};

/**
 * Left-aligned audience links with a cyan underline on the selected tab.
 */
export function FaqAudienceTabs({
  selectedId,
  onSelected,
}: FaqAudienceTabsProps) {
  const { colors, text } = useTpTheme();

  return (
    <View style={[styles.row, { borderBottomColor: colors.outline }]}>
      {audienceTabs.map(tab => {
        const selected = tab.id === selectedId;

        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onSelected(tab.id)}
            style={[
              styles.tab,
              {
                borderBottomColor: selected ? colors.primary : 'transparent',
              },
            ]}
          >
            <Text
              style={[
                text.bodyLarge,
                selected ? tpNunito('700') : tpNunito('400'),
                {
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    marginBottom: tpSpacing.xl,
  },
  tab: {
    marginRight: 15,
    minHeight: tpSizes.minTap,
    justifyContent: 'center',
    paddingBottom: tpSpacing.xs,
    borderBottomWidth: 2,
  },
});
