import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import type { ComponentType } from 'react';

import {
  aboutIntroHighlight,
  aboutOurServices,
  aboutValuePropositions,
  aboutValues,
} from '../../../src/features/public/about/aboutContent';
import { aboutText } from '../../../src/features/public/about/aboutText';
import { TrueProfessionalApp } from '../../../src/main';

type LazyFactory = () => Promise<{ default: ComponentType }>;

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

test('drawer About Us walks hero, intro, values, offerings, then Home', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('About Us'));
  await waitFor(() => {
    expect(screen.getByText(aboutText.valuesTitle)).toBeOnTheScreen();
  });

  expect(screen.getByText(aboutText.heroTitle)).toBeOnTheScreen();
  expect(screen.getByLabelText(aboutText.heroArtLabel)).toBeOnTheScreen();
  expect(screen.getByText(aboutText.introLabel)).toBeOnTheScreen();
  expect(screen.getByText(aboutText.introTitle)).toBeOnTheScreen();
  expect(screen.getByLabelText(aboutText.introArtLabel)).toBeOnTheScreen();
  expect(screen.getByText(aboutIntroHighlight)).toBeOnTheScreen();

  for (const value of aboutValues) {
    expect(screen.getByText(value.number)).toBeOnTheScreen();
    expect(screen.getByText(value.title)).toBeOnTheScreen();
    expect(screen.getByText(value.description)).toBeOnTheScreen();
  }

  expect(screen.getByText(aboutText.offeringsLabel)).toBeOnTheScreen();
  expect(screen.getByText(aboutText.offeringsTitle)).toBeOnTheScreen();
  expect(screen.getByText(aboutText.valuePropositionsTitle)).toBeOnTheScreen();
  expect(screen.getByText(aboutText.servicesTitle)).toBeOnTheScreen();
  expect(screen.getByText(aboutValuePropositions[0])).toBeOnTheScreen();
  expect(screen.getByText(aboutOurServices[0])).toBeOnTheScreen();

  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});
