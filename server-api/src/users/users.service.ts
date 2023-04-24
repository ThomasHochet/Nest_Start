import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }

    async getUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find({relations:{type:true}});
    }

    async findOne(username: string): Promise<UserEntity | undefined> {
        let users= await this.usersRepository.find(
                {relations:{type:true}, where: [{ "email": username }]});
        if(users.length==1){
            return users[0];
        }else{
            return undefined;
        }
    }

    async getUser(_id: number): Promise<UserEntity[]> {
        return await this.usersRepository.find({
            relations:{type:true},
            where: [{ "id": _id }]
        });
    }

    async createUser(user: UserEntity) {
        if(user.password){
            const password= user.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            user.password= hash;
        }
        this.usersRepository.save(user)
    }

    async updateUser(user: UserEntity) {
        if(user.password){
            const password= user.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            user.password= hash;
        }
        this.usersRepository.save(user)
    }

    async deleteUser(user: UserEntity) {
        this.usersRepository.delete(user);
    }

    async saveorupdateRefreshToken(refreshToken:string, id:string, refreshtokenexpires){
        await this.usersRepository.update(id,{refreshtoken:refreshToken, refreshtokenexpires});
    }
}
