import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph, type TpGlyphName } from '../content/TpGlyph';
import { TpTimeoutBar } from '../feedback/TpTimeoutBar';

export type TpAlertSeverity = 'success' | 'warning' | 'info' | 'error';

export type TpAlertProps = {
  message: string;
  severity?: TpAlertSeverity;
  dismissible?: boolean;
  closeTooltip?: string;
  duration?: number;
  onClosed?: () => void;
  marginBottom?: number;
  elevation?: number;
};

/**
 * Dismissible collapsing alert banner in the page. Matches AlertButton.mobile.
 *
 * Use this inline (form/page errors). Transient confirmations use TpSnackbar.
 */
export function TpAlert({
  message,
  severity = 'info',
  dismissible = true,
  closeTooltip = 'Close',
  duration,
  onClosed,
  marginBottom = tpSpacing.sm,
  elevation = 0,
}: TpAlertProps) {
  const { colors, text } = useTpTheme();
  const [open, setOpen] = useState(true);
  const progress = useRef(new Animated.Value(1)).current;
  const [remaining, setRemaining] = useState(1);
  const closed = useRef(false);

  const tone = toneFor(severity, colors);

  const dismiss = () => {
    if (closed.current) {
      return;
    }

    closed.current = true;
    progress.stopAnimation();
    setOpen(false);
    onClosed?.();
  };

  useEffect(() => {
    if (duration == null || duration <= 0) {
      return;
    }

    let alive = true;
    const listener = progress.addListener(({ value }) => {
      if (alive) {
        setRemaining(value);
      }
    });

    Animated.timing(progress, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (alive && finished) {
        dismiss();
      }
    });
    return () => {
      alive = false;
      progress.removeListener(listener);
      progress.stopAnimation();
    };
    // Mount-only timeout, matching Flutter's initState controller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) {
    return null;
  }

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion={severity === 'error' ? 'assertive' : 'polite'}
      style={[
        styles.wrap,
        { marginBottom },
        elevation > 0
          ? {
              elevation,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
            }
          : null,
      ]}
    >
      <View style={[styles.card, { backgroundColor: tone.container }]}>
        <View style={styles.row}>
          <TpGlyph name={tone.icon} size={24} color={tone.foreground} />
          <View style={styles.gap} />
          <Text
            style={[
              text.bodyLarge,
              { color: tone.foreground, ...tpNunito('600'), flex: 1 },
            ]}
          >
            {message}
          </Text>
          <View style={styles.closeSlot}>
            {dismissible ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={closeTooltip}
                onPress={dismiss}
                hitSlop={4}
                style={styles.close}
              >
                <TpGlyph name="close" size={18} color={tone.foreground} />
              </Pressable>
            ) : null}
          </View>
        </View>
        {duration != null && duration > 0 ? (
          <TpTimeoutBar value={remaining} color={tone.foreground} />
        ) : null}
      </View>
    </View>
  );
}

function toneFor(
  severity: TpAlertSeverity,
  colors: ReturnType<typeof useTpTheme>['colors'],
): { container: string; foreground: string; icon: TpGlyphName } {
  switch (severity) {
    case 'success':
      return {
        container: colors.successContainer,
        foreground: colors.success,
        icon: 'checkCircle',
      };
    case 'warning':
      return {
        container: colors.warningContainer,
        foreground: colors.warning,
        icon: 'warningAmber',
      };
    case 'info':
      return {
        container: colors.infoContainer,
        foreground: colors.info,
        icon: 'info',
      };
    case 'error':
      return {
        container: colors.errorContainer,
        foreground: colors.error,
        icon: 'errorOutline',
      };
  }
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: tpCorners.xs,
  },
  card: {
    minHeight: 48,
    borderRadius: tpCorners.xs,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tpSpacing.sm,
    paddingVertical: tpSpacing.xs,
  },
  gap: {
    width: tpSpacing.xs,
  },
  closeSlot: {
    width: tpSizes.controlSmall,
    height: tpSizes.controlSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
