import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { PaymasterModule } from './paymaster/paymaster.module';
import { NodeModule } from './node/node.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    AccountModule,
    PaymasterModule,
    NodeModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
