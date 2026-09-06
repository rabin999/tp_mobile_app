export type ListingCategory = {
  slug: string;
  title: string;
  imageUri?: string;
};

export const listingCategories: readonly ListingCategory[] = [
  { slug: 'cleaning', title: 'Cleaning' },
  { slug: 'education', title: 'Education' },
  { slug: 'photography', title: 'Photography' },
  { slug: 'electrical', title: 'Electrical' },
  { slug: 'plumbing', title: 'Plumbing' },
  { slug: 'tutoring', title: 'Tutoring' },
  { slug: 'moving', title: 'Moving' },
  { slug: 'carpentry', title: 'Carpentry' },
  { slug: 'painting', title: 'Painting' },
  { slug: 'cooking', title: 'Cooking' },
];

/**
 * Two horizontal rows: first 40, remainder in row two.
 */
export function listingCategoryRows(
  categories: readonly ListingCategory[],
): readonly ListingCategory[][] {
  const row1 = categories.slice(0, 40);
  const row2 = categories.slice(40);

  return [row1, row2].filter(row => row.length > 0);
}
