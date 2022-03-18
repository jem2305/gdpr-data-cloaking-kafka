/* eslint-disable @typescript-eslint/naming-convention */
import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {pack} from 'tar-stream';
import {createGzip} from 'zlib';
import {ArrangementConsentRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class BundleService {
  constructor(
    @repository(ArrangementConsentRepository)
    public arrangementConsentRepository: ArrangementConsentRepository,
  ) { }

  async buildBundleForArrangementsInScope(consentScope: string) {
    const consents = await this.arrangementConsentRepository.find({where: {consentScope}});
    const data = {
      allowedArrangements: consents.map((consent) => {return consent.arrangementId}),
    }
    const manifest = {roots: ['consents']};

    const tarStream = pack();
    tarStream.entry({name: './consents/data.json'}, JSON.stringify(data))
    tarStream.entry({name: './.manifest'}, JSON.stringify(manifest))
    tarStream.finalize();

    return tarStream.pipe(createGzip());
  }
}
