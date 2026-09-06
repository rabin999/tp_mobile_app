import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { tpSpacing } from '../theme/tpSpacing';
import { useTpTheme } from '../theme/tpTheme';

export type GallerySectionProps = {
  title: string;
  children: ReactNode;
};

/**
 * Titled block used only by the design-system gallery.
 */
export function GallerySection({ title, children }: GallerySectionProps) {
  const { text } = useTpTheme();

  return (
    <View style={styles.section}>
      <Text style={text.headlineSmall}>{title}</Text>
      <View style={styles.gap} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: tpSpacing.xxl,
  },
  gap: {
    height: tpSpacing.sm,
  },
});
