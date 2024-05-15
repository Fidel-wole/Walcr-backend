/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';
import { STRIPE_SECRET_KEY } from 'src/config/env';
import { User } from 'src/auth/schema/user.schema';
import { PaymentMethod } from './schema/paymentMethod.schema';
import Stripe from 'stripe';

@Injectable()
export class WalletService {
  private stripe = new Stripe(STRIPE_SECRET_KEY);

  constructor(
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('PaymentMethod') private paymentMethodModel: Model<PaymentMethod>,
  ) {}

  async createWallet(userId: string): Promise<Wallet> {
    const wallet = new this.walletModel({ userId });
    return wallet.save();
  }

  async getUserBalance(userId: string) {
    const wallet = await this.walletModel.findOne({ userId });
    return wallet ? wallet.balance : 0;
  }

  async createPaymentMethod(userId: string, cardToken: string): Promise<Stripe.PaymentMethod> {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: cardToken,
      },
    });

    // Save payment method to database
    await this.paymentMethodModel.create({
      userId: userId,
      paymentMethodId: paymentMethod.id,
    });

    return paymentMethod;
  }


  async addCard(userId: any, cardData: any) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      user.cards.push(cardData);

      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      // Better to log the error for debugging purposes
      console.error('Error adding card:', error);
      // Rethrow the error to propagate it to the caller
      throw error;
    }
  }

  async getCards(userId) {
    try {
      const card = await this.userModel.findById(userId);
      return card.cards;
    } catch (err) {
      throw err;
    }
  }

  async deposit(userId: string, amount: number): Promise<boolean> {
    // Retrieve user's payment method from database
    const paymentMethod = await this.paymentMethodModel.findOne({ userId: userId });

    if (!paymentMethod) {
      throw new Error('Payment method not found');
    }

    try {
      // Initiate the payment using Stripe
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Convert amount to cents
        currency: 'usd', // Adjust currency as needed
        payment_method: paymentMethod.paymentMethodId,
        confirm: true,
      });

      // If payment succeeded, update user's wallet balance
      if (paymentIntent.status === 'succeeded') {
        await this.walletModel.updateOne({ userId }, { $inc: { balance: amount } });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error depositing:', error);
      return false;
    }
  }
}
