/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RiderService } from './rider.service';
import dispatcher from 'src/utils/dispatcher';
import { AuthGuard } from '@nestjs/passport';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post('/setStatus')
  @UseGuards(AuthGuard())
  async setOnline(
    @Req() req,
    @Res() res,
    @Body()
    body: {
      userId: string;
      latitude: number;
      longitude: number;
      status: string;
    },
  ) {
    const riderId = req.user.id;
    const { status, latitude, longitude } = body;
    try {
      const rider = await this.riderService.setStatus(
        riderId,
        status,
        longitude,
        latitude,
      );
      dispatcher.DispatchSuccessMessage(
        res,
        'Status updated sucessfully',
        rider,
      );
    } catch (err) {}
  }
}
