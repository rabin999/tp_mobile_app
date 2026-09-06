import { render, screen } from '@testing-library/react-native';

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
