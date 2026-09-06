import { Fragment, useEffect, useState, type ReactNode } from 'react';

type OverlayEntry = {
  id: number;
  node: ReactNode;
};

let nextId = 1;
let entries: OverlayEntry[] = [];
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach(listener => listener());
}

/**
 * Imperative overlay host so snackbars and sheets can match Flutter's
 * Overlay without a navigation package.
 */
export function overlayInsert(
  node: (dismiss: () => void) => ReactNode,
): number {
  const id = nextId;

  nextId += 1;
  const dismiss = () => overlayRemove(id);

  entries = [...entries, { id, node: node(dismiss) }];
  emit();
  return id;
}

export function overlayRemove(id: number): void {
  const next = entries.filter(entry => entry.id !== id);

  if (next.length === entries.length) {
    return;
  }

  entries = next;
  emit();
}

/**
 * Drops every overlay without notifying hosts.
 */
export function overlayClear(): void {
  entries = [];
}

export function OverlayHost(): ReactNode {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(value => value + 1);

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        overlayClear();
      }
    };
  }, []);

  return (
    <Fragment>
      {entries.map(entry => (
        <Fragment key={entry.id}>{entry.node}</Fragment>
      ))}
    </Fragment>
  );
}
