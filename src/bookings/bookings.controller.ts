import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './booking.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApproveBookingDto } from './dto/approve-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking[]> {
    const { flightId, userIds, seatNumbers } = createBookingDto;

    
    try {
      const bookings = await this.bookingsService.bookSeats(flightId, userIds, seatNumbers);
      return bookings;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveBookingDto) {
    return this.bookingsService.changeApproval(id, body.isApproved);
  }
}
