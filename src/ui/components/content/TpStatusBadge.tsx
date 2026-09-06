import { StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';

export type TpStatusTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'inProgress'
  | 'renegotiation'
  | 'payment';

export type TpStatusBadgeProps = {
  label: string;
  tone?: TpStatusTone;
};

function toneColors(
  tone: TpStatusTone,
  dark: boolean,
): { background: string; foreground: string } {
  switch (tone) {
    case 'neutral':
      return dark
        ? { background: '#2A2A2A', foreground: '#BDBDBD' }
        : { background: '#EEEEEE', foreground: '#757575' };
    case 'primary':
      return dark
        ? { background: '#08343C', foreground: '#4DD0E1' }
        : { background: '#E0F7FA', foreground: '#0097A7' };
    case 'success':
      return dark
        ? { background: '#1B3D24', foreground: '#81C784' }
        : { background: '#E8F5E9', foreground: '#2E7D32' };
    case 'warning':
      return dark
        ? { background: '#3E2723', foreground: '#FFB74D' }
        : { background: '#FFF3E0', foreground: '#E65100' };
    case 'danger':
      return dark
        ? { background: '#3D1518', foreground: '#EF9A9A' }
        : { background: '#FFEBEE', foreground: '#C62828' };
    case 'info':
      return dark
        ? { background: '#0D2A4A', foreground: '#90CAF9' }
        : { background: '#E3F2FD', foreground: '#1976D2' };
    case 'inProgress':
      return dark
        ? { background: '#2A1B3D', foreground: '#CE93D8' }
        : { background: '#F3E5F5', foreground: '#7B1FA2' };
    case 'renegotiation':
      return dark
        ? { background: '#3E1F14', foreground: '#FFAB91' }
        : { background: '#FBE9E7', foreground: '#BF360C' };
    case 'payment':
      return dark
        ? { background: '#003D38', foreground: '#80CBC4' }
        : { background: '#E0F2F1', foreground: '#00695C' };
  }
}

/**
 * Unified status pill matching ServiceStatusBadge.mobile.
 */
export function TpStatusBadge({ label, tone = 'neutral' }: TpStatusBadgeProps) {
  const { brightness, text } = useTpTheme();
  const colors = toneColors(tone, brightness === 'dark');

  return (
    <View style={[styles.pill, { backgroundColor: colors.background }]}>
      <Text
        numberOfLines={1}
        style={[text.labelMedium, { color: colors.foreground }]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: tpSpacing.sm,
    paddingVertical: tpSpacing.xxs,
    borderRadius: tpCorners.pill,
  },
});
