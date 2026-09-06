import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import { ListingCategoryFilters } from '../../../src/features/listings/ListingCategoryFilters';
import type { ListingCategory } from '../../../src/features/listings/listingCategories';
import { listingCategoryText } from '../../../src/features/listings/listingCategoryText';
import { pumpWithTheme } from '../../ui/pumpApp';

const sample: readonly ListingCategory[] = [
  { id: 1, slug: 'cleaning', title: 'Cleaning' },
  { id: 2, slug: 'education', title: 'Education' },
];

test('shows Categories heading and category buttons from the loader', async () => {
  await render(
    pumpWithTheme(<ListingCategoryFilters load={async () => sample} />),
  );

  expect(screen.getByText(listingCategoryText.title)).toBeOnTheScreen();
  expect(screen.queryByText('View All')).toBeNull();
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
  });
  expect(screen.getByRole('button', { name: 'Education' })).toBeOnTheScreen();
});

test('selecting a category again clears it', async () => {
  await render(
    pumpWithTheme(<ListingCategoryFilters load={async () => sample} />),
  );

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
  });

  const cleaning = screen.getByRole('button', { name: 'Cleaning' });

  await fireEvent.press(cleaning);
  expect(cleaning.props.accessibilityState).toEqual(
    expect.objectContaining({ selected: true }),
  );

  await fireEvent.press(cleaning);
  expect(cleaning.props.accessibilityState).toEqual(
    expect.objectContaining({ selected: false }),
  );
});

test('empty list shows No categories found', async () => {
  await render(pumpWithTheme(<ListingCategoryFilters load={async () => []} />));

  await waitFor(() => {
    expect(screen.getByText(listingCategoryText.empty)).toBeOnTheScreen();
  });
});

test('renders every loaded category', async () => {
  const many = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    slug: `c${index}`,
    title: `C${index}`,
  }));

  await render(
    pumpWithTheme(<ListingCategoryFilters load={async () => many} />),
  );

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'C0' })).toBeOnTheScreen();
  });
  expect(screen.getByRole('button', { name: 'C44' })).toBeOnTheScreen();
  expect(screen.queryByText('View All')).toBeNull();
});

test('failed load shows Try again and retry fetches', async () => {
  let calls = 0;
  const load = async () => {
    calls += 1;
    if (calls === 1) {
      throw new AppException(httpMessages.unavailable);
    }

    return sample;
  };

  await render(pumpWithTheme(<ListingCategoryFilters load={load} />));

  await waitFor(() => {
    expect(screen.getByText(httpMessages.unavailable)).toBeOnTheScreen();
  });
  expect(screen.getByText(listingCategoryText.title)).toBeOnTheScreen();

  await fireEvent.press(screen.getByText(listingCategoryText.retry));
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
  });
  expect(calls).toBe(2);
});
