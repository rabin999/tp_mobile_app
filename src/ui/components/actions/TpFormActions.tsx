import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { tpSpacing } from '../../theme/tpSpacing';

export type TpFormActionsProps = {
  primary: ReactNode;
  cancel?: ReactNode;
};

/**
 * Form / sheet footer actions.
 *
 * A lone primary stays centered at content width. When Cancel is present it
 * sits on the left and the primary action on the right - same as web confirm
 * and filter footers (`stickyBottomStyles`, `DialogActions`).
 */
export function TpFormActions({ primary, cancel }: TpFormActionsProps) {
  return (
    <View style={[styles.row, cancel != null ? styles.split : styles.center]}>
      {cancel}
      {primary}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.sm,
  },
  center: {
    justifyContent: 'center',
  },
  split: {
    justifyContent: 'space-between',
  },
});
