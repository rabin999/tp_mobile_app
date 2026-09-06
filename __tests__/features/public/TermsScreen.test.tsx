import { fireEvent, render, screen } from '@testing-library/react-native';
import type { ComponentType } from 'react';

import { TrueProfessionalApp } from '../../../src/main';

type LazyFactory = () => Promise<{ default: ComponentType }>;

// App.tsx lazy() uses import(); Jest's vm cannot run that callback.
jest.mock('react', () => {
  const actual = jest.requireActual<typeof import('react')>('react');
  const { TermsScreen } = jest.requireActual<
    typeof import('../../../src/features/public/legal/TermsScreen')
  >('../../../src/features/public/legal/TermsScreen');

  return {
    ...actual,
    lazy: (factory: LazyFactory) => {
      if (String(factory).includes('TermsScreen')) {
        return actual.lazy(() => Promise.resolve({ default: TermsScreen }));
      }

      return actual.lazy(factory);
    },
  };
});

test('drawer Terms & Conditions opens the page and Home returns', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Terms & Conditions'));
  expect(await screen.findByText('Terms and Conditions')).toBeOnTheScreen();
  expect(screen.getByText('1. Introduction')).toBeOnTheScreen();
  expect(screen.getByText('6.1.')).toBeOnTheScreen();
  expect(screen.getByText(/laws of Nepal/)).toBeOnTheScreen();
  expect(screen.queryByText(/Your Jurisdiction/)).toBeNull();
  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});
