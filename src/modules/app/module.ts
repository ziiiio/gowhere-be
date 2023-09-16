import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { externalModules } from '../external';

@Module({
  imports: [...externalModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
