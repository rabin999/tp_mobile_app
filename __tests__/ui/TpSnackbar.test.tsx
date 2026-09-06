import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import {
  TpSnackbar,
  tpSnackbarBottomInset,
} from '../../src/ui/components/feedback/TpSnackbar';
import { OverlayHost } from '../../src/ui/overlay/overlayHost';
import { tpSpacing } from '../../src/ui/theme/tpSpacing';
import { emitKeyboardDidShow } from './emitKeyboard';
import { pumpWithTheme } from './pumpApp';

test('snackbar sits above the home indicator, not the app bar', () => {
  expect(tpSnackbarBottomInset(0, 24)).toBe(24 + tpSpacing.md);
});

test('open keyboard lifts the snackbar above the IME', () => {
  expect(tpSnackbarBottomInset(320, 24)).toBe(320 + tpSpacing.sm);
});

test('shows a bottom snackbar that replaces the previous one', async () => {
  await render(pumpWithTheme(<OverlayHost />));
  await act(() => {
    TpSnackbar.show({ message: 'Saved', tone: 'success', duration: 0 });
  });
  expect(await screen.findByText('Saved')).toBeOnTheScreen();

  const host = screen.getByTestId('tp-snackbar');
  const style = StyleSheet.flatten(host.props.style);

  expect(style.bottom).toBe(tpSpacing.md);
  expect(style.top).toBeUndefined();
  expect(style.left).toBe(tpSpacing.md);
  expect(style.right).toBe(tpSpacing.md);

  await act(() => {
    TpSnackbar.show({ message: 'Sent', duration: 0 });
  });
  expect(await screen.findByText('Sent')).toBeOnTheScreen();
  expect(screen.queryByText('Saved')).toBeNull();
});

test('keyboard open raises the snackbar', async () => {
  await render(pumpWithTheme(<OverlayHost />));
  await act(() => {
    TpSnackbar.show({ message: 'Saved', duration: 0 });
  });
  const before = StyleSheet.flatten(
    (await screen.findByTestId('tp-snackbar')).props.style,
  ).bottom as number;

  await act(async () => {
    emitKeyboardDidShow(320, 500);
  });

  const after = StyleSheet.flatten(
    screen.getByTestId('tp-snackbar').props.style,
  ).bottom as number;

  expect(after).toBeGreaterThan(before);
  expect(after).toBe(tpSnackbarBottomInset(320, 0));
});

test('close removes the snackbar', async () => {
  await render(pumpWithTheme(<OverlayHost />));
  await act(() => {
    TpSnackbar.show({ message: 'Saved', duration: 0 });
  });
  expect(await screen.findByText('Saved')).toBeOnTheScreen();
  await fireEvent.press(screen.getByLabelText('Close'));
  expect(screen.queryByText('Saved')).toBeNull();
});
