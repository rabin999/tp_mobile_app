import { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { overlayInsert } from '../../overlay/overlayHost';
import { tpCorners } from '../../theme/tpCorners';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { useAliveRef } from '../../useAliveRef';
import { TpButton } from '../actions/TpButton';
import { TpGlyph } from '../content/TpGlyph';
import { TpOutlinedFieldLabel } from './TpOutlinedFieldLabel';

export type TpDateFieldProps = {
  label: string;
  value?: Date | null;
  onChanged?: (value: Date) => void;
  enabled?: boolean;
  firstDate?: Date;
  lastDate?: Date;
  todayLabel?: string;
  cancelLabel?: string;
};

export type ShowTpDatePickerOptions = {
  initialDate: Date;
  firstDate: Date;
  lastDate: Date;
  todayLabel?: string;
  cancelLabel?: string;
};

/**
 * Date field that opens a product calendar with a Today action.
 */
export function TpDateField({
  label,
  value,
  onChanged,
  enabled = true,
  firstDate,
  lastDate,
  todayLabel = 'Today',
  cancelLabel = 'Cancel',
}: TpDateFieldProps) {
  const { colors, text } = useTpTheme();
  const alive = useAliveRef();
  const display =
    value == null
      ? ''
      : value.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
  const floated = display.length > 0;
  const canOpen = enabled && onChanged != null;

  const open = () => {
    const now = new Date();

    showTpDatePicker({
      initialDate: value ?? now,
      firstDate: firstDate ?? new Date(now.getFullYear() - 5, 0, 1),
      lastDate: lastDate ?? new Date(now.getFullYear() + 5, 11, 31),
      todayLabel,
      cancelLabel,
    }).then(picked => {
      if (!alive.current || picked == null) {
        return;
      }

      onChanged?.(picked);
    });
  };

  return (
    <View style={styles.root}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        disabled={!canOpen}
        onPress={canOpen ? open : undefined}
      >
        <View
          style={[
            styles.box,
            {
              borderColor: enabled ? colors.outline : colors.outlineVariant,
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
            {display.length === 0 ? label : display}
          </Text>
          <TpGlyph name="calendar" color={colors.onSurfaceVariant} />
        </View>
      </Pressable>
      {floated ? (
        <TpOutlinedFieldLabel
          label={label}
          backgroundColor={colors.surface}
          color={colors.textHint}
        />
      ) : null}
    </View>
  );
}

/**
 * Platform date picker. Android uses the native dialog. iOS uses an
 * inline calendar in a modal with Today and Cancel.
 */
export function showTpDatePicker({
  initialDate,
  firstDate,
  lastDate,
  todayLabel = 'Today',
  cancelLabel = 'Cancel',
}: ShowTpDatePickerOptions): Promise<Date | undefined> {
  let initial = initialDate;

  if (initial < firstDate) {
    initial = firstDate;
  } else if (initial > lastDate) {
    initial = lastDate;
  }

  return new Promise(resolve => {
    let settled = false;

    overlayInsert(dismiss => {
      const finish = (date?: Date) => {
        if (settled) {
          return;
        }

        settled = true;
        dismiss();
        resolve(date);
      };

      return (
        <TpDatePickerHost
          initialDate={initial}
          firstDate={firstDate}
          lastDate={lastDate}
          todayLabel={todayLabel}
          cancelLabel={cancelLabel}
          onDone={finish}
        />
      );
    });
  });
}

function startOfToday(): Date {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function clampDate(value: Date, first: Date, last: Date): Date {
  if (value < first) {
    return first;
  }

  if (value > last) {
    return last;
  }

  return value;
}

function TpDatePickerHost({
  initialDate,
  firstDate,
  lastDate,
  todayLabel,
  cancelLabel,
  onDone,
}: {
  initialDate: Date;
  firstDate: Date;
  lastDate: Date;
  todayLabel: string;
  cancelLabel: string;
  onDone: (date?: Date) => void;
}) {
  const { colors } = useTpTheme();
  const [draft, setDraft] = useState(initialDate);
  const today = clampDate(startOfToday(), firstDate, lastDate);
  const todayEnabled =
    startOfToday() >= firstDate && startOfToday() <= lastDate;

  if (Platform.OS === 'android') {
    return (
      <DateTimePicker
        value={initialDate}
        mode="date"
        display="default"
        minimumDate={firstDate}
        maximumDate={lastDate}
        onChange={(event, date) => {
          if (event.type === 'dismissed') {
            onDone(undefined);
            return;
          }

          onDone(date);
        }}
      />
    );
  }

  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={() => onDone(undefined)}
    >
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={cancelLabel}
          style={styles.scrim}
          onPress={() => onDone(undefined)}
        />
        <View style={[styles.dialog, { backgroundColor: colors.surface }]}>
          <DateTimePicker
            value={draft}
            mode="date"
            display="inline"
            minimumDate={firstDate}
            maximumDate={lastDate}
            onChange={(_event, date) => {
              if (date == null) {
                return;
              }

              setDraft(date);
              if (date.getTime() !== initialDate.getTime()) {
                onDone(date);
              }
            }}
          />
          <View
            style={[styles.hairline, { backgroundColor: colors.outline }]}
          />
          <View style={styles.actions}>
            <TpButton
              label={cancelLabel}
              variant="outlined"
              onPress={() => onDone(undefined)}
            />
            <View style={styles.actionGap} />
            <TpButton
              label={todayLabel}
              variant="outlined"
              onPress={todayEnabled ? () => onDone(today) : undefined}
            />
          </View>
        </View>
      </View>
    </Modal>
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
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: tpSpacing.md,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dialog: {
    borderRadius: tpCorners.xs,
    overflow: 'hidden',
  },
  hairline: {
    height: 1,
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.sm,
    paddingBottom: tpSpacing.md,
  },
  actionGap: {
    width: tpSpacing.xs,
  },
});
