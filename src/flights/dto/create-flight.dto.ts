import { IsDateString, IsNotEmpty, IsString,IsNumber, Min, Max } from "class-validator";

export class CreateFlightDto {

@IsString()
@IsNotEmpty()
departureCountry:string;
@IsString()
@IsNotEmpty()
destianationCountry:string;
@IsDateString()
@IsNotEmpty()
departureTime: Date
@IsDateString()
@IsNotEmpty()
arrivaleTime:Date
@IsNumber()
@Min(4000)
@Max(10000)
@IsNotEmpty()
price: number
  
}
