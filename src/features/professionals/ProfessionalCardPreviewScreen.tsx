import { ScrollView, StyleSheet, View } from 'react-native';

import { tpSpacing } from '../../ui/theme/tpSpacing';
import { ListingPreviewChrome } from '../listings/ListingPreviewChrome';
import { ProfessionalCard } from './components/ProfessionalCard';

/**
 * Static professionals listing preview with two ProfessionalCard fixtures.
 */
export function ProfessionalCardPreviewScreen() {
  return (
    <ListingPreviewChrome selectedId="professionals">
      <ScrollView style={styles.flex} contentContainerStyle={styles.list}>
        <View style={styles.cards}>
          <ProfessionalCard
            name="Jane Smith"
            joinedLabel="Joined on 2 years ago"
            ratingLabel="4.8"
            description="Licensed electrician serving Kathmandu and nearby."
            categories={['Electrical', 'Plumbing']}
            verified
            onPress={() => undefined}
            onOfferPress={() => undefined}
          />
          <ProfessionalCard
            name="Alex Rai"
            joinedLabel="Joined on a month ago"
            ratingLabel="0"
            onPress={() => undefined}
          />
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
