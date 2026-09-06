import { act, renderHook, waitFor } from '@testing-library/react-native';

import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import type { ListingCategory } from '../../../src/features/listings/listingCategories';
import { useListingCategories } from '../../../src/features/listings/useListingCategories';

const cleaning: ListingCategory = {
  id: 1,
  slug: 'cleaning',
  title: 'Cleaning',
};

test('stays loading until categories arrive', async () => {
  let finish!: (rows: readonly ListingCategory[]) => void;
  const load = () =>
    new Promise<readonly ListingCategory[]>(resolve => {
      finish = resolve;
    });

  const { result } = await renderHook(() => useListingCategories(load));

  expect(result.current.loading).toBe(true);
  expect(result.current.categories).toEqual([]);

  await act(() => {
    finish([cleaning]);
  });

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.categories).toEqual([cleaning]);
});

test('surfaces a failed load and retry fetches again', async () => {
  let calls = 0;
  const load = () => {
    calls += 1;
    if (calls === 1) {
      return Promise.reject(new AppException(httpMessages.unavailable));
    }

    return Promise.resolve([cleaning]);
  };

  const { result } = await renderHook(() => useListingCategories(load));

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.error).toBe(httpMessages.unavailable);
  expect(result.current.categories).toEqual([]);

  await act(() => {
    result.current.retry();
  });

  await waitFor(() => {
    expect(result.current.categories).toEqual([cleaning]);
  });
  expect(result.current.error).toBeUndefined();
  expect(calls).toBe(2);
});
