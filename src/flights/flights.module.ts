import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flights.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])], 
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
