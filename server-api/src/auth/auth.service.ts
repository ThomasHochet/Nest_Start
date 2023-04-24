import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import randtoken = require('rand-token');

@Injectable()
export class AuthService {
  constructor(
    private usersService : UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username : string, pass : string) : Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      //la syntaxe ci dessous signifie qu'on retourne toutes les données de notre requête dans "result" sauf le password.
      const { password, ...result } = user;
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        return result;
      }
    }
    return null;
  }

  async generateRefreshToken(userId):  Promise<string> {
    var refreshToken = randtoken.generate(16);
    var expirydate =new Date();
    expirydate.setDate(expirydate.getDate() + 6);
    await this.usersService.saveorupdateRefreshToken(refreshToken, userId, expirydate);
    return refreshToken
  }

  async login(user: any) {
    const payload = { username: user.mail, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.generateRefreshToken(user.id)
    }
  }
}