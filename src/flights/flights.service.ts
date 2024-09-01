import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flights.entity';
import { GetFlightDto } from './dto/get-flight.dto';
import { Users } from 'src/users/user.entity';
import { Plane } from 'src/planes/plane.entity';


@Injectable()
export class FlightsService {

  constructor(@InjectRepository(Flight) private repo: Repository<Flight>,
  @InjectRepository(Plane) private planeRepo: Repository<Plane>) {}
  

async create(createFlightDto: CreateFlightDto): Promise<Flight> {
  const { planeId, departureTime, arrivaleTime } = createFlightDto;
  try{
    const plane= await this.planeRepo.findOne({ where: { id: planeId } })
  if (!plane) {
    throw new NotFoundException('Plane not found');
  }
  const conflictingFlight = await this.repo.createQueryBuilder('flight')
    .where('"flight"."planeId" = :planeId', { planeId })
    .andWhere('"flight"."departureTime" < :arrivaleTime', { arrivaleTime })
    .andWhere('"flight"."arrivaleTime" > :departureTime', { departureTime })
    .getOne();
   console.log(planeId)
  if (conflictingFlight) {
    throw new BadRequestException('Plane is not available for the given time range');
  }
 
  const flight = this.repo.create( createFlightDto,);
  flight.plane = plane;
  const savedFlight = await this.repo.save(flight);
  return savedFlight;
  }
    catch(error){
      console.log(error)
      throw new BadRequestException('Could not create flight');
    }
  }

async findOne(id: number): Promise<Flight | null> {
  const flight = await this.repo.findOneBy({ id });
    if (!id) {
      return null;
    }
     return flight;
  }

async update(id: number, attrs: Partial<Flight>) {
  const flight = await this.findOne(id);
    if (!flight) {
    throw new NotFoundException('Flight not found');
    }
    Object.assign(flight, attrs);
    try {
      const updatedFlight = await this.repo.save(flight);
    return updatedFlight;
    }
    catch{
      
      throw new BadRequestException('Could not update flight');
    }
  }

async remove(id: number): Promise<void> {
    const flight = await this.findOne(id);
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }
    try{
      await this.repo.remove(flight);
    }
    catch{
      throw new BadRequestException('Could not remove flight');
    }
  }

  async findAll(){
    return await this.repo.find()
    }

async findUpcomingFlights(): Promise<Flight[]>{
const today = new Date();
    try{
      const upcomingFlights = await this.repo
      .createQueryBuilder('flight')
      .where('"flight"."departureTime" >= :today', {  today })
      .orderBy('"flight"."departureTime"', 'ASC')
      .getMany();
   return upcomingFlights;
    }
   catch{
    throw new BadRequestException('Could not retrieve upcoming flights');
   }

}
async getFlights({ departureTime, destianationCountry, departureCountry }: GetFlightDto,user: Users): Promise<Flight[]> {
 
  const queryBuilder = this.repo.createQueryBuilder('flight');
  const today = new Date();
  queryBuilder.andWhere('"flight"."departureTime" >= :today', {  today })
  if (departureTime) {

    queryBuilder.andWhere('flight.departureTime = :departureTime', { departureTime });  
   
  }

  if (destianationCountry) {
    queryBuilder.andWhere('flight.destianationCountry = :destianationCountry', { destianationCountry });
  }
  if (!departureCountry && user) {
    
    departureCountry = user.countryOfOrigin;
  }
  if (departureCountry ) {
 
    queryBuilder.andWhere('flight.departureCountry = :departureCountry', { departureCountry });
  }
try{
  const flights = await queryBuilder.getMany();
  return flights;
}
catch{
  throw new BadRequestException('Could not retrieve flights');
}}

async getNumberOfFlights(){
  const today = new Date();
  try{
    const flightCount = await this.repo
    .createQueryBuilder('flight')
    .select('COUNT(id)', 'NumberOfFlights')
    .where('"flight"."arrivaleTime" <= :today',{  today })
    .getRawMany();

 return flightCount;
  } 
catch{
  throw new BadRequestException('Could not retrieve number of flights');
}}}



