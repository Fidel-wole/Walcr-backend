/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { hashPassword } from 'src/utils/functions';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post('register')
  async register(@Body() signUpDto: signUpDto) {
    try {
      const findUser = await this.authService.findUser(signUpDto.email);
      if (findUser) {
        throw new UnauthorizedException('User already exists');
      } else {
        //signUpDto.password = await hashPassword(signUpDto.password);
      }
      const user = await this.authService.registerUser(signUpDto);
      const token = this.jwtService.sign({ id: user._id });
      return {
        message: 'User created sucessfully',
        data: token,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
