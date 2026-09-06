# Comments and documentation

Load when writing JSDoc, comments, or changing `docs/` / README.

## Comments describe the block

**Why:** A comment is for the next reader who is looking at a block and needs to know what that block is doing. It is not a design note, a future plan, or a justification for skipping work.

```ts
// Android emulator uses 10.0.2.2 to reach the host; iOS simulator uses localhost.
const localApiHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
```

Do not write comments that narrate a decision (“we skipped GET because…”), lecture about architecture, or repeat the identifier. If the same work exists in two places, extract a shared module instead of explaining the duplication.

Public APIs: one-sentence `/**` that names what the function or module does - **no** `@param` / `@returns`. Tests: no JSDoc.

```ts
/**
 * Posts the contact form to POST /general-feedbacks.
 */
export async function submitContact(draft: ContactDraft, signal: AbortSignal) { … }
```

## Project docs

| Location | Role |
| --- | --- |
| `AGENTS.md` | Agent discovery - points at `rules/core.md` then `rules/index.md` |
| `README.md` | Install, run, verify, folder tree |
| `docs/design-system/` | Kit contract - update when a primitive, token, or platform mapping changes |
| `rules/index.md` | Map of which rule file to open |
| `rules/` | Engineering decisions - update when a convention changes, not per feature. New conventions go here (see `modularity.md`), never into `.cursor/rules`. |

If a rule is wrong or cannot be followed, state the problem, proceed under a stated assumption, and fix the rule in the same change. Never silently work around it.

Do not duplicate token tables into features. Do not fork these rules into `.cursor/rules` or other tool files.

Visual decision vocabulary (reuse it): **observed** / **inferred** /
**kit** / **proposed** - `docs/design-system/decisions.md`. **kit** is
token and platform mapping only (dark palette, OverlayHost). Do not use it
to restyle a page away from web mobile.

No ADR spam for trivial choices. If `rules/` already forces the decision, do not write a second essay in the feature file.
