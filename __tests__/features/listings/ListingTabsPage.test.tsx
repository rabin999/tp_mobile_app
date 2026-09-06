import { fireEvent, render, screen } from '@testing-library/react-native';
import { useState } from 'react';
import { Text } from 'react-native';

import type { ListingTabId } from '../../../src/features/listings/ListingTabsHeader';
import { ListingTabsPage } from '../../../src/features/listings/ListingTabsPage';
import { pumpWithTheme } from '../../ui/pumpApp';

function ListingTabsPageHarness() {
  const [selectedId, setSelectedId] = useState<ListingTabId>('services');

  return (
    <ListingTabsPage selectedId={selectedId} onSelected={setSelectedId}>
      <Text>
        {selectedId === 'services'
          ? 'House Cleaning'
          : 'Fix a leaking kitchen tap'}
      </Text>
    </ListingTabsPage>
  );
}

test('keeps listing tabs while the list body is swapped', async () => {
  await render(pumpWithTheme(<ListingTabsPageHarness />));

  expect(
    screen.getByRole('tab', { name: 'Services', selected: true }),
  ).toBeOnTheScreen();
  expect(screen.getByText('House Cleaning')).toBeOnTheScreen();
  expect(screen.getByPlaceholderText('Search')).toBeOnTheScreen();
  expect(screen.getByText('Categories')).toBeOnTheScreen();
  expect(screen.getByText('View All')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();

  await fireEvent.press(screen.getByRole('tab', { name: 'Tasks' }));

  expect(
    screen.getByRole('tab', { name: 'Tasks', selected: true }),
  ).toBeOnTheScreen();
  expect(screen.getByText('Fix a leaking kitchen tap')).toBeOnTheScreen();
  expect(screen.queryByText('House Cleaning')).toBeNull();
  expect(screen.getByPlaceholderText('Search')).toBeOnTheScreen();
  expect(screen.getByText('Categories')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
});
