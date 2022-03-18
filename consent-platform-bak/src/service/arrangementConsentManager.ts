import ArrangementConsent from '../types/arrangementConsent';
import ConsentScope from '../types/consentScope';

interface ArrangementConsentManager {
  add(consent: ArrangementConsent): void;
  getAllByScope(scope: ConsentScope): ArrangementConsent[];
}

export default ArrangementConsentManager;
