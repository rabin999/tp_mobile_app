import { StyleSheet, View } from 'react-native';

import { TpImage } from '../../ui/components/content/TpImage';
import { TpVerificationBadge } from '../../ui/components/content/TpVerificationBadge';
import { tpSizes } from '../../ui/theme/tpSizes';
import { listingAvatarBadgeOffset } from './listingAvatarBadgeOffset';

const listingAvatarBadgeSize = 12;

export type ListingAvatarProps = {
  name: string;
  imageUri?: string;
  verified?: boolean;
  verifiedLabel?: string;
  size?: number;
};

/**
 * Circular listing avatar with an optional verification mark on the rim.
 */
export function ListingAvatar({
  name,
  imageUri,
  verified = false,
  verifiedLabel = 'Verified',
  size = tpSizes.avatarSm,
}: ListingAvatarProps) {
  const offset = listingAvatarBadgeOffset(size, listingAvatarBadgeSize);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <TpImage.Network
        uri={imageUri ?? ''}
        width={size}
        height={size}
        fit="cover"
        semanticLabel={name}
        borderRadius={size / 2}
        fallback="avatar"
      />
      {verified ? (
        <View
          accessible
          accessibilityLabel={verifiedLabel}
          pointerEvents="none"
          style={[styles.badge, { bottom: offset, right: offset }]}
        >
          <TpVerificationBadge verified size={listingAvatarBadgeSize} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'visible',
  },
  badge: {
    position: 'absolute',
  },
});
