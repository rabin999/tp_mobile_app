# Network layer and connection management

Load when changing `requestJson`, timeouts, retries, cancel, connectivity, or any persistent/streaming client.

**Why:** This is how the **client** behaves on an unreliable mobile network — not what the backend does. A missing timeout looks like a crash. An uncancelled request is both stale UI and a leak ([memory.md](memory.md) § Cancel in-flight work).

Every JSON call goes through `requestJson` (`src/core/http/requestJson.ts`). Do not add Axios, a second `fetch` wrapper, or a query library until those needs exist.

## Reuse connections

Do not open a new TLS session per request to the same host. This app uses platform `fetch`: Android OkHttp and iOS `NSURLSession` both keep an idle pool per host. Confirm that still holds if you replace the HTTP stack. Do not add a client “for keep-alive” when `fetch` already pools.

## Timeout on every request

`requestJson` always wraps the caller’s `AbortSignal` with `abortOnTimeout` (`src/core/async.ts`). Default `httpTimeoutMs` is **20_000**. Override per call only when the product needs a different budget. A request with no timeout is forbidden — it hangs until the user force-quits.

Hang → `httpMessages.timeout`. User-aborted (unmount) is not a toast ([api.md](api.md)).

## Retry: classify, do not blanket

Automatic retry only for calls that are safe to repeat. Back off in code if you retry. Do not retry a create/submit because the first response was slow.

| Call | Safe to auto-retry? | What we do |
| --- | --- | --- |
| `GET /general-feedbacks/topics/get-all` | Yes (idempotent read) | No auto-retry. User taps Try again (`useContactTopics.retry`). |
| `POST /general-feedbacks` | No | No auto-retry. Disable double-submit (`sendingRef` / button loading). |

A later typeahead GET may retry with backoff. A later checkout POST must not. User-initiated retry is always allowed.

## Cancel when the work is obsolete

Abort on unmount, on leave, and when a newer request supersedes an older one. Ignore `signal.aborted` / `AbortError` — do not write that result into state.

Contact already does this: topics `AbortController` in the load effect; submit aborted if Contact unmounts. Search-as-you-type (when added) must abort the previous keystroke’s request.

## Network type, lifecycle, streams

WiFi → cellular mid-request is normal. Today there is no NetInfo listener: an in-flight `fetch` either finishes or maps to timeout/offline, which is **visible** (`httpMessages`). Do not swallow that. Do not add `@react-native-community/netinfo` until a connectivity banner or “revalidate on reconnect” UI exists.

There is no WebSocket, SSE, or background poll. When a persistent connection is added: heartbeat (carriers drop idle sockets without RST), reconnect with backoff (not a tight loop), and **pause on `AppState` background** — the OS will throttle anyway. On foreground after a real gap, revalidate what is on screen; do not assume it is still current. Until then, Try again is the recovery.

## Verify

Timeouts: `__tests__/core/http/http.test.ts`. Cancel: Contact leave-while-sending. User retry: `__tests__/features/contact/useContact.test.ts`.
