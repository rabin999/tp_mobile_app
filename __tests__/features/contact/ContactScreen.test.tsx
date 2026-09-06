import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { TrueProfessionalApp } from '../../../src/main';
import { contactChannels } from '../../../src/features/contact/contactChannels';
import { contactText } from '../../../src/features/contact/contactText';
import { appHttpResult } from '../../core/appHttp';
import { installFetch, ScriptedHttp } from '../../core/scriptedHttp';
import { emitKeyboardDidShow } from '../../ui/emitKeyboard';

let restoreFetch: () => void;

beforeEach(() => {
  restoreFetch = installFetch(new ScriptedHttp(appHttpResult).fetch);
});

afterEach(() => {
  restoreFetch();
});

async function openContact(): Promise<void> {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Contact'));
  await waitFor(() => {
    expect(screen.getByLabelText(contactText.topic)).toBeEnabled();
  });
}

test('drawer Contact opens the page with API topics, channels, and home', async () => {
  await openContact();
  expect(screen.getByText(contactText.subhead)).toBeOnTheScreen();
  expect(screen.getByText('General')).toBeOnTheScreen();
  for (const channel of contactChannels) {
    expect(screen.getByLabelText(channel.accessibilityLabel)).toBeOnTheScreen();
  }

  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('empty send keeps the fields and shows validation errors', async () => {
  await openContact();
  await fireEvent.press(screen.getByText(contactText.send));
  expect(screen.getByText(contactText.emailRequired)).toBeOnTheScreen();
  expect(screen.getByText(contactText.messageRequired)).toBeOnTheScreen();
  expect(screen.queryByText(contactText.sent)).not.toBeOnTheScreen();
});

test('invalid email is rejected before send', async () => {
  await openContact();
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.email),
    'not-an-email',
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.message),
    'Need help with billing.',
  );
  await fireEvent.press(screen.getByText(contactText.send));
  expect(screen.getByText(contactText.emailInvalid)).toBeOnTheScreen();
  expect(screen.queryByText(contactText.sent)).not.toBeOnTheScreen();
});

test('valid send posts to the API, shows success, and clears the form', async () => {
  await openContact();
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.fullName),
    '  Ada Lovelace  ',
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.email),
    '  ada@example.com  ',
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.message),
    `  Need help with billing ${Date.now()}.  `,
  );
  await fireEvent.press(screen.getByText(contactText.send));
  await waitFor(() => {
    expect(screen.getByText(contactText.sent)).toBeOnTheScreen();
  });
  expect(screen.getByPlaceholderText(contactText.email).props.value).toBe('');
  expect(screen.getByPlaceholderText(contactText.message).props.value).toBe('');
});

test('a second tap while sending does not double-deliver', async () => {
  await openContact();
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.email),
    'ada@example.com',
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.message),
    `Do not double-send ${Date.now()}.`,
  );
  await fireEvent.press(screen.getByText(contactText.send));
  await fireEvent.press(screen.getByText(contactText.send));
  await waitFor(() => {
    expect(screen.getByText(contactText.sent)).toBeOnTheScreen();
  });
});

test('leaving the page while sending returns to the gallery', async () => {
  await openContact();
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.email),
    'ada@example.com',
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(contactText.message),
    `Cancel in-flight send ${Date.now()}.`,
  );
  await fireEvent.press(screen.getByText(contactText.send));
  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('keyboard on Full name lifts the form and still allows Send', async () => {
  await openContact();
  const scroll = screen.getByTestId('tp-keyboard-scroll');
  const before = StyleSheet.flatten(scroll.props.contentContainerStyle)
    .paddingBottom as number;

  await fireEvent(screen.getByPlaceholderText(contactText.fullName), 'focus');
  await act(async () => {
    emitKeyboardDidShow(320, 500);
  });
  const after = StyleSheet.flatten(
    screen.getByTestId('tp-keyboard-scroll').props.contentContainerStyle,
  ).paddingBottom as number;

  expect(after).toBeGreaterThan(before);
  expect(
    screen.getByTestId('tp-keyboard-scroll').props.keyboardDismissMode,
  ).toBe('none');
  await fireEvent.press(screen.getByText(contactText.send));
  expect(screen.getByText(contactText.emailRequired)).toBeOnTheScreen();
});
