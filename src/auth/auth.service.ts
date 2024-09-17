import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService

  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }

    return null;
  }

  async login(user: IUser, response: Response) {
    const payload = {
      sub: 'token login',
      iss: 'from server',

      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role


    };
    const refresh_token = this.createRefreshToken(payload);
    await this.usersService.updatedUserToken(refresh_token, user._id);
    //set cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    };
  }

  createRefreshToken = (payload) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000
    });
    return refresh_token
  }

  getAccount = (user: IUser) => {
    return {
      user: user
    }
  }

  processNewToken = async (refresh_token: string, response: Response) => {
    try {
       this.jwtService.verify(refresh_token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
      })
      let user = await this.usersService.findUserByToken(refresh_token);
      if(user){
        const payload = {
          sub: 'token login',
          iss: 'from server',
    
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
    
    
        };
        const refresh_token = this.createRefreshToken(payload);
        await this.usersService.updatedUserToken(refresh_token, user._id.toString());
        //set cookie
        response.clearCookie('refresh_token')
        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
        });
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }

      }else{
        throw new BadRequestException('Token is invalid!');
      }
    } catch (error) {
      throw new BadRequestException('Token is invalid!');
    }


  }

  logout = async (user: IUser, response: Response) => {
   await this.usersService.updatedUserToken('', user._id);
   response.clearCookie('refresh_token');
   return "ok!";
  }
}
