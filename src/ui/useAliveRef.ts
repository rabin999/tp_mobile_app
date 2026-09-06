import { useEffect, useRef } from 'react';

/**
 * True until the component unmounts. Use before setState / onChanged after
 * an overlay promise or measureInWindow.
 */
export function useAliveRef() {
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  return alive;
}
