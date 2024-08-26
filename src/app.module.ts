import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { PlanesModule } from './planes/planes.module';

@Module({
  imports: [FlightsModule, UsersModule, BookingsModule, PlanesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
