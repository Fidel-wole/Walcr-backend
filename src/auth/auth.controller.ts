/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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
import dispatcher from 'src/utils/dispatcher';
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
      if (
        err instanceof NotFoundException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      }
      throw new InternalServerErrorException(
        err
      );
    }
  }

  @Post('login')
  async signIn(@Body() signInDto: signInDto) {
    try {
      const user = await this.authService.findUser(signInDto.email);
      if (!user) {
        // If user not found
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await comparePasswords(
        signInDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        // If password is incorrect
        throw new UnauthorizedException('Incorrect password');
      }

      const token = this.jwtService.sign({ id: user._id, email: user.email });
      return {
        message: 'User logged in successfully',
        data: token,
      };
    } catch (err: any) {
      if (
        err instanceof NotFoundException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during login.',
      );
    }
  }
  @Post('login/phone-number')
  async signinWithNumber(@Body() signInDtoWithNumber: signInDtoWithNumber) {
    try {
      const user = await this.authService.findUserByNumber(
        signInDtoWithNumber.phone_number,
      );

      if (!user) {
        // If user not found
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await comparePasswords(
        signInDtoWithNumber.password,
        user.password,
      );

      if (!isPasswordValid) {
        // If password is incorrect
        throw new UnauthorizedException('Incorrect password');
      }

      const token = this.jwtService.sign({ id: user._id, email: user.email });
      return {
        message: 'User logged in successfully',
        data: token,
      };
    } catch (err: any) {
      if (
        err instanceof NotFoundException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during login.',
      );
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
      throw new UnauthorizedException('Authentication failed');
    }
    const token = user.token;
    res.redirect('https://walcr.com');
  }

  @Get('user')
  @UseGuards(AuthGuard())
  async getUser(@Req() req){
  const userId = req.user.id;
  try{
  const user = await this.authService.getUser(userId);
  if(!user){
    throw new NotFoundException('User not found');
  }
  return ({
    message:"User data fetched sucessfully",
    data:user
  })
  
}catch (err: any) {
  if (
    err instanceof NotFoundException
  ) {
    throw err;
  }
  throw new InternalServerErrorException(
    'An unexpected error occurred during login.',
  );
}
}

@Post('/update-user')
@UseGuards(AuthGuard())
async updateUserProfile(@Req() req, @Res() res, @Body() signinDto:signInDto){
const userId = req.user.id;
  try{
 const update = await this.authService.editProfile(userId, signinDto);
dispatcher.DispatchSuccessMessage(res, "Profile updated sucessfully", update)
}catch(err){
  throw new InternalServerErrorException(
    'An unexpected error occurred during profile update.',
  );
}
}
}