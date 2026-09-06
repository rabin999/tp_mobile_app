import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import {
  loadContactTopics,
  parseContactTopics,
} from '../../../src/features/contact/loadContactTopics';
import { appHttpResult } from '../../core/appHttp';
import { ScriptedHttp, withFetch } from '../../core/scriptedHttp';

test('loads General, Transaction, and Billing', async () => {
  const http = new ScriptedHttp(appHttpResult);
  const topics = await withFetch(http.fetch, () =>
    loadContactTopics(new AbortController().signal),
  );

  expect(topics).toEqual([
    { label: 'General', value: 'general' },
    { label: 'Transaction', value: 'transaction' },
    { label: 'Billing', value: 'billing' },
  ]);
  expect(http.calls).toHaveLength(1);
});

test('rejects a payload that is not the topics list', () => {
  expect(() => parseContactTopics({ topic: 'General' })).toThrow(
    new AppException(httpMessages.unavailable),
  );
});
