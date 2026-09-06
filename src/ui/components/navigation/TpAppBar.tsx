import { Pressable, StyleSheet, View } from 'react-native';

import { tpElevation } from '../../theme/tpElevation';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';
import { TpLogo } from './TpLogo';

export type TpAppBarProps = {
  menuTooltip: string;
  homeLabel?: string;
  onHomePress?: () => void;
  onMenuPress?: () => void;
};

/**
 * Sticky top bar: logo left, menu right. Matches MobileTopAppBar.
 */
export function TpAppBar({
  menuTooltip,
  homeLabel = 'True Professional Home',
  onHomePress,
  onMenuPress,
}: TpAppBarProps) {
  const { colors } = useTpTheme();

  return (
    <View
      style={[
        styles.wrap,
        tpElevation.appBar,
        { backgroundColor: colors.surface },
      ]}
    >
      <View style={[styles.bar, { backgroundColor: colors.surface }]}>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={homeLabel}
          disabled={onHomePress == null}
          onPress={onHomePress}
          style={styles.logo}
        >
          <View importantForAccessibility="no-hide-descendants">
            <TpLogo />
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={menuTooltip}
          onPress={onMenuPress}
          hitSlop={4}
          style={styles.menu}
        >
          <TpGlyph
            name="menu"
            size={tpSizes.icon}
            color={colors.onSurfaceVariant}
          />
        </Pressable>
      </View>
      <View
        style={[styles.hairline, { backgroundColor: colors.outlineVariant }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  bar: {
    height: tpSizes.appBar,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: tpSpacing.md,
    paddingRight: tpSpacing.xs,
  },
  logo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menu: {
    padding: tpSpacing.xs,
    minWidth: tpSizes.minTap,
    minHeight: tpSizes.minTap,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hairline: {
    height: 1,
    width: '100%',
  },
});
