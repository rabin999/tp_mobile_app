import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TpImage } from '../../../ui/components/content/TpImage';
import { TpSvgIcon } from '../../../ui/components/content/TpSvgIcon';
import { tpAssets } from '../../../ui/theme/tpAssets';
import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSizes } from '../../../ui/theme/tpSizes';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import type { FaqSection } from './faq';

export type FaqSectionCardProps = {
  section: FaqSection;
  selected: boolean;
  onPress: () => void;
};

/**
 * Selectable FAQ topic card with remote icon or the default help glyph.
 */
export function FaqSectionCard({
  section,
  selected,
  onPress,
}: FaqSectionCardProps) {
  const { colors, text } = useTpTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.card,
        {
          borderColor: selected ? colors.primary : colors.outlineVariant,
          backgroundColor: colors.surface,
        },
      ]}
    >
      {section.iconUrl != null ? (
        <TpImage.Network
          uri={section.iconUrl}
          width={tpSizes.icon}
          height={tpSizes.icon}
          fit="contain"
          semanticLabel={section.title}
          fallback="blank"
        />
      ) : (
        <TpSvgIcon
          source={tpAssets.iconHelpCenter}
          size={tpSizes.icon}
          semanticLabel={section.title}
        />
      )}
      <Text
        style={[
          text.bodyLarge,
          tpNunito('700'),
          styles.title,
          { color: colors.textMuted },
        ]}
      >
        {section.title}
      </Text>
    </Pressable>
  );
}

export type FaqSectionGridProps = {
  sections: readonly FaqSection[];
  selectedSectionId?: number;
  onSelect: (id: number) => void;
};

/**
 * Two-column section picker matching web mobile `col-6` cards.
 */
export function FaqSectionGrid({
  sections,
  selectedSectionId,
  onSelect,
}: FaqSectionGridProps) {
  return (
    <View style={styles.grid}>
      {sections.map(section => (
        <View key={section.id} style={styles.cell}>
          <FaqSectionCard
            section={section}
            selected={section.id === selectedSectionId}
            onPress={() => onSelect(section.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -tpSpacing.xxs,
    marginTop: tpSpacing.sm,
  },
  cell: {
    width: '50%',
    maxWidth: 120,
    padding: tpSpacing.xxs,
  },
  card: {
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    paddingVertical: tpSpacing.sm,
    paddingHorizontal: tpSpacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: tpSpacing.xxs,
  },
  title: {
    textAlign: 'center',
  },
});
