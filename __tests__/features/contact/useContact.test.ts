import { act, renderHook, waitFor } from '@testing-library/react-native';

import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import type { ContactTopic } from '../../../src/features/contact/contact';
import { useContactTopics } from '../../../src/features/contact/useContact';

const general: ContactTopic = { label: 'General', value: 'general' };

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
