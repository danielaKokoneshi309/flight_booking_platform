
import { Booking } from 'src/bookings/booking.entity';
import { Plane } from 'src/planes/plane.entity';
import { Users } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeInsert } from 'typeorm';


@Entity()
export class Flight{

@PrimaryGeneratedColumn()
id: number;
@Column()
departureCountry:string;
@Column()
destianationCountry:string;
@Column('timestamp with time zone')
departureTime: Date;
@Column('timestamp with time zone')
arrivaleTime:Date;
@Column()
price: number
@Column('int',{ default: 0 }) // Add the new column
  availableSeats: number;

@ManyToOne(() => Plane, (plane) => plane.flights)
  plane: Plane;
@OneToMany(() => Booking, (booking) => booking.flight)
  bookings: Booking[];
  @BeforeInsert()
  async setDefaultAvailableSeats() {
    if (this.plane) {
      this.availableSeats = this.plane.numberOfSeats;
    }
  }
}