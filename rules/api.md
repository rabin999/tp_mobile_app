# API, async, and failure

Load when talking to backends, handling async work, or designing loading/error UX. There is **no** HTTP client yet — introduce one at a data boundary, not inside a component.

## Read the contract first

**Why:** The web client’s TypeScript types are not the server. Know auth, nullability, validation-error shape (field vs global), pagination, idempotency, and what empty vs 404 vs 403 means before writing a call.

## Boundary

**Why:** Unstable or poorly named payloads must not become the app’s model. An adapter earns its keep when it protects that boundary — not as a repository stack for one obvious endpoint.

Parse at the edge. Components take application types (or a small view model), not `Record<string, unknown>`.

```tsx
// bad
<Text>{json.display_name as string}</Text>

// good — map once at the data edge
<Text>{profile.displayName}</Text>
```

Validation that is a **business** rule (end ≥ start) lives in one place. UI and mapping both use it.

## Failures: branch on meaningful subtypes

**Why:** Callers need to distinguish “sign in again” from “try later” without parsing message strings. Kinds belong on the type, not as `throw new Error('oops')`.

Types live in `src/core/errors/AppException.ts`. Today that file is a single class with a `message`. **Add subclasses there when a caller must branch** — do not invent a taxonomy in advance.

```ts
// src/core/errors/AppException.ts — add when needed
export class UnauthorizedException extends AppException {
  constructor(message = 'Please sign in.') {
    super(message);
  }
}

export class ValidationException extends AppException {
  constructor(
    message: string,
    readonly field?: string,
  ) {
    super(message);
  }
}

// mapping at the edge
try {
  return await api.fetchProfile();
} catch (error) {
  if (error instanceof SyntaxError) {
    appLogger.debug('profile: malformed response');
    throw new AppException('Something went wrong.');
  }
  throw error;
}
```

User copy is accurate and useful: no paths, status integers, or type names. Log **why** through `appLogger` (`src/core/logging/appLogger.ts`). Never log tokens, OTP, or PII ([security.md](security.md)). Catch to map, retry, or present — never swallow.

## Async and mobile network

**Why:** Mobile requests die with the screen, get superseded by newer searches, and run on flaky networks. Treat timeout, cancel, and stale responses as expected.

- `async`/`await`. Canceled work is not a server error — no toast.
- Cancel on unmount. Ignore stale responses when a newer request wins (`AbortController`, request ids).
- Duplicate taps must not double-create (`TpButton` `loading` or disable submit).
- Automatic retry only if **idempotent** (or the user taps retry). Do not auto-retry creating POSTs. Back off if you retry in code.
- No disk cache, offline-first, or optimistic UI unless the product must work offline. The image pipeline + `TpImage` are enough for images.
- Refresh must not append duplicate list pages.

## States are product behavior

Design loading, success, empty, validation, authn/authz, business error, transient/5xx, timeout, malformed, offline, partial, cancel. Empty ≠ error. Malformed: log internally, generic UI.

Components: `TpSpinner` (size / color) / `TpButton` `loading` / `TpSearchField` `loading`, `TpStatusPage` (or `TpEmptyState` / `TpErrorState`), `TpSnackbar`, field `errorText`. See `src/ui/components/index.ts`. Center `TpSpinner` for a blocking page.
