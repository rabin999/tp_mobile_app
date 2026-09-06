import { AppException } from '../../../src/core/errors/AppException';
import { httpMessages } from '../../../src/core/http';
import {
  loadContactTopics,
  parseContactTopics,
} from '../../../src/features/contact/loadContactTopics';

test('loads General, Transaction, and Billing from the live API', async () => {
  const topics = await loadContactTopics(new AbortController().signal);

  expect(topics).toEqual([
    { label: 'General', value: 'general' },
    { label: 'Transaction', value: 'transaction' },
    { label: 'Billing', value: 'billing' },
  ]);
});

test('rejects a payload that is not the topics list', () => {
  expect(() => parseContactTopics({ topic: 'General' })).toThrow(
    new AppException(httpMessages.unavailable),
  );
});
