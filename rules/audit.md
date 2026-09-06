# After implement

**Why:** The agent that wrote the code will miss its own rule misses and
treat “close enough” spacing as done. A frozen audit — preferably by a
**second agent** — catches that. Visual drift accumulates if web mobile
is not measured.

Required after every implementation. Do not skip because Verify passed,
because the page “looks like” web, or because you followed the rules
while writing.

Work is **not done** until both gates below pass and findings are fixed.

## 1. Rules audit

Freeze the change. Re-read [core.md](core.md), [index.md](index.md), then
**every** specialized file the index maps to this work. If the finished
code touches a topic you did not open while implementing (HTTP, timers,
secrets, tests, copy), open that file too. `core.md` always.

Check the finished files against those rules. List each violation with
path and the rule that forbids it. Do not invent extra architecture.

**Second agent:** When the environment can launch another agent, do this
audit that way — fresh context, **no** implementation chat. Give it the
changed paths, this file, and the rule files to open. It reports
violations; it does not rubber-stamp. If a second agent cannot be
launched, the same agent still does this as a **separate** pass after
implementation is frozen: re-read the rules, then re-read the finished
files. Do not mix audit with writing.

## 2. Pixel match vs web mobile

Required when the change paints a product screen that exists on web.
Skip only when there is no web-mobile page (kit-only, network-only,
tests-only).

1. Open the web **mobile** page at `localhost:3001?viewport=mb` at the
   phone width that page uses (typically 360). Light appearance — web
   has no dark UI. Desktop web is out.
2. Open the same screen in the app at the **same width**, light
   appearance.
3. Compare **pixel by pixel**: outer padding, gaps between blocks,
   alignment, type size/weight/color, control sizes, grouping. Measure.
   Do not eyeball “similar.”
4. Allowed differences only: recorded kit/platform constraints in
   [ui.md](ui.md) / `docs/design-system/decisions.md` (44 vs ~40 tap,
   OverlayHost snackbar placement, keyboard inset), and **explicit
   product requirements** that beat web.
5. Anything else — spacing, gaps, alignment, type, color, missing
   chrome — is a defect. **Fix the mobile screen** in the same change.
   Do not change web. Do not record the divergence instead of fixing.

A pair of matching screenshots (web vs app) is look-audit evidence. A
single screenshot of the app is not. Behavior still needs the flow
exercised ([core.md](core.md) § Verify) — look-audit does not replace
empty / loading / error / disabled.

## 3. Fix and re-run

Fix every finding in the same change. Then run Verify again and repeat
both gates until they are clean. If a rule is wrong, fix the rule
([documentation.md](documentation.md)) — do not work around it.

Do not ship with known spacing gaps or known rule misses.
