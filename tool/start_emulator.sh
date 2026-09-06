#!/usr/bin/env bash
# Fast AVD launch: host GPU, skip boot animation, use Quick Boot snapshot.
set -euo pipefail

AVD="${1:-Pixel_8_API_36}"
SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}}"
EMULATOR="$SDK/emulator/emulator"

if [[ ! -x "$EMULATOR" ]]; then
  echo "Android emulator not found at $EMULATOR" >&2
  exit 1
fi

if command -v powerprofilesctl >/dev/null 2>&1; then
  powerprofilesctl set performance >/dev/null 2>&1 || true
fi

exec "$EMULATOR" -avd "$AVD" -gpu host -no-boot-anim
