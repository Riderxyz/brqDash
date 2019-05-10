import { Test, TestingModule } from '@nestjs/testing';
import { DatasController } from './datas.controller';

describe('Datas Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DatasController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: DatasController = module.get<DatasController>(DatasController);
    expect(controller).toBeDefined();
  });
});
