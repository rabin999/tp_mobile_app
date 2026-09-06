import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import type { ComponentType } from 'react';

import { aboutText } from '../../../src/features/public/about/aboutText';
import { TrueProfessionalApp } from '../../../src/main';

type LazyFactory = () => Promise<{ default: ComponentType }>;

// App.tsx lazy() uses import(); Jest's vm cannot run that callback.
jest.mock('react', () => {
  const actual = jest.requireActual<typeof import('react')>('react');
  const { AboutScreen } = jest.requireActual<
    typeof import('../../../src/features/public/about/AboutScreen')
  >('../../../src/features/public/about/AboutScreen');

  return {
    ...actual,
    lazy: (factory: LazyFactory) => {
      if (String(factory).includes('AboutScreen')) {
        return actual.lazy(() => Promise.resolve({ default: AboutScreen }));
      }

      return actual.lazy(factory);
    },
  };
});

test('drawer About Us opens the page and Home returns', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('About Us'));
  await waitFor(() => {
    expect(screen.getByText(aboutText.valuesTitle)).toBeOnTheScreen();
  });
  expect(screen.getByText('Community First')).toBeOnTheScreen();
  expect(screen.getByLabelText(aboutText.heroArtLabel)).toBeOnTheScreen();
  expect(screen.getByLabelText(aboutText.introArtLabel)).toBeOnTheScreen();
  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});
