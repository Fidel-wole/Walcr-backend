/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AuthGuard } from '@nestjs/passport';
import { serviceDto } from './dto/service.dto';
import dispatcher from 'src/utils/dispatcher';
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/book')
  @UseGuards(AuthGuard())
  async bookService(@Req() req, @Res() res, @Body() serviceDto: serviceDto) {
    serviceDto.userId = req.user._id;
    try {
      const booking = await this.serviceService.bookService(serviceDto);
      if (booking) {
        dispatcher.DispatchSuccessMessage(res, 'Service Booked Sucessfully');
      }
    } catch (err) {
      throw err;
    }
  }
  @Post('/ride')
  async serviceRide(@Res() res, @Body() body: { service_ride: string }) {
    try {
      const { service_ride } = body;
      const ride = await this.serviceService.serviceRides(service_ride);
      if (ride) {
        dispatcher.DispatchSuccessMessage(
          res,
          'Service Ride Added Sucessfully',
        );
      }
    } catch (err) {
      throw err;
    }
  }

  @Get('/bookings')
  @UseGuards(AuthGuard())
  async getBookedService(@Req() req, @Res() res){
    const userId = req.user._id;
    try{
        const bookings = await this.serviceService.getBookedService(userId)
        if(!bookings){
            return new NotFoundException("No Booking Made yet")
        }else{
            dispatcher.DispatchSuccessMessage(res, "Bookings fetched sucessfully", bookings)
        }
    }catch(err){
        throw new HttpException(
            'Error getting bookings',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }

  @Get('/rides')
  @UseGuards(AuthGuard())
  async getServiceRides(@Res() res){
    try{
        const rides = await this.serviceService.getServiceRides()
        if(!rides){
            return new NotFoundException("No ride found")
        }else{
            dispatcher.DispatchSuccessMessage(res, "Rides fetched sucessfully", rides)
        }
    }catch(err){
        throw new HttpException(
            'Error getting rides',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
