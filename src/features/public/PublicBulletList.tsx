import { StyleSheet, Text, View } from 'react-native';

import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';

export type PublicBulletListProps = {
  items: readonly string[];
};

/**
 * Disc list used on About and legal pages.
 */
export function PublicBulletList({ items }: PublicBulletListProps) {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.list}>
      {items.map(item => (
        <View key={item} style={styles.row}>
          <Text style={[text.titleLarge, { color: colors.primary }]}>•</Text>
          <Text
            style={[
              text.bodyLarge,
              styles.copy,
              { color: colors.onSurfaceVariant },
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
  list: {
    gap: tpSpacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tpSpacing.sm,
  },
  copy: {
    flex: 1,
  },
});
