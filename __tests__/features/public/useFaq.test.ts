import { act, renderHook, waitFor } from '@testing-library/react-native';

import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import type { FaqItem, FaqSection } from '../../../src/features/public/faq/faq';
import { useFaq } from '../../../src/features/public/faq/useFaq';

const tasks: FaqSection = { id: 1, title: 'Tasks' };
const billing: FaqSection = { id: 2, title: 'Billing' };
const postTask: FaqItem = {
  id: 1,
  question: 'How to post a task ?',
  answer: 'Post it from the app.',
};

test('stays loading until sections arrive, then loads questions', async () => {
  let finishSections!: (rows: readonly FaqSection[]) => void;
  const loadSections = () =>
    new Promise<readonly FaqSection[]>(resolve => {
      finishSections = resolve;
    });
  const loadItems = jest.fn(async () => [postTask]);

  const { result } = await renderHook(() => useFaq(loadSections, loadItems));

  expect(result.current.sectionsLoading).toBe(true);
  expect(result.current.sections).toEqual([]);

  await act(() => {
    finishSections([tasks]);
  });

  await waitFor(() => {
    expect(result.current.sectionsLoading).toBe(false);
  });
  expect(result.current.selectedSection).toEqual(tasks);
  await waitFor(() => {
    expect(result.current.faqs).toEqual([postTask]);
  });
  expect(loadItems).toHaveBeenCalledWith(
    expect.objectContaining({
      sectionId: 1,
      audienceType: 'CUSTOMER',
    }),
  );
});

test('surfaces a failed section load and retry fetches again', async () => {
  let calls = 0;
  const loadSections = () => {
    calls += 1;
    if (calls === 1) {
      return Promise.reject(new AppException(httpMessages.unavailable));
    }

    return Promise.resolve([tasks]);
  };
  const loadItems = async () => [postTask];

  const { result } = await renderHook(() => useFaq(loadSections, loadItems));

  await waitFor(() => {
    expect(result.current.sectionsLoading).toBe(false);
  });
  expect(result.current.error).toBe(httpMessages.unavailable);
  expect(result.current.sections).toEqual([]);

  await act(() => {
    result.current.retry();
  });

  await waitFor(() => {
    expect(result.current.sections).toEqual([tasks]);
  });
  expect(result.current.error).toBeUndefined();
  expect(calls).toBe(2);
});

test('section timeout and offline stay on the page error until retry', async () => {
  let calls = 0;
  const loadSections = () => {
    calls += 1;
    if (calls === 1) {
      return Promise.reject(new AppException(httpMessages.timeout));
    }

    if (calls === 2) {
      return Promise.reject(new AppException(httpMessages.offline));
    }

    return Promise.resolve([tasks]);
  };
  const loadItems = async () => [postTask];

  const { result } = await renderHook(() => useFaq(loadSections, loadItems));

  await waitFor(() => {
    expect(result.current.error).toBe(httpMessages.timeout);
  });

  await act(() => {
    result.current.retry();
  });
  await waitFor(() => {
    expect(result.current.error).toBe(httpMessages.offline);
  });

  await act(() => {
    result.current.retry();
  });
  await waitFor(() => {
    expect(result.current.faqs).toEqual([postTask]);
  });
  expect(result.current.error).toBeUndefined();
});

test('switching audience reloads the first section', async () => {
  const loadSections = async () => [tasks, billing];
  const loadItems = jest.fn(async ({ sectionId, audienceType }) => {
    if (audienceType === 'SERVICE_PROVIDER') {
      return [];
    }

    return sectionId === 1 ? [postTask] : [];
  });

  const { result } = await renderHook(() => useFaq(loadSections, loadItems));

  await waitFor(() => {
    expect(result.current.faqs).toEqual([postTask]);
  });

  await act(() => {
    result.current.selectSection(2);
  });
  await waitFor(() => {
    expect(result.current.selectedSection?.id).toBe(2);
  });

  await act(() => {
    result.current.setAudience('SERVICE_PROVIDER');
  });

  await waitFor(() => {
    expect(result.current.selectedSection?.id).toBe(1);
  });
  expect(result.current.audienceType).toBe('SERVICE_PROVIDER');
  await waitFor(() => {
    expect(result.current.faqs).toEqual([]);
  });
});

test('surfaces timeout, offline, and a failed questions load with retry', async () => {
  const loadSections = async () => [tasks];
  let itemCalls = 0;
  const loadItems = () => {
    itemCalls += 1;
    if (itemCalls === 1) {
      return Promise.reject(new AppException(httpMessages.timeout));
    }

    if (itemCalls === 2) {
      return Promise.reject(new AppException(httpMessages.offline));
    }

    if (itemCalls === 3) {
      return Promise.reject(new AppException(httpMessages.unavailable));
    }

    return Promise.resolve([postTask]);
  };

  const { result } = await renderHook(() => useFaq(loadSections, loadItems));

  await waitFor(() => {
    expect(result.current.faqsError).toBe(httpMessages.timeout);
  });
  expect(result.current.sectionsLoading).toBe(false);
  expect(result.current.faqs).toEqual([]);

  await act(() => {
    result.current.retryFaqs();
  });
  await waitFor(() => {
    expect(result.current.faqsError).toBe(httpMessages.offline);
  });

  await act(() => {
    result.current.retryFaqs();
  });
  await waitFor(() => {
    expect(result.current.faqsError).toBe(httpMessages.unavailable);
  });

  await act(() => {
    result.current.retryFaqs();
  });
  await waitFor(() => {
    expect(result.current.faqs).toEqual([postTask]);
  });
  expect(result.current.faqsError).toBeUndefined();
});

test('leaving while sections are in flight does not keep the error', async () => {
  const loadSections = () =>
    new Promise<readonly FaqSection[]>(() => undefined);
  const loadItems = jest.fn(async () => [postTask]);

  const { result, unmount } = await renderHook(() =>
    useFaq(loadSections, loadItems),
  );

  expect(result.current.sectionsLoading).toBe(true);
  unmount();
  expect(loadItems).not.toHaveBeenCalled();
});

test('search filters the loaded questions and accordion toggles one open', async () => {
  const loadSections = async () => [tasks];
  const loadItems = async () => [postTask];

  const { result } = await renderHook(() => useFaq(loadSections, loadItems));

  await waitFor(() => {
    expect(result.current.faqs).toEqual([postTask]);
  });

  await act(() => {
    result.current.setQuery('task');
  });
  expect(result.current.visibleFaqs).toEqual([postTask]);

  await act(() => {
    result.current.setQuery('zzz');
  });
  expect(result.current.visibleFaqs).toEqual([]);

  await act(() => {
    result.current.setQuery('');
    result.current.toggleQuestion(1);
  });
  expect(result.current.openId).toBe(1);

  await act(() => {
    result.current.toggleQuestion(1);
  });
  expect(result.current.openId).toBeNull();
});
