import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpAssets } from '../../theme/tpAssets';
import { tpCorners } from '../../theme/tpCorners';
import { tpElevation } from '../../theme/tpElevation';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';
import { TpSvgIcon } from '../content/TpSvgIcon';

export type TpFilterIconButtonProps = {
  tooltip: string;
  onPress?: () => void;
  badgeCount?: number;
};

/**
 * Filter trigger matching filterImageBox plus an optional count badge.
 */
export function TpFilterIconButton({
  tooltip,
  onPress,
  badgeCount = 0,
}: TpFilterIconButtonProps) {
  const { colors } = useTpTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tooltip}
      disabled={onPress == null}
      onPress={onPress}
      style={({ pressed }) => [
        styles.hit,
        {
          borderColor: colors.primary,
          opacity: pressed ? 0.72 : onPress == null ? 0.4 : 1,
        },
      ]}
    >
      <View>
        <TpSvgIcon
          source={tpAssets.iconFilter}
          size={tpSizes.icon}
          color={colors.primary}
        />
        {badgeCount > 0 ? (
          <View
            style={[
              styles.badge,
              tpElevation.mediaBack,
              {
                backgroundColor: colors.primary,
                borderColor: colors.surface,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: colors.onPrimary }]}>
              {badgeCount}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: tpSizes.control,
    height: tpSizes.control,
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 13,
    ...tpNunito('700'),
    lineHeight: 14,
  },
});
