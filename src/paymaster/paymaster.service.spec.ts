import { Test, TestingModule } from '@nestjs/testing';
import { PaymasterService } from './paymaster.service';

describe('PaymasterService', () => {
  let service: PaymasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymasterService],
    }).compile();

    service = module.get<PaymasterService>(PaymasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
