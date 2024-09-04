import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: 6,
    required: true})
  @IsNumber()
  flightId: number;

  @ApiProperty({
    example: ['30A','10A'],
    required: false})
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  seatNumbers?: string[];

  @ApiProperty({
    example: ['jane', 'john'],
    required: false})
  @ArrayNotEmpty()
  @IsString({ each: true })
  passengers: string[]; 

}

