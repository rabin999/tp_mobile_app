import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TpImage } from '../../../ui/components/content/TpImage';
import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpElevation } from '../../../ui/theme/tpElevation';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpImageCache } from '../../../ui/theme/tpImageCache';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { ListingAvatar } from '../../listings/ListingAvatar';

const listingCardMaxWidth = 290;
const mediaHeight = 170;

export type TaskCardBudgetType = 'FIXED' | 'HOURLY' | 'FLEXIBLE';

export type TaskCardProps = {
  title: string;
  shortDescription: string;
  authorName: string;
  createdLabel: string;
  budgetType: TaskCardBudgetType;
  budgetLabel?: string;
  imageUri?: string;
  authorAvatarUri?: string;
  authorVerified?: boolean;
  fullWidth?: boolean;
  createdCaption?: string;
  onPress?: () => void;
};

/**
 * Listing card for a customer-posted task.
 */
export function TaskCard({
  title,
  shortDescription,
  authorName,
  createdLabel,
  budgetType,
  budgetLabel,
  imageUri,
  authorAvatarUri,
  authorVerified = false,
  fullWidth = false,
  createdCaption = 'Created:',
  onPress,
}: TaskCardProps) {
  const { colors, text } = useTpTheme();
  const [mediaWidth, setMediaWidth] = useState(listingCardMaxWidth);
  const hasMedia = tpImageCache.isUsableUrl(imageUri);
  const showBudgetAmount =
    budgetType !== 'FLEXIBLE' && budgetLabel != null && budgetLabel.length > 0;

  return (
    <View
      style={[
        styles.card,
        tpElevation.listingCard,
        {
          backgroundColor: colors.surface,
          maxWidth: fullWidth ? undefined : listingCardMaxWidth,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={styles.press}
      >
        <View
          style={[styles.media, !fullWidth ? styles.mediaMinWidth : null]}
          onLayout={event => {
            const nextWidth = Math.round(event.nativeEvent.layout.width);

            if (nextWidth > 0) {
              setMediaWidth(nextWidth);
            }
          }}
        >
          {hasMedia && imageUri != null ? (
            <TpImage.Network
              uri={imageUri}
              width={mediaWidth}
              height={mediaHeight}
              fit="cover"
            />
          ) : (
            <View
              style={[
                styles.emptyMedia,
                { backgroundColor: colors.surfaceCream },
              ]}
            >
              <Text
                style={[
                  styles.emptyMediaLabel,
                  tpNunito('500'),
                  { color: colors.onSurface },
                ]}
              >
                No Image
              </Text>
            </View>
          )}
        </View>
        <View style={styles.body}>
          <View>
            <View style={styles.authorRow}>
              <ListingAvatar
                name={authorName}
                imageUri={authorAvatarUri}
                verified={authorVerified}
              />
              <Text
                style={[
                  text.bodyLarge,
                  styles.authorName,
                  tpNunito('500'),
                  { color: colors.onSurfaceVariant },
                ]}
              >
                {authorName}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.title,
                  tpNunito('600'),
                  { color: colors.onSurface },
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  text.bodyLarge,
                  styles.description,
                  { color: colors.onSurface },
                ]}
              >
                {shortDescription}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text
              style={[
                styles.budget,
                tpNunito('700'),
                { color: colors.onSurfaceVariant },
              ]}
            >
              {showBudgetAmount ? `${budgetLabel} / ` : null}
              <Text
                style={[
                  styles.budgetType,
                  tpNunito('700'),
                  { color: colors.onSurfaceVariant },
                ]}
              >
                {budgetType}
              </Text>
            </Text>
            <View style={styles.createdRow}>
              <Text
                style={[
                  styles.meta,
                  tpNunito('600'),
                  { color: colors.iconMuted },
                ]}
              >
                {createdCaption}
              </Text>
              <Text
                style={[
                  styles.meta,
                  tpNunito('600'),
                  { color: colors.onSurfaceVariant },
                ]}
              >
                {createdLabel}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: tpCorners.sm,
    position: 'relative',
  },
  press: {
    padding: 0,
    gap: tpSpacing.sm,
    borderRadius: tpCorners.sm,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: mediaHeight,
    flexShrink: 0,
    overflow: 'hidden',
    borderTopLeftRadius: tpCorners.sm,
    borderTopRightRadius: tpCorners.sm,
  },
  mediaMinWidth: {
    minWidth: listingCardMaxWidth,
  },
  emptyMedia: {
    width: '100%',
    height: mediaHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMediaLabel: {
    fontSize: 14,
  },
  body: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: tpSpacing.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.xs,
    marginBottom: tpSpacing.sm,
  },
  authorName: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 0,
  },
  description: {
    marginBottom: tpSpacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tpSpacing.lg,
  },
  budget: {
    fontSize: 13,
    flexShrink: 1,
  },
  budgetType: {
    fontSize: 13,
  },
  createdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.xxs,
    flexShrink: 0,
  },
  meta: {
    fontSize: 13,
  },
});
