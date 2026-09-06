import {
  listingCategoryFirstRowCount,
  listingCategoryMaxPages,
  listingCategoryPageLimit,
  listingCategoryRows,
  parseListingCategoryPage,
  type ListingCategory,
} from '../../../src/features/listings/listingCategories';

function cats(...titles: string[]): ListingCategory[] {
  return titles.map((title, index) => ({
    id: index + 1,
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

test('long lists keep the first 40 in row one and the rest in row two', () => {
  const titles = Array.from({ length: 45 }, (_, index) => `C${index}`);
  const rows = listingCategoryRows(cats(...titles));

  expect(listingCategoryFirstRowCount).toBe(40);
  expect(rows[0]).toHaveLength(40);
  expect(rows[1]).toHaveLength(5);
});

test('maps a filter page into chips with media URLs', () => {
  const page = parseListingCategoryPage({
    data: [{ id: 9, title: 'Cleaning', slug: 'cleaning' }],
    meta: {
      itemsPerPage: listingCategoryPageLimit,
      totalItems: 1,
      currentPage: 1,
      totalPages: 1,
    },
  });

  expect(page.totalPages).toBe(1);
  expect(page.categories[0]).toEqual(
    expect.objectContaining({
      id: 9,
      title: 'Cleaning',
      slug: 'cleaning',
    }),
  );
  expect(page.categories[0]?.imageUri).toContain(
    '/service-sub-categories/media/9',
  );
  expect(listingCategoryMaxPages).toBeGreaterThan(1);
});
