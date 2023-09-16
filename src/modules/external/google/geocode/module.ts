import { Module } from '@nestjs/common';
import { GeocodeController } from './controller';
import { GeoService } from './service';
import { AxiosApiClient } from '../../../../helpers/api-clients';

@Module({
  imports: [],
  controllers: [GeocodeController],
  providers: [GeoService, AxiosApiClient],
})
export class GeoCodeModule {}
