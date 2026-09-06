import { act, render, screen } from '@testing-library/react-native';

import { TpSnackbar } from '../../src/ui/components/feedback/TpSnackbar';
import { OverlayHost } from '../../src/ui/overlay/overlayHost';
import { pumpWithTheme } from './pumpApp';

test('unmounting OverlayHost drops leftover overlay entries', async () => {
  const first = await render(pumpWithTheme(<OverlayHost />));

  await act(() => {
    TpSnackbar.show({ message: 'Saved', duration: 0 });
  });
  expect(await screen.findByText('Saved')).toBeOnTheScreen();
  first.unmount();
  await render(pumpWithTheme(<OverlayHost />));
  expect(screen.queryByText('Saved')).not.toBeOnTheScreen();
});
