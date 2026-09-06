# Memory and leak prevention

Load when writing effects, listeners, timers, animations, overlays, caches, or navigation lifetime.

**Why:** Leaks are invisible in review and in a 2-second smoke test. They show up after a long session. Do not “fix” them with a forced remount, a periodic GC, or by silencing the unmounted-state warning - that warning is the bug.

## Tear down with the effect

Write the cleanup in the same edit as the subscription. An untorn-down listener, interval, or `Animated.timing` keeps the enclosing scope for the process lifetime.

```tsx
// bad - animation keeps running after unmount
useEffect(() => {
  Animated.timing(shift, { toValue: 1, duration: 150, useNativeDriver: true }).start();
}, [shift]);

// good
useEffect(() => {
  Animated.timing(shift, {
    toValue: value ? 1 : 0,
    duration: 150,
    useNativeDriver: true,
  }).start();
  return () => shift.stopAnimation();
}, [shift, value]);
```

Keyboard, overlay host, abort, and rAF already follow this (`useTpKeyboardMetrics.ts`, `overlayHost.tsx`, `useContact.ts`, `abortOnTimeout` in `src/core/async.ts`). Copy that, do not invent a second pattern.

Native callbacks (`measureInWindow`, animation `start`) can run after unmount. Guard with a cancelled flag in that effect, or `useAliveRef` (`src/ui/useAliveRef.ts`) for click → overlay → `.then` paths (`TpSelect`, `TpDateField`).

## Cancel in-flight work

A `fetch` that resolves after unmount and then `setState` is a leak. Same bug from the network side: [network.md](network.md). `useContactForm` / `useContactTopics` abort on unmount. `requestJson` always `dispose()`s the timeout. Do not swallow the abort; do not update state after `signal.aborted`.

The React “update on unmounted component” warning is not noise. Fix the retaining callback.

## Closures and globals

A timer, `Keyboard.addListener`, or overlay entry that closes over props/state keeps that screen’s scope alive. Module-level `entries` in `overlayHost.tsx` is process-wide on purpose - **one** host, insert/remove pairs, `overlayClear` when the last host unmounts and in `jest.setup.ts`. Do not add a second portal. Do not leave a snackbar/sheet node in `entries` after the host is gone.

## Screens and native views

`App.tsx` mounts one guest screen at a time (gallery, Contact, or a public page), not several hidden underneath. The guest drawer is a **single** always-mounted instance (bounded). If a later navigator keeps screens mounted “for speed,” that set must be bounded and popped screens must release native views - not stay hidden in a growing stack.

This app does not use Reanimated or Gesture Handler. If a later screen adds a library that allocates a per-screen runtime context, verify that context is released after repeated open/close cycles. `stopAnimation()` on `Animated.Value` is not proof that library released its context.

## Caches

`tpImageCache` is decode **policy**, not a JS map. Do not add an unbounded in-memory cache of decoded images, parsed responses, or lookup tables. A cache needs a size bound and an eviction rule, or it is a slow leak.

## Verify

Exercise the flow, including unmount while a request, keyboard, overlay, or animation is live. Kit contract: `__tests__/ui/overlayHost.test.tsx`. A leak by definition needs a long session (real navigation, background/foreground) and a heap-snapshot **diff** - guessing the retained reference is not a fix.
