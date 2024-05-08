/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Waitlist } from './waitlist.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel('Waitlist') private waitlistModel: Model<Waitlist>,
  ) {}

  async addWaitlist(data: any) {
    try {
      return await this.waitlistModel.create(data);
    } catch (err) {
      throw err;
    }
  }

  async findUserEmail(email) {
    try {
      return await this.waitlistModel.findOne({ email });
    } catch (err) {
      throw err;
    }
  }
  async findReferralCode(code: any) {
    try {
      return await this.waitlistModel.findOne({ referral_code: code });
    } catch (err) {
      throw err;
    }
  }

  async getWaitlistCount(){
    try{
return await this.waitlistModel.countDocuments()
    }catch(err){
        throw err
    }
  }
}