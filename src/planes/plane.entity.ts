import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Flight } from 'src/flights/flights.entity';

@Entity()
export class Plane {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
 numberOfSeats: number;

  @OneToMany(() => Flight, (flight) => flight.plane)
  flights: Flight[];
 
}

