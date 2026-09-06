import { lazy, Suspense, useState, type ReactNode } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { ContactScreen } from '../features/contact/ContactScreen';
import { TpSpinner } from '../ui/components/feedback/TpSpinner';
import { TpAppBar } from '../ui/components/navigation/TpAppBar';
import {
  tpGuestNavDrawerSections,
  TpNavDrawer,
} from '../ui/components/navigation/TpNavDrawer';
import { DesignSystemGalleryPage } from '../ui/gallery/DesignSystemGalleryPage';
import { OverlayHost } from '../ui/overlay/overlayHost';
import { AppThemeProvider, useAppThemeController } from '../ui/theme/tpTheme';
import {
  appDrawerLabelForRoute,
  appRouteFromDrawerLabel,
  type AppRoute,
} from './router';

const AboutScreen = lazy(() =>
  import('../features/public/about/AboutScreen').then(module => ({
    default: module.AboutScreen,
  })),
);
const PrivacyScreen = lazy(() =>
  import('../features/public/legal/PrivacyScreen').then(module => ({
    default: module.PrivacyScreen,
  })),
);
const TermsScreen = lazy(() =>
  import('../features/public/legal/TermsScreen').then(module => ({
    default: module.TermsScreen,
  })),
);
const CommunityGuidelinesScreen = lazy(() =>
  import('../features/public/legal/CommunityGuidelinesScreen').then(module => ({
    default: module.CommunityGuidelinesScreen,
  })),
);

/**
 * Mounts theme, overlay, guest chrome, and the active screen.
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
  const insets = useSafeAreaInsets();
  const [route, setRoute] = useState<AppRoute>('gallery');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeLabel = appDrawerLabelForRoute(route);

  const goHome = () => setRoute('gallery');

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.surface }]}>
      <StatusBar
        barStyle={
          theme.brightness === 'dark' ? 'light-content' : 'dark-content'
        }
      />
      <View
        style={{ height: insets.top, backgroundColor: theme.colors.surface }}
      />
      <TpAppBar
        menuTooltip="Open navigation menu"
        homeLabel="True Professional Home"
        onHomePress={goHome}
        onMenuPress={() => setDrawerOpen(true)}
      />
      <TpNavDrawer
        visible={drawerOpen}
        sections={tpGuestNavDrawerSections({ activeLabel })}
        onItemTap={label => {
          setDrawerOpen(false);
          const next = appRouteFromDrawerLabel(label);

          if (next != null) {
            setRoute(next);
          }
        }}
        onClose={() => setDrawerOpen(false)}
        onLogin={() => setDrawerOpen(false)}
        onSignup={() => setDrawerOpen(false)}
      />
      <GuestScreen route={route} />
      <OverlayHost />
    </View>
  );
}

function GuestScreen({ route }: { route: AppRoute }) {
  switch (route) {
    case 'contact':
      return <ContactScreen />;
    case 'about':
      return (
        <LazyPage>
          <AboutScreen />
        </LazyPage>
      );
    case 'privacy':
      return (
        <LazyPage>
          <PrivacyScreen />
        </LazyPage>
      );
    case 'terms':
      return (
        <LazyPage>
          <TermsScreen />
        </LazyPage>
      );
    case 'communityGuidelines':
      return (
        <LazyPage>
          <CommunityGuidelinesScreen />
        </LazyPage>
      );
    default:
      return <DesignSystemGalleryPage />;
  }
}

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}

function PageLoading() {
  const { theme } = useAppThemeController();

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading page"
      style={[styles.loading, { backgroundColor: theme.colors.surface }]}
    >
      <TpSpinner size={32} color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
