import { IsBoolean } from 'class-validator';

export class ApproveBookingDto {
  @IsBoolean()
  isApproved: boolean;
}
