import { fireEvent, render, screen } from '@testing-library/react-native';
import type { ComponentType } from 'react';

import { TrueProfessionalApp } from '../../../src/main';

jest.mock('react', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  const { PrivacyScreen } = jest.requireActual<
    typeof import('../../../src/features/public/legal/PrivacyScreen')
  >('../../../src/features/public/legal/PrivacyScreen');

  return {
    ...React,
    lazy: () =>
      React.lazy(() =>
        Promise.resolve({
          default: PrivacyScreen as ComponentType,
        }),
      ),
  };
});

test('drawer Privacy Policy opens the legal page', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Privacy Policy'));
  expect(
    await screen.findByText('What Information do we collect?'),
  ).toBeOnTheScreen();
  expect(screen.getByText('Name')).toBeOnTheScreen();
  expect(screen.getByText(/laws of Nepal/)).toBeOnTheScreen();
  expect(screen.queryByText('GDPR')).toBeNull();
  expect(screen.queryByText(/European Economic Area/)).toBeNull();
  expect(screen.queryByText(/Help Scout/)).toBeNull();
  expect(screen.queryByText(/Facebook Pixel/i)).toBeNull();
  expect(screen.queryByText(/Social Security/i)).toBeNull();
  expect(screen.queryByText(/Remarketing/i)).toBeNull();
});
