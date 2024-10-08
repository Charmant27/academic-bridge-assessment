import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { TokenPayLoad } from "../interfaces/token-payload.interface";
import { UsersService } from "../users/users.service";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Authentication
            ]),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate({userId}: TokenPayLoad) {
        return this.usersService.getUser({_id: userId})
    }

}
