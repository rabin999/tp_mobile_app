import { useEffect, useState, type ReactNode } from 'react';

export type TpDisappearingMessageProps = {
  children: ReactNode;
  duration?: number;
};

/**
 * Hides `children` after `duration`. Matches DisappearingMessage.mobile.
 */
export function TpDisappearingMessage({
  children,
  duration = 10000,
}: TpDisappearingMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) {
    return null;
  }
  return <>{children}</>;
}
