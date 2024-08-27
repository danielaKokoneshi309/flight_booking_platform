import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flights.entity';

@Injectable()
export class FlightsService {
  constructor(@InjectRepository(Flight) private repo: Repository<Flight>) {}

  create(createFlightDto: CreateFlightDto) {
    const flight = this.repo.create(createFlightDto);
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
}
