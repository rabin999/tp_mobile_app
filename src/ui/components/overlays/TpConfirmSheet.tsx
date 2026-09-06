import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpButton } from '../actions/TpButton';
import { showTpBottomSheet } from './TpBottomSheet';

export type TpConfirmSheetProps = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

/**
 * Confirmation copy shown in a bottom sheet.
 */
export function TpConfirmSheet({
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
}: TpConfirmSheetProps) {
  const { colors, text } = useTpTheme();
  return (
    <View style={styles.body}>
      <Text
        numberOfLines={2}
        style={[
          text.headlineMedium,
          { ...tpNunito('600'), textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
      <View style={styles.messageGap} />
      <Text
        style={[
          text.bodyLarge,
          { color: colors.textSecondary, textAlign: 'center' },
        ]}
      >
        {message}
      </Text>
      <View style={styles.actionsGap} />
      <View style={styles.actions}>
        <TpButton label={cancelLabel} variant="outlined" onPress={onCancel} />
        <View style={styles.actionGap} />
        {destructive ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={confirmLabel}
            disabled={onConfirm == null}
            onPress={onConfirm}
            style={({ pressed }) => [
              styles.destructive,
              {
                backgroundColor: colors.error,
                opacity: pressed ? 0.72 : onConfirm == null ? 0.4 : 1,
              },
            ]}
          >
            <Text
              style={[
                text.labelLarge,
                { color: colors.onPrimary, ...tpNunito('600') },
              ]}
            >
              {confirmLabel}
            </Text>
          </Pressable>
        ) : (
          <TpButton label={confirmLabel} onPress={onConfirm} />
        )}
      </View>
    </View>
  );
}

export namespace TpConfirmSheet {
  /**
   * Opens the sheet and returns `true` when confirmed.
   */
  export function show(options: {
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel: string;
    destructive?: boolean;
  }): Promise<boolean | undefined> {
    return showTpBottomSheet<boolean>({
      children: dismiss => (
        <TpConfirmSheet
          title={options.title}
          message={options.message}
          confirmLabel={options.confirmLabel}
          cancelLabel={options.cancelLabel}
          destructive={options.destructive}
          onConfirm={() => dismiss(true)}
          onCancel={() => dismiss(false)}
        />
      ),
    });
  }
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: tpSpacing.lg,
    paddingTop: tpSpacing.md,
    paddingBottom: tpSpacing.lg,
  },
  messageGap: {
    height: tpSpacing.xs,
  },
  actionsGap: {
    height: tpSpacing.xxl,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionGap: {
    width: tpSpacing.xs,
  },
  destructive: {
    height: tpSizes.control,
    paddingHorizontal: tpSpacing.md,
    borderRadius: tpCorners.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
