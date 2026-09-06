import { StyleSheet, View } from 'react-native';

export type TpTimeoutBarProps = {
  value: number;
  color: string;
  trackColor?: string;
};

/**
 * Thin remaining-time bar. `value` is 1 at start and 0 when the
 * timeout elapses.
 */
export function TpTimeoutBar({ value, color, trackColor }: TpTimeoutBarProps) {
  const clamped = Math.min(1, Math.max(0, value));

  return (
    <View
      style={[styles.track, { backgroundColor: trackColor ?? `${color}3D` }]}
    >
      <View
        style={[
          styles.fill,
          { width: `${clamped * 100}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 3,
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: 3,
  },
});
