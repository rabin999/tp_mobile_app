import { render, screen } from '@testing-library/react-native';

import { TasksScreen } from '../../../src/features/tasks/TasksScreen';
import { pumpWithTheme } from '../../ui/pumpApp';

test('renders static task cards', async () => {
  await render(pumpWithTheme(<TasksScreen />));

  expect(screen.getByText('Fix a leaking kitchen tap')).toBeOnTheScreen();
  expect(screen.getByText('FLEXIBLE')).toBeOnTheScreen();
});
