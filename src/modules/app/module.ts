import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { externalModules } from '../external';
import { LocationModule } from '../location';

@Module({
  imports: [...externalModules, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
