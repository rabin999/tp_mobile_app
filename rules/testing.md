# Testing

Load when adding or changing tests, or when a change can regress behavior.

**Why:** Tests should fail when user-visible or contractual behavior breaks — not when a private function is renamed.

## What to test

Business rules, mappers, validation, `AppException` → UI mapping, important component states (disabled, loading, error vs empty), awkward boundaries (bad image URLs, pagination hidden at one page). Tight regression assertions: `__tests__/ui/gallery.test.tsx` (gallery pumps in light and dark). Text wrap at ~360dp is a kit contract ([ui.md](ui.md)); React Native Testing Library has no overflow finder like Flutter’s — do not invent one.

Do not write tests for coverage percentage, full theme snapshots, or private call order. Do not hit real network. Do not test Prettier.

## Where and how

Layout: `__tests__/ui/` + `pumpApp.tsx` for kit; `__tests__/App.test.tsx` for app smoke; `__tests__/features/<name>/` when features exist. Import library code from `src/…`; relative for helpers. `pumpApp.tsx` is a helper, not a test (`testMatch` is `*.test.ts(x)` only).

`@testing-library/react-native` **14** `render` and `fireEvent.*` are **async**. Await them.

```tsx
let tapped = false;
await render(
  pumpWithTheme(
    <TpButton
      label="Save"
      loading
      onPress={() => {
        tapped = true;
      }}
    />,
  ),
);
await fireEvent.press(screen.getByText('Save'));
expect(tapped).toBe(false);
```

That pattern lives in `__tests__/ui/TpButton.test.tsx`. Field errors: `__tests__/ui/TpTextField.test.tsx`. Pure functions: no render (`__tests__/ui/tpCopyright.test.ts`).

Add or update a test when behavior, a mapper, validation, or a kit state callers rely on changes. Skip new tests for comment-only or private refactors that keep existing tests green.

Done means `npm test` passes for the affected area ([core.md](core.md)).
