import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtAdminStrategy } from './jwt.admin.strategy';
import { JwtRefreshTokenStrategy } from './jwt.refreshToken.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'}
    })
  ],
  providers: [AuthService, LocalStrategy, JwtRefreshTokenStrategy, JwtStrategy, JwtAdminStrategy],
  exports: [AuthService]
})
export class AuthModule {}