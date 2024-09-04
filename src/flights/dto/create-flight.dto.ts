import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString,IsNumber, Min, Max } from "class-validator";

export class CreateFlightDto {

@IsString()
@IsNotEmpty()
@ApiProperty({
    example: 'Albania',
    required: true
 })
departureCountry:string;
@IsString()
@IsNotEmpty()
@ApiProperty({
    example: 'Italy',
    required: true
 })
destianationCountry:string;
@IsDateString()
@IsNotEmpty()
@ApiProperty({
    example: '2024-07-09T19:00:00Z',
    required: true
 })
departureTime: Date
@IsDateString()
@IsNotEmpty()
@ApiProperty({
    example: '2024-07-09T20:00:00Z',
    required: true
 })
arrivaleTime:Date
@IsNumber()
@Min(4000)
@Max(10000)
@IsNotEmpty()
@ApiProperty({
    example: 4000,
    required: true
 })
price: number
@IsNotEmpty()
@IsNumber()
@ApiProperty({
    example: 2,
    required: true
 })
planeId:number
}
