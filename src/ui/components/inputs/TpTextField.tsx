import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type ReturnKeyTypeOptions,
  type TextInputProps,
} from 'react-native';

import { tpCorners } from '../../theme/tpCorners';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { tpFieldError } from './tpFieldError';

export type TpFieldSize = 'standard' | 'compact';

export type TpTextFieldProps = {
  value?: string;
  defaultValue?: string;
  label?: string;
  hint?: string;
  errorText?: string;
  enabled?: boolean;
  obscureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (value: string) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  maxLines?: number;
  size?: TpFieldSize;
  autoComplete?: TextInputProps['autoComplete'];
  autoFocus?: boolean;
};

/**
 * Outlined text field with product input decoration.
 */
export function TpTextField({
  value,
  defaultValue,
  label,
  hint,
  errorText,
  enabled = true,
  obscureText = false,
  keyboardType,
  returnKeyType,
  onChangeText,
  onSubmitEditing,
  prefix,
  suffix,
  maxLines = 1,
  size = 'standard',
  autoComplete,
  autoFocus,
}: TpTextFieldProps) {
  const { colors, text } = useTpTheme();
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState(defaultValue ?? '');
  const current = value ?? inner;
  const height = size === 'standard' ? tpSizes.control : tpSizes.controlCompact;
  const hasError = errorText != null && errorText.length > 0;
  const floated = focused || current.length > 0;
  const borderColor = hasError
    ? colors.error
    : focused
    ? colors.primary
    : enabled
    ? colors.outline
    : colors.outlineVariant;
  const error = tpFieldError(errorText);
  const multiline = !obscureText && maxLines > 1;
  const lineHeight = Math.round(tpSizes.inputFont * 1.4);
  const boxHeight = multiline ? height + (maxLines - 1) * lineHeight : height;

  const handleChange = (next: string) => {
    if (value == null) {
      setInner(next);
    }

    onChangeText?.(next);
  };

  return (
    <View>
      <View
        style={[
          styles.box,
          {
            height: multiline ? undefined : boxHeight,
            minHeight: multiline ? boxHeight : undefined,
            paddingVertical: multiline ? tpSpacing.xs : 0,
            alignItems: multiline ? 'flex-start' : 'center',
            backgroundColor: colors.surface,
            borderColor,
            opacity: enabled ? 1 : 0.7,
          },
        ]}
      >
        {label != null && floated ? (
          <View style={[styles.labelWrap, { backgroundColor: colors.surface }]}>
            <Text
              numberOfLines={1}
              style={[
                text.bodyMedium,
                {
                  color: hasError
                    ? colors.error
                    : focused
                    ? colors.primary
                    : colors.textHint,
                  fontSize: 12,
                  lineHeight: 16,
                },
              ]}
            >
              {label}
            </Text>
          </View>
        ) : null}
        {prefix != null ? <View style={styles.prefix}>{prefix}</View> : null}
        <TextInput
          value={value}
          defaultValue={value == null ? defaultValue : undefined}
          editable={enabled}
          secureTextEntry={obscureText}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          multiline={multiline}
          numberOfLines={obscureText ? 1 : maxLines}
          placeholder={floated ? hint : label ?? hint}
          placeholderTextColor={colors.textHint}
          underlineColorAndroid="transparent"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={handleChange}
          onSubmitEditing={event => onSubmitEditing?.(event.nativeEvent.text)}
          textAlignVertical={multiline ? 'top' : 'center'}
          style={[
            text.bodyLarge,
            styles.input,
            {
              color: colors.textMuted,
              fontSize: tpSizes.inputFont,
              lineHeight,
              includeFontPadding: false,
            },
          ]}
        />
        {suffix != null ? <View style={styles.suffix}>{suffix}</View> : null}
      </View>
      {error != null ? (
        <Text style={[text.bodySmall, styles.error, { color: colors.error }]}>
          {error.text}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: tpCorners.xs,
    paddingHorizontal: tpSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
  prefix: {
    marginRight: tpSpacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suffix: {
    marginLeft: tpSpacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrap: {
    position: 'absolute',
    top: -8,
    left: 12,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  error: {
    marginTop: 4,
  },
});
