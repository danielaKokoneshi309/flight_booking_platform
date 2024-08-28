import {Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Flight } from './flights.entity';


@Injectable()
export class FlightsService {
  constructor(@InjectRepository(Flight) private repo: Repository<Flight>) {}

  async create(createFlightDto: CreateFlightDto) {
    const flight =  await this.repo.create(createFlightDto);
    return  this.repo.save(flight);
  }

   findAll() {
   return this.repo.find();
  }

findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }
  

  async update(id: number, attrs: Partial<Flight>) {
  const flight = await this.findOne(id);
    if (!flight) {
    throw new NotFoundException('Flight not found');
    }
    Object.assign(flight, attrs);
    return this.repo.save(flight);
  }

  async remove(id: number) {
    const flight = await this.findOne(id);
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    return this.repo.remove(flight);
  }

  async findUpcomingFlights(){

    const today = new Date();
    const upcomingFlights = await this.repo
      .createQueryBuilder('flight')
      .where('"flight"."departureTime" >= :today', { today: today.toISOString() })
      .orderBy('"flight"."departureTime"', 'ASC')
      .getMany();
   return upcomingFlights;

}
}
