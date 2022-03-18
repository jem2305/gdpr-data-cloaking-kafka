import ArrangementConsentManager from '../arrangementConsentManager';
import ArrangementConsent from '../../types/arrangementConsent';
import ConsentScope from '../../types/consentScope';

class InMemoryArrangementConsentManager implements ArrangementConsentManager {
  consents: ArrangementConsent[] = [];

  add(consent: ArrangementConsent): void {
    this.consents.push(consent);
  }

  getAllByScope(scope: ConsentScope): ArrangementConsent[] {
    return this.consents.filter((c) => c.scope === scope);
  }
}

export default InMemoryArrangementConsentManager;
