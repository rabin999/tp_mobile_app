import {
  listingCategoryRows,
  type ListingCategory,
} from '../../../src/features/listings/listingCategories';

function cats(...titles: string[]): ListingCategory[] {
  return titles.map(title => ({
    slug: title.toLowerCase(),
    title,
  }));
}

test('empty list has no rows', () => {
  expect(listingCategoryRows([])).toEqual([]);
});

test('lists of 40 or fewer stay in one row', () => {
  const rows = listingCategoryRows(cats('A', 'B', 'C', 'D', 'E', 'F'));

  expect(rows).toHaveLength(1);
  expect(rows[0].map(item => item.title)).toEqual([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ]);
});

test('long lists keep the first 40 in row one', () => {
  const titles = Array.from({ length: 45 }, (_, index) => `C${index}`);
  const rows = listingCategoryRows(cats(...titles));

  expect(rows[0]).toHaveLength(40);
  expect(rows[1]).toHaveLength(5);
});
