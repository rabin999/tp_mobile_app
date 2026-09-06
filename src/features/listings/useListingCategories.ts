import { useEffect, useState } from 'react';

import { isAbortError } from '../../core/async';
import { AppException } from '../../core/errors/AppException';
import { httpMessages } from '../../core/http';
import { appLogger } from '../../core/logging/appLogger';
import type { ListingCategory } from './listingCategories';
import type { LoadListingCategories } from './loadListingCategories';

/**
 * Loads listing categories and retries from a user tap.
 */
export function useListingCategories(load: LoadListingCategories) {
  const [categories, setCategories] = useState<readonly ListingCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(undefined);
    setCategories([]);

    load(controller.signal)
      .then(next => {
        if (controller.signal.aborted) {
          return;
        }

        setCategories(next);
      })
      .catch(caught => {
        if (controller.signal.aborted || isAbortError(caught)) {
          return;
        }

        appLogger.debug('listings: categories failed');
        if (!controller.signal.aborted) {
          setError(
            caught instanceof AppException
              ? caught.message
              : httpMessages.failed,
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [load, reloadToken]);

  return {
    categories,
    loading,
    error,
    retry: () => setReloadToken(token => token + 1),
  };
}

export type ListingCategoriesModel = ReturnType<typeof useListingCategories>;
