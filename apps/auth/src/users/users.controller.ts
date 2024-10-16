import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { currentUser } from '../current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDocument } from './models/users.schema';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';

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

    @Post('/request-password-reset')
    async requestPasswordReset(@Body() resetPasswordRequestDto: ResetPasswordRequestDto) {
        return this.usersService.requestPasswordReset(resetPasswordRequestDto.email)
    }

    @Post('/reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.usersService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword)
    }
}
