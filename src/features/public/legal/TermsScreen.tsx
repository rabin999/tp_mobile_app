import { LegalDocumentScreen } from './LegalDocumentScreen';
import { termsGroup } from './termsContent';

/**
 * Guest Terms and Conditions page.
 */
export function TermsScreen() {
  return <LegalDocumentScreen groups={[termsGroup]} />;
}
