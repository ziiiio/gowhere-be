import { WeatherService } from './service';
import { Controller, Get, Query } from '@nestjs/common';
import { API_VERSION, WEATHER_PREFIX } from './constants';
import { WeatherPaths } from './enums';
import { IWeatherResponse } from './data-domains';

@Controller({
  path: WEATHER_PREFIX,
  version: API_VERSION,
})
export class WeatherController {
  constructor(protected readonly weatherService: WeatherService) {}

  @Get(WeatherPaths.FORECAST_2_HOURS)
  async getForecasts(
    @Query('date_time') date_time: string,
  ): Promise<IWeatherResponse> {
    return this.weatherService.getForecasts(date_time);
  }
}
