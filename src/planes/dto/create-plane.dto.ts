import { IsNumber, IsString } from "class-validator";

export class CreatePlaneDto {

    @IsString()
    name: string;
    @IsNumber()
   numberOfSeats: number;
  
}
