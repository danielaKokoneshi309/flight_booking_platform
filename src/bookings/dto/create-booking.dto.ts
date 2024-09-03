import { IsArray, IsNumber, IsOptional, IsString, ArrayNotEmpty, Min } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  flightId: number;

  @IsArray()
  @ArrayNotEmpty()

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  seatNumbers?: string[];
  @ArrayNotEmpty()
  @IsString({ each: true })
  passengers: string[]; 

}

