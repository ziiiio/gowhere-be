import { Controller, Get } from '@nestjs/common';
import { AppController as BaseAppController } from '../controller';
import { AppService } from './service';

@Controller()
export class AppController extends BaseAppController {
  constructor(appService: AppService) {
    super(appService);
  }

  @Get()
  getHello(): string {
    return super.getHello();
  }
}
