import { useState } from 'react';

import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';
import { TpIconButton } from '../actions/TpIconButton';
import { TpTextField } from './TpTextField';

export type TpPasswordFieldProps = {
  value?: string;
  defaultValue?: string;
  label?: string;
  hint?: string;
  errorText?: string;
  enabled?: boolean;
  onChangeText?: (value: string) => void;
  showTooltip?: string;
  hideTooltip?: string;
};

/**
 * Password field with a visibility toggle.
 */
export function TpPasswordField({
  value,
  defaultValue,
  label,
  hint,
  errorText,
  enabled = true,
  onChangeText,
  showTooltip = 'Show password',
  hideTooltip = 'Hide password',
}: TpPasswordFieldProps) {
  const { colors } = useTpTheme();
  const [obscure, setObscure] = useState(true);

  return (
    <TpTextField
      value={value}
      defaultValue={defaultValue}
      label={label}
      hint={hint}
      errorText={errorText}
      enabled={enabled}
      obscureText={obscure}
      onChangeText={onChangeText}
      keyboardType="default"
      returnKeyType="done"
      autoComplete="password"
      suffix={
        <TpIconButton
          tooltip={obscure ? showTooltip : hideTooltip}
          onPress={() => setObscure(hidden => !hidden)}
          icon={
            <TpGlyph
              name={obscure ? 'visibility' : 'visibilityOff'}
              color={colors.outline}
            />
          }
        />
      }
    />
  );
}
