import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUsersService } from './typeusers.service';
import { TypeUsersController } from './typeusers.controller';
import { TypeUserEntity } from './typeuser.entity/typeuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUserEntity])],
  providers: [TypeUsersService],
  controllers: [TypeUsersController]
})
export class TypeUsersModule {}
