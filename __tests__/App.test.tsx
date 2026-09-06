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
  const { TaskCardPreviewScreen } = jest.requireActual<
    typeof import('../src/features/tasks/TaskCardPreviewScreen')
  >('../src/features/tasks/TaskCardPreviewScreen');

  return {
    ...actual,
    lazy: (factory: LazyFactory) => {
      if (String(factory).includes('TaskCardPreviewScreen')) {
        return actual.lazy(() =>
          Promise.resolve({ default: TaskCardPreviewScreen }),
        );
      }

      return actual.lazy(factory);
    },
  };
});

test('app starts on the design-system gallery', async () => {
  await render(<TrueProfessionalApp />);
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
  expect(screen.getByText('Provider listed service card')).toBeOnTheScreen();
  expect(screen.getByText('Task card')).toBeOnTheScreen();
  expect(screen.getByText('Professional card')).toBeOnTheScreen();
});

test('gallery Task card preview renders static fixtures', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByText('Task card'));
  await waitFor(() => {
    expect(screen.getByText('Fix a leaking kitchen tap')).toBeOnTheScreen();
  });
  expect(screen.getByText('FLEXIBLE')).toBeOnTheScreen();
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
