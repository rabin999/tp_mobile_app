import { tpSpacing } from '../../theme/tpSpacing';

export type TpFieldErrorLayout = {
  text: string;
  offsetX: number;
};

/**
 * Validation copy aligned with the left edge of the outlined field.
 */
export function tpFieldError(
  errorText?: string | null,
): TpFieldErrorLayout | null {
  if (errorText == null || errorText.length === 0) {
    return null;
  }
  return { text: errorText, offsetX: -tpSpacing.md };
}
