import { useState } from 'react';
import { StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { TpIllustration } from '../../../ui/components/content/TpIllustration';
import { tpAssets } from '../../../ui/theme/tpAssets';
import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { PublicBulletList } from '../PublicBulletList';
import { PublicScreen, PublicSection } from '../PublicScreen';
import { PublicSectionHeader } from '../PublicSectionHeader';
import {
  aboutIntroBody,
  aboutIntroHighlight,
  aboutOurServices,
  aboutValuePropositions,
  aboutValues,
  type AboutValue,
} from './aboutContent';
import { aboutText } from './aboutText';

/**
 * Guest About Us page.
 */
export function AboutScreen() {
  return (
    <PublicScreen>
      <Hero />
      <Introduction />
      <Values />
      <Offerings />
    </PublicScreen>
  );
}

function Hero() {
  return (
    <PublicSection>
      <PublicSectionHeader
        title={aboutText.heroLabel}
        subtitle={aboutText.heroTitle}
      />
      <PageArt source={tpAssets.telecommuting} label={aboutText.heroArtLabel} />
    </PublicSection>
  );
}

function Introduction() {
  const { colors, text } = useTpTheme();

  return (
    <PublicSection>
      <PublicSectionHeader
        title={aboutText.introLabel}
        subtitle={aboutText.introTitle}
      />
      <PageArt source={tpAssets.howItStarted} label={aboutText.introArtLabel} />
      <Text style={[text.bodyLarge, { color: colors.onSurfaceVariant }]}>
        {aboutIntroBody}
      </Text>
      <Text
        style={[
          text.bodyLarge,
          tpNunito('700'),
          styles.highlight,
          {
            color: colors.onSurfaceVariant,
            borderLeftColor: colors.primary,
          },
        ]}
      >
        {aboutIntroHighlight}
      </Text>
    </PublicSection>
  );
}

function Values() {
  return (
    <PublicSection>
      <PublicSectionHeader
        title={aboutText.valuesLabel}
        subtitle={aboutText.valuesTitle}
      />
      {aboutValues.map(value => (
        <ValueRow key={value.number} value={value} />
      ))}
    </PublicSection>
  );
}

function Offerings() {
  return (
    <PublicSection>
      <PublicSectionHeader
        title={aboutText.offeringsLabel}
        subtitle={aboutText.offeringsTitle}
      />
      <BulletGroup
        title={aboutText.valuePropositionsTitle}
        items={aboutValuePropositions}
      />
      <BulletGroup title={aboutText.servicesTitle} items={aboutOurServices} />
    </PublicSection>
  );
}

function PageArt({
  source,
  label,
}: {
  source: ImageSourcePropType;
  label: string;
}) {
  const [artWidth, setArtWidth] = useState(0);

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={styles.art}
      onLayout={event => setArtWidth(event.nativeEvent.layout.width)}
    >
      {artWidth > 0 ? (
        <TpIllustration source={source} width={artWidth} height={220} />
      ) : null}
    </View>
  );
}

function ValueRow({ value }: { value: AboutValue }) {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.valueRow}>
      <View
        style={[styles.badge, { backgroundColor: colors.primaryContainer }]}
      >
        <Text style={[text.titleLarge, { color: colors.primary }]}>
          {value.number}
        </Text>
      </View>
      <View style={styles.valueCopy}>
        <Text style={[text.headlineSmall, { color: colors.onSurfaceVariant }]}>
          {value.title}
        </Text>
        <Text style={[text.bodyLarge, { color: colors.onSurfaceVariant }]}>
          {value.description}
        </Text>
      </View>
    </View>
  );
}

function BulletGroup({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  const { colors, text } = useTpTheme();

  return (
    <View
      style={[
        styles.group,
        {
          borderColor: colors.outline,
          backgroundColor: colors.surface,
        },
      ]}
    >
      <Text style={[text.headlineSmall, { color: colors.onSurfaceVariant }]}>
        {title}
      </Text>
      <PublicBulletList items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  art: {
    width: '100%',
    height: 220,
  },
  highlight: {
    paddingLeft: tpSpacing.sm,
    borderLeftWidth: tpSpacing.xxs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tpSpacing.sm,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: tpCorners.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueCopy: {
    flex: 1,
    gap: tpSpacing.xxs,
  },
  group: {
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    padding: tpSpacing.md,
    gap: tpSpacing.sm,
  },
});
