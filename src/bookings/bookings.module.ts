import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Plane } from 'src/planes/plane.entity';
import { Flight } from 'src/flights/flights.entity';
import { Users } from 'src/users/user.entity';
import { EmailsModule } from 'src/emails/emails.module';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,Plane,Flight,Users]),EmailsModule,PdfModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
