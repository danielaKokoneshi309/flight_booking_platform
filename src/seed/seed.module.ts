import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Plane} from '../planes/plane.entity'
import { PlanesService } from 'src/planes/planes.service';
import { FlightsService } from 'src/flights/flights.service';
import { Flight } from 'src/flights/flights.entity';
import { SeedService } from './seed.service';
import { Booking } from 'src/bookings/booking.entity';
import { BookingsService } from 'src/bookings/bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Plane,Flight])],
  providers: [SeedService,PlanesService,FlightsService],
 exports:[SeedService]
})
export class SeedModule {}

