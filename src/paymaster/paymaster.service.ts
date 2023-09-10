import { Injectable } from '@nestjs/common';

const entryPoint = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
const simpleAccountFactory = '0x9406Cc6185a346906296840746125a0E44976454';
const pmContext = {
  type: 'payg',
};

@Injectable()
export class PaymasterService {
  sendTransaction(recipient: string, amount: string) {
    return {};
  }
}
