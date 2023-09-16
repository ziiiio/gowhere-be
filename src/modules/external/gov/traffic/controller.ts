import { TrafficService } from './service';
import { Controller, Get, Query } from '@nestjs/common';
import { API_VERSION, TRAFFIC_PREFIX } from './constants';
import { TrafficPaths } from './enums';
import { ITrafficResponse } from './data-domains';

@Controller({
  path: TRAFFIC_PREFIX,
  version: API_VERSION,
})
export class TrafficController {
  constructor(protected readonly trafficService: TrafficService) {}

  @Get(TrafficPaths.IMAGES)
  async getTraffic(
    @Query('date_time') date_time: string,
  ): Promise<ITrafficResponse> {
    return this.trafficService.getTraffic(date_time);
  }
}
