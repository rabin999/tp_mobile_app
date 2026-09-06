# Core

Every change. Specialized files add detail; they do not override the conflict order below.

## Outcome over task

Understand the intended behavior, dependents, edge cases, and failure modes before editing. Prefer the simplest implementation that is actually correct. Compiling is not done.

## What is authoritative

| Question | Authority |
| --- | --- |
| What should it do? | Product requirements, then **web mobile** business behavior (states, validation, permissions, calculations, workflows). Do not invent or drop rules. Do not take desktop web. |
| How should mobile look? | **Web mobile** layout (alignment, grouping, hierarchy, type, color as they appear), painted with `Tp*` + `src/ui/theme/`. Do not restyle a page into different chrome ([ui.md](ui.md)). |
| How should TypeScript be written? | Prettier + `tsconfig.json` + ESLint (`@react-native`) + [structure.md](structure.md). |
| How did web implement it? | **Web mobile only.** Protocol: [web.md](web.md). Do not port React DOM/MUI/debt. |
| What does the API accept and return? | **Swagger.** Do not inspect API packages or validators. Use API source types only when Swagger does not document them. |

Existing mobile code is evidence of intent, not a template. Do not copy workarounds forward.

If the work exists on web, follow [web.md](web.md) before writing code. Do not assume.

## Put each decision once

These names say where a value belongs, not which rule file to open.

| Scope | Belongs in |
| --- | --- |
| `global` / `shared` | Theme, tokens, `Tp*`, `src/core`, `src/app` |
| `partial` | A small shared feature module — not the kit |
| `local` | The one component/screen that owns it |

Do not duplicate business rules across UI, domain, and API. Do not invent a shared type because two UIs look similar.

## Before you write

Ask: what behavior? who depends? empty / loading / fail? global vs local? **who owns this computation (view vs helper vs core)?** copying debt? what breaks?

If it exists on web, stop until [web.md](web.md) steps 1–4 are done. If the answer is “the JSX file also does pixel math / URL policy / DTO parsing,” stop and split — [modularity.md](modularity.md).

Failure is product behavior: loading, empty, validation, authz, business error, timeout, offline, cancel, partial, retryable vs not. Accurate user-facing text; no internals.

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

That runs Prettier, ESLint, `tsc --noEmit`, and Jest. UI: exercise the flow (gallery, tests, or a device), including empty / loading / error / disabled. A screenshot of the app alone is not behavior verification. Leak-prone work also follows [memory.md](memory.md). HTTP client work also follows [network.md](network.md).

Then [audit.md](audit.md) — **required**, not optional. Rules audit of the finished code (second agent when possible), then pixel match vs web mobile when the screen exists on web. Fix findings in the same change. Work is not done until both gates pass.

What to load next: [index.md](index.md).
