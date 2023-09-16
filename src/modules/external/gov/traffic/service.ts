// NOTE: might become more complicated when we have db or event emitters

import { AxiosApiClient } from '../../../../helpers/api-clients';
import { ExternalTrafficPaths } from './enums';
import { Injectable } from '@nestjs/common';
import { ITrafficResponse } from './data-domains';
import { GOV_API_BASE_URL } from '../common/constants';

@Injectable()
export class TrafficService {
  constructor(protected readonly apiClient: AxiosApiClient) {}

  async getTraffic(date_time?: string): Promise<ITrafficResponse> {
    return this.apiClient.request(
      {
        method: 'GET',
        url: `${GOV_API_BASE_URL}${ExternalTrafficPaths.IMAGES}`,
        params: { date_time },
      },
      (res) => {
        // NOTE: we might need a wrapper, can be unwieldy if we just do a cast
        return res.data as ITrafficResponse;
      },
    );
  }
}
