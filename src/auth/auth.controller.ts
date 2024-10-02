import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';
import { IUser } from 'src/users/user.interface';
import { RoleService } from 'src/role/role.service';


@Controller("auth")
export class AuthController {
  constructor(

      private authService: AuthService,
      private rolesService: RoleService

  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage("User Login")
  handleLogin(@Req() req,
  @Res({passthrough: true}) response: Response
  ) {
      return this.authService.login(req.user, response);
  }


  @Public()
  @ResponseMessage('Register a user success')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
      return this.authService.register(registerUserDto);
  }

  
  @ResponseMessage('Get a account success')
  @Get('/account')
 async handleGetAccount(@User() user: IUser) {
  const temp = await this.rolesService.findOne(user.role._id) as any;
  user.permissions = temp.permissions
      return {user};
  }

  @Public()
  @ResponseMessage('Get User by refresh token')
  @Get('/refresh')
  handleRefreshToken(@Req() request: Request,  @Res({passthrough: true}) response: Response) {
      const refresh_token = request.cookies["refresh_token"];

      return this.authService.processNewToken(refresh_token, response);
  }

  @ResponseMessage('Logout User')
  @Post('/logout')
  handleLogout(@User() user: IUser,  @Res({passthrough: true}) response: Response) {
      

      return this.authService.logout( user, response);
  }


}