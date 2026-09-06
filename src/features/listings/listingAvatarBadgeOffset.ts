/**
 * Bottom/right inset so a square badge sits on the avatar's SE rim.
 */
export function listingAvatarBadgeOffset(
  avatarSize: number,
  badgeSize: number,
): number {
  const radius = avatarSize / 2;
  const center = radius + radius * Math.SQRT1_2;
  const origin = center - badgeSize / 2;

  return Math.round(avatarSize - origin - badgeSize);
}
