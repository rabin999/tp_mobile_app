import { ActivityIndicator } from 'react-native';

import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';

export type TpSpinnerProps = {
  size?: number;
  color?: string;
};

/**
 * The only loading indicator in the kit.
 *
 * Pass `size` and `color` for inline, button, search, and page use.
 * Center it yourself when the page should block on load.
 */
export function TpSpinner({ size = tpSizes.icon, color }: TpSpinnerProps) {
  const { colors } = useTpTheme();

  return (
    <ActivityIndicator
      color={color ?? colors.iconMuted}
      size={size > 24 ? 'large' : 'small'}
      style={{ width: size, height: size }}
    />
  );
}
