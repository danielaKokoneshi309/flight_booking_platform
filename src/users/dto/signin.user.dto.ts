import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto extends PickType(CreateUserDto, ['email', 'password'] as const) {
  @ApiProperty({
    example: 'john.20@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '12345',
    required: true,
  })
  password: string;
}
