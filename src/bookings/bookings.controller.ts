import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking[]> {
    const { flightId, userIds, seatNumbers } = createBookingDto;

    // Validate and handle booking logic
    try {
      const bookings = await this.bookingsService.bookSeats(flightId, userIds, seatNumbers);
      return bookings;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
