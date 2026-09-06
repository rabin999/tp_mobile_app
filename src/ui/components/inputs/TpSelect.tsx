import { useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type HostInstance,
} from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { useAliveRef } from '../../useAliveRef';
import { showTpMenu } from '../content/TpMenu';
import { TpGlyph } from '../content/TpGlyph';
import { TpOutlinedFieldLabel } from './TpOutlinedFieldLabel';
import { tpFieldError } from './tpFieldError';
import type { TpFieldSize } from './TpTextField';

export type TpSelectProps<T> = {
  items: T[];
  labelBuilder: (value: T) => string;
  value?: T;
  label?: string;
  hint?: string;
  accessibilityLabel?: string;
  onChanged?: (value: T) => void;
  enabled?: boolean;
  errorText?: string;
  size?: TpFieldSize;
};

/**
 * Dropdown select using the shared product menu.
 */
export function TpSelect<T>({
  items,
  labelBuilder,
  value,
  label,
  hint,
  accessibilityLabel,
  onChanged,
  enabled = true,
  errorText,
  size = 'standard',
}: TpSelectProps<T>) {
  const { colors, text } = useTpTheme();
  const alive = useAliveRef();
  const ref = useRef<HostInstance>(null);
  const selected = items.includes(value as T) ? value : undefined;
  const display = selected == null ? '' : labelBuilder(selected);
  const hasError = errorText != null && errorText.length > 0;
  const floated = display.length > 0;
  const error = tpFieldError(errorText);
  const canOpen = enabled && onChanged != null;
  const height = size === 'standard' ? tpSizes.control : tpSizes.controlCompact;

  const open = () => {
    ref.current?.measureInWindow((x, y, width, anchorHeight) => {
      if (!alive.current) {
        return;
      }

      showTpMenu({
        anchor: { x, y, width, height: anchorHeight },
        align: 'start',
        minWidth: width,
        maxWidth: width,
        items: items.map(item => ({
          value: item,
          label: labelBuilder(item),
          selected: item === value,
        })),
      }).then(next => {
        if (!alive.current || next == null) {
          return;
        }

        onChanged?.(next);
      });
    });
  };

  return (
    <View style={styles.root}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        disabled={!canOpen}
        onPress={canOpen ? open : undefined}
      >
        <View
          ref={ref}
          collapsable={false}
          style={[
            styles.box,
            {
              minHeight: height,
              borderColor: hasError
                ? colors.error
                : enabled
                ? colors.outline
                : colors.outlineVariant,
              backgroundColor: colors.surface,
              opacity: enabled ? 1 : 0.7,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              text.bodyLarge,
              styles.value,
              {
                color: colors.textMuted,
                fontSize: tpSizes.inputFont,
                lineHeight: Math.round(tpSizes.inputFont * 1.4),
              },
            ]}
          >
            {display.length === 0 ? label ?? hint ?? ' ' : display}
          </Text>
          <TpGlyph name="arrowDropDown" color={colors.textMuted} />
        </View>
      </Pressable>
      {label != null && floated ? (
        <TpOutlinedFieldLabel
          label={label}
          backgroundColor={colors.surface}
          color={hasError ? colors.error : colors.textHint}
        />
      ) : null}
      {error != null ? (
        <Text style={[text.bodySmall, styles.error, { color: colors.error }]}>
          {error.text}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'visible',
  },
  box: {
    minHeight: tpSizes.control,
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    paddingHorizontal: tpSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    flex: 1,
  },
  error: {
    marginTop: 4,
  },
});
