/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly walletService: WalletService,
  ) {}

  async findUser(email: string) {
    try {
      return await this.userModel.findOne({ email: email });
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async findUserByNumber(phone_number: string) {
    try {
      return await this.userModel.findOne({ phone_number: phone_number });
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async registerUser(data: any) {
    try {
      const user = await this.userModel.create(data);
      await this.walletService.createWallet(user._id);
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async inputPhoneNumber(userId: any, phone_number: string) {
    try {
      const user = await this.userModel.findById(userId);
      user.phone_number = phone_number;
      user.save();
    } catch (err) {
      throw err;
    }
  }

  async getUser(userId: string) {
    try {
      return await this.userModel.findById(userId);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async editProfile(userId, data) {
    try {
      return await this.userModel.findByIdAndUpdate(userId, data, {
        new: true,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
