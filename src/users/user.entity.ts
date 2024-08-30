import { Flight } from 'src/flights/flights.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users{

@PrimaryGeneratedColumn()
id: number;
@Column()
name:string;
@Column()
lastName:string;
@Column()
email:string;
@Column()
password:string;
@Column({ default: false })
  IsAdmin: boolean;
@Column()
credits:number;
@Column({ nullable: false })
countryOfOrigin:string;
@OneToMany(() => Flight, (flight) => flight.user)
flights: Flight[];
}