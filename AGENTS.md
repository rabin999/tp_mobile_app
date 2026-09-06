# True Professional — agent instructions

React Native Android/iOS app (`true_professional_app`). Runtime is React Native **0.87** (pinned in `package.json`). Node **22.13+**.

1. **Always** follow [`rules/core.md`](rules/core.md).
2. **Then** [`rules/index.md`](rules/index.md) — it says which other files to open.
3. **After implementing**, [`rules/audit.md`](rules/audit.md) — required.
   Audit the finished code against the mapped rules (second agent when
   possible), then pixel-match web mobile vs the app. Fix findings.

Do not copy these rules into Cursor/Codex/Claude-specific files. Do not implement work outside the current task.
