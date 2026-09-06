import { StyleSheet, Text, View } from 'react-native';

import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';

export type PublicSectionHeaderProps = {
  title: string;
  subtitle?: string;
};

/**
 * Nunito page or section title used on guest public screens.
 */
export function PublicSectionHeader({
  title,
  subtitle,
}: PublicSectionHeaderProps) {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[text.headlineSmall, { color: colors.onSurfaceVariant }]}>
        {title}
      </Text>
      {subtitle != null ? (
        <Text style={[text.bodyLarge, { color: colors.onSurfaceVariant }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: tpSpacing.xxs,
  },
});
