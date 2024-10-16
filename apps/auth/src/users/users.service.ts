import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'
import { GetUserDto } from './dto/get-user.dto';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        @Inject(NOTIFICATIONS_SERVICE)
        private readonly notificationsService: ClientProxy
    ) {}

    async signup(createUserDto: CreateUserDto) {
        try {
            const user = await this.usersRepository.create({
                ...createUserDto,
                password: await bcrypt.hash(createUserDto.password, 10),
                date_created: undefined
            })

            await this.notificationsService.emit('notify_email', {
                to: createUserDto.email,
                subject: 'welcome to the HR and internal operations system',
                text: `${createUserDto.name} Your account has been successfully created`,
                html: `<p>Hello <strong>${createUserDto.name}</strong>,</p>
                       <p>All operations and HR services pass through this system</p>`
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

    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto)
    }
}
