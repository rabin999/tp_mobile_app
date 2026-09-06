import { act, renderHook } from '@testing-library/react-native';

import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import type { LoginDraft } from '../../../src/features/login/login';
import { loginText } from '../../../src/features/login/loginText';
import { useLoginForm } from '../../../src/features/login/useLogin';

async function fillValidDraft(result: {
  current: ReturnType<typeof useLoginForm>;
}): Promise<void> {
  await act(() => {
    result.current.setUsername('ada');
    result.current.setPassword('password1');
  });
}

test('empty send keeps the draft and sets field errors', async () => {
  const submit = jest.fn();
  const { result } = await renderHook(() => useLoginForm(submit));

  let sent = true;

  await act(async () => {
    sent = await result.current.send();
  });

  expect(sent).toBe(false);
  expect(submit).not.toHaveBeenCalled();
  expect(result.current.fieldErrors.username).toBe(loginText.usernameRequired);
  expect(result.current.fieldErrors.password).toBe(loginText.passwordRequired);
});

test('a second send while in flight is ignored', async () => {
  let calls = 0;
  let finish!: () => void;
  const submit = (_draft: LoginDraft, _signal: AbortSignal) => {
    calls += 1;
    return new Promise<void>(resolve => {
      finish = resolve;
    });
  };

  const { result } = await renderHook(() => useLoginForm(submit));

  await fillValidDraft(result);

  await act(async () => {
    const first = result.current.send();
    const second = await result.current.send();

    expect(second).toBe(false);
    expect(calls).toBe(1);
    finish();
    await first;
  });

  expect(result.current.sending).toBe(false);
});

test('an AppException from submit becomes the form error', async () => {
  const submit = () =>
    Promise.reject(new AppException('Sorry, unable to find user'));
  const { result } = await renderHook(() => useLoginForm(submit));

  await fillValidDraft(result);

  let sent = true;

  await act(async () => {
    sent = await result.current.send();
  });

  expect(sent).toBe(false);
  expect(result.current.formError).toBe('Sorry, unable to find user');
  expect(result.current.draft.username).toBe('ada');
  expect(result.current.sending).toBe(false);
});

test.each([
  ['offline', httpMessages.offline],
  ['timeout', httpMessages.timeout],
  ['API down', httpMessages.unavailable],
] as const)(
  '%s submit error stays on the form and shows the shared HTTP text',
  async (_label, message) => {
    const submit = () => Promise.reject(new AppException(message));
    const { result } = await renderHook(() => useLoginForm(submit));

    await fillValidDraft(result);

    let sent = true;

    await act(async () => {
      sent = await result.current.send();
    });

    expect(sent).toBe(false);
    expect(result.current.formError).toBe(message);
    expect(result.current.sending).toBe(false);
    expect(result.current.draft.username).toBe('ada');
    expect(result.current.draft.loginAs).toBe('CUSTOMER');
  },
);

test('an unexpected submit throw uses the generic failed text', async () => {
  const submit = () => Promise.reject(new Error('boom'));
  const { result } = await renderHook(() => useLoginForm(submit));

  await fillValidDraft(result);

  let sent = true;

  await act(async () => {
    sent = await result.current.send();
  });

  expect(sent).toBe(false);
  expect(result.current.formError).toBe(httpMessages.failed);
  expect(result.current.sending).toBe(false);
});
