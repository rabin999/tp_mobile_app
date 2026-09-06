/**
 * User-facing text for HTTP failures that every API call can hit.
 */
export const httpMessages = {
  offline: 'You appear to be offline. Check your connection and try again.',
  timeout: 'The server took too long to respond. Try again.',
  unavailable:
    'The server could not complete this request. Try again in a moment.',
  failed: 'The request could not be completed. Try again.',
} as const;
