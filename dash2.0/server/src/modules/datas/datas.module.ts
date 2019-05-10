import { Module } from '@nestjs/common';
import { DatasController } from './datas.controller';
import { DatasService } from './datas.service';

@Module({
  controllers: [DatasController],
  providers: [DatasService]
})
export class DatasModule { }
