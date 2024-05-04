/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Get('/balance')
  @UseGuards(AuthGuard())
  async getUserBalance(@Req() req) {
    const userId = req.user._id;
    const balance = await this.walletService.getUserBalance(userId);
    return ({message:"Balance fetched sucessfully", data:balance});
  }

  @Post('/deposit')
  @UseGuards(AuthGuard())
  async deposit(@Req() req, @Body() body: { amount: any }) {
    const userId = req.user._id;

    const { amount } = body;
    const convertTointeger = parseFloat(amount);
    const deposit = await this.walletService.deposit(userId, convertTointeger);
    if (deposit) {
      return {
        message: `You've sucessfully deposited an amount of ${amount} into your account`,
      };
    } else {
      return { message: 'Error while depositing' };
    }
  }
}
