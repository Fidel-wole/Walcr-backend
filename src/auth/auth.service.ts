/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { comparePasswords } from 'src/utils/functions';

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

  async registerUser(data: any) {
    try {
      return await this.userModel.create(data);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async login(signInDto) {
    try{
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email, password})
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }else{
        const isPasswordValid = await comparePasswords(
            password,
            user.password
          );
          if (isPasswordValid) {
            console.log(user.id);
            const token = this.jwtService.sign({ id: user._id });
            return {
              message:"User logged in successfully",
              data:token
            };
    }
}

  }catch(err:any){
    throw new Error(err)
}

}
}