import { z } from 'zod';

import { fieldErrorsFromZod } from '../../core/validation';
import { contactText } from './contactText';

export const contactTopicValues = [
  'general',
  'transaction',
  'billing',
] as const;

export type ContactTopicValue = (typeof contactTopicValues)[number];

export type ContactTopic = {
  label: string;
  value: ContactTopicValue;
};

export const contactDraftSchema = z.object({
  topic: z.enum(contactTopicValues, {
    errorMap: () => ({ message: contactText.topicInvalid }),
  }),
  fullName: z.string().trim(),
  email: z
    .string()
    .trim()
    .min(1, { message: contactText.emailRequired })
    .email({ message: contactText.emailInvalid }),
  message: z.string().trim().min(1, { message: contactText.messageRequired }),
});

export type ContactDraft = z.infer<typeof contactDraftSchema>;

export type ContactField = 'topic' | 'email' | 'message';

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export const emptyContactDraft: ContactDraft = {
  topic: 'general',
  fullName: '',
  email: '',
  message: '',
};

export function topicForValue(
  topics: readonly ContactTopic[],
  value: ContactTopicValue,
): ContactTopic | undefined {
  return topics.find(topic => topic.value === value);
}

export function clearContactFieldError(
  errors: ContactFieldErrors,
  field: ContactField,
): ContactFieldErrors {
  if (errors[field] == null) {
    return errors;
  }

  const next = { ...errors };

  delete next[field];

  return next;
}

export type ContactValidation =
  | { ok: true; draft: ContactDraft }
  | { ok: false; errors: ContactFieldErrors };

/**
 * Parses the contact form with `contactDraftSchema`.
 */
export function validateContactDraft(draft: ContactDraft): ContactValidation {
  const parsed = contactDraftSchema.safeParse(draft);

  if (parsed.success) {
    return { ok: true, draft: parsed.data };
  }

  return { ok: false, errors: fieldErrorsFromZod(parsed.error) };
}
