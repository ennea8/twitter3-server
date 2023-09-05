import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import * as jose from 'jose';
import { PrismaService } from '../prisma.service';
import { Prisma, Account, TwitterInfo } from '@prisma/client';
import { ethers, computeAddress } from 'ethers';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.accountService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // verify and register
  async web3authVerify(idToken: string, appPubKey: string) {
    const jwks = jose.createRemoteJWKSet(
      new URL('https://api-auth.web3auth.io/jwks'),
    );

    const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
      algorithms: ['ES256'],
    });

    console.log('jwtDecoded', JSON.stringify(jwtDecoded.payload));

    // Checking `app_pub_key` against the decoded JWT wallet's public_key
    if ((jwtDecoded.payload as any).wallets[0].public_key === appPubKey) {
      // TODO generate token

      const address = computeAddress('0x' + appPubKey);

      const account = await this.prisma.account.findUnique({
        where: {
          address,
        },
      });

      if (account) {
        return _.pick(account, ['address']);
      } else {
        const data = jwtDecoded.payload;
        const result = await this.prisma.account.create({
          data: {
            address,
            providerType: 'twitter',
            twitterInfo: {
              create: {
                profileImage: _.get(data, 'profileImage', '') as string,
                typeOfLogin: _.get(data, 'typeOfLogin', '') as string,
                name: _.get(data, 'name', '') as string,
                idToken: _.get(data, 'idToken', '') as string,
                oAuthAccessToken: _.get(data, 'oAuthAccessToken', '') as string,
                oAuthIdToken: _.get(data, 'oAuthIdToken', '') as string,
                appState: _.get(data, 'appState', '') as string,
                dappShare: _.get(data, 'dappShare', '') as string,
                verifier: _.get(data, 'verifier', '') as string,
                verifierId: _.get(data, 'verifierId', '') as string,
                aggregateVerifier: _.get(
                  data,
                  'aggregateVerifier',
                  '',
                ) as string,
                touchIDPreference: _.get(
                  data,
                  'touchIDPreference',
                  '',
                ) as string,
              },
            },
          },
        });

        return result;
      }

      // Verified
      return { name: 'Verification Successful' };
    } else {
      return { name: 'Verification Failed' };
    }
  }
}
