// NOTE: might become more complicated when we have db or event emitters

import { AxiosApiClient } from '../../../../helpers/api-clients';
import { ExternalTrafficPaths } from './enums';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITrafficResponse } from './data-domains';
import { GOV_API_BASE_URL, httpsAgent } from '../common/constants';
import { AxiosResponse } from 'axios';
import { IError } from '../common/data-domains';

@Injectable()
export class TrafficService {
  constructor(protected readonly apiClient: AxiosApiClient) {}

  async getTraffic(date_time?: string): Promise<ITrafficResponse> {
    const transformFunc = (res: AxiosResponse) => {
      try {
        return res.data as ITrafficResponse;
      } catch (error) {
        const response = res.data as IError;

        throw new HttpException(
          `TrafficService.getTraffic failed [${response.code}] ${response.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: error,
          },
        );
      }
    };

    return this.apiClient.request(
      {
        method: 'GET',
        url: `${GOV_API_BASE_URL}${ExternalTrafficPaths.IMAGES}`,
        params: { date_time },
        httpsAgent,
      },
      transformFunc,
    );
  }
}
