import { fireEvent, render, screen } from '@testing-library/react-native';

import {
  ProviderListedServiceCard,
  type ProviderListedServiceCardProps,
} from '../../../src/features/services/components/ProviderListedServiceCard';
import { pumpWithTheme } from '../../ui/pumpApp';

function cardProps(
  overrides: Partial<ProviderListedServiceCardProps> = {},
): ProviderListedServiceCardProps {
  return {
    title: 'House Cleaning',
    priceLabel: 'Rs. 1,500/hr',
    viewLabel: 'View',
    providerName: 'Sita Sharma',
    ...overrides,
  };
}

test('shows a verified mark on the provider when providerVerified', async () => {
  await render(
    pumpWithTheme(
      <ProviderListedServiceCard {...cardProps({ providerVerified: true })} />,
    ),
  );

  expect(screen.getByLabelText('Verified')).toBeOnTheScreen();
});

test('hides the provider verified mark by default', async () => {
  await render(pumpWithTheme(<ProviderListedServiceCard {...cardProps()} />));

  expect(screen.queryByLabelText('Verified')).toBeNull();
});

test('shows the visit chip when a customer visit is required', async () => {
  await render(
    pumpWithTheme(
      <ProviderListedServiceCard
        {...cardProps({
          customerVisitRequired: true,
          address: 'Lazimpat, Kathmandu',
          customerVisitLabel: 'Customer visit required',
        })}
      />,
    ),
  );

  expect(screen.getByText('Customer visit required')).toBeOnTheScreen();
  expect(screen.getByText('Lazimpat, Kathmandu')).toBeOnTheScreen();
});

test('provider press does not fire card press', async () => {
  let cardPresses = 0;
  let providerPresses = 0;

  await render(
    pumpWithTheme(
      <ProviderListedServiceCard
        {...cardProps()}
        onPress={() => {
          cardPresses += 1;
        }}
        onProviderPress={() => {
          providerPresses += 1;
        }}
      />,
    ),
  );

  await fireEvent.press(screen.getByText('Sita Sharma'));
  expect(providerPresses).toBe(1);
  expect(cardPresses).toBe(0);
});

test('View press does not fire card press', async () => {
  let cardPresses = 0;
  let viewPresses = 0;

  await render(
    pumpWithTheme(
      <ProviderListedServiceCard
        {...cardProps()}
        onPress={() => {
          cardPresses += 1;
        }}
        onViewPress={() => {
          viewPresses += 1;
        }}
      />,
    ),
  );

  await fireEvent.press(screen.getByText('View'));
  expect(viewPresses).toBe(1);
  expect(cardPresses).toBe(0);
});

test('resolves theme tokens in dark mode', async () => {
  await render(
    pumpWithTheme(<ProviderListedServiceCard {...cardProps()} />, 'dark'),
  );

  expect(screen.getByText('House Cleaning')).toBeOnTheScreen();
  expect(screen.getByText('View')).toBeOnTheScreen();
});
