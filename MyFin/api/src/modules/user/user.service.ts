/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/User/User.entity';

@Injectable()
export class UserService {
    saltOrRounds = 10;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne({ id });
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { username: username } });
    }

    async checkPassword(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password)
    }

}
