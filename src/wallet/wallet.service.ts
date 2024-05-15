/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';
import { STRIPE_SECRET_KEY } from 'src/config/env';
import { PaymentMethod } from './schema/paymentMethod.schema';
import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { Card } from './schema/card.schema';

@Injectable()
export class WalletService {
  private stripe = new Stripe(STRIPE_SECRET_KEY);

  constructor(
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('Card') private cardModel: Model<Card>,
    @InjectModel('PaymentMethod')
    private paymentMethodModel: Model<PaymentMethod>,
  ) {}

  async createWallet(userId: string): Promise<Wallet> {
    try {
      const wallet = new this.walletModel({ userId });
      return await wallet.save();
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  }

  async getUserBalance(userId: string) {
    try {
      const wallet = await this.walletModel.findOne({ userId });
      return wallet ? wallet.balance : 0;
    } catch (error) {
      console.error('Error getting user balance:', error);
      throw error;
    }
  }

  async createPaymentMethod(
    userId: string,
    cardToken: string,
  ): Promise<Stripe.PaymentMethod> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: cardToken,
        },
      });

      await this.paymentMethodModel.create({
        userId: userId,
        paymentMethodId: paymentMethod.id,
      });

      return paymentMethod;
    } catch (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }
  }

  async addCard(cardData: any) {
    try {
      const user = await this.cardModel.create(cardData);

      if (!user) {
        throw new Error('User not found');
      }

      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      console.error('Error adding card:', error);
      throw error;
    }
  }

  async getCards(userId) {
    try {
      const card = await this.cardModel.findById(userId);
      return card;
    } catch (error) {
      console.error('Error getting cards:', error);
      throw error;
    }
  }

  
}
