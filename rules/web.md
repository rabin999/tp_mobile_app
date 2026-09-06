# Web to mobile

Load when adding or changing a product screen or feature that exists on the
web app. This sequence is required. Do not skip it because the running page
“looks simple,” or because a screenshot seemed enough.

## Web mobile only

The spec is the web **mobile** implementation - the tree behind
`localhost:3001?viewport=mb`, and the source that renders that tree.

Do not read, copy, or reconcile **desktop** web: desktop layouts, breakpoints,
desktop-only components, desktop field sizes, desktop snackbars, desktop
navigation, or anything gated off the mobile viewport. If a file is shared,
follow the **mobile** branch (mobile props, `mb` tree), not the desktop one.

## What web mobile owns

| From web mobile (keep) | Not from web (do not port) |
| --- | --- |
| Business rules, validation, permissions, calculations, workflows | React DOM, MUI slot names, CSS files, page-sized web widgets |
| Layout: alignment, grouping, hierarchy, spacing, type and color as they appear on the **mobile** page | Desktop chrome, desktop toasts, another page’s layout as a template |
| Features: what the user can do, in what order, with what outcomes | Web file trees, hook names, class names |
| States: empty, loading, error, disabled, success, partial, retry | Workarounds and debt - extract the rule, not the hack |
| Copy, fields, endpoints implied by the page, shared state with other **mobile** pages | |

Product requirements win if they conflict with web mobile. Otherwise **do not
invent** behavior, fields, branches, or copy web mobile does not have, and
**do not drop** a web-mobile branch because it “probably does not matter on a
phone.”

A different native approach is allowed - native pickers, kit composition,
feature modules - **only if** the web-mobile look and every listed rule still
hold. Do not change titles, grouping, or density to “feel more native.”
Simplest correct implementation wins ([core.md](core.md)).

## Where to look

- **Running UI:** `localhost:3001` with `?viewport=mb` only (layout evidence).
- **Source:** the **mobile** page, the components it mounts, hooks/services,
  validators, related **mobile** routes, and assets those files use. The
  running page is not a substitute for the source.

Do not open desktop routes or desktop component trees to “fill in” a gap.

## Sequence

Do not write mobile code, and do not lock a folder layout, until 1-4 are done.

1. **Gather.** Every **web mobile** file that implements the feature - screens,
   shared widgets, hooks, API calls, validation, navigation into and out of
   it, assets. Follow imports that the mobile tree actually uses. Sister
   **mobile** pages that share state or chrome count. Skip desktop-only files.
2. **Read.** Line by line. One by one. Do not skim for “the submit handler.”
3. **List.** Business rules, validation, permissions, calculations, workflows,
   states, copy, navigation, and **what other mobile pages share**. Include
   failure modes from [core.md](core.md).
4. **Understand.** Dependents, interconnections, the whole picture. If a list
   item is still fuzzy, go back to the **web mobile** source - do not assume,
   and do not look at desktop to guess.
5. **Plan.** Where each listed rule lives on native (view vs helper vs core),
   which `Tp*` pieces, which feature modules, which API contract (Swagger).
   Do not invent a different layout. Platform-only constraints (keyboard
   inset, OverlayHost, dark palette) live in [ui.md](ui.md) /
   `docs/design-system/decisions.md` - not as comments in the screen.
6. **Implement** that plan. Verify the listed behaviors, including empty /
   loading / error / disabled ([core.md](core.md) § Verify). Then
   [audit.md](audit.md) - rules audit of the finished code, then pixel
   match vs this web-mobile page. Fix spacing and look gaps on mobile.

Layout: [ui.md](ui.md) (kit paint, not a restyle license).
Layers and kit composition: [architecture.md](architecture.md).
Which other rule files to open: [index.md](index.md).
