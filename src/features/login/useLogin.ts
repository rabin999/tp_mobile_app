import { useEffect, useRef, useState } from 'react';

import { isAbortError } from '../../core/async';
import { AppException } from '../../core/errors/AppException';
import { httpMessages } from '../../core/http';
import { appLogger } from '../../core/logging/appLogger';
import {
  clearLoginFieldError,
  emptyLoginDraft,
  validateLoginDraft,
  type LoginDraft,
  type LoginField,
  type LoginFieldErrors,
  type LoginRole,
} from './login';
import type { SubmitLogin } from './submitLogin';

/**
 * Holds login fields, validates them, and runs submit.
 */
export function useLoginForm(submit: SubmitLogin) {
  const [draft, setDraft] = useState<LoginDraft>(emptyLoginDraft);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState<string | undefined>();
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const submitAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      submitAbort.current?.abort();
    };
  }, []);

  const setField = <K extends keyof LoginDraft>(
    key: K,
    value: LoginDraft[K],
  ) => {
    setDraft(current => ({ ...current, [key]: value }));

    if (isErrorField(key)) {
      setFieldErrors(current => clearLoginFieldError(current, key));
    }
  };

  const send = async (): Promise<boolean> => {
    if (sendingRef.current) {
      return false;
    }

    const parsed = validateLoginDraft(draft);

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

      setDraft(emptyLoginDraft);
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

      appLogger.debug('login: submit failed');
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
    setUsername: (value: string) => setField('username', value),
    setPassword: (value: string) => setField('password', value),
    setPersistLogin: (value: boolean) => setField('persistLogin', value),
    setLoginAs: (value: LoginRole) => setField('loginAs', value),
    dismissFormError: () => setFormError(undefined),
    send,
  };
}

export type LoginFormModel = ReturnType<typeof useLoginForm>;

function isErrorField(key: keyof LoginDraft): key is LoginField {
  return key === 'username' || key === 'password';
}
