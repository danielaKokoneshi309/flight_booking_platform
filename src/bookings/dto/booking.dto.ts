import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { Flight } from 'src/flights/flights.entity';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';


export class BookingDto {

  id: number;


 seatNumber: string;


  isApproved: boolean;


  extraCost: number;
  

  preferredSeat: boolean;

  passengers: string; 
  

userId: number;



flightId: number;
}

