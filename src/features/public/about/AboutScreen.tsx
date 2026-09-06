import { StyleSheet, Text, View } from 'react-native';

import { tpAssets } from '../../../ui/theme/tpAssets';
import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { PublicPageArt } from '../PublicPageArt';
import { PublicScreen } from '../PublicScreen';
import { AboutSectionHeader } from './AboutSectionHeader';
import { AboutValueCard } from './AboutValueCard';
import {
  aboutIntroBody,
  aboutIntroHighlight,
  aboutOurServices,
  aboutValuePropositions,
  aboutValues,
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
    <View style={styles.section}>
      <AboutSectionHeader
        label={aboutText.heroLabel}
        title={aboutText.heroTitle}
      />
      <PublicPageArt
        source={tpAssets.telecommuting}
        label={aboutText.heroArtLabel}
        radius={tpCorners.xs}
      />
    </View>
  );
}

function Introduction() {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.section}>
      <AboutSectionHeader
        label={aboutText.introLabel}
        title={aboutText.introTitle}
      />
      <PublicPageArt
        source={tpAssets.howItStarted}
        label={aboutText.introArtLabel}
        marginBottom={tpSpacing.lg}
      />
      <Text
        style={[
          text.bodyLarge,
          styles.body,
          { color: colors.textMuted, marginBottom: tpSpacing.sm },
        ]}
      >
        {aboutIntroBody}
      </Text>
      <Text
        style={[
          text.bodyLarge,
          tpNunito('700'),
          styles.body,
          styles.highlight,
          {
            color: colors.textMuted,
            borderLeftColor: colors.primary,
          },
        ]}
      >
        {aboutIntroHighlight}
      </Text>
    </View>
  );
}

function Values() {
  return (
    <View style={styles.section}>
      <AboutSectionHeader
        label={aboutText.valuesLabel}
        title={aboutText.valuesTitle}
      />
      {aboutValues.map(value => (
        <AboutValueCard key={value.number} value={value} />
      ))}
    </View>
  );
}

function Offerings() {
  return (
    <View style={[styles.section, styles.offerings]}>
      <AboutSectionHeader
        label={aboutText.offeringsLabel}
        title={aboutText.offeringsTitle}
      />
      <MissionCard
        title={aboutText.valuePropositionsTitle}
        items={aboutValuePropositions}
      />
      <MissionCard title={aboutText.servicesTitle} items={aboutOurServices} />
    </View>
  );
}

function MissionCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  const { colors, text, brightness } = useTpTheme();
  const bulletColor =
    brightness === 'dark' ? colors.primary : colors.switchTrackOff;

  return (
    <View
      style={[
        styles.mission,
        {
          borderColor: colors.outline,
          backgroundColor: colors.surface,
        },
      ]}
    >
      <Text
        style={[
          text.headlineSmall,
          styles.missionTitle,
          { color: colors.onSurfaceVariant },
        ]}
      >
        {title}
      </Text>
      {items.map(item => (
        <View key={item} style={styles.bulletRow}>
          <Text style={[styles.bullet, { color: bulletColor }]}>•</Text>
          <Text
            style={[
              text.bodyLarge,
              styles.bulletCopy,
              { color: colors.textMuted },
            ]}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xl,
  },
  offerings: {
    paddingBottom: 40,
  },
  body: {
    lineHeight: 24,
  },
  highlight: {
    paddingLeft: 10,
    borderLeftWidth: 4,
  },
  mission: {
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    paddingVertical: 28,
    paddingHorizontal: tpSpacing.xl,
    marginBottom: tpSpacing.md,
  },
  missionTitle: {
    marginBottom: tpSpacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: tpSpacing.xs,
    paddingLeft: 4,
  },
  bullet: {
    width: 24,
    fontSize: 29,
    lineHeight: 24,
    marginTop: -4,
  },
  bulletCopy: {
    flex: 1,
    lineHeight: 24,
  },
});
