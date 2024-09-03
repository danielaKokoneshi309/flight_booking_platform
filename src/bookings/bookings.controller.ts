import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Res, NotFoundException, Query } from '@nestjs/common';
import { Response } from 'express';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './booking.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApproveBookingDto } from './dto/approve-booking.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { Users } from 'src/users/user.entity';
import { PdfService } from 'src/pdf/pdf.service';
import { BookingDto } from './dto/booking.dto';
@Controller('bookings')
export class BookingsController {
 constructor(private readonly bookingsService: BookingsService,
  private readonly pdfService: PdfService
 ) {}

@UseGuards(AuthGuard)
@Post()
async createBooking(
  @Body() createBookingDto: CreateBookingDto,   @CurrentUser() user: Users,
  @Query('returnFlightId') returnFlightId?: number): Promise<Booking[]> {
  try {

    return this.bookingsService.bookSeats(createBookingDto, user, returnFlightId);
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
  @Patch('/:id')
    @UseGuards(AuthGuard)
   @UseGuards(AdminGuard)
  approveBooking(@Param('id') id: number, @Body() body: ApproveBookingDto): Promise<Booking> {
    return this.bookingsService.changeApproval(id, body.isApproved);
  }
@Get('/bookingHistory')
@UseGuards(AuthGuard)
  getbookingHistory(@CurrentUser()user:Users){
return this.bookingsService.getBookingHistory(user)
  }

  @Get('/bookingRequests')
@UseGuards(AuthGuard)
 @UseGuards(AdminGuard)
  getbookingRequest(){
return this.bookingsService.getBookingRequests()
  }
@Get('/totalRevenue')
  getTotalRevenue(){
    return this.bookingsService.getTotaRevenue()
  }

  @Get('/totalPassangers')
  getNumberOfPassangers(){
    return this.bookingsService.getTotalPassengers()
  }
  @Get('/getTopClientsByCreditsSpent')
  getTopClientsByCreditsSpent(){
    return this.bookingsService.getTopClientsByCreditsSpent()
  }
  @Get('/getTopClientsByBookingMade')
  getTopClientsByBookingMade(){
    return this.bookingsService.getTopClientsByBookingMade()
  }
}


