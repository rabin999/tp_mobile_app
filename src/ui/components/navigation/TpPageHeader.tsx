import { StyleSheet, Text, View } from 'react-native';

import { tpElevation } from '../../theme/tpElevation';
import { tpNunito } from '../../theme/tpFonts';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpBackButton } from './TpBackButton';

export type TpPageHeaderProps = {
  title: string;
  subtitle?: string;
  backTooltip?: string;
  onBack?: () => void;
  trailing?: React.ReactNode;
  showBack?: boolean;
  sticky?: boolean;
};

/**
 * In-page header: centered title with optional back and trailing.
 *
 * Matches Header.mobile.
 */
export function TpPageHeader({
  title,
  subtitle,
  backTooltip,
  onBack,
  trailing,
  showBack = true,
  sticky = true,
}: TpPageHeaderProps) {
  const { colors, text } = useTpTheme();

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: colors.surface },
        sticky ? tpElevation.pageHeader : null,
      ]}
    >
      <View style={styles.row}>
        {showBack ? (
          <TpBackButton tooltip={backTooltip ?? title} onPress={onBack} />
        ) : (
          <View style={styles.slot} />
        )}
        {trailing != null ? <View style={styles.slot} /> : null}
        <View style={styles.titles}>
          <Text
            numberOfLines={2}
            style={[
              text.titleMedium,
              {
                ...tpNunito('600'),
                color: colors.onSurfaceVariant,
                textAlign: 'center',
              },
            ]}
          >
            {title}
          </Text>
          {subtitle != null ? (
            <Text
              numberOfLines={2}
              style={[
                text.bodyMedium,
                { color: colors.textSecondary, textAlign: 'center' },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        {showBack ? <View style={styles.slot} /> : null}
        {trailing != null ? <View style={styles.slot}>{trailing}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titles: {
    flex: 1,
  },
  slot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
