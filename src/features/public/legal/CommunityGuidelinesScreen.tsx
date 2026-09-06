import { LegalDocumentScreen } from './LegalDocumentScreen';
import { communityGroups } from './communityContent';

/**
 * Guest Community Guidelines page.
 */
export function CommunityGuidelinesScreen() {
  return <LegalDocumentScreen groups={communityGroups} />;
}
