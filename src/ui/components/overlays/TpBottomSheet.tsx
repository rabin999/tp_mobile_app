import { type ReactNode } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { overlayInsert } from '../../overlay/overlayHost';
import { tpCorners } from '../../theme/tpCorners';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';
import { TpIconButton } from '../actions/TpIconButton';

export type TpBottomSheetProps = {
  children: ReactNode;
  fullscreen?: boolean;
  title?: string;
  onClose?: () => void;
  closeTooltip?: string;
};

export type ShowTpBottomSheetOptions<T> = {
  children: ReactNode | ((dismiss: (value?: T) => void) => ReactNode);
  fullscreen?: boolean;
  isDismissible?: boolean;
};

/**
 * Shows a product bottom sheet that slides up.
 */
export function showTpBottomSheet<T = void>({
  children,
  fullscreen = false,
  isDismissible = true,
}: ShowTpBottomSheetOptions<T>): Promise<T | undefined> {
  return new Promise(resolve => {
    let settled = false;
    overlayInsert(dismissOverlay => {
      const finish = (value?: T) => {
        if (settled) {
          return;
        }
        settled = true;
        dismissOverlay();
        resolve(value);
      };
      const body = typeof children === 'function' ? children(finish) : children;
      return (
        <SheetModal
          fullscreen={fullscreen}
          isDismissible={isDismissible}
          onDismiss={() => finish(undefined)}
        >
          {body}
        </SheetModal>
      );
    });
  });
}

/**
 * Bottom sheet: rounded top corners, optional 90% max height.
 */
export function TpBottomSheet({
  children,
  fullscreen = false,
  title,
  onClose,
  closeTooltip = 'Close',
}: TpBottomSheetProps) {
  const { text } = useTpTheme();
  const { height } = useWindowDimensions();
  const maxHeight = height * (fullscreen ? 1 : tpSizes.sheetMaxHeightFactor);
  let body: ReactNode = children;
  if (title != null) {
    body = (
      <View style={styles.titled}>
        <View style={styles.header}>
          <Text
            numberOfLines={2}
            style={[text.headlineSmall, styles.headerTitle]}
          >
            {title}
          </Text>
          <TpIconButton
            tooltip={closeTooltip}
            onPress={onClose}
            icon={<TpGlyph name="close" />}
          />
        </View>
        <View style={styles.flex}>{children}</View>
      </View>
    );
  }
  return (
    <View style={[styles.sheetBody, { maxHeight, minWidth: '100%' }]}>
      {body}
    </View>
  );
}

function SheetModal({
  children,
  fullscreen,
  isDismissible,
  onDismiss,
}: {
  children: ReactNode;
  fullscreen: boolean;
  isDismissible: boolean;
  onDismiss: () => void;
}) {
  const { colors } = useTpTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={isDismissible ? onDismiss : undefined}
    >
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          disabled={!isDismissible}
          onPress={isDismissible ? onDismiss : undefined}
          style={styles.scrim}
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <TpBottomSheet fullscreen={fullscreen}>{children}</TpBottomSheet>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    borderTopLeftRadius: tpCorners.md,
    borderTopRightRadius: tpCorners.md,
    overflow: 'hidden',
    maxHeight: '90%',
  },
  sheetBody: {
    width: '100%',
  },
  titled: {
    maxHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: tpSpacing.md,
    paddingRight: tpSpacing.xs,
    paddingVertical: tpSpacing.sm,
  },
  headerTitle: {
    flex: 1,
  },
  flex: {
    flexShrink: 1,
  },
});
