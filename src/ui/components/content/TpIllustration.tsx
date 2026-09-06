import type { ImageSourcePropType } from 'react-native';

import { TpImage } from './TpImage';

export type TpIllustrationProps = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  semanticLabel?: string;
};

/**
 * Raster illustration with preserved aspect ratio.
 *
 * Bundled PNG art only. Tintable glyphs stay as SVG.
 */
export function TpIllustration({
  source,
  width,
  height,
  semanticLabel,
}: TpIllustrationProps) {
  return (
    <TpImage.Asset
      source={source}
      width={width}
      height={height}
      fit="contain"
      semanticLabel={semanticLabel}
    />
  );
}
