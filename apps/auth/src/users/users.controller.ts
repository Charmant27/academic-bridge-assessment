import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { currentUser } from '../current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDocument } from './models/users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.usersService.signup(createUserDto)
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    async getUser(@currentUser() user: UserDocument) {
        return user
    }
}
