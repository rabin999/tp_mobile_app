import type { ZodError } from 'zod';

/**
 * Maps a Zod error to one message per field for form controls.
 */
export function fieldErrorsFromZod<K extends string>(
  error: ZodError,
): Partial<Record<K, string>> {
  const flattened = error.flatten().fieldErrors;
  const errors: Partial<Record<K, string>> = {};

  for (const key of Object.keys(flattened) as K[]) {
    const first = flattened[key]?.[0];

    if (first != null) {
      errors[key] = first;
    }
  }

  return errors;
}
