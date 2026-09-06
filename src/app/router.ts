/**
 * Screen names used by App.tsx to pick what to render.
 */
export const appRouter = {
  gallery: '/',
  contact: '/contact',
  about: '/about',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  communityGuidelines: '/community-guidelines',
} as const;

export type AppRoute = keyof typeof appRouter;

const drawerLabelByRoute: Record<AppRoute, string> = {
  gallery: 'Home',
  contact: 'Contact',
  about: 'About Us',
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  communityGuidelines: 'Community Guidelines',
};

const routeByDrawerLabel: Partial<Record<string, AppRoute>> = {
  Home: 'gallery',
  Contact: 'contact',
  'About Us': 'about',
  'Privacy Policy': 'privacy',
  'Terms & Conditions': 'terms',
  'Community Guidelines': 'communityGuidelines',
};

/**
 * Maps a guest drawer row to a route, or undefined when the row is not
 * wired yet.
 */
export function appRouteFromDrawerLabel(label: string): AppRoute | undefined {
  return routeByDrawerLabel[label];
}

/**
 * Drawer highlight for the screen that is on.
 */
export function appDrawerLabelForRoute(route: AppRoute): string {
  return drawerLabelByRoute[route];
}
