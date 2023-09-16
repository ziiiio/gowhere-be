import { GeoService } from './service';
import { Controller, Get, Query } from '@nestjs/common';
import { API_VERSION, GEOCODE_PREFIX } from './constants';
import { GooglePaths } from './enums';
import { GeocodeResponse } from './data-domains';

@Controller({
  path: GEOCODE_PREFIX,
  version: API_VERSION,
})
export class GeocodeController {
  constructor(protected readonly geoService: GeoService) {}

  @Get(GooglePaths.LOCATION)
  async getForecasts(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<GeocodeResponse> {
    return this.geoService.getLocation(latitude, longitude);
  }
}
