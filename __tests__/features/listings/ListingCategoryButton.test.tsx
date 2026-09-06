import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { ListingCategoryButton } from '../../../src/features/listings/ListingCategoryButton';
import { tpColors } from '../../../src/ui/theme/tpColors';
import { tpElevation } from '../../../src/ui/theme/tpElevation';
import { pumpWithTheme } from '../../ui/pumpApp';

const category = {
  id: 1,
  slug: 'cleaning',
  title: 'Cleaning',
};

test('selected chip fills with the web active wash', async () => {
  await render(
    pumpWithTheme(<ListingCategoryButton category={category} selected />),
  );

  const button = screen.getByRole('button', { name: 'Cleaning' });
  const wrap = button.parent;

  expect(StyleSheet.flatten(wrap?.props.style).backgroundColor).toBe(
    tpColors.light.outline,
  );
});

test('unselected chip uses the listing-card glow', async () => {
  await render(pumpWithTheme(<ListingCategoryButton category={category} />));

  const button = screen.getByRole('button', { name: 'Cleaning' });
  const wrap = button.parent;
  const style = StyleSheet.flatten(wrap?.props.style);

  expect(style.backgroundColor).toBe(tpColors.light.surface);
  expect(style.boxShadow).toBe(tpElevation.listingCard.boxShadow);
});

test('selected chip drops the glow', async () => {
  await render(
    pumpWithTheme(<ListingCategoryButton category={category} selected />),
  );

  const button = screen.getByRole('button', { name: 'Cleaning' });
  const wrap = button.parent;

  expect(StyleSheet.flatten(wrap?.props.style).boxShadow).toBe(
    tpElevation.none.boxShadow,
  );
});
