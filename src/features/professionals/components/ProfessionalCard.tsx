import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TpSvgIcon } from '../../../ui/components/content/TpSvgIcon';
import { tpAssets } from '../../../ui/theme/tpAssets';
import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpElevation } from '../../../ui/theme/tpElevation';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { ListingAvatar } from '../../listings/ListingAvatar';

export type ProfessionalCardProps = {
  name: string;
  joinedLabel: string;
  ratingLabel: string;
  description?: string;
  categories?: readonly string[];
  avatarUri?: string;
  verified?: boolean;
  onPress?: () => void;
  offerLabel?: string;
  onOfferPress?: () => void;
};

const defaultOfferLabel = 'Offer Tasks';
const starSize = 16;
const bodyPadX = 14;
const offerPadY = 6;

/**
 * Professional listing card matching web mobile ProfessionalCardMobile.
 */
export function ProfessionalCard({
  name,
  joinedLabel,
  ratingLabel,
  description,
  categories,
  avatarUri,
  verified = false,
  onPress,
  offerLabel,
  onOfferPress,
}: ProfessionalCardProps) {
  const { colors, text } = useTpTheme();
  const hasOffer = onOfferPress != null;
  const showDescription = description != null && description.length > 0;
  const showCategories = categories != null && categories.length > 0;

  const body = (
    <View
      style={[
        styles.body,
        { paddingBottom: hasOffer ? tpSpacing.xs : tpSpacing.md },
      ]}
    >
      <ListingAvatar name={name} imageUri={avatarUri} verified={verified} />
      <View style={styles.copy}>
        <View style={styles.headline}>
          <View style={styles.identity}>
            <Text
              style={[
                styles.name,
                tpNunito('500'),
                { color: colors.onSurface },
              ]}
            >
              {name}
            </Text>
            <Text
              style={[
                styles.joined,
                tpNunito('400'),
                { color: colors.onSurfaceVariant },
              ]}
            >
              {joinedLabel}
            </Text>
          </View>
          <View style={styles.rating}>
            <View style={styles.star}>
              <TpSvgIcon source={tpAssets.iconStar} size={starSize} />
            </View>
            <Text
              style={[
                text.bodyLarge,
                styles.ratingValue,
                tpNunito('400'),
                { color: colors.onSurface },
              ]}
            >
              {ratingLabel}
            </Text>
          </View>
        </View>
        {showDescription ? (
          <Text
            style={[
              text.titleSmall,
              styles.description,
              { color: colors.onSurfaceVariant },
            ]}
          >
            {description}
          </Text>
        ) : null}
        {showCategories ? (
          <View style={styles.categories}>
            {categories.map((category, index) => (
              <View
                key={`${category}-${index}`}
                style={[styles.chip, { borderColor: colors.outline }]}
              >
                <Text style={[text.labelSmall, { color: colors.onSurface }]}>
                  {category.length > 0 ? category : 'Unknown Category'}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.card,
        tpElevation.listingCard,
        { backgroundColor: colors.surface },
      ]}
    >
      {onPress != null ? (
        <Pressable accessibilityRole="button" onPress={onPress}>
          {body}
        </Pressable>
      ) : (
        body
      )}
      {hasOffer ? (
        <View style={[styles.footer, { borderTopColor: colors.divider }]}>
          <Pressable
            accessibilityRole="button"
            onPress={event => {
              event.stopPropagation();
              onOfferPress();
            }}
            style={({ pressed }) => [
              styles.offer,
              {
                backgroundColor: colors.primaryContainer,
                opacity: pressed ? 0.72 : 1,
              },
            ]}
          >
            <Text
              style={[
                text.labelLarge,
                tpNunito('600'),
                { color: colors.primary },
              ]}
            >
              {offerLabel ?? defaultOfferLabel}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: tpCorners.sm,
  },
  body: {
    flexDirection: 'row',
    gap: tpSpacing.xs,
    paddingHorizontal: bodyPadX,
    paddingTop: tpSpacing.md,
  },
  copy: {
    flex: 1,
    minWidth: 174,
    maxWidth: '100%',
    justifyContent: 'center',
  },
  headline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  identity: {
    flex: 1,
    marginBottom: tpSpacing.xs,
  },
  name: {
    fontSize: 16,
    lineHeight: 17.6,
    marginBottom: 0,
  },
  joined: {
    fontSize: 12,
    lineHeight: 17,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  star: {
    marginRight: tpSpacing.xxs,
  },
  ratingValue: {
    marginTop: tpSpacing.xxs,
  },
  description: {
    flexShrink: 1,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tpSpacing.xs,
    marginTop: tpSpacing.md,
  },
  chip: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: tpCorners.pill,
    paddingHorizontal: tpSpacing.xs,
    paddingVertical: tpSpacing.xxs,
  },
  footer: {
    paddingHorizontal: bodyPadX,
    paddingVertical: tpSpacing.sm,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offer: {
    borderRadius: tpCorners.xs,
    paddingHorizontal: tpSpacing.xxl,
    paddingVertical: offerPadY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
