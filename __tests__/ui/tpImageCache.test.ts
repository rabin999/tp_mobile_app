import { tpImageCache } from '../../src/ui/theme/tpImageCache';

test('rejects empty and leftover URLs', () => {
  expect(tpImageCache.isUsableUrl('')).toBe(false);
  expect(tpImageCache.isUsableUrl('undefined')).toBe(false);
  expect(tpImageCache.isUsableUrl('ftp://cdn.example/photo.jpg')).toBe(false);
  expect(tpImageCache.isUsableUrl('https://cdn.example/photo.jpg')).toBe(true);
});
