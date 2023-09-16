import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { TrafficModule } from '../external/gov/traffic';
import { WeatherModule } from '../external/gov/weather';

@Module({
  imports: [TrafficModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
