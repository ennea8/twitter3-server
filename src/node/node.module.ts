import { Module } from '@nestjs/common';
import { NodePimlicoController } from './node.pimlico.controller';
import { NodeService } from './node.service';

@Module({
  controllers: [NodePimlicoController],
  providers: [NodeService],
})
export class NodeModule {}
