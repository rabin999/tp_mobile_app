import { ScrollView, StyleSheet, View } from 'react-native';

import { tpSpacing } from '../../ui/theme/tpSpacing';
import { ListingPreviewChrome } from '../listings/ListingPreviewChrome';
import {
  ProviderListedServiceCard,
  type ProviderListedServiceCardProps,
} from './components/ProviderListedServiceCard';

const previewCards: readonly ProviderListedServiceCardProps[] = [
  {
    title: 'House Cleaning',
    priceLabel: 'Rs. 1,500/hr',
    viewLabel: 'View',
    description:
      'Professional home cleaning for apartments and houses, including kitchen and bathrooms.',
    categoryLabel: 'Cleaning',
    providerName: 'Sita Sharma',
    providerVerified: true,
    customerVisitRequired: true,
    address: 'Lazimpat, Kathmandu',
    customerVisitLabel: 'Customer visit required',
  },
  {
    title: 'Math Tutoring',
    priceLabel: 'Rs. 800/hr',
    viewLabel: 'View',
    description: 'Grade 8–12 mathematics coaching, in person or online.',
    categoryLabel: 'Education',
    providerName: 'Anil Karki',
    providerVerified: true,
  },
  {
    title: 'Portrait Photography',
    priceLabel: 'Rs. 4,000',
    viewLabel: 'View',
    providerName: 'Maya Thapa',
  },
];

/**
 * Static preview of the public provider-listed service card.
 */
export function ProviderListedServiceCardPreviewScreen() {
  return (
    <ListingPreviewChrome selectedId="services">
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cards}>
          {previewCards.map(card => (
            <ProviderListedServiceCard
              key={card.title}
              {...card}
              onPress={() => undefined}
              onProviderPress={() => undefined}
              onViewPress={() => undefined}
            />
          ))}
        </View>
      </ScrollView>
    </ListingPreviewChrome>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  list: {
    padding: tpSpacing.md,
  },
  cards: {
    marginTop: tpSpacing.xs,
    gap: tpSpacing.xl,
  },
});
