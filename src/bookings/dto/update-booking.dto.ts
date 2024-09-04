import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @ApiProperty({
        example: 2,
        required: true})
     
      flightId: number;
    
      @ApiProperty({
        example: ['A38','A12'],
        required: false})
    
      seatNumbers?: string[];
    
      @ApiProperty({
        example: ['jane', 'john'],
        required: false})
     
      passengers: string[]; 
}
