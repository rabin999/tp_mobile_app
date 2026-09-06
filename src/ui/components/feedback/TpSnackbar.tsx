import { useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { overlayInsert } from '../../overlay/overlayHost';
import { tpSpacing } from '../../theme/tpSpacing';
import { TpAlert, type TpAlertSeverity } from '../overlays/TpAlert';
import { type TpStatusTone } from '../content/TpStatusBadge';

export type TpSnackbarOptions = {
  message: string;
  tone?: TpStatusTone;
  duration?: number;
  closeTooltip?: string;
};

/**
 * Shows a top-right snackbar matching CustomSnackbar.
 */
export const TpSnackbar = {
  show({
    message,
    tone = 'info',
    duration = 3000,
    closeTooltip = 'Close',
  }: TpSnackbarOptions): void {
    let removed = false;
    overlayInsert(dismiss => (
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
          dismiss();
        }}
      />
    ));
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
  const { width: screenWidth } = useWindowDimensions();
  const width = Math.min(320, Math.max(0, screenWidth - tpSpacing.md));
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        top: insets.top + tpSpacing.xs,
        right: tpSpacing.xs,
        width,
        zIndex: 200,
      }}
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
