/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RiderService } from './rider.service';
import dispatcher from 'src/utils/dispatcher';
import { AuthGuard } from '@nestjs/passport';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @UseGuards(AuthGuard()) // Ensure authentication
  @Post('/setStatus') // POST endpoint to set rider status
  async setOnline(
    @Req() req,
    @Res() res,
    @Body()
    body: {
      latitude: number;
      longitude: number;
      status: string;
    },
  ) {
    const riderId = req.user._id; // Get the authenticated user's ID
    const { status, latitude, longitude } = body; // Extract data from request body
  
    try {
      const rider = await this.riderService.setStatus(
        riderId,
        status,
        longitude,
        latitude
      );
  
      if (!rider) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to update status',
        });
      }
    
      // Return success response
      dispatcher.DispatchSuccessMessage(
        res,
        'Status updated successfully', // Corrected typo
        rider
      );
    } catch (err) {
      throw err
      console.error('Error setting rider status:', err); // Log error for debugging
  
      // Return error response with 500 status
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to set status',
        error: err.message,
      });
    }
  }
}
