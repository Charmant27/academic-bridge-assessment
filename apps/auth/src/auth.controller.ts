import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { currentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (
    @currentUser() user: UserDocument,
    @Res({passthrough: true}) response: Response
  ) {
    await this.authService.login(user, response)
    response.send(user)
  }

}
