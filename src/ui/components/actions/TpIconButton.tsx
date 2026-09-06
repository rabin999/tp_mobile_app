import { Pressable } from 'react-native';

import { tpSizes } from '../../theme/tpSizes';

export type TpIconButtonProps = {
  icon: React.ReactNode;
  tooltip: string;
  onPress?: () => void;
};

/**
 * Icon-only control with a 48dp tap target and accessibility label.
 */
export function TpIconButton({ icon, tooltip, onPress }: TpIconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tooltip}
      disabled={onPress == null}
      onPress={onPress}
      hitSlop={4}
      style={{
        minWidth: tpSizes.minTap,
        minHeight: tpSizes.minTap,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: onPress == null ? 0.4 : 1,
      }}
    >
      {icon}
    </Pressable>
  );
}
