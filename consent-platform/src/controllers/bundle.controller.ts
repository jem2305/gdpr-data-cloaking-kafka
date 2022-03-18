// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {get, param, response} from '@loopback/rest';
import {Gzip} from 'zlib';
import {BundleService} from '../services';

export class BundleController {
  constructor(
    @service(BundleService)
    public bundleService: BundleService,
  ) { }

  @get('/bundles/arrangements/{scope}.tar.gz')
  @response(200, {
    description: 'Open Policy Agent Bundle containing allowed arrangements for the supplied scope.',
  })
  async find(
    @param.path.string('scope') scope: string,
  ): Promise<Gzip> {
    return this.bundleService.buildBundleForArrangementsInScope(scope.toUpperCase());
  }

}
