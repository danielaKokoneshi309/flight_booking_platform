import { IsArray, IsNumber, IsOptional, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  flightId: number;

  @IsArray()
  @ArrayNotEmpty()
//   @IsNumber({}, { each: true })
//   userIds: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  seatNumbers?: string[];
  @ArrayNotEmpty()
  @IsString({ each: true })
  passengers: string[]; 
}

