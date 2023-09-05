import { Test, TestingModule } from '@nestjs/testing';
import { PaymasterController } from './paymaster.controller';

describe('PaymasterController', () => {
  let controller: PaymasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymasterController],
    }).compile();

    controller = module.get<PaymasterController>(PaymasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
