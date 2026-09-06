import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { TpAlert } from '../../../ui/components/overlays/TpAlert';
import { tpCorners } from '../../../ui/theme/tpCorners';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSizes } from '../../../ui/theme/tpSizes';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import type { FaqItem } from './faq';
import { faqText } from './faqText';

const searchMaxWidth = 360;

export type FaqQuestionListProps = {
  faqs: readonly FaqItem[];
  query: string;
  openId: number | null;
  onQueryChange: (value: string) => void;
  onToggle: (id: number) => void;
};

/**
 * Pill search plus one-open-at-a-time FAQ accordion.
 */
export function FaqQuestionList({
  faqs,
  query,
  openId,
  onQueryChange,
  onToggle,
}: FaqQuestionListProps) {
  const { colors } = useTpTheme();

  return (
    <View>
      <TextInput
        value={query}
        placeholder={faqText.searchHint}
        placeholderTextColor={colors.textHint}
        accessibilityLabel={faqText.searchHint}
        returnKeyType="search"
        underlineColorAndroid="transparent"
        onChangeText={onQueryChange}
        style={[
          styles.search,
          {
            color: colors.textMuted,
            borderColor: colors.outline,
            backgroundColor: colors.surface,
          },
        ]}
      />
      {faqs.length === 0 ? (
        <TpAlert
          message={faqText.searchEmpty}
          severity="info"
          dismissible={false}
          marginBottom={0}
        />
      ) : (
        <View
          style={[
            styles.list,
            {
              borderColor: colors.outline,
              backgroundColor: colors.surface,
            },
          ]}
        >
          {faqs.map((faq, index) => (
            <FaqRow
              key={faq.id}
              faq={faq}
              open={openId === faq.id}
              last={index === faqs.length - 1}
              onToggle={() => onToggle(faq.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function FaqRow({
  faq,
  open,
  last,
  onToggle,
}: {
  faq: FaqItem;
  open: boolean;
  last: boolean;
  onToggle: () => void;
}) {
  const { colors, text } = useTpTheme();

  return (
    <View
      style={[
        styles.row,
        last
          ? null
          : { borderBottomColor: colors.outline, borderBottomWidth: 1 },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        style={styles.question}
      >
        <Text style={[styles.mark, { color: colors.primary }]}>
          {open ? '−' : '+'}
        </Text>
        <Text
          style={[
            text.titleMedium,
            tpNunito('600'),
            styles.questionCopy,
            { color: colors.onSurfaceVariant },
          ]}
        >
          {faq.question}
        </Text>
      </Pressable>
      {open ? (
        <Text
          style={[text.bodyLarge, styles.answer, { color: colors.textMuted }]}
        >
          {faq.answer}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: searchMaxWidth,
    minHeight: tpSizes.controlCompact,
    marginBottom: tpSpacing.sm,
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xs,
    borderWidth: 1,
    borderRadius: tpCorners.pill,
    fontSize: tpSizes.inputFont,
    lineHeight: Math.round(tpSizes.inputFont * 1.4),
    includeFontPadding: false,
    ...tpNunito('400'),
  },
  list: {
    marginTop: tpSpacing.sm,
    borderWidth: 1,
    borderRadius: tpCorners.xs,
    paddingHorizontal: tpSpacing.md,
  },
  row: {
    paddingTop: tpSpacing.xl,
    paddingBottom: tpSpacing.md,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: tpSizes.control,
    gap: tpSpacing.md,
  },
  mark: {
    width: 16,
    fontSize: 18,
    lineHeight: 22,
    ...tpNunito('700'),
  },
  questionCopy: {
    flex: 1,
  },
  answer: {
    marginLeft: tpSpacing.xl,
    marginTop: tpSpacing.xs,
  },
});
