import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flights.entity';
import { Plane } from 'src/planes/plane.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight,Plane])], 
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
