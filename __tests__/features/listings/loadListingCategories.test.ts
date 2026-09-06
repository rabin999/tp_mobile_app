import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import { loadListingCategories } from '../../../src/features/listings/loadListingCategories';
import { parseListingCategoryPage } from '../../../src/features/listings/listingCategories';
import { jsonResponse, ScriptedHttp, withFetch } from '../../core/scriptedHttp';

test('loads every page of sub-categories', async () => {
  const http = new ScriptedHttp((url, init) => {
    if ((init.method ?? 'GET') !== 'GET') {
      throw new Error(`unhandled ${init.method} ${url}`);
    }

    if (url.includes('page=2')) {
      return jsonResponse(200, {
        data: [{ id: 2, title: 'Education', slug: 'education' }],
        meta: { currentPage: 2, totalPages: 2 },
      });
    }

    return jsonResponse(200, {
      data: [{ id: 1, title: 'Cleaning', slug: 'cleaning' }],
      meta: { currentPage: 1, totalPages: 2 },
    });
  });

  const categories = await withFetch(http.fetch, () =>
    loadListingCategories(new AbortController().signal),
  );

  expect(categories.map(item => item.title)).toEqual(['Cleaning', 'Education']);
  expect(http.calls).toHaveLength(2);
});

test('rejects a payload that is not the filter page', () => {
  expect(() => parseListingCategoryPage({ title: 'Cleaning' })).toThrow(
    new AppException(httpMessages.unavailable),
  );
});

test('rejects a row missing slug', () => {
  expect(() =>
    parseListingCategoryPage({
      data: [{ id: 1, title: 'Cleaning' }],
    }),
  ).toThrow(new AppException(httpMessages.unavailable));
});

test('maps a down API through the listing category loader', async () => {
  const down = new ScriptedHttp(() => jsonResponse(500));

  await expect(
    withFetch(down.fetch, () =>
      loadListingCategories(new AbortController().signal),
    ),
  ).rejects.toEqual(new AppException(httpMessages.unavailable));
});
