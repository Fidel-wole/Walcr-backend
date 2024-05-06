/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/balance')
  @UseGuards(AuthGuard())
  async getUserBalance(@Req() req) {
    const userId = req.user._id;
    const balance = await this.walletService.getUserBalance(userId);
    return { message: 'Balance fetched successfully', data: balance };
  }

  @Post('/create-deposit-intent')
  @UseGuards(AuthGuard())
  async deposit(@Req() req, @Body() body: { amount: number }) {
    const { amount } = body;
    try {
      const paymentIntent =
        await this.walletService.createPaymentIntent(amount);
      if (paymentIntent) {
        return { clientSecret: paymentIntent.client_secret };
      } else {
        throw new HttpException(
          'Error creating payment intent',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err) {
      console.error('Error during deposit:', err);
      throw new HttpException(
        'An error occurred during deposit',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/update-wallet')
  @UseGuards(AuthGuard())
  async updateWallet(@Req() req, @Body() body: { paymentIntentId: string }) {
    try {
      const { paymentIntentId } = body;
      const userId = req.user._id;

      // Verify the payment with Stripe or any payment service
      const payment = await this.walletService.updateWallet(paymentIntentId);

      if (payment && payment.status === 'succeeded') {
        const amount = payment.amount; // amount in cents

        // Update the user's wallet balance
        await this.walletService.updateWalletBalance(userId, amount);
        return { message: 'Wallet updated successfully' };
      } else {
        throw new HttpException(
          'Payment not successful',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.error('Error updating wallet:', err);
      throw new HttpException(
        'Error updating wallet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
