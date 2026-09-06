/**
 * Decode-size helpers for rasters.
 *
 * Static kit art is bundled. Dynamic listing/avatar photos arrive as URLs.
 * Both must decode at **display size**, not intrinsic pixels.
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
};
