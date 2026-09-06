import { ScrollView, StyleSheet, View } from 'react-native';

import { tpSpacing } from '../../ui/theme/tpSpacing';
import { TaskCard } from './components/TaskCard';

/**
 * Static task cards for the guest tasks listing.
 */
export function TasksScreen() {
  return (
    <ScrollView contentContainerStyle={styles.list} style={styles.flex}>
      <View style={styles.horizontal}>
        <TaskCard
          title="Fix a leaking kitchen tap"
          shortDescription="Need a plumber this week for a dripping mixer."
          authorName="Anita Sharma"
          createdLabel="2 days ago"
          budgetType="FIXED"
          budgetLabel="Rs 5000"
          authorVerified
        />
      </View>
      <TaskCard
        fullWidth
        title="Help moving boxes this Saturday"
        shortDescription="A few cartons from the second floor to a van."
        authorName="Ramesh Karki"
        createdLabel="5 hours ago"
        budgetType="FLEXIBLE"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  list: {
    padding: tpSpacing.md,
    gap: tpSpacing.xl,
  },
  horizontal: {
    width: 290,
  },
});
