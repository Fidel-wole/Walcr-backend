/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schema/wallet.schema';
import { PaymentMethodSchema } from './schema/paymentMethod.schema';
import { CardSchema } from './schema/card.schema';
@Module({
  imports:[forwardRef(()=>AuthModule), MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema },
  { name: 'Card', schema: CardSchema },
  { name: 'PaymentMethod', schema: PaymentMethodSchema }
  ])],
  providers: [WalletService],
  controllers: [WalletController],
  exports:[WalletService]
})
export class WalletModule {}
