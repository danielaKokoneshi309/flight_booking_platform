import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { Users } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';


@Controller('/users')
export class UsersController {
  constructor(
    private  usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() createUser: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUser.name,createUser.lastName,createUser.email, createUser.password,createUser.credits,createUser.countryOfOrigin);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: Users) {
    return user;
  }
  @UseGuards(AuthGuard)
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
