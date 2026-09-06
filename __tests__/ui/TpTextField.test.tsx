import { fireEvent, render, screen } from '@testing-library/react-native';

import { TpPasswordField } from '../../src/ui/components/inputs/TpPasswordField';
import { TpTextField } from '../../src/ui/components/inputs/TpTextField';
import { pumpWithTheme } from './pumpApp';

test('shows validation error text', async () => {
  await render(
    pumpWithTheme(
      <TpTextField label="Email" errorText="Enter a valid email" />,
    ),
  );
  expect(screen.getByText('Enter a valid email')).toBeOnTheScreen();
});

test('floats the outline label when focused', async () => {
  await render(pumpWithTheme(<TpTextField label="Name" hint="Your name" />));
  await fireEvent(screen.getByPlaceholderText('Name'), 'focus');
  expect(screen.getByText('Name')).toBeOnTheScreen();
  expect(screen.getByPlaceholderText('Your name')).toBeOnTheScreen();
});

test('password visibility toggle stays on the field', async () => {
  await render(pumpWithTheme(<TpPasswordField label="Password" />));
  expect(screen.getByLabelText('Show password')).toBeOnTheScreen();
  await fireEvent.press(screen.getByLabelText('Show password'));
  expect(screen.getByLabelText('Hide password')).toBeOnTheScreen();
});
