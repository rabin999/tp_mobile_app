import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import type { ComponentType } from 'react';
import { StyleSheet } from 'react-native';

import { loginText } from '../../../src/features/login/loginText';
import { TrueProfessionalApp } from '../../../src/main';
import { appHttpResult } from '../../core/appHttp';
import { installFetch, ScriptedHttp } from '../../core/scriptedHttp';
import { emitKeyboardDidShow } from '../../ui/emitKeyboard';

type LazyFactory = () => Promise<{ default: ComponentType }>;

let restoreFetch: () => void;

beforeEach(() => {
  restoreFetch = installFetch(new ScriptedHttp(appHttpResult).fetch);
});

afterEach(() => {
  restoreFetch();
});

jest.mock('react', () => {
  const actual = jest.requireActual<typeof import('react')>('react');
  const { LoginScreen } = jest.requireActual<
    typeof import('../../../src/features/login/LoginScreen')
  >('../../../src/features/login/LoginScreen');

  return {
    ...actual,
    lazy: (factory: LazyFactory) => {
      if (String(factory).includes('LoginScreen')) {
        return actual.lazy(() => Promise.resolve({ default: LoginScreen }));
      }

      return actual.lazy(factory);
    },
  };
});

async function openLogin(): Promise<void> {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Log in'));
  await waitFor(() => {
    expect(screen.getByText(loginText.title)).toBeOnTheScreen();
  });
}

test('drawer Log in opens the page with web mobile copy', async () => {
  await openLogin();
  expect(screen.getByText(loginText.brand)).toBeOnTheScreen();
  expect(
    screen.getByText(new RegExp(loginText.subheadBefore.trim())),
  ).toBeOnTheScreen();
  expect(
    screen.getByText(new RegExp(loginText.subheadAfter.trim())),
  ).toBeOnTheScreen();
  expect(screen.getByPlaceholderText(loginText.username)).toBeOnTheScreen();
  expect(screen.getByPlaceholderText(loginText.password)).toBeOnTheScreen();
  expect(screen.getByText(loginText.customer)).toBeOnTheScreen();
  expect(screen.getByText(loginText.serviceProvider)).toBeOnTheScreen();
  expect(screen.getByText(loginText.persistLogin)).toBeOnTheScreen();
  expect(screen.getByRole('checkbox').props.accessibilityState).toEqual(
    expect.objectContaining({ checked: false }),
  );
  expect(
    screen.getByText(loginText.noAccount, { exact: false }),
  ).toBeOnTheScreen();
  expect(screen.getByText(loginText.signUp)).toBeOnTheScreen();
  expect(
    StyleSheet.flatten(screen.getByText(loginText.signUp).props.style),
  ).toEqual(expect.objectContaining({ marginLeft: 8 }));
  expect(screen.queryByText('Forget Password?')).toBeNull();

  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('empty login keeps the fields and shows validation errors', async () => {
  await openLogin();
  await fireEvent.press(screen.getByText(loginText.submit));
  expect(screen.getByText(loginText.usernameRequired)).toBeOnTheScreen();
  expect(screen.getByText(loginText.passwordRequired)).toBeOnTheScreen();
  expect(screen.queryByText(loginText.signedIn)).not.toBeOnTheScreen();
});

test('unknown credentials show the API error and stay on login', async () => {
  await openLogin();
  await fireEvent.changeText(
    screen.getByPlaceholderText(loginText.username),
    `tp-app-login-missing-${Date.now()}`,
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(loginText.password),
    'not-a-real-password',
  );
  await fireEvent.press(screen.getByText(loginText.submit));
  await waitFor(() => {
    expect(screen.getByText('Sorry, unable to find user')).toBeOnTheScreen();
  });
  expect(screen.getByText(loginText.title)).toBeOnTheScreen();
  expect(screen.queryByText(loginText.signedIn)).not.toBeOnTheScreen();
});

test('password toggle and keep-me-logged-in work from the app', async () => {
  await openLogin();
  const password = screen.getByPlaceholderText(loginText.password);

  expect(screen.getByLabelText('Show password')).toBeOnTheScreen();
  expect(password.props.secureTextEntry).toBe(true);

  await fireEvent.changeText(password, 'secret12');
  await fireEvent.press(screen.getByLabelText('Show password'));
  expect(screen.getByLabelText('Hide password')).toBeOnTheScreen();
  expect(password.props.secureTextEntry).toBe(false);
  expect(password.props.value).toBe('secret12');

  const keep = screen.getByRole('checkbox');

  expect(keep.props.accessibilityState).toEqual(
    expect.objectContaining({ checked: false }),
  );
  await fireEvent.press(keep);
  expect(screen.getByRole('checkbox').props.accessibilityState).toEqual(
    expect.objectContaining({ checked: true }),
  );
});

test('a second tap while sending stays on login with the API error', async () => {
  await openLogin();
  await fireEvent.changeText(
    screen.getByPlaceholderText(loginText.username),
    `tp-app-login-missing-${Date.now()}`,
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(loginText.password),
    'not-a-real-password',
  );
  await fireEvent.press(screen.getByText(loginText.submit));
  await fireEvent.press(screen.getByText(loginText.submit));
  await waitFor(() => {
    expect(screen.getByText('Sorry, unable to find user')).toBeOnTheScreen();
  });
  expect(screen.getByText(loginText.title)).toBeOnTheScreen();
  expect(screen.queryByText(loginText.signedIn)).not.toBeOnTheScreen();
});

test('Service Provider tab is selectable before submit', async () => {
  await openLogin();
  const customer = screen.getByRole('tab', { name: loginText.customer });
  const provider = screen.getByRole('tab', {
    name: loginText.serviceProvider,
  });

  expect(customer.props.accessibilityState).toEqual(
    expect.objectContaining({ selected: true }),
  );

  await fireEvent.press(provider);
  expect(provider.props.accessibilityState).toEqual(
    expect.objectContaining({ selected: true }),
  );
  expect(customer.props.accessibilityState).toEqual(
    expect.objectContaining({ selected: false }),
  );
});

test('leaving the page while sending returns to the gallery', async () => {
  await openLogin();
  await fireEvent.changeText(
    screen.getByPlaceholderText(loginText.username),
    `tp-app-login-missing-${Date.now()}`,
  );
  await fireEvent.changeText(
    screen.getByPlaceholderText(loginText.password),
    'not-a-real-password',
  );
  await fireEvent.press(screen.getByText(loginText.submit));
  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('keyboard on username lifts the form and still allows Login', async () => {
  await openLogin();
  const scroll = screen.getByTestId('tp-keyboard-scroll');
  const before = StyleSheet.flatten(scroll.props.contentContainerStyle)
    .paddingBottom as number;

  await fireEvent(screen.getByPlaceholderText(loginText.username), 'focus');
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
  await fireEvent.press(screen.getByText(loginText.submit));
  expect(screen.getByText(loginText.usernameRequired)).toBeOnTheScreen();
});
