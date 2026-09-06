import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import type { ComponentType } from 'react';

import { TrueProfessionalApp } from '../src/main';

type LazyFactory = () => Promise<{ default: ComponentType }>;

// App.tsx lazy() uses import(); Jest's vm cannot run that callback.
jest.mock('react', () => {
  const actual = jest.requireActual<typeof import('react')>('react');
  const { ServicesScreen } = jest.requireActual<
    typeof import('../src/features/services/ServicesScreen')
  >('../src/features/services/ServicesScreen');
  const { TasksScreen } = jest.requireActual<
    typeof import('../src/features/tasks/TasksScreen')
  >('../src/features/tasks/TasksScreen');
  const { ProfessionalsScreen } = jest.requireActual<
    typeof import('../src/features/professionals/ProfessionalsScreen')
  >('../src/features/professionals/ProfessionalsScreen');

  return {
    ...actual,
    lazy: (factory: LazyFactory) => {
      const source = String(factory);

      if (source.includes('ServicesScreen')) {
        return actual.lazy(() => Promise.resolve({ default: ServicesScreen }));
      }

      if (source.includes('TasksScreen')) {
        return actual.lazy(() => Promise.resolve({ default: TasksScreen }));
      }

      if (source.includes('ProfessionalsScreen')) {
        return actual.lazy(() =>
          Promise.resolve({ default: ProfessionalsScreen }),
        );
      }

      return actual.lazy(factory);
    },
  };
});

test('app starts on the design-system gallery', async () => {
  await render(<TrueProfessionalApp />);
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
  expect(screen.queryByText('Provider listed service card')).toBeNull();
  expect(screen.queryByText('Task card')).toBeNull();
  expect(screen.queryByText('Professional card')).toBeNull();
});

test('drawer Services opens the static listing and Tasks tab switches', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Services'));
  await waitFor(() => {
    expect(screen.getByText('House Cleaning')).toBeOnTheScreen();
  });
  expect(screen.getByText('Math Tutoring')).toBeOnTheScreen();
  expect(screen.getByText('Categories')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();

  expect(screen.getByPlaceholderText('Search')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('tab', { name: 'Tasks' }));
  expect(screen.queryByLabelText('Loading page')).toBeNull();
  expect(
    screen.getByRole('tab', { name: 'Tasks', selected: true }),
  ).toBeOnTheScreen();
  expect(screen.getByText('Categories')).toBeOnTheScreen();
  await waitFor(() => {
    expect(screen.getByText('Fix a leaking kitchen tap')).toBeOnTheScreen();
  });
  expect(screen.getByPlaceholderText('Search')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: 'Cleaning' })).toBeOnTheScreen();
  expect(screen.getByText('FLEXIBLE')).toBeOnTheScreen();
});

test('drawer Professionals opens the static listing', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('Professionals'));
  await waitFor(() => {
    expect(screen.getByText('Jane Smith')).toBeOnTheScreen();
  });
  expect(screen.getByText('Alex Rai')).toBeOnTheScreen();
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
