import { abortOnTimeout, isAbortError } from '../async';
import { AppException } from '../errors/AppException';
import { appLogger } from '../logging/appLogger';
import { httpMessages } from './httpMessages';
import { exceptionFromResponse } from './apiError';

export type JsonRequest = {
  url: string;
  method?: string;
  body?: unknown;
  signal: AbortSignal;
  timeoutMs?: number;
};

export const httpTimeoutMs = 20_000;

/**
 * Sends JSON with fetch. Always times out (`httpTimeoutMs` unless overridden).
 * Maps API errors, timeout, and offline to AppException.
 */
export async function requestJson(request: JsonRequest): Promise<unknown> {
  const timed = abortOnTimeout(
    request.signal,
    request.timeoutMs ?? httpTimeoutMs,
  );

  try {
    const headers: Record<string, string> = { Accept: 'application/json' };

    if (request.body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(request.url, {
      method: request.method ?? 'GET',
      headers,
      body:
        request.body !== undefined ? JSON.stringify(request.body) : undefined,
      signal: timed.signal,
    });
    const body = await readResponseJson(response);

    if (response.ok) {
      return body;
    }

    throw exceptionFromResponse(response.status, body);
  } catch (error) {
    if (request.signal.aborted) {
      throw error;
    }

    if (error instanceof AppException) {
      throw error;
    }

    if (isAbortError(error)) {
      throw new AppException(httpMessages.timeout);
    }

    appLogger.debug('http: network failed');
    throw new AppException(httpMessages.offline);
  } finally {
    timed.dispose();
  }
}

async function readResponseJson(response: Response): Promise<unknown> {
  const text = await response.text();

  if (text.trim().length === 0) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch {
    appLogger.debug('http: malformed response');
    return undefined;
  }
}
