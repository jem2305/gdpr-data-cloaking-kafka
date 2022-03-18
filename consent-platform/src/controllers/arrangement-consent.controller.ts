/* eslint-disable @typescript-eslint/naming-convention */
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {ArrangementConsent} from '../models';
import {ArrangementConsentRepository} from '../repositories';

export class ArrangementConsentController {
  constructor(
    @repository(ArrangementConsentRepository)
    public arrangementConsentRepository: ArrangementConsentRepository,
  ) { }

  @post('/arrangement-consents')
  @response(200, {
    description: 'ArrangementConsent model instance',
    content: {'application/json': {schema: getModelSchemaRef(ArrangementConsent)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArrangementConsent, {
            title: 'NewArrangementConsent',
            exclude: ['id'],
          }),
        },
      },
    })
    arrangementConsent: Omit<ArrangementConsent, 'id'>,
  ): Promise<ArrangementConsent> {
    return this.arrangementConsentRepository.create(arrangementConsent);
  }

  @get('/arrangement-consents/count')
  @response(200, {
    description: 'ArrangementConsent model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ArrangementConsent) where?: Where<ArrangementConsent>,
  ): Promise<Count> {
    return this.arrangementConsentRepository.count(where);
  }

  @get('/arrangement-consents')
  @response(200, {
    description: 'Array of ArrangementConsent model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ArrangementConsent, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ArrangementConsent) filter?: Filter<ArrangementConsent>,
  ): Promise<ArrangementConsent[]> {
    return this.arrangementConsentRepository.find(filter);
  }

  @patch('/arrangement-consents')
  @response(200, {
    description: 'ArrangementConsent PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArrangementConsent, {partial: true}),
        },
      },
    })
    arrangementConsent: ArrangementConsent,
    @param.where(ArrangementConsent) where?: Where<ArrangementConsent>,
  ): Promise<Count> {
    return this.arrangementConsentRepository.updateAll(arrangementConsent, where);
  }

  @get('/arrangement-consents/{id}')
  @response(200, {
    description: 'ArrangementConsent model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ArrangementConsent, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ArrangementConsent, {exclude: 'where'}) filter?: FilterExcludingWhere<ArrangementConsent>
  ): Promise<ArrangementConsent> {
    return this.arrangementConsentRepository.findById(id, filter);
  }

  @patch('/arrangement-consents/{id}')
  @response(204, {
    description: 'ArrangementConsent PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArrangementConsent, {partial: true}),
        },
      },
    })
    arrangementConsent: ArrangementConsent,
  ): Promise<void> {
    await this.arrangementConsentRepository.updateById(id, arrangementConsent);
  }

  @put('/arrangement-consents/{id}')
  @response(204, {
    description: 'ArrangementConsent PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() arrangementConsent: ArrangementConsent,
  ): Promise<void> {
    await this.arrangementConsentRepository.replaceById(id, arrangementConsent);
  }

  @del('/arrangement-consents/{id}')
  @response(204, {
    description: 'ArrangementConsent DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.arrangementConsentRepository.deleteById(id);
  }
}
