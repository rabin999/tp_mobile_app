import { fireEvent, render, screen } from '@testing-library/react-native';

import { TpConfirmSheet } from '../../src/ui/components/overlays/TpConfirmSheet';
import { pumpWithTheme } from './pumpApp';

test('shows title, message, and footer actions', async () => {
  let confirmed = false;
  let cancelled = false;

  await render(
    pumpWithTheme(
      <TpConfirmSheet
        title="Delete item?"
        message="This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onConfirm={() => {
          confirmed = true;
        }}
        onCancel={() => {
          cancelled = true;
        }}
      />,
    ),
  );

  expect(screen.getByText('Delete item?')).toBeOnTheScreen();
  expect(screen.getByText('This cannot be undone.')).toBeOnTheScreen();
  await fireEvent.press(screen.getByText('Cancel'));
  expect(cancelled).toBe(true);
  await fireEvent.press(screen.getByText('Delete'));
  expect(confirmed).toBe(true);
});

test('loading blocks cancel and confirm taps', async () => {
  let confirmed = false;
  let cancelled = false;

  await render(
    pumpWithTheme(
      <TpConfirmSheet
        title="Delete item?"
        message="This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading
        onConfirm={() => {
          confirmed = true;
        }}
        onCancel={() => {
          cancelled = true;
        }}
      />,
    ),
  );

  await fireEvent.press(screen.getByText('Cancel'));
  await fireEvent.press(screen.getByText('Delete'));
  expect(cancelled).toBe(false);
  expect(confirmed).toBe(false);
});
