import { StyleSheet, Text, View } from 'react-native';

import { TpButton } from '../../../ui/components/actions/TpButton';
import { TpSpinner } from '../../../ui/components/feedback/TpSpinner';
import { TpKeyboardScrollView } from '../../../ui/components/content/TpKeyboardScrollView';
import { TpAlert } from '../../../ui/components/overlays/TpAlert';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { FaqAudienceTabs } from './FaqAudienceTabs';
import { FaqEmpty } from './FaqEmpty';
import { FaqHero } from './FaqHero';
import { FaqQuestionList } from './FaqQuestionList';
import { FaqSectionGrid } from './FaqSectionCard';
import { loadFaqs } from './loadFaqs';
import { loadFaqSections } from './loadFaqSections';
import { faqText } from './faqText';
import { useFaq, type FaqModel } from './useFaq';

/**
 * Guest FAQ / Support page. Hero and audience tabs are static; sections
 * and questions fill in after the API responds.
 */
export function FaqScreen() {
  const model = useFaq(loadFaqSections, loadFaqs);
  const { colors } = useTpTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <TpKeyboardScrollView
        testID="public-scroll"
        contentContainerStyle={styles.scroll}
      >
        <FaqHero />
        <View style={styles.body}>
          <FaqAudienceTabs
            selectedId={model.audienceType}
            onSelected={model.setAudience}
          />
          <FaqApiBody model={model} />
        </View>
      </TpKeyboardScrollView>
    </View>
  );
}

function FaqApiBody({ model }: { model: FaqModel }) {
  const { colors } = useTpTheme();

  if (model.sectionsLoading) {
    return <FaqLoading />;
  }

  if (model.error != null) {
    return <FaqInlineError message={model.error} onRetry={model.retry} />;
  }

  if (model.sections.length === 0) {
    return <FaqEmpty />;
  }

  return (
    <>
      <FaqSectionGrid
        sections={model.sections}
        selectedSectionId={model.selectedSection?.id}
        onSelect={model.selectSection}
      />
      <Text
        style={[
          tpNunito('700'),
          styles.sectionTitle,
          { color: colors.onSurface },
        ]}
      >
        {model.selectedSection?.title ?? faqText.title}
      </Text>
      <FaqQuestions model={model} />
    </>
  );
}

function FaqQuestions({ model }: { model: FaqModel }) {
  if (model.faqsLoading) {
    return <FaqLoading />;
  }

  if (model.faqsError != null) {
    return (
      <FaqInlineError message={model.faqsError} onRetry={model.retryFaqs} />
    );
  }

  if (model.faqs.length === 0) {
    return <FaqEmpty />;
  }

  return (
    <FaqQuestionList
      faqs={model.visibleFaqs}
      query={model.query}
      openId={model.openId}
      onQueryChange={model.setQuery}
      onToggle={model.toggleQuestion}
    />
  );
}

function FaqInlineError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.inlineError}>
      <TpAlert
        message={message}
        severity="error"
        dismissible={false}
        marginBottom={0}
      />
      <TpButton
        label={faqText.retry}
        variant="outlined"
        size="compact"
        onPress={onRetry}
      />
    </View>
  );
}

function FaqLoading() {
  const { colors } = useTpTheme();

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={faqText.loading}
      accessibilityState={{ busy: true }}
      style={[styles.compactStatus, styles.center]}
    >
      <TpSpinner size={24} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    paddingBottom: tpSpacing.xl,
  },
  body: {
    paddingHorizontal: tpSpacing.md,
    paddingTop: tpSpacing.xxl + tpSpacing.md,
  },
  sectionTitle: {
    marginTop: tpSpacing.xl,
    marginBottom: tpSpacing.xl,
    fontSize: 34,
    lineHeight: 42,
  },
  compactStatus: {
    paddingVertical: tpSpacing.xl,
  },
  center: {
    alignItems: 'center',
  },
  inlineError: {
    gap: tpSpacing.sm,
  },
});

export default FaqScreen;
