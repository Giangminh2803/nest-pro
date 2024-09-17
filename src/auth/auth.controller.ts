import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';
import { IUser } from 'src/users/user.interface';


@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  @Public()
  @ResponseMessage('User login!')
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @Post('/register')
  @ResponseMessage('Register a user !')
  Register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Get('/account')
  @ResponseMessage('Get user information !')
  GetAccount(@User() user: IUser) {
    return this.authService.getAccount(user);
  }

  @Public()
  @Get('/refresh')
  @ResponseMessage('Get user by refresh token !')
  handleRefreshToken(@Req() request: Request,@Res({ passthrough: true }) response: Response) {
    const refresh_token = request.cookies['refresh_token'];
    return this.authService.processNewToken(refresh_token, response)  ;
  }

  
  @Post('/logout')
  @ResponseMessage('Logout user !')
  handleLogout(@User() user: IUser,@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(user, response)  ;
  }

}
