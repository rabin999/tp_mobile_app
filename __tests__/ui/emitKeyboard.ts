import { DeviceEventEmitter } from 'react-native';

export function keyboardEvent(height: number, screenY: number) {
  return {
    duration: 0,
    easing: 'keyboard' as const,
    endCoordinates: {
      height,
      screenX: 0,
      screenY,
      width: 390,
    },
  };
}

export function emitKeyboardDidShow(height: number, screenY: number): void {
  DeviceEventEmitter.emit('keyboardDidShow', keyboardEvent(height, screenY));
}

export function emitKeyboardDidHide(): void {
  DeviceEventEmitter.emit('keyboardDidHide', keyboardEvent(0, 0));
}
