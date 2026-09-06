import { tpSizes } from '../../theme/tpSizes';
import { useTpTheme } from '../../theme/tpTheme';
import { TpGlyph } from '../content/TpGlyph';
import { TpSpinner } from '../feedback/TpSpinner';
import { TpTextField } from './TpTextField';

export type TpSearchFieldProps = {
  value?: string;
  defaultValue?: string;
  hint?: string;
  loading?: boolean;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (value: string) => void;
  enabled?: boolean;
};

/**
 * Search field matching SearchWithFilter input.
 */
export function TpSearchField({
  value,
  defaultValue,
  hint,
  loading = false,
  onChangeText,
  onSubmitEditing,
  enabled = true,
}: TpSearchFieldProps) {
  const { colors } = useTpTheme();
  return (
    <TpTextField
      value={value}
      defaultValue={defaultValue}
      hint={hint}
      enabled={enabled}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      keyboardType="default"
      returnKeyType="search"
      prefix={
        <TpGlyph name="search" size={tpSizes.icon} color={colors.textHint} />
      }
      suffix={loading ? <TpSpinner size={tpSizes.iconSm} /> : undefined}
    />
  );
}
