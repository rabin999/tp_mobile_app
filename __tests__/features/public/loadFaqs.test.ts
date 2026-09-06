import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import { loadFaqSections } from '../../../src/features/public/faq/loadFaqSections';
import { loadFaqs } from '../../../src/features/public/faq/loadFaqs';
import { jsonResponse, ScriptedHttp, withFetch } from '../../core/scriptedHttp';

test('loads the Tasks section from the live API', async () => {
  const sections = await loadFaqSections(new AbortController().signal);

  expect(sections).toEqual([
    expect.objectContaining({ id: 1, title: 'Tasks' }),
  ]);
});

test('maps a down API, timeout, and offline through the FAQ loaders', async () => {
  const down = new ScriptedHttp(() => jsonResponse(500));

  await expect(
    withFetch(down.fetch, () => loadFaqSections(new AbortController().signal)),
  ).rejects.toEqual(new AppException(httpMessages.unavailable));

  const offline = new ScriptedHttp(
    () => new TypeError('Network request failed'),
  );

  await expect(
    withFetch(offline.fetch, () =>
      loadFaqs({
        sectionId: 1,
        audienceType: 'CUSTOMER',
        signal: new AbortController().signal,
      }),
    ),
  ).rejects.toEqual(new AppException(httpMessages.offline));

  jest.useFakeTimers();
  try {
    const hung = new ScriptedHttp(() => new Promise(() => undefined));
    const pending = withFetch(hung.fetch, () =>
      loadFaqs({
        sectionId: 1,
        signal: new AbortController().signal,
      }),
    );

    await Promise.all([
      expect(pending).rejects.toEqual(new AppException(httpMessages.timeout)),
      jest.advanceTimersByTimeAsync(20_000),
    ]);
  } finally {
    jest.useRealTimers();
  }
});

test('loads customer FAQs for Tasks and none for providers', async () => {
  const signal = new AbortController().signal;
  const customer = await loadFaqs({
    sectionId: 1,
    audienceType: 'CUSTOMER',
    signal,
  });
  const provider = await loadFaqs({
    sectionId: 1,
    audienceType: 'SERVICE_PROVIDER',
    signal,
  });

  expect(customer[0]?.question).toBe('How to post a task ?');
  expect(customer[0]?.answer.includes('<p>')).toBe(false);
  expect(customer[0]?.answer.length).toBeGreaterThan(0);
  expect(provider).toEqual([]);
});
