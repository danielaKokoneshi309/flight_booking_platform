
import { Plane } from 'src/planes/plane.entity';
import { Users } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


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
// @ManyToOne(() => Users, (user) => user.flights)
//   user: Users;
@ManyToOne(() => Plane, (plane) => plane.flights)
  plane: Plane;
}