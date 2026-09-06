import { appConfig } from '../../app/config';
import { requestJson } from '../../core/http';
import type { ContactDraft } from './contact';

export type SubmitContact = (
  draft: ContactDraft,
  signal: AbortSignal,
) => Promise<void>;

/**
 * Posts the contact form to POST /general-feedbacks.
 */
export async function submitContact(
  draft: ContactDraft,
  signal: AbortSignal,
): Promise<void> {
  await requestJson({
    url: `${appConfig.apiBaseUrl}/general-feedbacks`,
    method: 'POST',
    body: generalFeedbackBody(draft),
    signal,
  });
}

function generalFeedbackBody(draft: ContactDraft): Record<string, string> {
  const body: Record<string, string> = {
    topic: draft.topic,
    email: draft.email,
    message: draft.message,
  };

  if (draft.fullName.length > 0) {
    body.fullName = draft.fullName;
  }

  return body;
}
