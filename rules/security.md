# Security and data handling

Load when touching auth, storage, logging, user input, API payloads, WebViews, deep links, or native dependencies.

**Why:** The JS bundle is not a vault. Anyone with the app can unpack it. Secrets, “hidden” rules, and long-lived credentials in the client are public. Real secrets stay behind an authenticated API.

## Secrets stay off the client

Never commit keys, tokens, passwords, keystores, or real `.env` files. Never put secrets in `appConfig`, TypeScript, or README. `appConfig.apiBaseUrl` is a host, not a credential.

```ts
appLogger.debug('session: refresh failed'); // good
appLogger.debug(`token=${accessToken}`); // bad
```

Do not log passwords, OTP, Authorization headers, payment details, government IDs, or bodies with PII. `appLogger` (`src/core/logging/appLogger.ts`) is operational copy only. Debug signing in `android/app/build.gradle` is a template default — do not ship release with it, and do not paste production keystore passwords into the repo.

Authorization is the API, not a hidden screen. 401/403 are first-class states ([api.md](api.md)).

## Storage and session

The convenient default (AsyncStorage / plaintext prefs) is **not** encrypted. Tokens and sensitive local data go in the platform store (Android Keystore / iOS Keychain) when a session exists. Persist the minimum; delete it on logout. Cache is not access control.

Use short-lived access tokens plus a refresh flow. Do not leave a long-lived credential in storage indefinitely. Re-authenticate for the most sensitive actions (payment, account delete, password change) when those features exist. There is no session yet — do not add storage “for later.”

## Untrusted input, WebView, deep links

Validate length and type before send and before render. Do not interpolate user or server strings into URLs, SQL, or native commands.

Images: `tpImageCache.isUsableUrl` (`src/ui/theme/tpImageCache.ts`) — http(s) only; `javascript:` and leftovers stay offline.

Outbound app links: `isAllowedOutboundUrl` (`src/core/outboundUrl.ts`). `Linking.openURL` only after that check. Contact channels are `tel:`, `mailto:`, and `https://wa.me/…`. Reject `javascript:`, `file:`, `intent:`, `data:`, and arbitrary https.

Deep-link handlers (when added): allowlist scheme, host, and path. Do not route on a raw URL string.

Do not add a WebView that loads arbitrary URLs. A WebView is the app’s origin; attacker-controlled content there is a direct hijack. If a feature needs one, allowlist origins and disable JS unless the product requires it.

Every payload is hostile: missing fields, extra fields, wrong types. Fail to `AppException`; do not crash the frame.

## Native modules

A third-party native module runs with full native privileges. Add one only if architecture’s package bar is met ([architecture.md](architecture.md)), pin the version in `package.json` (do not float a new native addon on `*`), and read what it can access (filesystem, network, clipboard) before merge.

Do not request location, camera, microphone, or contacts until a feature needs them. Keep Android/iOS SDK pins unless product requires a change.

## Certificate pinning

Pinning defends against a trusted-looking but compromised network intercepting TLS. Apply it when the data justifies it (auth, payment, stored PII) — not uniformly by default. This app’s public contact form over the local debug API does not earn a pin. When a production HTTPS session exists, decide then; do not add a pinning package “for security.”
