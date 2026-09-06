import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';

import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';

export type TpAvatarProps = {
  source?: ImageSourcePropType;
  initials?: string;
  size?: number;
};

/**
 * Circular avatar with initials fallback.
 */
export function TpAvatar({
  source,
  initials,
  size = tpSizes.avatar,
}: TpAvatarProps) {
  const { colors, text } = useTpTheme();
  const raw = (initials ?? '?').trim();
  const letters = raw.length <= 2 ? raw : raw.slice(0, 2);

  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primaryContainer,
        },
      ]}
    >
      {source != null ? (
        <Image
          source={source}
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <Text style={[text.labelMedium, { color: colors.onSurfaceVariant }]}>
          {letters.toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
