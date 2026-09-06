import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';

export type TpSwitchProps = {
  value: boolean;
  onChanged?: (value: boolean) => void;
};

/**
 * iOS-styled switch matching IosToggleSwitch (30×16.5, 12px thumb).
 */
export function TpSwitch({ value, onChanged }: TpSwitchProps) {
  const { colors } = useTpTheme();
  const shift = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(shift, {
      toValue: value ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
    return () => shift.stopAnimation();
  }, [shift, value]);

  const enabled = onChanged != null;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !enabled }}
      disabled={!enabled}
      onPress={enabled ? () => onChanged!(!value) : undefined}
      style={styles.hit}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: value ? colors.primary : colors.switchTrackOff },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: colors.surface },
            {
              transform: [
                {
                  translateX: shift.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 14],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    width: tpSizes.minTap,
    height: tpSizes.minTap,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    width: 30,
    height: 16.5,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
