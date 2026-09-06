import { Pressable } from 'react-native';

import { tpSizes } from '../../theme/tpSizes';

export type TpIconButtonProps = {
  icon: React.ReactNode;
  tooltip: string;
  onPress?: () => void;
};

/**
 * Icon-only control. Layout matches `tpSizes.control`; tap target is
 * `tpSizes.minTap` via hitSlop so it still fits an outlined field.
 */
export function TpIconButton({ icon, tooltip, onPress }: TpIconButtonProps) {
  const inset = (tpSizes.minTap - tpSizes.control) / 2;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tooltip}
      disabled={onPress == null}
      onPress={onPress}
      hitSlop={inset}
      style={{
        width: tpSizes.control,
        height: tpSizes.control,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: onPress == null ? 0.4 : 1,
      }}
    >
      {icon}
    </Pressable>
  );
}
