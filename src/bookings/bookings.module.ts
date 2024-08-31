import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Plane } from 'src/planes/plane.entity';
import { Flight } from 'src/flights/flights.entity';
import { Users } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,Plane,Flight,Users])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
