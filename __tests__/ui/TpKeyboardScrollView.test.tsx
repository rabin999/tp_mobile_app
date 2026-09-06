import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type HostInstance,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TpKeyboardScrollView } from '../../src/ui/components/content/TpKeyboardScrollView';
import { tpSpacing } from '../../src/ui/theme/tpSpacing';
import { emitKeyboardDidHide, emitKeyboardDidShow } from './emitKeyboard';
import { pumpWithTheme } from './pumpApp';

afterEach(() => {
  emitKeyboardDidHide();
  jest.restoreAllMocks();
});

function pumpScroll() {
  return pumpWithTheme(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <View style={{ flex: 1 }}>
        <TpKeyboardScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <TextInput testID="full-name" placeholder="Full name" />
          <Text>Send</Text>
        </TpKeyboardScrollView>
      </View>
    </SafeAreaProvider>,
  );
}

function paddingBottom(testID = 'tp-keyboard-scroll'): number {
  const style = StyleSheet.flatten(
    screen.getByTestId(testID).props.contentContainerStyle,
  );

  return typeof style.paddingBottom === 'number' ? style.paddingBottom : 0;
}

test('keyboard open grows the scroll content so the form can move up', async () => {
  await render(pumpScroll());
  expect(paddingBottom()).toBe(40);
  await act(async () => {
    emitKeyboardDidShow(320, 400);
  });
  expect(paddingBottom()).toBe(360);
  await act(async () => {
    emitKeyboardDidHide();
  });
  expect(paddingBottom()).toBe(40);
});

test('taps on the form still work while the keyboard is open', async () => {
  let sent = false;

  await render(
    pumpWithTheme(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <TpKeyboardScrollView>
          <Text
            accessibilityRole="button"
            onPress={() => {
              sent = true;
            }}
          >
            Send
          </Text>
        </TpKeyboardScrollView>
      </SafeAreaProvider>,
    ),
  );
  expect(
    screen.getByTestId('tp-keyboard-scroll').props.keyboardShouldPersistTaps,
  ).toBe('handled');
  expect(
    screen.getByTestId('tp-keyboard-scroll').props.keyboardDismissMode,
  ).toBe('none');
  await act(async () => {
    emitKeyboardDidShow(320, 400);
  });
  await fireEvent.press(screen.getByText('Send'));
  expect(sent).toBe(true);
});

test('a covered focused field is scrolled above the keyboard', async () => {
  const scrollTo = jest.fn();

  jest.spyOn(ScrollView.prototype, 'scrollTo').mockImplementation(scrollTo);
  jest.spyOn(TextInput.State, 'currentlyFocusedInput').mockReturnValue({
    measureInWindow: (
      callback: (x: number, y: number, w: number, h: number) => void,
    ) => {
      callback(16, 520, 358, 44);
    },
  } as HostInstance);

  await render(pumpScroll());
  await act(async () => {
    emitKeyboardDidShow(320, 400);
  });
  await waitFor(() => {
    expect(scrollTo).toHaveBeenCalledWith({
      y: 520 + 44 + tpSpacing.xl - 400,
      animated: true,
    });
  });
});
