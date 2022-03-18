import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ArrangementConsent, ArrangementConsentRelations} from '../models';

export class ArrangementConsentRepository extends DefaultCrudRepository<
  ArrangementConsent,
  typeof ArrangementConsent.prototype.id,
  ArrangementConsentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ArrangementConsent, dataSource);
  }
}
