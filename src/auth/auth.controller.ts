/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { signInDto } from './dto/signin.dto';
import { comparePasswords, hashPassword } from 'src/utils/functions';
import { JwtService } from '@nestjs/jwt';
import { sendOTp } from 'src/utils/functions';
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
        signUpDto.password = await hashPassword(signUpDto.password);
      }
      await sendOTp(signUpDto.phone_number)
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

  @Post('login')
  async signIn(@Body() signInDto: signInDto) {
    try {
      const user = await this.authService.findUser(signInDto.email);
      if (user) {
        const isPasswordValid = await comparePasswords(
          signInDto.password,
          user.password,
        );
        if (isPasswordValid) {
          const token = this.jwtService.sign({ id: user._id });
          return {
            message: 'User logged in successfully',
            data: token,
          };
        }
      }else{
        throw new Error("User not found")
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }

}