import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { appLogger } from '../../core/logging/appLogger';
import { isAllowedOutboundUrl } from '../../core/outboundUrl';
import {
  TpAlert,
  TpButton,
  TpFormActions,
  TpIllustration,
  TpKeyboardScrollView,
  TpSelect,
  TpSnackbar,
  TpSpinner,
  TpSvgIcon,
  TpTextField,
} from '../../ui/components';
import { tpAssets } from '../../ui/theme/tpAssets';
import { tpNunito } from '../../ui/theme/tpFonts';
import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';
import { topicForValue } from './contact';
import { contactChannels } from './contactChannels';
import { contactText } from './contactText';
import { loadContactTopics } from './loadContactTopics';
import { submitContact } from './submitContact';
import {
  useContactForm,
  useContactTopics,
  type ContactFormModel,
} from './useContact';

/**
 * Public contact page: channels + query form.
 */
export function ContactScreen() {
  const { colors } = useTpTheme();
  const form = useContactForm(submitContact);
  const topics = useContactTopics(loadContactTopics);

  const onSend = async () => {
    const sent = await form.send();

    if (sent) {
      TpSnackbar.show({
        message: contactText.sent,
        tone: 'success',
      });
    }
  };

  const onOpen = async (url: string) => {
    if (!isAllowedOutboundUrl(url)) {
      appLogger.debug('contact: blocked url');
      TpSnackbar.show({
        message: contactText.linkFailed,
        tone: 'danger',
      });
      return;
    }

    try {
      await Linking.openURL(url);
    } catch {
      appLogger.debug('contact: link failed');
      TpSnackbar.show({
        message: contactText.linkFailed,
        tone: 'danger',
      });
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <TpKeyboardScrollView>
        <Intro onOpen={onOpen} />
        <QueryForm form={form} topics={topics} onSend={onSend} />
      </TpKeyboardScrollView>
    </View>
  );
}

function Intro({ onOpen }: { onOpen: (url: string) => void | Promise<void> }) {
  const { colors, text } = useTpTheme();
  const [artWidth, setArtWidth] = useState(0);

  return (
    <View style={styles.section}>
      <Text style={[text.headlineSmall, { color: colors.onSurfaceVariant }]}>
        {contactText.title}
      </Text>
      <Text
        style={[
          text.bodyLarge,
          styles.subhead,
          { color: colors.onSurfaceVariant },
        ]}
      >
        {contactText.subhead}
      </Text>
      <View
        style={styles.art}
        onLayout={event => setArtWidth(event.nativeEvent.layout.width)}
      >
        {artWidth > 0 ? (
          <TpIllustration
            source={tpAssets.communicate}
            width={artWidth}
            height={220}
            semanticLabel={contactText.illustrationLabel}
          />
        ) : null}
      </View>
      <ChannelList onOpen={onOpen} />
    </View>
  );
}

function ChannelList({
  onOpen,
}: {
  onOpen: (url: string) => void | Promise<void>;
}) {
  return (
    <View style={styles.channels}>
      {contactChannels.map(channel => (
        <ChannelLink
          key={channel.key}
          icon={channel.icon}
          label={channel.label}
          meta={channel.meta}
          accessibilityLabel={channel.accessibilityLabel}
          onPress={() => onOpen(channel.url)}
        />
      ))}
    </View>
  );
}

function ChannelLink({
  icon,
  label,
  meta,
  accessibilityLabel,
  onPress,
}: {
  icon: (typeof contactChannels)[number]['icon'];
  label: string;
  meta?: string;
  accessibilityLabel: string;
  onPress: () => void;
}) {
  const { colors, text } = useTpTheme();

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={6}
      style={styles.channel}
    >
      <View style={[styles.channelIcon, { backgroundColor: colors.primary }]}>
        <TpSvgIcon source={icon} size={14} color={colors.onPrimary} />
      </View>
      <Text style={[text.labelLarge, { color: colors.onSurfaceVariant }]}>
        {label}
        {meta != null ? (
          <Text
            style={[
              text.labelLarge,
              tpNunito('500'),
              { color: colors.textMuted },
            ]}
          >
            {' '}
            {meta}
          </Text>
        ) : null}
      </Text>
    </Pressable>
  );
}

function QueryForm({
  form,
  topics,
  onSend,
}: {
  form: ContactFormModel;
  topics: ReturnType<typeof useContactTopics>;
  onSend: () => void;
}) {
  const { colors, text } = useTpTheme();
  const selected = topicForValue(topics.topics, form.draft.topic);
  const formReady = !topics.loading && topics.error == null;
  const canSend = formReady && !form.sending;

  return (
    <View style={[styles.section, styles.formSection]}>
      <Text style={[text.headlineSmall, { color: colors.onSurfaceVariant }]}>
        {contactText.formTitle}
      </Text>
      {form.formError != null ? (
        <TpAlert
          message={form.formError}
          severity="error"
          marginBottom={0}
          onClosed={form.dismissFormError}
        />
      ) : null}
      {topics.error != null ? (
        <View style={styles.topicsError}>
          <TpAlert
            message={topics.error}
            severity="error"
            marginBottom={0}
            dismissible={false}
          />
          <TpButton
            label={contactText.topicsRetry}
            variant="outlined"
            size="compact"
            onPress={topics.loading ? undefined : topics.retry}
          />
        </View>
      ) : null}
      <View>
        {topics.loading ? (
          <TopicsLoading />
        ) : (
          <TpSelect
            label={contactText.topic}
            accessibilityLabel={contactText.topic}
            items={[...topics.topics]}
            value={selected}
            labelBuilder={item => item.label}
            onChanged={item => form.setTopic(item.value)}
            enabled={formReady}
            errorText={form.fieldErrors.topic}
          />
        )}
      </View>
      <TpTextField
        label={contactText.fullName}
        hint={contactText.fullNameHint}
        value={form.draft.fullName}
        autoComplete="name"
        onChangeText={form.setFullName}
      />
      <TpTextField
        label={contactText.email}
        hint={contactText.email}
        value={form.draft.email}
        keyboardType="email-address"
        autoComplete="email"
        onChangeText={form.setEmail}
        errorText={form.fieldErrors.email}
      />
      <TpTextField
        label={contactText.message}
        hint={contactText.messageHint}
        value={form.draft.message}
        maxLines={4}
        onChangeText={form.setMessage}
        errorText={form.fieldErrors.message}
      />
      <View style={styles.sendWrap}>
        <TpFormActions
          primary={
            <TpButton
              label={contactText.send}
              loading={form.sending}
              onPress={
                canSend
                  ? () => {
                      onSend();
                    }
                  : undefined
              }
            />
          }
        />
      </View>
    </View>
  );
}

function TopicsLoading() {
  const { colors, text } = useTpTheme();

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={contactText.topicsLoading}
      accessibilityState={{ busy: true }}
      style={styles.topicsLoading}
    >
      <TpSpinner size={20} color={colors.primary} />
      <Text style={[text.bodyMedium, { color: colors.onSurfaceVariant }]}>
        {contactText.topicsLoading}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  section: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xl,
    gap: tpSpacing.xxs,
  },
  subhead: {
    marginBottom: tpSpacing.md,
  },
  art: {
    width: '100%',
    height: 220,
  },
  channels: {
    marginTop: tpSpacing.md,
    gap: tpSpacing.sm,
  },
  channel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.sm,
  },
  channelIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    gap: tpSpacing.md,
  },
  topicsError: {
    gap: tpSpacing.sm,
  },
  topicsLoading: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.sm,
  },
  sendWrap: {
    width: '100%',
    marginTop: tpSpacing.md,
  },
});
