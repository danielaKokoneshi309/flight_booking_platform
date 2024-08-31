
import { Injectable, BadRequestException, UseGuards, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Flight } from '../flights/flights.entity';
import { Users } from '../users/user.entity';
import { Plane } from '../planes/plane.entity';
import { AuthGuard } from 'src/guards/auth.guard';


@Injectable()
export class BookingsService {
  private readonly PREFERRED_SEAT_COST = 3000;

  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Flight) private flightRepository: Repository<Flight>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Plane) private planeRepository: Repository<Plane>,
  ) {}
  @UseGuards(AuthGuard)
  async bookSeats(
    flightId: number,
    userIds: number[],
    seatNumbers?: string[],
  ): Promise<Booking[]> {
    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
      relations: ['plane', 'bookings'],
    });

    if (!flight) {
      throw new BadRequestException('Flight not found');
    }

    const plane = flight.plane;

    if (flight.availableSeats - flight.bookings.length < userIds.length) {
      throw new BadRequestException('Not enough available seats on this flight');
    }

    const availableSeats = this.getAvailableSeats(flight);
    const bookings: Booking[] = [];

    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      let seatNumber = seatNumbers?.[i]; 

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new BadRequestException(`User with ID ${userId} not found`);
      }

      let extraCost = 0;

      if (seatNumber) {
        extraCost = this.PREFERRED_SEAT_COST;

     
        if (!availableSeats.includes(seatNumber)) {
          throw new BadRequestException(`Seat number ${seatNumber} is not available`);
        }

       
        if (user.credits < flight.price + extraCost) {
          throw new BadRequestException(`User with ID ${userId} has insufficient credits`);
        }
      } else {
     
        seatNumber = this.getRandomSeat(availableSeats);
        if (!seatNumber) {
          throw new BadRequestException('No available seats');
        }
      }

      
      const booking = this.bookingRepository.create({
        flight,
        user,
        seatNumber,
      });

      bookings.push(booking);
      availableSeats.splice(availableSeats.indexOf(seatNumber), 1); 

  
      user.credits -= flight.price + extraCost;
      await this.userRepository.save(user);
    }

    
    flight.availableSeats -= userIds.length;
    await this.flightRepository.save(flight);

    return this.bookingRepository.save(bookings);
  }

  private getAvailableSeats(flight: Flight): string[] {
    const allSeats = Array.from({ length: flight.availableSeats}, (_, i) => this.generateSeatLabel(i + 1));
    const bookedSeats = flight.bookings.map(booking => booking.seatNumber);
    return allSeats.filter(seat => !bookedSeats.includes(seat));
  }

  private getRandomSeat(availableSeats: string[]): string {
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    return availableSeats[randomIndex];
  }

  private generateSeatLabel(seatIndex: number): string {
    const row = Math.floor((seatIndex - 1) / 6) + 1; 
    const seatLetter = String.fromCharCode(65 + (seatIndex - 1) % 6); 
    return `${row}${seatLetter}`;
  }
  async changeApproval(id: number, isApproved: boolean) {
    try{
      const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.isApproved = isApproved;
    return this.bookingRepository.save(booking);
    }
    catch(error){
      console.log(error)
    throw new BadRequestException("Could not update")
    }
    
  }
}


