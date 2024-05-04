/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';
import { v4 as uuidv4 } from "uuid";
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
    const userId = req.user.id;
    const email = req.user.email;
    const { amount } = body;
    let uuid: string;

      uuid = formatUUID(uuidv4().substring(0, 12));
      const paymentRef = `Walcr_${uuid}`;
    try{
    const deposit = await this.walletService.deposit(email, userId, amount, paymentRef);
    if (deposit) {
      return deposit
    } else {
      return { message: 'Error while depositing' };
    }
  }catch(err){
    throw err
  }
}
}
const formatUUID = ((uud: any) =>{
  const cleanedUUid = uud.replace(/[_-]/g, "");
  const convertToUppercase = cleanedUUid.toUpperCase();
  return convertToUppercase;
})