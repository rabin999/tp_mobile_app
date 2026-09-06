import { act, renderHook, waitFor } from '@testing-library/react-native';

import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import type { ContactTopic } from '../../../src/features/contact/contact';
import {
  useContactForm,
  useContactTopics,
} from '../../../src/features/contact/useContact';

const general: ContactTopic = { label: 'General', value: 'general' };

async function fillValidDraft(result: {
  current: ReturnType<typeof useContactForm>;
}): Promise<void> {
  await act(() => {
    result.current.setEmail('ada@example.com');
    result.current.setMessage('Need help with billing.');
  });
}

test('stays loading until topics arrive', async () => {
  let finish!: (topics: readonly ContactTopic[]) => void;
  const load = () =>
    new Promise<readonly ContactTopic[]>(resolve => {
      finish = resolve;
    });

  const { result } = await renderHook(() => useContactTopics(load));

  expect(result.current.loading).toBe(true);
  expect(result.current.topics).toEqual([]);

  await act(() => {
    finish([general]);
  });

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.topics).toEqual([general]);
  expect(result.current.error).toBeUndefined();
});

test('surfaces a failed load and retry fetches again', async () => {
  let calls = 0;
  const load = () => {
    calls += 1;
    if (calls === 1) {
      return Promise.reject(new AppException(httpMessages.unavailable));
    }

    return Promise.resolve([general]);
  };

  const { result } = await renderHook(() => useContactTopics(load));

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  expect(result.current.error).toBe(httpMessages.unavailable);
  expect(result.current.topics).toEqual([]);

  await act(() => {
    result.current.retry();
  });

  await waitFor(() => {
    expect(result.current.topics).toEqual([general]);
  });
  expect(result.current.error).toBeUndefined();
  expect(calls).toBe(2);
});

test.each([
  ['offline', httpMessages.offline],
  ['timeout', httpMessages.timeout],
  ['API down', httpMessages.unavailable],
] as const)(
  '%s submit error stays on the form and shows the shared HTTP text',
  async (_label, message) => {
    const submit = () => Promise.reject(new AppException(message));
    const { result } = await renderHook(() => useContactForm(submit));

    await fillValidDraft(result);

    let sent = true;

    await act(async () => {
      sent = await result.current.send();
    });

    expect(sent).toBe(false);
    expect(result.current.formError).toBe(message);
    expect(result.current.sending).toBe(false);
    expect(result.current.draft.email).toBe('ada@example.com');
    expect(result.current.draft.message).toBe('Need help with billing.');
  },
);

test('an unexpected submit throw uses the generic failed text', async () => {
  const submit = () => Promise.reject(new Error('boom'));
  const { result } = await renderHook(() => useContactForm(submit));

  await fillValidDraft(result);

  let sent = true;

  await act(async () => {
    sent = await result.current.send();
  });

  expect(sent).toBe(false);
  expect(result.current.formError).toBe(httpMessages.failed);
  expect(result.current.sending).toBe(false);
});
