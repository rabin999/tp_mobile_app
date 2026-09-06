import { z } from 'zod';

import { fieldErrorsFromZod } from '../../core/validation';
import { loginText } from './loginText';

export const loginRoles = ['CUSTOMER', 'SERVICE_PROVIDER'] as const;

export type LoginRole = (typeof loginRoles)[number];

export const loginDraftSchema = z.object({
  username: z.string().trim().min(1, { message: loginText.usernameRequired }),
  password: z.string().trim().min(1, { message: loginText.passwordRequired }),
  persistLogin: z.boolean(),
  loginAs: z.enum(loginRoles),
});

export type LoginDraft = z.infer<typeof loginDraftSchema>;

export type LoginField = 'username' | 'password';

export type LoginFieldErrors = Partial<Record<LoginField, string>>;

export const emptyLoginDraft: LoginDraft = {
  username: '',
  password: '',
  persistLogin: false,
  loginAs: 'CUSTOMER',
};

export function clearLoginFieldError(
  errors: LoginFieldErrors,
  field: LoginField,
): LoginFieldErrors {
  if (errors[field] == null) {
    return errors;
  }

  const next = { ...errors };

  delete next[field];

  return next;
}

export type LoginValidation =
  | { ok: true; draft: LoginDraft }
  | { ok: false; errors: LoginFieldErrors };

/**
 * Parses the login form with `loginDraftSchema`.
 */
export function validateLoginDraft(draft: LoginDraft): LoginValidation {
  const parsed = loginDraftSchema.safeParse(draft);

  if (parsed.success) {
    return { ok: true, draft: parsed.data };
  }

  return { ok: false, errors: fieldErrorsFromZod(parsed.error) };
}
