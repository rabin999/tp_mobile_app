import { useEffect, useState } from 'react';

import { isAbortError } from '../../../core/async';
import { AppException } from '../../../core/errors/AppException';
import { httpMessages } from '../../../core/http';
import { appLogger } from '../../../core/logging/appLogger';
import {
  filterFaqsByQuestion,
  type FaqAudience,
  type FaqItem,
  type FaqSection,
} from './faq';
import type { LoadFaqs } from './loadFaqs';
import type { LoadFaqSections } from './loadFaqSections';

/**
 * Loads FAQ sections, then questions for the selected section and audience.
 */
export function useFaq(loadSections: LoadFaqSections, loadItems: LoadFaqs) {
  const [sections, setSections] = useState<readonly FaqSection[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<
    number | undefined
  >();
  const [audienceType, setAudienceType] = useState<FaqAudience>('CUSTOMER');
  const [faqs, setFaqs] = useState<readonly FaqItem[]>([]);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [faqsLoading, setFaqsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [faqsError, setFaqsError] = useState<string | undefined>();
  const [reloadToken, setReloadToken] = useState(0);
  const [faqsReloadToken, setFaqsReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(undefined);
    setFaqsError(undefined);
    setSections([]);
    setSelectedSectionId(undefined);
    setFaqs([]);
    setQuery('');
    setOpenId(null);

    loadSections(controller.signal)
      .then(next => {
        if (controller.signal.aborted) {
          return;
        }

        setSections(next);
        setSelectedSectionId(next[0]?.id);
        setLoading(false);
      })
      .catch(caught => {
        if (controller.signal.aborted || isAbortError(caught)) {
          return;
        }

        appLogger.debug('faq: sections failed');
        if (!controller.signal.aborted) {
          setError(
            caught instanceof AppException
              ? caught.message
              : httpMessages.failed,
          );
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [loadSections, reloadToken]);

  useEffect(() => {
    if (selectedSectionId == null) {
      setFaqs([]);
      setFaqsLoading(false);
      setFaqsError(undefined);
      return;
    }

    const controller = new AbortController();

    setFaqsLoading(true);
    setFaqsError(undefined);
    setFaqs([]);
    setQuery('');
    setOpenId(null);

    loadItems({
      sectionId: selectedSectionId,
      audienceType,
      signal: controller.signal,
    })
      .then(next => {
        if (controller.signal.aborted) {
          return;
        }

        setFaqs(next);
      })
      .catch(caught => {
        if (controller.signal.aborted || isAbortError(caught)) {
          return;
        }

        appLogger.debug('faq: questions failed');
        if (!controller.signal.aborted) {
          setFaqsError(
            caught instanceof AppException
              ? caught.message
              : httpMessages.failed,
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setFaqsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [audienceType, loadItems, selectedSectionId, faqsReloadToken]);

  const selectedSection = sections.find(
    section => section.id === selectedSectionId,
  );

  return {
    loading,
    error,
    sections,
    selectedSection,
    faqs,
    faqsLoading,
    faqsError,
    audienceType,
    query,
    visibleFaqs: filterFaqsByQuestion(faqs, query),
    openId,
    retry: () => setReloadToken(token => token + 1),
    retryFaqs: () => setFaqsReloadToken(token => token + 1),
    setAudience: (next: FaqAudience) => {
      if (audienceType === next) {
        return;
      }

      setAudienceType(next);
      setSelectedSectionId(sections[0]?.id);
    },
    selectSection: (id: number) => setSelectedSectionId(id),
    setQuery,
    toggleQuestion: (id: number) => {
      setOpenId(current => (current === id ? null : id));
    },
  };
}

export type FaqModel = ReturnType<typeof useFaq>;
