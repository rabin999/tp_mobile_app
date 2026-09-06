import { useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewInstance,
  type ScrollViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tpSpacing } from '../../theme/tpSpacing';
import {
  tpKeyboardScrollBottomInset,
  tpScrollDeltaToClearKeyboard,
} from './tpKeyboardInset';
import { useTpKeyboardMetrics } from './useTpKeyboardMetrics';

export type TpKeyboardScrollViewProps = ScrollViewProps;

/**
 * Form scroll view: grows when the keyboard opens and keeps the focused
 * field in the remaining viewport.
 */
export function TpKeyboardScrollView({
  children,
  contentContainerStyle,
  keyboardShouldPersistTaps = 'handled',
  keyboardDismissMode = 'none',
  nestedScrollEnabled = true,
  onScroll,
  style,
  testID = 'tp-keyboard-scroll',
  ...rest
}: TpKeyboardScrollViewProps) {
  const insets = useSafeAreaInsets();
  const metrics = useTpKeyboardMetrics();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const offsetY = useRef(0);
  const flat = StyleSheet.flatten(contentContainerStyle);
  const restBottom =
    typeof flat?.paddingBottom === 'number' ? flat.paddingBottom : 0;

  useEffect(() => {
    if (metrics.height <= 0) {
      return;
    }

    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }

      const focused = TextInput.State.currentlyFocusedInput();

      if (focused == null) {
        return;
      }

      focused.measureInWindow((_x, y, _width, height) => {
        if (cancelled) {
          return;
        }

        const delta = tpScrollDeltaToClearKeyboard({
          fieldBottom: y + height,
          keyboardTop: metrics.screenY,
          margin: tpSpacing.xl,
        });

        if (delta > 0) {
          scrollRef.current?.scrollTo({
            y: offsetY.current + delta,
            animated: true,
          });
        }
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [metrics.height, metrics.screenY]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    offsetY.current = event.nativeEvent.contentOffset.y;
    onScroll?.(event);
  };

  return (
    <ScrollView
      {...rest}
      ref={scrollRef}
      testID={testID}
      style={[styles.flex, style]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      keyboardDismissMode={keyboardDismissMode}
      nestedScrollEnabled={nestedScrollEnabled}
      scrollEventThrottle={16}
      onScroll={handleScroll}
      contentContainerStyle={[
        contentContainerStyle,
        {
          paddingBottom: tpKeyboardScrollBottomInset({
            rest: restBottom,
            safeBottom: insets.bottom,
            keyboardHeight: metrics.height,
          }),
        },
      ]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
