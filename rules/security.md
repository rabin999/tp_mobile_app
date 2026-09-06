# Security and data handling

Load when touching auth, storage, logging, user input, API payloads, or dependencies.

## Secrets and logs

**Why:** The client is hostile territory. Anything in source, logs, or screenshots can leave the device.

Never commit keys, tokens, passwords, keystores, or real `.env` files. Never put secrets in `appConfig`, TypeScript, or README.

```ts
appLogger.debug('session: refresh failed'); // good
appLogger.debug(`token=${accessToken}`); // bad
```

Do not log passwords, OTP, Authorization headers, payment details, government IDs, or raw bodies with PII. `appLogger` (`src/core/logging/appLogger.ts`) is operational messages only.

Debug signing in `android/app/build.gradle` is a template default — do not ship release with it, and do not paste production keystore passwords into the repo.

## Auth and storage

UI hiding is not authorization. 401/403 are first-class states ([api.md](api.md)). When session storage exists, use platform-secure storage — not plaintext prefs. Persist the minimum; delete it on logout. Cache is not access control.

## Untrusted input

Validate length/type before send and before render. Do not interpolate user or server strings into URLs, SQL, or native commands.

```ts
if (!tpImageCache.isUsableUrl(url)) {
  // no fetch — javascript: and junk web leftovers stay offline
}
```

`isUsableUrl` lives in `src/ui/theme/tpImageCache.ts`. Deep links (when added): allowlist hosts/paths.

Every payload is hostile: missing fields, extra fields, wrong types. Fail to `AppException` (`src/core/errors/AppException.ts`); do not crash the frame.

## Native

Do not request location, camera, microphone, or contacts until a feature needs them. Keep Android/iOS SDK pins unless product requires a change. Packages: [architecture.md](architecture.md).
