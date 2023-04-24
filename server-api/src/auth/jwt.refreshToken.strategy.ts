import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  constructor(private usersService:UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('access_token'),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback:true
    });
  }
 
  async validate(req, payload: any) {
    var user = await this.usersService.findOne(payload.username);
    if(!user){
        throw new UnauthorizedException();
    }
    
    if(req.body.refresh_token != (await user).refreshtoken){
        throw new UnauthorizedException();
    }
    
    if( new Date() > new Date((await user).refreshtokenexpires)){
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    
    return result;
  }
}