import { StyleSheet, Text, View } from 'react-native';

import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpButton } from '../actions/TpButton';
import { TpFormActions } from '../actions/TpFormActions';
import { showTpBottomSheet } from './TpBottomSheet';

export type TpConfirmSheetProps = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

/**
 * Confirm dialog body: title, message, Cancel + confirm in a bottom sheet.
 *
 * Matches web mobile delete/confirm sheets (header, body, footer).
 */
export function TpConfirmSheet({
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: TpConfirmSheetProps) {
  const { colors, text } = useTpTheme();
  const rule = { borderColor: colors.outlineVariant };

  return (
    <View>
      <View style={[styles.header, rule]}>
        <Text numberOfLines={2} style={text.headlineMedium}>
          {title}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={[text.bodyLarge, { color: colors.textSecondary }]}>
          {message}
        </Text>
      </View>
      <View style={[styles.footer, rule]}>
        <TpFormActions
          cancel={
            <TpButton
              label={cancelLabel}
              variant="text"
              tone="neutral"
              onPress={loading ? undefined : onCancel}
            />
          }
          primary={
            <TpButton
              label={confirmLabel}
              tone={destructive ? 'danger' : 'primary'}
              loading={loading}
              onPress={onConfirm}
            />
          }
        />
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
  header: {
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.md,
    paddingBottom: tpSpacing.sm,
    borderBottomWidth: 1,
  },
  body: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.md,
  },
  footer: {
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.sm,
    paddingBottom: tpSpacing.md,
    borderTopWidth: 1,
  },
});
