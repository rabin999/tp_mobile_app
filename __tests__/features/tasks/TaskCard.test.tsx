import { fireEvent, render, screen } from '@testing-library/react-native';

import {
  TaskCard,
  type TaskCardProps,
} from '../../../src/features/tasks/components/TaskCard';
import { pumpWithTheme } from '../../ui/pumpApp';

function fixture(overrides: Partial<TaskCardProps> = {}): TaskCardProps {
  return {
    title: 'Fix a leaking kitchen tap',
    shortDescription: 'Need a plumber this week for a dripping mixer.',
    authorName: 'Anita Sharma',
    createdLabel: '2 days ago',
    budgetType: 'FIXED',
    budgetLabel: 'Rs 5000',
    ...overrides,
  };
}

test('renders mapped title, description, author, created, and budget', async () => {
  await render(pumpWithTheme(<TaskCard {...fixture()} />));

  expect(screen.getByText('Fix a leaking kitchen tap')).toBeOnTheScreen();
  expect(
    screen.getByText('Need a plumber this week for a dripping mixer.'),
  ).toBeOnTheScreen();
  expect(screen.getByText('Anita Sharma')).toBeOnTheScreen();
  expect(screen.getByText('Created:')).toBeOnTheScreen();
  expect(screen.getByText('2 days ago')).toBeOnTheScreen();
  expect(screen.getByText('FIXED')).toBeOnTheScreen();
  expect(screen.getByText(/Rs 5000/)).toBeOnTheScreen();
});

test('hides rupees when budget type is FLEXIBLE', async () => {
  await render(
    pumpWithTheme(
      <TaskCard
        {...fixture({ budgetType: 'FLEXIBLE', budgetLabel: 'Rs 5000' })}
      />,
    ),
  );

  expect(screen.getByText('FLEXIBLE')).toBeOnTheScreen();
  expect(screen.queryByText(/Rs 5000/)).toBeNull();
});

test('shows No Image when media is missing', async () => {
  await render(pumpWithTheme(<TaskCard {...fixture()} />));

  expect(screen.getByText('No Image')).toBeOnTheScreen();
});

test('press fires onPress', async () => {
  let pressed = false;

  await render(
    pumpWithTheme(
      <TaskCard
        {...fixture()}
        onPress={() => {
          pressed = true;
        }}
      />,
    ),
  );
  await fireEvent.press(screen.getByLabelText('Fix a leaking kitchen tap'));
  expect(pressed).toBe(true);
});

test('wishlist control is absent by default', async () => {
  await render(pumpWithTheme(<TaskCard {...fixture()} />));

  expect(screen.queryByLabelText('Wishlist')).toBeNull();
});

test('shows a verified mark on the author when authorVerified', async () => {
  await render(
    pumpWithTheme(<TaskCard {...fixture({ authorVerified: true })} />),
  );

  expect(screen.getByLabelText('Verified')).toBeOnTheScreen();
});

test('hides the author verified mark by default', async () => {
  await render(pumpWithTheme(<TaskCard {...fixture()} />));

  expect(screen.queryByLabelText('Verified')).toBeNull();
});

test('pumps in dark mode', async () => {
  await render(pumpWithTheme(<TaskCard {...fixture()} />, 'dark'));

  expect(screen.getByText('Fix a leaking kitchen tap')).toBeOnTheScreen();
});
