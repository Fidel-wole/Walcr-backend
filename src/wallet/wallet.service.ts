/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';
import { PaymentSchema } from './schema/paymentRefrence.schema';
import { PAYSTACK_SECRET_KEY } from 'src/config/env';
const paystack = require("paystack")(PAYSTACK_SECRET_KEY);

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private walletModel: Model<Wallet>,
    @InjectModel('PaymentReference') private paymentReferenceModel: Model<PaymentSchema>,
  ) {}

  async createWallet(userId: string): Promise<Wallet> {
    const wallet = new this.walletModel({ userId });
    return wallet.save();
  }

  async getUserBalance(userId: string) {
    const wallet = await this.walletModel.findOne({ userId });
    return wallet ? wallet.balance : 0;
  }

  async deposit(email: string, userId: string, amount: number, paymentRef: string) {
    try {
      if (typeof amount !== 'number' || amount <= 0) {
        throw new BadRequestException("Invalid amount");
      }

      if (!email || !email.includes("@")) {
        throw new BadRequestException("Invalid email");
      }

      if (typeof userId !== 'string' || userId === '') {
        console.log(userId)
        throw new BadRequestException("User ID is required");
      }

      if (!paymentRef) {
        throw new BadRequestException("Payment reference is required");
      }

      // Initialize transaction with Paystack
      const paymentResponse = await paystack.transaction.initialize({
        amount: amount * 100, // Paystack requires amounts in kobo
        email: email,
        reference: paymentRef,
      });

      // Save the payment reference in the database
      const paymentReference = await this.paymentReferenceModel.create({
        userId,
        amount,
        paymentRef,
      });

      if (!paymentReference) {
        throw new InternalServerErrorException("Failed to save payment reference");
      }

      return paymentResponse;
    } catch (error) {
      console.error("Error in deposit:", error); // Proper logging
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error; // Forward the specific exception
      }

      throw new InternalServerErrorException("An error occurred during payment processing");
    }
  }
}
