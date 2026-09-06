/**
 * Debug logger used instead of console at call sites.
 */
export const appLogger = {
  debug(message: string): void {
    if (__DEV__) {
      console.debug(message);
    }
  },
};
