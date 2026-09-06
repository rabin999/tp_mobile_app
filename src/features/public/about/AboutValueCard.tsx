import { StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import type { AboutValue } from './aboutContent';

/**
 * Value card with a hanging watermark number, matching web mobile About.
 */
export function AboutValueCard({ value }: { value: AboutValue }) {
  const { colors, text } = useTpTheme();

  return (
    <View
      style={[
        styles.card,
        { borderColor: colors.outline, backgroundColor: colors.surface },
      ]}
    >
      <Text
        style={[
          styles.number,
          tpNunito('700'),
          { color: colors.primary, opacity: 0.22 },
        ]}
      >
        {value.number}
      </Text>
      <Text
        style={[
          text.headlineSmall,
          styles.heading,
          { color: colors.onSurfaceVariant },
        ]}
      >
        {value.title}
      </Text>
      <Text style={[text.bodyLarge, styles.body, { color: colors.textMuted }]}>
        {value.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    paddingTop: 36,
    paddingHorizontal: tpSpacing.xl,
    paddingBottom: tpSpacing.xl,
    overflow: 'visible',
  },
  number: {
    position: 'absolute',
    top: -36,
    left: tpSpacing.lg,
    fontSize: 54,
    lineHeight: 54,
  },
  heading: {
    marginBottom: tpSpacing.xs,
  },
  body: {
    lineHeight: 24,
  },
});
