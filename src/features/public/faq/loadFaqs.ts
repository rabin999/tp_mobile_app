import { appConfig } from '../../../app/config';
import { requestJson } from '../../../core/http';
import { faqPageLimit, parseFaqs, type FaqAudience, type FaqItem } from './faq';

export type LoadFaqsQuery = {
  sectionId: number;
  audienceType?: FaqAudience;
  signal: AbortSignal;
};

export type LoadFaqs = (query: LoadFaqsQuery) => Promise<readonly FaqItem[]>;

/**
 * Reads GET /faqs/all for one section and optional audience filter.
 */
export async function loadFaqs(
  query: LoadFaqsQuery,
): Promise<readonly FaqItem[]> {
  const params = new URLSearchParams({
    limit: String(faqPageLimit),
    sectionId: String(query.sectionId),
  });

  if (query.audienceType != null) {
    params.set('audienceType', query.audienceType);
  }

  const body = await requestJson({
    url: `${appConfig.apiBaseUrl}/faqs/all?${params.toString()}`,
    signal: query.signal,
  });

  return parseFaqs(body);
}
