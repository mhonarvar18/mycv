import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/guards/auth.guard';
import { Serialize } from '@src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) { }

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  
  getColor(@Session() session: any) {
    return session.color;
  }

  @Post('signout')
  @HttpCode(200)
  async signOut(@Session() session: any) {
    session.userId = null;
    return;
  }

  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Get(':id')
  async findUser(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.userService.find(email);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
