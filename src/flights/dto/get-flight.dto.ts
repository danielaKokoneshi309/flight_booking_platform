import{IsString,IsDateString, IsEmpty, IsOptional} from 'class-validator';


export class GetFlightDto{
    @IsDateString()
    @IsOptional()
    departureTime: Date;
    @IsOptional()
    @IsString()
    destianationCountry:string;
    @IsOptional()
    @IsString()
    departureCountry:string;
    @IsDateString()
    @IsOptional()
    arrivaleTime:Date;
    
}