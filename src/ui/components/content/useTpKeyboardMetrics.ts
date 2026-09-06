import { useEffect, useState } from 'react';
import { Keyboard, type KeyboardEvent } from 'react-native';

export type TpKeyboardMetrics = {
  height: number;
  screenY: number;
};

const hidden: TpKeyboardMetrics = { height: 0, screenY: 0 };

/**
 * Live keyboard frame. Listens to will/did so Jest and both platforms fire.
 */
export function useTpKeyboardMetrics(): TpKeyboardMetrics {
  const [metrics, setMetrics] = useState<TpKeyboardMetrics>(hidden);

  useEffect(() => {
    const apply = (event: KeyboardEvent) => {
      const { height, screenY } = event.endCoordinates;

      setMetrics(height > 0 ? { height, screenY } : hidden);
    };
    const hide = () => setMetrics(hidden);
    const shows = [
      Keyboard.addListener('keyboardWillShow', apply),
      Keyboard.addListener('keyboardDidShow', apply),
      Keyboard.addListener('keyboardWillChangeFrame', apply),
      Keyboard.addListener('keyboardDidChangeFrame', apply),
    ];
    const hides = [
      Keyboard.addListener('keyboardWillHide', hide),
      Keyboard.addListener('keyboardDidHide', hide),
    ];

    return () => {
      shows.forEach(sub => sub.remove());
      hides.forEach(sub => sub.remove());
    };
  }, []);

  return metrics;
}
