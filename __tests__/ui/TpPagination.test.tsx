import { render, screen } from '@testing-library/react-native';

import { TpPagination } from '../../src/ui/components/content/TpPagination';
import { pumpWithTheme } from './pumpApp';

test('hides itself when there is only one page', async () => {
  await render(
    pumpWithTheme(
      <TpPagination
        currentPage={1}
        totalPages={1}
        previousLabel="Previous"
        nextLabel="Next"
      />,
    ),
  );
  expect(screen.queryByText('Previous')).toBeNull();
});
