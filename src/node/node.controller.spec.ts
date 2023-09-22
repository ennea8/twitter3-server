import { Test, TestingModule } from '@nestjs/testing';
import { NodePimlicoController } from './node.pimlico.controller';

describe('NodeController', () => {
  let controller: NodePimlicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodePimlicoController],
    }).compile();

    controller = module.get<NodePimlicoController>(NodePimlicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
