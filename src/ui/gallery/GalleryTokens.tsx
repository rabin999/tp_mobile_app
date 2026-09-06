import { StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../theme/tpCorners';
import { tpElevation } from '../theme/tpElevation';
import { tpNunito } from '../theme/tpFonts';
import { tpSpacing } from '../theme/tpSpacing';
import { useTpTheme } from '../theme/tpTheme';
import { GallerySection } from './GallerySection';

/**
 * Token boards for the design-system gallery.
 */
export function GalleryTokens() {
  const { colors, text } = useTpTheme();

  return (
    <View>
      <GallerySection title="Colors">
        <View style={styles.wrap}>
          <Swatch name="primary" color={colors.primary} />
          <Swatch name="primaryHover" color={colors.primaryHover} />
          <Swatch name="primaryContainer" color={colors.primaryContainer} />
          <Swatch name="surface" color={colors.surface} />
          <Swatch name="surfaceCream" color={colors.surfaceCream} />
          <Swatch name="onSurface" color={colors.onSurface} />
          <Swatch name="onSurfaceVariant" color={colors.onSurfaceVariant} />
          <Swatch name="textMuted" color={colors.textMuted} />
          <Swatch name="textHint" color={colors.textHint} />
          <Swatch name="outline" color={colors.outline} />
          <Swatch name="error" color={colors.error} />
          <Swatch name="success" color={colors.success} />
          <Swatch name="warning" color={colors.warning} />
          <Swatch name="info" color={colors.info} />
          <Swatch name="link" color={colors.link} />
        </View>
      </GallerySection>
      <GallerySection title="Type">
        <Text style={text.displayMedium}>Halant display</Text>
        <Text style={text.headlineLarge}>Headline large</Text>
        <Text style={text.titleLarge}>Title large</Text>
        <Text style={text.bodyLarge}>Body large - Nunito Sans Regular</Text>
        <Text style={[text.bodyLarge, tpNunito('700')]}>
          Nunito Sans Bold - weights must read heavier than Regular
        </Text>
        <Text style={text.bodyMedium}>Muted body / label</Text>
        <Text style={text.bodyLarge}>
          A very long line that must wrap instead of overflowing the gallery on
          a 360dp phone.
        </Text>
      </GallerySection>
      <GallerySection title="Spacing, corners, elevation">
        <View style={styles.wrap}>
          <SpaceBox size={tpSpacing.xxs} />
          <SpaceBox size={tpSpacing.xs} />
          <SpaceBox size={tpSpacing.sm} />
          <SpaceBox size={tpSpacing.md} />
          <SpaceBox size={tpSpacing.lg} />
          <SpaceBox size={tpSpacing.xl} />
          <SpaceBox size={tpSpacing.xxl} />
        </View>
        <View style={styles.cornerRow}>
          <CornerBox label="input" radius={tpCorners.xs} />
          <View style={styles.cornerGap} />
          <CornerBox label="card" radius={tpCorners.sm} />
          <View style={styles.cornerGap} />
          <CornerBox label="pill" radius={tpCorners.pill} />
        </View>
        <View
          style={[
            styles.elevation,
            tpElevation.appBar,
            { backgroundColor: colors.surface },
          ]}
        />
      </GallerySection>
    </View>
  );
}

function Swatch({ name, color }: { name: string; color: string }) {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.swatch}>
      <View
        style={[
          styles.swatchChip,
          {
            backgroundColor: color,
            borderColor: colors.outlineVariant,
          },
        ]}
      />
      <View style={styles.swatchGap} />
      <Text numberOfLines={1} style={text.labelSmall}>
        {name}
      </Text>
    </View>
  );
}

function SpaceBox({ size }: { size: number }) {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.spaceCol}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: colors.primaryContainer,
        }}
      />
      <Text style={text.labelSmall}>{size}</Text>
    </View>
  );
}

function CornerBox({ label, radius }: { label: string; radius: number }) {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.flex}>
      <View
        style={{
          height: 48,
          borderRadius: radius,
          backgroundColor: colors.primaryContainer,
        }}
      />
      <Text style={text.labelSmall}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tpSpacing.sm,
  },
  swatch: {
    width: 96,
  },
  swatchChip: {
    height: 40,
    borderRadius: tpCorners.xs,
    borderWidth: 1,
  },
  swatchGap: {
    height: tpSpacing.xxs,
  },
  spaceCol: {
    alignItems: 'center',
  },
  cornerRow: {
    flexDirection: 'row',
    marginTop: tpSpacing.md,
  },
  cornerGap: {
    width: tpSpacing.sm,
  },
  flex: {
    flex: 1,
  },
  elevation: {
    height: 40,
    width: '100%',
    marginTop: tpSpacing.md,
  },
});
