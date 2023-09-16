import { Module } from '@nestjs/common';
import { WeatherController } from './controller';
import { WeatherService } from './service';
import { AxiosApiClient } from '../../../../helpers/api-clients';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [WeatherService, AxiosApiClient],
})
export class WeatherModule {}
