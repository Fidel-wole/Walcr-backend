/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';
import { STRIPE_SECRET_KEY } from 'src/config/env';
import { User } from 'src/auth/schema/user.schema';
import { PaymentMethod } from './schema/paymentMethod.schema';
import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  private stripe = new Stripe(STRIPE_SECRET_KEY);

  constructor(
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('PaymentMethod') private paymentMethodModel: Model<PaymentMethod>,
  ) {}

  // This method creates a new wallet document for a user
  async createWallet(userId: string): Promise<Wallet> {
    const wallet = new this.walletModel({ userId });
    return wallet.save(); // This operation is asynchronous and may not release resources immediately
  }

  // This method retrieves the balance for a user
  async getUserBalance(userId: string) {
    const wallet = await this.walletModel.findOne({ userId });
    return wallet ? wallet.balance : 0; // Potential memory leak if 'wallet' object is large
  }

  // This method creates a payment method with Stripe
  async createPaymentMethod(userId: string, cardToken: string): Promise<Stripe.PaymentMethod> {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: cardToken,
      },
    });

    await this.paymentMethodModel.create({ // Potential memory leak if 'paymentMethod' object is large
      userId: userId,
      paymentMethodId: paymentMethod.id,
    });

    return paymentMethod;
  }

  // This method adds a card to a user's account
  async addCard(userId: any, cardData: any) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      user.cards.push(cardData); // Potential memory leak if 'cardData' is large

      const updatedUser = await user.save(); // Potential memory leak if 'updatedUser' object is large
      return updatedUser;
    } catch (error) {
      console.error('Error adding card:', error);
      throw error;
    }
  }

  // This method retrieves all cards for a user
  async getCards(userId) {
    try {
      const card = await this.userModel.findById(userId);
      return card.cards; // Potential memory leak if 'card' object is large
    } catch (err) {
      throw err;
    }
  }

  // This method initiates a deposit for a user
  async deposit(userId: string, amount: number): Promise<boolean> {
    const paymentMethod = await this.paymentMethodModel.findOne({ userId: userId });

    if (!paymentMethod) {
      throw new Error('Payment method not found');
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method: paymentMethod.paymentMethodId,
        confirm: true,
      });

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
