import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './user.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ResponseMessage('Create a user !')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    return this.usersService.create(createUserDto);
  }

  @Public()
  @ResponseMessage('Register a user !')
  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {

    return this.usersService.register(registerUserDto);
  }

  @Get()
  @ResponseMessage('Fetch user with paginate!')
  findAll(
    @Query('currentPage') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query() qs: string
  ) {
    return this.usersService.findAll(+currentPage, +pageSize, qs);
  }

  @ResponseMessage('Fetch user by id!')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @ResponseMessage('Update a user !')
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  
  @ResponseMessage('Delete a user!')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
