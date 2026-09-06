# True Professional

## Project

True Professional is a React Native mobile application targeting Android and iOS. This repository currently contains the Phase 1 foundation: application bootstrap, routing, theme, a shared `Tp*` design-system kit, and a gallery at launch for kit approval.

The Flutter sibling lives in `../true_professional_flutter`. It is evidence of product intent, not a source to copy widgets from.

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

The app is independent of any particular emulator or physical device. Launch a development target, then run:

```sh
tool/start_emulator.sh
npx react-native start
adb reverse tcp:8081 tcp:8081
npx react-native run-android
npx react-native run-android --deviceId <device-id>
```

Metro must be running before the installed app can load JS. `adb reverse` is required on the emulator so the device can reach Metro on the host. A physical device on USB debugging does not need reverse once the packager is reachable.

After Metro is connected, **Fast Refresh** (hot reload) applies JavaScript and style changes. Native changes — fonts, linked assets, Gradle, or a new npm native module — need one `npx react-native run-android` (or a full app restart) first; Fast Refresh takes over after that. If Fast Refresh sticks, restart Metro with `npx react-native start --reset-cache`.

`tool/start_emulator.sh` starts `Pixel_8_API_36` with host GPU and Quick Boot. Close the emulator window so the snapshot is saved; the next start should be much faster.

`Pixel_8_API_36` is a local AVD (Pixel 8, API 36, Google Play x86_64), not part of the app architecture.

iOS still requires a macOS host (`npx react-native run-ios` after CocoaPods).

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
  app/                              Config, theme facade, router, root widget
  ui/theme/                         Tokens and light / dark `TpTheme`
  ui/components/                    Shared `Tp*` primitives (see `index.ts`)
  ui/overlay/                       OverlayHost (snackbars / sheets)
  ui/gallery/                       Design-system gallery (current app surface)
  core/errors/                      Application error boundary
  core/logging/                     Application logging boundary
```

The app follows a layered split: UI is separate from future domain and data code, dependencies point inward, and data will flow in one direction once real state exists.

`index.js` registers the app. `src/app/` owns configuration, theme, and routing. Features will live under `src/features/<name>/` when product screens exist. Introduce domain and data folders when those responsibilities exist — not as empty ceremony.

Third-party packages that earned their keep:

- `react-native-safe-area-context` — RN 0.87 template; notches
- `react-native-svg` — bundled SVGs (the `flutter_svg` equivalent)
- `@react-native-community/datetimepicker` — native OS date/time pickers (the ecosystem standard; React Native has none built in)

No state-management, routing, networking, or persistence packages are included yet.

## Engineering rules

People and coding agents follow [`rules/`](rules/README.md). Always start with [`rules/core.md`](rules/core.md). Discovery for agents: [`AGENTS.md`](AGENTS.md).
