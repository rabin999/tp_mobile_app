import { useEffect, useRef, useState } from 'react';

import { isAbortError } from '../../core/async';
import { AppException } from '../../core/errors/AppException';
import { httpMessages } from '../../core/http';
import { appLogger } from '../../core/logging/appLogger';
import {
  clearContactFieldError,
  emptyContactDraft,
  validateContactDraft,
  type ContactDraft,
  type ContactField,
  type ContactFieldErrors,
  type ContactTopic,
} from './contact';
import type { LoadContactTopics } from './loadContactTopics';
import type { SubmitContact } from './submitContact';

/**
 * Holds contact form fields, validates them, and runs submit.
 */
export function useContactForm(submit: SubmitContact) {
  const [draft, setDraft] = useState<ContactDraft>(emptyContactDraft);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | undefined>();
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const submitAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      submitAbort.current?.abort();
    };
  }, []);

  const setField = <K extends keyof ContactDraft>(
    key: K,
    value: ContactDraft[K],
  ) => {
    setDraft(current => ({ ...current, [key]: value }));
    if (isErrorField(key)) {
      setFieldErrors(current => clearContactFieldError(current, key));
    }
  };

  const send = async (): Promise<boolean> => {
    if (sendingRef.current) {
      return false;
    }

    const parsed = validateContactDraft(draft);

    if (!parsed.ok) {
      setFieldErrors(parsed.errors);
      return false;
    }

    sendingRef.current = true;
    const controller = new AbortController();

    submitAbort.current = controller;
    setSending(true);
    setFormError(undefined);

    try {
      await submit(parsed.draft, controller.signal);
      if (controller.signal.aborted) {
        return false;
      }

      setDraft(emptyContactDraft);
      setFieldErrors({});
      return true;
    } catch (error) {
      if (controller.signal.aborted || isAbortError(error)) {
        return false;
      }

      if (error instanceof AppException) {
        setFormError(error.message);
        return false;
      }

      appLogger.debug('contact: submit failed');
      setFormError(httpMessages.failed);
      return false;
    } finally {
      if (!controller.signal.aborted) {
        sendingRef.current = false;
        setSending(false);
      }
    }
  };

  return {
    draft,
    fieldErrors,
    formError,
    sending,
    setTopic: (value: ContactDraft['topic']) => setField('topic', value),
    setFullName: (value: string) => setField('fullName', value),
    setEmail: (value: string) => setField('email', value),
    setMessage: (value: string) => setField('message', value),
    dismissFormError: () => setFormError(undefined),
    send,
  };
}

export type ContactFormModel = ReturnType<typeof useContactForm>;

/**
 * Loads the topic picker from GET /general-feedbacks/topics/get-all.
 */
export function useContactTopics(load: LoadContactTopics) {
  const [topics, setTopics] = useState<readonly ContactTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(undefined);
    setTopics([]);

    load(controller.signal)
      .then(next => {
        if (controller.signal.aborted) {
          return;
        }

        if (next.length === 0) {
          setError(httpMessages.unavailable);
          return;
        }

        setTopics(next);
      })
      .catch(caught => {
        if (controller.signal.aborted || isAbortError(caught)) {
          return;
        }

        appLogger.debug('contact: topics failed');
        if (!controller.signal.aborted) {
          setError(
            caught instanceof AppException
              ? caught.message
              : httpMessages.failed,
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [load, reloadToken]);

  return {
    topics,
    loading,
    error,
    retry: () => setReloadToken(token => token + 1),
  };
}

function isErrorField(key: keyof ContactDraft): key is ContactField {
  return key === 'topic' || key === 'email' || key === 'message';
}
