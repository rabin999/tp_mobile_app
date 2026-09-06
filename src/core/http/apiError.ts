import { AppException } from '../errors/AppException';
import { httpMessages } from './httpMessages';

/**
 * Error JSON the API returns on failure.
 */
export type ApiErrorBody = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  code?: string;
};

/**
 * Reads `message` from an API error body (string or string[]).
 */
export function apiErrorMessage(body: unknown): string | undefined {
  if (body == null || typeof body !== 'object') {
    return undefined;
  }

  const message = (body as ApiErrorBody).message;

  if (typeof message === 'string') {
    const trimmed = message.trim();

    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (!Array.isArray(message)) {
    return undefined;
  }

  const parts = message.filter(
    (item): item is string =>
      typeof item === 'string' && item.trim().length > 0,
  );

  if (parts.length === 0) {
    return undefined;
  }

  return parts.join('. ');
}

/**
 * Turns an HTTP status and API error body into the exception the UI shows.
 */
export function exceptionFromResponse(
  status: number,
  body: unknown,
): AppException {
  const message = apiErrorMessage(body);

  if (status >= 500) {
    return new AppException(message ?? httpMessages.unavailable);
  }

  if (message != null) {
    return new AppException(message);
  }

  return new AppException(httpMessages.failed);
}
