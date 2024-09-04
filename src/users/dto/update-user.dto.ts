import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: 'John',
        required: true
     })
        name:string;
        @ApiProperty({
          example: 'Smith',
          required: true
       })
        lastName:string;
        @ApiProperty({
          example: 'john.20@gmail.com',
          required: true
       })
        email:string;
        @ApiProperty({
          example: '12345',
          required: true
       })
        password:string;
        @ApiProperty({
          example: 5000,
          required: true
       })
        credits:number;
        @ApiProperty({
          example: 'Albania',
          required: true
       })
      countryOfOrigin:string;
    
}
