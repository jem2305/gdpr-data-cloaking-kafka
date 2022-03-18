import {Entity, model, property} from '@loopback/repository';

@model()
export class ArrangementConsent extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  arrangementId: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['SECURITY', 'MARKETING']
    }
  })
  consentScope: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<ArrangementConsent>) {
    super(data);
  }
}

export interface ArrangementConsentRelations {
  // describe navigational properties here
}

export type ArrangementConsentWithRelations = ArrangementConsent & ArrangementConsentRelations;
