# Rule index

After [`core.md`](core.md), use this page to pick files. Open **only** what
the task needs. Specialized files add detail; they do not override
[`core.md`](core.md) § Conflict order.

Do not fork these rules into `.cursor/rules` ([documentation.md](documentation.md)).

## Start

1. [`core.md`](core.md) — every change.
2. This page — which other files.
3. Those files — then implement.

## If you are…

| Doing | Open (in order) |
| --- | --- |
| Converting a web page or feature | [web.md](web.md), then [architecture.md](architecture.md), [ui.md](ui.md), plus I/O rows below |
| Adding or changing a product screen | [web.md](web.md) if it exists on web; [architecture.md](architecture.md); [modularity.md](modularity.md); [ui.md](ui.md) |
| A fetching / form screen | web (if on web) + architecture + modularity + ui + api + network + memory + testing |
| Growing or splitting a `Tp*` | [modularity.md](modularity.md) + [ui.md](ui.md) |
| Token, theme, or kit look | [ui.md](ui.md) — and `docs/design-system/` if the kit contract changes |
| File names, folders, imports, assets | [structure.md](structure.md) |
| HTTP contract, errors, loading/error UX | [api.md](api.md) |
| Timeouts, retry class, cancel, connectivity | [network.md](network.md) |
| Lists, images, re-renders, startup | [performance.md](performance.md) |
| Effects, listeners, timers, overlays, caches | [memory.md](memory.md) |
| Tests | [testing.md](testing.md) |
| Secrets, WebView, deep links, native modules | [security.md](security.md) |
| Comments, JSDoc, `docs/` | [documentation.md](documentation.md) |

## Who owns which rule

One topic, one file. Other files **link** here; they do not restate the protocol.

| Topic | File |
| --- | --- |
| Authority, conflict order, `npm run verify` | [core.md](core.md) |
| Web **mobile** spec, gather → list → plan → implement, not desktop | [web.md](web.md) |
| Layers, composition root, OverlayHost, packages, app-wide stores | [architecture.md](architecture.md) |
| One job per file, reuse, lazy load, global vs local as **code** | [modularity.md](modularity.md) |
| Names, folders, imports, format, assets | [structure.md](structure.md) |
| Kit, tokens, a11y, copy | [ui.md](ui.md) |
| Swagger, DTO mapping, error types, loading/empty UX | [api.md](api.md) |
| Client timeouts, pooling, retry class, abort | [network.md](network.md) |
| JS thread, lists, decode size, startup | [performance.md](performance.md) |
| Effect cleanup, abort on leave, overlay entries, caches | [memory.md](memory.md) |
| What to test, where tests live | [testing.md](testing.md) |
| Secrets, outbound URLs, WebView, native modules | [security.md](security.md) |
| Comments, JSDoc, where docs belong | [documentation.md](documentation.md) |

Scope names (`global` / `partial` / `local`) are defined in [core.md](core.md).
How a **file** earns that scope is [modularity.md](modularity.md).

## How rules are written

Record **why** a choice was made. Point at **code** for values, lists, and
current APIs. Do not duplicate token tables, component catalogs, or folder
trees that already live in `src/` or the project `README.md`.

Token **code** wins if `docs/design-system/` drifts.
