import {
  appDrawerLabelForRoute,
  appRouteFromDrawerLabel,
} from '../../src/app/router';

test('drawer labels map to the wired guest routes', () => {
  expect(appRouteFromDrawerLabel('About Us')).toBe('about');
  expect(appRouteFromDrawerLabel('Privacy Policy')).toBe('privacy');
  expect(appRouteFromDrawerLabel('Terms & Conditions')).toBe('terms');
  expect(appRouteFromDrawerLabel('Community Guidelines')).toBe(
    'communityGuidelines',
  );
  expect(appRouteFromDrawerLabel('FAQ')).toBe('faq');
  expect(appRouteFromDrawerLabel('Services')).toBe('services');
  expect(appRouteFromDrawerLabel('Tasks')).toBe('tasks');
  expect(appRouteFromDrawerLabel('Professionals')).toBe('professionals');
});

test('routes map back to the drawer highlight', () => {
  expect(appDrawerLabelForRoute('about')).toBe('About Us');
  expect(appDrawerLabelForRoute('gallery')).toBe('Home');
  expect(appDrawerLabelForRoute('login')).toBe('Log in');
  expect(appDrawerLabelForRoute('services')).toBe('Services');
  expect(appDrawerLabelForRoute('tasks')).toBe('Tasks');
  expect(appDrawerLabelForRoute('professionals')).toBe('Professionals');
  expect(appRouteFromDrawerLabel('Log in')).toBeUndefined();
});
