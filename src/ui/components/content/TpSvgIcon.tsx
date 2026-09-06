import type { ComponentType } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { tpSizes } from '../../theme/tpSizes';

export type TpSvgIconProps = {
  source: ComponentType<SvgProps>;
  size?: number;
  color?: string;
  semanticLabel?: string;
};

/**
 * Renders a product SVG with optional fill tint.
 *
 * Icons stay vector. `color` maps to SVG `currentColor` (Flutter
 * `ColorFilter.srcIn`). Photographs and illustrations use TpImage.
 */
export function TpSvgIcon({
  source: Icon,
  size = tpSizes.icon,
  color,
  semanticLabel,
}: TpSvgIconProps) {
  const labeled = semanticLabel != null;
  return (
    <View
      accessible={labeled}
      accessibilityLabel={semanticLabel}
      accessibilityRole={labeled ? 'image' : undefined}
      importantForAccessibility={labeled ? 'auto' : 'no-hide-descendants'}
      style={[styles.box, { width: size, height: size }]}
    >
      <Icon
        width={size}
        height={size}
        color={color}
        fill={color}
        preserveAspectRatio="xMidYMid meet"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
});
