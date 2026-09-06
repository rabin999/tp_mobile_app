import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';

import { TpButton } from '../../../ui/components/actions/TpButton';
import { TpImage } from '../../../ui/components/content/TpImage';
import { TpSvgIcon } from '../../../ui/components/content/TpSvgIcon';
import { tpAssets } from '../../../ui/theme/tpAssets';
import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpImageCache } from '../../../ui/theme/tpImageCache';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { ListingAvatar } from '../../listings/ListingAvatar';

const mediaHeight = 160;
const defaultMediaWidth = 328;
const pinSize = 17;
const categoryChipHeight = 22;
const visitChipHeight = 24;

export type ProviderListedServiceCardProps = {
  title: string;
  priceLabel: string;
  viewLabel: string;
  description?: string;
  categoryLabel?: string;
  imageUri?: string;
  providerName: string;
  providerAvatarUri?: string;
  providerVerified?: boolean;
  customerVisitRequired?: boolean;
  address?: string;
  customerVisitLabel?: string;
  onPress?: () => void;
  onProviderPress?: () => void;
  onViewPress?: () => void;
};

/**
 * Public provider-listed service card matching web mobile /services.
 */
export function ProviderListedServiceCard({
  title,
  priceLabel,
  viewLabel,
  description,
  categoryLabel,
  imageUri,
  providerName,
  providerAvatarUri,
  providerVerified = false,
  customerVisitRequired = false,
  address,
  customerVisitLabel,
  onPress,
  onProviderPress,
  onViewPress,
}: ProviderListedServiceCardProps) {
  const { colors } = useTpTheme();
  const [mediaWidth, setMediaWidth] = useState(defaultMediaWidth);
  const showImage = tpImageCache.isUsableUrl(imageUri);
  const showVisit = customerVisitRequired && (address?.trim().length ?? 0) > 0;

  const onCardLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.round(event.nativeEvent.layout.width);

    if (nextWidth > 0) {
      setMediaWidth(current => (current === nextWidth ? current : nextWidth));
    }
  };

  const onInnerPress = (event: GestureResponderEvent, action?: () => void) => {
    event.stopPropagation();
    action?.();
  };

  return (
    <Pressable
      accessibilityRole={onPress != null ? 'button' : undefined}
      onPress={onPress}
      onLayout={onCardLayout}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <View style={[styles.media, { backgroundColor: colors.band }]}>
        {showImage ? (
          <TpImage.Network
            uri={imageUri ?? ''}
            width={mediaWidth}
            height={mediaHeight}
            fit="cover"
            semanticLabel={title}
            fallback="blank"
          />
        ) : (
          <Text
            style={[
              styles.noImage,
              tpNunito('400'),
              { color: colors.textMuted },
            ]}
          >
            No Image
          </Text>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.metaRow}>
          <View style={styles.chips}>
            {categoryLabel != null && categoryLabel.length > 0 ? (
              <View
                style={[
                  styles.categoryChip,
                  { backgroundColor: colors.infoContainer },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.categoryLabel,
                    tpNunito('500'),
                    { color: colors.info },
                  ]}
                >
                  {categoryLabel}
                </Text>
              </View>
            ) : null}
          </View>
          <Text
            style={[styles.price, tpNunito('700'), { color: colors.onSurface }]}
          >
            {priceLabel}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          style={[styles.title, tpNunito('700'), { color: colors.onSurface }]}
        >
          {title}
        </Text>
        <View style={styles.providerRow}>
          <ListingAvatar
            name={providerName}
            imageUri={providerAvatarUri}
            verified={providerVerified}
          />
          <Pressable
            accessibilityRole={onProviderPress != null ? 'button' : undefined}
            onPress={
              onProviderPress != null
                ? event => onInnerPress(event, onProviderPress)
                : undefined
            }
            style={styles.providerNameHit}
          >
            <Text
              style={[
                styles.providerName,
                tpNunito('500'),
                { color: colors.onSurface },
              ]}
            >
              {providerName}
            </Text>
          </Pressable>
        </View>
        {showVisit ? (
          <View style={styles.visitBlock}>
            {customerVisitLabel != null && customerVisitLabel.length > 0 ? (
              <View
                style={[
                  styles.visitChip,
                  {
                    backgroundColor: colors.successContainer,
                    borderColor: colors.success,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.visitLabel,
                    tpNunito('700'),
                    { color: colors.success },
                  ]}
                >
                  {customerVisitLabel}
                </Text>
              </View>
            ) : null}
            <View style={styles.addressRow}>
              <View style={styles.pin}>
                <TpSvgIcon
                  source={tpAssets.iconGps}
                  size={pinSize}
                  color={colors.iconMuted}
                />
              </View>
              <Text
                numberOfLines={2}
                style={[
                  styles.address,
                  tpNunito('600'),
                  { color: colors.textSecondary },
                ]}
              >
                {address}
              </Text>
            </View>
          </View>
        ) : null}
        {description != null && description.length > 0 ? (
          <Text
            numberOfLines={3}
            style={[
              styles.description,
              tpNunito('400'),
              { color: colors.textSecondary },
            ]}
          >
            {description}
          </Text>
        ) : null}
      </View>
      <View style={[styles.footer, { borderTopColor: colors.outlineVariant }]}>
        <Pressable
          accessible={false}
          onPress={event => event.stopPropagation()}
        >
          <TpButton
            label={viewLabel}
            size="compact"
            variant="filled"
            onPress={onViewPress}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: tpCorners.sm,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: mediaHeight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  noImage: {
    fontSize: 14,
    lineHeight: 20,
  },
  body: {
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.md,
    paddingBottom: tpSpacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tpSpacing.xs,
  },
  chips: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 0,
  },
  categoryChip: {
    height: categoryChipHeight,
    borderRadius: tpCorners.pill,
    paddingHorizontal: tpSpacing.xs,
    justifyContent: 'center',
    maxWidth: '100%',
    flexShrink: 1,
  },
  categoryLabel: {
    fontSize: 11,
    lineHeight: 14,
  },
  price: {
    flexShrink: 0,
    marginLeft: tpSpacing.xs,
    fontSize: 15,
    lineHeight: 22.5,
  },
  title: {
    marginBottom: tpSpacing.xxs,
    fontSize: 16,
    lineHeight: 22.4,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.sm,
    marginBottom: tpSpacing.xs,
  },
  providerNameHit: {
    flex: 1,
    minWidth: 0,
  },
  providerName: {
    fontSize: 13,
    lineHeight: 19.5,
  },
  visitBlock: {
    marginTop: 10,
    marginBottom: 10,
  },
  visitChip: {
    alignSelf: 'flex-start',
    height: visitChipHeight,
    borderRadius: tpCorners.pill,
    borderWidth: 1,
    paddingHorizontal: tpSpacing.xs,
    justifyContent: 'center',
    marginBottom: 6,
  },
  visitLabel: {
    fontSize: 11,
    lineHeight: 14,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  pin: {
    marginTop: 2,
  },
  address: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    lineHeight: 18.85,
  },
  description: {
    fontSize: 15,
    lineHeight: 22.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: tpSpacing.md,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
});
