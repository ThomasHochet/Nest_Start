import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeUserEntity } from './typeuser.entity/typeuser.entity';

@Injectable()
export class TypeUsersService {

    constructor(@InjectRepository(TypeUserEntity) private typeUsersRepository: Repository<TypeUserEntity>) { }

    async getTypeUsers(): Promise<TypeUserEntity[]> {
        return await this.typeUsersRepository.find();
    }

    async getTypeUser(_id: number): Promise<TypeUserEntity> {
        return await this.typeUsersRepository.findOneBy({ "id": _id });
    }

    async createTypeUser(typeUser: TypeUserEntity) {
        this.typeUsersRepository.save(typeUser)
    }


    async updateTypeUser(typeUser: TypeUserEntity) {
        this.typeUsersRepository.save(typeUser)
    }

    async deleteTypeUser(typeUser: TypeUserEntity) {
        this.typeUsersRepository.delete(typeUser);
    }
}
