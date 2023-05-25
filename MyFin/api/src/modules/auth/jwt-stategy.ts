
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from './jwt.payload';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/config/jwt';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/models/User/User.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: JWTPayload): Promise<User> {
        const user = await this.userService.findById(payload.id);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}