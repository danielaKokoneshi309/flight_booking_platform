import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Flight{

@PrimaryGeneratedColumn()
id: number;
@Column()
departureCountry:string;
@Column()
destianationCountry:string;
@Column()
departureTime: Date
@Column()
arrivaleTime:Date
@Column()
price: number
  


}