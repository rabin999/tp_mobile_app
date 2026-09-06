import { fireEvent, render, screen } from '@testing-library/react-native';

import { TrueProfessionalApp } from '../src/main';

test('app starts on the design-system gallery', async () => {
  await render(<TrueProfessionalApp />);
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('drawer Contact opens the contact page and Home returns', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Contact'));
  expect(
    screen.getByText('We are ready to take your queries.'),
  ).toBeOnTheScreen();
  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});
