import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Res, NotFoundException, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApproveBookingDto } from './dto/approve-booking.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { Users } from 'src/users/user.entity';
import { PdfService } from 'src/pdf/pdf.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingsController {
 constructor(private readonly bookingsService: BookingsService,
  private readonly pdfService: PdfService
 ) {}

@Post()
@UseGuards(AdminGuard)
@ApiOperation({ summary: 'Post booking', description: 'create a new booking'})
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
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Update booking', description: 'Update a booking'})
  approveBooking(@Param('id') id: number, @Body() body: ApproveBookingDto): Promise<Booking> {
    return this.bookingsService.changeApproval(id, body.isApproved);
  }
@Get('/bookingHistory')
@ApiOperation({ summary: 'Get booking history', description: 'Get user booking history'})
  getbookingHistory(@CurrentUser()user:Users){
return this.bookingsService.getBookingHistory(user)
  }

  @Get('/bookingRequests')
 @UseGuards(AdminGuard)
 @ApiOperation({ summary: 'Get booking requests', description: 'Get pending booking requests'})
  getbookingRequest(){
return this.bookingsService.getBookingRequests()
  }
  @UseGuards(AdminGuard)
@Get('/totalRevenue')
@UseGuards(AdminGuard)
 @ApiOperation({ summary: 'Get total revenue', description: 'Get company total revenue'})
  getTotalRevenue(){
    return this.bookingsService.getTotaRevenue()
  }
  @UseGuards(AdminGuard)
  @Get('/totalPassangers')
  @UseGuards(AdminGuard)
 @ApiOperation({ summary: 'Get total number of passangers', description: 'Get the total number of passangers in the system'})
  getNumberOfPassangers(){
    return this.bookingsService.getTotalPassengers()
  }
  @UseGuards(AdminGuard)
  @Get('/getTopClientsByCreditsSpent')
  @UseGuards(AdminGuard)
 @ApiOperation({ summary: 'Get top clients by credit', description: 'Get top clients by credit spent most'})
  getTopClientsByCreditsSpent(){
    return this.bookingsService.getTopClientsByCreditsSpent()
  }
  @UseGuards(AdminGuard)
  @Get('/getTopClientsByBookingMade')
  @UseGuards(AdminGuard)
 @ApiOperation({ summary: 'Get top clients by booking', description: 'Get top clients by booking made more'})
  getTopClientsByBookingMade(){
    return this.bookingsService.getTopClientsByBookingMade()
  }
 
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking',description: 'Delete a booking by its id'})
  async remove(
    @Param('id') id: number,
    @CurrentUser() currentUser: Users,
  ) {
  
    if (currentUser.IsAdmin === true) {

      return await this.bookingsService.remove(id);
    } else {
      
      return await this.bookingsService.removeUserBooking(id, currentUser.id);
    }
  }
 
  @Get(':id')
  @ApiOperation({ summary: 'Get by id', description: 'Get a flight by its id'})
  async findOne(@Param('id') id: string) {
    
    return await this.bookingsService.findBookingById(+id);
  }
}


