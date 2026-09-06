import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { PublicScreen, PublicSection } from '../PublicScreen';
import { PublicSectionHeader } from '../PublicSectionHeader';
import type { LegalClause, LegalGroup } from './legalDocument';

export type LegalDocumentScreenProps = {
  groups: readonly LegalGroup[];
};

/**
 * Numbered policy document used by Terms and Community Guidelines.
 */
export function LegalDocumentScreen({ groups }: LegalDocumentScreenProps) {
  return (
    <PublicScreen>
      {groups.map(group => (
        <PublicSection key={group.title}>
          <PublicSectionHeader title={group.title} />
          <BodyText>{group.intro}</BodyText>
          {group.clauses.map((clause, index) => (
            <ClauseBlock key={clause.title} index={index + 1} clause={clause} />
          ))}
          {group.closingTitle != null ? (
            <Heading>{group.closingTitle}</Heading>
          ) : null}
          {group.closing != null ? <BodyText>{group.closing}</BodyText> : null}
        </PublicSection>
      ))}
    </PublicScreen>
  );
}

function ClauseBlock({
  index,
  clause,
}: {
  index: number;
  clause: LegalClause;
}) {
  return (
    <View style={styles.clause}>
      <Heading>{`${index}. ${clause.title}`}</Heading>
      {clause.paragraphs.map((paragraph, paragraphIndex) => (
        <View key={paragraphIndex} style={styles.clauseRow}>
          <IndexLabel>{`${index}.${paragraphIndex + 1}.`}</IndexLabel>
          <BodyText style={styles.clauseBody}>{paragraph}</BodyText>
        </View>
      ))}
    </View>
  );
}

export function Heading({ children }: { children: string }) {
  const { colors, text } = useTpTheme();

  return (
    <Text style={[text.headlineSmall, { color: colors.onSurfaceVariant }]}>
      {children}
    </Text>
  );
}

export function BodyText({
  children,
  style,
}: {
  children: string;
  style?: StyleProp<TextStyle>;
}) {
  const { colors, text } = useTpTheme();

  return (
    <Text style={[text.bodyLarge, { color: colors.onSurfaceVariant }, style]}>
      {children}
    </Text>
  );
}

function IndexLabel({ children }: { children: string }) {
  const { colors, text } = useTpTheme();

  return (
    <Text
      style={[
        text.bodySmall,
        tpNunito('600'),
        styles.index,
        { color: colors.textMuted },
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  clause: {
    gap: tpSpacing.sm,
  },
  clauseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tpSpacing.sm,
  },
  index: {
    minWidth: 36,
    marginTop: 2,
  },
  clauseBody: {
    flex: 1,
  },
});
