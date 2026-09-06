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

const badgeSize = 22;
const badgeOverhang = 11;

/**
 * Filter trigger matching filterImageBox plus an optional count badge.
 *
 * The count sits on the control's top-right corner (web
 * `serviceFilterHomeAdvanceFilterNumberStyles`), not on the glyph.
 */
export function TpFilterIconButton({
  tooltip,
  onPress,
  badgeCount = 0,
}: TpFilterIconButtonProps) {
  const { colors } = useTpTheme();
  const showBadge = badgeCount > 0;

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={tooltip}
        accessibilityValue={showBadge ? { now: badgeCount } : undefined}
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
        <TpSvgIcon
          source={tpAssets.iconFilter}
          size={tpSizes.icon}
          color={colors.primary}
        />
      </Pressable>
      {showBadge ? (
        <View
          pointerEvents="none"
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
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: tpSizes.control + badgeOverhang,
    height: tpSizes.control + badgeOverhang,
    marginTop: -badgeOverhang,
    marginRight: -badgeOverhang,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  hit: {
    width: tpSizes.control,
    height: tpSizes.control,
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
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
