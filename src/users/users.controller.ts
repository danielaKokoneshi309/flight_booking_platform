import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { Users } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { SignInDto } from './dto/signin.user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OptionalParseIntPipe } from 'src/pipes/optional-parse-int.pipe';

@ApiTags('User')
@Controller('/users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private  usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up a user', description: 'Allows a user to sigup.' })
  async createUser(@Body() createUser: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUser.name,createUser.lastName,createUser.email, createUser.password,createUser.credits,createUser.countryOfOrigin);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  @ApiOperation({ summary: 'Sign in a user', description: 'Allows a user to sign in with their email and password.' })
  async signin(@Body() body:SignInDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @UseGuards(AuthGuard)
  @Get('/whoami')
  @ApiOperation({ summary: 'Gets current user', description: 'Gets the current loged in user' })
  whoAmI(@CurrentUser() user: Users) {
    return user;
  }
  @UseGuards(AuthGuard)
  @Post('/signout')
  @ApiOperation({ summary: 'Sign out', description: 'Allows a user to sign out' })
  signOut(@Session() session: any) {
    session.userId = null;
  }
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Find all users', description: 'Lists all the users' })
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Gets user by id', description: 'Gets a user by the given id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Updates a user', description: 'The user can update its account' })
  update(@CurrentUser()users:Users, @Body()updateUserDto: UpdateUserDto ) {
    return this.usersService.update(users, updateUserDto);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id?')
  @ApiOperation({ summary: 'Deletes a user', description: 'The admin can delete users account while a client can delete its account' })
  @ApiParam({ name: 'id',required: false,  schema: {
      type: 'integer',
      nullable: true,
    },example: 2,
  })
  remove(
    @Param('id', new OptionalParseIntPipe()) id: number | null,
    @CurrentUser() currentUser: Users
  ) {
    return this.usersService.remove(id, currentUser);
  }
  
}
