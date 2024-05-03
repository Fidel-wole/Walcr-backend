/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { signInDto } from './dto/signin.dto';
import { signInDtoWithNumber } from './dto/signin.dto';
import { getsender } from 'src/utils/functions';
import { comparePasswords, hashPassword } from 'src/utils/functions';
import { JwtService } from '@nestjs/jwt';
import { sendOTp } from 'src/utils/functions';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
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
      getsender();
      await sendOTp(signUpDto.phone_number);
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
      } else {
        throw new Error('User not found');
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
  @Post('login/phone-number')
  async signinWithNumber(@Body() signInDtoWithNumber: signInDtoWithNumber) {
    try {
      const user = await this.authService.findUserByNumber(
        signInDtoWithNumber.phone_number,
      );
      if (user) {
        const isPasswordValid = await comparePasswords(
          signInDtoWithNumber.password,
          user.password,
        );
        if (isPasswordValid) {
          const token = this.jwtService.sign({ id: user._id });
          return {
            message: 'User logged in successfully',
            data: token,
          };
        }
      } else {
        throw new Error('User not found');
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google')) // Passport AuthGuard for Google
  googleAuth() {
    // This will redirect the user to Google's OAuth endpoint
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    // If authentication is successful, 'req.user' will contain user data
    const user = req.user;
    if (!user) {
      // Authentication failed
      throw new UnauthorizedException("Authentication failed")
    }
    const token = user.token
    res.redirect("https://walcr.com")
}
}