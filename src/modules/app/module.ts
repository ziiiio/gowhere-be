import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { TrafficModule } from '../external/gov/traffic';

@Module({
  imports: [TrafficModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
