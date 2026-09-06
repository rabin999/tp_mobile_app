import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';

export type TpButtonVariant = 'filled' | 'outlined' | 'text';
export type TpButtonSize = 'standard' | 'compact';

export type TpButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: TpButtonVariant;
  size?: TpButtonSize;
  loading?: boolean;
  expanded?: boolean;
  icon?: React.ReactNode;
  weight?: '600' | '700';
};

/**
 * Product button wrapping filled / outlined / text presses.
 *
 * Pass `label` in for l10n. `loading` shows a spinner and ignores presses.
 */
export function TpButton({
  label,
  onPress,
  variant = 'filled',
  size = 'standard',
  loading = false,
  expanded = false,
  icon,
  weight = '600',
}: TpButtonProps) {
  const { colors, text } = useTpTheme();
  const enabled = onPress != null && !loading;
  const height = size === 'standard' ? tpSizes.control : tpSizes.controlCompact;
  const spinnerColor = variant === 'filled' ? colors.onPrimary : colors.primary;

  let background = colors.primary;
  let foreground = colors.onPrimary;
  let borderColor = 'transparent';
  if (variant === 'outlined') {
    background = 'transparent';
    foreground = colors.primary;
    borderColor = enabled ? colors.primary : colors.outline;
  } else if (variant === 'text') {
    background = 'transparent';
    foreground = colors.primary;
  }
  if (!enabled && variant === 'filled') {
    background = colors.outlineVariant;
    foreground = colors.textHint;
  } else if (!enabled) {
    foreground = colors.textHint;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !enabled, busy: loading }}
      disabled={!enabled}
      onPress={enabled ? onPress : undefined}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          width: expanded ? '100%' : undefined,
          backgroundColor:
            pressed && variant === 'filled' ? colors.primaryHover : background,
          borderColor,
          borderWidth: variant === 'outlined' ? 1 : 0,
          opacity: pressed && variant !== 'filled' ? 0.72 : 1,
        },
      ]}
    >
      <View style={styles.row}>
        {loading ? (
          <ActivityIndicator
            color={spinnerColor}
            size="small"
            style={styles.spinner}
          />
        ) : icon != null ? (
          <View style={styles.icon}>{icon}</View>
        ) : null}
        <Text
          numberOfLines={1}
          style={[
            text.labelLarge,
            tpNunito(weight),
            { color: foreground, flexShrink: 1 },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: tpCorners.xs,
    paddingHorizontal: tpSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  },
  spinner: {
    marginRight: tpSpacing.sm,
  },
  icon: {
    marginRight: 6,
  },
});
