import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { Public, ResponseMessage } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';


@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Public()
  @ResponseMessage('User login!')
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req){
    return this.authService.login(req.user);
 }

 @Public()
 @Post('/register')
 @ResponseMessage('Register a user !')
 Register(@Body() registerUserDto: RegisterUserDto){
   return this.userService.register(registerUserDto);
}

 

}
