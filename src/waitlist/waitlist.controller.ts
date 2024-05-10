/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpException, HttpStatus, UnauthorizedException, Get, NotFoundException, Res } from '@nestjs/common';
import { WaitlistDto } from './dto/waitlist.dto';
import { WaitlistService } from './waitlist.service';
import { v4 as uuidv4 } from "uuid";

@Controller('waitlist') // Define the controller
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('/') // POST request to add to the waitlist
  async addWaitlist(@Res() res, @Body() waitlistDto: WaitlistDto) {
    let uuid: string;
      let existingRecord;

      do {
        uuid = formatUUID(uuidv4().substring(0, 9));
        existingRecord = await this.waitlistService.findReferralCode(uuid)
      } while (existingRecord);
    try {
        const user = await this.waitlistService.findUserEmail(waitlistDto.email);
        const ip_address = await this.waitlistService.findUserIpAddress(waitlistDto.ip_address)
        if(user){
            return new UnauthorizedException("Email has already been submitted")
        }else if(ip_address){
          return new UnauthorizedException("Ip address already exist")
        }
        waitlistDto.referral_code = uuid
      const waitlist = await this.waitlistService.addWaitlist(waitlistDto); // Call the service
    
      return {
        message: 'Waitlist added successfully',
        referralCode: waitlist.referral_code,
      };
      res.redirect("https://walcr.com/welcome")
    } catch (err) {
        if (
            err instanceof UnauthorizedException
          ) {
            throw err;
          }
      throw new HttpException(
        { message: 'Failed to add to waitlist', error: err.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/counts')
 async getWaitlistCount(){
try{
const count = await this.waitlistService.getWaitlistCount();
if(count){
    return ({
        Message:"Waitlist fetched sucessfully",
        data:count
    })
}else{
    return new NotFoundException("No waitlisted yet")
}
}catch(err){
    if (
        err instanceof NotFoundException
      ) {
        throw err;
      }
  throw new HttpException(
    { message: 'Failed to get waitlist count', error: err.message },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
 }
}

const formatUUID = ((uud: any) =>{
    const cleanedUUid = uud.replace(/[_-]/g, "");
    const convertToUppercase = cleanedUUid.toUpperCase();
    return convertToUppercase;
  })