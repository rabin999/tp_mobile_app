import { useState } from 'react';

import { TpTextField } from './TpTextField';

export type TpOtpFieldProps = {
  value?: string;
  defaultValue?: string;
  label?: string;
  length?: number;
  onChangeText?: (value: string) => void;
  onCompleted?: (value: string) => void;
  enabled?: boolean;
};

/**
 * Single outlined OTP field matching the account-confirmation input.
 *
 * No auth is performed.
 */
export function TpOtpField({
  value,
  defaultValue,
  label = 'OTP Code',
  length = 6,
  onChangeText,
  onCompleted,
  enabled = true,
}: TpOtpFieldProps) {
  const [inner, setInner] = useState(defaultValue ?? '');
  const current = value ?? inner;

  const handleChange = (next: string) => {
    const digits = next.replace(/\D/g, '').slice(0, length);
    if (value == null) {
      setInner(digits);
    }
    onChangeText?.(digits);
    if (digits.length === length) {
      onCompleted?.(digits);
    }
  };

  return (
    <TpTextField
      value={current}
      label={label}
      enabled={enabled}
      keyboardType="number-pad"
      returnKeyType="done"
      onChangeText={handleChange}
    />
  );
}
