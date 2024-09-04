import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { GetFlightDto } from './dto/get-flight.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Users } from 'src/users/user.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Flight')
@UseGuards(AuthGuard)
@Controller('/flights')
export class FlightsController {
  constructor(private  flightsService: FlightsService) {}
  
  @Get('/upcoming')
  @ApiOperation({ summary: 'Get upcomming flights' })
  async findAllUpcomingFlights(){
    return await this.flightsService.findUpcomingFlights();
  }
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Number of flights that have occured', description: 'Get number of flights that have occured' })
  @Get('/numberOfFlights')
  async flightCount(){
    return await this.flightsService.getNumberOfFlights();
  }
  @UseGuards(AdminGuard)
  @Get('/flightsList')
  @ApiOperation({ summary: 'Get all flights'})
  async findAll() {
    
    return await this.flightsService.findAll();
  }
 
  @Get()
  @ApiOperation({ summary: 'Get all flights based on the filters'})
  async getFlights(  @Query() query:GetFlightDto,@CurrentUser() user:Users) {
     return await this.flightsService.getFlights(query,user);;
  }
  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Post flight', description: 'Create a new flight'})
  async create(@Body() createFlightDto: CreateFlightDto) {
    
    return await this.flightsService.create(createFlightDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get by id', description: 'Get a flight by its id'})
  async findOne(@Param('id') id: string) {
    
    return await this.flightsService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a flight'})
  async update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return await this.flightsService.update(+id, updateFlightDto);
  }
   @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a flight',description: 'Delete a flight by its id'})
  async remove(@Param('id') id: string) {
    return await this.flightsService.remove(+id);
  }
}
