import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { Flight } from 'src/flights/flights.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
 seatNumber: string;

  @Column({ default: null })
  isApproved: boolean;

  @Column({ type: 'int', default: 0 })
  extraCost: number;
  
  @Column({ default: false })
  preferredSeat: boolean;
  @Column( { nullable:true  })
  passengers: string; 

  
  @ManyToOne(() => Users, (user) => user.bookings)
   user: Users;


  @ManyToOne(() => Flight, (flight) => flight.bookings,{onUpdate:'CASCADE',onDelete:'CASCADE'})
  flight: Flight;
}

