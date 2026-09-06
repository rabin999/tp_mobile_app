import { render, screen } from '@testing-library/react-native';

import { DesignSystemGalleryPage } from '../../src/ui/gallery/DesignSystemGalleryPage';
import { pumpWithTheme } from './pumpApp';

test('gallery pumps without crashing', async () => {
  await render(pumpWithTheme(<DesignSystemGalleryPage />));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('gallery pumps in dark mode', async () => {
  await render(pumpWithTheme(<DesignSystemGalleryPage />, 'dark'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});
