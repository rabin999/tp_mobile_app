import { StyleSheet, View } from 'react-native';

import { tpSpacing } from '../../../ui/theme/tpSpacing';
import { PublicBulletList } from '../PublicBulletList';
import { PublicScreen, PublicSection } from '../PublicScreen';
import { PublicSectionHeader } from '../PublicSectionHeader';
import { BodyText, Heading } from './LegalDocumentScreen';
import type { PrivacyBlock, PrivacySubSection } from './legalDocument';
import { privacyBlocks, privacyIntro, privacyTitle } from './privacyContent';

/**
 * Guest Privacy Policy page.
 */
export function PrivacyScreen() {
  return (
    <PublicScreen>
      <PublicSection>
        <PublicSectionHeader title={privacyTitle} />
        <BodyText>{privacyIntro}</BodyText>
        {privacyBlocks.map(block => (
          <PrivacyBlockView key={block.heading} block={block} />
        ))}
      </PublicSection>
    </PublicScreen>
  );
}

function PrivacyBlockView({ block }: { block: PrivacyBlock }) {
  const before = presentCopy(block.paragraphsBefore);
  const after = presentCopy(block.paragraphsAfter);

  return (
    <View style={styles.block}>
      <Heading>{block.heading}</Heading>
      {block.subSections?.map(section => (
        <PrivacySubSectionView key={section.title} section={section} />
      ))}
      {before.map((paragraph, index) => (
        <BodyText key={index}>{paragraph}</BodyText>
      ))}
      {block.bullets != null ? (
        <PublicBulletList items={block.bullets} />
      ) : null}
      {after.map((paragraph, index) => (
        <BodyText key={index}>{paragraph}</BodyText>
      ))}
    </View>
  );
}

function PrivacySubSectionView({ section }: { section: PrivacySubSection }) {
  const paragraphs = presentCopy(section.paragraphs);

  return (
    <View style={styles.sub}>
      <Heading>{section.title}</Heading>
      {paragraphs.map((paragraph, index) => (
        <BodyText key={index}>{paragraph}</BodyText>
      ))}
      {section.bullets != null ? (
        <PublicBulletList items={section.bullets} />
      ) : null}
    </View>
  );
}

function presentCopy(lines: readonly string[] | undefined): string[] {
  return (lines ?? []).filter(line => line.length > 0);
}

const styles = StyleSheet.create({
  block: {
    gap: tpSpacing.sm,
  },
  sub: {
    gap: tpSpacing.sm,
  },
});
