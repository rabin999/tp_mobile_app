export type ScriptedHttpResult = (
  url: string,
  init: RequestInit,
) => Response | Promise<Response> | Error;

export class ScriptedHttp {
  readonly calls: { url: string; init: RequestInit }[] = [];
  readonly responses: Response[] = [];

  constructor(private readonly result: ScriptedHttpResult) {}

  fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
        ? input.href
        : input.url;
    const request = init ?? {};

    this.calls.push({ url, init: request });

    return this.respond(url, request);
  };

  private async respond(url: string, request: RequestInit): Promise<Response> {
    const signal = request.signal;

    if (signal?.aborted) {
      throw abortError();
    }

    const work = Promise.resolve(this.result(url, request)).then(outcome => {
      if (outcome instanceof Error) {
        throw outcome;
      }

      return outcome;
    });

    const outcome = signal == null ? await work : await raceAbort(work, signal);

    this.responses.push(outcome);
    return outcome;
  }
}

function raceAbort<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const onAbort = () => {
      signal.removeEventListener('abort', onAbort);
      reject(abortError());
    };

    signal.addEventListener('abort', onAbort);
    work.then(
      value => {
        signal.removeEventListener('abort', onAbort);
        if (signal.aborted) {
          reject(abortError());
          return;
        }

        resolve(value);
      },
      error => {
        signal.removeEventListener('abort', onAbort);
        reject(error);
      },
    );
  });
}

export function abortError(): Error {
  const error = new Error('Aborted');

  error.name = 'AbortError';
  return error;
}

export function jsonResponse(status: number, body?: unknown): Response {
  return new Response(body === undefined ? '' : JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function withFetch<T>(
  fake: typeof fetch,
  run: () => Promise<T>,
): Promise<T> {
  const previous = globalThis.fetch;

  globalThis.fetch = fake;
  try {
    return await run();
  } finally {
    globalThis.fetch = previous;
  }
}
