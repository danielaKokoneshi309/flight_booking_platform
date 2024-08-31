import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { Flight } from 'src/flights/flights.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
 seatNumber?: string;

  @Column({ default: false })
  isApproved: boolean;
  @Column({ type: 'int', default: 0 })
  extraCost: number;
  @ManyToOne(() => Users, (user) => user.bookings)
  user: Users;

  @ManyToOne(() => Flight, (flight) => flight.bookings)
  flight: Flight;
}

