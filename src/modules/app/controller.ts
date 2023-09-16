import { Controller, Get } from '@nestjs/common';
import { AppService } from './service';

@Controller()
export class AppController {
  constructor(protected readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
