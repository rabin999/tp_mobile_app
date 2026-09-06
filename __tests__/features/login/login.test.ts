import {
  emptyLoginDraft,
  validateLoginDraft,
} from '../../../src/features/login/login';
import { loginText } from '../../../src/features/login/loginText';

test('requires username and password', () => {
  const result = validateLoginDraft(emptyLoginDraft);

  expect(result.ok).toBe(false);
  if (result.ok) {
    return;
  }

  expect(result.errors.username).toBe(loginText.usernameRequired);
  expect(result.errors.password).toBe(loginText.passwordRequired);
});

test('rejects blank padding on both fields', () => {
  const result = validateLoginDraft({
    username: '   ',
    password: '   ',
    persistLogin: false,
    loginAs: 'CUSTOMER',
  });

  expect(result.ok).toBe(false);
  if (result.ok) {
    return;
  }

  expect(result.errors.username).toBe(loginText.usernameRequired);
  expect(result.errors.password).toBe(loginText.passwordRequired);
});

test('accepts a complete draft and returns it trimmed for submit', () => {
  const result = validateLoginDraft({
    username: '  ada  ',
    password: '  secret12  ',
    persistLogin: true,
    loginAs: 'SERVICE_PROVIDER',
  });

  expect(result).toEqual({
    ok: true,
    draft: {
      username: 'ada',
      password: 'secret12',
      persistLogin: true,
      loginAs: 'SERVICE_PROVIDER',
    },
  });
});
