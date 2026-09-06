import { StyleSheet, Text, View } from 'react-native';

import { useTpTheme } from '../../theme/tpTheme';

export type TpOutlinedFieldLabelProps = {
  label: string;
  color: string;
  backgroundColor: string;
};

/**
 * MUI-style outline label. Must be a sibling of the bordered field, not a
 * child - Android clips overflow inside a bordered / rounded box.
 */
export function TpOutlinedFieldLabel({
  label,
  color,
  backgroundColor,
}: TpOutlinedFieldLabelProps) {
  const { text } = useTpTheme();

  return (
    <View pointerEvents="none" style={[styles.wrap, { backgroundColor }]}>
      <Text numberOfLines={1} style={[text.bodyMedium, styles.text, { color }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: -8,
    left: 12,
    paddingHorizontal: 4,
    zIndex: 2,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false,
  },
});
