import { Platform } from 'react-native';

/**
 * Process-wide application values that are not feature-specific.
 *
 * Local backend hosts. Android emulator cannot reach the host via
 * `localhost` — that loopback is the emulator itself — so API calls
 * use `10.0.2.2`. iOS simulator can use `localhost`. A physical device
 * needs the host LAN address instead.
 */
const localApiHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const appConfig = {
  /** Display name shown in the task switcher and home app bar. */
  appName: 'True Professional',
  /** Local website (reference only; not called from the app). */
  localWebAppUrl: 'http://localhost:3001',
  /** Local API origin. Path examples: `/_health`, `/swagger-json`. */
  apiBaseUrl: `http://${localApiHost}:4500`,
} as const;
