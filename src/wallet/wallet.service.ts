/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';

@Injectable()
export class WalletService {
        constructor(@InjectModel('Wallet') private walletModel: Model<Wallet>) {}

      
  async createWallet(userId: string): Promise<Wallet> {
    const wallet = new this.walletModel({ userId });
    return wallet.save();
  }
  async getUserBalance(userId: string) {
    const wallet = await this.walletModel.findOne({ userId: userId });
    return wallet ? wallet.balance : 0;
  }

  async deposit(userId: string, amount: number) {
    let wallet = await this.walletModel.findOne({ userId: userId });
    if (wallet) {
      wallet.balance += amount;
    }
   return await wallet.save(); 
  }
    
}
