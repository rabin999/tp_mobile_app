import type { ViewStyle } from 'react-native';

/**
 * Shadows used by the app bar, bottom nav, and resting surfaces.
 *
 * The web theme set `boxShadow: none` on buttons. Elevation is reserved
 * for sticky headers, the bottom nav, and resting cards.
 */
export const tpElevation = {
  appBar: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  } satisfies ViewStyle,
  pageHeader: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  } satisfies ViewStyle,
  mediaBack: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  } satisfies ViewStyle,
  bottomNav: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  } satisfies ViewStyle,
  card: {
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  } satisfies ViewStyle,
  listingCard: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    elevation: 2,
  } satisfies ViewStyle,
  fab: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  } satisfies ViewStyle,
  menu: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  } satisfies ViewStyle,
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ViewStyle,
} as const;
