import { render, screen } from '@testing-library/react-native';

import { ProfessionalsScreen } from '../../../src/features/professionals/ProfessionalsScreen';
import { pumpWithTheme } from '../../ui/pumpApp';

test('renders fixture cards', async () => {
  await render(pumpWithTheme(<ProfessionalsScreen />));

  expect(screen.getByText('Jane Smith')).toBeOnTheScreen();
  expect(screen.getByText('Alex Rai')).toBeOnTheScreen();
  expect(screen.getByText('Offer Tasks')).toBeOnTheScreen();
});
