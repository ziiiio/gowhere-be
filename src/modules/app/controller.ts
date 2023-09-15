import { AppService } from './service';

export class AppController {
  constructor(protected readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }
}
