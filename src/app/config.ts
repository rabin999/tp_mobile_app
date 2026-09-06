import { Platform } from 'react-native';

function localApiHost(): string {
  if (Platform.OS !== 'android') {
    return 'localhost';
  }

  const { Fingerprint, Model } = Platform.constants;
  const haystack = `${Fingerprint} ${Model}`.toLowerCase();
  const emulator =
    haystack.includes('generic') ||
    haystack.includes('emulator') ||
    haystack.includes('sdk_gphone') ||
    haystack.includes('google_sdk');

  // Emulator loopback to the host. A USB phone uses 127.0.0.1 plus
  // `adb reverse tcp:4500 tcp:4500` (see the android npm script).
  return emulator ? '10.0.2.2' : '127.0.0.1';
}

export const appConfig = {
  appName: 'True Professional',
  apiBaseUrl: `http://${localApiHost()}:4500`,
  publicSiteUrl: 'https://true-professional.com',
} as const;
