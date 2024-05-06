/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';
import { PaymentSchema } from './schema/paymentRefrence.schema';
import { STRIPE_SECRET_KEY } from 'src/config/env';
const stripe = require('stripe')(STRIPE_SECRET_KEY);

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('PaymentReference')
    private paymentReferenceModel: Model<PaymentSchema>,
  ) {}

  async createWallet(userId: string): Promise<Wallet> {
    const wallet = new this.walletModel({ userId });
    return wallet.save();
  }

  async getUserBalance(userId: string) {
    const wallet = await this.walletModel.findOne({ userId });
    return wallet ? wallet.balance : 0;
  }

  async createPaymentIntent(amount: number) {
    try {
      if (typeof amount !== 'number' || amount <= 0) {
        throw new BadRequestException('Invalid amount');
      }

      // Initialize transaction with Paystack
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error in deposit:', error); // Proper logging
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error; // Forward the specific exception
      }

      throw new InternalServerErrorException(
        'An error occurred during payment processing',
      );
    }
  }

  async updateWallet(paymentIntentId) {
    try {
      if (!paymentIntentId) {
        throw new BadRequestException('PaymentIntent ID is required');
      }

      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);

      if (!paymentIntent) {
        throw new InternalServerErrorException('Payment Intent not found');
      }

      // Ensure the PaymentIntent status is "succeeded"
      if (paymentIntent.status !== 'succeeded') {
        throw new BadRequestException('Payment not successful');
      }

      return paymentIntent;
    } catch (error) {
      if (error.type === 'StripeInvalidRequestError') {
        throw new BadRequestException('Invalid PaymentIntent ID');
      }

      console.error('Error in updateWallet:', error);
      throw new InternalServerErrorException(
        'An error occurred during payment processing',
      );
    }
  }

  async updateWalletBalance(userId, amount) {
    let wallet = await this.walletModel.findById({ userId: userId });
    if (wallet) {
      wallet.balance += amount;
    }
    return await wallet.save();
  }
}
