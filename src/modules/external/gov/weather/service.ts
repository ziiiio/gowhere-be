import { Injectable } from '@nestjs/common';
import { GOV_API_BASE_URL } from '../common/constants';
import { AxiosApiClient } from '../../../../helpers/api-clients';
import { ExternalWeatherPaths } from './enums';
import { IWeatherResponse } from './data-domains';

@Injectable()
export class WeatherService {
  constructor(protected readonly apiClient: AxiosApiClient) {}

  async getForecasts(date_time: string): Promise<IWeatherResponse> {
    return this.apiClient.request(
      {
        method: 'GET',
        url: `${GOV_API_BASE_URL}${ExternalWeatherPaths.FORECAST_2_HOURS}`,
        params: { date_time },
      },
      (res) => {
        // NOTE: we might need a wrapper, can be unwieldy if we just do a cast
        return res.data as IWeatherResponse;
      },
    );
  }
}
