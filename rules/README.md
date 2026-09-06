# Engineering rules

Canonical rules for people and coding agents. Start with [`core.md`](core.md).
Then open the specialized files whose row below matches the task.

| File | Load when |
| --- | --- |
| [core.md](core.md) | Always |
| [structure.md](structure.md) | Files, names, imports, format, assets |
| [architecture.md](architecture.md) | Features, layers, coupling, packages |
| [ui.md](ui.md) | Components, theme, kit, a11y, copy |
| [api.md](api.md) | HTTP, async, errors, offline UX |
| [performance.md](performance.md) | Lists, images, re-renders, startup |
| [testing.md](testing.md) | Tests and regressions |
| [security.md](security.md) | Secrets, PII, auth, untrusted input |
| [documentation.md](documentation.md) | Comments, JSDoc, `docs/` |

A fetching screen typically needs **architecture + ui + api + test**. A token change needs **ui** (and **docs** if the kit contract changes).

## How rules are written

Record **why** a choice was made. Point at **code** for values, lists, and current APIs. Do not duplicate token tables, component catalogs, or folder trees that already live in `src/` or `README.md`.

## Sources already absorbed

TypeScript / React Native conventions: [structure.md](structure.md) and [documentation.md](documentation.md).
Web mobile UI: [ui.md](ui.md) plus `docs/design-system/decisions.md`. Token **code** wins if docs drift.
Flutter sibling (`../true_professional_flutter`): **evidence of product intent** — extract behavior; do not port Widgets, `BuildContext`, or Dart idioms.
