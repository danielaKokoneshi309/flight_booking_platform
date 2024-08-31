import { Controller, Get,Query, UseGuards } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { GetFlightDto } from 'src/flights/dto/get-flight.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/planes')
export class PlanesController {
  constructor(private  planesService: PlanesService) {}
  
  @UseGuards(AdminGuard)
  @Get()
  findAvailablePlanes(@Query() query:GetFlightDto) {
    return this.planesService.findAvailablePlanes(query);
  }

  
}
