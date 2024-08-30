import { IsBoolean, IsEmail, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
   @IsString()
    name:string;
    @IsString()
    lastName:string;
    @IsEmail()
    email:string;
    @IsString()
    password:string;
   @IsNumber()
   @Min(5000)
   @Max(15000)
    credits:number;
   @IsString()
  countryOfOrigin:string;


}
