import { fireEvent, render, screen } from '@testing-library/react-native';

import { ListingCategoryFilters } from '../../../src/features/listings/ListingCategoryFilters';
import type { ListingCategory } from '../../../src/features/listings/listingCategories';
import { pumpWithTheme } from '../../ui/pumpApp';

const sample: readonly ListingCategory[] = [
  { slug: 'cleaning', title: 'Cleaning' },
  { slug: 'education', title: 'Education' },
];

test('shows Categories, View All, and category buttons', async () => {
  await render(pumpWithTheme(<ListingCategoryFilters categories={sample} />));

  expect(screen.getByText('Categories')).toBeOnTheScreen();
  expect(screen.getByText('View All')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Education' })).toBeOnTheScreen();
});

test('selecting a category again clears it', async () => {
  await render(pumpWithTheme(<ListingCategoryFilters categories={sample} />));

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
  await render(pumpWithTheme(<ListingCategoryFilters categories={[]} />));

  expect(screen.getByText('No categories found')).toBeOnTheScreen();
});
