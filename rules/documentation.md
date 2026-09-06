# Comments and documentation

Load when writing JSDoc, comments, or changing `docs/` / README.

## Comments explain why

**Why:** The next reader already sees *what* the code does. They need the constraint, the web divergence, or the bug that forced a workaround.

```ts
// good — constraint that is not in the names
// Company founding year; the notice is © 2019–{now}, not © {now}.
const foundedYear = 2019;

// bad
// Set foundedYear to 2019.
const foundedYear = 2019;
```

Write a comment when: we **chose** different behavior than web (snackbar vs `left: 60px`, MUI slot names); an external system is wrong; a platform workaround needs a removal condition; a business rule is opaque (`foundedYear` in `tpCopyrightNotice`).

Do not narrate component trees, increment comments, or TODO the work in this change. Delete commented-out code. Rewrite comments that no longer match. `TODO`: remaining work + tracker id when one exists (`// TODO: [TP-123] …`).

## JSDoc

**Why:** Public kit APIs need a prose summary. JavaDoc `@param` / `@return` tags lost to sentences that name the symbol.

```ts
/**
 * Product button wrapping filled / outlined / text presses.
 *
 * Pass `label` in for l10n. `loading` shows a spinner and ignores presses.
 */
export function TpButton(props: TpButtonProps) { … }
```

```ts
// bad — JavaDoc tags
/** @param label The button text. @returns A product button. */
```

Public APIs: `/**` summary, backtick names for props, parameters in sentences — **no** `@param` / `@returns`. Factories may be “Creates …” when the type doc already states purpose. Private helpers: comment only when the why is non-obvious. Tests: no JSDoc.

## Project docs

| Location | Role |
| --- | --- |
| `AGENTS.md` | Agent discovery — points at `rules/core.md` |
| `README.md` | Install, run, verify, folder tree |
| `docs/design-system/` | Kit contract — update when a primitive, token, or normalized behavior changes |
| `rules/` | Engineering decisions — update when a convention changes, not per feature |

If a rule is wrong or cannot be followed, state the problem, proceed under a stated assumption, and fix the rule in the same change. Never silently work around it.

Do not duplicate token tables into features. Do not fork these rules into `.cursor/rules` or other tool files.

Visual decision vocabulary (reuse it): **observed** / **inferred** / **normalized** / **proposed** — `docs/design-system/decisions.md`.

No ADR spam for trivial choices. If `rules/` already forces the decision, do not write a second essay in the feature file.
