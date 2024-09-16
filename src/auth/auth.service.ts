import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms'; 

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

  async login(user: IUser) {
    const payload = {
      sub: 'token login',
      iss: 'from server',

      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role


    };
    const refresh_token = this.createRefreshToken(payload);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
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
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))/1000
    });
    return refresh_token
  }
}
