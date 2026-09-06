import { StyleSheet, Text, View } from 'react-native';

import { TpButton } from '../../../ui/components/actions/TpButton';
import { TpSpinner } from '../../../ui/components/feedback/TpSpinner';
import { TpErrorState } from '../../../ui/components/feedback/TpStatusPage';
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
 * Guest FAQ / Support page.
 */
export function FaqScreen() {
  const model = useFaq(loadFaqSections, loadFaqs);

  if (model.loading) {
    return <FaqLoading />;
  }

  if (model.error != null) {
    return <FaqError message={model.error} onRetry={model.retry} />;
  }

  if (model.sections.length === 0) {
    return (
      <View style={styles.status}>
        <FaqEmpty />
      </View>
    );
  }

  return <FaqReady model={model} />;
}

function FaqReady({ model }: { model: FaqModel }) {
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
        </View>
      </TpKeyboardScrollView>
    </View>
  );
}

function FaqQuestions({ model }: { model: FaqModel }) {
  if (model.faqsLoading) {
    return <FaqLoading compact />;
  }

  if (model.faqsError != null) {
    return (
      <View style={styles.inlineError}>
        <TpAlert
          message={model.faqsError}
          severity="error"
          dismissible={false}
          marginBottom={0}
        />
        <TpButton
          label={faqText.retry}
          variant="outlined"
          size="compact"
          onPress={model.faqsLoading ? undefined : model.retryFaqs}
        />
      </View>
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

function FaqLoading({ compact = false }: { compact?: boolean }) {
  const { colors } = useTpTheme();

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={faqText.loading}
      accessibilityState={{ busy: true }}
      style={[compact ? styles.compactStatus : styles.status, styles.center]}
    >
      <TpSpinner size={compact ? 24 : 32} color={colors.primary} />
    </View>
  );
}

function FaqError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.status}>
      <TpErrorState
        title={faqText.errorTitle}
        message={message}
        illustration="error"
        actionLabel={faqText.retry}
        onAction={onRetry}
      />
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
  status: {
    flex: 1,
    justifyContent: 'center',
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
