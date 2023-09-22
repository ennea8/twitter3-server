import { Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from '@/auth/decorators/public.decorator';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller()
export class NodePimlicoController {
  private key = 'pimlico-linea-goerli';
  private config: any;

  constructor(private configService: ConfigService) {
    this.config = this.configService.get<any>(`nodesMap.${this.key}`);
  }

  @Public()
  @Get('/node/1')
  async test() {
    console.log('test');
    return 'test';
  }

  @Public()
  @Post('/pm/1')
  async pimlicoPaymaster(@Request() req) {
    const [userOp, entryPoint, pmContext] = req.body;
    // console.log('userOp', userOp);

    // TODO add service to check if need to sponsor
    // for paymaster request we need check if to sponsor the transaction
    // so not just to proxy

    const ID = 0;
    try {
      const ret = await axios.post(this.config.pmUrl, {
        jsonrpc: '2.0',
        method: 'pm_sponsorUserOperation',
        params: [userOp, entryPoint],
        id: ID,
      });

      return ret.data;
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

  @Public()
  @Post('/node/1')
  async pimlicoNode(@Request() req) {
    const rpcUrl = this.config.rpcUrl;
    const pimlicoEndpoint = this.config.pmUrl;

    const postData = req.body;

    // console.log('postData', postData, postData.method);
    if (
      ['eth_sendUserOperation', 'eth_getUserOperationReceipt'].includes(
        postData.method,
      ) // eth_sendUserOperation
    ) {
      const result = await axios.post(pimlicoEndpoint, postData);
      console.log('userop.result: ', postData, result.data);
      return result.data;
    } else {
      const result = await axios.post(rpcUrl, postData);
      console.log('node.result: ', postData, result.data);
      return result.data;
    }
  }
}
