import { Injectable } from '@nestjs/common';
import { AppService as BaseAppService } from '../service';

@Injectable()
export class AppService extends BaseAppService {
  getHello(): string {
    return super.getHello();
  }
}
