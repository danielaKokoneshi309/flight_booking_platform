import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Plane } from 'src/planes/plane.entity';
import { Flight } from 'src/flights/flights.entity';
import { Booking } from 'src/bookings/booking.entity';


@Injectable()
export class SeedService implements OnModuleInit {
  constructor(

    private readonly dataSource: DataSource,
    @InjectRepository(Plane) private planeRepository: Repository<Plane>, 
    @InjectRepository(Flight) private flightRepository: Repository<Flight>) {}
   

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    
    await this.dataSource.query(`TRUNCATE TABLE "flight","plane" RESTART IDENTITY CASCADE`);
   
 const planes = [
          { name: 'Boeing737', numberOfSeats: 160 },
          { name: 'AirbusA320', numberOfSeats: 180 },
          { name: 'Boeing777', numberOfSeats: 300 },
          { name: 'AirbusA350', numberOfSeats: 300 },
          { name: 'Boeing787', numberOfSeats: 250 },
        ];
  
      await this.planeRepository.save(planes);
   const flight = [
        {
          departureCountry: 'USA',
          destianationCountry: 'Canada',
          departureTime: new Date('2024-01-10T08:00:00Z'),
          arrivaleTime: new Date('2024-01-10T12:00:00Z'),
          price: 4000,
          availableSeats: planes[1].numberOfSeats,
          plane: { id: 1 } as Plane, 
        },
        {
          departureCountry: 'Germany',
          destianationCountry: 'France',
          departureTime: new Date('2024-07-15T09:00:00Z'),
          arrivaleTime: new Date('2024-07-15T11:00:00Z'),
          price: 5000,
          availableSeats: planes[2].numberOfSeats,
          plane: { id: 2 } as Plane, 
        },
        {
          departureCountry: 'UK',
          destianationCountry: 'Spain',
          departureTime: new Date('2024-08-20T14:00:00Z'),
          arrivaleTime: new Date('2024-08-20T17:00:00Z'),
          price: 6000,
          availableSeats: planes[3].numberOfSeats,
          plane: { id: 3 } as Plane, 
        },
        {
          departureCountry: 'Australia',
          destianationCountry: 'New Zealand',
          departureTime: new Date('2024-11-01T06:00:00Z'),
          arrivaleTime: new Date('2024-11-01T08:00:00Z'),
          price: 7000,
          availableSeats: planes[4].numberOfSeats,
          plane: { id: 4 } as Plane, 
        },
        {
          departureCountry: 'Japan',
          destianationCountry: 'South Korea',
          departureTime: new Date('2024-11-05T07:00:00Z'),
          arrivaleTime: new Date('2024-11-05T09:00:00Z'),
          price: 8000,
          availableSeats: planes[1].numberOfSeats,
          plane: { id: 1 } as Plane,
        },
        {
          departureCountry: 'Albania',
          destianationCountry: 'Argentina',
          departureTime: new Date('2024-11-10T10:00:00Z'),
          arrivaleTime: new Date('2024-11-10T12:00:00Z'),
          price: 9000,
          availableSeats: planes[1].numberOfSeats,
          plane: { id: 1} as Plane, 
        },
        {
          departureCountry: 'Albania',
          destianationCountry: 'Thailand',
          departureTime: new Date('2024-11-15T05:00:00Z'),
          arrivaleTime: new Date('2024-11-15T09:00:00Z'),
          price: 10000,
          availableSeats: planes[2].numberOfSeats,
          plane: { id: 2 } as Plane,
        },
        {
          departureCountry: 'Albania',
          destianationCountry: 'Egypt',
          departureTime: new Date('2024-11-20T13:00:00Z'),
          arrivaleTime: new Date('2024-11-20T17:00:00Z'),
          price: 5500,
          availableSeats: planes[3].numberOfSeats,
          plane: { id: 3 } as Plane, 
        },
        {
          departureCountry: 'Albania',
          destianationCountry: 'China',
          departureTime: new Date('2024-12-01T08:00:00Z'),
          arrivaleTime: new Date('2024-12-01T13:00:00Z'),
          price: 4500,
          availableSeats: planes[4].numberOfSeats,
          plane: { id: 4 } as Plane, 
        },
        {
          departureCountry: 'Albania',
          destianationCountry: 'Greece',
          departureTime: new Date('2024-12-05T11:00:00Z'),
          arrivaleTime: new Date('2024-12-05T13:00:00Z'),
          price: 5000,
          availableSeats: planes[2].numberOfSeats,
          plane: { id: 2 } as Plane,
        },
    ]
     await this.flightRepository.save(flight);

   
  }
  
  
}
