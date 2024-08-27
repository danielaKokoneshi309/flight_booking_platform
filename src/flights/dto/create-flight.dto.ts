import { IsNotEmpty, IsString } from "class-validator";

export class CreateFlightDto {

id: number;
departureCountry:string;
destianationCountry:string;
departureTime: Date
arrivaleTime:Date
price: number
  
}
