/**
 * Application logging boundary.
 *
 * Uses `console.debug` so no logging package is required yet. Call sites can
 * stay stable when a production logging policy is chosen later.
 */
export const appLogger = {
  debug(message: string): void {
    if (__DEV__) {
      console.debug(message);
    }
  },
};
