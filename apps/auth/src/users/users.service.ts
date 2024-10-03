import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async signup(createUserDto: CreateUserDto) {
        try {
            const user = await this.usersRepository.create({
                ...createUserDto,
                password: await bcrypt.hash(createUserDto.password, 10),
                date_created: undefined
            })
            return user
        } catch (error) {
            if(error.code===11000) {
                throw new ConflictException(`user with ${createUserDto.email} already exists`)
            }
            throw new InternalServerErrorException('Something went wrong')
        }
    }
}
