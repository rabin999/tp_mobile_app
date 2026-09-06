import { StyleSheet, Text, View } from 'react-native';

import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from './TpGlyph';

export type TpVerificationVariant = 'compact' | 'banner';

export type TpVerificationBadgeProps = {
  verified: boolean;
  variant?: TpVerificationVariant;
  bannerMessage?: string;
};

/**
 * Provider verification indicator.
 */
export function TpVerificationBadge({
  verified,
  variant = 'compact',
  bannerMessage,
}: TpVerificationBadgeProps) {
  const { colors, text } = useTpTheme();
  if (variant === 'compact') {
    if (!verified) {
      return null;
    }
    return <TpGlyph name="verified" size={18} color={colors.primary} />;
  }
  if (verified) {
    return <TpGlyph name="verified" size={24} color={colors.primary} />;
  }
  return (
    <View style={[styles.banner, { backgroundColor: colors.warningContainer }]}>
      <TpGlyph name="info" size={24} color={colors.verificationForeground} />
      <View style={styles.gap} />
      <Text
        style={[
          text.bodySmall,
          { color: colors.verificationForeground, flex: 1 },
        ]}
      >
        {bannerMessage ?? ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tpSpacing.sm,
  },
  gap: {
    width: tpSpacing.xs,
  },
});
