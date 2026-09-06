/**
 * Screen names used by App.tsx to pick what to render.
 */
export const appRouter = {
  gallery: '/',
  contact: '/contact',
  login: '/login',
  about: '/about',
  faq: '/support',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  communityGuidelines: '/community-guidelines',
  services: '/services',
  tasks: '/tasks',
  professionals: '/professionals',
} as const;

export type AppRoute = keyof typeof appRouter;

const drawerLabelByRoute: Record<AppRoute, string> = {
  gallery: 'Home',
  contact: 'Contact',
  login: 'Log in',
  about: 'About Us',
  faq: 'FAQ',
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  communityGuidelines: 'Community Guidelines',
  services: 'Services',
  tasks: 'Tasks',
  professionals: 'Professionals',
};

const routeByDrawerLabel: Partial<Record<string, AppRoute>> = {
  Home: 'gallery',
  Contact: 'contact',
  'About Us': 'about',
  FAQ: 'faq',
  'Privacy Policy': 'privacy',
  'Terms & Conditions': 'terms',
  'Community Guidelines': 'communityGuidelines',
  Services: 'services',
  Tasks: 'tasks',
  Professionals: 'professionals',
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
