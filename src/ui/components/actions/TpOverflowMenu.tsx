import { useRef } from 'react';
import { Pressable, StyleSheet, View, type HostInstance } from 'react-native';

import { tpAssets } from '../../theme/tpAssets';
import { tpElevation } from '../../theme/tpElevation';
import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';
import { showTpMenu, type TpMenuAction } from '../content/TpMenu';
import { TpSvgIcon } from '../content/TpSvgIcon';

export type TpOverflowMenuProps = {
  tooltip: string;
  items: TpMenuAction[];
};

/**
 * Overflow “⋯” menu matching the mobile noun-dots control.
 */
export function TpOverflowMenu({ tooltip, items }: TpOverflowMenuProps) {
  const { colors } = useTpTheme();
  const ref = useRef<HostInstance>(null);
  const enabled = items.length > 0;

  const open = () => {
    ref.current?.measureInWindow((x, y, width, height) => {
      showTpMenu({
        anchor: { x, y, width, height },
        align: 'end',
        minWidth: 160,
        maxWidth: 160,
        items: items.map((item, index) => ({
          value: index,
          label: item.label,
          leading: item.leading,
          destructive: item.destructive,
        })),
      }).then(selected => {
        if (selected == null) {
          return;
        }

        items[selected]?.onPress?.();
      });
    });
  };

  return (
    <View ref={ref} collapsable={false}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={tooltip}
        disabled={!enabled}
        onPress={enabled ? open : undefined}
        style={({ pressed }) => [
          styles.trigger,
          tpElevation.fab,
          {
            backgroundColor: colors.surface,
            opacity: pressed ? 0.72 : enabled ? 1 : 0.4,
          },
        ]}
      >
        <TpSvgIcon
          source={tpAssets.iconOverflow}
          size={15}
          color={colors.onSurfaceVariant}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: tpSizes.controlSmall,
    height: tpSizes.controlSmall,
    borderRadius: tpSizes.controlSmall / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
