import { Image, type ImageSourcePropType } from 'react-native';

export type TpImageMeasure = {
  width: number;
  height: number;
};

export type TpImagePrepareInput = {
  source: ImageSourcePropType | null;
  width?: number;
  height?: number;
  devicePixelRatio: number;
};

export type TpImagePrepared = {
  width?: number;
  height?: number;
  source: ImageSourcePropType | null;
};

/**
 * Raster policy: URLs, display size, and decode size.
 *
 * `TpImage` renders. This module decides how large a bitmap may be.
 */
export const tpImageCache = {
  maxDecodePx: 4096,

  cachePixels(
    logical: number | undefined,
    devicePixelRatio: number,
  ): number | undefined {
    if (logical == null || logical <= 0 || devicePixelRatio <= 0) {
      return undefined;
    }

    const pixels = Math.round(logical * devicePixelRatio);

    if (pixels < 1) {
      return 1;
    }

    if (pixels > tpImageCache.maxDecodePx) {
      return tpImageCache.maxDecodePx;
    }

    return pixels;
  },

  /**
   * True when `url` is a real http(s) address, not an empty/MUI leftover.
   */
  isUsableUrl(url: string | null | undefined): boolean {
    if (url == null) {
      return false;
    }

    const trimmed = url.trim();

    if (trimmed.length === 0) {
      return false;
    }

    if (trimmed.includes('undefined') || trimmed.includes('null')) {
      return false;
    }

    try {
      const uri = new URL(trimmed);

      return uri.protocol === 'http:' || uri.protocol === 'https:';
    } catch {
      return false;
    }
  },

  measureAsset(source: ImageSourcePropType): TpImageMeasure | undefined {
    if (typeof source !== 'number') {
      return undefined;
    }

    const resolved = Image.resolveAssetSource(source);

    if (
      resolved == null ||
      typeof resolved.width !== 'number' ||
      typeof resolved.height !== 'number' ||
      resolved.width < 1 ||
      resolved.height < 1
    ) {
      return undefined;
    }

    return { width: resolved.width, height: resolved.height };
  },

  frameSize(
    width: number | undefined,
    height: number | undefined,
    measured: TpImageMeasure | undefined,
  ): { width?: number; height?: number } {
    const ratio =
      measured != null ? measured.width / measured.height : undefined;
    const drawnWidth = width ?? height ?? measured?.width;
    const drawnHeight =
      height ??
      (drawnWidth != null && ratio != null
        ? drawnWidth / ratio
        : measured?.height);

    return { width: drawnWidth, height: drawnHeight };
  },

  withDecodeSize(
    source: ImageSourcePropType | null,
    width: number | undefined,
    height: number | undefined,
    devicePixelRatio: number,
  ): ImageSourcePropType | null {
    if (source == null) {
      return null;
    }

    const cacheWidth = tpImageCache.cachePixels(width, devicePixelRatio);
    const cacheHeight = tpImageCache.cachePixels(height, devicePixelRatio);

    if (
      typeof source === 'object' &&
      !Array.isArray(source) &&
      'uri' in source &&
      typeof source.uri === 'string' &&
      cacheWidth != null &&
      cacheHeight != null
    ) {
      return { uri: source.uri, width: cacheWidth, height: cacheHeight };
    }

    return source;
  },

  prepare({
    source,
    width,
    height,
    devicePixelRatio,
  }: TpImagePrepareInput): TpImagePrepared {
    const measured =
      source != null ? tpImageCache.measureAsset(source) : undefined;
    const frame = tpImageCache.frameSize(width, height, measured);

    return {
      width: frame.width,
      height: frame.height,
      source: tpImageCache.withDecodeSize(
        source,
        frame.width,
        frame.height,
        devicePixelRatio,
      ),
    };
  },
};
