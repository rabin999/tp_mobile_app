import { lazy, Suspense, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TpKeyboardScrollView } from '../components/content/TpKeyboardScrollView';
import { TpPageHeader } from '../components/navigation/TpPageHeader';
import { TpGlyph } from '../components/content/TpGlyph';
import { TpSpinner } from '../components/feedback/TpSpinner';
import { tpSpacing } from '../theme/tpSpacing';
import {
  useOptionalAppThemeController,
  useTpTheme,
  type TpThemeMode,
} from '../theme/tpTheme';

const GalleryDemo = lazy(() =>
  import('./galleryDemos').then(module => ({ default: module.GalleryDemo })),
);

const kitItems: { id: string; label: string }[] = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'search', label: 'Search' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'overlays', label: 'Alerts & overlays' },
  { id: 'loading', label: 'Loading' },
  { id: 'empty-error', label: 'Empty & error' },
  { id: 'content', label: 'Content' },
  { id: 'tokens', label: 'Tokens' },
];

/**
 * Temporary approval surface for kit primitives.
 *
 * Index chrome stays light. Demos load only after a row is opened.
 */
export function DesignSystemGalleryPage() {
  const { colors, text } = useTpTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = kitItems.find(item => item.id === selectedId);

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      {selected == null ? (
        <ScrollView>
          <Text style={[text.headlineSmall, styles.indexTitle]}>
            Shared components
          </Text>
          <Text style={[text.bodyMedium, styles.indexBody]}>
            Open one item at a time. The menu opens the right-hand drawer from
            the live web app.
          </Text>
          <AppearanceTile />
          {kitItems.map(item => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              onPress={() => setSelectedId(item.id)}
              style={styles.listRow}
            >
              <Text style={[text.bodyLarge, { flex: 1 }]}>{item.label}</Text>
              <TpGlyph name="chevronRight" color={colors.onSurfaceVariant} />
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.flex}>
          <TpPageHeader
            title={selected.label}
            backTooltip="Back"
            onBack={() => setSelectedId(null)}
          />
          <TpKeyboardScrollView contentContainerStyle={styles.detailPad}>
            <Suspense fallback={<DemoFallback />}>
              <GalleryDemo id={selected.id} />
            </Suspense>
          </TpKeyboardScrollView>
        </View>
      )}
    </View>
  );
}

function DemoFallback() {
  const { colors } = useTpTheme();

  return (
    <View style={styles.demoFallback}>
      <TpSpinner color={colors.primary} />
    </View>
  );
}

function AppearanceTile() {
  const controller = useOptionalAppThemeController();
  const { text, colors } = useTpTheme();

  if (controller == null) {
    return null;
  }

  const label =
    controller.mode === 'system'
      ? 'System'
      : controller.mode === 'light'
      ? 'Light'
      : 'Dark';
  const icon =
    controller.mode === 'system'
      ? 'brightnessAuto'
      : controller.mode === 'light'
      ? 'lightMode'
      : 'darkMode';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => controller.setMode(nextThemeMode(controller.mode))}
      style={styles.appearance}
    >
      <TpGlyph name={icon} color={colors.onSurfaceVariant} />
      <View style={styles.appearanceCopy}>
        <Text style={text.bodyLarge}>Appearance</Text>
        <Text style={text.bodySmall}>{label}</Text>
      </View>
      <TpGlyph name="tune" color={colors.onSurfaceVariant} />
    </Pressable>
  );
}

function nextThemeMode(mode: TpThemeMode): TpThemeMode {
  if (mode === 'system') {
    return 'light';
  }

  if (mode === 'light') {
    return 'dark';
  }

  return 'system';
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  indexTitle: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  indexBody: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  listRow: {
    minHeight: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailPad: {
    padding: tpSpacing.md,
  },
  demoFallback: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appearance: {
    minHeight: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appearanceCopy: {
    flex: 1,
    marginLeft: 16,
  },
});
