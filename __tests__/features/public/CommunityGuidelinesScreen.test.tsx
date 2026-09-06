import { fireEvent, render, screen } from '@testing-library/react-native';

import { TrueProfessionalApp } from '../../../src/main';
import { legalText } from '../../../src/features/public/legal/legalText';

jest.mock('react', () => {
  const React = jest.requireActual<typeof import('react')>('react');
  const { CommunityGuidelinesScreen } = jest.requireActual<
    typeof import('../../../src/features/public/legal/CommunityGuidelinesScreen')
  >('../../../src/features/public/legal/CommunityGuidelinesScreen');

  return {
    ...React,
    lazy: () => CommunityGuidelinesScreen,
  };
});

test('drawer Community Guidelines opens the numbered guideline groups', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Community Guidelines'));
  expect(await screen.findByText(legalText.providerTitle)).toBeOnTheScreen();
  expect(
    screen.getByText('1. Professionalism and Quality Service'),
  ).toBeOnTheScreen();
  expect(screen.getByText(legalText.prohibitedTitle)).toBeOnTheScreen();
  expect(screen.getByText(legalText.commitmentTitle)).toBeOnTheScreen();
  expect(screen.getByText(/Nepal.s laws/)).toBeOnTheScreen();
  expect(screen.queryByText(/any other jurisdiction/)).toBeNull();
});
