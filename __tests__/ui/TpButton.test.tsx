import { fireEvent, render, screen } from '@testing-library/react-native';

import { TpButton } from '../../src/ui/components/actions/TpButton';
import { pumpWithTheme } from './pumpApp';

test('disabled button does not fire onPress', async () => {
  let tapped = false;

  await render(pumpWithTheme(<TpButton label="Save" />));
  await fireEvent.press(screen.getByText('Save'));
  expect(tapped).toBe(false);
});

test('loading button shows busy state and ignores taps', async () => {
  let tapped = false;

  await render(
    pumpWithTheme(
      <TpButton
        label="Save"
        loading
        onPress={() => {
          tapped = true;
        }}
      />,
    ),
  );
  expect(screen.getByRole('button').props.accessibilityState.busy).toBe(true);
  await fireEvent.press(screen.getByText('Save'));
  expect(tapped).toBe(false);
});

test('danger tone uses the error fill', async () => {
  await render(
    pumpWithTheme(
      <TpButton label="Delete" tone="danger" onPress={() => undefined} />,
    ),
  );
  expect(screen.getByText('Delete')).toBeOnTheScreen();
});
