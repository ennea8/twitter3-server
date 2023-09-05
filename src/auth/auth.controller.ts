import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import * as jose from 'jose';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verify(@Request() req) {
    const idToken = req.headers.authorization?.split(' ')[1];
    const app_pub_key = req.body.appPubKey;
    return this.authService.web3authVerify(idToken, app_pub_key);
  }

  @Get('profile')
  getProfile(@Request() req) {
    const address = req.user.sub;

    const accountInfo = this.authService.getProfile(address);

    return accountInfo;
  }
}
