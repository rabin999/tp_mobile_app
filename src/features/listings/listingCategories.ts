import { z } from 'zod';

import { appConfig } from '../../app/config';
import { AppException } from '../../core/errors/AppException';
import { httpMessages } from '../../core/http';

export type ListingCategory = {
  id: number;
  slug: string;
  title: string;
  imageUri?: string;
};

export const listingCategoryPageLimit = 100;

export const listingCategoryMaxPages = 20;

export const listingCategoryFirstRowCount = 40;

const rowSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  slug: z.string().min(1),
});

const pageSchema = z.object({
  data: z.array(z.unknown()),
  meta: z
    .object({
      currentPage: z.number().optional(),
      totalPages: z.number().optional(),
    })
    .optional(),
});

export type ListingCategoryPage = {
  categories: ListingCategory[];
  totalPages: number;
};

/**
 * Maps GET /service-sub-categories/filter into listing category chips.
 */
export function parseListingCategoryPage(body: unknown): ListingCategoryPage {
  const parsed = pageSchema.safeParse(body);

  if (!parsed.success) {
    throw new AppException(httpMessages.unavailable);
  }

  const categories: ListingCategory[] = [];

  for (const item of parsed.data.data) {
    const row = rowSchema.safeParse(item);

    if (!row.success) {
      throw new AppException(httpMessages.unavailable);
    }

    categories.push({
      id: row.data.id,
      slug: row.data.slug,
      title: row.data.title,
      imageUri: listingCategoryImageUri(row.data.id),
    });
  }

  return {
    categories,
    totalPages: Math.max(parsed.data.meta?.totalPages ?? 1, 1),
  };
}

/**
 * Two horizontal rows: first 40, remainder in row two.
 */
export function listingCategoryRows(
  categories: readonly ListingCategory[],
): readonly ListingCategory[][] {
  const row1 = categories.slice(0, listingCategoryFirstRowCount);
  const row2 = categories.slice(listingCategoryFirstRowCount);

  return [row1, row2].filter(row => row.length > 0);
}

function listingCategoryImageUri(id: number): string {
  return `${appConfig.apiBaseUrl}/service-sub-categories/media/${id}`;
}
