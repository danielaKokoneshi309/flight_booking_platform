import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    required: true
 })
   @IsString()
    name:string;
    @ApiProperty({
      example: 'Smith',
      required: true
   })
    @IsString()
    lastName:string;
    @ApiProperty({
      example: 'john.20@gmail.com',
      required: true
   })
    @IsEmail()
    email:string;
    @ApiProperty({
      example: '12345',
      required: true
   })
   @MinLength(4)
   @MaxLength(10)
   @IsString()
    password:string;
    @ApiProperty({
      example: 5000,
      required: true
   })
   @IsNumber()
   @Min(5000)
   @Max(15000)
    credits:number;
    @ApiProperty({
      example: 'Albania',
      required: true
   })
   @IsString()
  countryOfOrigin:string;


}
