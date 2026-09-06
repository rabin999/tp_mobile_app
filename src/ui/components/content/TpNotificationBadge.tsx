import { StyleSheet, Text, View } from 'react-native';

import { useTpTheme } from '../../theme/tpTheme';

export type TpNotificationBadgeProps = {
  count: number;
  children: React.ReactNode;
};

/**
 * Unread count badge wrapping a child (notifications tab).
 */
export function TpNotificationBadge({
  count,
  children,
}: TpNotificationBadgeProps) {
  const { colors, text } = useTpTheme();

  if (count <= 0) {
    return <>{children}</>;
  }

  return (
    <View style={styles.wrap}>
      {children}
      <View style={[styles.badge, { backgroundColor: colors.error }]}>
        <Text
          style={[
            text.labelSmall,
            { color: colors.onPrimary, fontSize: 10, lineHeight: 12 },
          ]}
        >
          {count > 99 ? '99+' : `${count}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
