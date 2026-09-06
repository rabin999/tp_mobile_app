import { ScrollView, StyleSheet, View } from 'react-native';

import { tpSpacing } from '../../ui/theme/tpSpacing';
import { ProfessionalCard } from './components/ProfessionalCard';

/**
 * Static professional cards for the guest professionals listing.
 */
export function ProfessionalsScreen() {
  return (
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
