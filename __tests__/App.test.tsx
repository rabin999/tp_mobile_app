import { render, screen } from '@testing-library/react-native';

import { TrueProfessionalApp } from '../src/main';

test('app starts on the design-system gallery', async () => {
  await render(<TrueProfessionalApp />);
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});
