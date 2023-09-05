import { Module } from '@nestjs/common';
import { PaymasterController } from './paymaster.controller';
import { PaymasterService } from './paymaster.service';

@Module({
  controllers: [PaymasterController],
  providers: [PaymasterService],
})
export class PaymasterModule {}
