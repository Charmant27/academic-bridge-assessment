import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayLoad } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayLoad = {
      userId: user._id.toHexString()
    }

    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )

    const token = this.jwtService.sign(tokenPayload)

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires
    })

  }
}
