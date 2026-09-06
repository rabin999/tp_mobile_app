import { useState } from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  type ImageResizeMode,
  type ImageSourcePropType,
} from 'react-native';

import { tpImageCache } from '../../theme/tpImageCache';
import { tpNunito } from '../../theme/tpFonts';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from './TpGlyph';

export type TpImageFallback = 'letter' | 'avatar' | 'blank';

export type TpImageAssetProps = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  fit?: ImageResizeMode;
  semanticLabel?: string;
  borderRadius?: number;
  fallback?: TpImageFallback;
};

export type TpImageNetworkProps = {
  uri: string;
  width?: number;
  height?: number;
  fit?: ImageResizeMode;
  semanticLabel?: string;
  borderRadius?: number;
  fallback?: TpImageFallback;
};

type SharedProps = {
  source: ImageSourcePropType | null;
  width?: number;
  height?: number;
  fit: ImageResizeMode;
  semanticLabel?: string;
  borderRadius?: number;
  fallback: TpImageFallback;
  waitForLoad: boolean;
};

/**
 * Bundled raster. Prefer this for empty/error/OTP art.
 */
export function TpImageAsset({
  source,
  width,
  height,
  fit = 'contain',
  semanticLabel,
  borderRadius,
  fallback = 'blank',
}: TpImageAssetProps) {
  return (
    <TpImageFrame
      source={source}
      width={width}
      height={height}
      fit={fit}
      semanticLabel={semanticLabel}
      borderRadius={borderRadius}
      fallback={fallback}
      waitForLoad={false}
    />
  );
}

/**
 * Remote raster. Pass listing/avatar URLs here, never TpImage.Asset.
 */
export function TpImageNetwork({
  uri,
  width,
  height,
  fit = 'cover',
  semanticLabel,
  borderRadius,
  fallback = 'letter',
}: TpImageNetworkProps) {
  const usable = tpImageCache.isUsableUrl(uri);

  return (
    <TpImageFrame
      source={usable ? { uri } : null}
      width={width}
      height={height}
      fit={fit}
      semanticLabel={semanticLabel}
      borderRadius={borderRadius}
      fallback={fallback}
      waitForLoad
    />
  );
}

export const TpImage = {
  Asset: TpImageAsset,
  Network: TpImageNetwork,
};

function TpImageFrame({
  source,
  width,
  height,
  fit,
  semanticLabel,
  borderRadius,
  fallback,
  waitForLoad,
}: SharedProps) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(waitForLoad && source != null);
  const layout = tpImageCache.prepare({
    source,
    width,
    height,
    devicePixelRatio: PixelRatio.get(),
  });
  const showFallback = layout.source == null || failed || loading;
  const box = {
    width: layout.width,
    height: layout.height,
    borderRadius,
    overflow: 'hidden' as const,
  };

  return (
    <View style={box}>
      {layout.source != null && !failed ? (
        <Image
          source={layout.source}
          accessibilityLabel={semanticLabel}
          resizeMode={fit}
          resizeMethod="resize"
          fadeDuration={0}
          style={box}
          onLoad={() => setLoading(false)}
          onError={() => {
            setFailed(true);
            setLoading(false);
          }}
        />
      ) : null}
      {showFallback ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <TpImageFallbackView
            width={layout.width}
            height={layout.height}
            label={semanticLabel}
            fallback={fallback}
            borderRadius={borderRadius}
          />
        </View>
      ) : null}
    </View>
  );
}

function TpImageFallbackView({
  width,
  height,
  label,
  fallback,
  borderRadius,
}: {
  width?: number;
  height?: number;
  label?: string;
  fallback: TpImageFallback;
  borderRadius?: number;
}) {
  const { colors, text } = useTpTheme();
  const letter = (label ?? '').trim();
  const size = Math.min(Math.max((width ?? height ?? 40) * 0.7, 16), 48);

  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="image"
      style={[
        styles.fallback,
        {
          width,
          height,
          borderRadius,
          backgroundColor:
            fallback === 'blank' ? 'transparent' : colors.primaryContainer,
        },
      ]}
    >
      {fallback === 'avatar' ? (
        <TpGlyph name="person" size={size} color={colors.info} />
      ) : fallback === 'letter' ? (
        <Text
          style={[
            text.labelLarge,
            { color: colors.onSurface, ...tpNunito('500') },
          ]}
        >
          {letter.length === 0 ? '?' : letter.slice(0, 1).toUpperCase()}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
