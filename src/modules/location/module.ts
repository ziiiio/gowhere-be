import { Module } from '@nestjs/common';
import { LocationController } from './controller';
import { LocationService } from './service';
import { TrafficService } from '../external/gov/traffic/service';
import { GeoService } from '../external/google/geocode/service';
import { AxiosApiClient } from '../../helpers/api-clients';
import { WeatherService } from '../external/gov/weather/service';

@Module({
  imports: [],
  controllers: [LocationController],
  providers: [
    LocationService,
    TrafficService,
    WeatherService,
    GeoService,
    AxiosApiClient,
  ],
})
export class LocationModule {}
