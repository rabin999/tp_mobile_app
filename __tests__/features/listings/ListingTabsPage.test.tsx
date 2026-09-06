import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { useState } from 'react';
import { Text } from 'react-native';

import type { ListingTabId } from '../../../src/features/listings/ListingTabsHeader';
import { ListingTabsPage } from '../../../src/features/listings/ListingTabsPage';
import { listingCategoryText } from '../../../src/features/listings/listingCategoryText';
import { appHttpResult } from '../../core/appHttp';
import { installFetch, ScriptedHttp } from '../../core/scriptedHttp';
import { pumpWithTheme } from '../../ui/pumpApp';

let restoreFetch: () => void;

beforeEach(() => {
  restoreFetch = installFetch(new ScriptedHttp(appHttpResult).fetch);
});

afterEach(() => {
  restoreFetch();
});

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
  expect(screen.getByText(listingCategoryText.title)).toBeOnTheScreen();
  expect(screen.queryByText('View All')).toBeNull();
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
  });

  await fireEvent.press(screen.getByRole('tab', { name: 'Tasks' }));

  expect(
    screen.getByRole('tab', { name: 'Tasks', selected: true }),
  ).toBeOnTheScreen();
  expect(screen.getByText('Fix a leaking kitchen tap')).toBeOnTheScreen();
  expect(screen.queryByText('House Cleaning')).toBeNull();
  expect(screen.getByPlaceholderText('Search')).toBeOnTheScreen();
  expect(screen.getByText(listingCategoryText.title)).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
});
