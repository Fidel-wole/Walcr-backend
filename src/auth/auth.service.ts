/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    try {
      return await this.userModel.findOne({ email: email });
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async findUserByNumber(phone_number: number) {
    try {
      return await this.userModel.findOne({ phone_number: phone_number });
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async registerUser(data: any) {
    try {
      return await this.userModel.create(data);
    } catch (err: any) {
      throw new Error(err);
    }
  }

}
