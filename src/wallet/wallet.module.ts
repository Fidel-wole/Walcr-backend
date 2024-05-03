/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schema/wallet.schema';
@Module({
  imports:[AuthModule, MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }])],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
