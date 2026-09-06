import { z } from 'zod';

import { appConfig } from '../../app/config';
import { AppException } from '../../core/errors/AppException';
import { httpMessages, requestJson } from '../../core/http';
import { appLogger } from '../../core/logging/appLogger';
import type { LoginDraft } from './login';

export type SubmitLogin = (
  draft: LoginDraft,
  signal: AbortSignal,
) => Promise<void>;

const loginResponseSchema = z.object({
  AccessToken: z.string().min(1),
  ExpiresIn: z.number(),
  TokenType: z.string().min(1),
});

/**
 * Posts credentials to POST /auth/login.
 */
export async function submitLogin(
  draft: LoginDraft,
  signal: AbortSignal,
): Promise<void> {
  const body = await requestJson({
    url: `${appConfig.apiBaseUrl}/auth/login`,
    method: 'POST',
    body: {
      username: draft.username,
      password: draft.password,
      loginAs: draft.loginAs,
      persistLogin: draft.persistLogin,
    },
    signal,
  });

  parseLoginResponse(body);
}

/**
 * Confirms a login payload has the Swagger token fields, then discards them.
 */
export function parseLoginResponse(body: unknown): void {
  const parsed = loginResponseSchema.safeParse(body);

  if (!parsed.success) {
    appLogger.debug('login: malformed response');
    throw new AppException(httpMessages.failed);
  }
}
