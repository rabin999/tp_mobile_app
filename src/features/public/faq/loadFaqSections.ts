import { appConfig } from '../../../app/config';
import { requestJson } from '../../../core/http';
import { faqPageLimit, parseFaqSections, type FaqSection } from './faq';

export type LoadFaqSections = (
  signal: AbortSignal,
) => Promise<readonly FaqSection[]>;

/**
 * Reads GET /faq-sections/all into the FAQ section cards.
 */
export async function loadFaqSections(
  signal: AbortSignal,
): Promise<readonly FaqSection[]> {
  const params = new URLSearchParams({ limit: String(faqPageLimit) });
  const body = await requestJson({
    url: `${appConfig.apiBaseUrl}/faq-sections/all?${params.toString()}`,
    signal,
  });

  return parseFaqSections(body);
}
