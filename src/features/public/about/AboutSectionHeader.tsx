import { StyleSheet, Text, View } from 'react-native';

import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';

export type AboutSectionHeaderProps = {
  label: string;
  title: string;
};

/**
 * Cyan 40×3 bar, 16px primary label, and 26px Halant subhead.
 */
export function AboutSectionHeader({ label, title }: AboutSectionHeaderProps) {
  const { colors, text } = useTpTheme();

  return (
    <View>
      <View style={styles.line}>
        <View style={[styles.bar, { backgroundColor: colors.primary }]} />
        <Text
          style={[text.titleLarge, tpNunito('700'), { color: colors.primary }]}
        >
          {label}
        </Text>
      </View>
      <Text style={[text.displayMedium, styles.title]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.sm,
    marginBottom: tpSpacing.xxs,
  },
  bar: {
    width: 40,
    height: 3,
  },
  title: {
    marginBottom: tpSpacing.md,
  },
});
