import { Controller, Request, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { JsonRpcProvider } from 'ethers';
import { omit } from 'lodash';
import axios from 'axios';

interface VerifyingPaymasterResult {
  paymasterAndData: string;
  preVerificationGas: string;
  verificationGasLimit: string;
  callGasLimit: string;
}

@Controller('paymaster')
export class PaymasterController {
  constructor(private jwtService: JwtService) {}

  /*
  * {
  method: 'pm_sponsorUserOperation',
  params: [
    {
      sender: '0x24CB9549105570bf80bAc728BBBe74C275F39585',
      nonce: '0x1',
      initCode: '0x',
      callData: '0xb61d27f6000000000000000000000000447a1b205c1775bf2ea3d90038faed6168e56856000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
      callGasLimit: '0x88b8',
      verificationGasLimit: '0x33450',
      preVerificationGas: '0x5208',
      maxFeePerGas: '0x6bc3ea4',
      maxPriorityFeePerGas: '0x6bc3e40',
      paymasterAndData: '0x',
      signature: '0x60dc876d8908e8f09b9b359ad03fbde231c0d13703f678c635e54279886de47752850d35b75a3e3eb6c99bbb83779c9544ca2c6c114fb1c328ad485eca138f401c'
    },
    '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    { type: 'payg', accessToken:'' }
  ],
  id: 42,
  jsonrpc: '2.0'
}
  *
  * */
  @Post('/')
  async verifyAndGetData(@Request() req) {
    console.log('post', req.body);
    const [params, entryPoint, pmContext] = req.body;

    const ID = 0;

    try {
      // TODO customize validation logic for user
      // -[ ] gas限制，gas过高则拒绝
      // -[ ] twitter粉丝数
      // -[ ] 限制mint频率，已经mint的统计
      // -[ ] 限制合约地址，合约方法

      const pm = await axios.post(process.env.PAYMASTER_API_URL, {
        jsonrpc: '2.0',
        method: 'pm_sponsorUserOperation',
        params: [params, entryPoint, pmContext],
        id: ID,
      });
      const payload = pm.data;

      if (payload.error) {
        const error: any = new Error(payload.error.message);
        throw error;
      }

      console.log('pm data:', pm);

      return {
        jsonrpc: '2.0',
        id: ID,
        result: payload.result,
      };
    } catch (e) {
      return {
        jsonrpc: '2.0',
        id: ID,
        error: {
          message: e.message,
          code: -32601,
        },
      };
    }
  }
}
