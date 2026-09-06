import { render, screen } from '@testing-library/react-native';

import { ServicesScreen } from '../../../src/features/services/ServicesScreen';
import { pumpWithTheme } from '../../ui/pumpApp';

test('renders fixture cards', async () => {
  await render(pumpWithTheme(<ServicesScreen />));

  expect(screen.getByText('House Cleaning')).toBeOnTheScreen();
  expect(screen.getByText('Math Tutoring')).toBeOnTheScreen();
});
