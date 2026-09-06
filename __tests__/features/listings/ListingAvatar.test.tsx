import { render, screen } from '@testing-library/react-native';

import { ListingAvatar } from '../../../src/features/listings/ListingAvatar';
import { pumpWithTheme } from '../../ui/pumpApp';

test('shows the verified mark when verified is true', async () => {
  await render(pumpWithTheme(<ListingAvatar name="Sita Sharma" verified />));

  expect(screen.getByLabelText('Sita Sharma')).toBeOnTheScreen();
  expect(screen.getByLabelText('Verified')).toBeOnTheScreen();
});

test('hides the verified mark unless verified is true', async () => {
  await render(pumpWithTheme(<ListingAvatar name="Sita Sharma" />));

  expect(screen.getByLabelText('Sita Sharma')).toBeOnTheScreen();
  expect(screen.queryByLabelText('Verified')).toBeNull();
});
