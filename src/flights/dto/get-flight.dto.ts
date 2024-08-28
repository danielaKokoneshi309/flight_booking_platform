import{IsString,IsDateString} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetFlightDto{
    @IsDateString()
    departureTime: Date;
    @IsString()
    destianationCountry:string;
    @IsString()
    departureCountry:string;

}