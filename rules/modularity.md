# Modularity

Load when writing, splitting, or growing a component, helper, or shared module.

**Why:** A production file is one job a reader can hold in their head. Mixing layout math, URL policy, and JSX in one function is how `TpImage` became unreadable — not “clever reuse.”

## One job per module

| Kind | Owns | Must not own |
| --- | --- | --- |
| `Tp*` component | Render, press, a11y, theme reads | Pixel math, URL policy, DTO parsing, navigation, HTTP |
| Unpublished helper next to it | One local computation (`tpFieldError.ts`) | Views, theme tokens invented here |
| Theme helper (`tpImageCache.ts`) | Policy many kit views share | JSX |
| `src/core/` | Process-wide technical boundaries (`AppException`, `appLogger`) | Colors, components, feature names |
| `src/app/` | Composition root, config, routes | Feature screens, kit internals |
| `src/features/<name>/` | One product capability | A second feature’s private files; kit internals |

```tsx
// bad — component invents decode size, aspect ratio, and URI shaping
function TpImageFrame({ source, width, height }) {
  const ratio = Image.resolveAssetSource(source).width / …;
  const cacheWidth = Math.round(width * PixelRatio.get());
  return <Image source={{ uri, width: cacheWidth, height: cacheHeight }} />;
}

// good — view asks the policy module, then paints
const layout = tpImageCache.prepare({ source, width, height, devicePixelRatio });
return <Image source={layout.source} style={layout} />;
```

If a name is not in `src/ui/components/index.ts` / `src/ui/theme/index.ts`, features must not import it.

## Shared vs core vs local

Same table as [core.md](core.md) § Put each decision once, applied to **code**:

| Question | Put it in |
| --- | --- |
| Do many features need this technical boundary (errors, logging)? | `src/core/` |
| Do many screens need this look or primitive? | Kit (`Tp*` / `tp*`) |
| Do two screens in the same product area need it? | That feature’s `components/` — **not** the kit |
| Does only this file need it? | Same file, or a sibling helper named for the job |

Do not promote a helper to `core/` or the kit because two UIs look similar. Do not add `utils.ts` / `helpers.ts` junk drawers. The file name is the job (`tpImageCache.ts`, `tpFieldError.ts`).

## When to split

Split when **responsibility** changed, not when a line count felt large:

- A second reader cannot say what the file does in one sentence.
- Render is mixed with policy, parsing, or I/O.
- A helper would be tested without mounting a view (`tpImageCache.frameSize`).
- Two components copied the same block — extract **one** owner, delete the copies.

Do **not** split: a 40-line fallback view used once (`TpImageFallbackView` may stay private in `TpImage.tsx`); a types-only alias file; folders that will stay empty.

## Code split (load later)

Defer **product surfaces**, not primitives.

- Lazy a gallery demo, a feature screen, or a drawer the user has not opened (`DesignSystemGalleryPage.tsx` → `galleryDemos.tsx`).
- Do not `React.lazy` a 20-line icon. Do not dynamize `tpSpacing`.
- Metro `inlineRequires` is on (`metro.config.js`). First paint must not import the kit barrel “just in case.”

## Reuse

Reuse the **public** primitive. Pass variants as props (`illustration` on `TpStatusPage`). Do not create `TpEmptyStateAlt`. Do not restyle `View` + hex in a feature when a `Tp*` already covers it.

Copy-paste is allowed **once** while the second caller is hypothetical. The third copy is a missing module.

## Change existing code

Trace callers. Extract the **minimum** boundary that makes the view readable again (`tpImageCache.prepare`). Do not rename the public API (`TpImage.Asset` / `TpImage.Network`) to clean internals.
