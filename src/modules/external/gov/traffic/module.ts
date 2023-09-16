import { Module } from '@nestjs/common';
import { TrafficController } from './controller';
import { TrafficService } from './service';
import { AxiosApiClient } from '../../../../helpers/api-clients';

@Module({
  imports: [],
  controllers: [TrafficController],
  providers: [TrafficService, AxiosApiClient],
})
export class TrafficModule {}
