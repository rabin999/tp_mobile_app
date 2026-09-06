import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import type { ComponentType } from 'react';

import { faqText } from '../../../src/features/public/faq/faqText';
import { TrueProfessionalApp } from '../../../src/main';

type LazyFactory = () => Promise<{ default: ComponentType }>;

const apiTimeout = { timeout: 8_000 };

jest.mock('react', () => {
  const actual = jest.requireActual<typeof import('react')>('react');
  const { FaqScreen } = jest.requireActual<
    typeof import('../../../src/features/public/faq/FaqScreen')
  >('../../../src/features/public/faq/FaqScreen');

  return {
    ...actual,
    lazy: (factory: LazyFactory) => {
      if (String(factory).includes('FaqScreen')) {
        return actual.lazy(() => Promise.resolve({ default: FaqScreen }));
      }

      return actual.lazy(factory);
    },
  };
});

async function openFaq(): Promise<void> {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('FAQ'));
  await waitFor(() => {
    expect(screen.getByText('How to post a task ?')).toBeOnTheScreen();
  }, apiTimeout);
}

test('drawer FAQ opens Support with sections, search, and an accordion', async () => {
  await openFaq();
  expect(screen.getByText(faqText.title)).toBeOnTheScreen();
  expect(screen.getByText(faqText.subhead)).toBeOnTheScreen();
  expect(screen.getByLabelText(faqText.artLabel)).toBeOnTheScreen();
  expect(screen.getByText(faqText.providerTab)).toBeOnTheScreen();
  expect(
    screen.getByRole('tab', { name: faqText.customerTab, selected: true }),
  ).toBeOnTheScreen();
  expect(screen.getAllByText('Tasks').length).toBeGreaterThan(0);
  expect(screen.getByPlaceholderText(faqText.searchHint)).toBeOnTheScreen();

  await fireEvent.press(screen.getByText('How to post a task ?'));
  expect(screen.getByText(/called Taskers/)).toBeOnTheScreen();
  expect(screen.queryByText('<p>')).toBeNull();

  await fireEvent.press(screen.getByText('How to post a task ?'));
  expect(screen.queryByText(/called Taskers/)).toBeNull();

  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('FAQ search with no matches shows the info empty copy', async () => {
  await openFaq();
  await fireEvent.changeText(
    screen.getByPlaceholderText(faqText.searchHint),
    'zzzzqn',
  );
  expect(screen.getByText(faqText.searchEmpty)).toBeOnTheScreen();
  expect(screen.queryByText('How to post a task ?')).toBeNull();
});

test('leaving FAQ while it is still loading returns Home', async () => {
  await render(<TrueProfessionalApp />);
  await fireEvent.press(screen.getByLabelText('Open navigation menu'));
  await fireEvent.press(screen.getByText('FAQ'));
  await fireEvent.press(screen.getByLabelText('True Professional Home'));
  expect(screen.getByText('Shared components')).toBeOnTheScreen();
});

test('provider audience shows the empty FAQ state for Tasks', async () => {
  await openFaq();
  await fireEvent.press(screen.getByText(faqText.providerTab));
  await waitFor(() => {
    expect(screen.getByText(faqText.emptyTitle)).toBeOnTheScreen();
  }, apiTimeout);
  expect(
    screen.getByRole('tab', { name: faqText.providerTab, selected: true }),
  ).toBeOnTheScreen();
  expect(screen.getByText(faqText.emptyMessage)).toBeOnTheScreen();
  expect(screen.queryByText('How to post a task ?')).toBeNull();

  await fireEvent.press(screen.getByText(faqText.customerTab));
  await waitFor(() => {
    expect(screen.getByText('How to post a task ?')).toBeOnTheScreen();
  }, apiTimeout);
  expect(
    screen.getByRole('tab', { name: faqText.customerTab, selected: true }),
  ).toBeOnTheScreen();
  expect(screen.queryByText(faqText.emptyTitle)).toBeNull();
});
