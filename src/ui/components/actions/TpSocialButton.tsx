import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { tpAssets } from '../../theme/tpAssets';
import { tpCorners } from '../../theme/tpCorners';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';
import { TpSvgIcon } from '../content/TpSvgIcon';

export type TpSocialProvider = 'google' | 'facebook';

export type TpSocialButtonProps = {
  provider: TpSocialProvider;
  label: string;
  onPress?: () => void;
};

/**
 * Google / Facebook buttons with no OAuth behavior.
 */
export function TpSocialButton({
  provider,
  label,
  onPress,
}: TpSocialButtonProps) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.wrap, { width: width * 0.9 }]}>
      {provider === 'google' ? (
        <GoogleButton label={label} onPress={onPress} />
      ) : (
        <FacebookButton label={label} onPress={onPress} />
      )}
    </View>
  );
}

function GoogleButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  const { colors, text } = useTpTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={onPress == null}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.googleButton,
          opacity: pressed ? 0.72 : onPress == null ? 0.4 : 1,
        },
      ]}
    >
      <TpSvgIcon source={tpAssets.iconGoogle} size={tpSizes.iconSm} />
      <View style={styles.gapSm} />
      <Text
        numberOfLines={1}
        style={[
          text.labelLarge,
          {
            color: colors.googleButtonLabel,
            ...tpNunito('500'),
            letterSpacing: 0.25,
            flexShrink: 1,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function FacebookButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  const { colors, text } = useTpTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={onPress == null}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.facebook,
          opacity: pressed ? 0.72 : onPress == null ? 0.4 : 1,
        },
      ]}
    >
      <View style={[styles.facebookMark, { backgroundColor: colors.surface }]}>
        <TpGlyph name="facebook" size={18} color={colors.facebook} />
      </View>
      <View style={styles.gapXs} />
      <Text
        numberOfLines={1}
        style={[
          text.labelLarge,
          {
            color: colors.onPrimary,
            ...tpNunito('400'),
            lineHeight: 16,
            flexShrink: 1,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
  },
  button: {
    height: tpSizes.control,
    borderRadius: tpCorners.xxs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tpSpacing.md,
  },
  facebookMark: {
    width: tpSizes.icon,
    height: tpSizes.icon,
    borderRadius: tpSizes.icon / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gapSm: {
    width: tpSpacing.sm,
  },
  gapXs: {
    width: tpSpacing.xs,
  },
});
