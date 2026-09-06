import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import type { LoginDraft } from '../../../src/features/login/login';
import {
  parseLoginResponse,
  submitLogin,
} from '../../../src/features/login/submitLogin';
import { jsonResponse, ScriptedHttp, withFetch } from '../../core/scriptedHttp';

const unknownDraft: LoginDraft = {
  username: `tp-app-login-missing-${Date.now()}`,
  password: 'not-a-real-password',
  loginAs: 'CUSTOMER',
  persistLogin: false,
};

const scriptedDraft: LoginDraft = {
  username: 'ada',
  password: 'password1',
  loginAs: 'CUSTOMER',
  persistLogin: false,
};

test('unknown credentials are rejected by the live API', async () => {
  await expect(
    submitLogin(unknownDraft, new AbortController().signal),
  ).rejects.toEqual(new AppException('Sorry, unable to find user'));
});

test('a complete token payload is accepted and discarded', () => {
  expect(() =>
    parseLoginResponse({
      AccessToken: 'token',
      ExpiresIn: 3600,
      TokenType: 'Bearer',
      RefreshToken: 'extra',
    }),
  ).not.toThrow();
});

test('a malformed login payload is a generic failure', () => {
  expect(() => parseLoginResponse({})).toThrow(
    new AppException(httpMessages.failed),
  );
});

test('maps a down API, timeout, and offline through login submit', async () => {
  const down = new ScriptedHttp(() => jsonResponse(500));

  await expect(
    withFetch(down.fetch, () =>
      submitLogin(scriptedDraft, new AbortController().signal),
    ),
  ).rejects.toEqual(new AppException(httpMessages.unavailable));
  expect(down.calls).toHaveLength(1);

  const offline = new ScriptedHttp(
    () => new TypeError('Network request failed'),
  );

  await expect(
    withFetch(offline.fetch, () =>
      submitLogin(scriptedDraft, new AbortController().signal),
    ),
  ).rejects.toEqual(new AppException(httpMessages.offline));
  expect(offline.calls).toHaveLength(1);

  jest.useFakeTimers();
  try {
    const hung = new ScriptedHttp(() => new Promise(() => undefined));
    const pending = withFetch(hung.fetch, () =>
      submitLogin(scriptedDraft, new AbortController().signal),
    );

    await Promise.all([
      expect(pending).rejects.toEqual(new AppException(httpMessages.timeout)),
      jest.advanceTimersByTimeAsync(20_000),
    ]);
    expect(hung.calls).toHaveLength(1);
  } finally {
    jest.useRealTimers();
  }
});
