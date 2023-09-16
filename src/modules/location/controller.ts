import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './service';
import { API_VERSION, LOCATION_PREFIX } from './constants';
import { LocationPaths } from './enums';
import { TLocationResponse } from './data-domains';

@Controller({
  path: LOCATION_PREFIX,
  version: API_VERSION,
})
export class LocationController {
  constructor(protected readonly locationService: LocationService) {}

  @Get(LocationPaths.LOCATIONS)
  async getLocations(
    @Query('date_time') date_time: string,
  ): Promise<TLocationResponse> {
    return this.locationService.getLocations(date_time);
  }
}
