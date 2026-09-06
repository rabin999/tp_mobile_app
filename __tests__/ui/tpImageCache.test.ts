import { tpImageCache } from '../../src/ui/theme/tpImageCache';

test('rejects empty and leftover URLs', () => {
  expect(tpImageCache.isUsableUrl('')).toBe(false);
  expect(tpImageCache.isUsableUrl('undefined')).toBe(false);
  expect(tpImageCache.isUsableUrl('ftp://cdn.example/photo.jpg')).toBe(false);
  expect(tpImageCache.isUsableUrl('https://cdn.example/photo.jpg')).toBe(true);
});

test('frameSize keeps aspect when only width is set', () => {
  expect(
    tpImageCache.frameSize(280, undefined, { width: 560, height: 400 }),
  ).toEqual({ width: 280, height: 200 });
});

test('network sources decode at display pixels', () => {
  expect(
    tpImageCache.withDecodeSize(
      { uri: 'https://cdn.example/photo.jpg' },
      100,
      50,
      2,
    ),
  ).toEqual({
    uri: 'https://cdn.example/photo.jpg',
    width: 200,
    height: 100,
  });
});
