import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './user.entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get()
    getAll(@Param() params) {
        return this.service.getUsers();
    }
   
    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Post()
    create(@Body() user: UserEntity) {
        return this.service.createUser(user);
    }
    
    @Put()
    update(@Body() user: UserEntity) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}

