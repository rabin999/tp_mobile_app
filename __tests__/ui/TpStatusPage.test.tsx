import { render, screen } from '@testing-library/react-native';

import { TpStatusPage } from '../../src/ui/components/feedback/TpStatusPage';
import { pumpWithTheme } from './pumpApp';

test('status page shows title and action', async () => {
  await render(
    pumpWithTheme(
      <TpStatusPage
        title="No services found at the moment."
        actionLabel="Browse Services"
        onAction={() => undefined}
      />,
    ),
  );
  expect(
    screen.getByText('No services found at the moment.'),
  ).toBeOnTheScreen();
  expect(screen.getByText('Browse Services')).toBeOnTheScreen();
});
