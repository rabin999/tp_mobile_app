import { StyleSheet, Text, View } from 'react-native';

import { TpIllustration } from '../../../ui/components/content/TpIllustration';
import { tpAssets } from '../../../ui/theme/tpAssets';
import { tpNunito } from '../../../ui/theme/tpFonts';
import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { useTpTheme } from '../../../ui/theme/tpTheme';
import { faqText } from './faqText';

const emptyArtWidth = 100;

/**
 * Support empty listing: 100px art, title, and muted message.
 */
export function FaqEmpty() {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.body}>
      <TpIllustration
        source={tpAssets.empty}
        width={emptyArtWidth}
        height={50}
        semanticLabel={faqText.emptyArtLabel}
      />
      <Text
        style={[
          text.titleSmall,
          tpNunito('600'),
          styles.title,
          { color: colors.onSurface },
        ]}
      >
        {faqText.emptyTitle}
      </Text>
      <Text
        style={[text.bodyLarge, styles.message, { color: colors.textMuted }]}
      >
        {faqText.emptyMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    paddingVertical: tpSpacing.xxl + tpSpacing.md,
    paddingHorizontal: tpSpacing.md,
  },
  title: {
    marginTop: tpSpacing.md,
    textAlign: 'center',
  },
  message: {
    marginTop: tpSpacing.xs,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 400,
  },
});
