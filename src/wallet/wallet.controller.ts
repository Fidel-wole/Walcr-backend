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
import { CardData } from './dto/card.dto';
import dispatcher from 'src/utils/dispatcher';

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
  async addCard(@Req() req, @Res() res, @Body() cardDto: CardData) {
    const userId = req.user.id;

    try {
      const card = await this.walletService.addCard(cardDto);
      //await this.walletService.createPaymentMethod(userId, cardDto.paymentMethodId);
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

}
