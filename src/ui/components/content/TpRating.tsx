import { Pressable, StyleSheet, View } from 'react-native';

import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from './TpGlyph';

export type TpRatingProps = {
  value: number;
  onChanged?: (value: number) => void;
  max?: number;
  size?: number;
  semanticLabel?: string;
};

/**
 * Star rating. Interactive when `onChanged` is set.
 */
export function TpRating({
  value,
  onChanged,
  max = 5,
  size = tpSizes.iconSm,
  semanticLabel,
}: TpRatingProps) {
  const { colors } = useTpTheme();
  const rounded = Math.round(value);
  const stars = [];
  for (let i = 1; i <= max; i += 1) {
    const filled = i <= rounded;
    stars.push(
      <Pressable
        key={i}
        accessibilityRole={onChanged != null ? 'button' : 'none'}
        disabled={onChanged == null}
        onPress={onChanged != null ? () => onChanged(i) : undefined}
        hitSlop={2}
        style={styles.star}
      >
        <TpGlyph
          name={filled ? 'star' : 'starBorder'}
          size={size}
          color={colors.warning}
        />
      </Pressable>,
    );
  }
  return (
    <View
      accessibilityLabel={semanticLabel ?? `Rating ${rounded} of ${max}`}
      style={styles.row}
    >
      {stars}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  star: {
    paddingHorizontal: 1,
  },
});
