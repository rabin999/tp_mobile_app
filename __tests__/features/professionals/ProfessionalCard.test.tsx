import { fireEvent, render, screen } from '@testing-library/react-native';

import { ProfessionalCard } from '../../../src/features/professionals/components/ProfessionalCard';
import { pumpWithTheme } from '../../ui/pumpApp';

const jane = {
  name: 'Jane Smith',
  joinedLabel: 'Joined on 2 years ago',
  ratingLabel: '4.8',
  description: 'Licensed electrician serving Kathmandu and nearby.',
  categories: ['Electrical', 'Plumbing'] as const,
};

test('renders name, joined, rating, description, and categories', async () => {
  await render(
    pumpWithTheme(
      <ProfessionalCard
        name={jane.name}
        joinedLabel={jane.joinedLabel}
        ratingLabel={jane.ratingLabel}
        description={jane.description}
        categories={jane.categories}
        onPress={() => undefined}
        onOfferPress={() => undefined}
      />,
    ),
  );

  expect(screen.getByText(jane.name)).toBeOnTheScreen();
  expect(screen.getByText(jane.joinedLabel)).toBeOnTheScreen();
  expect(screen.getByText(jane.ratingLabel)).toBeOnTheScreen();
  expect(screen.getByText(jane.description)).toBeOnTheScreen();
  expect(screen.getByText('Electrical')).toBeOnTheScreen();
  expect(screen.getByText('Plumbing')).toBeOnTheScreen();
  expect(screen.getByText('Offer Tasks')).toBeOnTheScreen();
});

test('hides the offer footer unless onOfferPress is passed', async () => {
  await render(
    pumpWithTheme(
      <ProfessionalCard
        name={jane.name}
        joinedLabel={jane.joinedLabel}
        ratingLabel={jane.ratingLabel}
        offerLabel="Offer Tasks"
      />,
    ),
  );

  expect(screen.queryByText('Offer Tasks')).toBeNull();
});

test('offer press does not fire the card onPress', async () => {
  let cardPressed = false;
  let offerPressed = false;

  await render(
    pumpWithTheme(
      <ProfessionalCard
        name={jane.name}
        joinedLabel={jane.joinedLabel}
        ratingLabel={jane.ratingLabel}
        onPress={() => {
          cardPressed = true;
        }}
        onOfferPress={() => {
          offerPressed = true;
        }}
      />,
    ),
  );

  await fireEvent.press(screen.getByText('Offer Tasks'));
  expect(offerPressed).toBe(true);
  expect(cardPressed).toBe(false);
});

test('card press works when there is no offer footer', async () => {
  let cardPressed = false;

  await render(
    pumpWithTheme(
      <ProfessionalCard
        name={jane.name}
        joinedLabel={jane.joinedLabel}
        ratingLabel={jane.ratingLabel}
        onPress={() => {
          cardPressed = true;
        }}
      />,
    ),
  );

  expect(screen.queryByText('Offer Tasks')).toBeNull();
  await fireEvent.press(screen.getByText(jane.name));
  expect(cardPressed).toBe(true);
});

test('shows a verified mark when verified is true', async () => {
  await render(
    pumpWithTheme(
      <ProfessionalCard
        name={jane.name}
        joinedLabel={jane.joinedLabel}
        ratingLabel={jane.ratingLabel}
        verified
      />,
    ),
  );

  expect(screen.getByLabelText('Verified')).toBeOnTheScreen();
});

test('hides the verified mark unless verified is passed', async () => {
  await render(
    pumpWithTheme(
      <ProfessionalCard
        name={jane.name}
        joinedLabel={jane.joinedLabel}
        ratingLabel={jane.ratingLabel}
      />,
    ),
  );

  expect(screen.queryByLabelText('Verified')).toBeNull();
});

test('pumps in dark mode', async () => {
  await render(
    pumpWithTheme(
      <ProfessionalCard
        name={jane.name}
        joinedLabel={jane.joinedLabel}
        ratingLabel={jane.ratingLabel}
        description={jane.description}
        categories={jane.categories}
        onPress={() => undefined}
        onOfferPress={() => undefined}
      />,
      'dark',
    ),
  );

  expect(screen.getByText(jane.name)).toBeOnTheScreen();
  expect(screen.getByText('Offer Tasks')).toBeOnTheScreen();
});
