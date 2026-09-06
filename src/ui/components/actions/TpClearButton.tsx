import { Pressable, Text } from 'react-native';

import { useTpTheme } from '../../theme/tpTheme';

export type TpClearButtonProps = {
  label: string;
  onPress?: () => void;
};

/**
 * Text-style clear action used in filter sheets (`Clear all`).
 */
export function TpClearButton({ label, onPress }: TpClearButtonProps) {
  const { colors, text } = useTpTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={onPress == null}
      onPress={onPress}
      hitSlop={8}
    >
      <Text style={[text.labelLarge, { color: colors.onSurface }]}>
        {label}
      </Text>
    </Pressable>
  );
}
