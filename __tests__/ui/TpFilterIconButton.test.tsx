import { fireEvent, render, screen } from '@testing-library/react-native';

import { TpFilterIconButton } from '../../src/ui/components/actions/TpFilterIconButton';
import { pumpWithTheme } from './pumpApp';

test('hides the count when badgeCount is zero', async () => {
  await render(
    pumpWithTheme(
      <TpFilterIconButton tooltip="Filters" onPress={() => undefined} />,
    ),
  );

  expect(screen.getByLabelText('Filters')).toBeOnTheScreen();
  expect(screen.queryByText('2')).toBeNull();
});

test('shows the count on the filter control', async () => {
  await render(
    pumpWithTheme(
      <TpFilterIconButton
        tooltip="Filters"
        badgeCount={2}
        onPress={() => undefined}
      />,
    ),
  );

  expect(screen.getByText('2')).toBeOnTheScreen();
  expect(screen.getByLabelText('Filters').props.accessibilityValue.now).toBe(2);
});

test('disabled filter does not fire onPress', async () => {
  let tapped = false;

  await render(pumpWithTheme(<TpFilterIconButton tooltip="Filters" />));
  await fireEvent.press(screen.getByLabelText('Filters'));
  expect(tapped).toBe(false);
});
