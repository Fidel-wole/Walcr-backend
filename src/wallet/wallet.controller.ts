/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';
import { card } from './dto/card.dto';
import dispatcher from 'src/utils/dispatcher';
import { hashPassword } from 'src/utils/functions';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/balance')
  @UseGuards(AuthGuard())
  async getUserBalance(@Req() req) {
    const userId = req.user._id;
    const balance = await this.walletService.getUserBalance(userId);
    return { message: 'Balance fetched successfully', data: balance };
  }

  @UseGuards(AuthGuard())
  @Post('/add-card')
  async addCard(@Req() req, @Res() res, @Body() cardDto: card) {
    const userId = req.user.id;

    try {
      cardDto.cvv = await hashPassword(cardDto.cvv);
      const card = await this.walletService.addCard(userId, cardDto);
      await this.walletService.createPaymentMethod(userId, cardDto.paymentMethodId);
      dispatcher.DispatchSuccessMessage(res, 'Card added sucessfully', card);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Error updating card',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(AuthGuard())
  @Get('/get-card')
  async getCards(@Req() req) {
    const userId = req.user.id;
    try {
      const card = await this.walletService.getCards(userId);
      if (!card) {
        return new NotFoundException('No card found');
      }
      return card;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Error updating card',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('deposit')
  async deposit(@Req() req, @Body() body: { amount: number }) {
    const { amount } = body;
    const userId = req.user.id
    try {
      const success = await this.walletService.deposit(userId, amount);
      if (success) {
        return { message: 'Deposit successful' };
      } else {
        return { error: 'Deposit failed', message: 'Failed to process the deposit' };
      }
    } catch (error) {
      return { error: 'Failed to deposit', message: error.message };
    }
  }

}
