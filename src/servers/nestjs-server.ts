import { NestFactory } from '@nestjs/core';
import { Server } from './types';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import { appConfig } from '../configs/app-config';
import { AppModule as NestJSAppModule } from '../modules/app/module';

// NOTE: NestjsServer is a class that implements the Server interface.
// NOTE: might be useful when we need to switch out the server implementation
class NestjsServer implements Server {
  private factory: NestFactoryStatic;

  constructor() {
    this.factory = NestFactory;
  }

  // NOTE: default port to 3000
  // TODO: use env config to control this
  async start() {
    const app = await this.factory.create(NestJSAppModule);
    app.enableCors({
      origin: ['http://localhost:3001'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    });
    await app.listen(appConfig.port);
  }
}

const nestjsServer = new NestjsServer();

export default nestjsServer;
