import { fireEvent, render, screen } from '@testing-library/react-native';

import { TpButton } from '../../src/ui/components/actions/TpButton';
import { TpFormActions } from '../../src/ui/components/actions/TpFormActions';
import { pumpWithTheme } from './pumpApp';

test('lone primary is the only action', async () => {
  await render(
    pumpWithTheme(
      <TpFormActions
        primary={<TpButton label="Send" onPress={() => undefined} />}
      />,
    ),
  );

  expect(screen.getByText('Send')).toBeOnTheScreen();
  expect(screen.queryByText('Cancel')).toBeNull();
});

test('cancel sits with the primary action', async () => {
  let cancelled = false;
  let applied = false;

  await render(
    pumpWithTheme(
      <TpFormActions
        cancel={
          <TpButton
            label="Cancel"
            variant="text"
            onPress={() => {
              cancelled = true;
            }}
          />
        }
        primary={
          <TpButton
            label="Apply"
            onPress={() => {
              applied = true;
            }}
          />
        }
      />,
    ),
  );

  await fireEvent.press(screen.getByText('Cancel'));
  await fireEvent.press(screen.getByText('Apply'));
  expect(cancelled).toBe(true);
  expect(applied).toBe(true);
});
