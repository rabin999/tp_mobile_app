import { listingAvatarBadgeOffset } from '../../../src/features/listings/listingAvatarBadgeOffset';

test('pins a 12px badge on the SE rim of a 32px avatar', () => {
  expect(listingAvatarBadgeOffset(32, 12)).toBe(-1);
});
