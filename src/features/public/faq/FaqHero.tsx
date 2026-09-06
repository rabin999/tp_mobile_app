import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TpIllustration } from '../../../ui/components/content/TpIllustration';
import { tpAssets } from '../../../ui/theme/tpAssets';
import { tpHalant, tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { faqText } from './faqText';

const heroArtHeight = 190;
const titleBarWidth = 50;
const titleBarHeight = 3;

/**
 * Support hero: cyan bar + label, Halant subhead, then the 190px art.
 */
export function FaqHero() {
  const { colors, text } = useTpTheme();
  const [artWidth, setArtWidth] = useState(0);

  return (
    <View style={styles.hero}>
      <View style={styles.titleRow}>
        <View style={[styles.bar, { backgroundColor: colors.primary }]} />
        <Text
          style={[text.bodyLarge, tpNunito('700'), { color: colors.primary }]}
        >
          {faqText.title}
        </Text>
      </View>
      <Text
        style={[
          styles.subhead,
          tpHalant('700'),
          { color: colors.onSurfaceVariant },
        ]}
      >
        {faqText.subhead}
      </Text>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={faqText.artLabel}
        style={styles.art}
        onLayout={event => setArtWidth(event.nativeEvent.layout.width)}
      >
        {artWidth > 0 ? (
          <TpIllustration
            source={tpAssets.activeSupport}
            width={artWidth}
            height={heroArtHeight}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.xl,
    gap: tpSpacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    width: titleBarWidth,
    height: titleBarHeight,
    marginRight: tpSpacing.lg,
  },
  subhead: {
    fontSize: 28,
    lineHeight: 35,
  },
  art: {
    width: '100%',
    height: heroArtHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
