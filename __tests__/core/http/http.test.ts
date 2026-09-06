import { abortOnTimeout } from '../../../src/core/async';
import { AppException } from '../../../src/core/errors/AppException';
import {
  apiErrorMessage,
  exceptionFromResponse,
  httpMessages,
  requestJson,
} from '../../../src/core/http';

import { jsonResponse, ScriptedHttp, withFetch } from '../scriptedHttp';

test('abortOnTimeout is already aborted when the parent is', () => {
  const parent = new AbortController();

  parent.abort();
  const timed = abortOnTimeout(parent.signal, 20_000);

  expect(timed.signal.aborted).toBe(true);
  timed.dispose();
});

test('reads an API validation message array', () => {
  expect(
    apiErrorMessage({
      message: ['email must be an email', 'message should not be empty'],
      error: 'Bad Request',
      statusCode: 400,
    }),
  ).toBe('email must be an email. message should not be empty');
});

test('reads an API error message string', () => {
  expect(
    apiErrorMessage({
      message: 'Unable to find general feedback of id: 1',
      statusCode: 404,
      code: 'NOT_FOUND',
    }),
  ).toBe('Unable to find general feedback of id: 1');
});

test('400 uses the API message', () => {
  expect(
    exceptionFromResponse(400, {
      message: ['email must be an email'],
      statusCode: 400,
    }),
  ).toEqual(new AppException('email must be an email'));
});

test('500 without an API message uses the shared unavailable text', () => {
  expect(exceptionFromResponse(500, undefined)).toEqual(
    new AppException(httpMessages.unavailable),
  );
});

test('requestJson returns parsed JSON on 2xx', async () => {
  const http = new ScriptedHttp(() => jsonResponse(201, { id: 12 }));
  const body = await withFetch(http.fetch, () =>
    requestJson({
      url: 'http://example.test/general-feedbacks',
      method: 'POST',
      body: { email: 'ada@example.com' },
      signal: new AbortController().signal,
    }),
  );

  expect(body).toEqual({ id: 12 });
  expect(http.calls[0].init.method).toBe('POST');
  expect(http.calls[0].init.signal).toBeDefined();
});

test('requestJson throws API validation text on 400', async () => {
  const http = new ScriptedHttp(() =>
    jsonResponse(400, {
      message: ['email must be an email'],
      error: 'Bad Request',
      statusCode: 400,
    }),
  );

  await expect(
    withFetch(http.fetch, () =>
      requestJson({
        url: 'http://example.test/general-feedbacks',
        method: 'POST',
        body: {},
        signal: new AbortController().signal,
      }),
    ),
  ).rejects.toEqual(new AppException('email must be an email'));
});

test('requestJson maps a broken network to offline text', async () => {
  const http = new ScriptedHttp(() => new TypeError('Network request failed'));

  await expect(
    withFetch(http.fetch, () =>
      requestJson({
        url: 'http://example.test/general-feedbacks',
        signal: new AbortController().signal,
      }),
    ),
  ).rejects.toEqual(new AppException(httpMessages.offline));
});

test('requestJson maps a hung request to timeout text', async () => {
  jest.useFakeTimers();
  try {
    const http = new ScriptedHttp(() => new Promise(() => undefined));
    const pending = withFetch(http.fetch, () =>
      requestJson({
        url: 'http://example.test/hang',
        signal: new AbortController().signal,
        timeoutMs: 20_000,
      }),
    );
    const assertion = expect(pending).rejects.toEqual(
      new AppException(httpMessages.timeout),
    );

    await jest.advanceTimersByTimeAsync(20_000);
    await assertion;
  } finally {
    jest.useRealTimers();
  }
});
