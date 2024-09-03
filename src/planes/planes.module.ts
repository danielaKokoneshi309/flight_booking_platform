import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from './plane.entity';
import { FlightsService } from 'src/flights/flights.service';
import { Flight } from 'src/flights/flights.entity';
import { SeedModule } from 'src/seed/seed.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plane,Flight])], 
  controllers: [PlanesController],
  providers: [PlanesService],
  exports:[PlanesService]
})
export class PlanesModule {}
