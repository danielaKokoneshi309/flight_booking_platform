import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { GetFlightDto } from './dto/get-flight.dto';


@Controller('/flights')
export class FlightsController {
  constructor(private  flightsService: FlightsService) {}

  @Get('/upcoming')
  findAllUpcomingFlights(){
    return this.flightsService.findUpcomingFlights();
  }
  @Get()
  getFlights(@Query() query:GetFlightDto ) {
    return this.flightsService.getFlights(query);
  }
  
 
  @Post()
  
  async create(@Body() createFlightDto: CreateFlightDto) {
    
    return await this.flightsService.create(createFlightDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.flightsService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(+id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightsService.remove(+id);
  }
}
