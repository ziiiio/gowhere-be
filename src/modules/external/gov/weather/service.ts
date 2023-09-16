import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GOV_API_BASE_URL } from '../common/constants';
import { AxiosApiClient } from '../../../../helpers/api-clients';
import { ExternalWeatherPaths } from './enums';
import { IWeatherResponse } from './data-domains';
import { AxiosResponse } from 'axios';
import { IError } from '../common/data-domains';

// TODO: support 24 hour & 4 days forecasts?
@Injectable()
export class WeatherService {
  constructor(protected readonly apiClient: AxiosApiClient) {}

  async getForecasts(date_time: string): Promise<IWeatherResponse> {
    const transformFunc = (res: AxiosResponse) => {
      try {
        return res.data as IWeatherResponse;
      } catch (error) {
        const response = res.data as IError;

        throw new HttpException(
          `WeatherService.getForecasts failed [${response.code}] ${response.message}`,
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
        url: `${GOV_API_BASE_URL}${ExternalWeatherPaths.FORECAST_2_HOURS}`,
        params: { date_time },
      },
      transformFunc,
    );
  }
}
