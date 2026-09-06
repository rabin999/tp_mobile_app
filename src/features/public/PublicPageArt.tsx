import { useState } from 'react';
import { StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { TpIllustration } from '../../ui/components/content/TpIllustration';

export type PublicPageArtProps = {
  source: ImageSourcePropType;
  label: string;
  radius?: number;
  marginBottom?: number;
};

/**
 * Full-width illustration used on guest public screens.
 */
export function PublicPageArt({
  source,
  label,
  radius,
  marginBottom,
}: PublicPageArtProps) {
  const [artWidth, setArtWidth] = useState(0);

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={[
        styles.art,
        radius != null ? { borderRadius: radius, overflow: 'hidden' } : null,
        marginBottom != null ? { marginBottom } : null,
      ]}
      onLayout={event => setArtWidth(event.nativeEvent.layout.width)}
    >
      {artWidth > 0 ? (
        <TpIllustration source={source} width={artWidth} height={220} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  art: {
    width: '100%',
    height: 220,
  },
});
