# True Professional

## Project

True Professional is a React Native mobile application targeting Android and iOS. The app boots into the `Tp*` kit gallery. The guest drawer opens Contact Us (`src/features/contact/`) and the public pages in `src/features/public/` (About Us, Privacy Policy, Terms & Conditions, Community Guidelines). Contact talks to the local API at port `4500` through `src/core/http/`.

Web **mobile** UI at `localhost:3001` (`?viewport=mb`) plus that source tree is the spec for product behavior. Convert features per [`rules/web.md`](rules/web.md). Do not use desktop web.

## Requirements

- [Node.js](https://nodejs.org/) **22.13+** (pinned intent in `.nvmrc`; React Native 0.87 requires this floor)
- npm 10+ (ships with Node 22)
- React Native **0.87.0** (pinned in `package.json`; do not float to a different minor)
- A full JDK 17+ with `javac` (this project uses Eclipse Temurin 21). A JRE-only install is not enough for Gradle.
- Android SDK with platform API matching the RN 0.87 template (`compileSdk` 37), Platform-Tools, Command-line Tools, Emulator
- `ANDROID_HOME` (and `ANDROID_SDK_ROOT`) pointing at that SDK; `JAVA_HOME` pointing at the JDK
- iOS still requires a macOS host with Xcode; this Linux host builds Android only

This project does not require Expo, Chrome/web, or a desktop React Native out-of-tree platform. Stable Expo SDK has not shipped React Native 0.87.

## Setup

From the project root:

```sh
npm ci
```

Link bundled fonts once after a fresh clone (or after adding a `.ttf`):

```sh
npx react-native-asset
```

Cursor / VS Code uses `.vscode/settings.json` so format-on-save matches Prettier (80 columns).

## Run

With an emulator or USB phone already running, from this directory:

```sh
npm start
npm run android
```

`npm start` is Metro. `npm run android` maps device ports `8081` (Metro) and `4500` (local API) to the host, then builds and installs. `run-android` will start Metro itself if it is not already up, so `npm run android` alone is enough when the device is ready.

A USB phone uses `127.0.0.1` for the API (with that reverse). The emulator uses `10.0.2.2`. Debug builds allow cleartext HTTP to the local API.

After Metro is connected, **Fast Refresh** applies JavaScript and style changes. Native changes — fonts, linked assets, Gradle, or a new npm native module — need another `npm run android` (or a full app restart) first. If Fast Refresh sticks, restart Metro with `npm start -- --reset-cache`.

`Pixel_8_API_36` is a local AVD, not part of the app architecture. Close the emulator window so the snapshot is saved.

iOS still requires a macOS host (`npm run ios` after CocoaPods).

## Verify

```sh
npm run verify
```

That runs Prettier, ESLint, `tsc --noEmit`, and Jest.

## Architecture

```
index.js                            AppRegistry registration
src/
  main.tsx                          Re-exports TrueProfessionalApp
  app/                              Config, theme facade, guest chrome, router
  ui/theme/                         Tokens and light / dark `TpTheme`
  ui/components/                    Shared `Tp*` primitives (see `index.ts`)
  ui/overlay/                       OverlayHost (snackbars / sheets)
  ui/gallery/                       Design-system gallery (launch surface)
  features/contact/                 Contact Us form, topics, channels
  features/public/                  About Us, terms, privacy, community guidelines
  core/http/                        Shared fetch + API error mapping
  core/errors/                      Application error boundary
  core/logging/                     Application logging boundary
```

The app follows a layered split: UI is separate from domain and data. Dependencies point inward.

`index.js` registers the app. `src/app/` owns configuration, theme, and routing. Product screens live under `src/features/<name>/`. The API contract is Swagger at the running API (`http://localhost:4500`); the Android emulator reaches that host as `10.0.2.2`. Introduce domain and data folders when those responsibilities exist — not as empty ceremony.

Third-party packages that earned their keep:

- `react-native-safe-area-context` — RN 0.87 template; notches
- `react-native-svg` — bundled SVGs
- `@react-native-community/datetimepicker` — native OS date/time pickers (the ecosystem standard; React Native has none built in)
- `zod` — form and payload validation

No Axios, React Query, React Navigation, or persistence packages. HTTP is `fetch` in `core/http/`.

## Engineering rules

People and coding agents follow [`rules/index.md`](rules/index.md). Always start with [`rules/core.md`](rules/core.md). Discovery for agents: [`AGENTS.md`](AGENTS.md).
