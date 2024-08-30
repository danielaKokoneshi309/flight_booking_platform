import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { GetFlightDto } from './dto/get-flight.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Users } from 'src/users/user.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';

@UseGuards(AuthGuard)
@Controller('/flights')
export class FlightsController {
  constructor(private  flightsService: FlightsService) {}
  
  @Get('/upcoming')
  async findAllUpcomingFlights(){
    return await this.flightsService.findUpcomingFlights();
  }
  @UseGuards(AdminGuard)
  @Get('/numberOfFlights')
  async flightCount(){
    return await this.flightsService.getNumberOfFlights();
  }
  @UseGuards(AdminGuard)
  @Get('/flightsList')
  async findAll() {
    
    return await this.flightsService.findAll();
  }
 
  @Get()
  async getFlights(  @Query() query:GetFlightDto,@CurrentUser() user:Users) {
     return await this.flightsService.getFlights(query,user);;
  }
  // @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createFlightDto: CreateFlightDto) {
    
    return await this.flightsService.create(createFlightDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    
    return await this.flightsService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return await this.flightsService.update(+id, updateFlightDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.flightsService.remove(+id);
  }
}
