import {
  tpKeyboardScrollBottomInset,
  tpScrollDeltaToClearKeyboard,
} from '../../src/ui/components/content/tpKeyboardInset';

test('closed keyboard keeps the safe-area rest inset', () => {
  expect(
    tpKeyboardScrollBottomInset({
      rest: 40,
      safeBottom: 24,
      keyboardHeight: 0,
    }),
  ).toBe(64);
});

test('open keyboard replaces the safe area with the keyboard height', () => {
  expect(
    tpKeyboardScrollBottomInset({
      rest: 40,
      safeBottom: 24,
      keyboardHeight: 320,
    }),
  ).toBe(360);
});

test('no extra scroll when the field is already above the keyboard', () => {
  expect(
    tpScrollDeltaToClearKeyboard({
      fieldBottom: 400,
      keyboardTop: 500,
      margin: 24,
    }),
  ).toBe(0);
});

test('scrolls by the overlap plus a margin so the field clears the keyboard', () => {
  expect(
    tpScrollDeltaToClearKeyboard({
      fieldBottom: 520,
      keyboardTop: 400,
      margin: 24,
    }),
  ).toBe(144);
});
