import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { OverlayHost } from '../ui/overlay/overlayHost';
import { DesignSystemGalleryPage } from '../ui/gallery/DesignSystemGalleryPage';
import { AppThemeProvider, useAppThemeController } from '../ui/theme/tpTheme';

/**
 * Application composition root.
 */
export function TrueProfessionalApp() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <AppShell />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

function AppShell() {
  const { theme } = useAppThemeController();
  return (
    <View style={[styles.root, { backgroundColor: theme.colors.surface }]}>
      <StatusBar
        barStyle={
          theme.brightness === 'dark' ? 'light-content' : 'dark-content'
        }
      />
      <DesignSystemGalleryPage />
      <OverlayHost />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
