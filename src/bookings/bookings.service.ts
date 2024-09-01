
import { Injectable, BadRequestException, UseGuards, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Flight } from '../flights/flights.entity';
import { Users } from '../users/user.entity';
import { Plane } from '../planes/plane.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';


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
  

  @UseGuards(AuthGuard)
  async bookSeats(
    createBookingDto:CreateBookingDto,user:Users): Promise<Booking[]> {
     const { flightId, passengers, seatNumbers } = createBookingDto;
 
     const flight = await this.flightRepository.findOne({
       where: { id: flightId },
       relations: ['plane', 'bookings'],
     });
 
     if (!flight) {
       throw new BadRequestException('Flight not found');
     }
 
     const plane = flight.plane;
 
     if (flight.availableSeats - flight.bookings.length < passengers.length) {
       throw new BadRequestException('Not enough available seats on this flight');
     }
 
     const availableSeats = this.getAvailableSeats(flight);
     const bookings: Booking[] = [];
 
     for (let i = 0; i < passengers.length; i++) {
       const passenger = passengers[i];
       let seatNumber = seatNumbers?.[i]; 
 
       
 
       let extraCost = 0;
       let preferredSeat = false;
       if (seatNumber) {
         preferredSeat = true;
         extraCost = this.PREFERRED_SEAT_COST;
 
         if (!availableSeats.includes(seatNumber)) {
           throw new BadRequestException(`Seat number ${seatNumber} is not available`);
         }
         if (user.credits < flight.price + extraCost) {
           throw new BadRequestException(`User with ID ${user.id} has insufficient credits`);
         }
       } else {
         if (user.credits < flight.price ) {
           throw new BadRequestException(`User with ID ${user.id} has insufficient credits`);
         }
         seatNumber = this.getRandomSeat(availableSeats);
         if (!seatNumber) {
           throw new BadRequestException('No available seats');
         }
       }      
       const booking = this.bookingRepository.create({
         flight,
         seatNumber,
         user,
         preferredSeat,
         passengers: passenger,
         extraCost
       });
       bookings.push(booking);
       availableSeats.splice(availableSeats.indexOf(seatNumber), 1); 
     }
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
  
  async changeApproval(id: number, isApproved: boolean): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['flight', 'user'],
    });
  
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (isApproved && !booking.isApproved) {
      const user = booking.user;
      const flight = booking.flight;
      const extraCost = booking.preferredSeat ? this.PREFERRED_SEAT_COST : 0;

      user.credits -= flight.price + extraCost;
      await this.userRepository.save(user);
  
      flight.availableSeats -= 1;
      await this.flightRepository.save(flight);
    }
    booking.isApproved = isApproved;
    return this.bookingRepository.save(booking);
  }
 
  async getBookingHistory(user: Users): Promise<Booking[]> {
    const today = new Date();
    try {
        const bookingHistory = await this.bookingRepository
            .createQueryBuilder('booking')
            .innerJoinAndSelect('booking.flight', 'flight')
            .where('booking.userId = :userId', { userId: user.id })
            .andWhere('flight.arrivaleTime <= :today', { today })
            .andWhere('booking.isApproved = true')
            .getMany();
        
        return bookingHistory;
    } catch {
        throw new BadRequestException('Could not retrieve booking history');
    }
}

async getBookingRequests(): Promise<Booking[]> {
  const today = new Date();
  try {
      const bookingHistory = await this.bookingRepository
          .createQueryBuilder('booking')
          .where('booking.isApproved = false')
          .getMany();
      
      return bookingHistory;
  } catch {
      throw new BadRequestException('Could not retrieve booking history');
  }

}
}


