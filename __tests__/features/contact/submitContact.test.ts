import { submitContact } from '../../../src/features/contact/submitContact';
import { appHttpResult } from '../../core/appHttp';
import {
  requestJsonBody,
  ScriptedHttp,
  withFetch,
} from '../../core/scriptedHttp';

test('posts contact feedback', async () => {
  const http = new ScriptedHttp(appHttpResult);

  await withFetch(http.fetch, () =>
    submitContact(
      {
        topic: 'billing',
        fullName: 'Ada Lovelace',
        email: 'ada@example.com',
        message: 'Need help with a charge.',
      },
      new AbortController().signal,
    ),
  );

  expect(http.calls).toHaveLength(1);
  expect(http.calls[0].init.method).toBe('POST');
  expect(requestJsonBody(http.calls[0].init)).toEqual({
    topic: 'billing',
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'Need help with a charge.',
  });
});

test('omits a blank name', async () => {
  const http = new ScriptedHttp(appHttpResult);

  await withFetch(http.fetch, () =>
    submitContact(
      {
        topic: 'general',
        fullName: '',
        email: 'ada@example.com',
        message: 'No name on this message.',
      },
      new AbortController().signal,
    ),
  );

  expect(requestJsonBody(http.calls[0].init)).toEqual({
    topic: 'general',
    email: 'ada@example.com',
    message: 'No name on this message.',
  });
});
