import {
  emptyContactDraft,
  validateContactDraft,
} from '../../../src/features/contact/contact';

test('requires email and message', () => {
  const result = validateContactDraft(emptyContactDraft);

  expect(result.ok).toBe(false);
  if (result.ok) {
    return;
  }

  expect(result.errors.email).toBe('Email is required');
  expect(result.errors.message).toBe('Message is required');
  expect(result.errors.topic).toBeUndefined();
});

test('rejects an invalid email and blank message padding', () => {
  const result = validateContactDraft({
    topic: 'billing',
    fullName: 'Ada',
    email: 'not-an-email',
    message: '   ',
  });

  expect(result.ok).toBe(false);
  if (result.ok) {
    return;
  }

  expect(result.errors.email).toBe('Enter a valid email address');
  expect(result.errors.message).toBe('Message is required');
});

test('accepts a complete draft and returns it trimmed for submit', () => {
  const result = validateContactDraft({
    topic: 'general',
    fullName: '  Ada Lovelace  ',
    email: '  ada@example.com  ',
    message: '  I need help with my account.  ',
  });

  expect(result).toEqual({
    ok: true,
    draft: {
      topic: 'general',
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I need help with my account.',
    },
  });
});
