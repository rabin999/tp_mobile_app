import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { overlayInsert, overlayRemove } from '../../overlay/overlayHost';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpKeyboardMetrics } from '../content/useTpKeyboardMetrics';
import { type TpStatusTone } from '../content/TpStatusBadge';
import { TpAlert, type TpAlertSeverity } from '../overlays/TpAlert';

export type TpSnackbarOptions = {
  message: string;
  tone?: TpStatusTone;
  duration?: number;
  closeTooltip?: string;
};

let activeId: number | undefined;

/**
 * Bottom inset for a floating snackbar: above the IME when it is open,
 * otherwise above the home indicator. Material 3 snackbars sit at the
 * bottom and lift for the keyboard rather than hiding behind it.
 * When a bottom nav exists, add its height on the closed-keyboard path.
 */
export function tpSnackbarBottomInset(
  keyboardHeight: number,
  safeBottom: number,
): number {
  if (keyboardHeight > 0) {
    return keyboardHeight + tpSpacing.sm;
  }

  return safeBottom + tpSpacing.md;
}

/**
 * Transient action feedback. Phone enterprise pattern (Material 3,
 * Gmail/Drive, Microsoft mobile): one snackbar at the bottom, inset,
 * above the keyboard. Not the web `CustomSnackbar` top-right toast.
 */
export const TpSnackbar = {
  show({
    message,
    tone = 'info',
    duration = 3000,
    closeTooltip = 'Close',
  }: TpSnackbarOptions): void {
    if (activeId != null) {
      overlayRemove(activeId);
      activeId = undefined;
    }

    let removed = false;
    const id = overlayInsert(dismiss => (
      <SnackbarHost
        message={message}
        tone={tone}
        duration={duration}
        closeTooltip={closeTooltip}
        onClosed={() => {
          if (removed) {
            return;
          }

          removed = true;
          if (activeId === id) {
            activeId = undefined;
          }

          dismiss();
        }}
      />
    ));

    activeId = id;
  },
};

function SnackbarHost({
  message,
  tone,
  duration,
  closeTooltip,
  onClosed,
}: {
  message: string;
  tone: TpStatusTone;
  duration: number;
  closeTooltip: string;
  onClosed: () => void;
}) {
  const insets = useSafeAreaInsets();
  const keyboard = useTpKeyboardMetrics();
  const bottom = tpSnackbarBottomInset(keyboard.height, insets.bottom);

  return (
    <View
      testID="tp-snackbar"
      pointerEvents="box-none"
      accessibilityLiveRegion="polite"
      style={[styles.host, { bottom }]}
    >
      <TpAlert
        message={message}
        severity={severityFor(tone)}
        duration={duration}
        closeTooltip={closeTooltip}
        marginBottom={0}
        elevation={6}
        onClosed={onClosed}
      />
    </View>
  );
}

function severityFor(tone: TpStatusTone): TpAlertSeverity {
  switch (tone) {
    case 'success':
    case 'payment':
      return 'success';
    case 'warning':
    case 'renegotiation':
      return 'warning';
    case 'danger':
      return 'error';
    default:
      return 'info';
  }
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: tpSpacing.md,
    right: tpSpacing.md,
    zIndex: 200,
  },
});
