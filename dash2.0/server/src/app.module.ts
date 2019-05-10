import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatasController } from './modules/datas/datas.controller';
import { DatasService } from './modules/datas/datas.service';

@Module({
  imports: [],
  controllers: [AppController, DatasController],
  providers: [AppService, DatasService],
})
export class AppModule { }
