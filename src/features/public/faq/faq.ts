import { z } from 'zod';

import { appConfig } from '../../../app/config';
import { AppException } from '../../../core/errors/AppException';
import { httpMessages } from '../../../core/http';

export const faqAudiences = ['CUSTOMER', 'SERVICE_PROVIDER'] as const;

export type FaqAudience = (typeof faqAudiences)[number];

export type FaqSection = {
  id: number;
  title: string;
  iconUrl?: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const faqPageLimit = 100;

const sectionRowSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  iconMeta: z.unknown().optional(),
});

const faqRowSchema = z.object({
  id: z.number(),
  question: z.string().min(1),
  answer: z.string(),
});

const listSchema = z.object({
  data: z.array(z.unknown()).optional(),
});

/**
 * True when the section has icon metadata, so media should be requested.
 */
export function hasFaqSectionIcon(iconMeta: unknown): boolean {
  if (iconMeta == null || typeof iconMeta !== 'object') {
    return false;
  }

  if (Array.isArray(iconMeta)) {
    return false;
  }

  return Object.keys(iconMeta).length > 0;
}

/**
 * Maps GET /faq-sections/all into section cards.
 */
export function parseFaqSections(body: unknown): FaqSection[] {
  const parsed = listSchema.safeParse(body);

  if (!parsed.success) {
    throw new AppException(httpMessages.unavailable);
  }

  const rows: FaqSection[] = [];

  for (const item of parsed.data.data ?? []) {
    const row = sectionRowSchema.safeParse(item);

    if (!row.success) {
      throw new AppException(httpMessages.unavailable);
    }

    rows.push({
      id: row.data.id,
      title: row.data.title,
      iconUrl: sectionIconUrl(row.data.id, row.data.iconMeta),
    });
  }

  return rows;
}

/**
 * Maps GET /faqs/all into accordion rows with plain-text answers.
 */
export function parseFaqs(body: unknown): FaqItem[] {
  const parsed = listSchema.safeParse(body);

  if (!parsed.success) {
    throw new AppException(httpMessages.unavailable);
  }

  const rows: FaqItem[] = [];

  for (const item of parsed.data.data ?? []) {
    const row = faqRowSchema.safeParse(item);

    if (!row.success) {
      throw new AppException(httpMessages.unavailable);
    }

    rows.push({
      id: row.data.id,
      question: row.data.question,
      answer: faqAnswerText(row.data.answer),
    });
  }

  return rows;
}

/**
 * Client search over the loaded questions for the selected section.
 */
export function filterFaqsByQuestion(
  faqs: readonly FaqItem[],
  query: string,
): FaqItem[] {
  const needle = query.trim().toLowerCase();

  if (needle.length === 0) {
    return [...faqs];
  }

  return faqs.filter(faq => faq.question.toLowerCase().includes(needle));
}

/**
 * Strips FAQ HTML so the accordion can render native text.
 */
export function faqAnswerText(html: string): string {
  return html
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .replace(/<\s*\/\s*p\s*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sectionIconUrl(id: number, iconMeta: unknown): string | undefined {
  if (!hasFaqSectionIcon(iconMeta)) {
    return undefined;
  }

  return `${appConfig.apiBaseUrl}/faq-sections/media/${id}`;
}
