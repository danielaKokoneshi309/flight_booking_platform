import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
    
  
    @ApiProperty({
        example: 'Albania',
        required: true
     })
    departureCountry:string;
 
    @ApiProperty({
        example: 'Italy',
        required: true
     })
    destianationCountry:string;
  
    @ApiProperty({
        example: '2024-07-09T19:00:00Z',
        required: true
     })
    departureTime: Date
  
    @ApiProperty({
        example: '2024-07-09T20:00:00Z',
        required: true
     })
    arrivaleTime:Date
 
    @ApiProperty({
        example: 4000,
        required: true
     })
    price: number
   
    @ApiProperty({
        example: 2,
        required: true
     })
    planeId:number
    }
