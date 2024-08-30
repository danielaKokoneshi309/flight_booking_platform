import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plane } from './plane.entity';
import { Repository } from 'typeorm';
import { Flight } from 'src/flights/flights.entity';
import { GetFlightDto } from 'src/flights/dto/get-flight.dto';


@Injectable()
export class PlanesService {
  constructor(
  @InjectRepository(Plane) private repo: Repository<Plane>
,@InjectRepository(Flight) private flightRepo: Repository<Flight>
) {}

  async findAvailablePlanes({departureTime, arrivaleTime}:GetFlightDto) {
  
   const subquery= await this.flightRepo
   .createQueryBuilder('flight')
   .select('flight.planeId')
   .where('"flight"."arrivaleTime"<:departureTime',{departureTime})
   .andWhere('"flight"."departureTime"> :arrivaleTime',{arrivaleTime});

   const availablePlanes= await this.repo
   .createQueryBuilder('plane')
   .where(`plane.id NOT IN (${subquery.getQuery()})`)
   .setParameters(subquery.getParameters())
   .getMany()

   return availablePlanes
  }

}
