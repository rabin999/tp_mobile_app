import { z } from 'zod';

import { appConfig } from '../../app/config';
import { AppException } from '../../core/errors/AppException';
import { httpMessages, requestJson } from '../../core/http';
import { contactTopicValues, type ContactTopic } from './contact';

const topicRowSchema = z.object({
  topic: z.string().min(1),
  value: z.enum(contactTopicValues),
});

export type LoadContactTopics = (
  signal: AbortSignal,
) => Promise<readonly ContactTopic[]>;

/**
 * Reads GET /general-feedbacks/topics/get-all into the topic picker.
 */
export async function loadContactTopics(
  signal: AbortSignal,
): Promise<readonly ContactTopic[]> {
  const body = await requestJson({
    url: `${appConfig.apiBaseUrl}/general-feedbacks/topics/get-all`,
    signal,
  });

  return parseContactTopics(body);
}

/**
 * Maps the topics payload to picker rows.
 */
export function parseContactTopics(body: unknown): ContactTopic[] {
  const parsed = z.array(topicRowSchema).safeParse(body);

  if (!parsed.success) {
    throw new AppException(httpMessages.unavailable);
  }

  return parsed.data.map(row => ({
    label: row.topic,
    value: row.value,
  }));
}
