# Core

Every change. Specialized files add detail; they do not override the conflict order below.

## Outcome over task

Understand the intended behavior, dependents, edge cases, and failure modes before editing. Prefer the simplest implementation that is actually correct. Compiling is not done.

## What is authoritative

| Question | Authority |
| --- | --- |
| What should it do? | Product requirements, then **web-app business behavior** (states, validation, permissions, calculations, workflows). |
| How should mobile look? | `Tp*` components + `src/ui/theme/`. |
| How should TypeScript be written? | Prettier + `tsconfig.json` + ESLint (`@react-native`) + [structure.md](structure.md). |
| How did Flutter implement it? | **Evidence only.** Extract rules; do not port Widgets, `BuildContext`, or Dart idioms. |
| How did web implement it? | **Evidence only.** Extract rules; do not port React DOM/MUI/debt. |

Existing mobile code is evidence of intent, not a template. Do not copy workarounds forward.

## Put each decision once

These names say where a value belongs, not which rule file to open.

| Scope | Belongs in |
| --- | --- |
| `global` / `shared` | Theme, tokens, `Tp*`, `src/core`, `src/app` |
| `partial` | A small shared feature module — not the kit |
| `local` | The one component/screen that owns it |

Do not duplicate business rules across UI, domain, and API. Do not invent a shared type because two UIs look similar.

## Before you write

Ask: what behavior? who depends? empty / loading / fail? global vs local? copying debt? what breaks?

Failure is product behavior: loading, empty, validation, authz, business error, timeout, offline, cancel, partial, retryable vs not. Accurate copy; no internals.

Do not add offline cache, optimistic updates, automatic retries, persistence, or packages unless the product needs them. User-initiated retry is fine.

## Conflict order

1. Product correctness  
2. Security  
3. Reliability  
4. Maintainability  
5. These conventions  
6. Framework fashion  

Do not impose Clean Architecture, DDD, repositories, or factories as ceremony. Do not drive-by refactor. Architecture may differ by feature when responsibilities differ.

## Verify

```sh
npm run verify
```

That runs Prettier, ESLint, `tsc --noEmit`, and Jest. UI: exercise the flow (gallery, tests, or a device), including empty / loading / error / disabled. A screenshot is not verification.

What to load next: [README.md](README.md).
