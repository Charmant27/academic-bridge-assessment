import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
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

    // login
    async verify(email: string, password: string) {
        const user = await this.usersRepository.findOne({email: email})
        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            throw new UnauthorizedException('Invalid credentials')
        }
        return user
    }
}
