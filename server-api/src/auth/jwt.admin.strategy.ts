import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { jwtConstants } from "./constants";

export class JwtAdminStrategy extends PassportStrategy(Strategy, "jwt-admin") {
  constructor(
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true
    });
  }

  async validate(res, payload: any) {
    const user = await this.usersService.findOne(payload.username);
    if (!user)
      throw new UnauthorizedException();
    if (user.type.id !== 1)
      throw new UnauthorizedException();
    
    const { password, ...result } = user;
    return result;    
  }
}