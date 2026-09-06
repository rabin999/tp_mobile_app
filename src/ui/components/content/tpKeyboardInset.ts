/**
 * Keyboard overlap math for form scroll views.
 *
 * Edge-to-edge Android does not shrink the window on `adjustResize`, so
 * padding and scroll delta have to come from keyboard metrics.
 */
export function tpKeyboardScrollBottomInset(options: {
  rest: number;
  safeBottom: number;
  keyboardHeight: number;
}): number {
  const lift =
    options.keyboardHeight > 0 ? options.keyboardHeight : options.safeBottom;

  return options.rest + lift;
}

/**
 * Extra scroll offset so a focused field sits above the keyboard.
 */
export function tpScrollDeltaToClearKeyboard(options: {
  fieldBottom: number;
  keyboardTop: number;
  margin: number;
}): number {
  return Math.max(
    0,
    options.fieldBottom + options.margin - options.keyboardTop,
  );
}
