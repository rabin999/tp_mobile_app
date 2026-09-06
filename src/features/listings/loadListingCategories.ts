import { appConfig } from '../../app/config';
import { requestJson } from '../../core/http';
import {
  listingCategoryMaxPages,
  listingCategoryPageLimit,
  parseListingCategoryPage,
  type ListingCategory,
} from './listingCategories';

export type LoadListingCategories = (
  signal: AbortSignal,
) => Promise<readonly ListingCategory[]>;

/**
 * Reads GET /service-sub-categories/filter until every page is in.
 */
export async function loadListingCategories(
  signal: AbortSignal,
): Promise<readonly ListingCategory[]> {
  const rows: ListingCategory[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= listingCategoryMaxPages) {
    const params = new URLSearchParams({
      limit: String(listingCategoryPageLimit),
      page: String(page),
    });
    const body = await requestJson({
      url: `${
        appConfig.apiBaseUrl
      }/service-sub-categories/filter?${params.toString()}`,
      signal,
    });
    const parsed = parseListingCategoryPage(body);

    rows.push(...parsed.categories);
    totalPages = parsed.totalPages;
    page += 1;
  }

  return rows;
}
