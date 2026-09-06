import { submitContact } from '../../../src/features/contact/submitContact';

test('posts contact feedback to the live API', async () => {
  await submitContact(
    {
      topic: 'billing',
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      message: `Need help with a charge ${Date.now()}.`,
    },
    new AbortController().signal,
  );
});

test('omits a blank name on the live API', async () => {
  await submitContact(
    {
      topic: 'general',
      fullName: '',
      email: 'ada@example.com',
      message: `No name on this message ${Date.now()}.`,
    },
    new AbortController().signal,
  );
});
