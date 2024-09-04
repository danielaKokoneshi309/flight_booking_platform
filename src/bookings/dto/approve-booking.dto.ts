import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ApproveBookingDto {
  @IsBoolean()
  @ApiProperty({
    example: true,
    required: true})
  isApproved: boolean;
}
