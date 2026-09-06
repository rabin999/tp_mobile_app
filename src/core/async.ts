/**
 * True when an AbortSignal cancelled the work.
 */
export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

/**
 * Returns a signal that aborts when `parent` aborts or `timeoutMs` elapses.
 */
export function abortOnTimeout(
  parent: AbortSignal,
  timeoutMs: number,
): { signal: AbortSignal; dispose: () => void } {
  const controller = new AbortController();
  const abortChild = () => {
    if (!controller.signal.aborted) {
      controller.abort();
    }
  };
  const timer = setTimeout(abortChild, timeoutMs);

  if (parent.aborted) {
    clearTimeout(timer);
    abortChild();
  } else {
    parent.addEventListener('abort', abortChild, { once: true });
  }

  return {
    signal: controller.signal,
    dispose: () => {
      clearTimeout(timer);
      parent.removeEventListener('abort', abortChild);
    },
  };
}
