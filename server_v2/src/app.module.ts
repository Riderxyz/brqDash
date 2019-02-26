import { Module, HttpModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TFSController } from './controller/tfsOns.Controler';
import { TfsService } from './service/tfs/tfs.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, TFSController],
  providers: [AppService, TfsService],
})
export class AppModule {

  constructor() {

  }

}
