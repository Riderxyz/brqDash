import { Test, TestingModule } from '@nestjs/testing';
import { TfsService } from './tfs.service';

describe('TfsService', () => {
  let service: TfsService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TfsService],
    }).compile();
    service = module.get<TfsService>(TfsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
