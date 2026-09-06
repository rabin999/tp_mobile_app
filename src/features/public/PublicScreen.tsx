import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';

export type PublicScreenProps = {
  children: ReactNode;
};

/**
 * Scrollable guest page shell. No keyboard inset — these screens have
 * no fields.
 */
export function PublicScreen({ children }: PublicScreenProps) {
  const { colors } = useTpTheme();
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, tpSpacing.xl);

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <ScrollView
        testID="public-scroll"
        style={styles.flex}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export type PublicSectionProps = {
  children: ReactNode;
};

/**
 * One block on a public page — same gutters as Contact.
 */
export function PublicSection({ children }: PublicSectionProps) {
  return <View style={styles.section}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  section: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xl,
    gap: tpSpacing.md,
  },
});
