import { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { overlayInsert } from '../../overlay/overlayHost';
import { tpCorners } from '../../theme/tpCorners';
import { tpElevation } from '../../theme/tpElevation';
import { tpNunito } from '../../theme/tpFonts';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';

export type TpMenuAction = {
  label: string;
  onPress?: () => void;
  leading?: React.ReactNode;
  destructive?: boolean;
};

export type TpMenuItem<T = string> = {
  value: T;
  label: string;
  leading?: React.ReactNode;
  selected?: boolean;
  destructive?: boolean;
  enabled?: boolean;
};

export type TpMenuAnchor = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TpMenuAlign = 'start' | 'end';

export type ShowTpMenuOptions<T> = {
  anchor: TpMenuAnchor;
  items: TpMenuItem<T>[];
  minWidth?: number;
  maxWidth?: number;
  align?: TpMenuAlign;
};

/**
 * One action in a product menu (overflow or select).
 */
export function TpMenuRow<T>({
  item,
  onPress,
}: {
  item: TpMenuItem<T>;
  onPress?: () => void;
}) {
  const { colors, text } = useTpTheme();
  const enabled = item.enabled !== false;
  const color = item.destructive
    ? colors.error
    : item.selected
    ? colors.primary
    : colors.onSurface;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !enabled, selected: item.selected }}
      disabled={!enabled}
      onPress={enabled ? onPress : undefined}
      style={({ pressed }) => [
        styles.rowWrap,
        {
          backgroundColor: item.selected
            ? colors.primaryContainer
            : pressed
            ? colors.primaryContainer
            : 'transparent',
        },
      ]}
    >
      <View style={styles.row}>
        {item.leading != null ? (
          <View style={styles.leading}>{item.leading}</View>
        ) : null}
        <Text
          numberOfLines={1}
          style={[text.labelLarge, { color, ...tpNunito('600'), flex: 1 }]}
        >
          {item.label}
        </Text>
      </View>
    </Pressable>
  );
}

/**
 * Opens a product menu anchored under a measured rect.
 */
export function showTpMenu<T>({
  anchor,
  items,
  minWidth,
  maxWidth,
  align = 'start',
}: ShowTpMenuOptions<T>): Promise<T | undefined> {
  return new Promise(resolve => {
    let settled = false;
    overlayInsert(dismiss => {
      const finish = (value?: T) => {
        if (settled) {
          return;
        }
        settled = true;
        dismiss();
        resolve(value);
      };
      return (
        <TpMenuOverlay
          anchor={anchor}
          items={items}
          minWidth={minWidth}
          maxWidth={maxWidth}
          align={align}
          onSelect={finish}
        />
      );
    });
  });
}

function TpMenuOverlay<T>({
  anchor,
  items,
  minWidth,
  maxWidth,
  align,
  onSelect,
}: ShowTpMenuOptions<T> & { onSelect: (value?: T) => void }) {
  const { colors } = useTpTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const layout = useMemo(() => {
    const preferred =
      minWidth != null && maxWidth != null && minWidth === maxWidth
        ? minWidth
        : Math.max(minWidth ?? 0, anchor.width);
    const width = Math.min(
      maxWidth ?? preferred,
      Math.max(0, screenWidth - tpSpacing.md),
    );
    const gap = 4;
    const margin = tpSpacing.xs;
    let left = align === 'end' ? anchor.x + anchor.width - width : anchor.x;
    left = Math.min(Math.max(margin, left), screenWidth - width - margin);
    let top = anchor.y + anchor.height + gap;
    const estimatedHeight = items.length * 40 + 8;
    if (top + estimatedHeight > screenHeight - margin) {
      top = Math.max(margin, anchor.y - estimatedHeight - gap);
    }
    return { left, top, width };
  }, [
    align,
    anchor.height,
    anchor.width,
    anchor.x,
    anchor.y,
    items.length,
    maxWidth,
    minWidth,
    screenHeight,
    screenWidth,
  ]);

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dismiss menu"
        onPress={() => onSelect(undefined)}
        style={styles.backdrop}
      />
      <View
        style={[
          styles.menu,
          tpElevation.menu,
          {
            left: layout.left,
            top: layout.top,
            width: layout.width,
            backgroundColor: colors.surface,
          },
        ]}
      >
        {items.map((item, index) => (
          <TpMenuRow
            key={`${String(item.value)}-${index}`}
            item={item}
            onPress={() => onSelect(item.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menu: {
    position: 'absolute',
    borderRadius: tpCorners.xs,
    overflow: 'hidden',
    paddingVertical: 4,
  },
  rowWrap: {
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: tpCorners.xs,
  },
  row: {
    minHeight: 40,
    paddingHorizontal: tpSpacing.sm,
    paddingVertical: tpSpacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leading: {
    marginRight: tpSpacing.xs,
  },
});
